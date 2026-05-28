(function() {
  'use strict';

  var SEARCH_HISTORY_KEY = 'ljyyt_search_history';
  var LEGACY_SEARCH_HISTORY_KEYS = ['searchHistory', 'search-history', 'recentSearches', 'recent_searches', 'ljyytSearchHistory'];
  var DEFAULT_COVER = 'https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop';
  var GD_MUSIC_API = 'https://music-api.gdstudio.xyz/api.php';
  var activeFilter = 'all';
  var activeSource = 'aggregate';
  var currentResults = { music: [], video: [], playlists: [] };
  var pendingActionTrack = null;

  var sourceMap = {
    aggregate: { label: '聚合搜索', source: 'all' },
    local: { label: '丽江曲库', source: 'local' },
    joox: { label: 'Joox', source: 'joox' },
    netease: { label: '网易云', source: 'netease' },
    kuwo: { label: '酷我', source: 'kuwo' },
    migu: { label: 'Migu', source: 'migu' },
    bilibili: { label: 'B站', source: 'bilibili' },
    _netease: { label: 'Netease', source: '_netease' }
  };

  function iconHtml(name) {
    return (window.LJYYTIcons && window.LJYYTIcons[name]) || '';
  }

  function hydrateIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function(node) {
      node.innerHTML = iconHtml(node.getAttribute('data-icon'));
    });
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '--:--';
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  function readStoredList(key) {
    try {
      var value = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeStoredList(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(Array.isArray(value) ? value : []));
    } catch (error) {}
  }

  function getSearchHistory() {
    var primary = readStoredList(SEARCH_HISTORY_KEY);
    if (primary.length) return primary.filter(Boolean).slice(0, 20);
    for (var i = 0; i < LEGACY_SEARCH_HISTORY_KEYS.length; i++) {
      var legacy = readStoredList(LEGACY_SEARCH_HISTORY_KEYS[i]);
      if (legacy.length) return setSearchHistory(legacy);
    }
    return [];
  }

  function setSearchHistory(list) {
    var seen = {};
    var clean = (list || []).map(function(item) {
      return String(item || '').trim();
    }).filter(function(item) {
      if (!item || seen[item]) return false;
      seen[item] = true;
      return true;
    }).slice(0, 20);
    writeStoredList(SEARCH_HISTORY_KEY, clean);
    return clean;
  }

  function addSearchHistory(query) {
    var q = String(query || '').trim();
    if (!q) return getSearchHistory();
    var old = getSearchHistory().filter(function(item) { return item !== q; });
    return setSearchHistory([q].concat(old));
  }

  function clearSearchHistory() {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    sessionStorage.removeItem(SEARCH_HISTORY_KEY);
    LEGACY_SEARCH_HISTORY_KEYS.forEach(function(key) {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    renderSearchHistory([]);
  }

  function renderSearchHistory(list) {
    var wrap = document.getElementById('search-history');
    var listBox = document.getElementById('history-list');
    if (!wrap || !listBox) return;
    var history = Array.isArray(list) ? list : getSearchHistory();
    wrap.hidden = history.length === 0;
    listBox.innerHTML = history.map(function(item) {
      return '<button class="chip-button" type="button" data-history="' + escapeHtml(item) + '">' + escapeHtml(item) + '</button>';
    }).join('');
    listBox.querySelectorAll('[data-history]').forEach(function(button) {
      button.addEventListener('click', function() {
        var query = this.getAttribute('data-history') || '';
        var input = document.getElementById('hero-search-input');
        if (input) input.value = query;
        submitSearch(query, true);
      });
    });
  }

  function safeCover(value) {
    var source = String(value || DEFAULT_COVER);
    if (!source || source === 'undefined' || source === 'null') return DEFAULT_COVER;
    if (source.indexOf('http://mmbiz.qpic.cn') === 0) {
      source = source.replace(/^http:\/\//i, 'https://');
    }
    return source;
  }

  function getSourceLabel(source) {
    return {
      local: '丽江曲库',
      joox: 'Joox',
      netease: '网易云',
      _netease: 'Netease',
      kuwo: '酷我',
      migu: 'Migu',
      bilibili: 'B站'
    }[source] || sourceMap[source] && sourceMap[source].label || source || '未知';
  }

  function getAggregatedSources() {
    var list = readStoredList('ljyyt_otter_aggregated_sources');
    return list.length ? list : ['local', 'joox', 'netease', 'kuwo', 'bilibili'];
  }

  function normalizeLocalTrack(track) {
    return Object.assign({}, track, {
      id: Number(track.id),
      cover: safeCover(track.cover),
      source: 'local',
      sourceLabel: '丽江曲库',
      urlId: track.id
    });
  }

  function normalizeExternalTrack(track) {
    var source = String(track.source || '');
    var artist = Array.isArray(track.artist) ? track.artist.join(' / ') : String(track.artist || '');
    var picId = String(track.pic_id || '');
    var cover = /^https?:\/\//i.test(picId) || picId.indexOf('//') === 0 ? picId : DEFAULT_COVER;
    var coverApi = '';
    if (picId && cover === DEFAULT_COVER) {
      coverApi = GD_MUSIC_API + '?types=pic&source=' + encodeURIComponent(source) + '&id=' + encodeURIComponent(picId) + '&size=300';
    }
    if (cover.indexOf('//') === 0) cover = 'https:' + cover;
    return {
      id: String(track.id || ''),
      title: String(track.name || track.title || ''),
      artist: artist || '未知歌手',
      album: String(track.album || ''),
      cover: safeCover(cover),
      coverApi: coverApi,
      duration: Number(track.interval || track.duration || 0),
      src: '',
      source: source,
      sourceLabel: getSourceLabel(source),
      urlId: String(track.url_id || track.id || ''),
      lyric_id: String(track.lyric_id || track.id || '')
    };
  }

  async function resolveExternalCover(track) {
    if (!track.coverApi) return track;
    try {
      var response = await fetch(track.coverApi);
      if (!response.ok) return track;
      var payload = await response.json();
      var url = payload && payload.url ? String(payload.url) : '';
      if (url.indexOf('//') === 0) url = 'https:' + url;
      if (/^https?:\/\//i.test(url)) track.cover = safeCover(url);
    } catch (error) {}
    return track;
  }

  async function searchExternalSource(query, source) {
    var url = GD_MUSIC_API + '?types=search&source=' + encodeURIComponent(source) +
      '&name=' + encodeURIComponent(query) + '&count=20&pages=1';
    var response = await fetch(url);
    if (!response.ok) throw new Error(source + ' search failed');
    var payload = await response.json();
    var tracks = Array.isArray(payload)
      ? payload.map(normalizeExternalTrack).filter(function(track) { return track.title; })
      : [];
    return Promise.all(tracks.map(resolveExternalCover));
  }

  async function resolveExternalTrackUrl(track) {
    if (!track || !track.source || !track.urlId) return '';
    var url = GD_MUSIC_API + '?types=url&source=' + encodeURIComponent(track.source) +
      '&id=' + encodeURIComponent(track.urlId) + '&br=192';
    try {
      var response = await fetch(url);
      if (!response.ok) return '';
      var payload = await response.json();
      return payload && payload.url ? String(payload.url).replace(/^http:\/\//i, 'https://') : '';
    } catch (error) {
      return '';
    }
  }

  function getLocalResults(query) {
    var q = String(query || '').toLowerCase();
    if (!q || typeof musicData === 'undefined') return [];
    return musicData.filter(function(track) {
      return [track.title, track.artist, track.album].some(function(value) {
        return String(value || '').toLowerCase().indexOf(q) !== -1;
      });
    }).slice(0, 60).map(normalizeLocalTrack);
  }

  function getVideoResults(query) {
    var q = String(query || '').toLowerCase();
    if (!q || typeof videoData === 'undefined') return [];
    return videoData.filter(function(video) {
      return [video.title, video.artist, video.description].some(function(value) {
        return String(value || '').toLowerCase().indexOf(q) !== -1;
      });
    }).slice(0, 30).map(function(video) {
      return Object.assign({}, video, { cover: safeCover(video.cover) });
    });
  }

  function getPlaylistCards(query) {
    var q = String(query || '').toLowerCase();
    var playlists = readStoredList('ljyyt_otter_playlists').map(function(item, index) {
      var tracks = Array.isArray(item.tracks) ? item.tracks : [];
      return {
        id: 'user-' + index,
        name: item.name || item.title || '未命名歌单',
        count: tracks.length || Number(item.count || 0),
        type: 'user',
        icon: 'album'
      };
    });

    var base = [
      { id: 'liked', name: '我喜欢的音乐', count: readStoredList('ljyyt_otter_favorites').length, type: 'favorite', icon: 'heart' },
      { id: 'history', name: '最近播放', count: readStoredList('ljyyt_otter_history').length, type: 'history', icon: 'history' },
      { id: 'library', name: '丽江曲库', count: typeof musicData !== 'undefined' ? musicData.length : 0, type: 'library', icon: 'database' },
      { id: 'mv', name: 'MV 视频', count: typeof videoData !== 'undefined' ? videoData.length : 0, type: 'video', icon: 'video' }
    ];

    var all = playlists.concat(base);
    if (!q) return all;
    return all.filter(function(item) {
      return String(item.name || '').toLowerCase().indexOf(q) !== -1 || item.type === 'library' || item.type === 'video';
    });
  }

  async function runSearch(query) {
    var provider = sourceMap[activeSource] || sourceMap.aggregate;
    var providerSource = provider.source;
    var localResults = providerSource === 'local' || providerSource === 'all' ? getLocalResults(query) : [];
    var externalResults = [];

    if (providerSource === 'all') {
      var externalSources = getAggregatedSources().filter(function(source) { return source !== 'local'; });
      var sets = await Promise.all(externalSources.map(function(source) {
        return searchExternalSource(query, source).catch(function() { return []; });
      }));
      externalResults = sets.reduce(function(acc, list) { return acc.concat(list); }, []);
    } else if (providerSource !== 'local') {
      externalResults = await searchExternalSource(query, providerSource).catch(function() { return []; });
    }

    return {
      music: localResults.concat(externalResults),
      video: providerSource === 'all' || providerSource === 'local' ? getVideoResults(query) : [],
      playlists: getPlaylistCards(query)
    };
  }

  function renderTrackRows(tracks) {
    var box = document.getElementById('music-results');
    if (!box) return;
    if (!tracks.length) {
      box.innerHTML = '<div class="empty-state"><strong>没有找到歌曲</strong><span>换个关键词，或切换到聚合搜索试试。</span></div>';
      return;
    }
    box.innerHTML = tracks.map(function(track, index) {
      var cover = track.cover && track.cover !== DEFAULT_COVER
        ? '<img src="' + escapeHtml(track.cover) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">'
        : iconHtml('music');
      return '<button class="track-row" type="button" data-kind="track" data-index="' + index + '">' +
        '<span class="row-cover">' + cover + '</span>' +
        '<span class="row-main"><span class="row-title">' + escapeHtml(track.title || '未知歌曲') + '</span>' +
        '<span class="row-sub"><span>' + escapeHtml(track.artist || '未知歌手') + '</span><span class="row-source">' + escapeHtml(track.sourceLabel || getSourceLabel(track.source)) + '</span></span></span>' +
        '<span class="row-actions"><span class="row-duration">' + formatTime(track.duration) + '</span>' +
        '<span class="row-more" data-action="more" aria-label="更多操作">' + iconHtml('more') + '</span></span>' +
      '</button>';
    }).join('');
    bindResultRows(box);
  }

  function renderVideoRows(videos) {
    var box = document.getElementById('video-results');
    if (!box) return;
    if (!videos.length) {
      box.innerHTML = '<div class="empty-state"><strong>没有找到视频</strong><span>MV 视频目前来自本站视频库。</span></div>';
      return;
    }
    box.innerHTML = videos.map(function(video, index) {
      var cover = video.cover
        ? '<img src="' + escapeHtml(video.cover) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">'
        : iconHtml('video');
      return '<button class="video-row" type="button" data-kind="video" data-index="' + index + '">' +
        '<span class="row-cover">' + cover + '</span>' +
        '<span class="row-main"><span class="row-title">' + escapeHtml(video.title || '未命名视频') + '</span>' +
        '<span class="row-sub"><span>' + escapeHtml(video.artist || '未知') + '</span><span class="row-source">MV</span></span></span>' +
        '<span class="row-actions"><span class="row-duration">' + formatTime(video.duration) + '</span>' +
        '<span class="row-more">' + iconHtml('play') + '</span></span>' +
      '</button>';
    }).join('');
    bindResultRows(box);
  }

  function renderPlaylists(playlists) {
    var box = document.getElementById('playlist-results');
    if (!box) return;
    if (!playlists.length) {
      box.innerHTML = '<div class="empty-state"><strong>还没有歌单</strong><span>到“我的”里新建或导入歌单后，这里会显示。</span></div>';
      return;
    }
    box.innerHTML = playlists.map(function(item) {
      return '<button class="playlist-card" type="button" data-playlist="' + escapeHtml(item.id) + '">' +
        '<span class="playlist-cover">' + iconHtml(item.icon || 'album') + '</span>' +
        '<span><strong>' + escapeHtml(item.name) + '</strong><span>' + Number(item.count || 0) + ' 首/个</span></span>' +
      '</button>';
    }).join('');
    box.querySelectorAll('[data-playlist]').forEach(function(button) {
      button.addEventListener('click', function() {
        var id = this.getAttribute('data-playlist');
        if (id === 'mv') {
          location.href = 'videos.html';
        } else if (id === 'library') {
          location.href = 'player.html';
        } else {
          location.href = 'index.html?view=mine';
        }
      });
    });
  }

  function bindResultRows(root) {
    root.querySelectorAll('.track-row').forEach(function(row) {
      row.addEventListener('click', function(event) {
        var index = Number(row.getAttribute('data-index'));
        var track = currentResults.music[index];
        if (!track) return;
        if (event.target.closest('[data-action="more"]')) {
          event.stopPropagation();
          openActionSheet(track);
          return;
        }
        playTrack(track);
      });
    });
    root.querySelectorAll('.video-row').forEach(function(row) {
      row.addEventListener('click', function() {
        var index = Number(row.getAttribute('data-index'));
        var video = currentResults.video[index];
        if (video) location.href = 'video-player.html?id=' + encodeURIComponent(video.id) + '&autoplay=true';
      });
    });
  }

  function displayResults(results, query) {
    currentResults = results || { music: [], video: [], playlists: [] };
    var status = document.getElementById('search-status');
    var total = currentResults.music.length + currentResults.video.length + currentResults.playlists.length;
    if (status) {
      status.textContent = query
        ? '找到 ' + total + ' 个相关内容 · 来源：' + (sourceMap[activeSource] && sourceMap[activeSource].label || '聚合搜索')
        : '输入关键词搜索歌曲、歌手、MV，也可以直接进入歌单。';
    }
    renderTrackRows(currentResults.music);
    renderVideoRows(currentResults.video);
    renderPlaylists(currentResults.playlists);
    applyFilter(activeFilter);
  }

  function applyFilter(filter) {
    activeFilter = filter || 'all';
    document.querySelectorAll('.result-tab').forEach(function(tab) {
      tab.classList.toggle('active', tab.getAttribute('data-filter') === activeFilter);
    });
    ['music', 'playlist', 'video'].forEach(function(name) {
      var section = document.getElementById(name + '-section');
      if (section) section.classList.toggle('hidden', activeFilter !== 'all' && activeFilter !== name && !(activeFilter === 'playlists' && name === 'playlist'));
    });
  }

  function submitSearch(query, saveHistory) {
    query = String(query || '').trim();
    if (!query) return;
    if (saveHistory) addSearchHistory(query);
    var url = new URL(location.href);
    url.searchParams.set('q', query);
    url.searchParams.set('source', activeSource);
    history.replaceState(null, '', url.toString());
    performSearch(query);
    renderSearchHistory();
  }

  async function performSearch(query) {
    var status = document.getElementById('search-status');
    if (status) status.textContent = '正在搜索 "' + query + '" ...';
    try {
      var results = await runSearch(query);
      displayResults(results, query);
    } catch (error) {
      if (status) status.textContent = '搜索暂时不可用，请稍后重试。';
      displayResults({ music: [], video: [], playlists: getPlaylistCards(query) }, query);
    }
  }

  function updateBottomPlayer(track) {
    var title = document.getElementById('current-title');
    var artist = document.getElementById('current-artist');
    var cover = document.getElementById('current-cover');
    if (title) title.textContent = track.title || '未知歌曲';
    if (artist) {
      if (typeof setArtistElementContent === 'function') {
        setArtistElementContent(artist, track.artist || '未知歌手', false);
      } else {
        artist.textContent = track.artist || '未知歌手';
      }
    }
    if (cover) cover.src = safeCover(track.cover);
  }

  async function playTrack(track) {
    if (!track) return;
    if (track.source === 'local') {
      playLocalTrack(track);
      return;
    }
    updateBottomPlayer(track);
    var url = track.src || await resolveExternalTrackUrl(track);
    if (!url) {
      openActionSheet(Object.assign({}, track, { error: '暂时无法解析该音源播放地址' }));
      return;
    }
    track.src = url;
    if (typeof audioPlayer !== 'undefined' && audioPlayer) {
      audioPlayer.src = url;
      audioPlayer.play().then(function() {
        isPlaying = true;
        if (typeof updatePlayButton === 'function') updatePlayButton();
      }).catch(function() {
        isPlaying = false;
        if (typeof updatePlayButton === 'function') updatePlayButton();
      });
    }
  }

  function playLocalTrack(track) {
    if (typeof musicData === 'undefined') return;
    var id = Number(track.id);
    var raw = musicData.find(function(item) { return Number(item.id) === id; });
    if (!raw) return;
    currentTrackIndex = musicData.findIndex(function(item) { return Number(item.id) === id; });
    isPlaying = true;
    updateBottomPlayer(raw);
    if (typeof audioPlayer !== 'undefined' && audioPlayer) {
      audioPlayer.src = raw.src;
      audioPlayer.play().then(function() {
        isPlaying = true;
        if (typeof updatePlayButton === 'function') updatePlayButton();
        if (typeof savePlayerState === 'function') {
          savePlayerState(raw.id, audioPlayer.currentTime, true, raw, audioPlayer.volume);
        }
      }).catch(function() {
        isPlaying = false;
        if (typeof updatePlayButton === 'function') updatePlayButton();
      });
    }
  }

  function openActionSheet(track) {
    pendingActionTrack = track;
    var scrim = document.getElementById('search-action-scrim');
    var sheet = document.getElementById('search-action-sheet');
    if (!sheet || !scrim) return;
    var cover = track.cover && track.cover !== DEFAULT_COVER
      ? '<img src="' + escapeHtml(track.cover) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">'
      : iconHtml('music');
    sheet.innerHTML = '<div class="action-track"><span class="row-cover">' + cover + '</span><span><strong>' +
      escapeHtml(track.title || '未知歌曲') + '</strong><span>' + escapeHtml(track.artist || '未知歌手') + ' · ' +
      escapeHtml(track.sourceLabel || getSourceLabel(track.source)) + '</span></span></div>' +
      (track.error ? '<div class="empty-state"><strong>' + escapeHtml(track.error) + '</strong></div>' : '') +
      '<button type="button" data-sheet-action="play">' + iconHtml('play') + '播放</button>' +
      '<button type="button" data-sheet-action="player">' + iconHtml('album') + '进入播放页</button>' +
      '<button type="button" data-sheet-action="playlist">' + iconHtml('plus') + '添加到歌单</button>' +
      '<button type="button" data-sheet-action="close">' + iconHtml('close') + '关闭</button>';
    scrim.classList.add('open');
    sheet.classList.add('open');
    sheet.querySelectorAll('[data-sheet-action]').forEach(function(button) {
      button.addEventListener('click', handleSheetAction);
    });
  }

  function closeActionSheet() {
    document.getElementById('search-action-scrim')?.classList.remove('open');
    document.getElementById('search-action-sheet')?.classList.remove('open');
  }

  function handleSheetAction(event) {
    var action = event.currentTarget.getAttribute('data-sheet-action');
    var track = pendingActionTrack;
    if (action === 'play' && track) {
      closeActionSheet();
      playTrack(track);
    } else if (action === 'player' && track) {
      closeActionSheet();
      if (track.source === 'local') {
        location.href = 'player.html?track=' + encodeURIComponent(track.id);
      } else {
        playTrack(track);
      }
    } else if (action === 'playlist') {
      closeActionSheet();
      location.href = 'index.html?view=mine';
    } else {
      closeActionSheet();
    }
  }

  function setupSourcePicker() {
    var picker = document.getElementById('source-picker');
    var button = document.getElementById('source-button');
    var label = document.getElementById('source-label');
    if (!picker || !button || !label) return;
    var requested = getUrlParameter('source');
    if (sourceMap[requested]) activeSource = requested;
    label.textContent = sourceMap[activeSource].label;
    picker.querySelectorAll('[data-source]').forEach(function(option) {
      option.classList.toggle('active', option.getAttribute('data-source') === activeSource);
      option.addEventListener('click', function() {
        activeSource = this.getAttribute('data-source') || 'aggregate';
        label.textContent = sourceMap[activeSource].label;
        picker.classList.remove('open');
        picker.querySelectorAll('[data-source]').forEach(function(item) {
          item.classList.toggle('active', item.getAttribute('data-source') === activeSource);
        });
        var input = document.getElementById('hero-search-input');
        if (input && input.value.trim()) submitSearch(input.value.trim(), false);
      });
    });
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      picker.classList.toggle('open');
    });
    document.addEventListener('click', function(event) {
      if (!picker.contains(event.target)) picker.classList.remove('open');
    });
  }

  function setupSearchForm() {
    var form = document.getElementById('search-form');
    var input = document.getElementById('hero-search-input');
    var clear = document.getElementById('history-clear');
    if (form && input) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitSearch(input.value, true);
      });
    }
    if (clear) clear.addEventListener('click', clearSearchHistory);
  }

  function setupTabs() {
    document.querySelectorAll('.result-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        applyFilter(this.getAttribute('data-filter') || 'all');
      });
    });
  }

  function restorePlayerStateIfPossible() {
    if (window._playerStateRestored || typeof restorePlayerState !== 'function' || typeof hasSavedPlayerState !== 'function' || !hasSavedPlayerState()) return;
    try {
      var saved = restorePlayerState();
      if (saved && saved.trackData) updateBottomPlayer(saved.trackData);
    } catch (error) {}
  }

  function waitForData(callback) {
    var started = Date.now();
    var timer = setInterval(function() {
      if (typeof musicData !== 'undefined' && typeof videoData !== 'undefined') {
        clearInterval(timer);
        callback();
      } else if (Date.now() - started > 6000) {
        clearInterval(timer);
        var status = document.getElementById('search-status');
        if (status) status.textContent = '曲库数据加载失败，请刷新页面重试。';
      }
    }, 80);
  }

  document.addEventListener('DOMContentLoaded', function() {
    hydrateIcons(document);
    document.querySelectorAll('input[type="search"], input[name="q"], #hero-search-input, #nav-search-input').forEach(function(input) {
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('autocorrect', 'off');
      input.setAttribute('autocapitalize', 'none');
      input.setAttribute('spellcheck', 'false');
      input.setAttribute('inputmode', 'search');
    });
    setupSourcePicker();
    setupSearchForm();
    setupTabs();
    document.getElementById('search-action-scrim')?.addEventListener('click', closeActionSheet);
    renderSearchHistory();
    restorePlayerStateIfPossible();

    waitForData(function() {
      var query = getUrlParameter('q');
      var input = document.getElementById('hero-search-input');
      if (input && query) input.value = query;
      displayResults({ music: [], video: [], playlists: getPlaylistCards(query) }, query);
      if (query) performSearch(query);
    });
  });
})();
