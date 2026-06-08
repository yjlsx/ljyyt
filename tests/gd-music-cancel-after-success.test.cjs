const fs = require('fs');
const vm = require('vm');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let opened = false;
  for (let end = start; end < script.length; end += 1) {
    const char = script[end];
    if (char === '{') {
      depth += 1;
      opened = true;
    } else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) return script.slice(start, end + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

async function flushPromises() {
  await Promise.resolve();
  await Promise.resolve();
}

(async () => {
for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const body = pickFunction(script, 'fetchGdMusicJson');

  if (!body.includes('ac.abort();')) {
    throw new Error(file + ' fetchGdMusicJson should abort leftover fallback requests after success');
  }
  if (!body.includes('clearTimeout(timer);')) {
    throw new Error(file + ' fetchGdMusicJson should clear the timeout after success or failure');
  }

  const sandbox = {
    URL,
    AbortController,
    DOMException,
    setTimeout,
    clearTimeout,
    _isLocalDev: true,
    gdMusicApiBase: '/api/gd-music',
    gdMusicFallbackBases: [
      'https://primary.example.test/api.php',
      'https://fallback-a.example.test/api.php',
      'https://fallback-b.example.test/api.php'
    ],
    calls: [],
    fetch(url, options) {
      const call = {
        url,
        aborted: false
      };
      options.signal.addEventListener('abort', function() {
        call.aborted = true;
      });
      sandbox.calls.push(call);
      if (url.indexOf('fallback-a') >= 0) {
        return Promise.resolve({
          ok: true,
          json() {
            return Promise.resolve({ ok: true, source: 'fallback-a' });
          }
        });
      }
      return new Promise(function() {});
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(pickFunction(script, 'fetchGdMusicJson'), sandbox);

  const result = await sandbox.fetchGdMusicJson('/api/gd-music?types=search&name=香港');
  await flushPromises();

  if (!result || result.source !== 'fallback-a') {
    throw new Error(file + ' fetchGdMusicJson returned the wrong successful fallback result');
  }
  if (sandbox.calls.length !== 4) {
    throw new Error(file + ' fetchGdMusicJson should start all fallback requests concurrently');
  }
  const hangingCalls = sandbox.calls.filter(function(call) {
    return call.url.indexOf('fallback-a') < 0;
  });
  if (!hangingCalls.length || hangingCalls.some(function(call) { return !call.aborted; })) {
    throw new Error(file + ' fetchGdMusicJson left slower fallback requests running after success');
  }
}
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
