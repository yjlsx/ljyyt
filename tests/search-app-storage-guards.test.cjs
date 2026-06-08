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
  'localStorage.setItem(',
  'localStorage.removeItem(',
  'sessionStorage.removeItem('
];

for (const file of ['js/search-app.js', 'dist/js/search-app.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const writeJson = pickFunction(script, 'writeStoredJson');
  const removeItem = pickFunction(script, 'removeStoredItem');
  const removeSessionItem = pickFunction(script, 'removeSessionItem');
  const appCodeWithoutHelpers = [writeJson, removeItem, removeSessionItem].reduce(
    (source, helper) => source.replace(helper, ''),
    script
  );

  for (const [name, body] of [
    ['writeStoredJson', writeJson],
    ['removeStoredItem', removeItem],
    ['removeSessionItem', removeSessionItem]
  ]) {
    if (!/try\s*\{/.test(body) || !/catch\s*\(error\)\s*\{/.test(body)) {
      throw new Error(file + ' ' + name + ' should catch unavailable storage writes');
    }
  }

  for (const marker of unsafeMarkers) {
    if (appCodeWithoutHelpers.includes(marker)) {
      throw new Error(file + ' still has an unsafe storage write: ' + marker);
    }
  }

  for (const expected of [
    'writeStoredJson(key, Array.isArray(value) ? value : [])',
    'removeStoredItem(SEARCH_HISTORY_KEY)',
    'removeSessionItem(SEARCH_HISTORY_KEY)',
    "writeStoredJson('ljyyt_search_player_state', {"
  ]) {
    if (!script.includes(expected)) {
      throw new Error(file + ' is missing guarded storage call: ' + expected);
    }
  }
}
