const fs = require('fs');
const vm = require('vm');

const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

function extractFunction(source, name, prefix = 'function') {
  const start = source.indexOf(prefix + ' ' + name);
  if (start < 0) throw new Error('Missing function ' + name);
  const bodyStart = source.indexOf('{', source.indexOf(')', start));
  if (bodyStart < 0) throw new Error('Missing function body ' + name);
  let depth = 0;
  let opened = false;
  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') {
      depth += 1;
      opened = true;
    } else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error('Could not extract function ' + name);
}

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

const sandbox = {
  Response,
  caches: {
    default: {
      async match() {
        return null;
      },
      async put() {}
    }
  },
  cachePuts: 0,
  ctx: {
    waitUntil(promise) {
      sandbox.cachePuts += 1;
      return promise;
    }
  }
};

vm.createContext(sandbox);
vm.runInContext([
  extractFunction(worker, 'withCache', 'async function'),
  extractFunction(worker, 'isCacheableApiResponse', 'async function')
].join('\n'), sandbox);

(async () => {
  const request = new Request('https://worker.test/api/lyrics?title=missing');
  const negativeResponse = await sandbox.withCache(request, sandbox.ctx, async () => {
    return new Response(JSON.stringify({ found: false, lines: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  });
  if (negativeResponse.headers.get('Cache-Control') !== 'no-store') {
    throw new Error('withCache should return no-store for found:false responses');
  }
  if (sandbox.cachePuts !== 0) {
    throw new Error('withCache should not cache found:false responses');
  }

  const positiveResponse = await sandbox.withCache(request, sandbox.ctx, async () => {
    return new Response(JSON.stringify({ found: true, lines: ['ok'] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  });
  if (positiveResponse.headers.get('Cache-Control') !== 'public, max-age=1800') {
    throw new Error('withCache should keep bounded cache headers for found:true responses');
  }
  if (sandbox.cachePuts !== 1) {
    throw new Error('withCache should cache found:true responses exactly once');
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
