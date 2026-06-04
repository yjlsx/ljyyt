const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];

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

const sandbox = {
  DEFAULT_COVER: 'cover.jpg',
  SEARCH_RESULT_LIMIT: 200,
  gdMusicApiBase: '/api/gd-music',
  gdMusicFallbackBases: [],
  _isLocalDev: true,
  AbortController,
  DOMException,
  setTimeout,
  clearTimeout,
  requestedCounts: [],
  safeCover(value) {
    return value || 'cover.jpg';
  },
  getSourceLabel(source) {
    return source;
  },
  async fetch(url) {
    const parsed = new URL(url, 'https://example.test');
    const count = Number(parsed.searchParams.get('count') || 0);
    const page = Number(parsed.searchParams.get('pages') || 1);
    sandbox.requestedCounts.push(String(count));
    const start = (page - 1) * count;
    const items = Array.from({ length: count }, (_, index) => ({
      id: String(start + index + 1),
      name: 'Song ' + (start + index + 1),
      artist: ['Artist'],
      source: 'kuwo',
      url_id: String(start + index + 1)
    }));
    return { ok: true, async json() { return items; } };
  }
};

vm.createContext(sandbox);
vm.runInContext([
  pickFunction('fetchGdMusicJson'),
  pickFunction('parseTrackDuration'),
  pickFunction('normalizeExternalTrack'),
  pickFunction('resolveExternalCover'),
  pickFunction('fetchExternalSourceTracks'),
  pickFunction('searchExternalSource')
].join('\n'), sandbox);

(async () => {
  const tracks = await sandbox.searchExternalSource('Song', 'kuwo');
  if (tracks.length !== 200) {
    throw new Error('Expected 200 search results across pages, got ' + tracks.length);
  }
  if (sandbox.requestedCounts.includes('20')) {
    throw new Error('Search still requests count=20');
  }
  if (!sandbox.requestedCounts.every((count) => count === '50')) {
    throw new Error('Expected paged search requests of 50, got ' + sandbox.requestedCounts.join(','));
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
