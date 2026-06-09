const fs = require('fs');

for (const relPath of ['README.md', 'dist/README.md']) {
  const readme = fs.readFileSync(relPath, 'utf8');

  for (const stale of [
    'D:\\GitHub\\lijiang-music-website\\',
    '10首纳西族音乐',
    'test_all_features.html',
    'test_tabs.html',
    'test_music_list.html',
    'test_progress.html',
    '直接在浏览器中打开 `index.html` 文件',
    'Bootstrap 5',
    'Font Awesome'
  ]) {
    if (readme.includes(stale)) {
      throw new Error(relPath + ' still contains stale README content: ' + stale);
    }
  }

  for (const marker of [
    'npm run dev',
    'npm test',
    'npm run build',
    'npm run build:oracle',
    'npm run worker:login',
    'npm run deploy:worker',
    'site-config.js',
    'server.js',
    'cloudflare-worker/worker.js',
    'data/audio-sources.json',
    'dist/',
    'D:\\GitHub\\ljyyt\\'
  ]) {
    if (!readme.includes(marker)) {
      throw new Error(relPath + ' is missing current project documentation marker: ' + marker);
    }
  }
}
