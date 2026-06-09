const fs = require('fs');
const vm = require('vm');

function pickFunction(source, name) {
  let start = source.indexOf('function ' + name);
  if (start > 6 && source.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) return '';
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

function makeClassList(classes) {
  const set = new Set(classes || []);
  return {
    contains(name) {
      return set.has(name);
    },
    toggle(name, enabled) {
      if (enabled) set.add(name);
      else set.delete(name);
    },
    remove(name) {
      set.delete(name);
    }
  };
}

function makePicker(options) {
  const sourceOptions = ['aggregate', 'kuwo'].map((source) => ({
    getAttribute(name) {
      return name === 'data-source' ? source : '';
    },
    classList: makeClassList([]),
    addEventListener() {}
  }));
  return {
    hidden: !!options.hidden,
    classList: makeClassList(options.classes || []),
    getAttribute(name) {
      return name === 'aria-hidden' ? options.ariaHidden || null : null;
    },
    querySelectorAll(selector) {
      return selector === '[data-source]' ? sourceOptions : [];
    },
    contains() {
      return true;
    }
  };
}

function runSourceSetup(script, picker, initialSearch) {
  const sandbox = {
    URL,
    location: { search: initialSearch, href: 'https://example.test/search.html' + initialSearch },
    sourceMap: {
      aggregate: { label: '聚合搜索', source: 'all' },
      kuwo: { label: '酷我', source: 'kuwo' }
    },
    activeSource: 'aggregate',
    document: {
      getElementById(id) {
        if (id === 'source-picker') return picker;
        if (id === 'source-button') return { addEventListener() {} };
        if (id === 'source-label') return { textContent: '' };
        return null;
      },
      addEventListener() {}
    },
    history: {
      replaceState(_state, _title, url) {
        sandbox.replacedUrl = url;
      }
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    'var activeSource = this.activeSource;',
    'var sourceMap = this.sourceMap;',
    pickFunction(script, 'getUrlParameter'),
    pickFunction(script, 'isSourcePickerInteractive'),
    pickFunction(script, 'cleanHiddenSourceParam'),
    pickFunction(script, 'setupSourcePicker'),
    'setupSourcePicker();',
    'this.activeSource = activeSource;'
  ].filter(Boolean).join('\n'), sandbox);
  return sandbox;
}

function runSubmitSearch(script, picker, activeSource) {
  const sandbox = {
    URL,
    location: { href: 'https://example.test/search.html?source=kuwo' },
    activeSource,
    document: {
      getElementById(id) {
        return id === 'source-picker' ? picker : null;
      }
    },
    history: {
      replaceState(_state, _title, url) {
        sandbox.replacedUrl = url;
      }
    },
    addSearchHistory() {},
    performSearch() {},
    renderSearchHistory() {}
  };
  vm.createContext(sandbox);
  vm.runInContext([
    'var activeSource = this.activeSource;',
    pickFunction(script, 'isSourcePickerInteractive'),
    pickFunction(script, 'shouldPersistSourceParam'),
    pickFunction(script, 'submitSearch'),
    'submitSearch("香港", true);'
  ].filter(Boolean).join('\n'), sandbox);
  return new URL(sandbox.replacedUrl);
}

for (const file of ['js/search-app.js', 'dist/js/search-app.js']) {
  const script = fs.readFileSync(file, 'utf8');

  const hiddenPicker = makePicker({ classes: ['sr-only'], ariaHidden: 'true' });
  const hiddenSetup = runSourceSetup(script, hiddenPicker, '?source=kuwo');
  if (hiddenSetup.activeSource !== 'aggregate') {
    throw new Error(file + ' should ignore source=kuwo while the source picker is hidden');
  }
  if (!hiddenSetup.replacedUrl || new URL(hiddenSetup.replacedUrl).searchParams.has('source')) {
    throw new Error(file + ' should remove hidden source params from the search URL');
  }

  const hiddenSubmitUrl = runSubmitSearch(script, hiddenPicker, 'aggregate');
  if (hiddenSubmitUrl.searchParams.has('source')) {
    throw new Error(file + ' should not persist source params when the picker is hidden');
  }

  const visiblePicker = makePicker({ classes: [], ariaHidden: 'false' });
  const visibleSetup = runSourceSetup(script, visiblePicker, '?source=kuwo');
  if (visibleSetup.activeSource !== 'kuwo') {
    throw new Error(file + ' should still honor source params when the source picker is visible');
  }

  const visibleSubmitUrl = runSubmitSearch(script, visiblePicker, 'kuwo');
  if (visibleSubmitUrl.searchParams.get('source') !== 'kuwo') {
    throw new Error(file + ' should persist source params when the picker is visible');
  }
}
