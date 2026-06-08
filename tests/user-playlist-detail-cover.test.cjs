const fs = require('fs');

function pickFunction(script, name) {
  const marker = 'function ' + name + '(';
  const start = script.indexOf(marker);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = start; index < script.length; index += 1) {
    const char = script[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const body = pickFunction(script, 'renderUserPlaylistDetail');

  for (const marker of [
    "var cover = safeCover(track.cover || track.pic || DEFAULT_COVER);",
    `'<img src="' + escapeMarkup(cover) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '>'`
  ]) {
    if (!body.includes(marker)) {
      throw new Error(file + ' renderUserPlaylistDetail should safely render cover marker: ' + marker);
    }
  }

  if (body.includes("'<img src=\"' + cover + '\"") || body.includes("onerror=\"this.src=\\'")) {
    throw new Error(file + ' renderUserPlaylistDetail still injects raw cover HTML');
  }
}
