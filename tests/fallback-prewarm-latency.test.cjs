const fs = require('fs');
const vm = require('vm');

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

async function verifyPrewarmedFallback(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const failedUrl = 'https://cdn.example.test/stale-kuwo.mp3';
  const fallbackUrl = 'https://cdn.example.test/joox-ready.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    setTimeout,
    clearTimeout,
    Math,
    Set,
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    _fallbackPrewarmState: { key: '', promise: null, result: null },
    currentTrack: {
      title: '等风来',
      artist: '测试歌手',
      source: 'kuwo',
      sourceLabel: '酷我',
      urlId: 'kuwo-wind',
      src: failedUrl
    },
    audioPlayer: {
      _src: failedUrl,
      readyState: 0,
      duration: 0,
      getAttribute(name) {
        return name === 'src' ? this._src : '';
      },
      removeAttribute(name) {
        if (name === 'src') this._src = '';
      },
      load() {},
      set src(value) {
        this._src = value;
      },
      get src() {
        return this._src;
      }
    },
    _playRequestId: 11,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 4200,
    recoverCalls: [],
    isSmartSourceEnabled() {
      return true;
    },
    tryProxyPlaybackLine() {
      return Promise.resolve(false);
    },
    inferTrackSourceCandidates() {
      return ['kuwo', 'joox', 'netease'];
    },
    setPlayIcons() {},
    showToast() {},
    async recoverPlayableTrackUrl(track, options) {
      sandbox.recoverCalls.push({
        source: track.source,
        skipSources: options.skipSources.slice(),
        skipUrls: options.skipUrls.slice()
      });
      Object.assign(track, {
        source: 'joox',
        sourceLabel: 'Joox',
        urlId: 'joox-ready',
        src: fallbackUrl
      });
      return fallbackUrl;
    },
    playAudioWithTimeout() {
      return Promise.resolve();
    },
    confirmPlaybackStarted() {
      return Promise.resolve(true);
    },
    reconcileCurrentTrackInQueue() {},
    updateTrackUi() {},
    updateLikeButton() {},
    loadLyricsForTrack() {},
    addHistory() {},
    savePlaybackState() {},
    getTrackSourceDisplayName(track) {
      return track.sourceLabel || track.source;
    },
    getSourceLabel(source) {
      return source === 'joox' ? 'Joox' : source;
    },
    isAutoplayPolicyBlocked() {
      return false;
    }
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

  await sandbox.startFallbackPrewarm(sandbox.currentTrack);
  const switched = await sandbox.switchToFallbackSource('play-failed', 11, failedUrl);

  if (!switched) {
    throw new Error(file + ' should switch to a prewarmed fallback source');
  }
  if (sandbox.recoverCalls.length !== 1) {
    throw new Error(file + ' should reuse the prewarmed result instead of searching again');
  }
  if (sandbox.currentTrack.source !== 'joox' || sandbox.audioPlayer.getAttribute('src') !== fallbackUrl) {
    throw new Error(file + ' did not apply the prewarmed fallback track');
  }
}

async function verifyPendingPrewarmBeatsProxyRetry(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const failedUrl = 'https://cdn.example.test/stale-qq.mp3';
  const fallbackUrl = 'https://cdn.example.test/lx-ready.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    setTimeout,
    clearTimeout,
    Math,
    Set,
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    PREWARM_FAST_SWITCH_GRACE_MS: 50,
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    _fallbackPrewarmState: { key: '', promise: null, result: null },
    currentTrack: {
      title: '很快切换',
      artist: '测试歌手',
      source: 'qq',
      sourceLabel: 'QQ音乐',
      urlId: 'qq-stale',
      src: failedUrl
    },
    audioPlayer: {
      _src: failedUrl,
      readyState: 0,
      duration: 0,
      getAttribute(name) {
        return name === 'src' ? this._src : '';
      },
      removeAttribute(name) {
        if (name === 'src') this._src = '';
      },
      load() {},
      set src(value) {
        this._src = value;
      },
      get src() {
        return this._src;
      }
    },
    _playRequestId: 21,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 4200,
    proxyCalls: 0,
    isSmartSourceEnabled() {
      return true;
    },
    tryProxyPlaybackLine() {
      sandbox.proxyCalls += 1;
      return Promise.resolve(false);
    },
    inferTrackSourceCandidates() {
      return ['qq', 'lx_qq', 'kuwo'];
    },
    setPlayIcons() {},
    showToast() {},
    async recoverPlayableTrackUrl(track) {
      await new Promise((resolve) => setTimeout(resolve, 5));
      Object.assign(track, {
        source: 'lx_qq',
        sourceLabel: '小秋音乐',
        urlId: 'lx-ready',
        src: fallbackUrl
      });
      return fallbackUrl;
    },
    playAudioWithTimeout() {
      return Promise.resolve();
    },
    confirmPlaybackStarted() {
      return Promise.resolve(true);
    },
    reconcileCurrentTrackInQueue() {},
    updateTrackUi() {},
    updateLikeButton() {},
    loadLyricsForTrack() {},
    addHistory() {},
    savePlaybackState() {},
    getTrackSourceDisplayName(track) {
      return track.sourceLabel || track.source;
    },
    getSourceLabel(source) {
      return source === 'lx_qq' ? '小秋音乐' : source;
    },
    isAutoplayPolicyBlocked() {
      return false;
    }
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

  sandbox.startFallbackPrewarm(sandbox.currentTrack);
  const switched = await sandbox.switchToFallbackSource('play-failed', 21, failedUrl);

  if (!switched) {
    throw new Error(file + ' should switch when pending prewarm resolves quickly');
  }
  if (sandbox.proxyCalls !== 0) {
    throw new Error(file + ' should not retry the failed URL through proxy before a ready prewarm result');
  }
  if (sandbox.currentTrack.source !== 'lx_qq' || sandbox.audioPlayer.getAttribute('src') !== fallbackUrl) {
    throw new Error(file + ' did not apply the pending prewarm fallback track');
  }
}

async function verifySlowPrewarmDoesNotBlockDirectRecovery(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const failedUrl = 'https://cdn.example.test/stale-netease.mp3';
  const fallbackUrl = 'https://cdn.example.test/kuwo-ready.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    setTimeout,
    clearTimeout,
    Math,
    Set,
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    PREWARM_FAST_SWITCH_GRACE_MS: 10,
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    _fallbackPrewarmState: { key: '', promise: null, result: null },
    currentTrack: {
      title: '别等慢接口',
      artist: '测试歌手',
      source: 'netease',
      sourceLabel: '网易云音乐',
      urlId: 'netease-stale',
      src: failedUrl
    },
    audioPlayer: {
      _src: failedUrl,
      readyState: 0,
      duration: 0,
      getAttribute(name) {
        return name === 'src' ? this._src : '';
      },
      removeAttribute(name) {
        if (name === 'src') this._src = '';
      },
      load() {},
      set src(value) {
        this._src = value;
      },
      get src() {
        return this._src;
      }
    },
    _playRequestId: 31,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 4200,
    recoverCalls: 0,
    isSmartSourceEnabled() {
      return true;
    },
    tryProxyPlaybackLine() {
      return Promise.resolve(false);
    },
    inferTrackSourceCandidates() {
      return ['netease', 'kuwo', 'joox'];
    },
    setPlayIcons() {},
    showToast() {},
    recoverPlayableTrackUrl(track) {
      sandbox.recoverCalls += 1;
      if (sandbox.recoverCalls === 1) return new Promise(() => {});
      Object.assign(track, {
        source: 'kuwo',
        sourceLabel: '酷我音乐',
        urlId: 'kuwo-ready',
        src: fallbackUrl
      });
      return Promise.resolve(fallbackUrl);
    },
    playAudioWithTimeout() {
      return Promise.resolve();
    },
    confirmPlaybackStarted() {
      return Promise.resolve(true);
    },
    reconcileCurrentTrackInQueue() {},
    updateTrackUi() {},
    updateLikeButton() {},
    loadLyricsForTrack() {},
    addHistory() {},
    savePlaybackState() {},
    getTrackSourceDisplayName(track) {
      return track.sourceLabel || track.source;
    },
    getSourceLabel(source) {
      return source === 'kuwo' ? '酷我音乐' : source;
    },
    isAutoplayPolicyBlocked() {
      return false;
    }
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

  sandbox.startFallbackPrewarm(sandbox.currentTrack);
  const switched = await Promise.race([
    sandbox.switchToFallbackSource('play-failed', 31, failedUrl),
    new Promise((resolve) => setTimeout(() => resolve('blocked'), 80))
  ]);

  if (switched === 'blocked') {
    throw new Error(file + ' should not wait indefinitely for a slow fallback prewarm request');
  }
  if (!switched) {
    throw new Error(file + ' should recover through a fresh source search after slow prewarm grace expires');
  }
  if (sandbox.currentTrack.source !== 'kuwo' || sandbox.audioPlayer.getAttribute('src') !== fallbackUrl) {
    throw new Error(file + ' did not apply the fresh fallback track after slow prewarm timed out');
  }
}

async function verifyPrewarmCanBeatSlowPrimaryResolve(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const fallbackUrl = 'https://cdn.example.test/joox-resolve-ready.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    setTimeout,
    clearTimeout,
    Promise,
    Math,
    Set,
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    PRIMARY_RESOLVE_PREWARM_GRACE_MS: 20,
    PRIMARY_PLAYBACK_TIMEOUT_MS: 3200,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 4200,
    PROXY_LINE_PLAYBACK_TIMEOUT_MS: 2500,
    PRIMARY_PREWARM_FALLBACK_GRACE_MS: 900,
    PREWARM_FAST_SWITCH_GRACE_MS: 10,
    SILENT_AUDIO_DATA_URI: 'data:audio/wav;base64,test',
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    _fallbackPrewarmState: { key: '', promise: null, result: null },
    _playRequestId: 0,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    _audioUnlocked: true,
    currentTrack: {
      title: '解析别卡住',
      artist: '测试歌手',
      source: 'netease',
      sourceLabel: '网易云音乐',
      urlId: 'netease-slow',
      src: ''
    },
    audioPlayer: {
      _src: '',
      readyState: 0,
      duration: 240,
      paused: false,
      error: null,
      getAttribute(name) { return name === 'src' ? this._src : ''; },
      removeAttribute(name) { if (name === 'src') this._src = ''; },
      load() {},
      play() { this.paused = false; return Promise.resolve(); },
      pause() { this.paused = true; },
      addEventListener() {},
      removeEventListener() {},
      set src(value) { this._src = value; },
      get src() { return this._src; }
    },
    restoredPlaybackTime: 0,
    appSettings: { smartSource: true },
    pausePreviewVideo() {},
    setCurrentTrack(track) { sandbox.currentTrack = track; },
    unlockAudioContext() {},
    isDeprecatedKuwoAudioUrl() { return false; },
    isSilentAudioPrimerSrc() { return false; },
    setPlayIcons() {},
    showToast() {},
    reconcileCurrentTrackInQueue() {},
    updateTrackUi() {},
    updateLikeButton() {},
    loadLyricsForTrack() {},
    addHistory() {},
    savePlaybackState() {},
    getTrackSourceDisplayName(track) { return track.sourceLabel || track.source; },
    getSourceLabel(source) { return source === 'joox' ? 'Joox' : source; },
    inferTrackSourceCandidates() { return ['netease', 'joox']; },
    tryProxyPlaybackLine() { return Promise.resolve(false); },
    playAudioWithTimeout() { return Promise.resolve(); },
    confirmPlaybackStarted() { return Promise.resolve(true); },
    isAutoplayPolicyBlocked() { return false; },
    ensurePlayableTrackUrl() { return new Promise(() => {}); },
    recoverPlayableTrackUrl(track) {
      return new Promise((resolve) => setTimeout(() => {
        Object.assign(track, {
          source: 'joox',
          sourceLabel: 'Joox',
          urlId: 'joox-ready',
          src: fallbackUrl
        });
        resolve(fallbackUrl);
      }, 5));
    }
  };

  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getTrackFallbackKey'),
    pickFunction(script, 'ensureFallbackState'),
    pickFunction(script, 'resetFallbackState'),
    pickFunction(script, 'isSmartSourceEnabled'),
    pickFunction(script, 'normalizeAudioUrl'),
    pickFunction(script, 'rememberPlaybackFailure'),
    pickFunction(script, 'cloneTrackForFallback'),
    pickFunction(script, 'startFallbackPrewarm'),
    pickFunction(script, 'isUsableFallbackPrewarmResult'),
    pickFunction(script, 'consumeFallbackPrewarm'),
    pickFunction(script, 'waitForFallbackPrewarmResult'),
    pickFunction(script, 'applyFallbackRecovery'),
    pickFunction(script, 'switchToFallbackSource'),
    pickFunction(script, 'isPrewarmFallbackReadySignal'),
    pickFunction(script, 'waitForPrewarmFallbackDuringPrimary'),
    pickFunction(script, 'playCurrentTrack')
  ].join('\n'), sandbox);

  const result = await Promise.race([
    sandbox.playCurrentTrack().then(() => 'played'),
    new Promise((resolve) => setTimeout(() => resolve('blocked'), 80))
  ]);

  if (result === 'blocked') {
    throw new Error(file + ' should let prewarmed fallback beat a slow primary URL resolution');
  }
  if (sandbox.currentTrack.source !== 'joox' || sandbox.audioPlayer.getAttribute('src') !== fallbackUrl) {
    throw new Error(file + ' did not switch to the prewarmed fallback during primary URL resolution');
  }
}

async function verifyFallbackSearchDoesNotWaitForSlowProxyRetry(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const failedUrl = 'https://cdn.example.test/stale-direct.mp3';
  const fallbackUrl = 'https://cdn.example.test/joox-direct-ready.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    setTimeout,
    clearTimeout,
    Math,
    Set,
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    appSettings: { smartSource: true },
    PREWARM_FAST_SWITCH_GRACE_MS: 0,
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    _fallbackPrewarmState: { key: '', promise: null, result: null },
    currentTrack: {
      title: '别等代理',
      artist: '测试歌手',
      source: 'kuwo',
      sourceLabel: '酷我音乐',
      urlId: 'kuwo-stale',
      src: failedUrl
    },
    audioPlayer: {
      _src: failedUrl,
      readyState: 0,
      duration: 0,
      getAttribute(name) { return name === 'src' ? this._src : ''; },
      removeAttribute(name) { if (name === 'src') this._src = ''; },
      load() {},
      set src(value) { this._src = value; },
      get src() { return this._src; }
    },
    _playRequestId: 41,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 4200,
    proxyCalls: 0,
    recoverCalls: 0,
    isSmartSourceEnabled() { return true; },
    tryProxyPlaybackLine() {
      sandbox.proxyCalls += 1;
      return new Promise(() => {});
    },
    inferTrackSourceCandidates() { return ['kuwo', 'joox']; },
    setPlayIcons() {},
    showToast() {},
    recoverPlayableTrackUrl(track) {
      sandbox.recoverCalls += 1;
      Object.assign(track, {
        source: 'joox',
        sourceLabel: 'Joox',
        urlId: 'joox-direct-ready',
        src: fallbackUrl
      });
      return Promise.resolve(fallbackUrl);
    },
    playAudioWithTimeout() { return Promise.resolve(); },
    confirmPlaybackStarted() { return Promise.resolve(true); },
    reconcileCurrentTrackInQueue() {},
    updateTrackUi() {},
    updateLikeButton() {},
    loadLyricsForTrack() {},
    addHistory() {},
    savePlaybackState() {},
    getTrackSourceDisplayName(track) { return track.sourceLabel || track.source; },
    getSourceLabel(source) { return source === 'joox' ? 'Joox' : source; },
    isAutoplayPolicyBlocked() { return false; }
  };

  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getTrackFallbackKey'),
    pickFunction(script, 'ensureFallbackState'),
    pickFunction(script, 'resetFallbackState'),
    pickFunction(script, 'isSmartSourceEnabled'),
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

  const switched = await Promise.race([
    sandbox.switchToFallbackSource('play-failed', 41, failedUrl),
    new Promise((resolve) => setTimeout(() => resolve('blocked'), 80))
  ]);

  if (switched === 'blocked') {
    throw new Error(file + ' should search fallback sources without waiting for slow proxy retry');
  }
  if (!switched || sandbox.currentTrack.source !== 'joox' || sandbox.audioPlayer.getAttribute('src') !== fallbackUrl) {
    throw new Error(file + ' should switch to a searched fallback while proxy retry is still pending');
  }
}

async function verifyPendingPrewarmPreventsPrematureNoSource(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const failedUrl = 'https://cdn.example.test/stale-kuwo-prompt.mp3';
  const fallbackUrl = 'https://cdn.example.test/netease-late-ready.mp3';
  let prewarmStarted = false;
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    setTimeout,
    clearTimeout,
    Math,
    Set,
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    appSettings: { smartSource: true },
    PREWARM_FAST_SWITCH_GRACE_MS: 10,
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    _fallbackPrewarmState: { key: '', promise: null, result: null },
    currentTrack: {
      title: '回头就能播',
      artist: '测试歌手',
      source: 'kuwo',
      sourceLabel: '酷我音乐',
      urlId: 'kuwo-stale',
      src: failedUrl
    },
    audioPlayer: {
      _src: failedUrl,
      readyState: 0,
      duration: 0,
      getAttribute(name) { return name === 'src' ? this._src : ''; },
      removeAttribute(name) { if (name === 'src') this._src = ''; },
      load() {},
      set src(value) { this._src = value; },
      get src() { return this._src; }
    },
    _playRequestId: 51,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 4200,
    recoverCalls: 0,
    isSmartSourceEnabled() { return true; },
    tryProxyPlaybackLine() { return Promise.resolve(false); },
    inferTrackSourceCandidates() { return ['kuwo', 'netease']; },
    setPlayIcons() {},
    showToast() {},
    recoverPlayableTrackUrl(track) {
      sandbox.recoverCalls += 1;
      if (!prewarmStarted) {
        prewarmStarted = true;
        return new Promise((resolve) => setTimeout(() => {
          Object.assign(track, {
            source: 'netease',
            sourceLabel: '网易云音乐',
            urlId: 'netease-late-ready',
            src: fallbackUrl
          });
          resolve(fallbackUrl);
        }, 120));
      }
      return Promise.resolve('');
    },
    playAudioWithTimeout() { return Promise.resolve(); },
    confirmPlaybackStarted() { return Promise.resolve(true); },
    reconcileCurrentTrackInQueue() {},
    updateTrackUi() {},
    updateLikeButton() {},
    loadLyricsForTrack() {},
    addHistory() {},
    savePlaybackState() {},
    getTrackSourceDisplayName(track) { return track.sourceLabel || track.source; },
    getSourceLabel(source) { return source === 'netease' ? '网易云音乐' : source; },
    isAutoplayPolicyBlocked() { return false; }
  };

  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getTrackFallbackKey'),
    pickFunction(script, 'ensureFallbackState'),
    pickFunction(script, 'resetFallbackState'),
    pickFunction(script, 'isSmartSourceEnabled'),
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

  sandbox.startFallbackPrewarm(sandbox.currentTrack);
  const switched = await Promise.race([
    sandbox.switchToFallbackSource('play-failed', 51, failedUrl),
    new Promise((resolve) => setTimeout(() => resolve('blocked'), 260))
  ]);

  if (switched === 'blocked') {
    throw new Error(file + ' waited too long for a pending fallback prewarm result');
  }
  if (!switched || sandbox.currentTrack.source !== 'netease' || sandbox.audioPlayer.getAttribute('src') !== fallbackUrl) {
    throw new Error(file + ' returned no source before the pending prewarm result could be reused');
  }
}

async function verifyMissingFallbackDoesNotWaitForLongLatePrewarm(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const failedUrl = 'https://cdn.example.test/stale-kuwo-none.mp3';
  let prewarmStarted = false;
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    setTimeout,
    clearTimeout,
    Math,
    Set,
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    appSettings: { smartSource: true },
    PREWARM_FAST_SWITCH_GRACE_MS: 10,
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    _fallbackPrewarmState: { key: '', promise: null, result: null },
    currentTrack: {
      title: '没有免费源',
      artist: '测试歌手',
      source: 'kuwo',
      sourceLabel: '酷我音乐',
      urlId: 'kuwo-none',
      src: failedUrl
    },
    audioPlayer: {
      _src: failedUrl,
      readyState: 0,
      duration: 0,
      getAttribute(name) { return name === 'src' ? this._src : ''; },
      removeAttribute(name) { if (name === 'src') this._src = ''; },
      load() {},
      set src(value) { this._src = value; },
      get src() { return this._src; }
    },
    _playRequestId: 61,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 4200,
    isSmartSourceEnabled() { return true; },
    tryProxyPlaybackLine() { return Promise.resolve(false); },
    inferTrackSourceCandidates() { return ['kuwo', 'netease']; },
    setPlayIcons() {},
    showToast() {},
    recoverPlayableTrackUrl() {
      if (!prewarmStarted) {
        prewarmStarted = true;
        return new Promise((resolve) => setTimeout(() => resolve(''), 900));
      }
      return Promise.resolve('');
    },
    playAudioWithTimeout() { return Promise.resolve(); },
    confirmPlaybackStarted() { return Promise.resolve(true); },
    reconcileCurrentTrackInQueue() {},
    updateTrackUi() {},
    updateLikeButton() {},
    loadLyricsForTrack() {},
    addHistory() {},
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
    pickFunction(script, 'isSmartSourceEnabled'),
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

  sandbox.startFallbackPrewarm(sandbox.currentTrack);
  const switched = await Promise.race([
    sandbox.switchToFallbackSource('play-failed', 61, failedUrl),
    new Promise((resolve) => setTimeout(() => resolve('blocked'), 450))
  ]);

  if (switched === 'blocked') {
    throw new Error(file + ' should not spend a long extra wait when no fallback source is ready');
  }
  if (switched !== false) {
    throw new Error(file + ' should return false when neither search nor short prewarm race finds a source');
  }
}

function verifyPlaybackStartsPrewarm(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const body = pickFunction(script, 'playCurrentTrack');
  if (!body.includes('startFallbackPrewarm(currentTrack)')) {
    throw new Error(file + ' should start fallback prewarming as soon as playback starts');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    verifyPlaybackStartsPrewarm(file);
    await verifyPrewarmedFallback(file);
    await verifyPendingPrewarmBeatsProxyRetry(file);
    await verifySlowPrewarmDoesNotBlockDirectRecovery(file);
    await verifyPrewarmCanBeatSlowPrimaryResolve(file);
    await verifyFallbackSearchDoesNotWaitForSlowProxyRetry(file);
    await verifyPendingPrewarmPreventsPrematureNoSource(file);
    await verifyMissingFallbackDoesNotWaitForLongLatePrewarm(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
