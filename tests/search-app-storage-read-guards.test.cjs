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

for (const file of ['js/search-app.js', 'dist/js/search-app.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const readJson = pickFunction(script, 'readStoredJson');
  const appCodeWithoutHelper = script.replace(readJson, '');

  if (!/try\s*\{/.test(readJson) || !/catch\s*\(error\)\s*\{/.test(readJson)) {
    throw new Error(file + ' readStoredJson should catch unavailable localStorage reads');
  }

  if (!readJson.includes('localStorage.getItem(key)')) {
    throw new Error(file + ' readStoredJson should be the only direct localStorage read');
  }

  if (appCodeWithoutHelper.includes('localStorage.getItem(')) {
    throw new Error(file + ' still has unsafe search-app storage read outside readStoredJson');
  }

  for (const expected of [
    "readStoredJson(key, [])",
    "readStoredJson('ljyyt_search_player_state', null)"
  ]) {
    if (!script.includes(expected)) {
      throw new Error(file + ' is missing guarded search-app storage read: ' + expected);
    }
  }
}
