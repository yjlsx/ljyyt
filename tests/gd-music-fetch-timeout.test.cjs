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
  const body = pickFunction(script, 'fetchGdMusicJson');

  for (const marker of [
    "if (!urls.length) throw new Error('gd music request failed');",
    "if (signal && signal.aborted) throw new DOMException('Aborted', 'AbortError');",
    'var ac = new AbortController();',
    "if (signal) signal.addEventListener('abort', function() { ac.abort(); });",
    'var timer = setTimeout(function() { ac.abort(); }, 10000);',
    'var result = await Promise.any(urls.map(function(u) {',
    "fetch(u, { signal: merged })",
    'clearTimeout(timer);'
  ]) {
    if (!body.includes(marker)) {
      throw new Error(file + ' fetchGdMusicJson is missing marker: ' + marker);
    }
  }

  if (body.includes('for (var i = 0; i < urls.length; i++)')) {
    throw new Error(file + ' fetchGdMusicJson still waits through fallback endpoints serially');
  }
}
