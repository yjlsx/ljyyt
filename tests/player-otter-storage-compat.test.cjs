const fs = require('fs');
const vm = require('vm');

function pickFunction(source, name, required = true) {
  const marker = 'function ' + name + '(';
  const start = source.indexOf(marker);
  if (start < 0) {
    if (!required) return '';
    throw new Error('Missing function ' + name);
  }
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

function createStorage(initial) {
  const writes = {};
  return {
    writes,
    getItem(key) {
      if (Object.prototype.hasOwnProperty.call(writes, key)) return writes[key];
      return Object.prototype.hasOwnProperty.call(initial, key) ? initial[key] : null;
    },
    setItem(key, value) {
      writes[key] = String(value);
    }
  };
}

function parseStored(storage, key) {
  return JSON.parse(storage.writes[key] || 'null');
}

function createDomStub() {
  return {
    body: {
      classList: {
        add() {},
        remove() {},
        toggle() {}
      },
      appendChild() {}
    },
    createElement() {
      return {
        style: {},
        textContent: '',
        parentNode: null,
        remove() {}
      };
    },
    getElementById() {
      return null;
    },
    dispatchEvent() {},
    addEventListener() {},
    querySelectorAll() {
      return [];
    },
    querySelector() {
      return null;
    }
  };
}

function runEnhancedStorageScenario(file) {
  const script = fs.readFileSync(file, 'utf8');
  const storage = createStorage({
    ljyyt_otter_favorites: JSON.stringify([
      { id: 'song-1', title: 'Otter Favorite', artist: 'Otter Artist', cover: 'fav.jpg' }
    ]),
    ljyyt_otter_history: JSON.stringify([
      { id: 'song-1', title: 'Otter History', artist: 'Otter Artist', cover: 'history.jpg' }
    ])
  });
  const sandbox = {
    localStorage: storage,
    document: createDomStub(),
    window: {},
    CustomEvent: function CustomEvent(name, options) {
      this.name = name;
      this.detail = options && options.detail;
    },
    musicData: [
      { id: 'song-1', title: 'Otter Favorite', artist: 'Otter Artist', cover: 'fav.jpg' },
      { id: 'song-2', title: 'New Favorite', artist: 'New Artist', cover: 'new.jpg' }
    ],
    currentTrackIndex: 1,
    toast() {}
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext([
    pickVarObject(script, 'STORAGE'),
    'var favorites = [];',
    'var favoriteTracks = [];',
    'var playHistory = [];',
    pickFunction(script, 'readEnhancedStorageValue'),
    pickFunction(script, 'writeEnhancedStorageValue'),
    pickFunction(script, 'readEnhancedStorageJson'),
    pickFunction(script, 'normalizeEnhancedStorageList', false),
    pickFunction(script, 'getEnhancedTrackId', false),
    pickFunction(script, 'sameEnhancedTrackId', false),
    pickFunction(script, 'findEnhancedTrackById', false),
    pickFunction(script, 'getEnhancedTrackSnapshot', false),
    pickFunction(script, 'readEnhancedTrackList', false),
    pickFunction(script, 'writeEnhancedTrackList', false),
    pickFunction(script, 'loadFavorites'),
    pickFunction(script, 'saveFavorites'),
    pickFunction(script, 'isFav'),
    pickFunction(script, 'updateFavBtn'),
    pickFunction(script, 'toggleFav'),
    pickFunction(script, 'loadHistory'),
    pickFunction(script, 'saveHistory'),
    pickFunction(script, 'addHistory'),
    'loadFavorites();',
    'this.favoriteBefore = isFav("song-1");',
    'toggleFav("song-2");',
    'addHistory(musicData[1]);'
  ].join('\n'), sandbox);

  if (sandbox.favoriteBefore !== true) {
    throw new Error(file + ' should recognize favorites from ljyyt_otter_favorites object storage');
  }
  const favoritesWrite = parseStored(storage, 'ljyyt_otter_favorites');
  if (!Array.isArray(favoritesWrite) || !favoritesWrite.some((track) => track && track.id === 'song-2' && track.title === 'New Favorite')) {
    throw new Error(file + ' should write enhanced favorites to ljyyt_otter_favorites as track objects');
  }
  const historyWrite = parseStored(storage, 'ljyyt_otter_history');
  if (!Array.isArray(historyWrite) || !historyWrite[0] || historyWrite[0].id !== 'song-2') {
    throw new Error(file + ' should write enhanced history to ljyyt_otter_history');
  }
}

function runPlayerPageStorageScenario(file) {
  const script = fs.readFileSync(file, 'utf8');
  const storage = createStorage({
    ljyyt_otter_favorites: JSON.stringify([
      { id: 'song-1', title: 'Otter Favorite', artist: 'Otter Artist', cover: 'fav.jpg' }
    ]),
    ljyyt_otter_history: JSON.stringify([
      { id: 'song-1', title: 'Otter History', artist: 'Otter Artist', cover: 'history.jpg' }
    ])
  });
  const sandbox = {
    localStorage: storage,
    document: createDomStub(),
    window: {
      LJYYTIcons: {}
    },
    CustomEvent: function CustomEvent(name, options) {
      this.name = name;
      this.detail = options && options.detail;
    },
    musicData: [
      { id: 'song-1', title: 'Otter Favorite', artist: 'Otter Artist', cover: 'fav.jpg' },
      { id: 'song-2', title: 'New Favorite', artist: 'New Artist', cover: 'new.jpg' }
    ],
    currentTrackIndex: 1
  };
  sandbox.window.toast = function() {};
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'readPlayerPageStorageValue'),
    pickFunction(script, 'writePlayerPageStorageValue'),
    pickFunction(script, 'readPlayerPageStorageJson'),
    pickFunction(script, 'normalizePlayerPageStorageList', false),
    pickFunction(script, 'getPlayerPageTrackId', false),
    pickFunction(script, 'samePlayerPageTrackId', false),
    pickFunction(script, 'findPlayerPageTrackById', false),
    pickFunction(script, 'getPlayerPageTrackSnapshot', false),
    pickFunction(script, 'readPlayerPageTrackList', false),
    pickFunction(script, 'writePlayerPageTrackList', false),
    pickFunction(script, 'readJsonList'),
    pickFunction(script, 'writeJsonList'),
    pickFunction(script, 'getCurrentTrack'),
    pickFunction(script, 'getTrackById'),
    pickFunction(script, 'getFavorites'),
    pickFunction(script, 'isFavoriteTrack'),
    pickFunction(script, 'updateFavoriteButton'),
    pickFunction(script, 'toggleFavorite'),
    pickFunction(script, 'addHistory'),
    'this.favoriteBefore = isFavoriteTrack("song-1");',
    'toggleFavorite("song-2");',
    'addHistory(musicData[1]);'
  ].join('\n'), sandbox);

  if (sandbox.favoriteBefore !== true) {
    throw new Error(file + ' should recognize player-page favorites from ljyyt_otter_favorites object storage');
  }
  const favoritesWrite = parseStored(storage, 'ljyyt_otter_favorites');
  if (!Array.isArray(favoritesWrite) || !favoritesWrite.some((track) => track && track.id === 'song-2' && track.title === 'New Favorite')) {
    throw new Error(file + ' should write player-page favorites to ljyyt_otter_favorites as track objects');
  }
  const historyWrite = parseStored(storage, 'ljyyt_otter_history');
  if (!Array.isArray(historyWrite) || !historyWrite[0] || historyWrite[0].id !== 'song-2') {
    throw new Error(file + ' should write player-page history to ljyyt_otter_history');
  }
}

for (const file of ['player_enhanced.js', 'dist/player_enhanced.js']) {
  runEnhancedStorageScenario(file);
}

for (const file of ['music_player_page.js', 'dist/music_player_page.js']) {
  runPlayerPageStorageScenario(file);
}
