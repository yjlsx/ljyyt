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
  const resolver = pickFunction(html, 'resolveExternalTrackUrl');
  if (!resolver.includes("track.source !== 'kuwo'")) {
    throw new Error(name + ' does not preserve Kuwo HTTP URLs from music-api');
  }
  if (resolver.includes('/api/kuwo-audio?rid=')) {
    throw new Error(name + ' hardwires Kuwo URL resolution to /api/kuwo-audio instead of music-api auto match');
  }
  const ensurePlayable = pickFunction(html, 'ensurePlayableTrackUrl');
  if (ensurePlayable.includes('getKuwoAudioFallbackUrl')) {
    throw new Error(name + ' tries Kuwo audio proxy before automatic source matching can recover');
  }
  if (!html.includes('function isDeprecatedKuwoAudioUrl')) {
    throw new Error(name + ' does not detect cached Kuwo prompt-audio URLs');
  }
  if (!ensurePlayable.includes('isDeprecatedKuwoAudioUrl(track.src)')) {
    throw new Error(name + ' still trusts cached /api/kuwo-audio playback URLs');
  }
  if (!ensurePlayable.includes('skipSources: track.source ? [track.source] : []')) {
    throw new Error(name + ' does not skip the failed external source when URL resolution returns empty');
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
