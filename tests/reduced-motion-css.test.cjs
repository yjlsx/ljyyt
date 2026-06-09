const fs = require('fs');

const targets = [
  ['index.html', 'dist/index.html'],
  ['css/search-app.css', 'dist/css/search-app.css'],
  ['artist.html', 'dist/artist.html'],
  ['ranking.html', 'dist/ranking.html'],
  ['video-player.html', 'dist/video-player.html']
];

for (const [sourceFile, distFile] of targets) {
  for (const file of [sourceFile, distFile]) {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('@media (prefers-reduced-motion: reduce)')) {
      throw new Error(file + ' should include a reduced-motion media query');
    }
    if (!/animation(?:-duration)?\s*:\s*[^;]*none|animation-duration\s*:\s*0\.01ms/.test(content)) {
      throw new Error(file + ' reduced-motion rules should disable or nearly eliminate animations');
    }
    if (!/transition(?:-duration)?\s*:\s*[^;]*none|transition-duration\s*:\s*0\.01ms/.test(content)) {
      throw new Error(file + ' reduced-motion rules should disable or nearly eliminate transitions');
    }
  }
}

for (const file of ['artist.html', 'dist/artist.html', 'ranking.html', 'dist/ranking.html']) {
  const content = fs.readFileSync(file, 'utf8');
  if (!/background-attachment\s*:\s*scroll/.test(content)) {
    throw new Error(file + ' should switch fixed legacy backgrounds to scroll on small screens');
  }
}
