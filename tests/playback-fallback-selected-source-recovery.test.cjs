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

async function verifyFallbackStateKeepsOriginalFailures(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const failedUrl = 'https://cdn.example.test/failed-kuwo.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    Math,
    Set,
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    currentTrack: {
      title: '香港别来无恙',
      artist: '王某某',
      source: 'kuwo',
      sourceLabel: '酷我',
      urlId: 'kuwo-1',
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
    _playRequestId: 7,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 6500,
    _fallbackPrewarmState: { key: '', promise: null, result: null },
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
        urlId: track.urlId,
        skipSources: options.skipSources.slice(),
        skipUrls: options.skipUrls.slice()
      });
      if (sandbox.recoverCalls.length === 1) {
        Object.assign(track, {
          source: 'joox',
          sourceLabel: 'Joox',
          urlId: 'joox-1',
          src: 'https://cdn.example.test/failed-joox.mp3'
        });
        return track.src;
      }
      return '';
    },
    playAudioWithTimeout() {
      throw new Error('candidate did not start');
    },
    confirmPlaybackStarted() {
      return Promise.resolve(false);
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

  await sandbox.switchToFallbackSource('audio-error', 7, failedUrl);

  if (sandbox.recoverCalls.length < 2) {
    throw new Error(file + ' should retry with the next selected fallback source after a bad candidate fails playback');
  }
  const secondSkipSources = sandbox.recoverCalls[1].skipSources;
  if (!secondSkipSources.includes('kuwo') || !secondSkipSources.includes('joox')) {
    throw new Error(file + ' lost failed-source history after switching candidates; got ' + secondSkipSources.join(','));
  }
}

async function verifyFallbackStateSurvivesCandidateMetadataChanges(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const failedUrl = 'https://cdn.example.test/failed-netease.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    Math,
    Set,
    _fallbackAttemptState: { key: '', sources: [], urls: [] },
    currentTrack: {
      title: '孤勇者',
      artist: '陈奕迅',
      source: 'netease',
      sourceLabel: '网易云',
      urlId: 'ne-1',
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
    _playRequestId: 19,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    FALLBACK_PLAYBACK_TIMEOUT_MS: 4200,
    _fallbackPrewarmState: { key: '', promise: null, result: null },
    recoverCalls: [],
    isSmartSourceEnabled() {
      return true;
    },
    tryProxyPlaybackLine() {
      return Promise.resolve(false);
    },
    inferTrackSourceCandidates() {
      return ['netease', 'qq', 'joox'];
    },
    setPlayIcons() {},
    showToast() {},
    async recoverPlayableTrackUrl(track, options) {
      sandbox.recoverCalls.push({
        title: track.title,
        artist: track.artist,
        skipSources: options.skipSources.slice(),
        skipUrls: options.skipUrls.slice()
      });
      if (sandbox.recoverCalls.length === 1) {
        Object.assign(track, {
          title: '孤勇者 - Live',
          artist: '陈奕迅 / 群星',
          source: 'qq',
          sourceLabel: 'QQ音乐',
          urlId: 'qq-1',
          src: 'https://cdn.example.test/bad-qq-preview.mp3'
        });
        return track.src;
      }
      return '';
    },
    playAudioWithTimeout() {
      throw new Error('candidate did not start');
    },
    confirmPlaybackStarted() {
      return Promise.resolve(false);
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

  await sandbox.switchToFallbackSource('audio-error', 19, failedUrl);

  if (sandbox.recoverCalls.length < 2) {
    throw new Error(file + ' should retry after a matched candidate changes track metadata');
  }
  const secondSkipSources = sandbox.recoverCalls[1].skipSources;
  if (!secondSkipSources.includes('netease') || !secondSkipSources.includes('qq')) {
    throw new Error(file + ' reset fallback failures after candidate metadata changed; got ' + secondSkipSources.join(','));
  }
}

async function verifyConcurrentSelectedSourceRecovery(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    gdMusicApiBase: '/api/gd-music',
    gdMusicFallbackBases: [],
    _isLocalDev: true,
    AbortController,
    DOMException,
    setTimeout,
    clearTimeout,
    aggregatedSources: ['local', 'joox', 'netease', 'kuwo'],
    safeCover(value) {
      return value || 'cover.jpg';
    },
    getSourceLabel(source) {
      return { joox: 'Joox', netease: '网易', kuwo: '酷我' }[source] || source;
    },
    async fetch(url) {
      const parsed = new URL(url, 'https://example.test');
      const source = parsed.searchParams.get('source');
      const page = parsed.searchParams.get('pages');
      if (source === 'joox') {
        await new Promise((resolve) => setTimeout(resolve, 90));
        return { ok: true, async json() { return []; } };
      }
      if (source === 'netease' && page === '1') {
        return {
          ok: true,
          async json() {
            return [{
              id: 'netease-hk',
              name: '香港别来无恙',
              artist: ['王某某'],
              source: 'netease',
              url_id: 'netease-hk'
            }];
          }
        };
      }
      return { ok: true, async json() { return []; } };
    },
    async resolveExternalTrackUrl(track) {
      return track && track.urlId === 'netease-hk' ? 'https://cdn.example.test/netease-hk.mp3' : '';
    }
  };

  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getSelectedPlaybackSources'),
    pickFunction(script, 'getFallbackSearchSources'),
    pickFunction(script, 'inferTrackSourceCandidates'),
    pickFunction(script, 'isTrackMatchCandidate'),
    pickFunction(script, 'isLooseTitleMatchCandidate'),
    pickFunction(script, 'getNormalizedArtistTokens'),
    pickFunction(script, 'getFallbackMatchScore'),
    pickFunction(script, 'pickFallbackTrackMatch'),
    pickFunction(script, 'getFallbackTrackMatches'),
    pickFunction(script, 'resolveFallbackTrackFromSource'),
    pickFunction(script, 'normalizeExternalTrack'),
    pickFunction(script, 'fetchGdMusicJson'),
    pickFunction(script, 'searchGdMusicSourceTracks'),
    pickFunction(script, 'fetchExternalSourceTracks'),
    pickFunction(script, 'recoverPlayableTrackUrl')
  ].join('\n'), sandbox);

  const track = {
    title: '香港别来无恙',
    artist: '王某某',
    source: 'kuwo',
    sourceLabel: '酷我',
    src: 'https://cdn.example.test/failed-kuwo.mp3'
  };
  const timeout = new Promise((resolve) => setTimeout(() => resolve('__timeout__'), 60));
  const recovered = await Promise.race([
    sandbox.recoverPlayableTrackUrl(track, {
      skipSources: ['kuwo'],
      skipUrls: ['https://cdn.example.test/failed-kuwo.mp3']
    }),
    timeout
  ]);

  if (recovered === '__timeout__') {
    throw new Error(file + ' waited on a slow selected source instead of using another source that already found the song');
  }
  if (recovered !== 'https://cdn.example.test/netease-hk.mp3' || track.source !== 'netease') {
    throw new Error(file + ' should recover from the first selected source with a resolvable URL');
  }
}

function verifyFallbackTimeoutIsResponsive(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/const FALLBACK_PLAYBACK_TIMEOUT_MS = (\d+);/);
  if (!match) throw new Error(file + ' is missing fallback playback timeout');
  const timeoutMs = Number(match[1]);
  if (timeoutMs > 4500) {
    throw new Error(file + ' waits too long before trying the next free source: ' + timeoutMs + 'ms');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    verifyFallbackTimeoutIsResponsive(file);
    await verifyFallbackStateKeepsOriginalFailures(file);
    await verifyFallbackStateSurvivesCandidateMetadataChanges(file);
    await verifyConcurrentSelectedSourceRecovery(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
