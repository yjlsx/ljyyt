const fs = require('fs');
const vm = require('vm');

function pickFunction(source, name) {
  let start = source.indexOf('function ' + name);
  if (start > 6 && source.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
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
      if (opened && depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

function pickConstObject(source, name) {
  const start = source.indexOf('const ' + name + ' = {');
  if (start < 0) throw new Error('Missing const ' + name);
  const end = source.indexOf('\n    };', start);
  if (end < 0) throw new Error('Could not read const ' + name);
  return source.slice(start, end + '\n    };'.length);
}

async function verify(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
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
    aggregatedSources: ['local', 'joox', 'netease', 'kuwo'],
    fetchedSources: [],
    safeCover(value) {
      return value || 'cover.jpg';
    },
    getSourceLabel(source) {
      return { joox: 'Joox', netease: '网易', kuwo: '酷我' }[source] || source;
    },
    async fetch() {
      throw new Error(file + ' should not perform a new external search when variants already contain a playable fallback');
    },
    async resolveExternalTrackUrl(track) {
      sandbox.fetchedSources.push(track && track.source);
      if (track && track.source === 'joox' && track.urlId === 'joox-hk') {
        return 'https://cdn.example.test/joox-hk.mp3';
      }
      return '';
    }
  };

  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getSelectedPlaybackSources'),
    pickFunction(script, 'getFallbackSearchSources'),
    pickFunction(script, 'inferTrackSourceCandidates'),
    pickFunction(script, 'isTrackMatchCandidate'),
    pickFunction(script, 'isLooseTitleMatchCandidate'),
    pickFunction(script, 'getNormalizedArtistTokens'),
    pickFunction(script, 'getFallbackMatchScore'),
    pickFunction(script, 'pickFallbackTrackMatch'),
    pickFunction(script, 'getFallbackTrackMatches'),
    pickFunction(script, 'resolvePlayableFallbackCandidate'),
    pickFunction(script, 'resolveFallbackTrackFromSource'),
    pickFunction(script, 'recoverPlayableTrackUrl')
  ].join('\n'), sandbox);

  const track = {
    title: '香港',
    artist: '陈百强',
    source: 'kuwo',
    sourceLabel: '酷我音乐',
    src: 'https://cdn.example.test/failed-kuwo.mp3',
    variants: [{
      title: '香港',
      artist: '陈百强',
      source: 'joox',
      sourceLabel: 'Joox',
      urlId: 'joox-hk',
      src: ''
    }]
  };

  const url = await sandbox.recoverPlayableTrackUrl(track, {
    skipSources: ['kuwo'],
    skipUrls: ['https://cdn.example.test/failed-kuwo.mp3']
  });

  if (url !== 'https://cdn.example.test/joox-hk.mp3') {
    throw new Error(file + ' should prioritize playable in-memory search variants before triggering a new fallback search');
  }
  if (track.source !== 'joox' || track.urlId !== 'joox-hk') {
    throw new Error(file + ' should switch to the playable variant source');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await verify(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
