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

async function verify(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    neteaseApiBase: 'https://primary.example/api/netease',
    neteaseFallbackBases: ['https://otter.example/music-api/netease'],
    gdMusicApiBase: '/api/gd-music',
    gdMusicFallbackBases: [],
    _isLocalDev: true,
    AbortController,
    DOMException,
    calls: [],
    console: { warn() {} },
    safeCover(value) {
      return value || 'cover.jpg';
    },
    parseTrackDuration() {
      return 0;
    },
    normalizeAudioUrl(url) {
      return String(url || '').trim();
    },
    async fetch(url, options) {
      sandbox.calls.push(String(url));
      if (String(url).startsWith('https://primary.example')) {
        return { ok: true, async json() { return { ok: true, service: 'ljyyt-worker' }; } };
      }
      if (String(url).startsWith('https://otter.example') && String(url).includes('/search')) {
        return {
          ok: true,
          async json() {
            return { data: { result: { songs: [{ id: 186016, name: '晴天', ar: [{ name: '周杰伦' }], al: { name: '叶惠美', picUrl: 'cover.jpg' } }] } } };
          }
        };
      }
      if (String(url).startsWith('https://otter.example') && String(url).includes('/song-url')) {
        return { ok: true, async json() { return { data: { data: [{ url: 'https://cdn.example/netease.mp3' }] } }; } };
      }
      return { ok: true, async json() { return []; } };
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'getNeteaseRequestBases'),
    pickFunction(script, 'isNeteaseProxyHealthPayload'),
    pickFunction(script, 'fetchOtterNetease'),
    pickFunction(script, 'normalizeNeteaseApiSong'),
    pickFunction(script, 'searchNeteaseApiTracks'),
    pickFunction(script, 'searchNeteasePrimaryTracks'),
    pickFunction(script, 'resolveNeteaseApiTrackUrl'),
    pickFunction(script, 'normalizeExternalTrack'),
    pickFunction(script, 'fetchGdMusicJson'),
    pickFunction(script, 'fetchExternalSourceTracks'),
    pickFunction(script, 'isBlockedAudioUrl'),
    pickFunction(script, 'resolveExternalTrackUrl')
  ].join('\n'), sandbox);

  const tracks = await sandbox.fetchExternalSourceTracks('周杰伦 晴天', 'netease', 3);
  if (!tracks.length || tracks[0].source !== 'netease' || tracks[0].provider !== 'netease-api') {
    throw new Error(file + ' should search the primary NetEase source through the Otter NetEase API fallback');
  }
  if (!sandbox.calls.some((url) => url.startsWith('https://primary.example')) || !sandbox.calls.some((url) => url.startsWith('https://otter.example'))) {
    throw new Error(file + ' should try the configured NetEase API and then the Otter fallback');
  }
  const url = await sandbox.resolveExternalTrackUrl(tracks[0]);
  if (url !== 'https://cdn.example/netease.mp3') {
    throw new Error(file + ' should resolve primary NetEase API tracks through /song-url');
  }
}


async function verifyNeteaseFallbackDoesNotWaitForSlowPrimary(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    neteaseApiBase: 'https://primary.example/api/netease',
    neteaseFallbackBases: ['https://otter.example/music-api/netease'],
    AbortController,
    DOMException,
    setTimeout,
    clearTimeout,
    console: { warn() {} },
    safeCover(value) { return value || 'cover.jpg'; },
    parseTrackDuration() { return 0; },
    calls: [],
    async fetch(url) {
      sandbox.calls.push(String(url));
      if (String(url).startsWith('https://primary.example')) return new Promise(() => {});
      if (String(url).startsWith('https://otter.example') && String(url).includes('/search')) {
        return {
          ok: true,
          async json() {
            return { data: { result: { songs: [{ id: 186016, name: '晴天', ar: [{ name: '周杰伦' }], al: { name: '叶惠美', picUrl: 'cover.jpg' } }] } } };
          }
        };
      }
      throw new Error('Unexpected url ' + url);
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'getNeteaseRequestBases'),
    pickFunction(script, 'isNeteaseProxyHealthPayload'),
    pickFunction(script, 'fetchOtterNetease'),
    pickFunction(script, 'normalizeNeteaseApiSong'),
    pickFunction(script, 'searchNeteaseApiTracks')
  ].join('\n'), sandbox);

  const result = await Promise.race([
    sandbox.searchNeteaseApiTracks('周杰伦 晴天', 3),
    new Promise((resolve) => setTimeout(() => resolve('blocked'), 120))
  ]);

  if (result === 'blocked') {
    throw new Error(file + ' should not wait for a slow primary NetEase proxy before using the Otter fallback');
  }
  if (!Array.isArray(result) || !result.length || result[0].urlId !== '186016') {
    throw new Error(file + ' should return fast NetEase fallback search results');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await verify(file);
    await verifyNeteaseFallbackDoesNotWaitForSlowPrimary(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
