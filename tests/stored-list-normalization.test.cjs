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

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const readObjectList = pickFunction(html, 'readStoredObjectList');

  if (!readObjectList.includes('filterStoredObjectList(value)')) {
    throw new Error(file + ' readStoredObjectList should filter invalid persisted list entries');
  }
  if (!html.includes('function filterStoredObjectList')) {
    throw new Error(file + ' is missing filterStoredObjectList');
  }
  if (!html.includes('function normalizeStoredPlaylists')) {
    throw new Error(file + ' is missing normalizeStoredPlaylists');
  }
  for (const marker of [
    "readStoredObjectList('ljyyt_otter_favorites')",
    "readStoredObjectList('ljyyt_otter_history')",
    "normalizeStoredPlaylists(readStoredObjectList('ljyyt_otter_playlists'))"
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' should use object-list storage reads for marker: ' + marker);
    }
  }
  if (!html.includes("readStoredList('ljyyt_otter_aggregated_sources')")) {
    throw new Error(file + ' should keep generic list reads for aggregate source string settings');
  }

  const sandbox = {
    localStorage: {
      getItem() {
        return JSON.stringify([
          null,
          'bad',
          42,
          [],
          { title: 'Valid', artist: 'Artist', source: 'local' },
          { title: '', artist: '', cover: '' }
        ]);
      }
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(html, 'readStoredJson'),
    pickFunction(html, 'readStoredList'),
    pickFunction(html, 'filterStoredObjectList'),
    pickFunction(html, 'readStoredObjectList'),
    pickFunction(html, 'normalizeStoredPlaylists'),
    'this.result = readStoredObjectList("tracks");',
    'this.genericResult = readStoredList("tracks");',
    'this.playlists = normalizeStoredPlaylists([{ name: "Mine", count: 99, tracks: [null, "bad", { title: "Song", artist: "Singer" }] }, { name: "Empty", tracks: "bad" }]);'
  ].join('\n'), sandbox);

  if (!Array.isArray(sandbox.result) || sandbox.result.length !== 2) {
    throw new Error(file + ' should keep only plain object entries from stored object lists');
  }
  if (sandbox.result[0].title !== 'Valid' || Array.isArray(sandbox.result[1])) {
    throw new Error(file + ' preserved list entries are not the expected plain objects');
  }
  if (!Array.isArray(sandbox.genericResult) || sandbox.genericResult.length !== 6) {
    throw new Error(file + ' generic readStoredList should preserve non-object array entries');
  }
  if (!Array.isArray(sandbox.playlists) || sandbox.playlists.length !== 2) {
    throw new Error(file + ' normalizeStoredPlaylists should preserve valid playlist objects');
  }
  if (sandbox.playlists[0].tracks.length !== 1 || sandbox.playlists[0].count !== 1) {
    throw new Error(file + ' normalizeStoredPlaylists should filter nested track entries and refresh count');
  }
  if (!Array.isArray(sandbox.playlists[1].tracks) || sandbox.playlists[1].tracks.length !== 0 || sandbox.playlists[1].count !== 0) {
    throw new Error(file + ' normalizeStoredPlaylists should normalize missing or invalid track arrays');
  }

  const nonArraySandbox = {
    localStorage: {
      getItem() {
        return JSON.stringify({ title: 'not a list' });
      }
    }
  };
  vm.createContext(nonArraySandbox);
  vm.runInContext([
    pickFunction(html, 'readStoredJson'),
    pickFunction(html, 'readStoredList'),
    pickFunction(html, 'filterStoredObjectList'),
    pickFunction(html, 'readStoredObjectList'),
    'this.result = readStoredObjectList("tracks");'
  ].join('\n'), nonArraySandbox);

  if (!Array.isArray(nonArraySandbox.result) || nonArraySandbox.result.length !== 0) {
    throw new Error(file + ' should return an empty list for non-array stored values');
  }
}
