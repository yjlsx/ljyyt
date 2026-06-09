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

  for (const marker of [
    'function isKeyboardActivation(event)',
    "event.key === 'Enter' || event.key === ' ' || event.code === 'Space'",
    'function bindTrackRowKeyboard(row, handler)',
    'row.addEventListener(\'keydown\', function(event)'
  ]) {
    if (!script.includes(marker)) {
      throw new Error(file + ' is missing keyboard activation helper marker: ' + marker);
    }
  }

  for (const [name, body] of [
    ['renderTrackRows', renderTrackRows],
    ['renderPageTrackRows', renderPageTrackRows],
    ['renderQueue', renderQueue]
  ]) {
    if (!body.includes('role="button"') || !body.includes('tabindex="0"')) {
      throw new Error(file + ' ' + name + ' should render playable rows as keyboard-focusable buttons');
    }
    if (!body.includes('bindTrackRowKeyboard(row,')) {
      throw new Error(file + ' ' + name + ' should bind Enter/Space to the row play action');
    }
  }

  if (!renderTrackRows.includes('function playRowTrack()') || !renderTrackRows.includes('bindTrackRowKeyboard(row, playRowTrack);')) {
    throw new Error(file + ' renderTrackRows should share click and keyboard playback through playRowTrack');
  }
  if (!renderPageTrackRows.includes('function playRowTrack()') || !renderPageTrackRows.includes('bindTrackRowKeyboard(row, playRowTrack);')) {
    throw new Error(file + ' renderPageTrackRows should share click and keyboard playback through playRowTrack');
  }
  if (!renderQueue.includes('function playDrawerTrack()') || !renderQueue.includes('bindTrackRowKeyboard(row, playDrawerTrack);')) {
    throw new Error(file + ' renderQueue should share drawer row click and keyboard playback through playDrawerTrack');
  }
}
