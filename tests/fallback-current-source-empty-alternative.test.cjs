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

function pickConstObject(script, name) {
  const start = script.indexOf('const ' + name + ' = {');
  if (start < 0) throw new Error('Missing const ' + name);
  const end = script.indexOf('\n    };', start);
  if (end < 0) throw new Error('Could not read const ' + name);
  return script.slice(start, end + '\n    };'.length);
}

async function verifyEmptyCurrentSourceFallback(file) {
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
    aggregatedSources: ['local', 'netease', 'joox', 'kuwo'],
    calls: [],
    safeCover(value) {
      return value || 'cover.jpg';
    },
    getSourceLabel(source) {
      return { netease: '网易云音乐', joox: 'Joox', kuwo: '酷我音乐' }[source] || source;
    },
    async fetch(url) {
      const parsed = new URL(url, 'https://example.test');
      const source = parsed.searchParams.get('source');
      const type = parsed.searchParams.get('types');
      sandbox.calls.push({ source, type });
      if (type === 'url') {
        return { ok: true, async json() { return source === 'joox' ? { url: 'https://cdn.example.test/joox.mp3' } : { url: '' }; } };
      }
      if (source === 'netease') {
        return { ok: true, async json() { return [{ id: 'ne-empty', name: '山海', artist: ['原源歌手'], source: 'netease', url_id: 'ne-empty' }]; } };
      }
      if (source === 'joox') {
        return { ok: true, async json() { return [{ id: 'joox-ok', name: '山海', artist: ['原源歌手'], source: 'joox', url_id: 'joox-ok' }]; } };
      }
      return { ok: true, async json() { return []; } };
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
    pickFunction(script, 'isUnknownArtistName'),
    pickFunction(script, 'hasArtistMatch'),
    pickFunction(script, 'canRelaxKuwoArtistMatch'),
    pickFunction(script, 'getFallbackMatchScore'),
    pickFunction(script, 'pickFallbackTrackMatch'),
    pickFunction(script, 'getFallbackTrackMatches'),
    pickFunction(script, 'normalizeAudioUrl'),
    pickFunction(script, 'isBlockedAudioUrl'),
    pickFunction(script, 'resolveExternalTrackUrl'),
    pickFunction(script, 'resolvePlayableFallbackCandidate'),
    pickFunction(script, 'resolveFallbackTrackFromSource'),
    pickFunction(script, 'normalizeExternalTrack'),
    pickFunction(script, 'fetchGdMusicJson'),
    pickFunction(script, 'searchGdMusicSourceTracks'),
    pickFunction(script, 'fetchExternalSourceTracks'),
    pickFunction(script, 'recoverPlayableTrackUrl')
  ].join('\n'), sandbox);

  const track = {
    title: '山海',
    artist: '原源歌手',
    source: 'netease',
    sourceLabel: '网易云音乐',
    src: '',
    urlId: 'ne-empty'
  };
  const url = await sandbox.recoverPlayableTrackUrl(track, {
    skipSources: ['netease'],
    skipUrls: []
  });
  if (url !== 'https://cdn.example.test/joox.mp3') {
    throw new Error(file + ' should recover from another source when current NetEase has no playable URL');
  }
  if (track.source !== 'joox') {
    throw new Error(file + ' should switch the active track to the recovered source');
  }
  if (!sandbox.calls.some((call) => call.source === 'joox' && call.type === 'search')) {
    throw new Error(file + ' should search the selected alternate source after current source is empty');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await verifyEmptyCurrentSourceFallback(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
