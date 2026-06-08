const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');

  if (!html.includes('function confirmPlaybackStarted')) {
    throw new Error(file + ' does not confirm that audio actually started');
  }

  if (!html.includes('function waitForAudioReady')) {
    throw new Error(file + ' does not wait for audio readiness events before judging playback');
  }

  if (!html.includes('function playAudioWithTimeout') || !html.includes('Promise.race')) {
    throw new Error(file + ' does not guard audio.play() with a timeout');
  }

  if (!html.includes('const PRIMARY_PLAYBACK_TIMEOUT_MS = 3200')) {
    throw new Error(file + ' does not use the faster primary playback timeout before source fallback');
  }

  if (!html.includes('playAudioWithTimeout(PRIMARY_PLAYBACK_TIMEOUT_MS)')) {
    throw new Error(file + ' does not apply the faster primary playback timeout to failed source detection');
  }

  if (html.includes('if (!audioPlayer.src) setCurrentTrack(currentTrack)')) {
    throw new Error(file + ' treats an empty audio element as the current page URL');
  }

  if (!html.includes("audioPlayer.getAttribute('src')")) {
    throw new Error(file + ' does not inspect the audio src attribute directly');
  }

  for (const eventName of ['loadedmetadata', 'canplay', 'canplaythrough', 'error']) {
    if (!html.includes("'" + eventName + "'")) {
      throw new Error(file + ' does not observe audio ' + eventName + ' before fallback');
    }
  }

  if (!html.includes("setTimeout(function() { finish(reject, new Error('AUDIO_NOT_READY')); }")) {
    throw new Error(file + ' does not fail readiness timeout into fallback');
  }

  if (!html.includes("if (!await confirmPlaybackStarted(requestId)) throw new Error('Audio did not start playback');")) {
    throw new Error(file + ' does not retry fallback when primary play stays paused');
  }

  if (!html.includes("if (!await confirmPlaybackStarted(requestId || _playRequestId)) throw new Error('Audio fallback did not start playback');")) {
    throw new Error(file + ' does not verify fallback playback startup');
  }
}
