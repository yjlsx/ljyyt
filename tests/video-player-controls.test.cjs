const fs = require('fs');

for (const file of ['video-player.html', 'dist/video-player.html']) {
  const html = fs.readFileSync(file, 'utf8');

  for (const marker of [
    '.video-container:fullscreen',
    '.video-container.is-faux-fullscreen',
    'body.video-faux-fullscreen',
    'touch-action: none',
    'setVideoProgressFromClientX',
    'videoContainer.requestFullscreen()',
    'video.webkitEnterFullscreen()',
    "pc.addEventListener('pointerdown', onStart)",
    "pc.addEventListener('pointermove', onMove)",
    "pc.addEventListener('pointerup', onEnd)",
    "pc.addEventListener('pointercancel', onEnd)"
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' is missing video control marker: ' + marker);
    }
  }

  if (html.includes("pc.addEventListener('touchstart'") || html.includes("document.addEventListener('touchmove'")) {
    throw new Error(file + ' still uses legacy touch drag listeners for video progress');
  }

  if (html.includes('video.requestFullscreen().catch')) {
    throw new Error(file + ' still fullscreen requests only the video element');
  }

  if (html.includes('attemptFallbackFullscreen(video);')) {
    throw new Error(file + ' should fallback fullscreen on the video container, not the raw video element');
  }
  if (!html.includes('attemptFallbackFullscreen(videoContainer);')) {
    throw new Error(file + ' should fallback fullscreen through the video container');
  }

  if (!html.includes('.video-container.hide-controls .custom-controls')) {
    throw new Error(file + ' should keep a visible progress rail when video controls auto-hide');
  }

  if (!html.includes("videoContainer.classList.contains('is-faux-fullscreen')")) {
    throw new Error(file + ' should treat faux fullscreen as fullscreen when toggling');
  }

  if (!html.includes("videoContainer.classList.remove('is-faux-fullscreen')")) {
    throw new Error(file + ' should remove faux fullscreen classes from the fullscreen toggle exit path');
  }

  if (/\.progress-buffer\s*\{[^}]*top:\s*0;[^}]*top:\s*50%/s.test(html)) {
    throw new Error(file + ' has conflicting progress-buffer top positioning');
  }
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');

  for (const marker of [
    '.vp-wrap:fullscreen',
    '.vp-wrap.is-faux-fullscreen',
    'body.video-faux-fullscreen',
    'touch-action: none',
    '.vp-progress::before',
    '.vp-wrap.hide-controls .vp-bar',
    'setVideoProgressFromClientX',
    'function enterVideoFullscreen()',
    'wrap.requestFullscreen()',
    'vid.webkitEnterFullscreen()',
    "progress.addEventListener('pointerdown'",
    "progress.addEventListener('pointermove'",
    "progress.addEventListener('pointerup'",
    "progress.addEventListener('pointercancel'"
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' is missing inline MV video control marker: ' + marker);
    }
  }

  if (html.includes("document.getElementById('vp-progress').addEventListener('click'")) {
    throw new Error(file + ' still uses click-only inline MV progress seeking');
  }

  if (!html.includes("wrap.classList.contains('is-faux-fullscreen')")) {
    throw new Error(file + ' should allow the inline MV faux fullscreen state to toggle off');
  }
}
