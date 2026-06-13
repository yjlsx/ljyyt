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

function getOracleSiteConfigContent() {
  return Buffer.from([
    "window.LJYYT_API_BASE = window.LJYYT_API_BASE || (window.location && window.location.origin ? window.location.origin : '');",
    "window.LYRICS_API_ENDPOINT = window.LJYYT_API_BASE + '/api/lyrics';",
    "window.LYRICS_SEARCH_API_ENDPOINT = window.LJYYT_API_BASE + '/api/lyrics/search';",
    "window.COVER_API_ENDPOINT = window.LJYYT_API_BASE + '/api/cover';",
    "window.AUDIO_API_ENDPOINT = window.AUDIO_API_ENDPOINT || '';",
    "window.LJYYT_ENABLE_SAME_ORIGIN_AUDIO_API = window.LJYYT_ENABLE_SAME_ORIGIN_AUDIO_API !== false;",
    ''
  ].join('\n'), 'utf8');
}

function getSiteConfigContent(item) {
  if (item.relPath !== 'site-config.js') return item.content;
  return options.oracle ? getOracleSiteConfigContent() : item.content;
}

const assetFiles = [
  '_headers',
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
  writeFile(item.relPath, getSiteConfigContent(item));
}

writeFile('package.json', runtimePackage);

// Inline external CSS and JS into dist/index.html for monolithic structure
const distIndexPath = path.join(outDir, 'index.html');
let distIndexHtml = fs.readFileSync(distIndexPath, 'utf8');

// Inline css/styles.css
const cssLinkMatch = distIndexHtml.match(/<link\s+rel="stylesheet"\s+href="css\/styles\.css">/i);
if (cssLinkMatch) {
  const cssPath = path.join(ROOT, 'css', 'styles.css');
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    distIndexHtml = distIndexHtml.replace(
      /<link\s+rel="stylesheet"\s+href="css\/styles\.css">/i,
      `<style>\n${cssContent}\n  </style>`
    );
  }
}

// Inline js/app.js
const scriptMatch = distIndexHtml.match(/<script\s+src="js\/app\.js"><\/script>/i);
if (scriptMatch) {
  const jsPath = path.join(ROOT, 'js', 'app.js');
  if (fs.existsSync(jsPath)) {
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    distIndexHtml = distIndexHtml.replace(
      /<script\s+src="js\/app\.js"><\/script>/i,
      `<script>\n${jsContent}\n  </script>`
    );
  }
}

fs.writeFileSync(distIndexPath, distIndexHtml, 'utf8');

console.log('Built ' + path.relative(ROOT, outDir) + (options.oracle ? ' for Oracle' : '') + (options.includeMedia ? ' with media' : ' without local media'));
