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

function runInitialState(script, query) {
  const sandbox = {
    discoverPlaylists: [{ tracks: [{ title: 'Default Discover Song' }] }],
    renders: [],
    searches: [],
    discoverCount: 0,
    renderDiscover() {
      sandbox.discoverCount += 1;
    },
    getPlaylistCards(value) {
      return [{ name: value ? 'Matched Playlist' : 'Default Playlist' }];
    },
    displayResults(results, value) {
      sandbox.renders.push({
        query: value,
        music: (results.music || []).map((track) => track.title),
        playlists: (results.playlists || []).map((item) => item.name)
      });
    },
    performSearch(value) {
      sandbox.searches.push(value);
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    'var discoverPlaylists = this.discoverPlaylists;',
    pickFunction(script, 'renderInitialSearchState'),
    'renderInitialSearchState(' + JSON.stringify(query) + ');'
  ].join('\n'), sandbox);
  return sandbox;
}

for (const file of ['js/search-app.js', 'dist/js/search-app.js']) {
  const script = fs.readFileSync(file, 'utf8');

  const queryState = runInitialState(script, '香港');
  if (queryState.discoverCount !== 1) {
    throw new Error(file + ' should still render discover modules on query init');
  }
  if (queryState.searches.length !== 1 || queryState.searches[0] !== '香港') {
    throw new Error(file + ' should start the real URL query search during init');
  }
  if (queryState.renders.length !== 1 || queryState.renders[0].music.length !== 0) {
    throw new Error(file + ' should not render the default discover playlist as URL query results');
  }
  if (queryState.renders[0].playlists[0] !== 'Matched Playlist') {
    throw new Error(file + ' should keep query-matched playlists visible while searching');
  }

  const emptyState = runInitialState(script, '');
  if (emptyState.searches.length !== 0) {
    throw new Error(file + ' should not perform a search when there is no URL query');
  }
  if (emptyState.renders.length !== 1 || emptyState.renders[0].music[0] !== 'Default Discover Song') {
    throw new Error(file + ' should keep the default discover playlist for empty search init');
  }
}
