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
  var activeView = 'all';
  var queueSearchQuery = '';
  var lyricTimer = null;

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
        '点击右侧任意歌曲开始播放，播放器舞台会自动同步。',
        '这里会像音乐产品一样展示歌曲标题、歌手与播放状态。',
        '右侧播放队列支持全部歌曲、收藏和最近播放切换。',
        '底部控制条仍然是真实播放器，拖动进度和切歌都会立刻生效。',
        '后续如果你提供歌词数据，这里可以升级成真正的歌词滚动区域。'
      ];
    } else {
      lines = [
        '正在播放《' + track.title + '》',
        '演唱：' + track.artist,
        '专辑：' + (track.album || '纳西音乐精选'),
        '这首歌已进入沉浸式播放器舞台',
        '右侧可以快速切换到其他歌曲、收藏和最近播放'
      ];
    }

    container.innerHTML = lines.map(function(line, index) {
      var cls = index === 0 ? 'lyric-line active' : 'lyric-line' + (index > 2 ? ' dim' : '');
      return '<div class="' + cls + '">' + line + '</div>';
    }).join('');
  }

  function rotateLyrics() {
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
    renderLyrics(track);
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
  }

  function patchFunctions() {
    if (typeof window.loadTrack === 'function') {
      var originalLoadTrack = window.loadTrack;
      window.loadTrack = function(index) {
        originalLoadTrack(index);
        updateHero(getCurrentTrack());
        updateSidebar();
        renderCurrentQueue();
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
    audio.addEventListener('play', updateSidebar);
    audio.addEventListener('pause', updateSidebar);
    audio.addEventListener('loadedmetadata', updateSidebar);
  }

  function boot() {
    refs();
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
