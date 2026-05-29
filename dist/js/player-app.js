(function() {
  'use strict';

  var STORAGE_KEY = 'ljyyt_player_app_state';
  var FAVORITES_KEY = 'ljyyt_player_favorites';
  var LEGACY_FAVORITES_KEY = 'favoriteMusic';
  var PLACEHOLDER_COVER = 'images/avatar.jpg';
  var MODE_SEQUENCE = ['list', 'repeat-one', 'shuffle'];
  var MODE_LABELS = {
    list: '列表循环',
    'repeat-one': '单曲循环',
    shuffle: '随机播放'
  };

  var tracks = Array.isArray(window.LJYYT_MUSIC_DATA) ? window.LJYYT_MUSIC_DATA.slice() : [];
  var state = {
    index: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playMode: 'list',
    favorites: new Set(),
    lyrics: [],
    activeLyricIndex: -1,
    isSeeking: false,
    isAutoAdvancing: false,
    queueFilter: ''
  };

  var els = {};

  function $(id) {
    return document.getElementById(id);
  }

  function icons() {
    return window.LJYYTIcons || {};
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTime(raw) {
    var seconds = Number(raw);
    if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
    seconds = Math.floor(seconds);
    var minutes = Math.floor(seconds / 60);
    var remain = seconds % 60;
    return minutes + ':' + String(remain).padStart(2, '0');
  }

  function normalizeText(value) {
    return String(value || '').trim().toLowerCase();
  }

  function getTrack() {
    return tracks[state.index] || tracks[0] || null;
  }

  function getTrackKey(track) {
    return String(track && track.id != null ? track.id : state.index);
  }

  function isFavorite(track) {
    return state.favorites.has(getTrackKey(track));
  }

  function loadFavorites() {
    var values = [];
    try {
      var raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) values = JSON.parse(raw);
    } catch (error) {}

    if (!Array.isArray(values) || !values.length) {
      try {
        var legacy = JSON.parse(localStorage.getItem(LEGACY_FAVORITES_KEY) || '[]');
        if (Array.isArray(legacy)) {
          values = legacy.map(function(item) {
            return typeof item === 'object' ? item.id : item;
          });
        }
      } catch (error) {}
    }

    state.favorites = new Set((values || []).map(function(item) {
      return String(item);
    }).filter(Boolean));
  }

  function saveFavorites() {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(state.favorites)));
    } catch (error) {}
  }

  function loadSavedState() {
    loadFavorites();
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (saved && typeof saved === 'object') {
        state.playMode = MODE_SEQUENCE.indexOf(saved.playMode) >= 0 ? saved.playMode : state.playMode;
        state.currentTime = Number(saved.currentTime) || 0;
        state.volume = Number.isFinite(Number(saved.volume)) ? Number(saved.volume) : state.volume;
        if (saved.trackId != null) {
          var savedIndex = tracks.findIndex(function(track) {
            return String(track.id) === String(saved.trackId);
          });
          if (savedIndex >= 0) state.index = savedIndex;
        }
      }
    } catch (error) {}

    var params = new URLSearchParams(window.location.search);
    var trackParam = params.get('track') || params.get('id');
    if (trackParam) {
      var byId = tracks.findIndex(function(track) {
        return String(track.id) === String(trackParam);
      });
      var byIndex = Number(trackParam);
      if (byId >= 0) state.index = byId;
      else if (Number.isInteger(byIndex) && byIndex >= 0 && byIndex < tracks.length) state.index = byIndex;
    }
  }

  function saveState() {
    var track = getTrack();
    if (!track) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        trackId: track.id,
        currentTime: els.audio ? els.audio.currentTime || 0 : state.currentTime,
        duration: state.duration,
        volume: state.volume,
        playMode: state.playMode,
        updatedAt: Date.now()
      }));
      localStorage.setItem('currentTrackId', String(track.id));
      localStorage.setItem('lastPlayedTrack', JSON.stringify(track));
    } catch (error) {}
  }

  function safeCover(raw) {
    var url = String(raw || '').trim();
    if (!url) return PLACEHOLDER_COVER;
    if (url.indexOf('http://mmbiz.qpic.cn') === 0) return url.replace('http://', 'https://');
    return url;
  }

  function setImage(img, track) {
    if (!img) return;
    var cover = safeCover(track && track.cover);
    img.classList.toggle('is-placeholder', cover === PLACEHOLDER_COVER);
    img.src = cover;
    img.alt = (track && track.title ? track.title : '丽江音悦台') + ' 封面';
  }

  function setIcon(el, name, fallback) {
    if (!el) return;
    el.innerHTML = icons()[name] || fallback || '';
  }

  function hydrateStaticIcons() {
    document.querySelectorAll('[data-icon]').forEach(function(node) {
      var name = node.getAttribute('data-icon');
      var label = node.textContent.trim();
      node.innerHTML = (icons()[name] || '') + (label ? '<span>' + escapeHtml(label) + '</span>' : '');
    });
    setIcon(els.queueCloseBtn, 'close', '×');
  }

  function renderTransportIcons() {
    var playIcon = state.isPlaying ? 'pause' : 'play';
    [els.stagePlayBtn, els.nowPlayBtn].forEach(function(btn) {
      setIcon(btn, playIcon, state.isPlaying ? 'Pause' : 'Play');
      btn.setAttribute('aria-label', state.isPlaying ? '暂停' : '播放');
      btn.setAttribute('aria-pressed', state.isPlaying ? 'true' : 'false');
    });
    [els.stagePrevBtn, els.nowPrevBtn].forEach(function(btn) { setIcon(btn, 'previous', 'Prev'); });
    [els.stageNextBtn, els.nowNextBtn].forEach(function(btn) { setIcon(btn, 'next', 'Next'); });
    [els.stageModeBtn, els.nowModeBtn].forEach(function(btn) {
      setIcon(btn, state.playMode === 'shuffle' ? 'shuffle' : state.playMode === 'repeat-one' ? 'repeatOne' : 'repeat', MODE_LABELS[state.playMode]);
      btn.setAttribute('aria-label', '播放模式：' + MODE_LABELS[state.playMode]);
      btn.title = MODE_LABELS[state.playMode];
    });
    renderFavoriteIcons();
  }

  function renderFavoriteIcons() {
    var track = getTrack();
    var fav = isFavorite(track);
    [els.stageFavBtn, els.nowFavBtn].forEach(function(btn) {
      setIcon(btn, fav ? 'heartFilled' : 'heart', 'Heart');
      btn.classList.toggle('is-favorite', fav);
      btn.setAttribute('aria-label', fav ? '取消收藏当前歌曲' : '收藏当前歌曲');
      btn.setAttribute('aria-pressed', fav ? 'true' : 'false');
    });
  }

  function renderTrack() {
    var track = getTrack();
    if (!track) return;

    document.title = track.title + ' - 丽江音悦台';
    els.stageTitle.textContent = track.title || '未知歌曲';
    els.stageArtist.textContent = track.artist || '未知歌手';
    els.nowTitle.textContent = track.title || '未知歌曲';
    els.nowArtist.textContent = track.artist || '未知歌手';
    setImage(els.stageCover, track);
    setImage(els.nowCover, track);
    if (els.coverGlow) {
      els.coverGlow.style.background = 'rgba(72, 214, 197, 0.22)';
    }

    if (els.audio.src !== track.src) {
      els.audio.src = track.src || '';
      els.audio.load();
    }
    els.audio.volume = state.volume;
    renderTransportIcons();
    renderQueue();
    fetchLyrics(track);
    saveState();
  }

  function renderQueue() {
    if (!els.queueList) return;
    var filter = normalizeText(state.queueFilter);
    var visible = tracks.map(function(track, index) {
      return { track: track, index: index };
    }).filter(function(item) {
      if (!filter) return true;
      return normalizeText(item.track.title).indexOf(filter) >= 0 || normalizeText(item.track.artist).indexOf(filter) >= 0;
    });

    if (!visible.length) {
      els.queueList.innerHTML = '<p class="empty-state">没有找到匹配的歌曲</p>';
      return;
    }

    els.queueList.innerHTML = visible.map(function(item) {
      var track = item.track;
      var active = item.index === state.index;
      var cover = safeCover(track.cover);
      var placeholderClass = cover === PLACEHOLDER_COVER ? ' is-placeholder' : '';
      return '<button type="button" class="queue-item" role="option" data-index="' + item.index + '" aria-current="' + (active ? 'true' : 'false') + '">' +
        '<img class="queue-cover' + placeholderClass + '" src="' + escapeHtml(cover) + '" alt="' + escapeHtml(track.title || '歌曲') + ' 封面" loading="lazy">' +
        '<span class="queue-copy"><strong class="queue-title">' + escapeHtml(track.title || '未知歌曲') + '</strong><span class="queue-artist">' + escapeHtml(track.artist || '未知歌手') + '</span></span>' +
        '<span class="queue-meta">' + escapeHtml(formatTime(track.duration || 0)) + '</span>' +
      '</button>';
    }).join('');

    requestAnimationFrame(function() {
      var activeEl = els.queueList.querySelector('.queue-item[aria-current="true"]');
      if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
    });
  }

  function parseLrc(raw) {
    var lines = String(raw || '').split(/\r?\n/);
    var parsed = [];
    lines.forEach(function(line) {
      var matches = line.match(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g);
      var text = line.replace(/\[[^\]]+\]/g, '').trim();
      if (!matches || !text) return;
      matches.forEach(function(mark) {
        var parts = mark.match(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/);
        if (!parts) return;
        var ms = parts[3] ? Number(String(parts[3]).padEnd(3, '0').slice(0, 3)) : 0;
        parsed.push({
          time: Number(parts[1]) * 60 + Number(parts[2]) + ms / 1000,
          text: text
        });
      });
    });
    return parsed.sort(function(a, b) { return a.time - b.time; });
  }

  function normalizeLyricsPayload(payload) {
    if (!payload) return [];
    if (Array.isArray(payload.lines)) {
      return payload.lines.map(function(line, index) {
        if (typeof line === 'string') return { time: null, text: line };
        return {
          time: Number.isFinite(Number(line.time)) ? Number(line.time) : null,
          text: String(line.text || line.lyric || '').trim(),
          index: index
        };
      }).filter(function(line) { return line.text; });
    }
    if (payload.lrc && payload.lrc.lyric) return parseLrc(payload.lrc.lyric);
    if (payload.syncedLyrics) return parseLrc(payload.syncedLyrics);
    if (payload.plainLyrics) {
      return payload.plainLyrics.split(/\r?\n/).map(function(text) {
        return { time: null, text: text.trim() };
      }).filter(function(line) { return line.text; });
    }
    return [];
  }

  function renderLyrics(lines, status) {
    state.lyrics = Array.isArray(lines) ? lines : [];
    state.activeLyricIndex = -1;
    if (!state.lyrics.length) {
      els.lyricsLines.innerHTML = '<p class="lyrics-empty">' + escapeHtml(status || '暂无歌词，可手动搜索') + '</p>';
      return;
    }
    els.lyricsLines.innerHTML = state.lyrics.map(function(line, index) {
      return '<p class="lyrics-line" data-index="' + index + '">' + escapeHtml(line.text) + '</p>';
    }).join('');
    updateLyricProgress(true);
  }

  function fetchLyrics(track) {
    renderLyrics([], '暂无歌词，正在尝试匹配');
    var endpoint = window.LYRICS_API_ENDPOINT || '';
    if (!endpoint || !track) {
      renderLyrics([], '暂无歌词，可前往搜索页查找');
      return Promise.resolve();
    }
    var url = endpoint + '?title=' + encodeURIComponent(track.title || '') +
      '&artist=' + encodeURIComponent(track.artist || '') +
      '&id=' + encodeURIComponent(track.id || '');
    return fetch(url)
      .then(function(response) {
        if (!response.ok) throw new Error('lyrics status ' + response.status);
        return response.json();
      })
      .then(function(payload) {
        var lines = normalizeLyricsPayload(payload);
        renderLyrics(lines, lines.length ? '' : '没有找到歌词，可手动搜索');
      })
      .catch(function() {
        renderLyrics([], '没有找到歌词，可手动搜索');
      });
  }

  function updateLyricProgress(force) {
    if (!state.lyrics.length) return;
    var current = els.audio.currentTime || 0;
    var timed = state.lyrics.some(function(line) { return Number.isFinite(Number(line.time)); });
    var nextIndex = 0;
    if (timed) {
      for (var i = 0; i < state.lyrics.length; i++) {
        if (Number(state.lyrics[i].time) <= current + 0.12) nextIndex = i;
        else break;
      }
    } else {
      var duration = els.audio.duration || getTrack().duration || state.lyrics.length;
      nextIndex = Math.min(state.lyrics.length - 1, Math.floor((current / Math.max(duration, 1)) * state.lyrics.length));
    }
    if (!force && nextIndex === state.activeLyricIndex) return;
    state.activeLyricIndex = nextIndex;
    els.lyricsLines.querySelectorAll('.lyrics-line').forEach(function(line) {
      line.classList.toggle('active', Number(line.dataset.index) === nextIndex);
    });
    var active = els.lyricsLines.querySelector('.lyrics-line.active');
    if (active) {
      active.scrollIntoView({ block: 'center', behavior: force ? 'auto' : 'smooth' });
    }
  }

  function loadIndex(index, options) {
    if (!tracks.length) return;
    state.index = (index + tracks.length) % tracks.length;
    state.currentTime = 0;
    renderTrack();
    if (options && options.play) play();
  }

  function play() {
    if (!getTrack()) return;
    var promise = els.audio.play();
    if (promise && promise.then) {
      return promise.then(function() {
        state.isPlaying = true;
        renderTransportIcons();
      }).catch(function() {
        state.isPlaying = false;
        renderTransportIcons();
      });
    } else {
      state.isPlaying = true;
      renderTransportIcons();
      return Promise.resolve();
    }
  }

  function pause() {
    els.audio.pause();
    state.isPlaying = false;
    renderTransportIcons();
    saveState();
  }

  function togglePlay() {
    if (state.isPlaying) pause();
    else play();
  }

  function previous() {
    loadIndex(state.index - 1, { play: state.isPlaying });
  }

  function next(manual, options) {
    var shouldPlay = options && Object.prototype.hasOwnProperty.call(options, 'play')
      ? !!options.play
      : state.isPlaying;
    if (state.playMode === 'shuffle' && !manual) {
      var nextIndex = Math.floor(Math.random() * tracks.length);
      if (tracks.length > 1 && nextIndex === state.index) {
        nextIndex = (nextIndex + 1) % tracks.length;
      }
      loadIndex(nextIndex, { play: shouldPlay });
      return;
    }
    loadIndex(state.index + 1, { play: shouldPlay });
  }

  function toggleFavorite() {
    var track = getTrack();
    var key = getTrackKey(track);
    if (state.favorites.has(key)) state.favorites.delete(key);
    else state.favorites.add(key);
    saveFavorites();
    renderFavoriteIcons();
  }

  function cycleMode() {
    var current = MODE_SEQUENCE.indexOf(state.playMode);
    state.playMode = MODE_SEQUENCE[(current + 1) % MODE_SEQUENCE.length];
    renderTransportIcons();
    saveState();
  }

  function updateProgress() {
    if (state.isSeeking) return;
    var duration = els.audio.duration || getTrack().duration || 0;
    var current = els.audio.currentTime || 0;
    state.duration = duration;
    els.currentTime.textContent = formatTime(current);
    els.durationTime.textContent = formatTime(duration);
    var pct = duration ? Math.max(0, Math.min(100, current / duration * 100)) : 0;
    els.progressFill.style.width = pct + '%';
    els.progressHit.setAttribute('aria-valuenow', String(Math.round(pct)));
    updateLyricProgress(false);
  }

  function seekFromEvent(event) {
    var duration = els.audio.duration || getTrack().duration || 0;
    if (!duration) return;
    var rect = els.progressHit.getBoundingClientRect();
    var clientX = event.clientX;
    var pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    els.audio.currentTime = pct * duration;
    els.progressFill.style.width = (pct * 100) + '%';
    els.currentTime.textContent = formatTime(els.audio.currentTime);
    updateLyricProgress(false);
  }

  function bindProgress() {
    els.progressHit.addEventListener('pointerdown', function(event) {
      event.preventDefault();
      state.isSeeking = true;
      els.progressHit.setPointerCapture(event.pointerId);
      seekFromEvent(event);
    });
    els.progressHit.addEventListener('pointermove', function(event) {
      if (!state.isSeeking) return;
      event.preventDefault();
      seekFromEvent(event);
    });
    els.progressHit.addEventListener('pointerup', function(event) {
      if (!state.isSeeking) return;
      seekFromEvent(event);
      state.isSeeking = false;
      saveState();
    });
    els.progressHit.addEventListener('pointercancel', function() {
      state.isSeeking = false;
    });
    els.progressHit.addEventListener('keydown', function(event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      var delta = event.key === 'ArrowRight' ? 5 : -5;
      els.audio.currentTime = Math.max(0, Math.min((els.audio.duration || 0), (els.audio.currentTime || 0) + delta));
      updateProgress();
    });
  }

  function bindEvents() {
    [els.stagePlayBtn, els.nowPlayBtn].forEach(function(btn) { btn.addEventListener('click', togglePlay); });
    [els.stagePrevBtn, els.nowPrevBtn].forEach(function(btn) { btn.addEventListener('click', previous); });
    [els.stageNextBtn, els.nowNextBtn].forEach(function(btn) { btn.addEventListener('click', function() { next(true); }); });
    [els.stageFavBtn, els.nowFavBtn].forEach(function(btn) { btn.addEventListener('click', toggleFavorite); });
    [els.stageModeBtn, els.nowModeBtn].forEach(function(btn) { btn.addEventListener('click', cycleMode); });
    els.lyricsRetryBtn.addEventListener('click', function() { fetchLyrics(getTrack()); });

    els.queueList.addEventListener('click', function(event) {
      var item = event.target.closest('.queue-item');
      if (!item) return;
      loadIndex(Number(item.dataset.index), { play: true });
      document.body.classList.remove('queue-open');
    });
    els.queueSearchInput.addEventListener('input', function(event) {
      state.queueFilter = event.target.value;
      renderQueue();
    });
    els.queueFilterToggle.addEventListener('click', function() {
      document.body.classList.toggle('queue-filter-open');
      if (document.body.classList.contains('queue-filter-open')) els.queueSearchInput.focus();
    });
    els.topQueueBtn.addEventListener('click', function() {
      document.body.classList.add('queue-open');
    });
    els.queueCloseBtn.addEventListener('click', function() {
      document.body.classList.remove('queue-open');
    });

    els.audio.addEventListener('play', function() {
      state.isPlaying = true;
      renderTransportIcons();
    });
    els.audio.addEventListener('pause', function() {
      if (state.isAutoAdvancing) return;
      state.isPlaying = false;
      renderTransportIcons();
      saveState();
    });
    els.audio.addEventListener('timeupdate', updateProgress);
    els.audio.addEventListener('loadedmetadata', function() {
      state.duration = els.audio.duration || getTrack().duration || 0;
      if (state.currentTime > 0 && state.currentTime < state.duration) {
        els.audio.currentTime = state.currentTime;
        state.currentTime = 0;
      }
      updateProgress();
    });
    els.audio.addEventListener('ended', function() {
      state.isAutoAdvancing = true;
      if (state.playMode === 'repeat-one') {
        els.audio.currentTime = 0;
        Promise.resolve(play()).finally(function() {
          state.isAutoAdvancing = false;
        });
      } else {
        next(false, { play: true });
        setTimeout(function() {
          state.isAutoAdvancing = false;
        }, 600);
      }
    });
    els.audio.addEventListener('error', function() {
      state.isPlaying = false;
      renderTransportIcons();
      els.stageArtist.textContent = (getTrack().artist || '未知歌手') + ' · 音频加载失败';
      if (tracks.length > 1) {
        setTimeout(function() { next(false, { play: true }); }, 1500);
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.target && /input|textarea|select/i.test(event.target.tagName)) return;
      if (event.code === 'Space') {
        event.preventDefault();
        togglePlay();
      }
      if (event.key === 'ArrowLeft' && event.ctrlKey) previous();
      if (event.key === 'ArrowRight' && event.ctrlKey) next(true);
    });

    window.addEventListener('beforeunload', saveState);
    bindProgress();
  }

  function collectElements() {
    els = {
      audio: $('player-audio'),
      stageCover: $('stage-cover'),
      nowCover: $('now-cover'),
      coverGlow: $('cover-glow'),
      stageTitle: $('stage-title'),
      stageArtist: $('stage-artist'),
      nowTitle: $('now-title'),
      nowArtist: $('now-artist'),
      stageFavBtn: $('stage-fav-btn'),
      nowFavBtn: $('now-fav-btn'),
      stagePrevBtn: $('stage-prev-btn'),
      nowPrevBtn: $('now-prev-btn'),
      stagePlayBtn: $('stage-play-btn'),
      nowPlayBtn: $('now-play-btn'),
      stageNextBtn: $('stage-next-btn'),
      nowNextBtn: $('now-next-btn'),
      stageModeBtn: $('stage-mode-btn'),
      nowModeBtn: $('now-mode-btn'),
      lyricsLines: $('lyrics-lines'),
      lyricsRetryBtn: $('lyrics-retry-btn'),
      queueList: $('queue-list'),
      queueSearchInput: $('queue-search-input'),
      queueFilterToggle: $('queue-filter-toggle'),
      topQueueBtn: $('top-queue-btn'),
      queueCloseBtn: $('queue-close-btn'),
      currentTime: $('current-time'),
      durationTime: $('duration-time'),
      progressHit: $('progress-hit'),
      progressFill: $('progress-fill')
    };
  }

  function init() {
    collectElements();
    hydrateStaticIcons();
    if (!tracks.length) {
      els.stageTitle.textContent = '暂无音乐数据';
      els.lyricsLines.innerHTML = '<p class="lyrics-empty">未找到曲库数据</p>';
      return;
    }
    loadSavedState();
    renderTrack();
    bindEvents();
    updateProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
