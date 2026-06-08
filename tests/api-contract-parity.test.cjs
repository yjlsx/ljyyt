const fs = require('fs');

const server = fs.readFileSync('server.js', 'utf8');
const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

function extractFunction(source, name) {
  const start = source.indexOf(`async function ${name}`);
  if (start === -1) {
    throw new Error(`Missing function ${name}`);
  }
  const braceStart = source.indexOf('{', start);
  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) {
      return source.slice(start, index + 1);
    }
  }
  throw new Error(`Could not parse function ${name}`);
}

const workerLyricsHandler = extractFunction(worker, 'handleLyricsRequest');
const workerLyricsSearchHandler = extractFunction(worker, 'handleLyricsSearchRequest');

if (!server.includes('found: false') || !server.includes('sendJson(res, 200, payload)')) {
  throw new Error('server.js should keep /api/lyrics no-match responses as 200 + found:false');
}

if (workerLyricsHandler.includes('}, 404);')) {
  throw new Error('worker.js should not return 404 for /api/lyrics no-match responses');
}

if (!workerLyricsHandler.includes("message: 'No lyrics found'")) {
  throw new Error('worker.js should include a stable no-match lyrics message');
}

if (!server.includes('code: 200') || !server.includes("msg: '成功'")) {
  throw new Error('server.js lyrics search contract should include code/msg');
}

if (!workerLyricsSearchHandler.includes('code: 200') || !workerLyricsSearchHandler.includes("msg: '成功'")) {
  throw new Error('worker.js lyrics search contract should include code/msg like the Node API');
}

if (!server.includes('candidates: candidates.slice(0, 20)')) {
  throw new Error('server.js lyrics search contract should expose up to 20 candidates');
}

if (!workerLyricsSearchHandler.includes('candidates: dedupeCandidates([...lrclibCandidates, ...rangotecCandidates, ...neteaseCandidates]).slice(0, 20)')) {
  throw new Error('worker.js lyrics search contract should expose up to 20 candidates like the Node API');
}
