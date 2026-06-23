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
  for (let end = start; end < script.length; end += 1) {
    const char = script[end];
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
      if (opened && depth === 0) return script.slice(start, end + 1);
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

async function verifyProxyWinsBeforeAutoMatch(file) {
  const script = getInlineScript(file);
  const failedUrl = 'https://cdn.example.test/stale-qq.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    currentTrack: {
      title: '晴天',
      artist: '周杰伦',
      source: 'qq',
      sourceLabel: 'QQ音乐',
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
    _playRequestId: 9,
    _isResolvingUrl: false,
    _playRetryCount: 0,
    restoredPlaybackTime: 0,
    recoverCalls: 0,
    tryProxyCalls: 0,
    isSmartSourceEnabled() {
      return true;
    },
    getTrackFallbackKey() {
      return '晴天|周杰伦';
    },
    rememberPlaybackFailure() {},
    ensureFallbackState() {
      return { sources: ['qq'], urls: [failedUrl] };
    },
    waitForFallbackPrewarmResult() {
      return Promise.resolve(null);
    },
    consumeFallbackPrewarm() {
      return Promise.resolve(null);
    },
    inferTrackSourceCandidates() {
      return ['qq', 'joox', 'netease'];
    },
    setPlayIcons() {},
    async recoverPlayableTrackUrl() {
      sandbox.recoverCalls += 1;
      return 'https://cdn.example.test/joox-qingtian.mp3';
    },
    async tryProxyPlaybackLine(url, requestId) {
      sandbox.tryProxyCalls += 1;
      if (url !== failedUrl || requestId !== 9) {
        throw new Error('proxy fallback should receive the failed src and request id');
      }
      return true;
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
    isAutoplayPolicyBlocked() {
      return false;
    },
    showToast() {}
  };

  vm.createContext(sandbox);
  vm.runInContext(pickFunction(script, 'switchToFallbackSource'), sandbox);

  const switched = await sandbox.switchToFallbackSource('audio-error', 9, failedUrl);
  if (!switched) {
    throw new Error(file + ' should accept a successful proxy fallback before auto match');
  }
  if (sandbox.tryProxyCalls !== 1) {
    throw new Error(file + ' should attempt proxy fallback first');
  }
  if (sandbox.recoverCalls !== 0) {
    throw new Error(file + ' should not auto match when proxy fallback already succeeded');
  }
}

async function verifyEnsurePlayableDoesNotAutoMatch(file) {
  const script = getInlineScript(file);
  const sandbox = {
    DEFAULT_COVER: 'cover.jpg',
    console: { warn() {}, log() {}, error() {} },
    recoverCalls: 0,
    async ensureLibraryTracks() {
      return [];
    },
    findLibraryTrackMatch() {
      return null;
    },
    async resolveExternalTrackUrl() {
      return '';
    },
    async recoverPlayableTrackUrl() {
      sandbox.recoverCalls += 1;
      return 'https://cdn.example.test/should-not-run.mp3';
    },
    isSmartSourceEnabled() {
      return true;
    },
    isDeprecatedKuwoAudioUrl() {
      return false;
    },
    isSameTrack() {
      return false;
    },
    currentTrack: null
  };

  vm.createContext(sandbox);
  vm.runInContext(pickFunction(script, 'ensurePlayableTrackUrl'), sandbox);

  const track = {
    title: '没有地址',
    artist: '测试歌手',
    source: 'netease',
    sourceLabel: '网易云音乐',
    src: '',
    urlId: 'empty-id'
  };
  const url = await sandbox.ensurePlayableTrackUrl(track);
  if (url) {
    throw new Error(file + ' should leave cross-source fallback to the outer playback error flow');
  }
  if (sandbox.recoverCalls !== 0) {
    throw new Error(file + ' should not auto match inside ensurePlayableTrackUrl');
  }
}

async function verifyAutoMatchRespectsSourceOrder(file) {
  const script = getInlineScript(file);
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
      return { joox: 'Joox', netease: '网易云音乐', kuwo: '酷我音乐' }[source] || source;
    },
    async fetch(url) {
      const parsed = new URL(url, 'https://example.test');
      const source = parsed.searchParams.get('source');
      if (source === 'joox') {
        await new Promise((resolve) => setTimeout(resolve, 40));
        return {
          ok: true,
          async json() {
            return [{
              id: 'joox-best',
              name: '晴天',
              artist: ['周杰伦'],
              source: 'joox',
              url_id: 'joox-best'
            }];
          }
        };
      }
      if (source === 'netease') {
        return {
          ok: true,
          async json() {
            return [{
              id: 'netease-fast',
              name: '晴天',
              artist: ['周杰伦'],
              source: 'netease',
              url_id: 'netease-fast'
            }];
          }
        };
      }
      return { ok: true, async json() { return []; } };
    },
    async resolveExternalTrackUrl(track) {
      if (track && track.urlId === 'joox-best') return 'https://cdn.example.test/joox-best.mp3';
      if (track && track.urlId === 'netease-fast') return 'https://cdn.example.test/netease-fast.mp3';
      return '';
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
    pickFunction(script, 'getTitlePartMarker'),
    pickFunction(script, 'hasConflictingTitlePart'),
    pickFunction(script, 'getNormalizedTitleVariants'),
    pickFunction(script, 'isLooseTitleMatchCandidate'),
    pickFunction(script, 'getNormalizedArtistTokens'),
    pickFunction(script, 'getPrimaryArtistName'),
    pickFunction(script, 'getFallbackSearchQueries'),
    pickFunction(script, 'isUnknownArtistName'),
    pickFunction(script, 'hasArtistMatch'),
    pickFunction(script, 'canRelaxKuwoArtistMatch'),
    pickFunction(script, 'getFallbackMatchScore'),
    pickFunction(script, 'pickFallbackTrackMatch'),
    pickFunction(script, 'getFallbackTrackMatches'),
    pickFunction(script, 'resolvePlayableFallbackCandidate'),
    pickFunction(script, 'resolveFallbackTrackFromSource'),
    pickFunction(script, 'normalizeExternalTrack'),
    pickFunction(script, 'fetchGdMusicJson'),
    pickFunction(script, 'searchGdMusicSourceTracks'),
    pickFunction(script, 'fetchExternalSourceTracks'),
    pickFunction(script, 'recoverPlayableTrackUrl')
  ].join('\n'), sandbox);

  const track = {
    title: '晴天',
    artist: '周杰伦',
    source: 'kuwo',
    sourceLabel: '酷我音乐',
    src: 'https://cdn.example.test/bad-kuwo.mp3'
  };
  const recovered = await sandbox.recoverPlayableTrackUrl(track, {
    skipSources: ['kuwo'],
    skipUrls: ['https://cdn.example.test/bad-kuwo.mp3']
  });

  if (recovered !== 'https://cdn.example.test/joox-best.mp3') {
    throw new Error(file + ' should respect selected source order like otter auto match');
  }
  if (track.source !== 'joox') {
    throw new Error(file + ' should keep the first matching source in configured order');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await verifyProxyWinsBeforeAutoMatch(file);
    await verifyEnsurePlayableDoesNotAutoMatch(file);
    await verifyAutoMatchRespectsSourceOrder(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
