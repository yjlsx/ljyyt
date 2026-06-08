const fs = require('fs');
const vm = require('vm');

function pickFunction(script, name) {
  const start = script.indexOf('function ' + name + '(');
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = start; index < script.length; index += 1) {
    const char = script[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const restoreBody = pickFunction(script, 'restorePlaybackState');

  if (!restoreBody.includes('syncQueueIndexToCurrentTrack();')) {
    throw new Error(file + ' restorePlaybackState should resync queue indexes from the restored current track');
  }
  if (restoreBody.includes('currentTrackIndex = Math.max(0, Number(state.currentTrackIndex) || 0);')) {
    throw new Error(file + ' restorePlaybackState still trusts stale currentTrackIndex from storage');
  }

  const sandbox = {
    localStorage: {
      getItem(key) {
        if (key !== 'ljyyt_otter_playback_state') throw new Error('Unexpected key: ' + key);
        return JSON.stringify({
          track: { title: 'Second', artist: 'Artist', source: 'local', src: 'second.mp3' },
          queue: [
            { title: 'First', artist: 'Artist', source: 'local', src: 'first.mp3' },
            { title: 'Second', artist: 'Artist', source: 'local', src: 'second.mp3' },
            { title: 'Third', artist: 'Artist', source: 'local', src: 'third.mp3' }
          ],
          queueIndex: 0,
          currentTrackIndex: 99,
          currentTime: 12
        });
      }
    },
    updatedTrack: null,
    likeUpdated: false,
    queueRendered: false,
    lyricsLoaded: null
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'readStoredJson'),
    pickFunction(script, 'readStoredObject'),
    pickFunction(script, 'getTrackKey'),
    pickFunction(script, 'isSameTrack'),
    pickFunction(script, 'syncQueueIndexToCurrentTrack'),
    pickFunction(script, 'restorePlaybackState'),
    'var currentTrack = null;',
    'var playQueue = [];',
    'var queueIndex = 0;',
    'var currentTrackIndex = 0;',
    'var restoredPlaybackTime = 0;',
    'function updateTrackUi(track) { updatedTrack = track; }',
    'function updateLikeButton() { likeUpdated = true; }',
    'function renderQueue() { queueRendered = true; }',
    'function loadLyricsForTrack(track) { lyricsLoaded = track; }',
    'if (!restorePlaybackState()) throw new Error("restorePlaybackState returned false");',
    'if (queueIndex !== 1 || currentTrackIndex !== 1) throw new Error("restored queue indexes are not synced to current track");',
    'if (restoredPlaybackTime !== 12) throw new Error("restored playback time was not preserved");',
    'if (!updatedTrack || updatedTrack.title !== "Second") throw new Error("restored track UI was not updated");',
    'if (!likeUpdated || !queueRendered || !lyricsLoaded) throw new Error("restore side effects did not run");'
  ].join('\n'), sandbox);
}
