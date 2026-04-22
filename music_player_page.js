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
  var stagePlayButton;
  var openListButton;
  var locateButton;
  var modeToggleButton;
  var stageModeButton;
  var stagePrevButton;
  var stageNextButton;
  var queueSearchInput;
  var queueSearchClearButton;
  var lyricsSourceLabel;
  var lyricsSearchToggleButton;
  var lyricsSearchPanel;
  var lyricsSearchTitleInput;
  var lyricsSearchArtistInput;
  var lyricsSearchSubmitButton;
  var lyricsSearchStatus;
  var lyricsSearchResults;
  var activeView = 'all';
  var queueSearchQuery = '';
  var lyricTimer = null;
  var lyricsAbortController = null;
  var lyricsRequestToken = 0;
  var lyricsSearchAbortController = null;
  var lyricsOverrides = {};
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
    stagePlayButton = document.getElementById('stage-play-btn');
    queueSearchInput = document.getElementById('queue-search-input');
    queueSearchClearButton = document.getElementById('queue-search-clear');
    lyricsSourceLabel = document.getElementById('lyrics-source-label');
    lyricsSearchToggleButton = document.getElementById('lyrics-search-toggle');
    lyricsSearchPanel = document.getElementById('lyrics-search-panel');
    lyricsSearchTitleInput = document.getElementById('lyrics-search-title');
    lyricsSearchArtistInput = document.getElementById('lyrics-search-artist');
    lyricsSearchSubmitButton = document.getElementById('lyrics-search-submit');
    lyricsSearchStatus = document.getElementById('lyrics-search-status');
    lyricsSearchResults = document.getElementById('lyrics-search-results');
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
        return entry && !isNaN(entry.time) && entry.text;
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
        return '<div class="' + cls + '" data-lyric-index="' + index + '">' + line + '</div>';
      }).join('');
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
      return '<div class="' + cls + '">' + line + '</div>';
    }).join('');
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
      'placeholder': '当前来源：等待加载'
    };
    return labels[source] || ('当前来源：' + (source || '未知'));
  }

  function updateLyricsSourceLabel(source) {
    if (!lyricsSourceLabel) return;
    lyricsSourceLabel.textContent = getLyricsSourceLabel(source);
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

  function fetchJsonFromCandidates(urls, options) {
    var list = Array.isArray(urls) ? urls.filter(Boolean) : [urls];
    if (!list.length) return Promise.reject(new Error('No request url'));

    var lastError = null;

    function attempt(index) {
      if (index >= list.length) {
        return Promise.reject(lastError || new Error('Request failed'));
      }

      return fetch(list[index], options).then(function(response) {
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
  }

  function normalizeLyricMatchText(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[《》"'`]/g, ' ')
      .replace(/[()（）\[\]【】]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function scoreLyricCandidate(track, candidate) {
    var queryTitle = normalizeLyricMatchText(track && track.title);
    var queryArtist = normalizeLyricMatchText(track && track.artist);
    var title = normalizeLyricMatchText(candidate && candidate.title);
    var artist = normalizeLyricMatchText(candidate && candidate.artist);
    var score = 0;

    if (queryTitle && title === queryTitle) score += 100;
    else if (queryTitle && title.indexOf(queryTitle) !== -1) score += 55;
    else if (queryTitle && queryTitle.indexOf(title) !== -1) score += 40;

    if (queryArtist && artist === queryArtist) score += 80;
    else if (queryArtist && artist.indexOf(queryArtist) !== -1) score += 45;
    else if (queryArtist && queryArtist.indexOf(artist) !== -1) score += 30;

    if (candidate && candidate.previewLines && candidate.previewLines.length) score += 10;
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

  function fetchLyricsOvhPayload(track, signal) {
    var lookup = buildExternalLookupData(track);
    var artist = lookup.artist;
    var title = lookup.title;
    if (!artist || !title) {
      return Promise.reject(new Error('lyrics.ovh needs artist and title'));
    }

    return fetchJsonFromCandidates([
      'https://api.lyrics.ovh/v1/' + encodeURIComponent(artist) + '/' + encodeURIComponent(title)
    ], {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(payload) {
      if (payload && !payload.title) payload.title = title;
      if (payload && !payload.artist) payload.artist = artist;
      return payload;
    });
  }

  function applyLyricsOverride(track, endpoint) {
    var override = getLyricsOverride(track);
    if (!override) return endpoint;

    if ((override.source === 'lrclib' || override.source === 'lrcapi') && override.providerId) {
      return 'https://lrclib.net/api/get/' + encodeURIComponent(String(override.providerId));
    }

    var url = new URL(endpoint, window.location.href);
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
        return line.replace(/^\[[^\]]+\]/g, '').trim();
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
    var syncedEntries = Array.isArray(payload && payload.syncedLyrics) ? payload.syncedLyrics : [];
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
      var lrclibSyncedEntries = String(payload.syncedLyrics || '')
        .split(/\r?\n/)
        .map(function(line) {
          var match = String(line || '').match(/^\[(\d{2}):(\d{2}(?:\.\d{1,3})?)\](.*)$/);
          if (!match) return null;
          return {
            time: Number(match[1]) * 60 + Number(match[2]),
            text: String(match[3] || '').trim()
          };
        })
        .filter(Boolean);
      lrclibSyncedEntries = normalizeSyncedEntries(lrclibSyncedEntries);
      var lrclibLines = lrclibSyncedEntries.length
        ? lrclibSyncedEntries.map(function(entry) { return entry.text; }).filter(Boolean)
        : String(payload.plainLyrics || '')
            .split(/\r?\n/)
            .map(function(line) { return String(line || '').trim(); })
            .filter(Boolean);

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

    var lyricsOvhLines = parseLyricsOvhPayload(payload);
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

    var rangotecLines = parseRangotecLyrics(payload);
    if (rangotecLines.length) {
      return {
        lines: rangotecLines,
        source: 'rangotec',
        syncedEntries: [],
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
    if (!audio || !container || !entries.length) return;

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
        previewLines: Array.isArray(item.previewLines)
          ? item.previewLines
          : String(item.plainLyrics || item.syncedLyrics || '')
              .split(/\r?\n/)
              .map(function(line) {
                return String(line || '').replace(/^\[[^\]]+\]/, '').trim();
              })
              .filter(Boolean)
              .slice(0, 2),
        isCurrent: !!item.isCurrent
      };
    }).filter(function(item) {
      return item.title || item.artist;
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
      var preview = (item.previewLines || []).join(' / ');

      return '' +
        '<div class="lyrics-search-item' + (item.isCurrent ? ' is-current' : '') + '" data-index="' + index + '">' +
          '<div class="lyrics-search-copy">' +
            (item.isCurrent ? '<div class="lyrics-current-badge">当前使用中</div>' : '') +
            '<div class="lyrics-search-title">' + (item.title || '未命名歌词') + '</div>' +
            '<div class="lyrics-search-desc">' + (desc || '手动切换这个歌词版本') + '</div>' +
            (preview ? ('<div class="lyrics-search-desc">预览：' + preview + '</div>') : '') +
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

    fetchJsonFromCandidates(getLyricsSearchEndpoint(track, normalizedTitle, normalizedArtist), {
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
    toggleLyricsSearchPanel(false);
    renderLyricsSearchResults([]);
    if (lyricsSearchResults) lyricsSearchResults._candidateList = [];
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

    fetchJsonFromCandidates((function() {
      var endpoint = applyLyricsOverride(track, getLyricsEndpoint(track));
      if (/^https?:\/\//i.test(endpoint) || endpoint.indexOf('tools.rangotec.com/api/anon/lrc') !== -1) {
        return [endpoint];
      }

      var query = endpoint.split('?')[1] || '';
      var params = new URLSearchParams(query);
      return buildLyricsApiUrl('/api/lyrics', params, window.LYRICS_API_ENDPOINT || '');
    })(), {
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
          renderLyricsLines(lines, lyricsState.syncedEntries);
          updateLyricsSourceLabel(parsed.source);
          setLyricsSearchStatus('歌词已切换成功：' + (parsed.currentCandidate && parsed.currentCandidate.title ? parsed.currentCandidate.title : sanitizeTrackText(track.title)));
          if (typeof window.toast === 'function') {
            window.toast('歌词已切换成功', 'success');
          }
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
        updateLyricsSourceLabel('placeholder');
      })
      .catch(function(error) {
        if (error && error.name === 'AbortError') return;
        if (currentToken !== lyricsRequestToken) return;

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
              renderLyricsLines(lines, lyricsState.syncedEntries);
              updateLyricsSourceLabel(parsed.source);
              setLyricsSearchStatus('已自动切换到搜索候选歌词：' + (parsed.currentCandidate && parsed.currentCandidate.title ? parsed.currentCandidate.title : sanitizeTrackText(track.title)));
              syncLyricsWithAudio();
            })
            .catch(function(fallbackError) {
              if (fallbackError && fallbackError.name === 'AbortError') return;
              if (currentToken !== lyricsRequestToken) return;

              fetchLyricsOvhPayload(track, lyricsAbortController ? lyricsAbortController.signal : undefined)
                .then(function(payload) {
                  if (currentToken !== lyricsRequestToken) return;

                  var parsed = parseLyricsPayload(payload);
                  var lines = parsed.lines;
                  if (!lines.length) {
                    throw new Error('lyrics.ovh empty');
                  }

                  lyricsState = {
                    lines: lines,
                    source: parsed.source,
                    status: 'loaded',
                    syncedEntries: [],
                    activeIndex: -1,
                    currentCandidate: parsed.currentCandidate || null
                  };
                  renderLyricsLines(lines);
                  updateLyricsSourceLabel(parsed.source);
                  setLyricsSearchStatus('已自动切换到 lyrics.ovh 歌词：' + sanitizeTrackText(track.title));
                })
                .catch(function(lastError) {
                  if (lastError && lastError.name === 'AbortError') return;
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
                  updateLyricsSourceLabel('placeholder');
                });
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
      });
  }

  function rotateLyrics() {
    if (lyricsState && (lyricsState.status === 'loaded' || (lyricsState.syncedEntries && lyricsState.syncedEntries.length))) return;

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
      if (audio && !audio.paused) {
        rotateLyrics();
      }
    }, 2800);
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
    renderLyrics(track);
    fetchLyrics(track);
    if (lyricsSearchTitleInput) lyricsSearchTitleInput.value = sanitizeTrackText(track.title);
    if (lyricsSearchArtistInput) lyricsSearchArtistInput.value = sanitizeTrackText(track.artist);
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

    updateModeActionButtons(mode);

    if (stagePlayButton) {
      stagePlayButton.classList.toggle('is-playing', !!(audio && !audio.paused));
      stagePlayButton.innerHTML = (audio && !audio.paused)
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';
      stagePlayButton.setAttribute('aria-label', (audio && !audio.paused) ? '暂停播放' : '开始播放');
    }
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

    document.addEventListener('ljyyt:favorites-changed', function() {
      renderCurrentQueue();
    });

    if (lyricsSearchToggleButton) {
      lyricsSearchToggleButton.addEventListener('click', function() {
        toggleLyricsSearchPanel();
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
        var button = event.target.closest('button[data-index]');
        if (!button) return;
        var index = parseInt(button.getAttribute('data-index'), 10);
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

  function boot() {
    refs();
    readLyricsOverrides();
    bindTabs();
    bindButtons();
    patchFunctions();
    bindAudio();
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
