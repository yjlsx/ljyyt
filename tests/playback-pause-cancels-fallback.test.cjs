const fs = require('fs');
const vm = require('vm');

function getInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(file + ' is missing inline application script');
  return match[1];
}

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

async function verifyPauseCancelsPendingAutoNext(file) {
  const script = getInlineScript(file);
  const sandbox = {
    _playRequestId: 12,
    _autoSkipFailureCount: 0,
    _playRetryCount: 1,
    _isResolvingUrl: true,
    _proxyPlaybackAttemptLifecycle: { active: true },
    MAX_CONSECUTIVE_AUTO_SKIPS: 2,
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
    resolvingStates: [],
    audioPlayer: {
      pauseCalls: 0,
      pause() {
        this.pauseCalls += 1;
      }
    },
    setPlayIcons(value) {
      sandbox.playIconState = value;
    },
    setResolvingUrlState(value) {
      sandbox._isResolvingUrl = value;
      sandbox.resolvingStates.push(value);
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
    pickFunction(script, 'cancelPendingPlaybackWork'),
    pickFunction(script, 'isSmartSourceEnabled'),
    pickFunction(script, 'playTrackAt'),
    pickFunction(script, 'autoPlayNextAfterFailure'),
    pickFunction(script, 'handleNoPlayableSource'),
    pickFunction(script, 'pauseCurrentTrack')
  ].join('\n'), sandbox);

  const staleRequestId = sandbox._playRequestId;
  sandbox.pauseCurrentTrack();
  const skipped = await sandbox.handleNoPlayableSource('resolve-empty', staleRequestId);

  if (skipped || sandbox.played.length) {
    throw new Error(file + ' should not auto-skip after the user pauses a pending fallback');
  }
  if (sandbox._playRequestId === staleRequestId) {
    throw new Error(file + ' pauseCurrentTrack should invalidate pending playback requests');
  }
  if (sandbox._isResolvingUrl || !sandbox.resolvingStates.includes(false)) {
    throw new Error(file + ' pauseCurrentTrack should clear resolving/buffering state');
  }
  if (sandbox._proxyPlaybackAttemptLifecycle && sandbox._proxyPlaybackAttemptLifecycle.active) {
    throw new Error(file + ' pauseCurrentTrack should cancel active proxy fallback attempts');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await verifyPauseCancelsPendingAutoNext(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
