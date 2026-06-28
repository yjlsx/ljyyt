const fs = require('fs');
const vm = require('vm');

function getApplicationScript(file) {
  if (file.endsWith('.js')) return fs.readFileSync(file, 'utf8');
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

function pickConstObject(script, name) {
  const start = script.indexOf('const ' + name + ' = {');
  if (start < 0) throw new Error('Missing const ' + name);
  const end = script.indexOf('\n    };', start);
  if (end < 0) throw new Error('Could not read const ' + name);
  return script.slice(start, end + '\n    };'.length);
}

async function verifyFallbackCandidateCommitsWithoutBlockingConfirmation(file) {
  const script = getApplicationScript(file);
  const failedUrl = 'https://cdn.example.test/kuwo-prompt.mp3';
  const jooxUrl = 'https://cdn.example.test/joox-unreachable.mp3';
  const neteaseUrl = 'https://cdn.example.test/netease-ready.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    Math,
    Set,
    setTimeout,
    clearTimeout,
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    _fallbackPrewarmState: { key: '', promise: null, result: null },
    currentTrack: {
      title: '偏偏喜欢你',
      artist: '陈百强',
      source: 'kuwo',
      sourceLabel: '酷我音乐',
      urlId: 'kuwo-1',
      src: failedUrl
    },
    audioPlayer: {
      _src: failedUrl,
      readyState: 0,
      duration: 0,
      getAttribute(name) { return name === 'src' ? this._src : ''; },
      removeAttribute(name) { if (name === 'src') this._src = ''; },
      load() {},
      play() { return Promise.resolve(); },
      set src(value) { this._src = value; },
      get src() { return this._src; }
    },
    _playRequestId: 88,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 1800,
    recoverCalls: [],
    playAttempts: [],
    confirmCalls: 0,
    toasts: [],
    histories: [],
    isSmartSourceEnabled() { return true; },
    tryProxyPlaybackLine() { return Promise.resolve(false); },
    inferTrackSourceCandidates() { return ['kuwo', 'joox', 'netease']; },
    setPlayIcons() {},
    showToast(message) { sandbox.toasts.push(message); },
    async recoverPlayableTrackUrl(track, options) {
      sandbox.recoverCalls.push({
        skipSources: options.skipSources.slice(),
        skipUrls: options.skipUrls.slice()
      });
      if (sandbox.recoverCalls.length === 1) {
        Object.assign(track, {
          source: 'joox',
          sourceLabel: 'Joox',
          urlId: 'joox-1',
          src: jooxUrl
        });
        return jooxUrl;
      }
      Object.assign(track, {
        source: 'netease',
        sourceLabel: '网易云音乐',
        urlId: 'netease-1',
        src: neteaseUrl
      });
      return neteaseUrl;
    },
    async playAudioWithTimeout() {
      sandbox.playAttempts.push(sandbox.audioPlayer.getAttribute('src'));
      if (sandbox.audioPlayer.getAttribute('src') === jooxUrl) {
        throw new Error('AUDIO_NOT_READY');
      }
    },
    confirmPlaybackStarted() {
      sandbox.confirmCalls += 1;
      return Promise.resolve(sandbox.audioPlayer.getAttribute('src') === neteaseUrl);
    },
    reconcileCurrentTrackInQueue() {},
    updateTrackUi() {},
    updateLikeButton() {},
    loadLyricsForTrack() {},
    addHistory(track) { sandbox.histories.push(track.source); },
    savePlaybackState() {},
    getTrackSourceDisplayName(track) { return track.sourceLabel || track.source; },
    getSourceLabel(source) { return source; },
    isAutoplayPolicyBlocked() { return false; }
  };

  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getTrackFallbackKey'),
    pickFunction(script, 'ensureFallbackState'),
    pickFunction(script, 'resetFallbackState'),
    pickFunction(script, 'normalizeAudioUrl'),
    pickFunction(script, 'rememberPlaybackFailure'),
    pickFunction(script, 'cloneTrackForFallback'),
    pickFunction(script, 'startFallbackPrewarm'),
    pickFunction(script, 'isUsableFallbackPrewarmResult'),
    pickFunction(script, 'consumeFallbackPrewarm'),
    pickFunction(script, 'waitForFallbackPrewarmResult'),
    pickFunction(script, 'applyFallbackRecovery'),
    pickFunction(script, 'switchToFallbackSource')
  ].join('\n'), sandbox);

  const switched = await sandbox.switchToFallbackSource('audio-error', 88, failedUrl);

  if (!switched) {
    throw new Error(file + ' should commit a matched fallback candidate without waiting for trial confirmation');
  }
  if (sandbox.recoverCalls.length !== 1) {
    throw new Error(file + ' should search one matched free source per fallback event');
  }
  if (sandbox.playAttempts.length !== 0 || sandbox.confirmCalls !== 0) {
    throw new Error(file + ' should not block fallback switching on immediate playback confirmation');
  }
  if (sandbox.audioPlayer.getAttribute('src') !== jooxUrl || sandbox.currentTrack.source !== 'joox') {
    throw new Error(file + ' should assign the matched fallback URL to the audio element');
  }
  if (sandbox.toasts.length !== 1 || sandbox.toasts[0] !== '已自动切换至: Joox') {
    throw new Error(file + ' should show the otter-style success toast after committing the fallback source');
  }
  if (sandbox.histories.join(',') !== 'joox') {
    throw new Error(file + ' should record playback history for the committed fallback source');
  }
}

(async () => {
  for (const file of ['index.html', 'js/app.js', 'dist/index.html']) {
    await verifyFallbackCandidateCommitsWithoutBlockingConfirmation(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
