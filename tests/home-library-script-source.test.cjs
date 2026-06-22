const fs = require('fs');

function getInlineScript(html) {
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error('Missing inline app script');
  return match[1];
}

function pickFunction(source, name) {
  const start = source.indexOf('function ' + name);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
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
      if (opened && depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = getInlineScript(html);
  const renderHomeLibraryTracks = pickFunction(script, 'renderHomeLibraryTracks');

  if (!html.includes('id="home-library-list"')) {
    throw new Error(file + ' home Naxi music list should have a dynamic render target');
  }

  for (const marker of [
    'await ensureLibraryTracks()',
    '.slice(0, 7)',
    "sourceLabel: '丽江曲库'",
    "renderTrackRows(list, tracks, '暂无纳西音乐')"
  ]) {
    if (!renderHomeLibraryTracks.includes(marker)) {
      throw new Error(file + ' renderHomeLibraryTracks should source home rows from script.js musicData: ' + marker);
    }
  }

  if (!script.includes('renderHomeLibraryTracks();')) {
    throw new Error(file + ' should render home Naxi music during app startup');
  }
}
