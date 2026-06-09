const fs = require('fs');

function pickFunction(script, name) {
  const start = script.indexOf('function ' + name);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let end = start; end < script.length; end += 1) {
    const char = script[end];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
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
  const renderTrackRows = pickFunction(script, 'renderTrackRows');
  const renderPageTrackRows = pickFunction(script, 'renderPageTrackRows');
  const renderQueue = pickFunction(script, 'renderQueue');

  if (!script.includes('function getTrackRowAriaLabel(track)')) {
    throw new Error(file + ' is missing a shared track row aria-label helper');
  }
  if (!script.includes("return '播放 ' + title + (artist ? ' - ' + artist : '');")) {
    throw new Error(file + ' track row aria-label helper should describe the play action');
  }

  for (const [name, body] of [
    ['renderTrackRows', renderTrackRows],
    ['renderPageTrackRows', renderPageTrackRows],
    ['renderQueue', renderQueue]
  ]) {
    if (!body.includes('aria-label="\' + escapeMarkup(getTrackRowAriaLabel(track)) + \'"')) {
      throw new Error(file + ' ' + name + ' should render a stable play aria-label for track rows');
    }
  }

  for (const marker of [
    "var removeLabel = (queueDrawerTab === 'history' ? '从最近播放删除 ' : '从播放列表删除 ') + (track.title || '未知歌曲');",
    "aria-label=\"' + escapeMarkup(removeLabel) + '\""
  ]) {
    if (!renderQueue.includes(marker)) {
      throw new Error(file + ' renderQueue should give queue remove buttons contextual labels: ' + marker);
    }
  }
}
