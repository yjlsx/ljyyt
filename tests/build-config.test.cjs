const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const scripts = pkg.scripts || {};
const deploySh = fs.readFileSync('deploy.sh', 'utf8');
const deployBat = fs.readFileSync('deploy.bat', 'utf8');
const siteConfig = fs.readFileSync('site-config.js', 'utf8');
const buildScript = fs.readFileSync('scripts/build-dist.cjs', 'utf8');
const headers = fs.readFileSync('_headers', 'utf8');

function assertDistMatchesSource(relPath) {
  const source = fs.readFileSync(relPath);
  const built = fs.readFileSync('dist/' + relPath);
  if (!source.equals(built)) {
    throw new Error('dist asset is not synchronized with source: ' + relPath);
  }
}

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

if (buildScript.includes("path.join(ROOT, 'dist', relPath)")) {
  throw new Error('build-dist.cjs should build only from source files, not from the previous dist output');
}

for (const requiredSource of [
  '_headers',
  'ORACLE_DEPLOY.md',
  'robots.txt',
  'sitemap.xml',
  'data/audio-sources.json',
  'data/audio-sources.example.json',
  'fix_wechat_images.js'
]) {
  if (!fs.existsSync(requiredSource)) {
    throw new Error('source tree is missing required deploy source asset: ' + requiredSource);
  }
}

if (!buildScript.includes("'fix_wechat_images.js'")) {
  throw new Error('build-dist.cjs should copy fix_wechat_images.js because index.html references it');
}

if (!headers.includes('/index.html') || !headers.includes('Cache-Control: no-store')) {
  throw new Error('_headers should prevent hosted index.html from serving stale inline playback UI code');
}

for (const required of [
  'dist/_headers',
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
  'dist/fix_wechat_images.js',
  'dist/videos/video_data.js',
  'dist/package.json'
]) {
  if (!fs.existsSync(required)) {
    throw new Error('dist is missing required deploy asset: ' + required);
  }
}

for (const relPath of [
  '_headers',
  'index.html',
  'server.js',
  'fix_wechat_images.js',
  'js/icons.js',
  'js/search-app.js',
  'data/audio-sources.json',
  'data/audio-sources.example.json',
  'ORACLE_DEPLOY.md',
  'robots.txt',
  'sitemap.xml'
]) {
  assertDistMatchesSource(relPath);
}
