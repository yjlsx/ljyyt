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
  const body = pickFunction(script, 'performSearch');

  if (body.includes('await Promise.all(')) {
    throw new Error(file + ' waits for every external source before rendering search results');
  }

  for (const marker of [
    "if (container) container.innerHTML = '<div class=\"empty-note\" style=\"opacity:0.6\">搜索中...</div>';",
    'if (localTracks.length) {',
    'currentSearchState.songs = localTracks;',
    'renderSearchRows(localTracks, activeProvider);',
    'externalSources.forEach(function(source) {',
    'searchExternalSource(query, source, signal).then(function(tracks) {',
    'var results = needsDedup ? deduplicateSearchResults(allTracks) : allTracks;',
    'pending--;',
    "if (pending <= 0 && !allTracks.length)"
  ]) {
    if (!body.includes(marker)) {
      throw new Error(file + ' performSearch is missing progressive search marker: ' + marker);
    }
  }
}
