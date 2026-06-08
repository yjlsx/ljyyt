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
    'unlockAudioContext();',
    'if (currentTrack.src) {',
    "if (audioPlayer.getAttribute('src') !== currentTrack.src)",
    "if (requestId !== _playRequestId) return;",
    "showToast('当前音源暂时无法播放');",
    "showToast('播放失败，请重试或切换歌曲');"
  ]) {
    if (!body.includes(marker)) {
      throw new Error(file + ' playCurrentTrack is missing marker: ' + marker);
    }
  }

  if (body.includes('正在尝试下一首') || body.includes('nextTrack();')) {
    throw new Error(file + ' playCurrentTrack still auto-skips after a playback failure');
  }
}
