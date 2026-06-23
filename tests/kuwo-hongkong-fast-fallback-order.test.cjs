const fs = require('fs');
const vm = require('vm');

function getInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(file + ' is missing inline application script');
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

function pickConstObject(script, name) {
  const start = script.indexOf('const ' + name + ' = {');
  if (start < 0) throw new Error('Missing const ' + name);
  const end = script.indexOf('\n    };', start);
  if (end < 0) throw new Error('Could not read const ' + name);
  return script.slice(start, end + '\n    };'.length);
}

async function verifyKuwoHongKongUsesFastPlayableFallbacks(file) {
  const script = getInlineScript(file);
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    gdMusicApiBase: '/api/gd-music',
    gdMusicFallbackBases: [],
    _isLocalDev: true,
    AbortController,
    DOMException,
    setTimeout,
    clearTimeout,
    aggregatedSources: ['local', 'qq', 'lx_qq', 'joox', 'netease', 'kuwo', 'lx_kuwo', 'bilibili'],
    defaultEnabledSources: ['local', 'qq', 'lx_qq', 'joox', 'netease', 'kuwo', 'lx_kuwo', 'bilibili'],
    sourceDisplayOrder: ['local', 'qq', 'lx_qq', 'joox', 'netease', 'kuwo', 'lx_kuwo', 'bilibili', '_netease'],
    calls: [],
    safeCover(value) {
      return value || 'cover.jpg';
    },
    getSourceLabel(source) {
      return { joox: 'Joox', netease: '网易云音乐', qq: 'QQ音乐', lx_qq: '小秋音乐', kuwo: '酷我音乐' }[source] || source;
    },
    getEnabledSourceOrder() {
      return sandbox.aggregatedSources.slice();
    },
    async fetch(url) {
      const parsed = new URL(url, 'https://example.test');
      const source = parsed.searchParams.get('source');
      const query = parsed.searchParams.get('name');
      sandbox.calls.push({ source, query });
      if (source === 'qq' || source === 'lx_qq' || source === 'bilibili' || source === 'lx_kuwo') {
        await new Promise((resolve) => setTimeout(resolve, 120));
        return {
          ok: true,
          async json() {
            return [{
              id: source + '-blocked',
              name: '等你等到我心痛',
              artist: ['张学友'],
              source,
              url_id: source + '-blocked'
            }];
          }
        };
      }
      if (source === 'joox' && /等你等到我心痛 张学友/.test(query)) {
        return {
          ok: true,
          async json() {
            return [{
              id: 'joox-jacky',
              name: '等你等到我心痛',
              artist: ['張學友'],
              source: 'joox',
              url_id: 'joox-jacky'
            }];
          }
        };
      }
      return { ok: true, async json() { return []; } };
    },
    async resolveExternalTrackUrl(track) {
      if (track && track.urlId === 'joox-jacky') return 'https://cdn.example.test/joox-jacky.mp3';
      if (track && /blocked/.test(String(track.urlId || ''))) return 'https://cdn.example.test/current-channel-unavailable.mp3';
      return '';
    }
  };

  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getSelectedPlaybackSources'),
    pickFunction(script, 'getGlobalFallbackPlaybackSources'),
    pickFunction(script, 'getFallbackSearchSources'),
    pickFunction(script, 'inferTrackSourceCandidates'),
    pickFunction(script, 'isTrackMatchCandidate'),
    pickFunction(script, 'getTitlePartMarker'),
    pickFunction(script, 'hasConflictingTitlePart'),
    pickFunction(script, 'getNormalizedTitleVariants'),
    pickFunction(script, 'isLooseTitleMatchCandidate'),
    pickFunction(script, 'getNormalizedArtistTokens'),
    pickFunction(script, 'getPrimaryArtistName'),
    pickFunction(script, 'getFallbackSearchQueries'),
    pickFunction(script, 'isUnknownArtistName'),
    pickFunction(script, 'hasArtistMatch'),
    pickFunction(script, 'canRelaxKuwoArtistMatch'),
    pickFunction(script, 'getFallbackMatchScore'),
    pickFunction(script, 'pickFallbackTrackMatch'),
    pickFunction(script, 'getFallbackTrackMatches'),
    pickFunction(script, 'normalizeAudioUrl'),
    pickFunction(script, 'isBlockedAudioUrl'),
    pickFunction(script, 'resolvePlayableFallbackCandidate'),
    pickFunction(script, 'resolveFallbackTrackFromSource'),
    pickFunction(script, 'normalizeExternalTrack'),
    pickFunction(script, 'fetchGdMusicJson'),
    pickFunction(script, 'searchGdMusicSourceTracks'),
    pickFunction(script, 'fetchExternalSourceTracks'),
    pickFunction(script, 'recoverPlayableTrackUrl')
  ].join('\n'), sandbox);

  const track = {
    title: '等你等到我心痛',
    artist: '张学友',
    source: 'kuwo',
    sourceLabel: '酷我音乐',
    src: 'https://cdn.example.test/failed-kuwo.mp3'
  };

  const recovered = await Promise.race([
    sandbox.recoverPlayableTrackUrl(track, {
      skipSources: ['kuwo'],
      skipUrls: ['https://cdn.example.test/failed-kuwo.mp3'],
      quickOnly: true
    }),
    new Promise((resolve) => setTimeout(() => resolve('__timeout__'), 80))
  ]);

  if (recovered === '__timeout__') {
    throw new Error(file + ' waited on slow QQ/LX/Bilibili sources before trying a playable Otter-style fallback');
  }
  if (recovered !== 'https://cdn.example.test/joox-jacky.mp3' || track.source !== 'joox') {
    throw new Error(file + ' should quickly switch failed Kuwo 香港 result to the matching Joox source, got ' + recovered + ' from ' + track.source + '; calls=' + JSON.stringify(sandbox.calls));
  }
  const firstSlowCall = sandbox.calls.find((call) => call.source === 'qq' || call.source === 'lx_qq' || call.source === 'bilibili');
  const jooxCall = sandbox.calls.find((call) => call.source === 'joox');
  if (firstSlowCall && jooxCall && sandbox.calls.indexOf(firstSlowCall) < sandbox.calls.indexOf(jooxCall)) {
    throw new Error(file + ' should not prioritize slow/unreliable playback fallback sources before Joox');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await verifyKuwoHongKongUsesFastPlayableFallbacks(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
