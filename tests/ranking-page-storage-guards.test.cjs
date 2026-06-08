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
    "readRankingStorageJson('ljyyt_favorites', [])",
    "readRankingStorageJson('ljyyt_play_history', [])"
  ]) {
    if (!html.includes(expected)) {
      throw new Error(file + ' is missing guarded ranking-page storage call: ' + expected);
    }
  }
}
