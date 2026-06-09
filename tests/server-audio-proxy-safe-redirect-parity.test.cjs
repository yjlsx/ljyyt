const fs = require('fs');

const server = fs.readFileSync('server.js', 'utf8');
const distServer = fs.readFileSync('dist/server.js', 'utf8');

for (const [file, content] of [['server.js', server], ['dist/server.js', distServer]]) {
  const streamStart = content.indexOf('async function streamRemoteAudio');
  const streamEnd = content.indexOf('async function streamKuwoAudio', streamStart);
  if (streamStart < 0 || streamEnd < streamStart) {
    throw new Error(file + ' is missing streamRemoteAudio');
  }
  const body = content.slice(streamStart, streamEnd);

  for (const marker of [
    'async function streamRemoteAudio(req, res, targetUrl, extraHeaders, redirectsLeft = 4)',
    'statusCode >= 300 && statusCode < 400',
    "proxyRes.headers.location || proxyRes.headers.Location",
    'if (redirectsLeft <= 0)',
    "sendJson(res, 508, { url: '', error: 'too many redirects' })",
    'nextUrl = new URL(locationHeader, parsed)',
    'proxyRes.resume();',
    'await streamRemoteAudio(req, res, nextUrl.toString(), extraHeaders, redirectsLeft - 1);'
  ]) {
    if (!body.includes(marker)) {
      throw new Error(file + ' audio proxy redirect handling is missing marker: ' + marker);
    }
  }

  if (!/await\s+createSafeAudioProxyLookup\(parsed\)/.test(body)) {
    throw new Error(file + ' should resolve each audio proxy hop through createSafeAudioProxyLookup');
  }

  if (!body.includes("if (req.headers.range) headers.Range = req.headers.range;")) {
    throw new Error(file + ' should preserve Range headers across redirected audio proxy requests');
  }

  if (!body.includes("'Cache-Control': 'no-store'")) {
    throw new Error(file + ' should keep no-store headers for proxied audio responses');
  }

  if (!body.includes("'Access-Control-Allow-Origin': '*'")) {
    throw new Error(file + ' should keep CORS headers for proxied audio responses');
  }
}
