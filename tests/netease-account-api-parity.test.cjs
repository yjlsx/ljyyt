const fs = require('fs');

const server = fs.readFileSync('server.js', 'utf8');
const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  for (const marker of [
    "neteaseApiBase + '/login/qr/key",
    "neteaseApiBase + '/login/qr/create",
    "neteaseApiBase + '/login/qr/check",
    "neteaseApiBase + '/my-info'",
    'getNeteaseRequestBases()',
    'neteaseFallbackBases',
    'isNeteaseProxyHealthPayload'
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' should route NetEase account requests through the configured API base: ' + marker);
    }
  }
  if (!html.includes("'https://otter-music.pages.dev/music-api/netease'")) {
    throw new Error(file + ' should keep the Otter NetEase API as a fallback for stale proxy deployments');
  }
  if (html.includes("OTTER_API_BASE + '/music-api/netease'")) {
    throw new Error(file + ' still bypasses the configured API base for NetEase playlist/account requests');
  }
}

for (const [name, source] of [['server.js', server], ['cloudflare-worker/worker.js', worker]]) {
  if (!source.includes('OTTER_NETEASE_API_BASE')) {
    throw new Error(name + ' should centralize the fixed Otter NetEase upstream base');
  }
  if (!source.includes('/music-api/netease')) {
    throw new Error(name + ' should proxy NetEase account requests to the Otter music-api namespace');
  }
  if (!source.includes('/api/netease/') || !source.includes("startsWith('/api/netease/')")) {
    throw new Error(name + ' should route /api/netease/* account requests through the fixed proxy');
  }
  for (const path of [
    '/login/qr/key',
    '/login/qr/create',
    '/login/qr/check',
    '/my-info',
    '/recommend',
    '/album/sublist',
    '/user-playlists',
    '/playlist',
    '/playlists',
    '/toplist'
  ]) {
    if (!source.includes(path)) {
      throw new Error(name + ' should allow-list the NetEase account subpath: ' + path);
    }
  }
}

if (!server.includes('function readRequestBody')) {
  throw new Error('server.js should bound and read POST bodies before proxying NetEase account requests');
}

if (!server.includes('proxyNeteaseApiRequest(req, res, requestUrl)')) {
  throw new Error('server.js should delegate /api/netease/* account requests to a proxy helper');
}

if (!worker.includes('handleNeteaseProxyRequest(request, url)')) {
  throw new Error('worker.js should delegate /api/netease/* account requests to a proxy helper');
}

for (const source of [server, worker]) {
  if (!source.includes('Access-Control-Allow-Origin')) {
    throw new Error('NetEase account proxy responses should preserve CORS headers for browser settings UI');
  }
  if (!source.includes('Cache-Control')) {
    throw new Error('NetEase account proxy responses should be explicitly uncacheable');
  }
}
