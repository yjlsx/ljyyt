const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');

  for (const marker of [
    'const PLAYLIST_SORT_KEY',
    "playlistSortMode: 'added'",
    'function getPlaylistSortMode',
    'function sortPlaylistTracks',
    'function renderPlaylistSortControls',
    "renderPlaylistSortControls('market')",
    "renderPlaylistSortControls('user')",
    "data-playlist-sort=\"title\"",
    "data-playlist-sort=\"artist\"",
    "bilibiliMatchKeywords: ''",
    'function getBilibiliMatchKeywords',
    'id="bilibili-match-keywords"',
    'setBilibiliMatchKeywords',
    'source === \'migu\' ? 800 : 300',
    "kuwoLxApiBase",
    "qqOfficialApiBase",
    'data-source="kuwo"',
    "source: 'qq'"
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' is missing Otter upstream parity marker: ' + marker);
    }
  }
}

for (const file of ['server.js', 'cloudflare-worker/worker.js']) {
  const source = fs.readFileSync(file, 'utf8');

  for (const marker of [
    'QQ_OFFICIAL_MEDIA_URL',
    'QQ_LX_MEDIA_URL',
    'KUWO_LX_MEDIA_URL',
    'resolveQqOfficialUrl',
    'resolveQqMusicUrl',
    'resolveKuwoLxUrl',
    'resolveKuwoUrl'
  ]) {
    if (!source.includes(marker)) {
      throw new Error(file + ' is missing Otter upstream audio source marker: ' + marker);
    }
  }
}
