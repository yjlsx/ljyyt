const fs = require('fs');
const vm = require('vm');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < script.length; index += 1) {
    const char = script[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'" || char === '`') { quote = char; continue; }
    if (char === '{') { depth += 1; opened = true; }
    else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = { Number, Math };
  vm.createContext(sandbox);
  vm.runInContext(pickFunction(script, 'isTruncatedAudioDuration'), sandbox);
  const check = sandbox.isTruncatedAudioDuration;

  // 10 second preview clip of a 4-minute song must be rejected
  if (!check(10, 240)) throw new Error(file + ' should reject a 10s clip of a 240s track');
  // 30s preview with unknown expected duration must be rejected
  if (!check(30, 0)) throw new Error(file + ' should reject ~30s audio when expected duration unknown');
  // full-length audio must pass
  if (check(238, 240)) throw new Error(file + ' should accept near-full duration audio');
  // short songs (e.g. 60s) with matching metadata must pass
  if (check(60, 62)) throw new Error(file + ' should accept short tracks matching expected duration');
  // unknown/zero actual duration must not be rejected (streaming may not report duration yet)
  if (check(0, 240) || check(NaN, 240) || check(Infinity, 240)) {
    throw new Error(file + ' should not reject when actual duration is not yet known');
  }
  // legitimately short track with unknown expected duration but > threshold passes
  if (check(90, 0)) throw new Error(file + ' should accept 90s audio when expected duration unknown');

  // confirmPlaybackStarted must consult the truncation check for non-local sources
  const confirmBody = pickFunction(script, 'confirmPlaybackStarted');
  if (!confirmBody.includes('isTruncatedAudioDuration')) {
    throw new Error(file + ' confirmPlaybackStarted does not reject truncated preview audio');
  }
  if (!confirmBody.includes("'local'")) {
    throw new Error(file + ' confirmPlaybackStarted should exempt local tracks from truncation checks');
  }
}

console.log('truncated-audio-detection: ok');
