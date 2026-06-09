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

const corsBody = extractFunction(worker, 'corsHeaders');
if (!corsBody.includes("'Access-Control-Allow-Headers': 'Content-Type, Accept, Range'")) {
  throw new Error('worker CORS preflight should allow Range for browser audio seeking');
}
if (!worker.includes("responseHeaders.set('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Range, Content-Length, Content-Type')")) {
  throw new Error('worker audio responses should expose range/progress headers to browsers');
}

const sandbox = {
  Response,
  Headers,
  URL,
  fetchCalls: [],
  async fetchWithTimeout(targetUrl, options) {
    sandbox.fetchCalls.push({ targetUrl, options });
    return new Response('audio-bytes', {
      status: 206,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Range': 'bytes 10-19/100',
        'Content-Length': '10'
      }
    });
  }
};

vm.createContext(sandbox);
vm.runInContext([
  extractFunction(worker, 'corsHeaders'),
  extractFunction(worker, 'jsonResponse'),
  extractFunction(worker, 'resolveKuwoRawUrl', 'async function'),
  extractFunction(worker, 'wrapAudioProxyResponse'),
  extractFunction(worker, 'handleKuwoAudioRequest', 'async function'),
  extractFunction(worker, 'isBlockedAudioProxyHost'),
  extractFunction(worker, 'handleAudioProxyRequest', 'async function'),
  extractFunction(worker, 'fetchAudioProxyResponse', 'async function'),
  'resolveKuwoRawUrl = async function() { return "https://public.test/kuwo.mp3"; };'
].join('\n'), sandbox);

(async () => {
  const headers = sandbox.corsHeaders();
  if (headers['Access-Control-Allow-Headers'] !== 'Content-Type, Accept, Range') {
    throw new Error('worker CORS headers do not allow Range');
  }

  const audioProxyResponse = await sandbox.handleAudioProxyRequest(
    { headers: new Headers({ Range: 'bytes=10-19' }) },
    new URL('https://worker.test/api/audio-proxy?url=' + encodeURIComponent('https://public.test/song.mp3'))
  );
  if (sandbox.fetchCalls[0].options.headers.Range !== 'bytes=10-19') {
    throw new Error('worker audio proxy did not forward the Range request header');
  }
  if (audioProxyResponse.headers.get('Access-Control-Expose-Headers') !== 'Accept-Ranges, Content-Range, Content-Length, Content-Type') {
    throw new Error('worker audio proxy did not expose range response headers');
  }
  if (audioProxyResponse.headers.get('Accept-Ranges') !== 'bytes') {
    throw new Error('worker audio proxy should default Accept-Ranges to bytes');
  }

  sandbox.fetchCalls = [];
  const kuwoResponse = await sandbox.handleKuwoAudioRequest(
    { headers: new Headers({ Range: 'bytes=20-29' }) },
    new URL('https://worker.test/api/kuwo-audio?rid=123')
  );
  if (sandbox.fetchCalls[0].options.headers.Range !== 'bytes=20-29') {
    throw new Error('worker Kuwo audio proxy did not forward the Range request header');
  }
  if (kuwoResponse.headers.get('Access-Control-Expose-Headers') !== 'Accept-Ranges, Content-Range, Content-Length, Content-Type') {
    throw new Error('worker Kuwo audio proxy did not expose range response headers');
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
