const fs = require('fs');

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
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const isBlocked = pickFunction(script, 'isAutoplayPolicyBlocked');
  const play = pickFunction(script, 'playCurrentTrack');
  const proxyLine = pickFunction(script, 'tryProxyPlaybackLine');
  const fallback = pickFunction(script, 'switchToFallbackSource');

  if (!isBlocked.includes("'NotAllowedError'")) {
    throw new Error(file + ' does not detect browser autoplay policy failures by name');
  }
  if (!isBlocked.includes('user didn')) {
    throw new Error(file + ' does not detect browser autoplay policy failures by message');
  }
  if (!proxyLine.includes('if (isAutoplayPolicyBlocked(error)) return false;')) {
    throw new Error(file + ' proxy fallback can remember autoplay-policy blocks as bad audio URLs');
  }
  if (!fallback.includes('if (isAutoplayPolicyBlocked(error)) return false;')) {
    throw new Error(file + ' source fallback can keep cycling sources after autoplay-policy blocks');
  }
  if (!play.includes('if (isAutoplayPolicyBlocked(error)) {')) {
    throw new Error(file + ' playCurrentTrack does not preserve resolved URLs after autoplay-policy blocks');
  }
  if (!play.includes("showToast('音源已就绪，请再次点击播放');")) {
    throw new Error(file + ' playCurrentTrack does not tell users to retry once the URL is ready');
  }
  if (!play.includes("if (audioPlayer.getAttribute('src')) savePlaybackState(true);")) {
    throw new Error(file + ' playCurrentTrack does not persist the resolved URL after autoplay-policy blocks');
  }
}
