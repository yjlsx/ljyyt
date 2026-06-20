const fs = require('fs');
const vm = require('vm');

function getInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(file + ' is missing its inline app script');
  return match[1];
}

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

async function verifyFrontend(file, script) {
  const fullText = fs.readFileSync(file, 'utf8');
  const uiMarkers = [
    'data-provider="小秋音乐"',
    'data-provider="小蜗音乐"',
    'data-source="lx_qq"',
    'data-source="lx_kuwo"'
  ];
  if (/\.html$/i.test(file)) {
    for (const marker of uiMarkers) {
      if (!fullText.includes(marker)) {
        throw new Error(file + ' is missing LX source UI marker: ' + marker);
      }
    }
  }
  for (const marker of [
    "'小秋音乐': 'lx_qq'",
    "'小蜗音乐': 'lx_kuwo'",
    "lx_qq: '小秋音乐'",
    "lx_kuwo: '小蜗音乐'",
    'lx_qq',
    'lx_kuwo',
    '/api/lx/url'
  ]) {
    if (!fullText.includes(marker) && !script.includes(marker)) {
      throw new Error(file + ' is missing LX source script marker: ' + marker);
    }
  }
  if (/洛雪音乐解析接口|播放走\s*LX\s*解析/i.test(fullText)) {
    throw new Error(file + ' should not expose technical LX parser wording in source picker UI');
  }

  const sandbox = {
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 5,
    gdMusicApiBase: 'https://music-api.gdstudio.xyz/api.php',
    qqApiBase: '/api/qq',
    qqFallbackProxyBase: 'https://otter-music.pages.dev/music-api/qqmusic/proxy',
    _isLocalDev: true,
    useSameOriginAudioApi: true,
    ljyytApiBase: 'https://api.example.test',
    appSettings: { quality: '320' },
    calls: [],
    safeCover(value) {
      return value || 'cover.jpg';
    },
    parseTrackDuration() {
      return 0;
    },
    normalizeAudioUrl(url) {
      return String(url || '').trim();
    },
    getAudioProxyUrl(url) {
      return '/api/audio-proxy?url=' + encodeURIComponent(url);
    },
    console: { warn() {} },
    async fetch(url) {
      sandbox.calls.push(String(url));
      if (String(url).includes('/api/qq/search')) {
        return {
          ok: true,
          async json() {
            return [{ id: 'qq_mid', name: '晴天', artist: ['周杰伦'], source: 'qq', url_id: 'mid123' }];
          }
        };
      }
      if (String(url).includes('/api/lx/url')) {
        return {
          ok: true,
          async json() {
            return { url: 'http://stream.example.test/song.mp3', provider: 'lx-tx', quality: '320k' };
          }
        };
      }
      throw new Error('Unexpected fetch url ' + url);
    },
    async fetchGdMusicJson(url) {
      sandbox.calls.push(String(url));
      if (String(url).includes('types=search') && String(url).includes('source=kuwo')) {
        return [{ id: 'kw_1', name: '晴天', artist: ['周杰伦'], source: 'kuwo', url_id: 'MUSIC_456' }];
      }
      return [];
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'getSourceLabel'),
    pickFunction(script, 'normalizeExternalTrack'),
    pickFunction(script, 'normalizeQqProxyTrack'),
    pickFunction(script, 'isQqProxyHealthPayload'),
    pickFunction(script, 'fetchQqSearchPage'),
    pickFunction(script, 'searchQqApiTracks'),
    pickFunction(script, 'cloneTracksForSource'),
    pickFunction(script, 'searchLxQqTracks'),
    pickFunction(script, 'searchLxKuwoTracks'),
    pickFunction(script, 'fetchExternalSourceTracks'),
    pickFunction(script, 'searchGdMusicSourceTracks'),
    pickFunction(script, 'getLxSourceCode'),
    pickFunction(script, 'mapLxQuality'),
    pickFunction(script, 'fetchLxTrackUrlPayload'),
    pickFunction(script, 'fetchQqTrackUrlPayload'),
    pickFunction(script, 'resolveExternalTrackUrl')
  ].join('\n'), sandbox);

  sandbox.calls = [];
  const qqTracks = await sandbox.fetchExternalSourceTracks('晴天', 'lx_qq', 1);
  if (!qqTracks.length || qqTracks[0].source !== 'lx_qq' || qqTracks[0].urlId !== 'mid123') {
    throw new Error(file + ' should expose QQ catalog tracks through 小秋音乐');
  }
  const qqUrl = await sandbox.resolveExternalTrackUrl(qqTracks[0]);
  if (!qqUrl.startsWith('/api/audio-proxy?url=')) {
    throw new Error(file + ' should proxy LX QQ http playback urls');
  }
  if (!sandbox.calls.some((url) => url.includes('/api/lx/url?source=tx&id=mid123&br=320k'))) {
    throw new Error(file + ' should resolve 小秋音乐 through /api/lx/url source=tx');
  }

  sandbox.calls = [];
  const kuwoTracks = await sandbox.fetchExternalSourceTracks('晴天', 'lx_kuwo', 1);
  if (!kuwoTracks.length || kuwoTracks[0].source !== 'lx_kuwo' || kuwoTracks[0].urlId !== 'MUSIC_456') {
    throw new Error(file + ' should expose Kuwo catalog tracks through 小蜗音乐');
  }
  await sandbox.resolveExternalTrackUrl(kuwoTracks[0]);
  if (!sandbox.calls.some((url) => url.includes('types=search') && url.includes('source=kuwo'))) {
    throw new Error(file + ' should search 小蜗音乐 through the Kuwo catalog');
  }
  if (!sandbox.calls.some((url) => url.includes('/api/lx/url?source=kw&id=456&br=320k'))) {
    throw new Error(file + ' should resolve 小蜗音乐 through /api/lx/url source=kw');
  }
}

(async () => {
  await verifyFrontend('index.html', getInlineScript('index.html'));
  await verifyFrontend('js/app.js', fs.readFileSync('js/app.js', 'utf8'));

  const server = fs.readFileSync('server.js', 'utf8');
  const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');
  for (const [name, source] of [['server.js', server], ['cloudflare-worker/worker.js', worker]]) {
    for (const marker of [
      '/api/lx/url',
      'handleLxUrlRequest',
      'resolveLxUrl',
      'X-Request-Key',
      'share-v3'
    ]) {
      if (!source.includes(marker)) throw new Error(name + ' is missing LX url marker: ' + marker);
    }
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
