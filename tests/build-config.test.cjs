const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const scripts = pkg.scripts || {};
const deploySh = fs.readFileSync('deploy.sh', 'utf8');
const deployBat = fs.readFileSync('deploy.bat', 'utf8');
const siteConfig = fs.readFileSync('site-config.js', 'utf8');

if (!scripts.build) {
  throw new Error('package.json is missing a build script');
}

if (!scripts['build:oracle']) {
  throw new Error('package.json is missing the build:oracle script referenced by dist/ORACLE_DEPLOY.md');
}

if (!/node\s+scripts[\\/]build-dist\.cjs/.test(scripts.build)) {
  throw new Error('package.json build script should use the cross-platform Node build script');
}

if (!/node\s+scripts[\\/]build-dist\.cjs\s+--oracle/.test(scripts['build:oracle'])) {
  throw new Error('package.json build:oracle script should use the Node build script in oracle mode');
}

for (const [name, command] of Object.entries(scripts)) {
  if (name.startsWith('build') && /\b(mkdir|cp|copy|xcopy|robocopy)\b/i.test(command)) {
    throw new Error(name + ' uses shell-specific copy commands instead of the Node build script');
  }
}

if (!/npm\s+run\s+build/.test(deploySh)) {
  throw new Error('deploy.sh should delegate dist generation to npm run build');
}

if (!/npm\s+run\s+build/.test(deployBat)) {
  throw new Error('deploy.bat should delegate dist generation to npm run build');
}

if (/\bcp\s+index\.html\b/.test(deploySh) || /\bcopy\s+index\.html\b/i.test(deployBat)) {
  throw new Error('deploy scripts still contain the stale partial file-copy manifest');
}

if (!siteConfig.includes('window.LJYYT_API_BASE')) {
  throw new Error('site-config.js should define LJYYT_API_BASE for consistent local and hosted API routing');
}

if (!siteConfig.includes("host === 'localhost'") || !siteConfig.includes("host === '127.0.0.1'")) {
  throw new Error('site-config.js should route local development API calls to the same origin');
}

for (const required of [
  'dist/index.html',
  'dist/server.js',
  'dist/site-config.js',
  'dist/data/audio-sources.json',
  'dist/data/audio-sources.example.json',
  'dist/data/lyrics.json',
  'dist/images/avatar.jpg',
  'dist/images/gzhh.jpg',
  'dist/js/search-app.js',
  'dist/css/search-app.css',
  'dist/videos/video_data.js',
  'dist/package.json'
]) {
  if (!fs.existsSync(required)) {
    throw new Error('dist is missing required deploy asset: ' + required);
  }
}
