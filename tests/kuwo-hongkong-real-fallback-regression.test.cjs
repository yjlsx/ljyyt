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

async function verifyNeteaseGdFastPath(file) {
  const script = getInlineScript(file);
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    Date,
    Map,
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 30,
    SEARCH_CACHE_TTL: 5 * 60 * 1000,
    URL_CACHE_TTL: 30 * 60 * 1000,
    FALLBACK_CACHE_MAX: 200,
    _fallbackSearchCache: new Map(),
    _fallbackUrlCache: new Map(),
    gdMusicApiBase: '/api/gd-music',
    gdMusicFallbackBases: [],
    _isLocalDev: true,
    AbortController,
    DOMException,
    setTimeout,
    clearTimeout,
    aggregatedSources: ['local', 'joox', 'netease', 'kuwo'],
    defaultEnabledSources: ['local', 'joox', 'netease', 'kuwo'],
    sourceDisplayOrder: ['local', 'joox', 'netease', 'kuwo', '_netease'],
    calls: [],
    safeCover(value) { return value || 'cover.jpg'; },
    getSourceLabel(source) { return { joox: 'Joox', netease: '网易云音乐', kuwo: '酷我音乐' }[source] || source; },
    getEnabledSourceOrder() { return sandbox.aggregatedSources.slice(); },
    async searchNeteasePrimaryTracks() {
      await new Promise((resolve) => setTimeout(resolve, 250));
      throw new Error('NetEase account proxy failed');
    },
    async fetch(url) {
      const parsed = new URL(url, 'https://example.test');
      const source = parsed.searchParams.get('source');
      const type = parsed.searchParams.get('types');
      sandbox.calls.push({ type, source, id: parsed.searchParams.get('id'), query: parsed.searchParams.get('name') });
      if (type === 'search' && source === 'joox') {
        return { ok: true, async json() { return [{ id: 'joox-empty', name: '等你等到我心痛', artist: ['張學友'], source: 'joox', url_id: 'joox-empty' }]; } };
      }
      if (type === 'search' && source === 'netease') {
        return { ok: true, async json() { return [{ id: '190360', name: '等你等到我心痛', artist: ['张学友'], source: 'netease', url_id: '190360' }]; } };
      }
      if (type === 'url' && source === 'netease') {
        return { ok: true, async json() { return { url: 'https://m701.music.126.net/fast/real.mp3' }; } };
      }
      return { ok: true, async json() { return []; } };
    },
    appSettings: { quality: '320' },
    async resolveNeteaseApiTrackUrl() { return ''; },
    async fetchQqTrackUrlPayload() { return { url: '' }; },
    async fetchLxTrackUrlPayload() { return { url: '' }; },
    getAudioProxyUrl(url) { return url; }
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
    pickFunction(script, 'isBilibiliTrackMatchCandidate'),
    pickFunction(script, 'getNormalizedArtistTokens'),
    pickFunction(script, 'getPrimaryArtistName'),
    pickFunction(script, 'getFallbackSearchQueries'),
    pickFunction(script, 'isUnknownArtistName'),
    pickFunction(script, 'hasArtistMatch'),
    pickFunction(script, 'canRelaxKuwoArtistMatch'),
    pickFunction(script, 'getFallbackMatchScore'),
    pickFunction(script, 'pickFallbackTrackMatch'),
    pickFunction(script, 'getFallbackTrackMatches'),
    pickFunction(script, '_getFallbackCacheKey'),
    pickFunction(script, '_getCachedFallbackSearch'),
    pickFunction(script, '_setCachedFallbackSearch'),
    pickFunction(script, '_getCachedUrl'),
    pickFunction(script, '_setCachedUrl'),
    pickFunction(script, 'normalizeAudioUrl'),
    pickFunction(script, 'isBlockedAudioUrl'),
    pickFunction(script, 'resolvePlayableFallbackCandidate'),
    pickFunction(script, 'resolveFallbackTrackFromSource'),
    pickFunction(script, 'normalizeExternalTrack'),
    pickFunction(script, 'fetchGdMusicJson'),
    pickFunction(script, 'searchGdMusicSourceTracks'),
    pickFunction(script, 'fetchExternalSourceTracks'),
    pickFunction(script, 'resolveExternalTrackUrl'),
    pickFunction(script, 'recoverPlayableTrackUrl')
  ].join('\n'), sandbox);

  const track = { title: '等你等到我心痛', artist: '张学友', source: 'kuwo', src: 'https://bad.example/kuwo.mp3' };
  const recovered = await Promise.race([
    sandbox.recoverPlayableTrackUrl(track, { skipSources: ['kuwo'], skipUrls: ['https://bad.example/kuwo.mp3'], quickOnly: true, silent: true }),
    new Promise((resolve) => setTimeout(() => resolve('__timeout__'), 120))
  ]);
  if (recovered === '__timeout__') {
    throw new Error(file + ' waited for the slow NetEase account proxy instead of using GD/Otter NetEase fallback');
  }
  if (recovered !== 'https://m701.music.126.net/fast/real.mp3' || track.source !== 'netease') {
    throw new Error(file + ' should quickly switch failed Kuwo track to GD/Otter NetEase, got ' + recovered + ' from ' + track.source + '; calls=' + JSON.stringify(sandbox.calls));
  }
  if (!sandbox.calls.some((call) => call.type === 'search' && call.source === 'netease')) {
    throw new Error(file + ' did not query the GD/Otter NetEase search endpoint');
  }
}

function verifyBlockedUrlFilter(file) {
  const script = getInlineScript(file);
  const sandbox = { URL, location: { origin: 'https://example.test' } };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'normalizeAudioUrl'),
    pickFunction(script, 'isBlockedAudioUrl')
  ].join('\n'), sandbox);

  const normalUrls = [
    'https://cdn.example.com/music/play/190360.mp3',
    'https://audio.example.com/source/joox/track.m4a',
    'https://m701.music.126.net/20260623181029/path/song.mp3?source=netease'
  ];
  for (const url of normalUrls) {
    if (sandbox.isBlockedAudioUrl(url)) throw new Error(file + ' should not reject normal playable CDN URL ' + url);
  }
  const blockedUrls = [
    'https://cdn.example.com/current-channel-unavailable.mp3',
    'https://cdn.example.com/no-free-copyright-notice.mp3',
    'https://cdn.example.com/%E5%BD%93%E5%89%8D%E6%B8%A0%E9%81%93%E6%97%A0%E6%B3%95%E6%92%AD%E6%94%BE.mp3'
  ];
  for (const url of blockedUrls) {
    if (!sandbox.isBlockedAudioUrl(url)) throw new Error(file + ' should reject prompt audio URL ' + url);
  }
}

function verifyTitlePartMatching(file) {
  const script = getInlineScript(file);
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getTitlePartMarker'),
    pickFunction(script, 'hasConflictingTitlePart'),
    pickFunction(script, 'getNormalizedTitleVariants'),
    pickFunction(script, 'isLooseTitleMatchCandidate'),
    pickFunction(script, 'getNormalizedArtistTokens'),
    pickFunction(script, 'isUnknownArtistName'),
    pickFunction(script, 'hasArtistMatch'),
    pickFunction(script, 'isTrackMatchCandidate')
  ].join('\n'), sandbox);

  const target = { title: '爱的故事 (上集)', artist: '孙耀威' };
  const correct = { title: '爱的故事.上集', artist: '孙耀威' };
  const wrongPart = { title: '爱的故事(下)-但愿他珍惜你', artist: '孙耀威' };
  const noPart = { title: '爱的故事（没有下集）', artist: '孙耀威' };

  if (!sandbox.isTrackMatchCandidate(target, correct)) {
    throw new Error(file + ' should match equivalent 上集 title variants');
  }
  if (sandbox.isLooseTitleMatchCandidate(target, wrongPart) || sandbox.isTrackMatchCandidate(target, wrongPart)) {
    throw new Error(file + ' should not match 上集 target to 下集 candidate');
  }
  if (sandbox.isLooseTitleMatchCandidate(target, noPart) || sandbox.isTrackMatchCandidate(target, noPart)) {
    throw new Error(file + ' should not match 上集 target to unrelated title that only shares bracket-stripped base');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    verifyBlockedUrlFilter(file);
    verifyTitlePartMatching(file);
    await verifyNeteaseGdFastPath(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
