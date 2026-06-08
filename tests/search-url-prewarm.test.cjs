const fs = require('fs');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
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
  const preResolve = pickFunction(script, 'preResolveSearchUrls');

  if (!preResolve.includes('var PREWARM_CONCURRENCY = 8;')) {
    throw new Error(file + ' does not prewarm enough visible search URLs for quick click-to-play');
  }
  if (!preResolve.includes('active += 1;')) {
    throw new Error(file + ' does not track active URL prewarm requests');
  }
  if (!preResolve.includes('let track = pending[idx++];')) {
    throw new Error(file + ' can assign resolved URLs to the wrong search row');
  }
  if (!preResolve.includes('.finally(function() {')) {
    throw new Error(file + ' waits for a whole slow batch before prewarming more URLs');
  }
  if (!preResolve.includes('active -= 1;')) {
    throw new Error(file + ' does not release URL prewarm concurrency slots');
  }
  if (!preResolve.includes('pump();')) {
    throw new Error(file + ' does not immediately refill URL prewarm slots');
  }
  if (preResolve.includes('Promise.all(slice.map')) {
    throw new Error(file + ' still uses slow batch URL prewarming');
  }
}
