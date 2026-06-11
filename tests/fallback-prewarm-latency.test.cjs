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
    Math,
    Set,
    DEFAULT_COVER: 'cover.jpg',
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
    pickFunction(script, 'consumeFallbackPrewarm'),
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
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
