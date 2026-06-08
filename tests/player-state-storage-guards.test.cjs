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

const unsafeMarkers = [
  'localStorage.setItem(',
  'localStorage.getItem(',
  'localStorage.removeItem('
];

for (const file of ['player_state.js', 'dist/player_state.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const readValue = pickFunction(script, 'readPlayerStateValue');
  const writeValue = pickFunction(script, 'writePlayerStateValue');
  const removeValue = pickFunction(script, 'removePlayerStateValue');
  const appCodeWithoutHelpers = [readValue, writeValue, removeValue].reduce(
    (source, helper) => source.replace(helper, ''),
    script
  );

  for (const [name, body] of [
    ['readPlayerStateValue', readValue],
    ['writePlayerStateValue', writeValue],
    ['removePlayerStateValue', removeValue]
  ]) {
    if (!/try\s*\{/.test(body) || !/catch\s*\(error\)\s*\{/.test(body)) {
      throw new Error(file + ' ' + name + ' should catch unavailable localStorage');
    }
  }

  for (const marker of unsafeMarkers) {
    if (appCodeWithoutHelpers.includes(marker)) {
      throw new Error(file + ' still has unsafe player-state storage access: ' + marker);
    }
  }

  for (const expected of [
    'serializePlayerState(playerState)',
    "writePlayerStateValue('playerState', serialized)",
    "readPlayerStateValue('playerState')",
    "removePlayerStateValue('playerState')"
  ]) {
    if (!script.includes(expected)) {
      throw new Error(file + ' is missing guarded player-state call: ' + expected);
    }
  }
}
