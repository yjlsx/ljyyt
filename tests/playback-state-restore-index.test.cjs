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

  if (!html.includes('function normalizePlaybackStateTrack')) {
    throw new Error(file + ' is missing playback-state track normalization');
  }
  if (!restoreBody.includes('syncQueueIndexToCurrentTrack();')) {
    throw new Error(file + ' restorePlaybackState should resync queue indexes from the restored current track');
  }
  if (!restoreBody.includes('normalizePlaybackStateTrack(state.track)')) {
    throw new Error(file + ' restorePlaybackState should normalize the restored current track before using it');
  }
  if (!restoreBody.includes('filterStoredObjectList(state.queue).map(normalizePlaybackStateTrack).filter(Boolean)')) {
    throw new Error(file + ' restorePlaybackState should filter and normalize restored queue entries');
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
    pickFunction(script, 'filterStoredObjectList'),
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'safeCover'),
    pickFunction(script, 'getTrackKey'),
    pickFunction(script, 'isSameTrack'),
    pickFunction(script, 'normalizePlaybackStateTrack'),
    pickFunction(script, 'syncQueueIndexToCurrentTrack'),
    pickFunction(script, 'restorePlaybackState'),
    'var DEFAULT_COVER = "default-cover.svg";',
    'var currentTrack = null;',
    'var playQueue = [];',
    'var queueIndex = 0;',
    'var currentTrackIndex = 0;',
    'var restoredPlaybackTime = 0;',
    'function getSourceLabel(source) { return source === "local" ? "丽江曲库" : source; }',
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

  const corruptSandbox = {
    localStorage: {
      getItem(key) {
        if (key !== 'ljyyt_otter_playback_state') throw new Error('Unexpected key: ' + key);
        return JSON.stringify({
          track: { title: { text: 'bad' }, artist: ['bad'], cover: 'http://example.test/c.jpg', duration: '3:04', source: 'kuwo', sourceLabel: ['bad'], urlId: 'u-1', src: 123 },
          queue: [
            null,
            'bad',
            [],
            { title: '', artist: '', source: 'local' },
            { title: 'Queue Song', artist: 'Singer', src: 'queue.mp3', duration: 250000 }
          ],
          queueIndex: 99,
          currentTime: -8
        });
      }
    },
    updatedTrack: null,
    likeUpdated: false,
    queueRendered: false,
    lyricsLoaded: null
  };
  vm.createContext(corruptSandbox);
  vm.runInContext([
    pickFunction(script, 'readStoredJson'),
    pickFunction(script, 'readStoredObject'),
    pickFunction(script, 'filterStoredObjectList'),
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'safeCover'),
    pickFunction(script, 'getTrackKey'),
    pickFunction(script, 'isSameTrack'),
    pickFunction(script, 'normalizePlaybackStateTrack'),
    pickFunction(script, 'syncQueueIndexToCurrentTrack'),
    pickFunction(script, 'restorePlaybackState'),
    'var DEFAULT_COVER = "default-cover.svg";',
    'var currentTrack = { title: "Before", artist: "Artist", source: "local" };',
    'var playQueue = [{ title: "Before", artist: "Artist", source: "local" }];',
    'var queueIndex = 0;',
    'var currentTrackIndex = 0;',
    'var restoredPlaybackTime = 0;',
    'function getSourceLabel(source) { return source === "kuwo" ? "酷我音乐" : source; }',
    'function updateTrackUi(track) { updatedTrack = track; }',
    'function updateLikeButton() { likeUpdated = true; }',
    'function renderQueue() { queueRendered = true; }',
    'function loadLyricsForTrack(track) { lyricsLoaded = track; }',
    'if (!restorePlaybackState()) throw new Error("restorePlaybackState should accept salvageable stored tracks");',
    'if (currentTrack.title !== "未知歌曲" || currentTrack.artist !== "未知歌手") throw new Error("corrupt text fields were not normalized");',
    'if (currentTrack.cover !== "https://example.test/c.jpg") throw new Error("restored cover was not normalized to https");',
    'if (currentTrack.src !== "") throw new Error("non-string restored src should be discarded");',
    'if (currentTrack.duration !== 184) throw new Error("restored duration was not parsed");',
    'if (currentTrack.source !== "kuwo" || currentTrack.sourceLabel !== "酷我音乐") throw new Error("restored source label was not normalized");',
    'if (!Array.isArray(playQueue) || playQueue.length !== 2) throw new Error("restored queue should include current track plus one valid queued track");',
    'if (playQueue[1].title !== "Queue Song" || playQueue[1].duration !== 250) throw new Error("valid restored queue track was not normalized");',
    'if (restoredPlaybackTime !== 0) throw new Error("negative restored playback time should be clamped to zero");'
  ].join('\n'), corruptSandbox);

  const invalidSandbox = {
    localStorage: {
      getItem() {
        return JSON.stringify({ track: { title: '', artist: '', source: 'local' }, queue: [] });
      }
    },
    updatedTrack: false
  };
  vm.createContext(invalidSandbox);
  vm.runInContext([
    pickFunction(script, 'readStoredJson'),
    pickFunction(script, 'readStoredObject'),
    pickFunction(script, 'filterStoredObjectList'),
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'safeCover'),
    pickFunction(script, 'getTrackKey'),
    pickFunction(script, 'isSameTrack'),
    pickFunction(script, 'normalizePlaybackStateTrack'),
    pickFunction(script, 'syncQueueIndexToCurrentTrack'),
    pickFunction(script, 'restorePlaybackState'),
    'var DEFAULT_COVER = "default-cover.svg";',
    'var currentTrack = { title: "Before", artist: "Artist", source: "local" };',
    'var playQueue = [{ title: "Before", artist: "Artist", source: "local" }];',
    'var queueIndex = 0;',
    'var currentTrackIndex = 0;',
    'var restoredPlaybackTime = 0;',
    'function getSourceLabel(source) { return source; }',
    'function updateTrackUi() { updatedTrack = true; }',
    'function updateLikeButton() {}',
    'function renderQueue() {}',
    'function loadLyricsForTrack() {}',
    'if (restorePlaybackState()) throw new Error("restorePlaybackState should reject unsalvageable stored tracks");',
    'if (currentTrack.title !== "Before" || updatedTrack) throw new Error("invalid restored state should not mutate current playback state");'
  ].join('\n'), invalidSandbox);
}
