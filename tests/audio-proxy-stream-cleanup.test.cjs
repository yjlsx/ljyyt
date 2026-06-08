const fs = require('fs');

const server = fs.readFileSync('server.js', 'utf8');

const streamStart = server.indexOf('async function streamRemoteAudio');
const streamEnd = server.indexOf('async function streamKuwoAudio', streamStart);
if (streamStart < 0 || streamEnd < streamStart) {
  throw new Error('Could not extract server audio proxy stream function');
}

const streamRemoteAudioBody = server.slice(streamStart, streamEnd);

for (const marker of [
  'let upstreamResponse = null;',
  'let downstreamClosed = false;',
  'function cleanupUpstreamStream()',
  "req.on('aborted', cleanupUpstreamStream)",
  "res.on('close', cleanupUpstreamStream)",
  'if (downstreamClosed || req.destroyed || res.destroyed) return;',
  'if (!proxyReq.destroyed) proxyReq.destroy();',
  'if (upstreamResponse && !upstreamResponse.destroyed) upstreamResponse.destroy();',
  'upstreamResponse = proxyRes;',
  'if (downstreamClosed)',
  "proxyRes.on('error'"
]) {
  if (!streamRemoteAudioBody.includes(marker)) {
    throw new Error('server.js audio proxy stream cleanup is missing marker: ' + marker);
  }
}

if (!streamRemoteAudioBody.includes('if (downstreamClosed || res.destroyed) return;')) {
  throw new Error('server.js audio proxy request errors should be ignored after the downstream response closes');
}

if (!/proxyRes\.on\('error',\s*\(error\)\s*=>\s*{[\s\S]*res\.destroy\(error\)/.test(streamRemoteAudioBody)) {
  throw new Error('server.js audio proxy should destroy the downstream response when the upstream stream errors');
}
