const fs = require('fs');
const vm = require('vm');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
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

async function verifyAutoNext(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    _playRequestId: 7,
    _autoSkipFailureCount: 0,
    playQueue: [
      { title: '坏歌', artist: '歌手', src: '' },
      { title: '下一首', artist: '歌手', src: 'next.mp3' }
    ],
    queueIndex: 0,
    currentTrackIndex: 0,
    currentTrack: { title: '坏歌', artist: '歌手', src: '' },
    appSettings: { smartSource: true },
    played: [],
    toasts: [],
    setPlayIcons(value) {
      sandbox.playIconState = value;
    },
    showToast(message) {
      sandbox.toasts.push(message);
    },
    async ensureLibraryTracks() {
      return sandbox.playQueue;
    },
    setQueue(tracks, index) {
      sandbox.playQueue = tracks.slice();
      sandbox.queueIndex = index;
      sandbox.currentTrackIndex = index;
    },
    setCurrentTrack(track) {
      sandbox.currentTrack = track;
      sandbox.played.push(track.title);
    },
    async playCurrentTrack() {}
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'resetAutoSkipFailureCount'),
    pickFunction(script, 'isSmartSourceEnabled'),
    pickFunction(script, 'playTrackAt'),
    pickFunction(script, 'autoPlayNextAfterFailure'),
    pickFunction(script, 'handleNoPlayableSource')
  ].join('\n'), sandbox);

  const skipped = await sandbox.handleNoPlayableSource('resolve-empty', 7);
  if (!skipped || sandbox.played[0] !== '下一首') {
    throw new Error(file + ' should play the next queue item when no source is playable');
  }
  if (!sandbox.toasts.includes('未找到可用音源，播放下一首')) {
    throw new Error(file + ' should notify that it is playing the next song');
  }
}

async function verifySingleQueueDoesNotLoop(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    _playRequestId: 3,
    _autoSkipFailureCount: 0,
    playQueue: [{ title: '唯一坏歌', artist: '歌手', src: '' }],
    queueIndex: 0,
    currentTrackIndex: 0,
    currentTrack: { title: '唯一坏歌', artist: '歌手', src: '' },
    appSettings: { smartSource: true },
    played: [],
    toasts: [],
    setPlayIcons(value) {
      sandbox.playIconState = value;
    },
    showToast(message) {
      sandbox.toasts.push(message);
    },
    async ensureLibraryTracks() {
      return [
        { title: '曲库第一首', artist: '歌手', src: 'library.mp3' }
      ];
    },
    setQueue(tracks, index) {
      sandbox.playQueue = tracks.slice();
      sandbox.queueIndex = index;
      sandbox.currentTrackIndex = index;
    },
    setCurrentTrack(track) {
      sandbox.currentTrack = track;
      sandbox.played.push(track.title);
    },
    async playCurrentTrack() {}
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'resetAutoSkipFailureCount'),
    pickFunction(script, 'isSmartSourceEnabled'),
    pickFunction(script, 'playTrackAt'),
    pickFunction(script, 'autoPlayNextAfterFailure'),
    pickFunction(script, 'handleNoPlayableSource')
  ].join('\n'), sandbox);

  const skipped = await sandbox.handleNoPlayableSource('resolve-empty', 3);
  if (skipped || sandbox.played.length) {
    throw new Error(file + ' should not loop a single-song active queue after source failure');
  }
  if (!sandbox.toasts.includes('没有找到可用免费音源')) {
    throw new Error(file + ' should keep the no-source message when there is no next queue item');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await verifyAutoNext(file);
    await verifySingleQueueDoesNotLoop(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
