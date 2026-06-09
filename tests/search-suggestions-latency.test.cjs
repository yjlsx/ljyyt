const fs = require('fs');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let end = start;
  let opened = false;
  for (; end < script.length; end++) {
    const char = script[end];
    if (char === '{') {
      depth++;
      opened = true;
    } else if (char === '}') {
      depth--;
      if (opened && depth === 0) {
        end++;
        break;
      }
    }
  }
  return script.slice(start, end);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const renderBody = pickFunction(script, 'renderSearchSuggestions');
  const remoteBody = pickFunction(script, 'fetchNeteaseSuggestions');

  if (!script.includes('function applySearchSuggestionGroups')) {
    throw new Error(file + ' is missing applySearchSuggestionGroups');
  }

  if (renderBody.includes('await fetchNeteaseSuggestions(query)')) {
    throw new Error(file + ' still blocks local suggestions on remote Netease suggestions');
  }

  if (!renderBody.includes('var localSuggestions = buildSearchSuggestions(query, await ensureLibraryTracks().catch(function() { return []; }));')) {
    throw new Error(file + ' does not build local suggestions before remote suggestions');
  }

  if (!renderBody.includes('applySearchSuggestionGroups(box, localSuggestions);')) {
    throw new Error(file + ' does not render local suggestions immediately');
  }

  if (!renderBody.includes('fetchNeteaseSuggestions(query).then(function(neteaseSuggestions)')) {
    throw new Error(file + ' does not merge remote suggestions asynchronously');
  }

  if (!renderBody.includes('if (requestId !== searchSuggestionRequestId) return;')) {
    throw new Error(file + ' does not guard stale async suggestion responses');
  }

  if (!remoteBody.includes("var endpoint = neteaseApiBase + '/suggest?keyword=' + encodeURIComponent(query);")) {
    throw new Error(file + ' should use the configured NetEase API base for remote suggestions');
  }

  if (remoteBody.includes("'/api/netease/suggest?keyword='")) {
    throw new Error(file + ' still probes same-origin /api/netease/suggest before the configured API base');
  }
}
