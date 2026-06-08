const fs = require('fs');

function pickFunction(source, name) {
  const marker = 'function ' + name + '(';
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === quote) {
        quote = '';
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error('Could not extract function ' + name);
}

for (const file of ['script.js', 'dist/script.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const persistState = pickFunction(script, 'persistCurrentPlayerState');
  const appCodeWithoutHelper = script.replace(persistState, '');

  if (!/try\s*\{/.test(persistState) || !/catch\s*\(error\)\s*\{/.test(persistState)) {
    throw new Error(file + ' persistCurrentPlayerState should tolerate player_state failures');
  }

  for (const expected of [
    "typeof savePlayerState === 'function'",
    'savePlayerState(track.id, currentTime, playing, track, volume)',
    "writeScriptStorageValue('currentTrackId', track.id)",
    "writeScriptStorageValue('lastPlayedTrack', JSON.stringify(track))"
  ]) {
    if (!persistState.includes(expected)) {
      throw new Error(file + ' persistCurrentPlayerState is missing: ' + expected);
    }
  }

  if (appCodeWithoutHelper.includes('savePlayerState(')) {
    throw new Error(file + ' still calls savePlayerState outside persistCurrentPlayerState');
  }

  const persistCalls = appCodeWithoutHelper.match(/persistCurrentPlayerState\(/g) || [];
  if (persistCalls.length < 8) {
    throw new Error(file + ' does not route all player state saves through persistCurrentPlayerState');
  }
}
