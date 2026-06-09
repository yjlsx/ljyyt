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

async function flushPromises() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

function makeSuggestion(type, text) {
  return { type, text, meta: 'remote', icon: 'music', score: 100 };
}

(async () => {
for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const input = { value: 'old' };
  const homeInput = { value: '' };
  const box = { hidden: true, innerHTML: '' };
  const sandbox = {
    clearTimeout() {},
    setTimeout(callback) {
      sandbox.pendingDebounce = callback;
      return 1;
    },
    document: {
      getElementById(id) {
        return id === 'search-suggestions' ? box : null;
      }
    },
    pendingDebounce: null,
    remoteResolvers: Object.create(null),
    applied: [],
    getSearchInput() {
      return input;
    },
    getHomeSearchInput() {
      return homeInput;
    },
    updateSearchClearButton() {},
    setSearchResultsActive() {},
    hideSearchHistory() {},
    renderIndexDiscoverPlaylists() {},
    hideSearchSuggestions() {
      sandbox.searchSuggestionRequestId += 1;
      box.hidden = true;
    },
    ensureLibraryTracks() {
      return Promise.resolve([]);
    },
    buildSearchSuggestions() {
      return { artist: [], song: [], album: [], playlist: [], history: [] };
    },
    applySearchSuggestionGroups(_box, suggestions) {
      sandbox.applied.push(suggestions);
      box.hidden = false;
      return true;
    },
    fetchNeteaseSuggestions(query) {
      return new Promise((resolve) => {
        sandbox.remoteResolvers[query] = resolve;
      });
    },
    groupSuggestionItems(items) {
      const groups = { artist: [], song: [], album: [], playlist: [], history: [] };
      (items || []).forEach((item) => {
        groups[item.type || 'song'].push(item);
      });
      return groups;
    },
    mergeSuggestionGroups(primary) {
      return primary;
    }
  };

  vm.createContext(sandbox);
  vm.runInContext([
    'var searchSuggestionRequestId = 0;',
    'var suggestionDebounceTimer = null;',
    pickFunction(script, 'renderSearchSuggestions'),
    pickFunction(script, 'handleDiscoverSearchInput'),
    'this.renderSearchSuggestions = renderSearchSuggestions;',
    'this.handleDiscoverSearchInput = handleDiscoverSearchInput;',
    'this.searchSuggestionRequestId = searchSuggestionRequestId;'
  ].join('\n'), sandbox);

  const oldRender = sandbox.renderSearchSuggestions('old');
  await flushPromises();
  if (!sandbox.remoteResolvers.old) {
    throw new Error(file + ' did not start the old remote suggestion request');
  }

  input.value = 'new';
  sandbox.handleDiscoverSearchInput();
  sandbox.remoteResolvers.old([makeSuggestion('song', 'Old remote song')]);
  await oldRender;
  await flushPromises();

  const staleRemoteRendered = sandbox.applied.some((groups) =>
    groups && groups.song && groups.song.some((item) => item.text === 'Old remote song')
  );
  if (staleRemoteRendered) {
    throw new Error(file + ' allowed an old remote suggestion response to render during the new query debounce window');
  }
}
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
