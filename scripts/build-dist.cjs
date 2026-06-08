const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_OUT = 'dist';

const args = process.argv.slice(2);
const options = {
  oracle: false,
  includeMedia: process.env.INCLUDE_MEDIA === '1',
  outDir: DEFAULT_OUT
};

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '--oracle') {
    options.oracle = true;
  } else if (arg === '--include-media') {
    options.includeMedia = true;
  } else if (arg === '--out') {
    options.outDir = args[i + 1] || DEFAULT_OUT;
    i += 1;
  } else if (arg.startsWith('--out=')) {
    options.outDir = arg.slice('--out='.length) || DEFAULT_OUT;
  } else {
    throw new Error('Unknown build option: ' + arg);
  }
}

const outDir = path.resolve(ROOT, options.outDir);

function assertSafeOutputDir(target) {
  const relative = path.relative(ROOT, target);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('Refusing to write outside the repository: ' + target);
  }
}

function readSourceFile(relPath) {
  const source = path.join(ROOT, relPath);
  if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
    throw new Error('Missing build asset: ' + relPath);
  }
  return {
    relPath,
    content: fs.readFileSync(source)
  };
}

function writeFile(relPath, content) {
  const target = path.join(outDir, relPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

const assetFiles = [
  'index.html',
  'style.css',
  'style_mobile.css',
  'main.css',
  'dark_mode.css',
  'ui_enhancements.css',
  'scroll_fix.css',
  'scroll_to_top.css',
  'script.js',
  'components.js',
  'contact_handler.js',
  'fix_wechat_images.js',
  'music_player_page.js',
  'music-player.html',
  'player_enhanced.js',
  'player_state.js',
  'player_state_enhanced.js',
  'search.html',
  'search_function.js',
  'ranking.html',
  'artist.html',
  'video-player.html',
  'otter-preview.html',
  'README.md',
  'ORACLE_DEPLOY.md',
  'robots.txt',
  'sitemap.xml',
  'server.js',
  'site-config.js',
  'css/search-app.css',
  'js/icons.js',
  'js/music-data.js',
  'js/search-app.js',
  'js/theme.js',
  'data/lyrics.json',
  'data/audio-sources.json',
  'data/audio-sources.example.json',
  'images/avatar.jpg',
  'images/gzhh.jpg',
  'images/naxi_dance_cover.jpg',
  'images/yulong_cover.jpg',
  'images/yyt.png',
  'videos/README.md',
  'videos/video_data.js'
];

if (options.includeMedia) {
  assetFiles.push(
    'videos/naxi_dance.mp4',
    'videos/yulong_snow_mountain.mp4'
  );
}

const runtimePackage = JSON.stringify({
  name: 'lijiang-yinyuetai-runtime',
  version: '1.0.0',
  private: true,
  scripts: {
    start: 'node server.js'
  },
  engines: {
    node: '>=18'
  }
}, null, 2) + '\n';

assertSafeOutputDir(outDir);

const snapshot = assetFiles.map(readSourceFile);
fs.rmSync(outDir, { recursive: true, force: true });

for (const item of snapshot) {
  writeFile(item.relPath, item.content);
}

writeFile('package.json', runtimePackage);

console.log('Built ' + path.relative(ROOT, outDir) + (options.oracle ? ' for Oracle' : '') + (options.includeMedia ? ' with media' : ' without local media'));
