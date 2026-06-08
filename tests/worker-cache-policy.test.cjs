const fs = require('fs');

const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

for (const dynamicRoute of [
  "url.pathname === '/api/lyrics/search'",
  "url.pathname === '/api/netease/suggest'",
  "url.pathname === '/api/gd-music'",
  "url.pathname === '/api/kuwo-url'"
]) {
  const start = worker.indexOf(`if (${dynamicRoute})`);
  if (start < 0) throw new Error('Missing route guard: ' + dynamicRoute);
  const body = worker.slice(start, worker.indexOf('\n      }', start));
  if (body.includes('withCache(')) {
    throw new Error(dynamicRoute + ' should not use Worker Cache API for dynamic responses');
  }
}

for (const stableRoute of [
  "url.pathname === '/api/lyrics'",
  "url.pathname === '/api/cover'"
]) {
  const start = worker.indexOf(`if (${stableRoute})`);
  if (start < 0) throw new Error('Missing route guard: ' + stableRoute);
  const body = worker.slice(start, worker.indexOf('\n      }', start));
  if (!body.includes('withCache(request, ctx,')) {
    throw new Error(stableRoute + ' should explicitly use bounded Worker cache');
  }
}

if (!worker.includes("function jsonResponse(payload, status = 200, cacheControl = 'no-store')")) {
  throw new Error('jsonResponse should default dynamic API responses to no-store');
}

const noStoreStreamHeaders = worker.match(/responseHeaders\.set\('Cache-Control', 'no-store'\)/g) || [];
if (noStoreStreamHeaders.length < 2) {
  throw new Error('streaming audio proxy responses should not advertise stale public caching');
}

if (!worker.includes("ctx.waitUntil(cache.put(request, cacheable.clone()))")) {
  throw new Error('withCache should explicitly cache only cacheable cloned responses');
}
