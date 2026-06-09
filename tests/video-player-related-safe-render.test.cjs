const fs = require('fs');

function pickFunction(source, name) {
  const marker = 'function ' + name + '(';
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
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
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

for (const file of ['video-player.html', 'dist/video-player.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const renderList = pickFunction(html, 'renderList');

  for (const marker of [
    'function setVideoPlayerImage',
    "title.textContent = v.title || '未命名视频';",
    "artist.textContent = splitArtistNamesLocal(v.artist).join('、') || String(v.artist || '未知艺术家');",
    "card.addEventListener('click', function() {",
    ".replace(/&amp;/g, '&')"
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' is missing safe related-video render marker: ' + marker);
    }
  }

  if (/list\.innerHTML\s*\+=/.test(renderList)) {
    throw new Error(file + ' still appends related videos with raw HTML strings');
  }
  if (/onclick=\"location\.href=/.test(renderList)) {
    throw new Error(file + ' still uses inline onclick for related video cards');
  }
  if (/\$\{v\.(?:cover|title|artist|id)\}/.test(renderList)) {
    throw new Error(file + ' still interpolates video fields inside related video HTML');
  }
}
