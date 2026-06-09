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
    sandbox.fetchCalls.push({ targetUrl, options: options || {} });
    return new Response(null, {
      status: 302,
      headers: { Location: 'http://169.254.169.254/latest/meta-data' }
    });
  }
};

vm.createContext(sandbox);
vm.runInContext([
  extractFunction(worker, 'corsHeaders'),
  extractFunction(worker, 'jsonResponse'),
  extractFunction(worker, 'resolveKuwoRawUrl', 'async function'),
  extractFunction(worker, 'wrapAudioProxyResponse'),
  extractFunction(worker, 'isBlockedAudioProxyHost'),
  extractFunction(worker, 'handleKuwoAudioRequest', 'async function'),
  extractFunction(worker, 'fetchAudioProxyResponse', 'async function'),
  'resolveKuwoRawUrl = async function() { return "https://public.test/kuwo.mp3"; };'
].join('\n'), sandbox);

(async () => {
  const response = await sandbox.handleKuwoAudioRequest(
    { headers: new Headers({ Range: 'bytes=0-99' }) },
    new URL('https://worker.test/api/kuwo-audio?rid=123')
  );

  if (!sandbox.fetchCalls.length || sandbox.fetchCalls[0].options.redirect !== 'manual') {
    throw new Error('worker Kuwo audio should fetch playback URLs with redirect: manual');
  }
  if (sandbox.fetchCalls[0].options.headers.Range !== 'bytes=0-99') {
    throw new Error('worker Kuwo audio should preserve Range headers while checking redirects');
  }
  if (response.status !== 403) {
    throw new Error('worker Kuwo audio allowed redirect to blocked host, status: ' + response.status);
  }
  if (!String(response.headers.get('Content-Type') || '').includes('application/json')) {
    throw new Error('worker Kuwo audio redirect rejection should remain a JSON error response');
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
