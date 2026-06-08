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

for (const file of ['script.js', 'dist/script.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const readValue = pickFunction(script, 'readScriptStorageValue');
  const writeValue = pickFunction(script, 'writeScriptStorageValue');
  const appCodeWithoutHelpers = [readValue, writeValue].reduce(
    (source, helper) => source.replace(helper, ''),
    script
  );

  for (const [name, body] of [
    ['readScriptStorageValue', readValue],
    ['writeScriptStorageValue', writeValue]
  ]) {
    if (!/try\s*\{/.test(body) || !/catch\s*\(error\)\s*\{/.test(body)) {
      throw new Error(file + ' ' + name + ' should catch unavailable localStorage');
    }
  }

  for (const marker of unsafeMarkers) {
    if (appCodeWithoutHelpers.includes(marker)) {
      throw new Error(file + ' still has unsafe script storage access: ' + marker);
    }
  }

  for (const expected of [
    "writeScriptStorageValue('currentTrackId', track.id)",
    "writeScriptStorageValue('lastPlayedTrack', JSON.stringify(track))",
    "readScriptStorageValue('ljyyt_favorites', '[]')"
  ]) {
    if (!script.includes(expected)) {
      throw new Error(file + ' is missing guarded script storage call: ' + expected);
    }
  }
}
