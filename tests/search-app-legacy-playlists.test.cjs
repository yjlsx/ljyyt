const fs = require('fs');
const vm = require('vm');

function pickFunction(source, name) {
  const marker = 'function ' + name + '(';
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
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
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error('Could not extract function ' + name);
}

function pickVarObject(source, name) {
  const marker = 'var ' + name + ' = {';
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('Missing var object ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
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
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        const semicolon = source.indexOf(';', index);
        return source.slice(start, semicolon + 1);
      }
    }
  }
  throw new Error('Could not extract var object ' + name);
}

function runScenario(file) {
  const script = fs.readFileSync(file, 'utf8');
  const storage = {
    ljyyt_favorites: JSON.stringify([101]),
    ljyyt_play_history: JSON.stringify([{ id: 102 }])
  };
  const sandbox = {
    DEFAULT_COVER: 'cover.jpg',
    musicData: [
      { id: 101, title: 'Legacy Favorite', artist: 'Legacy Artist', cover: 'fav.jpg' },
      { id: 102, title: 'Legacy History', artist: 'History Artist', cover: 'history.jpg' }
    ],
    localStorage: {
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null;
      }
    },
    window: {
      LJYYTIcons: {}
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    'var DEFAULT_COVER = "cover.jpg";',
    pickVarObject(script, 'sourceMap'),
    pickFunction(script, 'readStoredList'),
    pickFunction(script, 'readStoredJson'),
    pickFunction(script, 'safeCover'),
    pickFunction(script, 'getSourceLabel'),
    pickFunction(script, 'normalizeLocalTrack'),
    pickFunction(script, 'getMusicLibrary'),
    pickFunction(script, 'getStoredTracks'),
    pickFunction(script, 'uniqueTracks'),
    pickFunction(script, 'pickTracksByKeyword'),
    pickFunction(script, 'createDiscoverPlaylists'),
    'this.playlists = createDiscoverPlaylists();'
  ].join('\n'), sandbox);

  const favorites = sandbox.playlists.find((item) => item.id === 'favorites');
  const history = sandbox.playlists.find((item) => item.id === 'history');
  if (!favorites || !favorites.tracks.some((track) => track.title === 'Legacy Favorite')) {
    throw new Error(file + ' should build the favorites playlist from legacy ljyyt_favorites ids');
  }
  if (!history || !history.tracks.some((track) => track.title === 'Legacy History')) {
    throw new Error(file + ' should build the history playlist from legacy ljyyt_play_history ids');
  }
}

for (const file of ['js/search-app.js', 'dist/js/search-app.js']) {
  runScenario(file);
}
