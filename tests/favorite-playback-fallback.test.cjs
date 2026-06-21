const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];

for (const name of [
  'normalizeTrackText',
  'getSelectedPlaybackSources',
  'getFallbackSearchSources',
  'inferTrackSourceCandidates',
  'isTrackMatchCandidate',
  'isLooseTitleMatchCandidate',
  'getNormalizedArtistTokens',
  'getFallbackMatchScore',
  'pickFallbackTrackMatch',
  'getFallbackTrackMatches',
  'resolveFallbackTrackFromSource',
  'normalizeNeteaseApiSong',
  'normalizeExternalTrack',
  'fetchGdMusicJson',
  'searchGdMusicSourceTracks',
  'searchNeteaseApiTracks',
  'fetchExternalSourceTracks',
  'normalizeAudioUrl',
  'resolveNeteaseApiTrackUrl',
  'recoverPlayableTrackUrl'
]) {
  if (!script.includes('function ' + name)) {
    throw new Error('Missing function ' + name);
  }
}

const pickFunction = (name) => {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let end = start;
  let opened = false;
  for (; end < script.length; end++) {
    const char = script[end];
    if (char === '{') {
      depth++;
      opened = true;
    } else if (char === '}') {
      depth--;
      if (opened && depth === 0) {
        end++;
        break;
      }
    }
  }
  return script.slice(start, end);
};

const pickConstObject = (name) => {
  const start = script.indexOf('const ' + name + ' = {');
  if (start < 0) throw new Error('Missing const ' + name);
  const end = script.indexOf('\n    };', start);
  if (end < 0) throw new Error('Could not read const ' + name);
  return script.slice(start, end + '\n    };'.length);
};

const sandbox = {
  console: { warn: function() {}, log: function() {}, error: function() {} },
  Date,
  Map,
  DEFAULT_COVER: 'cover.jpg',
  SEARCH_RESULT_LIMIT: 100,
  SEARCH_CACHE_TTL: 5 * 60 * 1000,
  URL_CACHE_TTL: 30 * 60 * 1000,
  FALLBACK_CACHE_MAX: 200,
  _fallbackSearchCache: new Map(),
  _fallbackUrlCache: new Map(),
  gdMusicApiBase: '/api/gd-music',
  gdMusicFallbackBases: ['https://music-api.example.test/api.php'],
  _isLocalDev: true,
  AbortController,
  DOMException,
  setTimeout,
  clearTimeout,
  aggregatedSources: ['local', 'joox', 'netease', 'kuwo'],
  safeCover(value) {
    return value || 'cover.jpg';
  },
  getSourceLabel(source) {
    return { joox: 'Joox', netease: '网易云音乐', _netease: 'Netease', kuwo: '酷我音乐' }[source] || source;
  },
  async fetchOtterNetease(path, payload) {
    sandbox.calls.push({ query: payload.keyword || payload.id || '', source: '_netease', path });
    if (path === '/search') {
      return {
        data: {
          result: {
            songs: [{
              id: 'official-netease',
              name: '网易官方歌',
              ar: [{ name: '官方歌手' }],
              al: { name: '官方专辑', picUrl: 'https://img.example.com/ne.jpg' },
              dt: 180000
            }]
          }
        }
      };
    }
    if (path === '/song-url') {
      return { data: { data: [{ url: 'http://audio.example.com/official.mp3' }] } };
    }
    return {};
  },
  async fetch(url) {
    const parsed = new URL(url);
    const source = parsed.searchParams.get('source');
    const query = parsed.searchParams.get('name');
    const count = parsed.searchParams.get('count');
    sandbox.calls.push({ query, source, count });
    return {
      ok: true,
      async json() {
        if (source === 'kuwo') {
          return [{
            id: 'bad-kuwo',
            name: 'My Soul',
            artist: ['July'],
            album: 'Beyond The Memory',
            source: 'kuwo',
            url_id: 'bad-kuwo'
          }];
        }
        if (source === 'joox' && /我会等/.test(query)) {
          return [{
            id: 'joox-traditional',
            name: '我會等',
            artist: ['周杰倫'],
            album: '我會等',
            source: 'joox',
            url_id: 'joox-traditional'
          }];
        }
        if (source === 'joox' && /香港/.test(query)) {
          const filler = Array.from({ length: 12 }, (_, index) => ({
            id: 'filler-' + index,
            name: '香港夜色' + index,
            artist: ['其它歌手' + index],
            album: '香港合集',
            source: 'joox',
            url_id: 'filler-' + index
          }));
          return filler.concat([{
            id: 'joox-hong-kong',
            name: '香港',
            artist: ['酷我歌手字段'],
            album: '香港',
            source: 'joox',
            url_id: 'joox-hong-kong'
          }]);
        }
        if (source === 'netease' && /等你等到我心痛/.test(query)) {
          const total = Number(count || 0);
          const filler = Array.from({ length: Math.min(12, total) }, (_, index) => ({
            id: 'netease-filler-' + index,
            name: '等你等到心痛' + index,
            artist: ['其它歌手' + index],
            album: '网易合集',
            source: 'netease',
            url_id: 'netease-filler-' + index
          }));
          if (total <= 12) return filler;
          return filler.concat([{
            id: 'netease-jacky',
            name: '等你等到我心痛',
            artist: ['张学友'],
            album: '这个冬天不太冷',
            source: 'netease',
            url_id: 'netease-jacky'
          }]);
        }
        if (source !== 'joox') return [];
        return [{
          id: '123',
          name: 'My Soul',
          artist: ['July'],
          album: 'Beyond The Memory',
          source: 'joox',
          url_id: '123'
        }];
      }
    };
  },
  async resolveExternalTrackUrl(track) {
    if (track && track.source === '_netease') return sandbox.resolveNeteaseApiTrackUrl(track);
    if (track && track.urlId === 'bad-kuwo') return 'https://cdn.example.com/bad-kuwo.mp3';
    if (track && track.urlId === 'joox-traditional') return 'https://cdn.example.com/wo-hui-deng.mp3';
    if (track && track.urlId === 'joox-hong-kong') return 'https://cdn.example.com/hong-kong.mp3';
    if (track && track.urlId === 'netease-jacky') return 'https://cdn.example.com/jacky-netease.mp3';
    return track && track.urlId === '123' ? 'https://cdn.example.com/my-soul.mp3' : '';
  },
  calls: []
};

vm.createContext(sandbox);
vm.runInContext([
  pickConstObject('TRADITIONAL_CHINESE_MAP'),
  pickFunction('parseTrackDuration'),
  pickFunction('normalizeTrackText'),
  pickFunction('getSelectedPlaybackSources'),
  pickFunction('getFallbackSearchSources'),
  pickFunction('inferTrackSourceCandidates'),
  pickFunction('isTrackMatchCandidate'),
  pickFunction('isLooseTitleMatchCandidate'),
  pickFunction('getNormalizedArtistTokens'),
  pickFunction('getFallbackMatchScore'),
  pickFunction('pickFallbackTrackMatch'),
  pickFunction('getFallbackTrackMatches'),
  pickFunction('_getFallbackCacheKey'),
  pickFunction('_getCachedFallbackSearch'),
  pickFunction('_setCachedFallbackSearch'),
  pickFunction('_getCachedUrl'),
  pickFunction('_setCachedUrl'),
  pickFunction('resolvePlayableFallbackCandidate'),
  pickFunction('resolveFallbackTrackFromSource'),
  pickFunction('normalizeNeteaseApiSong'),
  pickFunction('normalizeExternalTrack'),
  pickFunction('fetchGdMusicJson'),
  pickFunction('searchGdMusicSourceTracks'),
  pickFunction('searchNeteaseApiTracks'),
  pickFunction('fetchExternalSourceTracks'),
  pickFunction('normalizeAudioUrl'),
  pickFunction('resolveNeteaseApiTrackUrl'),
  pickFunction('recoverPlayableTrackUrl')
].join('\n'), sandbox);

(async () => {
  if (!sandbox.isTrackMatchCandidate(
    { title: 'My Soul', artist: 'July' },
    { title: 'My Soul (Instrumental|Bonus Track)', artist: 'July' }
  )) {
    throw new Error('Expected title variants with the same artist to match');
  }
  if (!sandbox.isTrackMatchCandidate(
    { title: '我会等', artist: '周杰伦' },
    { title: '我會等', artist: '周杰倫' }
  )) {
    throw new Error('Expected traditional Chinese candidates to match simplified targets');
  }
  if (!sandbox.isTrackMatchCandidate(
    { title: '等你等到我心痛', artist: '张学友' },
    { title: '等你等到我心痛', artist: '張學友' }
  )) {
    throw new Error('Expected traditional Jacky Cheung artist name to match simplified target');
  }
  if (!sandbox.isTrackMatchCandidate(
    { title: '偏偏喜欢你', artist: '陈百强' },
    { title: '偏偏喜歡你', artist: '陳百強' }
  )) {
    throw new Error('Expected traditional Danny Chan title and artist to match simplified target');
  }
  if (!sandbox.isLooseTitleMatchCandidate(
    { title: '香港', artist: '酷我歌手字段' },
    { title: '香港', artist: '不同歌手字段' }
  )) {
    throw new Error('Expected loose title fallback to accept exact title with different artist metadata');
  }
  if (sandbox.getFallbackMatchScore(
    { title: '香港', artist: '酷我歌手字段', source: 'kuwo' },
    { title: '香港', artist: '不同歌手字段', source: 'joox' },
    0
  ) < 0) {
    throw new Error('Expected failed Kuwo playback to accept exact-title cross-source fallback despite unreliable artist fields');
  }
  if (sandbox.getFallbackMatchScore(
    { title: '香港', artist: '酷我歌手字段', source: 'netease' },
    { title: '香港', artist: '不同歌手字段', source: 'joox' },
    0
  ) >= 0) {
    throw new Error('Expected strict artist matching to remain enabled for non-Kuwo source fallback');
  }
  const favorite = { title: 'My Soul', artist: 'July', sourceLabel: 'Joox', src: '' };
  const url = await sandbox.recoverPlayableTrackUrl(favorite);
  if (url !== 'https://cdn.example.com/my-soul.mp3') {
    throw new Error('Expected recovered playback URL, got ' + url);
  }
  if (favorite.src !== url || favorite.source !== 'joox' || favorite.urlId !== '123') {
    throw new Error('Expected favorite track to be hydrated with playable source metadata');
  }
  if (!sandbox.calls.length || sandbox.calls[0].source !== 'joox') {
    throw new Error('Expected sourceLabel to prioritize Joox recovery');
  }

  sandbox.calls = [];
  const badSourceTrack = {
    title: 'My Soul',
    artist: 'July',
    source: 'kuwo',
    sourceLabel: '酷我音乐',
    src: 'https://cdn.example.com/bad-kuwo.mp3'
  };
  const fallbackUrl = await sandbox.recoverPlayableTrackUrl(badSourceTrack, {
    skipSources: ['kuwo'],
    skipUrls: ['https://cdn.example.com/bad-kuwo.mp3']
  });
  if (fallbackUrl !== 'https://cdn.example.com/my-soul.mp3') {
    throw new Error('Expected recovery to skip failed Kuwo URL and use Joox, got ' + fallbackUrl);
  }
  if (badSourceTrack.source !== 'joox') {
    throw new Error('Expected recovered track source to switch to Joox');
  }
  if (sandbox.calls.some((call) => call.source === 'kuwo')) {
    throw new Error('Expected recovery options to skip failed source Kuwo');
  }
  if (sandbox.calls.some((call) => call.source === 'migu' || call.source === 'bilibili')) {
    throw new Error('Expected recovery to stay inside selected aggregate sources');
  }

  sandbox.aggregatedSources = ['local', 'kuwo'];
  sandbox.calls = [];
  const noSelectedAlternative = {
    title: 'My Soul',
    artist: 'July',
    source: 'kuwo',
    sourceLabel: '酷我音乐',
    src: 'https://cdn.example.com/bad-kuwo.mp3'
  };
  const noSelectedAlternativeUrl = await sandbox.recoverPlayableTrackUrl(noSelectedAlternative, {
    skipSources: ['kuwo'],
    skipUrls: ['https://cdn.example.com/bad-kuwo.mp3']
  });
  if (noSelectedAlternativeUrl) {
    throw new Error('Expected no fallback when no other aggregate source is selected');
  }
  if (sandbox.calls.length) {
    throw new Error('Expected fallback not to query unselected default sources');
  }

  sandbox.aggregatedSources = ['local', 'joox', 'netease', 'kuwo'];
  sandbox.calls = [];
  const chineseFallback = {
    title: '我会等',
    artist: '周杰伦',
    source: 'kuwo',
    sourceLabel: '酷我音乐',
    src: 'https://cdn.example.com/bad-kuwo.mp3'
  };
  const chineseFallbackUrl = await sandbox.recoverPlayableTrackUrl(chineseFallback, {
    skipSources: ['kuwo'],
    skipUrls: ['https://cdn.example.com/bad-kuwo.mp3']
  });
  if (chineseFallbackUrl !== 'https://cdn.example.com/wo-hui-deng.mp3') {
    throw new Error('Expected failed Kuwo track to recover from traditional Joox candidate');
  }
  if (chineseFallback.source !== 'joox') {
    throw new Error('Expected failed Kuwo track to switch source to Joox');
  }

  sandbox.calls = [];
  const deepFallback = {
    title: '香港',
    artist: '酷我歌手字段',
    source: 'kuwo',
    sourceLabel: '酷我音乐',
    src: 'https://cdn.example.com/bad-kuwo.mp3'
  };
  const deepFallbackUrl = await sandbox.recoverPlayableTrackUrl(deepFallback, {
    skipSources: ['kuwo'],
    skipUrls: ['https://cdn.example.com/bad-kuwo.mp3']
  });
  if (deepFallbackUrl !== 'https://cdn.example.com/hong-kong.mp3') {
    throw new Error('Expected fallback search to scan beyond the first 8 results for 香港, got ' + deepFallbackUrl);
  }
  if (!sandbox.calls.some((call) => call.source === 'joox')) {
    throw new Error('Expected failed Kuwo track to search selected Joox source');
  }

  sandbox.aggregatedSources = ['local', 'netease', 'kuwo'];
  sandbox.calls = [];
  const longTitleDeepFallback = {
    title: '等你等到我心痛',
    artist: '酷我歌手字段',
    source: 'kuwo',
    sourceLabel: '酷我音乐',
    src: 'https://cdn.example.com/bad-kuwo.mp3'
  };
  const quickLongTitleUrl = await sandbox.recoverPlayableTrackUrl(longTitleDeepFallback, {
    skipSources: ['kuwo'],
    skipUrls: ['https://cdn.example.com/bad-kuwo.mp3'],
    quickOnly: true
  });
  if (quickLongTitleUrl) {
    throw new Error('Expected quick fallback to miss long-title NetEase result beyond the first 12 results');
  }
  const deepLongTitleUrl = await sandbox.recoverPlayableTrackUrl(longTitleDeepFallback, {
    skipSources: ['kuwo'],
    skipUrls: ['https://cdn.example.com/bad-kuwo.mp3'],
    searchLimit: 30
  });
  if (deepLongTitleUrl !== 'https://cdn.example.com/jacky-netease.mp3') {
    throw new Error('Expected deep fallback to bypass shallow cache and use NetEase for 等你等到我心痛, got ' + deepLongTitleUrl);
  }
  if (!sandbox.calls.some((call) => call.source === 'netease' && /等你等到我心痛/.test(call.query) && call.count === '30')) {
    throw new Error('Expected deep fallback to re-query NetEase with a larger limit after shallow prewarm');
  }

  sandbox.aggregatedSources = ['local', 'netease', 'kuwo'];
  sandbox.calls = [];
  const neteaseCompanionFallback = {
    title: '网易官方歌',
    artist: '官方歌手',
    source: 'netease',
    sourceLabel: '网易云音乐',
    src: ''
  };
  const neteaseCompanionUrl = await sandbox.recoverPlayableTrackUrl(neteaseCompanionFallback, {
    skipSources: ['netease'],
    skipUrls: []
  });
  if (neteaseCompanionUrl !== 'https://audio.example.com/official.mp3') {
    throw new Error('Expected failed GD NetEase track to recover through official Netease provider, got ' + neteaseCompanionUrl);
  }
  if (neteaseCompanionFallback.source !== '_netease') {
    throw new Error('Expected GD NetEase fallback to switch to official Netease source');
  }
  if (!sandbox.calls.some((call) => call.source === '_netease' && call.path === '/search')) {
    throw new Error('Expected fallback to search the official Netease provider');
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
