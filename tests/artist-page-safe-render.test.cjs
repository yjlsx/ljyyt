const fs = require('fs');

for (const file of ['artist.html', 'dist/artist.html']) {
  const html = fs.readFileSync(file, 'utf8');

  for (const marker of [
    'function setArtistPageImage',
    ".replace(/&amp;/g, '&')",
    "title.textContent = track.title || '未知歌曲';",
    "duration.textContent = formatTime(track.duration);",
    "videoTitle.textContent = v.title || '未命名视频';",
    "makeLegacyActionCard(div, '播放歌曲 ' +",
    "makeLegacyActionCard(card, '打开视频 ' +"
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' is missing safe artist page render marker: ' + marker);
    }
  }

  for (const unsafe of [
    "'<img src=\"' + track.cover",
    "'<div class=\"artist-song-info\"><div class=\"artist-song-title\">' + track.title",
    "'<img src=\"' + v.cover",
    "'<div class=\"p-2\"><div class=\"card-title text-truncate\">' + v.title"
  ]) {
    if (html.includes(unsafe)) {
      throw new Error(file + ' still interpolates artist page data into raw HTML: ' + unsafe);
    }
  }
}
