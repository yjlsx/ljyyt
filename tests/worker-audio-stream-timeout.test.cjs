const fs = require('fs');

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

const kuwoAudioBody = extractFunction(worker, 'handleKuwoAudioRequest', 'async function');
if (!kuwoAudioBody.includes('const response = await fetchAudioProxyResponse(playbackUrl, headers);')) {
  throw new Error('worker.js handleKuwoAudioRequest should route Kuwo audio through the bounded shared audio proxy fetcher');
}
if (kuwoAudioBody.includes('const response = await fetch(audioUrl, { headers });')) {
  throw new Error('worker.js handleKuwoAudioRequest still uses unbounded fetch for audio streams');
}
if (kuwoAudioBody.includes('const response = await fetchWithTimeout(audioUrl, { headers });')) {
  throw new Error('worker.js handleKuwoAudioRequest still bypasses shared redirect validation for Kuwo audio streams');
}

const audioProxyBody = extractFunction(worker, 'fetchAudioProxyResponse', 'async function');
if (!audioProxyBody.includes('const response = await fetchWithTimeout(audioUrl.toString(), {')) {
  throw new Error('worker.js fetchAudioProxyResponse should use fetchWithTimeout for bounded audio proxy startup latency');
}
if (!audioProxyBody.includes("redirect: 'manual'")) {
  throw new Error('worker.js fetchAudioProxyResponse should keep manual redirect handling for host revalidation');
}
if (audioProxyBody.includes('const response = await fetch(audioUrl.toString(),')) {
  throw new Error('worker.js fetchAudioProxyResponse still uses unbounded fetch for proxied audio streams');
}
