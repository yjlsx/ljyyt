const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const distHtml = fs.readFileSync('dist/index.html', 'utf8');
const server = fs.readFileSync('server.js', 'utf8');
const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

for (const [name, html] of [['index.html', indexHtml], ['dist/index.html', distHtml]]) {
  if (!html.includes('function getAudioProxyUrl')) {
    throw new Error(name + ' is missing audio proxy URL helper');
  }
  if (!html.includes('/api/audio-proxy?url=')) {
    throw new Error(name + ' does not build /api/audio-proxy URLs');
  }
  if (!html.includes("showToast('已切换备用线路'")) {
    throw new Error(name + ' does not try a proxy line before source matching');
  }
}

if (!server.includes("requestUrl.pathname === '/api/audio-proxy'")) {
  throw new Error('server.js does not expose /api/audio-proxy');
}

if (!worker.includes("url.pathname === '/api/audio-proxy'")) {
  throw new Error('Cloudflare worker does not expose /api/audio-proxy');
}
