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

for (const file of ['music_player_page.js', 'dist/music_player_page.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const readValue = pickFunction(script, 'readPlayerPageStorageValue');
  const writeValue = pickFunction(script, 'writePlayerPageStorageValue');
  const readJson = pickFunction(script, 'readPlayerPageStorageJson');
  const appCodeWithoutHelpers = [readValue, writeValue, readJson].reduce(
    (source, helper) => source.replace(helper, ''),
    script
  );

  for (const [name, body] of [
    ['readPlayerPageStorageValue', readValue],
    ['writePlayerPageStorageValue', writeValue],
    ['readPlayerPageStorageJson', readJson]
  ]) {
    if (!/try\s*\{/.test(body) || !/catch\s*\(error\)\s*\{/.test(body)) {
      throw new Error(file + ' ' + name + ' should catch unavailable localStorage');
    }
  }

  for (const marker of ['localStorage.getItem(', 'localStorage.setItem(']) {
    if (appCodeWithoutHelpers.includes(marker)) {
      throw new Error(file + ' still has unsafe music-player storage access: ' + marker);
    }
  }

  for (const expected of [
    "readPlayerPageStorageJson('ljyyt_lyrics_overrides', {})",
    "writePlayerPageStorageValue('ljyyt_lyrics_overrides', JSON.stringify(lyricsOverrides))",
    'readPlayerPageStorageJson(key, [])',
    "readPlayerPageStorageValue('ljyyt_play_mode', 'order')",
    "writePlayerPageStorageValue('ljyyt_play_mode', next)"
  ]) {
    if (!script.includes(expected)) {
      throw new Error(file + ' is missing guarded music-player storage call: ' + expected);
    }
  }
}
