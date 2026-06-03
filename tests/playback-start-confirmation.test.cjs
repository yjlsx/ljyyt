const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');

  if (!html.includes('function confirmPlaybackStarted')) {
    throw new Error(file + ' does not confirm that audio actually started');
  }

  if (!html.includes("if (!await confirmPlaybackStarted(requestId)) throw new Error('Audio did not start playback');")) {
    throw new Error(file + ' does not retry fallback when primary play stays paused');
  }

  if (!html.includes("if (!await confirmPlaybackStarted(_playRequestId)) throw new Error('Audio fallback did not start playback');")) {
    throw new Error(file + ' does not verify fallback playback startup');
  }
}
