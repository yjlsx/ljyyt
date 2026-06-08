const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');

  if (!/var\s+_isLocalDev\s*=/.test(html)) {
    throw new Error(file + ' is missing the _isLocalDev runtime flag used by playback URL helpers');
  }
}
