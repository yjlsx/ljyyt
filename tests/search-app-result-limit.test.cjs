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
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
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
  throw new Error('Could not extract function ' + name);
}

(async () => {
  for (const file of ['js/search-app.js', 'dist/js/search-app.js']) {
    const script = fs.readFileSync(file, 'utf8');
    const sandbox = {
      DEFAULT_COVER: 'cover.jpg',
      SEARCH_RESULT_LIMIT: 200,
      requests: [],
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
        sandbox.requests.push({ count, page });
        const start = (page - 1) * count;
        const items = Array.from({ length: count }, (_, index) => ({
          id: String(start + index + 1),
          name: 'Song ' + (start + index + 1),
          artist: ['Artist'],
          source: 'kuwo',
          url_id: String(start + index + 1)
        }));
        return { ok: true, async json() { return items; } };
      },
      console: { warn() {} }
    };

    vm.createContext(sandbox);
    vm.runInContext([
      'var GD_MUSIC_API_BASES = ["/api/gd-music"];',
      pickFunction(script, 'fetchGdMusicJson'),
      pickFunction(script, 'safeCover'),
      pickFunction(script, 'getSourceLabel'),
      pickFunction(script, 'normalizeExternalTrack'),
      pickFunction(script, 'resolveExternalCover'),
      pickFunction(script, 'searchExternalSource')
    ].join('\n'), sandbox);

    const tracks = await sandbox.searchExternalSource('Song', 'kuwo');
    if (tracks.length !== 200) {
      throw new Error(file + ' should return 200 external results across pages, got ' + tracks.length);
    }
    const pages = sandbox.requests.map((request) => request.page).join(',');
    if (pages !== '1,2,3,4') {
      throw new Error(file + ' should request pages 1,2,3,4, got ' + pages);
    }
    if (!sandbox.requests.every((request) => request.count === 50)) {
      throw new Error(file + ' should request 50 items per page');
    }
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
