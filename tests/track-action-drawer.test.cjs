const fs = require('fs');

function pickFunction(script, name) {
  const start = script.indexOf('function ' + name);
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
  const body = pickFunction(script, 'handleTrackAction');

  for (const marker of [
    "showToast(liked ? '已取消喜欢' : '已添加到喜欢', 1500)",
    "showToast('已添加到下一首播放', 1500)",
    'var artistQuery = String(track.artist || \'\').trim();',
    'if (si) si.value = artistQuery;',
    'if (hi) hi.value = artistQuery;',
    'performSearch({ remember: true });',
    'var albumQuery = String(track.album).trim();',
    'if (si2) si2.value = albumQuery;',
    'if (hi2) hi2.value = albumQuery;'
  ]) {
    if (!body.includes(marker)) {
      throw new Error(file + ' handleTrackAction is missing marker: ' + marker);
    }
  }
}
