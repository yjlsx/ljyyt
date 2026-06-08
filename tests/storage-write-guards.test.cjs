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

const unsafeStorageWrites = [
  "localStorage.setItem(key, JSON.stringify(value));",
  "localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(clean));",
  "localStorage.removeItem(SEARCH_HISTORY_KEY);",
  "localStorage.removeItem(key);",
  "localStorage.setItem('ljyyt_play_mode_index', playModeIndex);",
  "sessionStorage.removeItem(SEARCH_HISTORY_KEY);",
  "sessionStorage.removeItem(key);"
];

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const writeJson = pickFunction(html, 'writeStoredJson');
  const removeItem = pickFunction(html, 'removeStoredItem');
  const removeSessionItem = pickFunction(html, 'removeSessionItem');
  const writeValue = pickFunction(html, 'writeStoredValue');
  const appCodeWithoutHelpers = [writeJson, removeItem, removeSessionItem, writeValue].reduce(
    (source, helper) => source.replace(helper, ''),
    html
  );

  for (const [name, body] of [
    ['writeStoredJson', writeJson],
    ['removeStoredItem', removeItem],
    ['removeSessionItem', removeSessionItem],
    ['writeStoredValue', writeValue]
  ]) {
    if (!/try\s*\{/.test(body) || !/catch\s*\(error\)\s*\{/.test(body)) {
      throw new Error(file + ' ' + name + ' should catch unavailable localStorage writes');
    }
  }

  for (const marker of unsafeStorageWrites) {
    if (appCodeWithoutHelpers.includes(marker)) {
      throw new Error(file + ' still has unsafe storage write: ' + marker);
    }
  }

  for (const expected of [
    'writeStoredJson(key, value)',
    'writeStoredJson(SEARCH_HISTORY_KEY, clean)',
    'removeStoredItem(SEARCH_HISTORY_KEY)',
    'removeStoredItem(key)',
    'removeSessionItem(SEARCH_HISTORY_KEY)',
    'removeSessionItem(key)',
    "writeStoredValue('ljyyt_play_mode_index', playModeIndex)"
  ]) {
    if (!html.includes(expected)) {
      throw new Error(file + ' is missing guarded storage call: ' + expected);
    }
  }
}
