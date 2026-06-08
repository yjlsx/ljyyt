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

(async () => {
  for (const file of ['js/search-app.js', 'dist/js/search-app.js']) {
    const script = fs.readFileSync(file, 'utf8');
    const sandbox = {
      AbortController,
      activeSource: 'aggregate',
      sourceMap: {
        aggregate: { label: '聚合搜索', source: 'all' }
      },
      renders: [],
      resolvers: Object.create(null),
      document: {
        getElementById(id) {
          if (id !== 'search-status') return null;
          return { textContent: '' };
        }
      },
      getLocalResults() {
        return [];
      },
      getVideoResults() {
        return [];
      },
      getPlaylistCards() {
        return [];
      },
      getAggregatedSources() {
        return ['fast', 'slow'];
      },
      searchExternalSource(query, source, signal) {
        return new Promise((resolve, reject) => {
          if (signal) {
            signal.addEventListener('abort', () => {
              reject(Object.assign(new Error('aborted'), { name: 'AbortError' }));
            });
          }
          sandbox.resolvers[source] = resolve;
        });
      },
      displayResults(results, query) {
        sandbox.renders.push({ query, titles: (results.music || []).map((track) => track.title) });
      }
    };

    vm.createContext(sandbox);
    vm.runInContext([
      'var searchRequestId = 0;',
      'var activeSearchAbortController = null;',
      'var SEARCH_RESULT_LIMIT = 200;',
      pickFunction(script, 'uniqueTracks'),
      pickFunction(script, 'runSearch'),
      pickFunction(script, 'performSearch')
    ].join('\n'), sandbox);

    const searchPromise = sandbox.performSearch('香港');
    await flushPromises();
    sandbox.resolvers.fast([{ title: 'Fast Result', source: 'fast' }]);
    await flushPromises();

    if (!sandbox.renders.some((render) => render.titles.includes('Fast Result'))) {
      throw new Error(file + ' should render fast external source results before slow sources finish');
    }

    sandbox.resolvers.slow([{ title: 'Slow Result', source: 'slow' }]);
    await searchPromise;
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
