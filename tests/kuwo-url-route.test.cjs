const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const distHtml = fs.readFileSync('dist/index.html', 'utf8');
const server = fs.readFileSync('server.js', 'utf8');
const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

const pickFunction = (html, name) => {
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let opened = false;
  for (let end = start; end < script.length; end++) {
    const char = script[end];
    if (char === '{') {
      depth++;
      opened = true;
    } else if (char === '}') {
      depth--;
      if (opened && depth === 0) return script.slice(start, end + 1);
    }
  }
  throw new Error('Could not read function ' + name);
};

for (const [name, html] of [['index.html', indexHtml], ['dist/index.html', distHtml]]) {
  if (!html.includes("track.source === 'kuwo'")) {
    throw new Error(name + ' does not special-case Kuwo URLs');
  }
  const resolver = pickFunction(html, 'resolveExternalTrackUrl');
  if (resolver.includes('/api/kuwo-audio?rid=')) {
    throw new Error(name + ' hardwires Kuwo URL resolution to /api/kuwo-audio instead of music-api auto match');
  }
  if (!html.includes('function getKuwoAudioFallbackUrl')) {
    throw new Error(name + ' does not keep Kuwo audio proxy as a last playback fallback');
  }
  const branchStart = html.indexOf("track.source === 'kuwo'");
  const branchEnd = html.indexOf("var url = gdMusicApiBase", branchStart);
  const branch = html.slice(branchStart, branchEnd);
  if (branch.includes("replace(/^http")) {
    throw new Error(name + ' forces Kuwo HTTP URLs to HTTPS');
  }
}

if (!server.includes("requestUrl.pathname === '/api/kuwo-url'")) {
  throw new Error('server.js does not expose /api/kuwo-url');
}

if (!server.includes("requestUrl.pathname === '/api/kuwo-audio'")) {
  throw new Error('server.js does not expose /api/kuwo-audio');
}

if (!server.includes('antiserver.kuwo.cn/anti.s?type=convert_url')) {
  throw new Error('server.js does not use Kuwo convert_url endpoint');
}

if (!worker.includes("url.pathname === '/api/kuwo-url'")) {
  throw new Error('Cloudflare worker does not expose /api/kuwo-url');
}

if (!worker.includes("url.pathname === '/api/kuwo-audio'")) {
  throw new Error('Cloudflare worker does not expose /api/kuwo-audio');
}
