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

for (const file of ['ranking.html', 'dist/ranking.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const renderRank = pickFunction(html, 'renderRank');

  for (const marker of [
    'function setRankingImage',
    ".replace(/&amp;/g, '&')",
    "song.textContent = track.title || '未知歌曲';",
    "artist.textContent = track.artist || '未知歌手';",
    "countValue.textContent = String(count);",
    "duration.textContent = formatTime(track.duration);"
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' is missing safe ranking render marker: ' + marker);
    }
  }

  for (const unsafe of [
    "'<img src=\"' + track.cover",
    "'<div class=\"rank-song\">' + track.title",
    "'<div class=\"rank-artist\">' + track.artist",
    "'<div class=\"rank-count\">' + count"
  ]) {
    if (renderRank.includes(unsafe)) {
      throw new Error(file + ' still interpolates ranking data into raw HTML: ' + unsafe);
    }
  }
}
