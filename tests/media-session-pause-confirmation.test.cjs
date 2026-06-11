const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('const PAUSE_CONFIRM_DELAY_MS = 200')) {
    throw new Error(file + ' should keep a short pause confirmation delay for system media controls');
  }
  if (!html.includes("audioPlayer.addEventListener('pause', confirmAudioPaused)")) {
    throw new Error(file + ' should not update playback UI immediately on transient pause events');
  }
  if (!html.includes("audioPlayer.addEventListener('playing', confirmAudioPlaying)")) {
    throw new Error(file + ' should cancel pause confirmation when playback resumes');
  }
}
