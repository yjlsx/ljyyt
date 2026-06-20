const fs = require('fs');
const vm = require('vm');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < script.length; index += 1) {
    const char = script[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') {
      depth += 1;
      opened = true;
    } else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

async function verifyFrontend(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  for (const marker of [
    "data-provider=\"QQ音乐\"",
    "data-source=\"qq\"",
    "qqFallbackProxyBase",
    "qqApiBase + '/search",
    "qqApiBase + '/url"
  ]) {
    if (!html.includes(marker)) throw new Error(file + ' is missing QQ source marker: ' + marker);
  }

  const sandbox = {
    DEFAULT_COVER: 'cover.jpg',
    qqApiBase: '/api/qq',
    qqFallbackProxyBase: 'https://otter-music.pages.dev/music-api/qqmusic/proxy',
    calls: [],
    safeCover(value) {
      return value || 'cover.jpg';
    },
    getSourceLabel(source) {
      return source === 'qq' ? 'QQ' : source;
    },
    parseTrackDuration() {
      return 0;
    },
    mapLxQuality(quality) {
      return String(quality || '320') + 'k';
    },
    normalizeAudioUrl(url) {
      return String(url || '').trim().replace(/&amp;/g, '&');
    },
    getAudioProxyUrl(url) {
      return '/api/audio-proxy?url=' + encodeURIComponent(url);
    },
    console: { warn() {} },
    async fetch(url, options) {
      sandbox.calls.push(String(url));
      if (String(url).includes('/search')) {
        return {
          ok: true,
          async json() {
            return [{ id: 'qq_mid', name: '晴天', artist: ['周杰伦'], source: 'qq', url_id: 'mid123', pic_id: '' }];
          }
        };
      }
      return {
        ok: true,
        async json() {
          return { url: 'http://ws.stream.qqmusic.qq.com/M800mid123.mp3?vkey=abc' };
        }
      };
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'normalizeExternalTrack'),
    pickFunction(script, 'normalizeQqProxyTrack'),
    pickFunction(script, 'isQqProxyHealthPayload'),
    pickFunction(script, 'fetchQqSearchPage'),
    pickFunction(script, 'searchQqApiTracks'),
    pickFunction(script, 'mapLxQuality'),
    pickFunction(script, 'fetchQqTrackUrlPayload'),
    pickFunction(script, 'resolveExternalTrackUrl')
  ].join('\n'), sandbox);
  const tracks = await sandbox.searchQqApiTracks('晴天', 1);
  if (!tracks.length || tracks[0].source !== 'qq' || tracks[0].urlId !== 'mid123') {
    throw new Error(file + ' should normalize QQ search results as playable tracks');
  }
  const url = await sandbox.resolveExternalTrackUrl(tracks[0]);
  if (!url.startsWith('/api/audio-proxy?url=')) {
    throw new Error(file + ' should proxy QQ http playback urls, got ' + url);
  }

  sandbox.calls = [];
  sandbox.fetch = async function(url, options) {
    sandbox.calls.push(String(url));
    if (String(url).includes('/api/qq/search')) {
      return { ok: true, async json() { return { ok: true, service: 'ljyyt-worker' }; } };
    }
    if (String(url).includes('qqmusic/proxy')) {
      return {
        ok: true,
        async json() {
          return { items: [{ id: 'qq_mid_fallback', name: '晴天', artist: ['周杰伦'], source: 'qq', url_id: 'mid-fallback' }] };
        }
      };
    }
    throw new Error('Unexpected url ' + url);
  };
  const fallbackTracks = await sandbox.searchQqApiTracks('晴天', 1);
  if (!fallbackTracks.length || fallbackTracks[0].urlId !== 'mid-fallback') {
    throw new Error(file + ' should fall back to the Otter QQ proxy when the primary worker route is not deployed');
  }
}

async function verifyQqSearchFallbackDoesNotWaitForSlowPrimary(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    DEFAULT_COVER: 'cover.jpg',
    qqApiBase: '/api/qq',
    qqFallbackProxyBase: 'https://otter-music.pages.dev/music-api/qqmusic/proxy',
    AbortController,
    setTimeout,
    clearTimeout,
    console: { warn() {} },
    calls: [],
    safeCover(value) { return value || 'cover.jpg'; },
    getSourceLabel(source) { return source === 'qq' ? 'QQ' : source; },
    parseTrackDuration() { return 0; },
    async fetch(url) {
      sandbox.calls.push(String(url));
      if (String(url).includes('/api/qq/search')) return new Promise(() => {});
      if (String(url).includes('qqmusic/proxy')) {
        return {
          ok: true,
          async json() {
            return { items: [{ id: 'qq_fast_fallback', name: '晴天', artist: ['周杰伦'], source: 'qq', url_id: 'mid-fast' }] };
          }
        };
      }
      throw new Error('Unexpected url ' + url);
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'normalizeExternalTrack'),
    pickFunction(script, 'normalizeQqProxyTrack'),
    pickFunction(script, 'isQqProxyHealthPayload'),
    pickFunction(script, 'fetchQqSearchPage'),
    pickFunction(script, 'searchQqApiTracks')
  ].join('\n'), sandbox);

  const result = await Promise.race([
    sandbox.searchQqApiTracks('晴天', 1),
    new Promise((resolve) => setTimeout(() => resolve('blocked'), 120))
  ]);

  if (result === 'blocked') {
    throw new Error(file + ' should not wait for slow QQ primary search before using the fallback proxy');
  }
  if (!Array.isArray(result) || !result.length || result[0].urlId !== 'mid-fast') {
    throw new Error(file + ' should return fast QQ fallback search results');
  }
}

async function verifyQqUrlFallbackDoesNotWaitForSlowPrimary(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    qqApiBase: '/api/qq',
    qqFallbackProxyBase: 'https://otter-music.pages.dev/music-api/qqmusic/proxy',
    AbortController,
    setTimeout,
    clearTimeout,
    console: { warn() {} },
    calls: [],
    async fetch(url) {
      sandbox.calls.push(String(url));
      if (String(url).includes('/api/qq/url')) return new Promise(() => {});
      if (String(url).includes('qqmusic/proxy')) {
        return {
          ok: true,
          async json() {
            return { url: 'https://fast.example.test/qq-fallback.mp3' };
          }
        };
      }
      throw new Error('Unexpected url ' + url);
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'isQqProxyHealthPayload'),
    pickFunction(script, 'mapLxQuality'),
    pickFunction(script, 'fetchQqTrackUrlPayload')
  ].join('\n'), sandbox);

  const result = await Promise.race([
    sandbox.fetchQqTrackUrlPayload('mid-slow', '320'),
    new Promise((resolve) => setTimeout(() => resolve('blocked'), 120))
  ]);

  if (result === 'blocked') {
    throw new Error(file + ' should not wait for slow QQ official URL route before using the fallback proxy');
  }
  if (!result || result.url !== 'https://fast.example.test/qq-fallback.mp3') {
    throw new Error(file + ' should return the fast QQ fallback proxy URL');
  }
}

for (const file of ['index.html', 'dist/index.html']) {
  Promise.all([verifyFrontend(file), verifyQqSearchFallbackDoesNotWaitForSlowPrimary(file), verifyQqUrlFallbackDoesNotWaitForSlowPrimary(file)]).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

const server = fs.readFileSync('server.js', 'utf8');
const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');
for (const [name, source] of [['server.js', server], ['cloudflare-worker/worker.js', worker]]) {
  for (const marker of ['/api/qq/search', '/api/qq/url', 'lxmusicapi.onrender.com/url/tx', 'DoSearchForQQMusicDesktop']) {
    if (!source.includes(marker)) throw new Error(name + ' is missing QQ source marker: ' + marker);
  }
}

for (const [name, source] of [['server.js', server], ['cloudflare-worker/worker.js', worker]]) {
  const body = pickFunction(source, 'resolveQqMusicUrl');
  const lxIndex = body.indexOf("resolveLxUrl('tx'");
  const officialIndex = body.indexOf('resolveQqOfficialUrl');
  if (lxIndex < 0 || officialIndex < 0 || lxIndex > officialIndex) {
    throw new Error(name + ' should prefer the LX tx playback route before QQ official vkey URLs');
  }
}
