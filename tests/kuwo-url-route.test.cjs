const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const distHtml = fs.readFileSync('dist/index.html', 'utf8');
const server = fs.readFileSync('server.js', 'utf8');
const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

for (const [name, html] of [['index.html', indexHtml], ['dist/index.html', distHtml]]) {
  if (!html.includes("track.source === 'kuwo'")) {
    throw new Error(name + ' does not special-case Kuwo URLs');
  }
  if (!html.includes('/api/kuwo-url?rid=')) {
    throw new Error(name + ' does not request /api/kuwo-url');
  }
}

if (!server.includes("requestUrl.pathname === '/api/kuwo-url'")) {
  throw new Error('server.js does not expose /api/kuwo-url');
}

if (!server.includes('antiserver.kuwo.cn/anti.s?type=convert_url')) {
  throw new Error('server.js does not use Kuwo convert_url endpoint');
}

if (!worker.includes("url.pathname === '/api/kuwo-url'")) {
  throw new Error('Cloudflare worker does not expose /api/kuwo-url');
}
