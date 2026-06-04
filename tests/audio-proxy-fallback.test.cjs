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
  if (!html.includes(".replace(/&amp;/g, '&')")) {
    throw new Error(name + ' does not decode escaped ampersands in streaming URLs');
  }
  if (html.includes("showToast('正在解析播放地址...'")) {
    throw new Error(name + ' still shows the non-Otter resolving playback toast before auto match');
  }
  if (html.includes("showToast('已切换备用线路'")) {
    throw new Error(name + ' still shows the non-Otter proxy-line toast');
  }
  if (!html.includes("showToast('正在搜索免费音源...'")) {
    throw new Error(name + ' does not show the Otter-style auto-match loading message');
  }
  if (!html.includes('function getTrackSourceDisplayName')) {
    throw new Error(name + ' does not normalize the displayed fallback source name');
  }
  if (!html.includes("showToast('已自动切换至: ' + getTrackSourceDisplayName(currentTrack)")) {
    throw new Error(name + ' does not show the Otter-style auto-match success message');
  }
  if (html.includes("showToast('已自动切换至 '")) {
    throw new Error(name + ' dropped the Otter-style colon in the auto-match success message');
  }
  for (const marker of [
    'top: calc(24px + var(--safe-area-top))',
    'background: #fff',
    'color: #363636',
    'box-shadow: 0 3px 10px rgba(0,0,0,.10), 0 3px 3px rgba(0,0,0,.05)',
    'display: flex',
    'align-items: center',
    'border-radius: 8px',
    'margin: 0 auto'
  ]) {
    if (!html.includes(marker)) {
      throw new Error(name + ' does not match the Otter toast layout marker: ' + marker);
    }
  }
}

if (!server.includes("requestUrl.pathname === '/api/audio-proxy'")) {
  throw new Error('server.js does not expose /api/audio-proxy');
}

if (!worker.includes("url.pathname === '/api/audio-proxy'")) {
  throw new Error('Cloudflare worker does not expose /api/audio-proxy');
}
