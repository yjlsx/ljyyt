const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const marker = 'var trackToPlay = currentTrack;';
  const start = html.indexOf(marker);
  if (start < 0) {
    throw new Error(file + ' is missing the playCurrentTrack resolving block marker');
  }
  const end = html.indexOf("if (!playableUrl)", start);
  if (end < 0) {
    throw new Error(file + ' could not locate the end of the resolving block');
  }
  const block = html.slice(start, end);

  if (!block.includes('try {')) {
    throw new Error(file + ' does not guard ensurePlayableTrackUrl with try/finally');
  }
  if (!block.includes('var resolvePromise = ensurePlayableTrackUrl(trackToPlay);')) {
    throw new Error(file + ' does not start playable URL resolution inside the guarded block');
  }
  if (!block.includes('Promise.race([resolvePromise, resolvePrewarmRace])')) {
    throw new Error(file + ' does not let fallback prewarm race slow primary URL resolution');
  }
  if (!block.includes("switchToFallbackSource('prewarm-ready', requestId)")) {
    throw new Error(file + ' does not switch to the prewarmed source during slow URL resolution');
  }
  if (!block.includes('currentTrack.src = playableUrl;')) {
    throw new Error(file + ' does not write resolved playable URL back to currentTrack');
  }
  if (!block.includes('reconcileCurrentTrackInQueue(trackToPlay);')) {
    throw new Error(file + ' does not sync the queue after resolving a playable URL');
  }
  if (!/finally\s*{\s*_isResolvingUrl\s*=\s*false;\s*}/.test(block)) {
    throw new Error(file + ' can leave _isResolvingUrl stuck after URL resolution errors');
  }
}
