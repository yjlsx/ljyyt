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
}

(async () => {
for (const file of ['js/search-app.js', 'dist/js/search-app.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const runSearch = pickFunction(script, 'runSearch');
  const performSearch = pickFunction(script, 'performSearch');
  const playTrack = pickFunction(script, 'playTrack');

  for (const marker of [
    'var searchRequestId = 0;',
    'var activeSearchAbortController = null;',
    'var searchPlayRequestId = 0;'
  ]) {
    if (!script.includes(marker)) {
      throw new Error(file + ' is missing search race state marker: ' + marker);
    }
  }

  if (!runSearch.includes('async function runSearch(query, signal)')) {
    throw new Error(file + ' runSearch should accept a cancellation signal');
  }
  if (!runSearch.includes('externalSources: externalSources')) {
    throw new Error(file + ' runSearch should return the external sources for progressive rendering');
  }
  if (!performSearch.includes('searchExternalSource(query, source, signal)')) {
    throw new Error(file + ' performSearch should pass the active search signal to external sources');
  }

  for (const marker of [
    'var requestId = ++searchRequestId;',
    'if (activeSearchAbortController) activeSearchAbortController.abort();',
    'activeSearchAbortController = new AbortController();',
    'var signal = activeSearchAbortController.signal;',
    'var results = await runSearch(query, signal);',
    'if (requestId !== searchRequestId) return;'
  ]) {
    if (!performSearch.includes(marker)) {
      throw new Error(file + ' performSearch is missing stale-result guard marker: ' + marker);
    }
  }

  if (!playTrack.includes('var requestId = ++searchPlayRequestId;')) {
    throw new Error(file + ' playTrack should capture a playback request id');
  }
  const playTrackStaleGuards = playTrack.match(/requestId !== searchPlayRequestId/g) || [];
  if (playTrackStaleGuards.length < 3) {
    throw new Error(file + ' playTrack should guard URL resolution, empty URL handling, and save/play callbacks');
  }

  const searchSandbox = {
    AbortController,
    statusText: '',
    rendered: [],
    resolvers: Object.create(null),
    aborted: [],
    document: {
      getElementById(id) {
        if (id !== 'search-status') return null;
        return {
          set textContent(value) {
            searchSandbox.statusText = value;
          },
          get textContent() {
            return searchSandbox.statusText;
          }
        };
      }
    },
    getPlaylistCards() {
      return [];
    },
    displayResults(results, query) {
      searchSandbox.rendered.push({ query, results });
    },
    runSearch(query, signal) {
      signal.addEventListener('abort', function() {
        searchSandbox.aborted.push(query);
      });
      return new Promise((resolve) => {
        searchSandbox.resolvers[query] = resolve;
      });
    }
  };
  vm.createContext(searchSandbox);
  vm.runInContext([
    'var searchRequestId = 0;',
    'var activeSearchAbortController = null;',
    performSearch
  ].join('\n'), searchSandbox);

  const firstSearch = searchSandbox.performSearch('slow');
  const secondSearch = searchSandbox.performSearch('fast');
  searchSandbox.resolvers.fast({ music: [{ title: 'Fast' }], video: [], playlists: [] });
  await flushPromises();
  searchSandbox.resolvers.slow({ music: [{ title: 'Slow' }], video: [], playlists: [] });
  await Promise.allSettled([firstSearch, secondSearch]);

  if (!searchSandbox.aborted.includes('slow')) {
    throw new Error(file + ' did not abort the stale search request');
  }
  if (searchSandbox.rendered.length !== 1 || searchSandbox.rendered[0].query !== 'fast') {
    throw new Error(file + ' allowed stale search results to render over the latest query');
  }

  const playbackSandbox = {
    currentResults: { music: [] },
    searchAudio: {
      src: '',
      playCalls: [],
      play() {
        this.playCalls.push(this.src);
        return Promise.resolve();
      }
    },
    searchIsPlaying: false,
    searchCurrentTrack: null,
    searchCurrentIndex: -1,
    resolved: Object.create(null),
    miniUpdates: [],
    saved: [],
    sheets: [],
    updateMiniPlayer(track) {
      playbackSandbox.searchCurrentTrack = track || null;
      playbackSandbox.miniUpdates.push(track && track.title);
    },
    resolveExternalTrackUrl(track) {
      return new Promise((resolve) => {
        playbackSandbox.resolved[track.title] = resolve;
      });
    },
    openActionSheet(track) {
      playbackSandbox.sheets.push(track);
    },
    saveSearchPlayerState(track, url) {
      playbackSandbox.saved.push({ title: track.title, url });
    },
    updateMiniPlayButton() {},
    playLocalTrack() {
      throw new Error('unexpected local playback');
    }
  };
  vm.createContext(playbackSandbox);
  vm.runInContext([
    'var searchPlayRequestId = 0;',
    playTrack
  ].join('\n'), playbackSandbox);

  const slowTrack = { title: 'Slow Track', source: 'joox', urlId: 'slow' };
  const fastTrack = { title: 'Fast Track', source: 'joox', urlId: 'fast' };
  const firstPlay = playbackSandbox.playTrack(slowTrack, 0);
  const secondPlay = playbackSandbox.playTrack(fastTrack, 1);
  playbackSandbox.resolved['Fast Track']('https://cdn.example.test/fast.mp3');
  await secondPlay;
  await flushPromises();
  playbackSandbox.resolved['Slow Track']('https://cdn.example.test/slow.mp3');
  await firstPlay;
  await flushPromises();

  if (playbackSandbox.searchAudio.src !== 'https://cdn.example.test/fast.mp3') {
    throw new Error(file + ' allowed stale playback resolution to overwrite the latest audio src');
  }
  if (playbackSandbox.saved.length !== 1 || playbackSandbox.saved[0].title !== 'Fast Track') {
    throw new Error(file + ' allowed stale playback resolution to save old player state');
  }
  if (playbackSandbox.sheets.length) {
    throw new Error(file + ' opened an action sheet for a stale playback request');
  }
}
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
