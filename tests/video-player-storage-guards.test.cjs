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

for (const file of ['video-player.html', 'dist/video-player.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const readValue = pickFunction(html, 'readVideoStorageValue');
  const writeValue = pickFunction(html, 'writeVideoStorageValue');
  const appCodeWithoutHelpers = [readValue, writeValue].reduce(
    (source, helper) => source.replace(helper, ''),
    html
  );

  for (const [name, body] of [
    ['readVideoStorageValue', readValue],
    ['writeVideoStorageValue', writeValue]
  ]) {
    if (!/try\s*\{/.test(body) || !/catch\s*\(error\)\s*\{/.test(body)) {
      throw new Error(file + ' ' + name + ' should catch unavailable localStorage');
    }
  }

  for (const marker of ['localStorage.getItem(', 'localStorage.setItem(']) {
    if (appCodeWithoutHelpers.includes(marker)) {
      throw new Error(file + ' still has unsafe video-player storage access: ' + marker);
    }
  }

  for (const expected of [
    "writeVideoStorageValue('videoVolume', volumeSlider.value)",
    "readVideoStorageValue('ljyyt_dark_mode', 'false')",
    "writeVideoStorageValue('ljyyt_dark_mode', d)",
    "readVideoStorageValue('videoVolume', null)"
  ]) {
    if (!html.includes(expected)) {
      throw new Error(file + ' is missing guarded video-player storage call: ' + expected);
    }
  }
}
