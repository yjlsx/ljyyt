const fs = require('fs');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < script.length; index += 1) {
    const char = script[index];
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
      if (opened && depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const setPlaybackResolving = pickFunction(script, 'setPlaybackResolving');
  const setResolvingUrlState = pickFunction(script, 'setResolvingUrlState');
  const playCurrentTrack = pickFunction(script, 'playCurrentTrack');
  const switchToFallbackSource = pickFunction(script, 'switchToFallbackSource');

  if (!html.includes('.progress.is-buffering::before') || !html.includes('.controls .main-play.is-buffering::before')) {
    throw new Error(file + ' should style mini and fullscreen play buttons with a buffering spinner');
  }
  if (!setPlaybackResolving.includes("button.classList.toggle('is-buffering', isResolving)")) {
    throw new Error(file + ' should toggle buffering class on playback buttons');
  }
  if (!setPlaybackResolving.includes("button.setAttribute('aria-busy', isResolving ? 'true' : 'false')")) {
    throw new Error(file + ' should expose buffering state through aria-busy');
  }
  if (!setResolvingUrlState.includes('setPlaybackResolving(_isResolvingUrl);')) {
    throw new Error(file + ' should keep resolving state and buffering UI in sync');
  }
  if (!playCurrentTrack.includes("if (typeof setResolvingUrlState === 'function') setResolvingUrlState(true); else _isResolvingUrl = true;") ||
      !playCurrentTrack.includes("if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;")) {
    throw new Error(file + ' should show buffering while resolving playable URLs');
  }
  if (!switchToFallbackSource.includes("if (typeof setResolvingUrlState === 'function') setResolvingUrlState(true); else _isResolvingUrl = true;") ||
      !switchToFallbackSource.includes("if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;")) {
    throw new Error(file + ' should show buffering while switching fallback sources');
  }
}
