const fs = require('fs');

function getInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(file + ' is missing inline application script');
  return match[1];
}

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

for (const file of ['index.html', 'dist/index.html']) {
  const script = getInlineScript(file);
  const proxyLine = pickFunction(script, 'tryProxyPlaybackLine');
  const fallback = pickFunction(script, 'switchToFallbackSource');

  if (!proxyLine.includes('async function tryProxyPlaybackLine(rawUrl, requestId)')) {
    throw new Error(file + ' proxy playback fallback is not tied to a play request id');
  }
  if (!proxyLine.includes('if (requestId && requestId !== _playRequestId) return false;')) {
    throw new Error(file + ' proxy playback fallback can mutate playback after a stale request');
  }
  if (!proxyLine.includes('confirmPlaybackStarted(requestId || _playRequestId)')) {
    throw new Error(file + ' proxy playback confirmation does not use the captured request id');
  }

  if (!fallback.includes('async function switchToFallbackSource(reason, requestId, failedUrl)')) {
    throw new Error(file + ' source fallback is not tied to a play request id and failed url');
  }
  if (!fallback.includes('if (requestId && requestId !== _playRequestId) return false;')) {
    throw new Error(file + ' source fallback does not reject stale play requests');
  }
  if (!fallback.includes('tryProxyPlaybackLine(failedUrl, requestId)')) {
    throw new Error(file + ' source fallback does not pass the request id into proxy fallback');
  }
  if (!fallback.includes('confirmPlaybackStarted(requestId || _playRequestId)')) {
    throw new Error(file + ' source fallback confirmation does not use the captured request id');
  }

  for (const marker of [
    "switchToFallbackSource('play-failed', requestId)",
    'var requestId = _playRequestId;',
    "var failedSrc = audioPlayer.getAttribute('src') || '';",
    "switchToFallbackSource('audio-error', requestId, failedSrc)",
    "if (requestId !== _playRequestId || failedSrc !== audioPlayer.getAttribute('src')) return;"
  ]) {
    if (!script.includes(marker)) {
      throw new Error(file + ' audio error fallback is missing stale-request guard marker: ' + marker);
    }
  }
}
