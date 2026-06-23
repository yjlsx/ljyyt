const fs = require('fs');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let opened = false;
  for (let end = start; end < script.length; end++) {
    const char = script[end];
    if (char === '{') {
      depth++;
      opened = true;
    } else if (char === '}') {
      depth--;
      if (opened && depth === 0) return script.slice(start, end + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const body = pickFunction(script, 'playCurrentTrack');

  for (const marker of [
    'unlockAudioContext(!hadPlayableSrc);',
    'if (currentTrack.src) {',
    "if (audioPlayer.getAttribute('src') !== currentTrack.src)",
    "if (requestId !== _playRequestId) return;",
    "switchToFallbackSource('resolve-empty', requestId)",
    "handleNoPlayableSource('resolve-empty', requestId);",
    "handleNoPlayableSource('play-failed', requestId);"
  ]) {
    if (!body.includes(marker)) {
      throw new Error(file + ' playCurrentTrack is missing marker: ' + marker);
    }
  }

  const autoSkip = pickFunction(script, 'autoPlayNextAfterFailure');
  if (!autoSkip.includes('playTrackAt(queueIndex + 1, { autoSkip: true })')) {
    throw new Error(file + ' autoPlayNextAfterFailure does not move to the next queue item');
  }
  if (!autoSkip.includes('if (!tracks.length || tracks.length <= 1) return false;')) {
    throw new Error(file + ' autoPlayNextAfterFailure may loop a single-song queue');
  }
  if (!autoSkip.includes('Math.min(MAX_CONSECUTIVE_AUTO_SKIPS, tracks.length - 1)') ||
      !autoSkip.includes('_autoSkipFailureCount >= skipLimit')) {
    throw new Error(file + ' autoPlayNextAfterFailure is missing a queue wrap guard');
  }

  const noPlayable = pickFunction(script, 'handleNoPlayableSource');
  if (!noPlayable.includes("showToast('未找到可用音源，播放下一首'")) {
    throw new Error(file + ' handleNoPlayableSource does not notify before auto-skipping');
  }
  if (!noPlayable.includes('await autoPlayNextAfterFailure(requestId)')) {
    throw new Error(file + ' handleNoPlayableSource does not invoke automatic next-track playback');
  }
}
