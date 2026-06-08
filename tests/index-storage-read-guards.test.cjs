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

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const readJson = pickFunction(html, 'readStoredJson');
  const readPlayMode = pickFunction(html, 'readStoredPlayModeIndex');
  const appCodeWithoutHelpers = [readJson, readPlayMode].reduce(
    (source, helper) => source.replace(helper, ''),
    html
  );

  if (!/try\s*\{/.test(readJson) || !/catch\s*\(error\)\s*\{/.test(readJson)) {
    throw new Error(file + ' readStoredJson should catch unavailable localStorage reads');
  }

  if (!readJson.includes('localStorage.getItem(key)')) {
    throw new Error(file + ' readStoredJson should directly read keyed localStorage JSON');
  }

  if (appCodeWithoutHelpers.includes('localStorage.getItem(')) {
    throw new Error(file + ' still has unsafe localStorage JSON read outside readStoredJson/readStoredPlayModeIndex');
  }

  for (const expected of [
    'readStoredJson(SEARCH_HISTORY_KEY, [])',
    'readStoredJson(key, null)'
  ]) {
    if (!html.includes(expected)) {
      throw new Error(file + ' is missing guarded index storage read: ' + expected);
    }
  }

  const listReads = html.match(/readStoredJson\(key, \[\]\)/g) || [];
  if (listReads.length < 2) {
    throw new Error(file + ' should use readStoredJson(key, []) for list and legacy history reads');
  }
}
