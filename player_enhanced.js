/**
 * 丽江音悦台 - 播放器增强模块 v2
 * 收藏 / 随机播放 / 单曲循环 / 自动下一首 / 键盘快捷键 / 播放历史 / 分享 / 深色模式
 */
(function() {
  'use strict';

  var STORAGE = {
    favorites: 'ljyyt_favorites',
    history: 'ljyyt_play_history',
    playMode: 'ljyyt_play_mode',
    darkMode: 'ljyyt_dark_mode',
    playCount: 'ljyyt_play_count'
  };

  var playMode = localStorage.getItem(STORAGE.playMode) || 'order';
  var favorites = [];
  var playHistory = [];
  var playCounts = {};

  // ========== 初始化 ==========
  function init() {
    loadFavorites();
    loadHistory();
    loadPlayCounts();
    initPlayMode();
    initKeyboardShortcuts();
    initAutoNext();
    injectUI();
    if (localStorage.getItem(STORAGE.darkMode) === 'true') {
      document.body.classList.add('dark-mode');
    }
    console.log('🎵 播放器增强模块 v2 已加载');
  }

  // ========== 收藏 ==========
  function loadFavorites() {
    try { favorites = JSON.parse(localStorage.getItem(STORAGE.favorites)) || []; }
    catch(e) { favorites = []; }
  }
  function saveFavorites() {
    localStorage.setItem(STORAGE.favorites, JSON.stringify(favorites));
  }
  function isFav(id) { return favorites.indexOf(id) !== -1; }
  function toggleFav(id) {
    if (!id && typeof currentTrackIndex !== 'undefined' && typeof musicData !== 'undefined') {
      var t = musicData[currentTrackIndex];
      if (t) id = t.id;
    }
    if (!id) return;
    var idx = favorites.indexOf(id);
    if (idx !== -1) { favorites.splice(idx, 1); toast('已取消收藏'); }
    else { favorites.push(id); toast('已收藏 ❤️', 'success'); }
    saveFavorites();
    updateFavBtn(id);
  }
  function updateFavBtn(id) {
    var btn = document.getElementById('btn-fav');
    if (!btn) return;
    var liked = isFav(id);
    btn.innerHTML = liked ? '<i class="fas fa-heart" style="color:#ff6b6b"></i>' : '<i class="fas fa-heart" style="color:rgba(255,255,255,0.5)"></i>';
    btn.title = liked ? '取消收藏' : '收藏';
  }

  // ========== 历史 ==========
  function loadHistory() {
    try { playHistory = JSON.parse(localStorage.getItem(STORAGE.history)) || []; }
    catch(e) { playHistory = []; }
  }
  function saveHistory() {
    if (playHistory.length > 50) playHistory = playHistory.slice(0, 50);
    localStorage.setItem(STORAGE.history, JSON.stringify(playHistory));
  }
  function addHistory(track) {
    if (!track) return;
    playHistory = playHistory.filter(function(h) { return h.id !== track.id; });
    playHistory.unshift({ id: track.id, title: track.title, artist: track.artist, cover: track.cover, time: Date.now() });
    saveHistory();
  }

  // ========== 播放计数 ==========
  function loadPlayCounts() {
    try { playCounts = JSON.parse(localStorage.getItem(STORAGE.playCount)) || {}; }
    catch(e) { playCounts = {}; }
  }
  function savePlayCounts() {
    localStorage.setItem(STORAGE.playCount, JSON.stringify(playCounts));
  }
  function incrementPlayCount(trackId) {
    playCounts[trackId] = (playCounts[trackId] || 0) + 1;
    savePlayCounts();
  }

  // ========== 播放模式 ==========
  function initPlayMode() {
    playMode = localStorage.getItem(STORAGE.playMode) || 'order';
    updateModeBtn();
  }
  function cycleMode() {
    var modes = ['order', 'repeat-all', 'repeat-one', 'shuffle'];
    var idx = modes.indexOf(playMode);
    playMode = modes[(idx + 1) % modes.length];
    localStorage.setItem(STORAGE.playMode, playMode);
    updateModeBtn();
    var labels = { 'order': '顺序播放', 'repeat-all': '列表循环', 'repeat-one': '单曲循环', 'shuffle': '随机播放' };
    toast(labels[playMode]);
  }
  function updateModeBtn() {
    var btn = document.getElementById('btn-mode');
    if (!btn) return;
    var icons = {
      'order': '<i class="fas fa-list-ol"></i>',
      'repeat-all': '<i class="fas fa-redo"></i>',
      'repeat-one': '<i class="fas fa-redo"></i><small style="font-size:0.5em;position:relative;top:-2px;left:-3px;font-weight:bold">1</small>',
      'shuffle': '<i class="fas fa-random"></i>'
    };
    btn.innerHTML = icons[playMode] || icons['order'];
  }
  function getNextIdx() {
    if (typeof musicData === 'undefined' || musicData.length === 0) return 0;
    if (playMode === 'repeat-one') return currentTrackIndex;
    if (playMode === 'shuffle') {
      if (musicData.length <= 1) return 0;
      var n; do { n = Math.floor(Math.random() * musicData.length); } while (n === currentTrackIndex);
      return n;
    }
    var n = currentTrackIndex + 1;
    if (n >= musicData.length) return playMode === 'repeat-all' ? 0 : currentTrackIndex;
    return n;
  }
  function getPrevIdx() {
    if (typeof musicData === 'undefined' || musicData.length === 0) return 0;
    if (playMode === 'shuffle') {
      if (musicData.length <= 1) return 0;
      var p; do { p = Math.floor(Math.random() * musicData.length); } while (p === currentTrackIndex);
      return p;
    }
    var p = currentTrackIndex - 1;
    if (p < 0) return playMode === 'repeat-all' ? musicData.length - 1 : 0;
    return p;
  }

  // ========== 自动下一首 ==========
  function initAutoNext() {
    var audio = document.getElementById('audio-player');
    if (!audio) return;
    audio.addEventListener('ended', function() {
      if (playMode === 'repeat-one') { audio.currentTime = 0; audio.play(); return; }
      var next = getNextIdx();
      if (playMode === 'order' && next === currentTrackIndex) {
        if (typeof isPlaying !== 'undefined') isPlaying = false;
        if (typeof updatePlayButton === 'function') updatePlayButton();
        return;
      }
      currentTrackIndex = next;
      if (typeof loadTrack === 'function') { loadTrack(currentTrackIndex); if (typeof playMusic === 'function') playMusic(); }
      if (typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
        addHistory(musicData[currentTrackIndex]);
        updateFavBtn(musicData[currentTrackIndex].id);
      }
    });
  }

  // ========== 键盘快捷键 ==========
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch(e.code) {
        case 'Space':
          e.preventDefault();
          if (typeof togglePlay === 'function') togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (e.ctrlKey) {
            currentTrackIndex = getNextIdx();
            if (typeof loadTrack === 'function') { loadTrack(currentTrackIndex); if (typeof playMusic === 'function') playMusic(); }
          } else {
            var a = document.getElementById('audio-player');
            if (a && a.duration) a.currentTime = Math.min(a.currentTime + 5, a.duration);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (e.ctrlKey) {
            currentTrackIndex = getPrevIdx();
            if (typeof loadTrack === 'function') { loadTrack(currentTrackIndex); if (typeof playMusic === 'function') playMusic(); }
          } else {
            var a = document.getElementById('audio-player');
            if (a) a.currentTime = Math.max(a.currentTime - 5, 0);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          var a = document.getElementById('audio-player');
          var s = document.getElementById('volume-slider');
          if (a) { a.volume = Math.min(a.volume + 0.1, 1); if (s) s.value = a.volume; }
          break;
        case 'ArrowDown':
          e.preventDefault();
          var a = document.getElementById('audio-player');
          var s = document.getElementById('volume-slider');
          if (a) { a.volume = Math.max(a.volume - 0.1, 0); if (s) s.value = a.volume; }
          break;
        case 'KeyF':
          if (!e.ctrlKey) { e.preventDefault(); toggleFav(); }
          break;
        case 'KeyM':
          e.preventDefault();
          var a = document.getElementById('audio-player');
          if (a) a.muted = !a.muted;
          break;
      }
    });
    console.log('⌨️ 快捷键: 空格=播放, ←→=进退, ↑↓=音量, F=收藏, M=静音, Ctrl+←/→=切歌');
  }

  // ========== 注入 UI ==========
  function injectUI() {
    injectDarkModeBtn();
    injectPlayerControls();
    injectPlaylistPanel();
    injectPlayerButtons();
    injectCoverPreview();
    injectSortBar();
    injectArtistFilter();
  }

  // 深色模式按钮 → 放在导航栏搜索框右边
  function injectDarkModeBtn() {
    var searchForm = document.querySelector('.navbar form');
    if (!searchForm) return;
    var btn = document.createElement('button');
    btn.id = 'btn-dark';
    btn.type = 'button';
    btn.className = 'btn btn-outline-light btn-sm';
    btn.style.cssText = 'border-radius:50%;width:38px;height:38px;padding:0;display:inline-flex;align-items:center;justify-content:center;font-size:0.9rem;transition:all 0.3s;margin-left:12px;flex-shrink:0';
    btn.title = '切换深色模式';
    updateDarkBtn(btn, document.body.classList.contains('dark-mode'));
    btn.onclick = function() {
      var dark = document.body.classList.toggle('dark-mode');
      localStorage.setItem(STORAGE.darkMode, dark);
      updateDarkBtn(btn, dark);
      toast(dark ? '深色模式 🌙' : '浅色模式 ☀️');
    };
    searchForm.appendChild(btn);
  }
  function updateDarkBtn(btn, dark) {
    btn.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    btn.title = dark ? '切换到浅色模式' : '切换到深色模式';
  }

  // 底部播放器按钮: 播放模式 / 收藏 / 分享 / 播放列表
  function injectPlayerControls() {
    var controls = document.querySelector('.bottom-player .player-controls');
    if (!controls) return;

    // 播放模式按钮 (放最前面)
    var modeBtn = mkBtn('btn-mode', '播放模式', cycleMode);
    controls.insertBefore(modeBtn, controls.firstChild);

    // 收藏 / 分享 / 播放列表 (依次追加到 controls 末尾, 即 next-btn 后面)
    var favBtn = mkBtn('btn-fav', '收藏', function() { toggleFav(); });
    favBtn.innerHTML = '<i class="fas fa-heart" style="color:rgba(255,255,255,0.5)"></i>';
    controls.appendChild(favBtn);

    var shareBtn = mkBtn('btn-share', '分享', shareTrack);
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
    controls.appendChild(shareBtn);

    var listBtn = mkBtn('btn-list', '播放列表', togglePlaylistPanel);
    listBtn.innerHTML = '<i class="fas fa-list-ul"></i>';
    controls.appendChild(listBtn);

    updateModeBtn();
  }
  function mkBtn(id, title, onclick) {
    var b = document.createElement('button');
    b.id = id;
    b.className = 'btn btn-outline-light btn-sm ms-1';
    b.style.cssText = 'font-size:0.7rem;padding:3px 7px';
    b.title = title;
    b.onclick = onclick;
    return b;
  }

  // ========== 播放列表面板 ==========
  var panelVisible = false;

  function injectPlaylistPanel() {
    var panel = document.createElement('div');
    panel.id = 'playlist-panel';
    panel.className = 'playlist-panel';
    panel.innerHTML =
      '<div class="playlist-panel-header">' +
        '<div class="playlist-panel-tabs">' +
          '<button class="pltab active" data-tab="playlist"><i class="fas fa-music me-1"></i>播放列表</button>' +
          '<button class="pltab" data-tab="favorites"><i class="fas fa-heart me-1"></i>收藏</button>' +
          '<button class="pltab" data-tab="history"><i class="fas fa-history me-1"></i>最近播放</button>' +
        '</div>' +
        '<button class="playlist-panel-close" id="panel-close"><i class="fas fa-times"></i></button>' +
      '</div>' +
      '<div class="playlist-panel-body" id="panel-body"></div>';
    document.body.appendChild(panel);

    // 关闭按钮
    document.getElementById('panel-close').onclick = function() { togglePlaylistPanel(); };

    // 标签切换
    panel.querySelectorAll('.pltab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        panel.querySelectorAll('.pltab').forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        renderPanelTab(this.getAttribute('data-tab'));
      });
    });
  }

  function togglePlaylistPanel() {
    panelVisible = !panelVisible;
    var panel = document.getElementById('playlist-panel');
    if (!panel) return;
    panel.classList.toggle('show', panelVisible);
    if (panelVisible) {
      // 默认显示当前标签
      var activeTab = panel.querySelector('.pltab.active');
      renderPanelTab(activeTab ? activeTab.getAttribute('data-tab') : 'playlist');
    }
  }

  function renderPanelTab(tab) {
    var body = document.getElementById('panel-body');
    if (!body) return;

    if (tab === 'playlist') {
      renderPanelList(body, typeof musicData !== 'undefined' ? musicData : []);
    } else if (tab === 'favorites') {
      loadFavorites();
      var favTracks = (typeof musicData !== 'undefined') ? musicData.filter(function(t) { return isFav(t.id); }) : [];
      renderPanelList(body, favTracks);
    } else if (tab === 'history') {
      loadHistory();
      var tracks = [];
      playHistory.forEach(function(h) {
        var t = (typeof musicData !== 'undefined') ? musicData.find(function(m) { return m.id === h.id; }) : null;
        if (t) tracks.push(t);
      });
      renderPanelList(body, tracks);
    }
  }

  function renderPanelList(container, tracks) {
    if (!tracks || tracks.length === 0) {
      container.innerHTML = '<div class="panel-empty"><i class="fas fa-inbox"></i><p>暂无内容</p></div>';
      return;
    }
    var html = '';
    tracks.forEach(function(t, i) {
      var active = (typeof currentTrackIndex !== 'undefined' && typeof musicData !== 'undefined' && musicData[currentTrackIndex] && musicData[currentTrackIndex].id === t.id);
      html +=
        '<div class="panel-item' + (active ? ' active' : '') + '" data-id="' + t.id + '">' +
          '<img src="' + t.cover + '" class="panel-item-cover" loading="lazy">' +
          '<div class="panel-item-info">' +
            '<div class="panel-item-title">' + t.title + '</div>' +
            '<div class="panel-item-artist">' + t.artist + '</div>' +
          '</div>' +
          (active ? '<i class="fas fa-volume-up panel-item-playing"></i>' : '') +
        '</div>';
    });
    container.innerHTML = html;

    container.querySelectorAll('.panel-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var id = parseInt(this.getAttribute('data-id'));
        if (typeof musicData !== 'undefined') {
          var idx = musicData.findIndex(function(t) { return t.id === id; });
          if (idx !== -1) {
            currentTrackIndex = idx;
            if (typeof loadTrack === 'function') loadTrack(idx);
            if (typeof playMusic === 'function') playMusic();
            // 更新高亮
            container.querySelectorAll('.panel-item').forEach(function(el) { el.classList.remove('active'); });
            this.classList.add('active');
          }
        }
      });
    });
  }

  // ========== 分享 ==========
  function shareTrack() {
    if (typeof musicData === 'undefined' || !musicData[currentTrackIndex]) return;
    var track = musicData[currentTrackIndex];
    var url = window.location.origin + window.location.pathname + '?track=' + track.id;
    var text = '🎵 ' + track.title + ' - ' + track.artist + ' | 丽江音悦台';
    if (navigator.share) {
      navigator.share({ title: track.title, text: text, url: url }).catch(function() {});
    } else {
      var ta = document.createElement('textarea');
      ta.value = text + '\n' + url;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast('链接已复制 📋', 'success');
    }
  }

  // ========== URL 分享链接 ==========
  function handleShareLink() {
    var params = new URLSearchParams(window.location.search);
    var tid = params.get('track');
    if (tid && typeof musicData !== 'undefined') {
      tid = parseInt(tid);
      var idx = musicData.findIndex(function(t) { return t.id === tid; });
      if (idx !== -1) {
        setTimeout(function() {
          currentTrackIndex = idx;
          if (typeof loadTrack === 'function') loadTrack(idx);
          if (typeof playMusic === 'function') playMusic();
        }, 1000);
      }
    }
  }

  // ========== loadTrack 补丁 ==========
  function patchLoadTrack() {
    var orig = window.loadTrack;
    if (!orig) return;
    window.loadTrack = function(index) {
      orig(index);
      if (typeof musicData !== 'undefined' && musicData[index]) {
        updateFavBtn(musicData[index].id);
        addHistory(musicData[index]);
        updatePageTitle(musicData[index], isPlaying);
      }
    };

    // 补丁 playMusic 增加播放计数
    var origPlay = window.playMusic;
    if (origPlay) {
      window.playMusic = function() {
        origPlay();
        if (typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
          incrementPlayCount(musicData[currentTrackIndex].id);
        }
      };
    }

    // 补丁 prevTrack/nextTrack 以支持播放模式
    window.prevTrack = function() {
      console.log('⏮️ 上一首');
      currentTrackIndex = getPrevIdx();
      loadTrack(currentTrackIndex);
      if (isPlaying) playMusic();
    };
    window.nextTrack = function() {
      console.log('⏭️ 下一首');
      currentTrackIndex = getNextIdx();
      loadTrack(currentTrackIndex);
      if (isPlaying) playMusic();
    };
  }

  // ========== 浏览器标题 ==========
  var originalTitle = document.title;
  function updatePageTitle(track, playing) {
    if (track && playing) {
      document.title = '♪ ' + track.title + ' - ' + track.artist + ' | 丽江音悦台';
    } else if (track) {
      document.title = '⏸ ' + track.title + ' | 丽江音悦台';
    } else {
      document.title = originalTitle;
    }
  }

  // 监听播放状态变化更新标题
  function patchPlayState() {
    var origPlay = window.playMusic;
    var origPause = window.pauseMusic;
    if (origPlay) {
      window.playMusic = function() {
        origPlay();
        if (typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
          updatePageTitle(musicData[currentTrackIndex], true);
        }
      };
    }
    if (origPause) {
      window.pauseMusic = function() {
        origPause();
        if (typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
          updatePageTitle(musicData[currentTrackIndex], false);
        }
      };
    }
  }

  // ========== 播放速度 ==========
  var speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  var currentSpeedIdx = 2; // 默认 1x

  function cycleSpeed() {
    currentSpeedIdx = (currentSpeedIdx + 1) % speeds.length;
    var speed = speeds[currentSpeedIdx];
    var audio = document.getElementById('audio-player');
    if (audio) audio.playbackRate = speed;
    var btn = document.getElementById('btn-speed');
    if (btn) btn.innerHTML = '<span style="font-size:0.6rem;font-weight:bold">' + speed + 'x</span>';
    toast('播放速度: ' + speed + 'x', 'info');
  }

  function injectPlayerButtons() {
    var controls = document.querySelector('.bottom-player .player-controls');
    if (!controls) return;
    var speedBtn = mkBtn('btn-speed', '播放速度', cycleSpeed);
    speedBtn.innerHTML = '<span style="font-size:0.6rem;font-weight:bold">1x</span>';
    controls.appendChild(speedBtn);
  }

  // ========== 音乐列表排序 ==========
  var currentSort = 'default';
  var sortAsc = true; // true=升序, false=降序
  var sortedData = null;
  var sortPage = 1;
  var sortPerPage = 20;

  function injectSortBar() {
    var musicList = document.getElementById('music-list');
    if (!musicList) return;
    var bar = document.createElement('div');
    bar.className = 'd-flex align-items-center gap-2 mb-3 flex-wrap';
    bar.style.cssText = 'margin-top:10px';
    bar.innerHTML =
      '<span style="font-size:0.8rem;color:#999;margin-right:4px">排序:</span>' +
      '<button class="btn btn-sm sort-btn active" data-sort="default">默认</button>' +
      '<button class="btn btn-sm sort-btn" data-sort="title">歌名 <i class="fas fa-sort" style="font-size:0.65rem"></i></button>' +
      '<button class="btn btn-sm sort-btn" data-sort="artist">歌手 <i class="fas fa-sort" style="font-size:0.65rem"></i></button>' +
      '<button class="btn btn-sm sort-btn" data-sort="duration">时长 <i class="fas fa-sort" style="font-size:0.65rem"></i></button>';
    musicList.parentNode.insertBefore(bar, musicList);
    bar.querySelectorAll('.sort-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sort = this.getAttribute('data-sort');
        if (sort === 'default') {
          // 恢复默认
          bar.querySelectorAll('.sort-btn').forEach(function(b) { b.classList.remove('active'); });
          this.classList.add('active');
          currentSort = 'default';
          sortAsc = true;
          sortedData = null;
          updateSortIcons(bar, '');
          if (typeof renderMusicList === 'function') renderMusicList();
          if (typeof renderMusicPagination === 'function') renderMusicPagination();
          return;
        }
        // 切换排序字段或方向
        if (currentSort === sort) {
          sortAsc = !sortAsc; // 同字段，翻转方向
        } else {
          currentSort = sort;
          sortAsc = true; // 新字段，默认升序
        }
        bar.querySelectorAll('.sort-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        sortPage = 1;
        updateSortIcons(bar, sort);
        applySort();
      });
    });
  }

  function updateSortIcons(bar, activeSort) {
    bar.querySelectorAll('.sort-btn').forEach(function(btn) {
      var s = btn.getAttribute('data-sort');
      var icon = btn.querySelector('i');
      if (!icon) return;
      if (s === activeSort && s !== 'default') {
        icon.className = sortAsc ? 'fas fa-sort-up' : 'fas fa-sort-down';
      } else if (s !== 'default') {
        icon.className = 'fas fa-sort';
      }
    });
  }

  function applySort() {
    if (typeof musicData === 'undefined') return;
    sortedData = musicData.slice();
    var cmp;
    switch(currentSort) {
      case 'title': cmp = function(a, b) { return a.title.localeCompare(b.title, 'zh'); }; break;
      case 'artist': cmp = function(a, b) { return a.artist.localeCompare(b.artist, 'zh'); }; break;
      case 'duration': cmp = function(a, b) { return (a.duration||0) - (b.duration||0); }; break;
      default: cmp = function(a, b) { return a.id - b.id; };
    }
    sortedData.sort(cmp);
    if (!sortAsc) sortedData.reverse();
    renderSortPage();
  }

  function renderSortPage() {
    if (!sortedData) return;
    var container = document.getElementById('music-list');
    if (!container) return;

    var total = sortedData.length;
    var totalPages = Math.ceil(total / sortPerPage);
    if (sortPage > totalPages) sortPage = totalPages;
    var start = (sortPage - 1) * sortPerPage;
    var end = Math.min(start + sortPerPage, total);
    var pageData = sortedData.slice(start, end);

    container.innerHTML = '';
    pageData.forEach(function(track, i) {
      var actualIndex = musicData.findIndex(function(t) { return t.id === track.id; });
      var col = document.createElement('div');
      col.className = 'col-md-6 col-lg-3 mb-3 card-enter';
      col.style.animationDelay = (i * 0.05) + 's';
      var card = document.createElement('div');
      card.className = 'card music-card';
      if (actualIndex === currentTrackIndex) card.classList.add('active');
      card.dataset.id = track.id;
      card.dataset.index = actualIndex;
      card.innerHTML =
        '<div class="card-body d-flex align-items-center p-2">' +
          '<img src="'+track.cover+'" alt="'+track.title+'" class="album-cover me-2" loading="lazy" decoding="async">' +
          '<div class="flex-grow-1 overflow-hidden"><h6 class="card-title mb-1 text-truncate" title="'+track.title+'">'+track.title+'</h6>' +
          '<div class="d-flex align-items-center"><p class="card-text text-muted mb-0 small text-truncate me-2">'+track.artist+'</p>' +
          '<small class="text-muted track-duration">'+formatTime(track.duration)+'</small></div></div>' +
          '<i class="fas fa-music text-primary ms-2 card-music-icon"></i></div>';
      card.addEventListener('click', function() {
        currentTrackIndex = actualIndex;
        loadTrack(currentTrackIndex);
        playMusic();
        updateMusicListHighlight();
      });
      col.appendChild(card);
      container.appendChild(col);
    });

    // 渲染分页
    renderSortPagination(totalPages);
  }

  function renderSortPagination(totalPages) {
    var pag = document.getElementById('music-pagination');
    if (!pag) return;
    if (totalPages <= 1) { pag.innerHTML = ''; return; }

    var html = '<button class="btn btn-sm btn-outline-primary page-btn" ' + (sortPage <= 1 ? 'disabled' : '') + ' onclick="changeSortPage(-1)"><i class="fas fa-chevron-left"></i></button>';

    var startP = Math.max(1, sortPage - 2);
    var endP = Math.min(totalPages, sortPage + 2);
    if (startP > 1) html += '<button class="btn btn-sm btn-outline-primary page-btn" onclick="changeSortPageTo(1)">1</button>';
    if (startP > 2) html += '<span class="px-1 text-muted">...</span>';
    for (var i = startP; i <= endP; i++) {
      html += '<button class="btn btn-sm ' + (i === sortPage ? 'btn-primary' : 'btn-outline-primary') + ' page-btn" onclick="changeSortPageTo(' + i + ')">' + i + '</button>';
    }
    if (endP < totalPages - 1) html += '<span class="px-1 text-muted">...</span>';
    if (endP < totalPages) html += '<button class="btn btn-sm btn-outline-primary page-btn" onclick="changeSortPageTo(' + totalPages + ')">' + totalPages + '</button>';

    html += '<button class="btn btn-sm btn-outline-primary page-btn" ' + (sortPage >= totalPages ? 'disabled' : '') + ' onclick="changeSortPage(1)"><i class="fas fa-chevron-right"></i></button>';
    html += '<span class="text-muted small ms-2">' + sortPage + '/' + totalPages + '</span>';
    pag.innerHTML = html;
  }

  // 全局分页函数
  window.changeSortPage = function(dir) {
    sortPage += dir;
    renderSortPage();
    var section = document.querySelector('.content-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  window.changeSortPageTo = function(page) {
    sortPage = page;
    renderSortPage();
    var section = document.querySelector('.content-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  function injectArtistFilter() {
    var artistEl = document.getElementById('current-artist');
    if (!artistEl) return;
    artistEl.style.cursor = 'pointer';
    artistEl.title = '查看歌手详情';
    artistEl.addEventListener('click', function(e) {
      e.stopPropagation();
      if (typeof musicData === 'undefined') return;
      var track = musicData[currentTrackIndex];
      if (!track) return;
      window.location.href = 'artist.html?name=' + encodeURIComponent(track.artist);
    });
  }

  // ========== 封面大图预览 ==========
  function injectCoverPreview() {
    // 创建遮罩层
    var overlay = document.createElement('div');
    overlay.id = 'cover-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:999999;display:none;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;backdrop-filter:blur(10px)';
    overlay.innerHTML =
      '<img id="cover-large" src="" style="max-width:80vw;max-height:70vh;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.5);object-fit:contain">' +
      '<div id="cover-large-info" style="color:white;text-align:center;margin-top:20px;font-size:1.1rem"></div>' +
      '<div style="position:absolute;top:20px;right:25px;color:rgba(255,255,255,0.6);font-size:1.5rem;cursor:pointer" id="cover-close"><i class="fas fa-times"></i></div>';
    document.body.appendChild(overlay);

    // 点击关闭
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay || e.target.id === 'cover-close' || e.target.closest('#cover-close')) {
        overlay.style.display = 'none';
      }
    });

    // 点击底部播放器封面打开预览
    var coverImg = document.getElementById('current-cover');
    if (coverImg) {
      coverImg.style.cursor = 'pointer';
      coverImg.addEventListener('click', function(e) {
        e.stopPropagation();
        if (typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
          var track = musicData[currentTrackIndex];
          document.getElementById('cover-large').src = track.cover;
          document.getElementById('cover-large-info').innerHTML = '<strong>' + track.title + '</strong><br><span style="opacity:0.7">' + track.artist + '</span>';
          overlay.style.display = 'flex';
        }
      });
    }

    // ESC 关闭
    document.addEventListener('keydown', function(e) {
      if (e.code === 'Escape' && overlay.style.display === 'flex') {
        overlay.style.display = 'none';
      }
    });
  }

  // ========== loadTrack 补丁 ==========
  function patchLoadTrack() {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type === 'success' ? 'success' : 'info');
      return;
    }
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;top:80px;right:20px;padding:12px 20px;border-radius:10px;color:#fff;font-size:14px;z-index:99999;opacity:0;transition:all 0.3s;backdrop-filter:blur(10px);' +
      (type === 'success' ? 'background:linear-gradient(135deg,#667eea,#764ba2)' : 'background:rgba(0,0,0,0.75)');
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function() { el.style.opacity = '1'; }, 50);
    setTimeout(function() { el.style.opacity = '0'; setTimeout(function() { el.remove(); }, 300); }, 2000);
  }

  // ========== 启动 ==========
  function boot() {
    init();
    patchLoadTrack();
    patchPlayState();
    handleShareLink();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(boot, 500); });
  } else {
    setTimeout(boot, 500);
  }

})();
