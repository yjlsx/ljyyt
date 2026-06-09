const fs = require('fs');
const path = require('path');

function existingHtmlFiles() {
  return new Set(
    fs.readdirSync('.')
      .filter((file) => file.endsWith('.html'))
      .concat(fs.readdirSync('dist').filter((file) => file.endsWith('.html')))
  );
}

for (const file of ['js/search-app.js', 'dist/js/search-app.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const knownHtml = existingHtmlFiles();
  const routeMatches = script.match(/['"]([^'"]+\.html)(?:\?[^'"]*)?['"]/g) || [];
  for (const raw of routeMatches) {
    const route = raw.slice(1, -1).split('?')[0];
    const target = path.basename(route);
    if (!knownHtml.has(target)) {
      throw new Error(file + ' points to a missing HTML route: ' + target);
    }
  }

  if (script.includes('videos.html') || script.includes('video-index.html')) {
    throw new Error(file + ' should not route search video actions to missing video pages');
  }
  if (!script.includes("location.href = 'video-player.html?id=' + encodeURIComponent(video.id) + '&autoplay=true'")) {
    throw new Error(file + ' should route video result rows to video-player.html');
  }
  if (!script.includes("location.href = 'video-player.html'")) {
    throw new Error(file + ' should route the MV playlist entry to an existing video page');
  }
}
