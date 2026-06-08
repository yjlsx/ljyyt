const fs = require('fs');

const server = fs.readFileSync('server.js', 'utf8');
const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

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
  'async function readLimitedText(response, maxBytes)',
  "throw new Error('upstream response too large')",
  'const text = await readLimitedText(response, MAX_UPSTREAM_JSON_BYTES);',
  'const text = (await readLimitedText(response, MAX_UPSTREAM_TEXT_BYTES)).trim();'
]) {
  if (!worker.includes(marker)) {
    throw new Error('worker.js is missing upstream response limit marker: ' + marker);
  }
}

if (worker.includes('return response.json();')) {
  throw new Error('worker.js still parses unbounded JSON responses directly');
}

if (worker.includes('await response.text()).trim()')) {
  throw new Error('worker.js still reads unbounded text responses directly');
}
