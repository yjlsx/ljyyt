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
  const unlock = pickFunction(script, 'unlockAudioContext');
  const play = pickFunction(script, 'playCurrentTrack');

  if (!script.includes('const SILENT_AUDIO_DATA_URI')) {
    throw new Error(file + ' is missing a silent audio data URI for gesture unlock');
  }
  if (!script.includes('function isSilentAudioPrimerSrc')) {
    throw new Error(file + ' is missing a helper to identify the silent audio primer');
  }
  if (!script.includes("if (!audioPlayer.getAttribute('src') || isSilentAudioPrimerSrc(audioPlayer.getAttribute('src'))) setCurrentTrack(currentTrack);")) {
    throw new Error(file + ' treats the silent primer as a real current audio source');
  }
  if (!script.includes("if (!currentTrack || !failedSrc || isSilentAudioPrimerSrc(failedSrc) || _isResolvingUrl) return;")) {
    throw new Error(file + ' can treat the silent primer as a failed real track');
  }
  if (!unlock.includes('audioPlayer.muted = true;')) {
    throw new Error(file + ' does not mute the silent gesture unlock attempt');
  }
  if (!unlock.includes('audioPlayer.src = SILENT_AUDIO_DATA_URI;')) {
    throw new Error(file + ' does not start gesture unlock with the silent audio source');
  }
  if (!unlock.includes('audioPlayer.play().then(function()')) {
    throw new Error(file + ' does not start playback inside the user gesture unlock');
  }
  if (!unlock.includes("if (isSilentAudioPrimerSrc(audioPlayer.getAttribute('src')))")) {
    throw new Error(file + ' can clear the real track URL after the silent primer resolves');
  }
  if (!unlock.includes('audioPlayer.muted = wasMuted;')) {
    throw new Error(file + ' does not restore mute state after gesture unlock');
  }
  if (!play.includes('var hadPlayableSrc = !!currentTrack.src;')) {
    throw new Error(file + ' does not capture whether the selected track already has a playable URL');
  }
  if (!play.includes('unlockAudioContext(!hadPlayableSrc);')) {
    throw new Error(file + ' does not prime playback before async URL resolution');
  }
}
