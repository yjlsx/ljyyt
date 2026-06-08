const fs = require('fs');
const vm = require('vm');

const server = fs.readFileSync('server.js', 'utf8');
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

for (const marker of [
  'const MAX_UPSTREAM_TEXT_BYTES',
  'const maxBytes = options.maxBytes || MAX_UPSTREAM_TEXT_BYTES',
  'receivedBytes += Buffer.byteLength(chunk,',
  "req.destroy(new Error('upstream response too large'))"
]) {
  if (!server.includes(marker)) {
    throw new Error('server.js is missing upstream response limit marker: ' + marker);
  }
}

for (const marker of [
  'const MAX_UPSTREAM_JSON_BYTES',
  'const MAX_UPSTREAM_TEXT_BYTES',
  'const WORKER_UPSTREAM_TIMEOUT_MS',
  'async function fetchWithTimeout(url, options = {})',
  'const controller = new AbortController();',
  "controller.abort(new Error('upstream request timeout'))",
  'async function readLimitedText(response, maxBytes)',
  "throw new Error('upstream response too large')",
  'const text = await readLimitedText(response, MAX_UPSTREAM_JSON_BYTES);',
  'const text = (await readLimitedText(response, MAX_UPSTREAM_TEXT_BYTES)).trim();'
]) {
  if (!worker.includes(marker)) {
    throw new Error('worker.js is missing upstream response limit marker: ' + marker);
  }
}

const fetchJsonStart = worker.indexOf('async function fetchJson');
const fetchJsonEnd = worker.indexOf('async function fetchLrclibExact', fetchJsonStart);
const fetchJsonBody = worker.slice(fetchJsonStart, fetchJsonEnd);
if (!fetchJsonBody.includes('const response = await fetchWithTimeout(url,')) {
  throw new Error('worker.js fetchJson should use fetchWithTimeout for bounded upstream latency');
}

const kuwoStart = worker.indexOf('async function resolveKuwoRawUrl');
const kuwoEnd = worker.indexOf('async function handleKuwoAudioRequest', kuwoStart);
const kuwoBody = worker.slice(kuwoStart, kuwoEnd);
if (!kuwoBody.includes('const response = await fetchWithTimeout(target,')) {
  throw new Error('worker.js resolveKuwoRawUrl should use fetchWithTimeout for bounded upstream latency');
}

const coverStart = worker.indexOf('async function handleCoverRequest');
const coverEnd = worker.indexOf('function buildLookup', coverStart);
const coverBody = worker.slice(coverStart, coverEnd);
if (!coverBody.includes('const response = await fetchWithTimeout(coverUrl.toString(),')) {
  throw new Error('worker.js handleCoverRequest should use fetchWithTimeout for bounded upstream latency');
}

if (worker.includes('return response.json();')) {
  throw new Error('worker.js still parses unbounded JSON responses directly');
}

if (worker.includes('await response.text()).trim()')) {
  throw new Error('worker.js still reads unbounded text responses directly');
}

const sandbox = {
  WORKER_UPSTREAM_TIMEOUT_MS: 10,
  AbortController,
  Error,
  Number,
  Object,
  setTimeout,
  clearTimeout,
  aborted: false,
  fetch: async (_url, options) => {
    if (options && options.signal) {
      options.signal.addEventListener('abort', () => {
        sandbox.aborted = true;
      });
    }
    return new Promise(() => {});
  }
};

vm.createContext(sandbox);
vm.runInContext(extractFunction(worker, 'fetchWithTimeout', 'async function'), sandbox);

(async () => {
  try {
    await sandbox.fetchWithTimeout('https://slow.example.test/data.json', { timeoutMs: 1 });
  } catch (error) {
    if (!/upstream request timeout/.test(error.message)) {
      throw new Error('fetchWithTimeout returned unexpected error: ' + error.message);
    }
    if (!sandbox.aborted) {
      throw new Error('fetchWithTimeout did not abort the in-flight upstream request');
    }
    return;
  }
  throw new Error('fetchWithTimeout did not reject a stalled upstream request');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
