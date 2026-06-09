const fs = require('fs');
const vm = require('vm');

const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

function extractFunction(source, name, prefix = 'function') {
  const start = source.indexOf(prefix + ' ' + name);
  if (start < 0) throw new Error('Missing function ' + name);
  const bodyStart = source.indexOf('{', source.indexOf(')', start));
  if (bodyStart < 0) throw new Error('Missing function body ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
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

const sandbox = {
  Response,
  Headers,
  URL,
  fetchCalls: [],
  async fetchWithTimeout(targetUrl, options) {
    sandbox.fetchCalls.push({ targetUrl, options });
    return new Response('upstream missing', {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/plain',
        'X-Upstream-Debug': 'kept'
      }
    });
  }
};

vm.createContext(sandbox);
vm.runInContext([
  extractFunction(worker, 'corsHeaders'),
  extractFunction(worker, 'jsonResponse'),
  extractFunction(worker, 'isBlockedAudioProxyHost'),
  extractFunction(worker, 'wrapAudioProxyResponse'),
  extractFunction(worker, 'handleAudioProxyRequest', 'async function'),
  extractFunction(worker, 'fetchAudioProxyResponse', 'async function')
].join('\n'), sandbox);

(async () => {
  const response = await sandbox.handleAudioProxyRequest(
    { headers: new Headers({ Range: 'bytes=0-10' }) },
    new URL('https://worker.test/api/audio-proxy?url=' + encodeURIComponent('https://public.test/missing.mp3'))
  );

  if (response.status !== 404) {
    throw new Error('worker audio proxy should preserve upstream non-ok status');
  }
  if (response.statusText !== 'Not Found') {
    throw new Error('worker audio proxy should preserve upstream non-ok status text');
  }
  if (response.headers.get('Access-Control-Allow-Origin') !== '*') {
    throw new Error('worker audio proxy non-ok responses should include CORS headers');
  }
  if (response.headers.get('Access-Control-Expose-Headers') !== 'Accept-Ranges, Content-Range, Content-Length, Content-Type') {
    throw new Error('worker audio proxy non-ok responses should expose range/progress headers');
  }
  if (response.headers.get('Cache-Control') !== 'no-store') {
    throw new Error('worker audio proxy non-ok responses should be no-store');
  }
  if (response.headers.get('Content-Type') !== 'text/plain') {
    throw new Error('worker audio proxy non-ok responses should preserve upstream content type');
  }
  if (response.headers.get('X-Upstream-Debug') !== 'kept') {
    throw new Error('worker audio proxy non-ok responses should preserve upstream diagnostic headers');
  }
  if ((await response.text()) !== 'upstream missing') {
    throw new Error('worker audio proxy non-ok responses should preserve the upstream body');
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
