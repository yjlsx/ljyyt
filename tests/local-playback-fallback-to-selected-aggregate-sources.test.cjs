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
  for (let end = start; end < script.length; end += 1) {
    const char = script[end];
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
      if (opened && depth === 0) return script.slice(start, end + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

async function runLocalFallbackCase(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const failedUrl = 'https://cdn.example.test/stale-local.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    currentTrack: {
      title: 'My Soul',
      artist: 'July',
      source: 'local',
      sourceLabel: '丽江曲库',
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
    _playRequestId: 42,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 6500,
    fallbackState: { sources: [], urls: [] },
    recoverCalls: [],
    history: [],
    toasts: [],
    reconciled: false,
    isSmartSourceEnabled() {
      return true;
    },
    tryProxyPlaybackLine() {
      return Promise.resolve(false);
    },
    rememberPlaybackFailure(track, url, source) {
      source = String(source || (track && track.source) || '').trim();
      url = String(url || '').trim();
      if (source && source !== 'local' && !sandbox.fallbackState.sources.includes(source)) sandbox.fallbackState.sources.push(source);
      if (url && !sandbox.fallbackState.urls.includes(url)) sandbox.fallbackState.urls.push(url);
    },
    inferTrackSourceCandidates() {
      return ['joox', 'netease'];
    },
    ensureFallbackState() {
      return sandbox.fallbackState;
    },
    consumeFallbackPrewarm() {
      return Promise.resolve(null);
    },
    applyFallbackRecovery() {
      return '';
    },
    resetFallbackState() {
      sandbox.fallbackState = { sources: [], urls: [] };
    },
    setPlayIcons() {},
    showToast(message) {
      sandbox.toasts.push(message);
    },
    async recoverPlayableTrackUrl(track, options) {
      sandbox.recoverCalls.push({
        skipSources: options.skipSources.slice(),
        skipUrls: options.skipUrls.slice()
      });
      if (!options.skipUrls.includes(failedUrl)) throw new Error('failed URL was not skipped during fallback');
      Object.assign(track, {
        source: 'joox',
        sourceLabel: 'Joox',
        urlId: 'joox-my-soul',
        src: 'https://cdn.example.test/joox-my-soul.mp3'
      });
      return track.src;
    },
    playAudioWithTimeout() {
      return Promise.resolve();
    },
    confirmPlaybackStarted() {
      return Promise.resolve(true);
    },
    reconcileCurrentTrackInQueue() {
      sandbox.reconciled = true;
    },
    updateTrackUi() {},
    updateLikeButton() {},
    loadLyricsForTrack() {},
    addHistory(track) {
      sandbox.history.push(track.source);
    },
    savePlaybackState() {},
    getTrackSourceDisplayName(track) {
      return track.sourceLabel || track.source;
    },
    isAutoplayPolicyBlocked() {
      return false;
    }
  };

  vm.createContext(sandbox);
  vm.runInContext(pickFunction(script, 'switchToFallbackSource'), sandbox);
  const switched = await sandbox.switchToFallbackSource('audio-error', 42, failedUrl);

  if (!switched) {
    throw new Error(file + ' should fallback local playback failures to a selected aggregate source');
  }
  if (sandbox.recoverCalls.length !== 1) {
    throw new Error(file + ' should attempt exactly one selected-source recovery for local failures');
  }
  if (sandbox.currentTrack.source !== 'joox' || sandbox.audioPlayer.getAttribute('src') !== 'https://cdn.example.test/joox-my-soul.mp3') {
    throw new Error(file + ' did not switch the local track to the recovered aggregate source');
  }
  if (!sandbox.reconciled || sandbox.history[0] !== 'joox') {
    throw new Error(file + ' did not run the successful fallback side effects for local failures');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await runLocalFallbackCase(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
