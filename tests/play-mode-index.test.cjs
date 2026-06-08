const fs = require('fs');
const vm = require('vm');

function pickFunction(source, name) {
  const marker = 'function ' + name + '(';
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let inString = '';
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === inString) {
        inString = '';
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = ch;
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

function evaluateHelper(html) {
  const helper = pickFunction(html, 'readStoredPlayModeIndex');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(helper + '\nthis.readStoredPlayModeIndex = readStoredPlayModeIndex;', sandbox);
  return sandbox.readStoredPlayModeIndex;
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes("Number(localStorage.getItem('ljyyt_play_mode_index') || 0) % 3")) {
    throw new Error(file + ' still initializes playModeIndex with unsafe modulo parsing');
  }

  const readStoredPlayModeIndex = evaluateHelper(html);
  const cases = [
    [null, 0],
    ['abc', 0],
    ['-1', 2],
    ['4.9', 1],
    ['2', 2]
  ];

  for (const [stored, expected] of cases) {
    const localStorage = {
      getItem(key) {
        if (key !== 'ljyyt_play_mode_index') throw new Error('Unexpected key: ' + key);
        return stored;
      }
    };
    const actual = readStoredPlayModeIndex(localStorage);
    if (actual !== expected) {
      throw new Error(file + ' normalizes stored play mode ' + stored + ' to ' + actual + ', expected ' + expected);
    }
  }

  const throwingStorage = {
    getItem() {
      throw new Error('storage unavailable');
    }
  };
  if (readStoredPlayModeIndex(throwingStorage) !== 0) {
    throw new Error(file + ' should fall back to order mode when localStorage is unavailable');
  }
}
