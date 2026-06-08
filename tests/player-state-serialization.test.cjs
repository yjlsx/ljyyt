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

for (const file of ['player_state.js', 'dist/player_state.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const serializeState = pickFunction(script, 'serializePlayerState');
  const freshState = pickFunction(script, 'isFreshPlayerState');
  const saveState = pickFunction(script, 'savePlayerState');
  const restoreState = pickFunction(script, 'restorePlayerState');
  const hasState = pickFunction(script, 'hasSavedPlayerState');

  if (!/try\s*\{/.test(serializeState) || !/catch\s*\(error\)\s*\{/.test(serializeState)) {
    throw new Error(file + ' serializePlayerState should tolerate JSON.stringify failures');
  }

  for (const expected of [
    'var safeState = Object.assign({}, playerState, { trackData: null })',
    'return JSON.stringify(safeState)'
  ]) {
    if (!serializeState.includes(expected)) {
      throw new Error(file + ' serializePlayerState is missing fallback behavior: ' + expected);
    }
  }

  for (const expected of [
    'state && typeof state === \'object\'',
    'Number.isFinite(state.timestamp)',
    'maxAgeMs'
  ]) {
    if (!freshState.includes(expected)) {
      throw new Error(file + ' isFreshPlayerState is missing validation: ' + expected);
    }
  }

  if (!saveState.includes("var serialized = serializePlayerState(playerState)") ||
      !saveState.includes("if (!serialized) return") ||
      !saveState.includes("writePlayerStateValue('playerState', serialized)")) {
    throw new Error(file + ' savePlayerState should serialize defensively before writing');
  }

  if (!restoreState.includes('isFreshPlayerState(state, 24 * 60 * 60 * 1000)')) {
    throw new Error(file + ' restorePlayerState should validate state freshness with a helper');
  }

  if (!hasState.includes('isFreshPlayerState(state, 30 * 60 * 1000)')) {
    throw new Error(file + ' hasSavedPlayerState should validate state freshness with a helper');
  }
}
