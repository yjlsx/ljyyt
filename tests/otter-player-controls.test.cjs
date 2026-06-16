const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');

  for (const marker of [
    "quality: '320'",
    'playbackSpeed: 1',
    'sleepTimerDuration: 30',
    'function setAudioQuality',
    'function setPlaybackSpeed',
    'function startSleepTimer',
    'function stopSleepTimer',
    'id="full-quality-entry"',
    'id="full-quality-menu"',
    'function toggleQualityMenu',
    'function closeQualityMenu',
    'full-quality-option',
    'class="mode-control"',
    "showToast('播放模式：'",
    'onclick="openPlaybackSpeedDrawer(event)"',
    'onclick="openSleepTimerDrawer(event)"',
    'id="bilibili-keyword-presets"',
    "'Hi-Res'",
    "audioPlayer.playbackRate",
    "'&br=' + encodeURIComponent(quality)",
    "String(quality || '320') + 'k'"
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' is missing Otter player control marker: ' + marker);
    }
  }
}
