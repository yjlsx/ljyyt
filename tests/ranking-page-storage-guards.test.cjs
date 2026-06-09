const fs = require('fs');
const vm = require('vm');

function pickFunction(source, name) {
  const marker = 'function ' + name + '(';
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === quote) {
        quote = '';
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error('Could not extract function ' + name);
}

function pickInlineScript(source) {
  const match = source.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error('Missing ranking inline script');
  return match[1];
}

function createElement(id) {
  return {
    id,
    className: '',
    innerHTML: '',
    children: [],
    addEventListener() {},
    appendChild(child) {
      this.children.push(child);
      this.innerHTML += child.innerHTML || '';
    }
  };
}

function renderRankingWithStorage(html, storageMap) {
  const elements = {
    'hot-list': createElement('hot-list'),
    'fav-list': createElement('fav-list'),
    'recent-list': createElement('recent-list')
  };
  const sandbox = {
    musicData: [
      { id: 'hot-1', title: 'Hot Song', artist: 'Hot Artist', cover: 'hot.jpg', duration: 181 },
      { id: 'legacy-fav', title: 'Legacy Favorite', artist: 'Legacy Artist', cover: 'legacy-fav.jpg', duration: 182 },
      { id: 'legacy-history', title: 'Legacy History', artist: 'Legacy Artist', cover: 'legacy-history.jpg', duration: 183 },
      { id: 'otter-fav', title: 'Otter Favorite', artist: 'Otter Artist', cover: 'otter-fav.jpg', duration: 184 },
      { id: 'otter-history', title: 'Otter History', artist: 'Otter Artist', cover: 'otter-history.jpg', duration: 185 }
    ],
    currentTrackIndex: 0,
    currentTrack: null,
    playMusic() {},
    localStorage: {
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(storageMap, key) ? storageMap[key] : null;
      }
    },
    document: {
      body: {
        classList: {
          add() {}
        }
      },
      getElementById(id) {
        return elements[id] || createElement(id);
      },
      createElement() {
        return createElement('');
      }
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(pickInlineScript(html), sandbox);
  return elements;
}

for (const file of ['ranking.html', 'dist/ranking.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const readValue = pickFunction(html, 'readRankingStorageValue');
  const readJson = pickFunction(html, 'readRankingStorageJson');
  const appCodeWithoutHelpers = [readValue, readJson].reduce(
    (source, helper) => source.replace(helper, ''),
    html
  );

  for (const [name, body] of [
    ['readRankingStorageValue', readValue],
    ['readRankingStorageJson', readJson]
  ]) {
    if (!/try\s*\{/.test(body) || !/catch\s*\(error\)\s*\{/.test(body)) {
      throw new Error(file + ' ' + name + ' should catch unavailable localStorage');
    }
  }

  if (appCodeWithoutHelpers.includes('localStorage.getItem(')) {
    throw new Error(file + ' still has unsafe ranking-page storage reads');
  }

  for (const expected of [
    "readRankingStorageValue('ljyyt_dark_mode', 'false')",
    "readRankingStorageJson('ljyyt_play_count', {})",
    "readRankingStorageJson(primaryKey, [])",
    "readRankingStorageJson(legacyKey, [])",
    "readRankingList('ljyyt_otter_favorites', 'ljyyt_favorites')",
    "readRankingList('ljyyt_otter_history', 'ljyyt_play_history')"
  ]) {
    if (!html.includes(expected)) {
      throw new Error(file + ' is missing guarded ranking-page storage call: ' + expected);
    }
  }

  const otterElements = renderRankingWithStorage(html, {
    ljyyt_play_count: JSON.stringify({ 'hot-1': 2 }),
    ljyyt_otter_favorites: JSON.stringify([
      { id: 'otter-fav', title: 'Otter Favorite', artist: 'Otter Artist', cover: 'otter-fav.jpg', duration: 184 }
    ]),
    ljyyt_otter_history: JSON.stringify([
      { id: 'otter-history', title: 'Otter History', artist: 'Otter Artist', cover: 'otter-history.jpg', duration: 185 }
    ])
  });
  if (!otterElements['fav-list'].innerHTML.includes('Otter Favorite')) {
    throw new Error(file + ' should render favorites from ljyyt_otter_favorites object storage');
  }
  if (!otterElements['recent-list'].innerHTML.includes('Otter History')) {
    throw new Error(file + ' should render history from ljyyt_otter_history object storage');
  }

  const legacyElements = renderRankingWithStorage(html, {
    ljyyt_favorites: JSON.stringify(['legacy-fav']),
    ljyyt_play_history: JSON.stringify([{ id: 'legacy-history' }])
  });
  if (!legacyElements['fav-list'].innerHTML.includes('Legacy Favorite')) {
    throw new Error(file + ' should still render legacy favorite id storage');
  }
  if (!legacyElements['recent-list'].innerHTML.includes('Legacy History')) {
    throw new Error(file + ' should still render legacy play history storage');
  }
}
