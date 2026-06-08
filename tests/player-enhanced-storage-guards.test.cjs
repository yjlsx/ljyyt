const fs = require('fs');

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

const unsafeMarkers = [
  'localStorage.getItem(',
  'localStorage.setItem('
];

for (const file of ['player_enhanced.js', 'dist/player_enhanced.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const readValue = pickFunction(script, 'readEnhancedStorageValue');
  const writeValue = pickFunction(script, 'writeEnhancedStorageValue');
  const readJson = pickFunction(script, 'readEnhancedStorageJson');
  const appCodeWithoutHelpers = [readValue, writeValue, readJson].reduce(
    (source, helper) => source.replace(helper, ''),
    script
  );

  for (const [name, body] of [
    ['readEnhancedStorageValue', readValue],
    ['writeEnhancedStorageValue', writeValue],
    ['readEnhancedStorageJson', readJson]
  ]) {
    if (!/try\s*\{/.test(body) || !/catch\s*\(error\)\s*\{/.test(body)) {
      throw new Error(file + ' ' + name + ' should catch unavailable localStorage');
    }
  }

  for (const marker of unsafeMarkers) {
    if (appCodeWithoutHelpers.includes(marker)) {
      throw new Error(file + ' still has unsafe enhanced-player storage access: ' + marker);
    }
  }

  for (const expected of [
    'readEnhancedStorageValue(STORAGE.playMode, ',
    'readEnhancedStorageValue(STORAGE.bottomPlayerLayout, ',
    'readEnhancedStorageJson(STORAGE.favorites, [])',
    'writeEnhancedStorageValue(STORAGE.favorites, JSON.stringify(favorites))',
    'writeEnhancedStorageValue(STORAGE.playMode, playMode)'
  ]) {
    if (!script.includes(expected)) {
      throw new Error(file + ' is missing guarded enhanced-player storage call: ' + expected);
    }
  }
}
