(function() {
  'use strict';

  var heroTitle;
  var heroArtist;
  var heroArtistChip;
  var heroAlbum;
  var heroDuration;
  var heroStatus;
  var heroSummary;
  var heroCover;
  var queueCount;
  var sidePlayingState;
  var sideMode;
  var sideAudioSource;
  var sideAudioCandidates;
  var stagePlayButton;
  var openListButton;
  var locateButton;
  var refreshAudioButton;
  var modeToggleButton;
  var stageModeButton;
  var stagePrevButton;
  var stageNextButton;
  var queueSearchInput;
  var queueSearchClearButton;
  var lyricsSourceLabel;
  var lyricsSearchToggleButton;
  var lyricsResetOverrideButton;
  var lyricsSearchPanel;
  var lyricsSearchTitleInput;
  var lyricsSearchArtistInput;
  var lyricsSearchSubmitButton;
  var lyricsSearchStatus;
  var lyricsSearchResults;
  var audioSourceSearchInput;
  var audioSourceSearchSubmitButton;
  var audioSourceSearchStatus;
  var audioSourceSearchResults;
  var activeView = 'all';
  var queueSearchQuery = '';
  var lyricTimer = null;
  var lyricsAbortController = null;
  var lyricsRequestToken = 0;
  var lyricsSearchAbortController = null;
  var lyricsOverrides = {};
  var importedAudioSources = null;
  var importedAudioSourcesPromise = null;
  var lyricsState = {
    lines: [],
    source: 'placeholder',
    status: 'idle',
    syncedEntries: [],
    activeIndex: -1,
    currentCandidate: null
  };

  function refs() {
    heroTitle = document.getElementById('hero-title');
    heroArtist = document.getElementById('hero-artist');
    heroArtistChip = document.getElementById('hero-artist-chip');
    heroAlbum = document.getElementById('hero-album');
    heroDuration = document.getElementById('hero-duration');
    heroStatus = document.getElementById('hero-status');
    heroSummary = document.getElementById('hero-summary');
    heroCover = document.getElementById('hero-cover');
    queueCount = document.getElementById('queue-count');
    sidePlayingState = document.getElementById('side-playing-state');
    sideMode = document.getElementById('side-mode');
    sideAudioSource = document.getElementById('side-audio-source');
    sideAudioCandidates = document.getElementById('side-audio-candidates');
    stagePlayButton = document.getElementById('stage-play-btn');
    queueSearchInput = document.getElementById('queue-search-input');
    queueSearchClearButton = document.getElementById('queue-search-clear');
    lyricsSourceLabel = document.getElementById('lyrics-source-label');
    lyricsSearchToggleButton = document.getElementById('lyrics-search-toggle');
    lyricsResetOverrideButton = document.getElementById('lyrics-reset-override');
    lyricsSearchPanel = document.getElementById('lyrics-search-panel');
    lyricsSearchTitleInput = document.getElementById('lyrics-search-title');
    lyricsSearchArtistInput = document.getElementById('lyrics-search-artist');
    lyricsSearchSubmitButton = document.getElementById('lyrics-search-submit');
    lyricsSearchStatus = document.getElementById('lyrics-search-status');
    lyricsSearchResults = document.getElementById('lyrics-search-results');
    audioSourceSearchInput = document.getElementById('audio-source-search-input');
    audioSourceSearchSubmitButton = document.getElementById('audio-source-search-submit');
    audioSourceSearchStatus = document.getElementById('audio-source-search-status');
    audioSourceSearchResults = document.getElementById('audio-source-search-results');
  }

  function readLyricsOverrides() {
    try {
      lyricsOverrides = JSON.parse(localStorage.getItem('ljyyt_lyrics_overrides')) || {};
    } catch (error) {
      lyricsOverrides = {};
    }
  }

  function saveLyricsOverrides() {
    localStorage.setItem('ljyyt_lyrics_overrides', JSON.stringify(lyricsOverrides));
  }

  function getCurrentTrack() {
    if (typeof musicData === 'undefined' || typeof currentTrackIndex === 'undefined') return null;
    return musicData[currentTrackIndex] || null;
  }

  function getTrackById(id) {
    if (typeof musicData === 'undefined') return null;
    for (var i = 0; i < musicData.length; i++) {
      if (musicData[i].id === id) return musicData[i];
    }
    return null;
  }

  function getModeLabel(mode) {
    var labels = {
      'order': '顺序播放',
      'repeat-all': '列表循环',
      'repeat-one': '单曲循环',
      'shuffle': '随机播放'
    };
    return labels[mode] || '顺序播放';
  }

  function getModeIcon(mode) {
    var icons = {
      'order': 'fas fa-list-ol',
      'repeat-all': 'fas fa-redo',
      'repeat-one': 'fas fa-redo',
      'shuffle': 'fas fa-random'
    };
    return icons[mode] || 'fas fa-list-ol';
  }

  function updateModeActionButtons(mode) {
    var sideIcon = modeToggleButton && modeToggleButton.querySelector('i');
    var stageIcon = stageModeButton && stageModeButton.querySelector('i');
    var label = getModeLabel(mode);
    var iconClass = getModeIcon(mode);

    if (sideIcon) {
      sideIcon.className = iconClass;
    }
    if (modeToggleButton) {
      modeToggleButton.title = label;
      modeToggleButton.setAttribute('aria-label', '切换播放模式，当前' + label);
    }

    if (stageIcon) {
      stageIcon.className = iconClass;
    }
    if (stageModeButton) {
      stageModeButton.title = label;
      stageModeButton.setAttribute('aria-label', '切换播放模式，当前' + label);
    }
  }

  function getActiveCollection() {
    if (activeView === 'favorites') {
      var favorites = [];
      try {
        favorites = JSON.parse(localStorage.getItem('ljyyt_favorites')) || [];
      } catch (e) {
        favorites = [];
      }
      return (typeof musicData !== 'undefined') ? musicData.filter(function(track) {
        return favorites.indexOf(track.id) !== -1;
      }) : [];
    }

    if (activeView === 'history') {
      var history = [];
      try {
        history = JSON.parse(localStorage.getItem('ljyyt_play_history')) || [];
      } catch (e2) {
        history = [];
      }
      return history.map(function(item) {
        return getTrackById(item.id);
      }).filter(Boolean);
    }

    return typeof musicData !== 'undefined' ? musicData.slice() : [];
  }

  function renderLyrics(track) {
    var container = document.getElementById('lyrics-lines');
    if (!container) return;

    var lines;
    if (!track) {
      lines = [
        '暂无歌词'
      ];
    } else {
      lines = [
        '暂无歌词'
      ];
    }

    container.innerHTML = lines.map(function(line, index) {
      var cls = index === 0 ? 'lyric-line active' : 'lyric-line' + (index > 2 ? ' dim' : '');
      return '<div class="' + cls + '">' + line + '</div>';
    }).join('');
  }

  function getLyricsCacheKey(track) {
    if (!track) return '';
    var override = getLyricsOverride(track) || {};
    var lookup = buildExternalLookupData(track);
    return [
      'ljyyt_lyrics_cache_v4',
      String(track.id || ''),
      normalizeLyricMatchText(override.title || lookup.title || track.title),
      normalizeLyricMatchText(override.artist || lookup.artist || track.artist),
      override.source || '',
      override.providerId || '',
      override.candidateId || ''
    ].join('::');
  }

  function readLyricsCache(track) {
    var key = getLyricsCacheKey(track);
    if (!key) return null;

    try {
      var cached = JSON.parse(localStorage.getItem(key) || 'null');
      if (!cached || !Array.isArray(cached.lines) || !cached.lines.length) return null;
      if (Date.now() - Number(cached.savedAt || 0) > 1000 * 60 * 60 * 24 * 14) return null;
      return cached;
    } catch (error) {
      return null;
    }
  }

  function writeLyricsCache(track, parsed) {
    var key = getLyricsCacheKey(track);
    if (!key || !parsed || !Array.isArray(parsed.lines) || !parsed.lines.length) return;

    try {
      localStorage.setItem(key, JSON.stringify({
        lines: parsed.lines,
        source: parsed.source || 'cache',
        syncedEntries: normalizeSyncedEntries(parsed.syncedEntries),
        currentCandidate: parsed.currentCandidate || null,
        savedAt: Date.now()
      }));
    } catch (error) {}
  }

  function normalizeSyncedEntries(entries) {
    return (Array.isArray(entries) ? entries : [])
      .map(function(entry) {
        if (!entry) return null;
        return {
          time: Number(entry.time),
          text: String(entry.text || '').trim()
        };
      })
      .filter(function(entry) {
        return entry && !isNaN(entry.time) && entry.text && !isMetadataOnlyLine(entry.text);
      })
      .sort(function(a, b) {
        return a.time - b.time;
      });
  }

  function sanitizeTrackText(value) {
    return String(value || '')
      .replace(/\.(mp3|flac|wav|m4a)$/i, '')
      .replace(/&amp;/gi, '&')
      .replace(/_/g, ' ')
      .replace(/[《》"'`]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function buildExternalLookupData(trackOrTitle, artistValue) {
    var rawTitle = '';
    var rawArtist = '';

    if (typeof trackOrTitle === 'object' && trackOrTitle) {
      rawTitle = trackOrTitle.title || '';
      rawArtist = trackOrTitle.artist || '';
    } else {
      rawTitle = trackOrTitle || '';
      rawArtist = artistValue || '';
    }

    var title = sanitizeTrackText(rawTitle);
    var artist = sanitizeTrackText(rawArtist);
    var separators = [' - ', ' — ', ' – ', ' | ', '｜', '_'];

    if (artist && title) {
      var lowerTitle = title.toLowerCase();
      var lowerArtist = artist.toLowerCase();
      if (lowerTitle.indexOf(lowerArtist) === 0) {
        title = title.slice(artist.length).replace(/^(\s*[-—–|｜_:：]+\s*)+/, '').trim() || title;
      }
    }

    if (!artist && title) {
      for (var i = 0; i < separators.length; i++) {
        var separator = separators[i];
        var separatorIndex = title.indexOf(separator);
        if (separatorIndex > 0 && separatorIndex < title.length - separator.length) {
          var left = title.slice(0, separatorIndex).trim();
          var right = title.slice(separatorIndex + separator.length).trim();
          if (left && right) {
            artist = left;
            title = right;
            break;
          }
        }
      }
    }

    return {
      title: title,
      artist: artist
    };
  }

  function renderLyricsLines(lines, syncedEntries) {
    var container = document.getElementById('lyrics-lines');
    if (!container) return;

    var entries = normalizeSyncedEntries(syncedEntries);
    lyricsState.syncedEntries = entries;

    if (entries.length) {
      container.innerHTML = entries.map(function(entry, index) {
        var line = String(entry.text || '').trim();
        var cls = 'lyric-line';
        if (index === lyricsState.activeIndex) cls += ' active';
        else if (lyricsState.activeIndex !== -1 && index < lyricsState.activeIndex) cls += ' dim';
        return '<div class="' + cls + '" data-lyric-index="' + index + '">' + escapeLyricsHtml(line) + '</div>';
      }).join('');
      syncLyricsWithAudio();
      return;
    }

    var safeLines = Array.isArray(lines)
      ? lines.map(function(line) {
          return String(line || '').trim();
        }).filter(Boolean)
      : [];

    if (!safeLines.length) {
      renderLyrics(null);
      return;
    }

    container.innerHTML = safeLines.map(function(line, index) {
      var cls = index === 0 ? 'lyric-line active' : 'lyric-line' + (index > 2 ? ' dim' : '');
      return '<div class="' + cls + '">' + escapeLyricsHtml(line) + '</div>';
    }).join('');
  }

  function escapeLyricsHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getLyricsSourceLabel(source) {
    var labels = {
      'loading': '正在搜索歌词',
      'error': '歌词加载失败',
      'lrclib': '当前来源：LRCLIB',
      'lyricsovh': '当前来源：lyrics.ovh',
      'kugou': '当前来源：酷狗歌词',
      'rangotec': '当前来源：公共 LRC',
      'lrcapi': '当前来源：LrcApi 公共歌词',
      'kuwo': '当前来源：酷我歌词',
      'netease': '当前来源：网易云歌词',
      'qq': '当前来源：QQ 音乐歌词',
      'local-library': '当前来源：本地歌词库',
      'cache': '当前来源：本地缓存',
      'empty': '暂无歌词',
      'placeholder': '当前来源：等待加载'
    };
    return labels[source] || ('当前来源：' + (source || '未知'));
  }

  function updateLyricsSourceLabel(source, syncedEntries) {
    if (!lyricsSourceLabel) return;
    var label = getLyricsSourceLabel(source);
    var hasLyrics = source && ['loading', 'error', 'placeholder', 'empty'].indexOf(source) === -1;
    if (hasLyrics) {
      label += (Array.isArray(syncedEntries) && syncedEntries.length) ? ' · 时间轴' : ' · 纯文本';
    }
    lyricsSourceLabel.textContent = label;
  }

  function getLyricsEndpoint(track) {
    if (!track) return '';

    var customEndpoint = window.LYRICS_API_ENDPOINT || '';
    var lookup = buildExternalLookupData(track);

    if (!customEndpoint) {
      customEndpoint = 'https://lrclib.net/api/get';
    }

    var params = new URLSearchParams();
    if (customEndpoint.indexOf('lrclib.net/api/get') !== -1) {
      params.set('track_name', lookup.title);
      params.set('artist_name', lookup.artist);
    } else {
      params.set('title', lookup.title);
      params.set('artist', lookup.artist);
      if (track.id !== undefined && track.id !== null) params.set('id', String(track.id));
    }
    if (customEndpoint.indexOf('tools.rangotec.com/api/anon/lrc') !== -1) {
      params.set('od', 'desc');
    }

    return customEndpoint + '?' + params.toString();
  }

  function buildDirectLyricsFallbackUrls(track) {
    var lookup = buildExternalLookupData(track);
    var urls = [];

    if (lookup.title && lookup.artist) {
      urls.push(
        'https://lrclib.net/api/get?track_name=' + encodeURIComponent(lookup.title) +
        '&artist_name=' + encodeURIComponent(lookup.artist)
      );
    }

    return urls;
  }

  function getLyricsApiFallbackOrigins() {
    var origins = [];
    var origin = window.location && window.location.origin ? window.location.origin : '';
    var hostname = window.location && window.location.hostname ? window.location.hostname : '';
    var isHttp = /^https?:/i.test(window.location && window.location.protocol ? window.location.protocol : '');

    if (isHttp && origin && origin !== 'null') {
      origins.push(origin);
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') {
      ['http://127.0.0.1:3000', 'http://localhost:3000'].forEach(function(candidate) {
        if (origins.indexOf(candidate) === -1) origins.push(candidate);
      });
    }

    return origins;
  }

  function buildLyricsApiUrl(pathname, params, preferredEndpoint) {
    var directPath = pathname + '?' + params.toString();
    var customEndpoint = preferredEndpoint || '';
    var origins = getLyricsApiFallbackOrigins();
    var candidates = [];

    if (customEndpoint) {
      candidates.push(customEndpoint + '?' + params.toString());
    } else {
      candidates.push(directPath);
      origins.forEach(function(origin) {
        candidates.push(origin + pathname + '?' + params.toString());
      });
    }

    return candidates.filter(function(item, index) {
      return item && candidates.indexOf(item) === index;
    });
  }

  function fetchJsonWithTimeout(url, options, timeoutMs) {
    options = options || {};
    timeoutMs = timeoutMs || 12000;

    if (typeof AbortController === 'undefined') {
      return fetch(url, options);
    }

    var controller = new AbortController();
    var timeoutId = setTimeout(function() {
      controller.abort();
    }, timeoutMs);
    var originalSignal = options.signal;

    if (originalSignal) {
      if (originalSignal.aborted) controller.abort();
      else originalSignal.addEventListener('abort', function() {
        controller.abort();
      }, { once: true });
    }

    var requestOptions = {};
    Object.keys(options).forEach(function(key) {
      if (key !== 'signal') requestOptions[key] = options[key];
    });
    requestOptions.signal = controller.signal;

    return fetch(url, requestOptions).finally(function() {
      clearTimeout(timeoutId);
    });
  }

  function fetchJsonFromCandidates(urls, options, timeoutMs) {
    var list = Array.isArray(urls) ? urls.filter(Boolean) : [urls];
    if (!list.length) return Promise.reject(new Error('No request url'));

    var lastError = null;

    function attempt(index) {
      if (index >= list.length) {
        return Promise.reject(lastError || new Error('Request failed'));
      }

      return fetchJsonWithTimeout(list[index], options, timeoutMs).then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.json();
      }).catch(function(error) {
        lastError = error;
        return attempt(index + 1);
      });
    }

    return attempt(0);
  }

  function getLyricsSearchEndpoint(track, title, artist) {
    var customEndpoint = window.LYRICS_SEARCH_API_ENDPOINT || 'https://lrclib.net/api/search';
    var lookup = buildExternalLookupData(title || (track && track.title), artist || (track && track.artist));
    var normalizedTitle = lookup.title;
    var normalizedArtist = lookup.artist;
    var params = new URLSearchParams();
    if (customEndpoint.indexOf('lrclib.net/api/search') !== -1) {
      if (normalizedTitle) params.set('track_name', normalizedTitle);
      if (normalizedArtist) params.set('artist_name', normalizedArtist);
      if (!normalizedTitle && normalizedArtist) params.set('q', normalizedArtist);
      if (normalizedTitle && !normalizedArtist) params.set('q', normalizedTitle);
      return [customEndpoint + '?' + params.toString()];
    }

    if (normalizedTitle) params.set('title', normalizedTitle);
    if (normalizedArtist) params.set('artist', normalizedArtist);
    params.set('sources', 'kugou,kuwo,netease,qq,rangotec,lrcapi,local');
    return buildLyricsApiUrl('/api/lyrics/search', params, customEndpoint);
  }

  function getLyricsOverride(track) {
    if (!track || track.id === undefined || track.id === null) return null;
    return lyricsOverrides[String(track.id)] || null;
  }

  function setLyricsOverride(track, candidate) {
    if (!track || track.id === undefined || track.id === null || !candidate) return;
    lyricsOverrides[String(track.id)] = candidate;
    saveLyricsOverrides();
    updateLyricsOverrideButton(track);
  }

  function clearLyricsOverride(track) {
    if (!track || track.id === undefined || track.id === null) return false;
    var key = String(track.id);
    if (!lyricsOverrides[key]) return false;
    delete lyricsOverrides[key];
    saveLyricsOverrides();
    updateLyricsOverrideButton(track);
    return true;
  }

  function updateLyricsOverrideButton(track) {
    if (!lyricsResetOverrideButton) return;
    var hasOverride = !!getLyricsOverride(track || getCurrentTrack());
    lyricsResetOverrideButton.disabled = !hasOverride;
    lyricsResetOverrideButton.classList.toggle('is-disabled', !hasOverride);
    lyricsResetOverrideButton.title = hasOverride ? '清除手动选择的歌词版本，重新自动匹配' : '当前没有手动指定歌词版本';
  }

  function normalizeLyricMatchText(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[《》"'`]/g, ' ')
      .replace(/[()（）\[\]【】]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function canonicalSongTitle(value) {
    return normalizeLyricMatchText(
      String(value || '')
        .replace(/[\(\[（【].*?[\)\]）】]/g, ' ')
        .replace(/(?:dj版?|live版?|现场版|伴奏版?|纯音乐版|remix版?|cover版?|翻唱版|完整版|片段版|demo版|新版|原版|剪辑版|抖音版)/gi, ' ')
    );
  }

  function isMetadataOnlyLine(line) {
    return /^(作词|作曲|词曲|编曲|歌词意译|歌词翻译|译词|翻译|录音|混音|制作人|母带|监制|出品|发行|OP|SP|词[:：]|曲[:：]|编[:：]|演唱[:：]|和声[:：]|吉他[:：]|贝斯[:：]|鼓[:：])/.test(String(line || '').trim());
  }

  function isNoLyricsPlaceholder(line) {
    return /^(纯音乐(?:，|,|\s)*(?:请欣赏)?|暂无歌词|没有歌词|此歌曲为没有填词的纯音乐|instrumental)$/i.test(String(line || '').trim());
  }

  function sanitizeLyricPreviewLines(lines) {
    var safeLines = Array.isArray(lines)
      ? lines.map(function(line) { return String(line || '').trim(); }).filter(Boolean)
      : [];
    var contentLines = safeLines.filter(function(line) {
      return !isMetadataOnlyLine(line) && !isNoLyricsPlaceholder(line);
    });
    return contentLines.slice(0, 2);
  }

  function sanitizeLyricLines(lines) {
    var safeLines = Array.isArray(lines)
      ? lines.map(function(line) { return String(line || '').trim(); }).filter(Boolean)
      : [];
    return safeLines.filter(function(line) {
      return !isMetadataOnlyLine(line) && !isNoLyricsPlaceholder(line);
    });
  }

  function parseLyricTimestampToSeconds(raw) {
    var match = String(raw || '').trim().match(/^(\d+):(\d+)(?:[.:](\d+))?$/);
    if (!match) return null;

    var minutes = Number(match[1] || 0);
    var seconds = Number(match[2] || 0);
    var fractionRaw = match[3] || '';
    var fraction = fractionRaw ? Number(fractionRaw) / Math.pow(10, fractionRaw.length) : 0;
    return minutes * 60 + seconds + fraction;
  }

  function parseSyncedLyricsText(raw) {
    var result = [];
    String(raw || '').split(/\r?\n/).forEach(function(line) {
      var sourceLine = String(line || '').trim();
      if (!sourceLine) return;

      var timestampRegex = /\[(\d+:\d+(?:[.:]\d+)?)(?:\s*,\s*\d+:\d+(?:[.:]\d+)?)?\]/g;
      var text = sourceLine.replace(/\[[^\]]+\]/g, '').trim();
      if (!text || isMetadataOnlyLine(text)) return;

      var match;
      while ((match = timestampRegex.exec(sourceLine)) !== null) {
        var time = parseLyricTimestampToSeconds(match[1]);
        if (time !== null && !isNaN(time)) {
          result.push({ time: time, text: text });
        }
      }
    });

    return normalizeSyncedEntries(result);
  }

  function scoreLyricCandidate(track, candidate) {
    var queryTitle = canonicalSongTitle(track && track.title);
    var queryArtist = normalizeLyricMatchText(track && track.artist);
    var title = canonicalSongTitle(candidate && candidate.title);
    var artist = normalizeLyricMatchText(candidate && candidate.artist);
    var score = 0;

    if (queryTitle && title === queryTitle) score += 100;
    else if (queryTitle && title.indexOf(queryTitle) !== -1) score += 55;
    else if (queryTitle && queryTitle.indexOf(title) !== -1) score += 40;

    if (queryArtist && artist === queryArtist) score += 80;
    else if (queryArtist && artist.indexOf(queryArtist) !== -1) score += 45;
    else if (queryArtist && queryArtist.indexOf(artist) !== -1) score += 30;

    if (candidate && candidate.previewLines && candidate.previewLines.length) score += 10;
    if (candidate && candidate.source === 'netease') score += 8;
    if (candidate && candidate.source === 'rangotec') score += 6;
    if (candidate && candidate.source === 'lrcapi') score -= 18;
    if (candidate && candidate.source === 'lyricsovh') score -= 4;
    return score;
  }

  function fetchLrclibFallbackPayload(track, signal) {
    var searchUrls = getLyricsSearchEndpoint(track, track && track.title, track && track.artist);
    return fetchJsonFromCandidates(searchUrls, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(payload) {
      var candidates = normalizeSearchCandidates(payload)
        .filter(function(item) {
          return item.source === 'lrclib' && item.providerId;
        })
        .sort(function(a, b) {
          return scoreLyricCandidate(track, b) - scoreLyricCandidate(track, a);
        });

      if (!candidates.length) {
        throw new Error('LRCLIB search empty');
      }

      return fetchJsonFromCandidates([
        'https://lrclib.net/api/get/' + encodeURIComponent(String(candidates[0].providerId))
      ], {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json'
        }
      });
    });
  }

  function applyLyricsOverride(track, endpoint) {
    var override = getLyricsOverride(track);
    if (!override) return endpoint;

    if (override.source === 'lrclib' && override.providerId) {
      return 'https://lrclib.net/api/get/' + encodeURIComponent(String(override.providerId));
    }

    var url = new URL(endpoint, window.location.href);
    if (override.title) url.searchParams.set('title', sanitizeTrackText(override.title));
    if (override.artist) url.searchParams.set('artist', sanitizeTrackText(override.artist));
    if (override.source) url.searchParams.set('source', override.source);
    if (override.candidateId) url.searchParams.set('candidateId', override.candidateId);
    if (override.accesskey) url.searchParams.set('accesskey', override.accesskey);
    if (override.providerId) url.searchParams.set('providerId', override.providerId);
    return url.toString();
  }

  function parseRangotecLyrics(payload) {
    if (!payload || payload.code !== 200 || !Array.isArray(payload.data) || !payload.data.length) {
      return [];
    }

    var firstItem = payload.data[0];
    if (!firstItem || !firstItem.lrc) return [];

    return String(firstItem.lrc)
      .split(/\r?\n/)
      .map(function(line) {
        return line.replace(/^(?:\[[^\]]+\])+\s*/g, '').trim();
      })
      .filter(Boolean);
  }

  function parseLyricsOvhPayload(payload) {
    if (!payload || !payload.lyrics) return [];
    return String(payload.lyrics)
      .split(/\r?\n/)
      .map(function(line) { return String(line || '').trim(); })
      .filter(Boolean);
  }

  function parseLyricsPayload(payload) {
    var directLines = Array.isArray(payload && payload.lines) ? payload.lines : [];
    var rawSyncedLyrics = payload && payload.syncedLyrics;
    var syncedEntries = Array.isArray(rawSyncedLyrics)
      ? rawSyncedLyrics
      : parseSyncedLyricsText(rawSyncedLyrics || '');
    directLines = sanitizeLyricLines(directLines);
    if (directLines.length) {
      return {
        lines: directLines,
        source: payload.source || 'server',
        syncedEntries: syncedEntries,
        currentCandidate: {
          source: payload.source || 'server',
          title: payload.title || '',
          artist: payload.artist || '',
          album: payload.album || '',
          providerId: payload.providerId || '',
          candidateId: payload.candidateId || '',
          accesskey: payload.accesskey || '',
          previewLines: directLines.slice(0, 2),
          isCurrent: true
        }
      };
    }

    if (payload && (payload.trackName || payload.artistName || payload.plainLyrics || payload.syncedLyrics)) {
      var lrclibSyncedEntries = parseSyncedLyricsText(payload.syncedLyrics || '');
      var lrclibLines = lrclibSyncedEntries.length
        ? lrclibSyncedEntries.map(function(entry) { return entry.text; }).filter(Boolean)
        : String(payload.plainLyrics || '')
            .split(/\r?\n/)
            .map(function(line) { return String(line || '').trim(); })
            .filter(Boolean);
      lrclibLines = sanitizeLyricLines(lrclibLines);

      if (lrclibLines.length) {
        return {
          lines: lrclibLines,
          source: 'lrclib',
          syncedEntries: lrclibSyncedEntries,
          currentCandidate: {
            source: 'lrclib',
            title: payload.trackName || payload.name || '',
            artist: payload.artistName || '',
            album: payload.albumName || '',
            providerId: payload.id || '',
            candidateId: '',
            accesskey: '',
            previewLines: lrclibLines.slice(0, 2),
            isCurrent: true
          }
        };
      }
    }

    var lyricsOvhLines = sanitizeLyricLines(parseLyricsOvhPayload(payload));
    if (lyricsOvhLines.length) {
      return {
        lines: lyricsOvhLines,
        source: 'lyricsovh',
        syncedEntries: [],
        currentCandidate: {
          source: 'lyricsovh',
          title: payload.title || '',
          artist: payload.artist || '',
          album: '',
          providerId: '',
          candidateId: '',
          accesskey: '',
          previewLines: lyricsOvhLines.slice(0, 2),
          isCurrent: true
        }
      };
    }

    var rangotecLines = sanitizeLyricLines(parseRangotecLyrics(payload));
    if (rangotecLines.length) {
      var rangotecRawLyrics = payload && payload.data && payload.data[0] ? payload.data[0].lrc || '' : '';
      var rangotecSyncedEntries = parseSyncedLyricsText(rangotecRawLyrics);
      return {
        lines: rangotecLines,
        source: 'rangotec',
        syncedEntries: rangotecSyncedEntries,
        currentCandidate: {
          source: 'rangotec',
          title: payload && payload.data && payload.data[0] ? payload.data[0].title || '' : '',
          artist: payload && payload.data && payload.data[0] ? payload.data[0].artist || '' : '',
          album: payload && payload.data && payload.data[0] ? payload.data[0].album || '' : '',
          providerId: payload && payload.data && payload.data[0] ? payload.data[0].id || '' : '',
          previewLines: rangotecLines.slice(0, 2),
          isCurrent: true
        }
      };
    }

    return {
      lines: [],
      source: payload && payload.source ? payload.source : 'server',
      syncedEntries: [],
      currentCandidate: {
        source: payload && payload.source ? payload.source : 'server',
        title: payload && payload.title ? payload.title : '',
        artist: payload && payload.artist ? payload.artist : '',
        album: payload && payload.album ? payload.album : '',
        providerId: payload && payload.providerId ? payload.providerId : '',
        candidateId: payload && payload.candidateId ? payload.candidateId : '',
        accesskey: payload && payload.accesskey ? payload.accesskey : '',
        previewLines: [],
        isCurrent: true
      }
    };
  }

  function findSyncedLyricIndex(currentTime) {
    var entries = Array.isArray(lyricsState.syncedEntries) ? lyricsState.syncedEntries : [];
    if (!entries.length) return -1;

    var activeIndex = -1;
    for (var i = 0; i < entries.length; i++) {
      if (Number(entries[i].time) <= currentTime + 0.12) activeIndex = i;
      else break;
    }
    return activeIndex;
  }

  function syncLyricsWithAudio() {
    var audio = document.getElementById('audio-player');
    var container = document.getElementById('lyrics-lines');
    var entries = Array.isArray(lyricsState.syncedEntries) ? lyricsState.syncedEntries : [];
    if (!audio || !container) return;

    if (!entries.length) {
      return;
    }

    var nextIndex = findSyncedLyricIndex(audio.currentTime || 0);
    if (nextIndex === lyricsState.activeIndex) return;
    lyricsState.activeIndex = nextIndex;

    var nodes = Array.prototype.slice.call(container.querySelectorAll('.lyric-line'));
    nodes.forEach(function(node, index) {
      node.classList.toggle('active', index === nextIndex);
      node.classList.toggle('dim', nextIndex !== -1 && index < nextIndex);
    });

    var activeNode = container.querySelector('.lyric-line.active');
    if (!activeNode) return;

    var containerRect = container.getBoundingClientRect();
    var activeRect = activeNode.getBoundingClientRect();
    var activeTop = activeRect.top - containerRect.top + container.scrollTop;
    var targetTop = Math.max(activeTop - container.clientHeight * 0.35, 0);

    if (Math.abs(container.scrollTop - targetTop) > 20) {
      container.scrollTo({
        top: targetTop,
        behavior: audio.paused ? 'auto' : 'smooth'
      });
    }
  }

  function normalizeSearchCandidates(payload) {
    var items = Array.isArray(payload)
      ? payload
      : Array.isArray(payload && payload.candidates)
        ? payload.candidates
        : [];
    var queryTrack = {
      title: lyricsSearchTitleInput && lyricsSearchTitleInput.value || (getCurrentTrack() && getCurrentTrack().title) || '',
      artist: lyricsSearchArtistInput && lyricsSearchArtistInput.value || (getCurrentTrack() && getCurrentTrack().artist) || ''
    };
    return items.map(function(item) {
      return {
        source: item.source || (item.trackName || item.artistName || item.plainLyrics || item.syncedLyrics ? 'lrclib' : 'kugou'),
        title: item.title || item.trackName || item.name || '',
        artist: item.artist || item.artistName || '',
        album: item.album || item.albumName || '',
        duration: item.duration || '',
        durationText: item.durationText || '',
        candidateId: item.candidateId || '',
        accesskey: item.accesskey || '',
        providerId: item.providerId || item.id || '',
        previewLines: sanitizeLyricPreviewLines(Array.isArray(item.previewLines)
          ? item.previewLines
          : String(item.plainLyrics || item.syncedLyrics || '')
              .split(/\r?\n/)
              .map(function(line) {
                return String(line || '').replace(/^\[[^\]]+\]/, '').trim();
              })
              .filter(Boolean)),
        qualityHint: item.qualityHint || '',
        isCurrent: !!item.isCurrent
      };
    }).filter(function(item) {
      return item.title || item.artist;
    }).sort(function(a, b) {
      return scoreLyricCandidate(queryTrack, b) - scoreLyricCandidate(queryTrack, a);
    });
  }

  function mergeCurrentLyricsCandidate(candidates) {
    var list = Array.isArray(candidates) ? candidates.slice() : [];
    var current = lyricsState && lyricsState.currentCandidate ? lyricsState.currentCandidate : null;
    if (!current || !(current.title || current.artist || current.previewLines && current.previewLines.length)) {
      return list;
    }

    var exists = list.some(function(item) {
      return item.source === current.source &&
        String(item.providerId || '') === String(current.providerId || '') &&
        String(item.candidateId || '') === String(current.candidateId || '');
    });

    if (!exists) {
      list.unshift(current);
    }

    return list;
  }

  function renderLyricsSearchResults(candidates) {
    if (!lyricsSearchResults) return;

    if (!candidates.length) {
      lyricsSearchResults.innerHTML = '';
      return;
    }

    lyricsSearchResults.innerHTML = candidates.map(function(item, index) {
      var desc = [
        item.isCurrent ? '当前显示中' : '',
        item.artist ? ('歌手：' + item.artist) : '',
        item.album ? ('专辑：' + item.album) : '',
        item.durationText ? ('时长：' + item.durationText) : '',
        item.source ? ('来源：' + item.source) : ''
      ].filter(Boolean).join(' · ');
      var preview = sanitizeLyricPreviewLines(item.previewLines || []).join(' / ');
      var hint = item.qualityHint === 'time-synced'
        ? '<span class="lyrics-result-hint">优先时间轴</span>'
        : ((item.qualityHint === 'plain' || item.source === 'lyricsovh' || item.source === 'lrcapi') ? '<span class="lyrics-result-hint is-soft">低可信纯文本</span>' : '');

      return '' +
        '<div class="lyrics-search-item' + (item.isCurrent ? ' is-current' : '') + '" data-index="' + index + '">' +
          '<div class="lyrics-search-copy">' +
            (item.isCurrent ? '<div class="lyrics-current-badge">当前使用中</div>' : '') +
            '<div class="lyrics-search-title">' + escapeLyricsHtml(item.title || '未命名歌词') + hint + '</div>' +
            '<div class="lyrics-search-desc">' + escapeLyricsHtml(desc || '手动切换这个歌词版本') + '</div>' +
            (preview ? ('<div class="lyrics-search-desc">预览：' + escapeLyricsHtml(preview) + '</div>') : '') +
          '</div>' +
          '<button class="lyrics-search-use' + (item.isCurrent ? ' is-current' : '') + '" type="button" data-index="' + index + '">' + (item.isCurrent ? '当前这版' : '使用这版') + '</button>' +
        '</div>';
    }).join('');
  }

  function setLyricsSearchStatus(text) {
    if (lyricsSearchStatus) lyricsSearchStatus.textContent = text || '';
  }

  function toggleLyricsSearchPanel(forceOpen) {
    if (!lyricsSearchPanel) return;
    var shouldOpen = typeof forceOpen === 'boolean'
      ? forceOpen
      : !lyricsSearchPanel.classList.contains('is-open');
    lyricsSearchPanel.classList.toggle('is-open', shouldOpen);

    var track = getCurrentTrack();
    if (shouldOpen && track) {
      if (lyricsSearchTitleInput) lyricsSearchTitleInput.value = sanitizeTrackText(track.title);
      if (lyricsSearchArtistInput) lyricsSearchArtistInput.value = sanitizeTrackText(track.artist);
    }
  }

  function searchLyricsCandidates(track, title, artist) {
    if (typeof fetch !== 'function') return;

    var normalizedTitle = sanitizeTrackText(title || (track && track.title));
    var normalizedArtist = sanitizeTrackText(artist || (track && track.artist));
    if (!normalizedTitle && !normalizedArtist) {
      setLyricsSearchStatus('请至少输入歌名或歌手中的一个再搜索。');
      renderLyricsSearchResults([]);
      return;
    }

    if (lyricsSearchAbortController && typeof lyricsSearchAbortController.abort === 'function') {
      lyricsSearchAbortController.abort();
    }
    lyricsSearchAbortController = typeof AbortController !== 'undefined' ? new AbortController() : null;

    setLyricsSearchStatus('正在搜索歌词候选...');
    renderLyricsSearchResults([]);

    var searchUrls = getLyricsSearchEndpoint(track, normalizedTitle, normalizedArtist);
    fetchJsonFromCandidates(searchUrls, {
      method: 'GET',
      signal: lyricsSearchAbortController ? lyricsSearchAbortController.signal : undefined,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(function(payload) {
        var candidates = mergeCurrentLyricsCandidate(normalizeSearchCandidates(payload));
        if (!candidates.length) {
          setLyricsSearchStatus('没有找到新的歌词候选。当前歌词如果已经显示，会作为当前版本保留在这里。');
          renderLyricsSearchResults([]);
          return;
        }

        lyricsSearchResults._candidateList = candidates;
        renderLyricsSearchResults(candidates);
        setLyricsSearchStatus('已找到 ' + candidates.length + ' 个歌词候选，选择一版即可替换。');
      })
      .catch(function(error) {
        if (error && error.name === 'AbortError') return;
        var canFallbackToDirectSearch = !!(window.LYRICS_SEARCH_API_ENDPOINT && String(window.LYRICS_SEARCH_API_ENDPOINT).trim());
        if (canFallbackToDirectSearch) {
          fetchJsonFromCandidates([
            'https://lrclib.net/api/search?' + (function() {
              var params = new URLSearchParams();
              if (normalizedTitle) params.set('track_name', normalizedTitle);
              if (normalizedArtist) params.set('artist_name', normalizedArtist);
              if (!normalizedTitle && normalizedArtist) params.set('q', normalizedArtist);
              if (!normalizedArtist && normalizedTitle) params.set('q', normalizedTitle);
              return params.toString();
            })()
          ], {
            method: 'GET',
            signal: lyricsSearchAbortController ? lyricsSearchAbortController.signal : undefined,
            headers: {
              'Accept': 'application/json'
            }
          }).then(function(payload) {
            var candidates = mergeCurrentLyricsCandidate(normalizeSearchCandidates(payload));
            if (!candidates.length) {
              setLyricsSearchStatus('当前代理不可用，已回退到公开搜索，但没有找到候选。');
              renderLyricsSearchResults([]);
              return;
            }
            lyricsSearchResults._candidateList = candidates;
            renderLyricsSearchResults(candidates);
            setLyricsSearchStatus('当前代理不可用，已回退到公开搜索，找到 ' + candidates.length + ' 个候选。');
          }).catch(function(fallbackError) {
            if (fallbackError && fallbackError.name === 'AbortError') return;
            var fallbackMessage = fallbackError && fallbackError.message ? fallbackError.message : '未知错误';
            if (fallbackMessage === 'HTTP 404') {
              fallbackMessage = '当前歌词源没有返回搜索结果。';
            }
            setLyricsSearchStatus('歌词搜索失败：' + fallbackMessage);
          });
          return;
        }

        var message = error && error.message ? error.message : '未知错误';
        if (message === 'HTTP 404') {
          message = '当前歌词源没有返回搜索结果。';
        }
        setLyricsSearchStatus('歌词搜索失败：' + message);
      });
  }

  function applyLyricsCandidate(candidate) {
    var track = getCurrentTrack();
    if (!track || !candidate) return;

    if (candidate.isCurrent) {
      setLyricsSearchStatus('当前已经在使用这版歌词。');
      if (typeof window.toast === 'function') window.toast('当前已经在使用这版歌词');
      return;
    }

    setLyricsOverride(track, candidate);
    setLyricsSearchStatus('正在切换到：' + (candidate.title || track.title) + ' / ' + (candidate.artist || track.artist));
    fetchLyrics(track);
  }

  function fetchLyrics(track) {
    if (!track || typeof fetch !== 'function') return;

    lyricsRequestToken += 1;
    var currentToken = lyricsRequestToken;

    if (lyricsAbortController && typeof lyricsAbortController.abort === 'function') {
      lyricsAbortController.abort();
    }

    if (typeof AbortController !== 'undefined') {
      lyricsAbortController = new AbortController();
    } else {
      lyricsAbortController = null;
    }

    lyricsState = {
      lines: [],
      source: 'loading',
      status: 'loading',
      syncedEntries: [],
      activeIndex: -1,
      currentCandidate: null
    };
    renderLyrics(track);
    updateLyricsSourceLabel('loading');

    var cachedLyrics = readLyricsCache(track);
    if (cachedLyrics) {
      lyricsState = {
        lines: cachedLyrics.lines,
        source: cachedLyrics.source || 'cache',
        status: 'loaded',
        syncedEntries: normalizeSyncedEntries(cachedLyrics.syncedEntries),
        activeIndex: -1,
        currentCandidate: cachedLyrics.currentCandidate || null
      };
      renderLyricsLines(lyricsState.lines, lyricsState.syncedEntries);
      updateLyricsSourceLabel(cachedLyrics.source || 'cache', lyricsState.syncedEntries);
      setLyricsSearchStatus('已显示本地缓存歌词，正在检查更新。');
      syncLyricsWithAudio();
    }

    var primaryUrls = (function() {
      var endpoint = applyLyricsOverride(track, getLyricsEndpoint(track));
      if (/^https?:\/\//i.test(endpoint) || endpoint.indexOf('tools.rangotec.com/api/anon/lrc') !== -1) {
        return [endpoint];
      }

      var query = endpoint.split('?')[1] || '';
      var params = new URLSearchParams(query);
      return buildLyricsApiUrl('/api/lyrics', params, window.LYRICS_API_ENDPOINT || '');
    })();

    fetchJsonFromCandidates(primaryUrls, {
      method: 'GET',
      signal: lyricsAbortController ? lyricsAbortController.signal : undefined,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(function(payload) {
        if (currentToken !== lyricsRequestToken) return;

        var parsed = parseLyricsPayload(payload);
        var lines = parsed.lines;
        if (lines.length) {
          lyricsState = {
            lines: lines,
            source: parsed.source,
            status: 'loaded',
            syncedEntries: normalizeSyncedEntries(parsed.syncedEntries),
            activeIndex: -1,
            currentCandidate: parsed.currentCandidate || null
          };
          writeLyricsCache(track, lyricsState);
          renderLyricsLines(lines, lyricsState.syncedEntries);
          updateLyricsSourceLabel(parsed.source, lyricsState.syncedEntries);
          setLyricsSearchStatus(lyricsState.syncedEntries.length
            ? '已显示时间轴歌词，会跟随播放进度滚动。'
            : '已显示纯文本歌词；这版没有时间轴，不能逐句同步。');
          var lyricsContainer = document.getElementById('lyrics-lines');
          if (lyricsContainer) lyricsContainer.scrollTop = 0;
          syncLyricsWithAudio();
          return;
        }

        lyricsState = {
          lines: [
            '暂无歌词'
          ],
          source: 'empty',
          status: 'empty',
          syncedEntries: [],
          activeIndex: -1,
          currentCandidate: null
        };
        renderLyricsLines(lyricsState.lines);
        updateLyricsSourceLabel('empty');
        setLyricsSearchStatus('没有找到可信匹配歌词，可手动搜索候选；低可信纯文本不会自动显示。');
      })
      .catch(function(error) {
        if (error && error.name === 'AbortError') return;
        if (currentToken !== lyricsRequestToken) return;

        var canFallbackToDirectLyrics = !!(window.LYRICS_API_ENDPOINT && String(window.LYRICS_API_ENDPOINT).trim());
        if (canFallbackToDirectLyrics) {
          fetchJsonFromCandidates(buildDirectLyricsFallbackUrls(track), {
            method: 'GET',
            signal: lyricsAbortController ? lyricsAbortController.signal : undefined,
            headers: {
              'Accept': 'application/json'
            }
          }).then(function(payload) {
            if (currentToken !== lyricsRequestToken) return;

            var parsed = parseLyricsPayload(payload);
            var lines = parsed.lines;
            if (!lines.length) {
              throw new Error('Direct fallback empty');
            }

            lyricsState = {
              lines: lines,
              source: parsed.source,
              status: 'loaded',
              syncedEntries: normalizeSyncedEntries(parsed.syncedEntries),
              activeIndex: -1,
              currentCandidate: parsed.currentCandidate || null
            };
            writeLyricsCache(track, lyricsState);
            renderLyricsLines(lines, lyricsState.syncedEntries);
            updateLyricsSourceLabel(parsed.source, lyricsState.syncedEntries);
            setLyricsSearchStatus(lyricsState.syncedEntries.length
              ? '已回退到公开歌词源，并显示时间轴歌词。'
              : '已回退到公开歌词源；这版是纯文本歌词。');
            syncLyricsWithAudio();
          }).catch(function() {
            if (currentToken !== lyricsRequestToken) return;
            lyricsState = {
              lines: [
                '暂无歌词'
              ],
              source: 'error',
              status: 'error',
              syncedEntries: [],
              activeIndex: -1,
              currentCandidate: null
            };
            renderLyricsLines(lyricsState.lines);
            updateLyricsSourceLabel('error');
            setLyricsSearchStatus('没有找到可信匹配歌词，可手动搜索候选；低可信纯文本不会自动显示。');
          });
          return;
        }

        var endpoint = applyLyricsOverride(track, getLyricsEndpoint(track));
        var canTryLrclibSearchFallback =
          endpoint.indexOf('lrclib.net/api/get') !== -1 &&
          !(getLyricsOverride(track) && getLyricsOverride(track).providerId) &&
          error && error.message === 'HTTP 404';

        if (canTryLrclibSearchFallback) {
          fetchLrclibFallbackPayload(track, lyricsAbortController ? lyricsAbortController.signal : undefined)
            .then(function(payload) {
              if (currentToken !== lyricsRequestToken) return;

              var parsed = parseLyricsPayload(payload);
              var lines = parsed.lines;
              if (!lines.length) {
                throw new Error('LRCLIB fallback empty');
              }

              lyricsState = {
                lines: lines,
                source: parsed.source,
                status: 'loaded',
                syncedEntries: normalizeSyncedEntries(parsed.syncedEntries),
                activeIndex: -1,
                currentCandidate: parsed.currentCandidate || null
              };
              writeLyricsCache(track, lyricsState);
              renderLyricsLines(lines, lyricsState.syncedEntries);
              updateLyricsSourceLabel(parsed.source, lyricsState.syncedEntries);
              setLyricsSearchStatus('已自动切换到时间轴歌词。');
              syncLyricsWithAudio();
            })
            .catch(function(fallbackError) {
              if (fallbackError && fallbackError.name === 'AbortError') return;
              if (currentToken !== lyricsRequestToken) return;
              lyricsState = {
                lines: [
                  '暂无歌词'
                ],
                source: 'empty',
                status: 'empty',
                syncedEntries: [],
                activeIndex: -1,
                currentCandidate: null
              };
              renderLyricsLines(lyricsState.lines);
              updateLyricsSourceLabel('empty');
              setLyricsSearchStatus('没有找到可信匹配歌词，可手动搜索候选；低可信纯文本不会自动显示。');
            });
          return;
        }

        var isFileProtocol = !!(window.location && window.location.protocol === 'file:');
        var errorMessage = error && error.message ? error.message : '未知错误';
        var hintLine = isFileProtocol
          ? '当前页面是通过 file:// 打开的，浏览器会拦截大多数跨域歌词请求。请改用 http:// 本地服务器访问页面。'
          : '页面会先回退到占位文案。公开歌词接口偶尔会限流、无结果或临时不可用。';

        lyricsState = {
          lines: [
            '暂无歌词'
          ],
          source: 'error',
          status: 'error',
          syncedEntries: [],
          activeIndex: -1,
          currentCandidate: null
        };
        renderLyricsLines(lyricsState.lines);
        updateLyricsSourceLabel('error');
        setLyricsSearchStatus('歌词自动匹配不可用，已停止低可信兜底。可以手动搜索候选。');
      });
  }

  function rotateLyrics() {
    if (lyricsState && (lyricsState.syncedEntries && lyricsState.syncedEntries.length || lyricsState.lines && lyricsState.lines.length)) return;

    var lines = Array.prototype.slice.call(document.querySelectorAll('#lyrics-lines .lyric-line'));
    if (!lines.length) return;

    var activeIndex = lines.findIndex(function(line) {
      return line.classList.contains('active');
    });

    if (activeIndex === -1) activeIndex = 0;

    lines.forEach(function(line, index) {
      line.classList.remove('active', 'dim');
      if (index === (activeIndex + 1) % lines.length) {
        line.classList.add('active');
      } else if (index > (activeIndex + 1) % lines.length) {
        line.classList.add('dim');
      }
    });
  }

  function ensureLyricsTimer(audio) {
    if (lyricTimer) {
      clearInterval(lyricTimer);
      lyricTimer = null;
    }

    lyricTimer = setInterval(function() {
      if (audio && !audio.paused && lyricsState && ((lyricsState.syncedEntries && lyricsState.syncedEntries.length) || (lyricsState.lines && lyricsState.lines.length))) {
        syncLyricsWithAudio();
      } else if (audio && !audio.paused) {
        rotateLyrics();
      }
    }, 320);
  }

  function updateHero(track) {
    if (!heroTitle) return;

    if (!track) {
      heroTitle.textContent = '请选择一首歌曲';
      heroArtist.textContent = '从首页、搜索页或右侧播放队列都可以开始播放';
      heroArtistChip.textContent = '-';
      heroAlbum.textContent = '纳西音乐精选';
      heroDuration.textContent = '0:00';
      heroSummary.textContent = '当前歌曲信息、歌词氛围和播放控制会在这里集中呈现。';
      heroCover.src = './images/avatar.jpg';
      heroCover.alt = '当前歌曲封面';
      heroCover.classList.remove('playing');
      renderLyrics(null);
      lyricsState = {
        lines: [],
        source: 'placeholder',
        status: 'idle',
        syncedEntries: [],
        activeIndex: -1,
        currentCandidate: null
      };
      updateLyricsSourceLabel('placeholder');
      if (audioSourceSearchInput) audioSourceSearchInput.value = '';
      if (audioSourceSearchResults) renderAudioSearchResults([]);
      setAudioSearchStatus('可把授权音频写入 data/audio-sources.json，然后在这里搜索并切换。');
      return;
    }

    var artistStr = (track.artist || '未知艺术家').trim();
    heroTitle.textContent = artistStr + ' - ' + track.title;
    var artistParts = (typeof splitArtistNames === 'function')
      ? splitArtistNames(artistStr)
      : artistStr.split(/[\s、]+/).filter(Boolean);
    heroArtist.textContent = '右侧切歌会立刻同步这里的主视觉与文案内容。';
    if (artistParts.length > 1) {
      heroArtistChip.innerHTML = artistParts.map(function(name) {
        return '<a class="artist-link" href="artist.html?name=' + encodeURIComponent(name.trim()) + '">' + name.trim() + '</a>';
      }).join('、');
    } else {
      heroArtistChip.innerHTML = '<a class="artist-link" href="artist.html?name=' + encodeURIComponent(artistStr) + '">' + artistStr + '</a>';
    }
    heroAlbum.textContent = track.album || '纳西音乐精选';
    heroDuration.textContent = typeof formatTime === 'function' ? formatTime(track.duration || 0) : '0:00';
    heroSummary.textContent = '当前歌曲已进入播放器舞台。封面下方展示关键信息，右侧区域用来承接这首歌的文案、氛围和后续可替换的歌词内容。';
    heroCover.src = track.cover;
    heroCover.alt = track.title + ' 封面';
    if (typeof window.ensureTrackCover === 'function') {
      window.ensureTrackCover(track, heroCover);
    }
    lyricsState = {
      lines: [],
      source: 'loading',
      status: 'loading',
      syncedEntries: [],
      activeIndex: -1,
      currentCandidate: null
    };
    if (lyricsSearchResults) {
      lyricsSearchResults._candidateList = [];
      renderLyricsSearchResults([]);
    }
    setLyricsSearchStatus('');
    updateLyricsOverrideButton(track);
    renderLyrics(track);
    fetchLyrics(track);
    if (lyricsSearchTitleInput) lyricsSearchTitleInput.value = sanitizeTrackText(track.title);
    if (lyricsSearchArtistInput) lyricsSearchArtistInput.value = sanitizeTrackText(track.artist);
    if (audioSourceSearchInput) audioSourceSearchInput.value = sanitizeTrackText(track.title);
    if (audioSourceSearchResults) renderAudioSearchResults([]);
    setAudioSearchStatus('可搜索已导入的授权音源；不会自动替换当前音频。');
  }

  function updateSidebar() {
    var audio = document.getElementById('audio-player');
    var track = getCurrentTrack();
    var mode = localStorage.getItem('ljyyt_play_mode') || 'order';

    if (heroStatus) {
      heroStatus.textContent = track ? ((audio && !audio.paused) ? '正在播放' : '已加载当前歌曲') : '正在准备播放器';
    }

    if (heroCover) {
      heroCover.classList.toggle('playing', !!(audio && !audio.paused));
    }

    if (sidePlayingState) {
      sidePlayingState.textContent = track ? ((audio && !audio.paused) ? '播放中' : '已暂停') : '未播放';
    }

    if (sideMode) {
      sideMode.textContent = getModeLabel(mode);
    }

    updateAudioSourceMeta(track);

    updateModeActionButtons(mode);

    if (stagePlayButton) {
      stagePlayButton.classList.toggle('is-playing', !!(audio && !audio.paused));
      stagePlayButton.innerHTML = (audio && !audio.paused)
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';
      stagePlayButton.setAttribute('aria-label', (audio && !audio.paused) ? '暂停播放' : '开始播放');
    }
  }

  function getAudioCandidateCount(track) {
    return track && Array.isArray(track.audioCandidates) ? track.audioCandidates.length : 0;
  }

  function getAudioSourceText(track) {
    if (!track) return '未选择';
    var source = track.audioSource || (track.src ? '原始曲库' : '等待解析');
    var typeLabel = '';
    var currentIndex = track.audioCandidateIndex || 0;
    var currentCandidate = track.audioCandidates && track.audioCandidates[currentIndex];
    if (currentCandidate && currentCandidate.sourceType === 'authorized-library') typeLabel = ' · 授权表';
    else if (currentCandidate && currentCandidate.sourceType === 'upstream-resolver') typeLabel = ' · 上游解析';
    else if (currentCandidate && currentCandidate.sourceType === 'existing-catalog') typeLabel = ' · 原曲库';
    var quality = track.audioQuality ? (' · ' + track.audioQuality) : '';
    var proxied = track.audioProxied ? ' · 代理' : '';
    return source + typeLabel + quality + proxied;
  }

  function updateAudioSourceMeta(track) {
    if (sideAudioSource) {
      sideAudioSource.textContent = getAudioSourceText(track);
    }

    if (sideAudioCandidates) {
      var count = getAudioCandidateCount(track);
      var index = track && count ? Number(track.audioCandidateIndex || 0) + 1 : 0;
      sideAudioCandidates.textContent = count ? (index + ' / ' + count + ' 条') : '0 条';
    }
  }

  function setAudioSearchStatus(text) {
    if (audioSourceSearchStatus) audioSourceSearchStatus.textContent = text || '';
  }

  function getImportedAudioUrl(item) {
    return String(
      item && (item.playableUrl || item.src || item.url || item.audioUrl || item.href) || ''
    ).trim();
  }

  function normalizeImportedAudioItem(item, index) {
    var playableUrl = getImportedAudioUrl(item);
    if (!playableUrl) return null;

    return {
      id: item.id || '',
      title: sanitizeTrackText(item.title || item.name || item.song || ''),
      artist: sanitizeTrackText(item.artist || item.singer || item.author || ''),
      album: sanitizeTrackText(item.album || item.collection || ''),
      playableUrl: (typeof normalizeMediaUrl === 'function') ? normalizeMediaUrl(playableUrl) : playableUrl,
      quality: item.quality || item.bitrate || '',
      source: item.source || item.provider || '导入音源',
      license: item.license || '',
      rank: Number(item.rank || index || 0)
    };
  }

  function loadImportedAudioSources() {
    if (importedAudioSources) return Promise.resolve(importedAudioSources);
    if (importedAudioSourcesPromise) return importedAudioSourcesPromise;

    importedAudioSourcesPromise = fetch('data/audio-sources.json', {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    }).then(function(payload) {
      var rawItems = Array.isArray(payload)
        ? payload
        : Array.isArray(payload && payload.items)
          ? payload.items
          : Array.isArray(payload && payload.candidates)
            ? payload.candidates
            : [];
      importedAudioSources = rawItems.map(normalizeImportedAudioItem).filter(Boolean);
      return importedAudioSources;
    }).catch(function(error) {
      importedAudioSourcesPromise = null;
      throw error;
    });

    return importedAudioSourcesPromise;
  }

  function scoreImportedAudioCandidate(track, candidate, keyword) {
    var queryTitle = canonicalSongTitle(track && track.title);
    var queryArtist = normalizeLyricMatchText(track && track.artist);
    var title = canonicalSongTitle(candidate && candidate.title);
    var artist = normalizeLyricMatchText(candidate && candidate.artist);
    var haystack = normalizeLyricMatchText([
      candidate && candidate.title,
      candidate && candidate.artist,
      candidate && candidate.album,
      candidate && candidate.source
    ].join(' '));
    var query = normalizeLyricMatchText(keyword);
    var score = 0;

    if (query && haystack.indexOf(query) !== -1) score += 35;
    if (queryTitle && title === queryTitle) score += 100;
    else if (queryTitle && title.indexOf(queryTitle) !== -1) score += 60;
    else if (queryTitle && queryTitle.indexOf(title) !== -1) score += 45;

    if (queryArtist && artist === queryArtist) score += 70;
    else if (queryArtist && artist.indexOf(queryArtist) !== -1) score += 38;
    else if (queryArtist && queryArtist.indexOf(artist) !== -1) score += 28;

    if (candidate && candidate.quality) score += 4;
    return score;
  }

  function searchImportedAudioSources(track, keyword) {
    var query = sanitizeTrackText(keyword || '');
    var fallbackQuery = sanitizeTrackText([
      track && track.title,
      track && track.artist
    ].filter(Boolean).join(' '));
    var activeQuery = query || fallbackQuery;
    var normalizedQuery = normalizeLyricMatchText(activeQuery);

    return loadImportedAudioSources().then(function(items) {
      if (!items.length) return [];
      return items.filter(function(item) {
        if (!normalizedQuery) return true;
        var haystack = normalizeLyricMatchText([
          item.title,
          item.artist,
          item.album,
          item.source,
          item.quality
        ].join(' '));
        return normalizedQuery.split(/\s+/).filter(Boolean).every(function(part) {
          return haystack.indexOf(part) !== -1;
        }) || haystack.indexOf(normalizedQuery) !== -1;
      }).sort(function(a, b) {
        return scoreImportedAudioCandidate(track, b, activeQuery) - scoreImportedAudioCandidate(track, a, activeQuery);
      }).slice(0, 20);
    });
  }

  function renderAudioSearchResults(candidates) {
    if (!audioSourceSearchResults) return;
    if (!Array.isArray(candidates) || !candidates.length) {
      audioSourceSearchResults.innerHTML = '';
      audioSourceSearchResults._candidateList = [];
      return;
    }

    audioSourceSearchResults._candidateList = candidates;
    audioSourceSearchResults.innerHTML = candidates.map(function(item, index) {
      var title = item.title || '未命名音源';
      var desc = [
        item.artist ? ('歌手：' + item.artist) : '',
        item.album ? ('专辑：' + item.album) : '',
        item.quality ? ('音质：' + item.quality) : '',
        item.source ? ('来源：' + item.source) : '',
        item.license ? ('授权：' + item.license) : ''
      ].filter(Boolean).join(' · ');

      return '' +
        '<div class="audio-search-item" data-index="' + index + '">' +
          '<div class="audio-search-copy">' +
            '<div class="audio-search-name">' + escapeLyricsHtml(title) + '</div>' +
            '<div class="audio-search-desc">' + escapeLyricsHtml(desc || '点击使用这个导入音源') + '</div>' +
          '</div>' +
          '<button class="audio-search-use" type="button" data-index="' + index + '">使用</button>' +
        '</div>';
    }).join('');
  }

  function performAudioSourceSearch() {
    var track = getCurrentTrack();
    var keyword = audioSourceSearchInput ? audioSourceSearchInput.value : '';
    setAudioSearchStatus('正在搜索导入音源...');
    renderAudioSearchResults([]);

    searchImportedAudioSources(track, keyword).then(function(candidates) {
      if (!importedAudioSources || !importedAudioSources.length) {
        setAudioSearchStatus('data/audio-sources.json 目前还没有导入音源。把授权音频写进去后，这里就能搜索。');
        return;
      }
      if (!candidates.length) {
        setAudioSearchStatus('没有找到匹配的导入音源。可以换歌名、歌手或检查 data/audio-sources.json。');
        return;
      }
      renderAudioSearchResults(candidates);
      setAudioSearchStatus('找到 ' + candidates.length + ' 条导入音源，点击一条即可给当前歌曲使用。');
    }).catch(function(error) {
      var message = error && error.message ? error.message : '未知错误';
      setAudioSearchStatus('导入音源读取失败：' + message);
    });
  }

  function applyImportedAudioCandidate(candidate) {
    var track = getCurrentTrack();
    var audio = document.getElementById('audio-player');
    if (!track || !candidate || !candidate.playableUrl) return;

    var playableUrl = candidate.playableUrl;
    var audioCandidate = {
      playableUrl: playableUrl,
      source: candidate.source || '导入音源',
      title: candidate.title || '',
      artist: candidate.artist || '',
      album: candidate.album || '',
      quality: candidate.quality || '',
      license: candidate.license || '',
      sourceType: 'authorized-library',
      proxied: false
    };

    track.resolvedSrc = playableUrl;
    track.audioSource = audioCandidate.source;
    track.audioQuality = audioCandidate.quality;
    track.audioProxied = false;
    track.audioCandidates = [audioCandidate];
    track.audioCandidateIndex = 0;

    try {
      if (typeof getAudioCacheKey === 'function' && typeof audioResolutionCache !== 'undefined') {
        audioResolutionCache[getAudioCacheKey(track)] = playableUrl;
      }
    } catch (error) {}

    if (audio) {
      var wasPlaying = !audio.paused;
      var previousTime = audio.currentTime || 0;
      audio.src = playableUrl;
      audio.load();
      if (previousTime > 0) {
        audio.addEventListener('loadedmetadata', function restoreImportedAudioTime() {
          audio.removeEventListener('loadedmetadata', restoreImportedAudioTime);
          try {
            audio.currentTime = previousTime;
          } catch (error) {}
        });
      }
      if (wasPlaying) {
        audio.play().catch(function() {});
      }
    }

    updateAudioSourceMeta(track);
    setAudioSearchStatus('已切换到导入音源：' + (candidate.title || track.title));
    if (typeof window.toast === 'function') window.toast('已使用导入音源', 'success');
    try {
      window.dispatchEvent(new CustomEvent('ljyyt:audio-source-status', {
        detail: {
          track: track,
          status: 'resolved',
          payload: audioCandidate
        }
      }));
    } catch (error2) {}
  }

  function updateQueueMeta() {
    if (!queueCount) return;
    queueCount.textContent = '';
  }

  function normalizeSearchText(value) {
    return String(value || '').toLowerCase().trim();
  }

  function filterQueueTracks(tracks) {
    var query = normalizeSearchText(queueSearchQuery);
    if (!query) return tracks;

    return tracks.filter(function(track) {
      if (!track) return false;
      var haystack = [
        track.title,
        track.artist,
        track.album
      ].join(' ');
      return normalizeSearchText(haystack).indexOf(query) !== -1;
    });
  }

  function renderCurrentQueue() {
    var tracks = filterQueueTracks(getActiveCollection());

    if (activeView === 'all' && !normalizeSearchText(queueSearchQuery)) {
      if (typeof renderMusicList === 'function') {
        renderMusicList();
      }
    } else if (typeof renderFilteredList === 'function') {
      renderFilteredList(tracks);
    }

    updateQueueMeta();
    setTimeout(scrollActiveCardIntoView, 30);
  }

  function scrollActiveCardIntoView() {
    var activeCard = document.querySelector('.music-card.active');
    var queueList = document.querySelector('.queue-list');
    if (!activeCard || !queueList) return;

    var queueRect = queueList.getBoundingClientRect();
    var cardRect = activeCard.getBoundingClientRect();
    var cardTop = cardRect.top - queueRect.top + queueList.scrollTop;
    var cardBottom = cardTop + cardRect.height;
    var viewTop = queueList.scrollTop;
    var viewBottom = viewTop + queueList.clientHeight;

    if (cardTop < viewTop || cardBottom > viewBottom) {
      queueList.scrollTo({
        top: Math.max(cardTop - (queueList.clientHeight - cardRect.height) / 2, 0),
        behavior: 'smooth'
      });
    }
  }

  function locateCurrentTrackInQueue() {
    if (typeof currentTrackIndex !== 'number' || currentTrackIndex < 0) return;

    if (queueSearchQuery) {
      queueSearchQuery = '';
      if (queueSearchInput) queueSearchInput.value = '';
      renderCurrentQueue();
    }

    if (activeView !== 'all') {
      setActiveView('all');
      return;
    }

    setTimeout(scrollActiveCardIntoView, 80);
  }

  function setActiveView(view) {
    activeView = view;
    document.querySelectorAll('.player-tab').forEach(function(button) {
      button.classList.toggle('active', button.getAttribute('data-view') === view);
    });
    renderCurrentQueue();
  }

  function bindTabs() {
    document.querySelectorAll('.player-tab').forEach(function(button) {
      button.addEventListener('click', function() {
        setActiveView(button.getAttribute('data-view'));
      });
    });
  }

  function bindButtons() {
    openListButton = document.getElementById('open-playlist-panel');
    locateButton = document.getElementById('scroll-current-track');
    refreshAudioButton = document.getElementById('refresh-audio-source');
    modeToggleButton = document.getElementById('side-mode-toggle');
    stageModeButton = document.getElementById('stage-mode-btn');
    stagePrevButton = document.getElementById('stage-prev-btn');
    stageNextButton = document.getElementById('stage-next-btn');

    if (openListButton) {
      openListButton.addEventListener('click', function() {
        var listButton = document.getElementById('btn-list');
        if (listButton) listButton.click();
      });
    }

    if (locateButton) {
      locateButton.addEventListener('click', locateCurrentTrackInQueue);
    }

    if (refreshAudioButton) {
      refreshAudioButton.addEventListener('click', function() {
        var track = getCurrentTrack();
        if (!track) return;
        refreshAudioButton.disabled = true;
        refreshAudioButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>刷新中';
        if (typeof window.refreshCurrentAudioSource === 'function') {
          window.refreshCurrentAudioSource().finally(function() {
            refreshAudioButton.disabled = false;
            refreshAudioButton.innerHTML = '<i class="fas fa-rotate me-2"></i>刷新音源';
            updateAudioSourceMeta(track);
          });
        } else {
          refreshAudioButton.disabled = false;
          refreshAudioButton.innerHTML = '<i class="fas fa-rotate me-2"></i>刷新音源';
        }
      });
    }

    if (modeToggleButton) {
      modeToggleButton.addEventListener('click', function() {
        if (typeof cycleMode === 'function') {
          cycleMode();
          updateSidebar();
        }
      });
    }

    if (stageModeButton) {
      stageModeButton.addEventListener('click', function() {
        if (typeof cycleMode === 'function') {
          cycleMode();
          updateSidebar();
        }
      });
    }

    if (stagePlayButton) {
      stagePlayButton.addEventListener('click', function() {
        if (typeof togglePlay === 'function') {
          togglePlay();
          updateSidebar();
        }
      });
    }

    if (stagePrevButton) {
      stagePrevButton.addEventListener('click', function() {
        if (typeof prevTrack === 'function') {
          prevTrack();
          updateSidebar();
        }
      });
    }

    if (stageNextButton) {
      stageNextButton.addEventListener('click', function() {
        if (typeof nextTrack === 'function') {
          nextTrack();
          updateSidebar();
        }
      });
    }

    if (queueSearchInput) {
      queueSearchInput.addEventListener('input', function() {
        queueSearchQuery = queueSearchInput.value || '';
        renderCurrentQueue();
      });
    }

    if (queueSearchClearButton) {
      queueSearchClearButton.addEventListener('click', function() {
        queueSearchQuery = '';
        if (queueSearchInput) {
          queueSearchInput.value = '';
          queueSearchInput.focus();
        }
        renderCurrentQueue();
      });
    }

    if (audioSourceSearchSubmitButton) {
      audioSourceSearchSubmitButton.addEventListener('click', performAudioSourceSearch);
    }

    if (audioSourceSearchInput) {
      audioSourceSearchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          performAudioSourceSearch();
        }
      });
    }

    if (audioSourceSearchResults) {
      audioSourceSearchResults.addEventListener('click', function(event) {
        var target = event.target.closest('[data-index]');
        if (!target) return;
        var index = parseInt(target.getAttribute('data-index'), 10);
        var list = audioSourceSearchResults._candidateList || [];
        if (isNaN(index) || !list[index]) return;
        applyImportedAudioCandidate(list[index]);
      });
    }

    document.addEventListener('ljyyt:favorites-changed', function() {
      renderCurrentQueue();
    });

    if (lyricsSearchToggleButton) {
      lyricsSearchToggleButton.addEventListener('click', function() {
        toggleLyricsSearchPanel();
      });
    }

    if (lyricsResetOverrideButton) {
      lyricsResetOverrideButton.addEventListener('click', function() {
        var track = getCurrentTrack();
        if (!track) return;
        if (!clearLyricsOverride(track)) {
          setLyricsSearchStatus('当前已经是自动匹配歌词。');
          return;
        }
        setLyricsSearchStatus('已恢复自动匹配，正在重新搜索歌词。');
        if (lyricsSearchResults) {
          lyricsSearchResults._candidateList = [];
          renderLyricsSearchResults([]);
        }
        fetchLyrics(track);
      });
    }

    if (lyricsSearchSubmitButton) {
      lyricsSearchSubmitButton.addEventListener('click', function() {
        var track = getCurrentTrack();
        if (!track) return;
        searchLyricsCandidates(track, lyricsSearchTitleInput && lyricsSearchTitleInput.value, lyricsSearchArtistInput && lyricsSearchArtistInput.value);
      });
    }

    if (lyricsSearchResults) {
      lyricsSearchResults.addEventListener('click', function(event) {
        var target = event.target.closest('[data-index]');
        if (!target) return;
        var index = parseInt(target.getAttribute('data-index'), 10);
        var list = lyricsSearchResults._candidateList || [];
        if (isNaN(index) || !list[index]) return;
        applyLyricsCandidate(list[index]);
      });
    }
  }

  function patchFunctions() {
    if (typeof window.loadTrack === 'function') {
      var originalLoadTrack = window.loadTrack;
      window.loadTrack = function(index) {
        if (typeof currentTrackIndex !== 'undefined') {
          currentTrackIndex = index;
        }
        originalLoadTrack(index);
        updateHero(getCurrentTrack());
        updateSidebar();
        if (activeView === 'all' && !normalizeSearchText(queueSearchQuery)) {
          setTimeout(scrollActiveCardIntoView, 30);
        } else {
          renderCurrentQueue();
        }
      };
    }

    if (typeof window.playMusic === 'function') {
      var originalPlayMusic = window.playMusic;
      window.playMusic = function() {
        originalPlayMusic();
        updateSidebar();
      };
    }

    if (typeof window.pauseMusic === 'function') {
      var originalPauseMusic = window.pauseMusic;
      window.pauseMusic = function() {
        originalPauseMusic();
        updateSidebar();
      };
    }
  }

  function bindAudio() {
    var audio = document.getElementById('audio-player');
    if (!audio) return;

    ensureLyricsTimer(audio);

    audio.addEventListener('timeupdate', updateSidebar);
    audio.addEventListener('timeupdate', syncLyricsWithAudio);
    audio.addEventListener('play', updateSidebar);
    audio.addEventListener('play', syncLyricsWithAudio);
    audio.addEventListener('pause', updateSidebar);
    audio.addEventListener('loadedmetadata', updateSidebar);
    audio.addEventListener('loadedmetadata', syncLyricsWithAudio);
    audio.addEventListener('seeked', syncLyricsWithAudio);
  }

  function bindAudioSourceStatus() {
    window.addEventListener('ljyyt:audio-source-status', function(event) {
      var detail = event.detail || {};
      var track = getCurrentTrack();
      if (!track || !detail.track || detail.track.id !== track.id) return;

      var sourceName = detail.payload && detail.payload.source ? detail.payload.source : '';
      if (heroStatus) {
        if (detail.status === 'resolving') heroStatus.textContent = '正在解析音源';
        else if (detail.status === 'resolved') heroStatus.textContent = sourceName ? ('音源就绪：' + sourceName) : '音源就绪';
        else if (detail.status === 'fallback') heroStatus.textContent = sourceName ? ('已回退音源：' + sourceName) : '已回退候选音源';
        else if (detail.status === 'error') heroStatus.textContent = '音源暂不可用';
      }
      updateAudioSourceMeta(track);
    });
  }

  function boot() {
    refs();
    readLyricsOverrides();
    bindTabs();
    bindButtons();
    patchFunctions();
    bindAudio();
    bindAudioSourceStatus();
    updateHero(getCurrentTrack());
    updateSidebar();
    setActiveView('all');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
