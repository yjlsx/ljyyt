    const views = document.querySelectorAll('.view');
    const sourceMenu = document.getElementById('source-menu');
    const aggregateSourcePanel = document.getElementById('aggregate-source-panel');
    const providerButton = document.getElementById('provider-button');
    const ljyytApiBase = window.LJYYT_API_BASE || 'https://ljyyt-api.yjlsx0.workers.dev';
    const lyricsApiBase = window.LYRICS_API_ENDPOINT || (ljyytApiBase + '/api/lyrics');
    const neteaseApiBase = ljyytApiBase + '/api/netease';
    const neteaseFallbackBases = ['https://otter-music.pages.dev/music-api/netease'];
    const audioApiEndpoint = String(window.AUDIO_API_ENDPOINT || '').trim().replace(/\/+$/, '');
    const useSameOriginAudioApi = window.LJYYT_ENABLE_SAME_ORIGIN_AUDIO_API === true ||
      String(window.LJYYT_ENABLE_SAME_ORIGIN_AUDIO_API || '').toLowerCase() === 'true';
    const gdMusicApiBase = '/api/gd-music';
    const gdMusicFallbackBases = ['https://otter-music.pages.dev/music-api', ljyytApiBase + '/api/gd-music', 'https://music-api.gdstudio.xyz/api.php'];
    const SEARCH_RESULT_LIMIT = 100;
    function isLocalDevHostname(hostname) {
      hostname = String(hostname || '');
      return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
    }
    var _isLocalDev = isLocalDevHostname(location.hostname);
    const qqApiBase = (_isLocalDev || useSameOriginAudioApi) ? '/api/qq' : (ljyytApiBase + '/api/qq');
    const qqFallbackProxyBase = 'https://otter-music.pages.dev/music-api/qqmusic/proxy';
    async function fetchGdMusicJson(url, signal) {
      var urls = [url];
      if (url.indexOf(gdMusicApiBase) === 0) {
        var suffix = url.slice(gdMusicApiBase.length);
        gdMusicFallbackBases.forEach(function(base) { urls.push(base + suffix); });
      }
      if (!_isLocalDev && urls[0].indexOf(gdMusicApiBase) === 0) urls.shift();
      if (!urls.length) throw new Error('gd music request failed');
      if (signal && signal.aborted) throw new DOMException('Aborted', 'AbortError');
      var ac = new AbortController();
      var merged = ac.signal;
      if (signal) signal.addEventListener('abort', function() { ac.abort(); });
      var timer = setTimeout(function() { ac.abort(); }, 10000);
      try {
        var result = await Promise.any(urls.map(function(u) {
          return fetch(u, { signal: merged }).then(function(r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
          });
        }));
        clearTimeout(timer);
        ac.abort();
        return result;
      } catch (aggErr) {
        clearTimeout(timer);
        if (signal && signal.aborted) throw new DOMException('Aborted', 'AbortError');
        throw new Error('gd music request failed');
      }
    }
    function iconHtml(name) {
      return (window.LJYYTIcons && window.LJYYTIcons[name]) || '';
    }
    function normalizeFallbackToastMessage(message) {
      var text = String(message || '');
      var resolvingText = '正在解析' + '播放地址';
      var backupLineText = '备用' + '线路';
      if (text.indexOf(resolvingText) >= 0 || text.indexOf(backupLineText) >= 0) {
        if (/已切换|已自动切换|成功/.test(text)) {
          try {
            return '已自动切换至: ' + getTrackSourceDisplayName(currentTrack);
          } catch (error) {
            return '已自动切换至: 可用音源';
          }
        }
        return '';
      }
      return text;
    }
    function showToast(message, duration) {
      message = normalizeFallbackToastMessage(message);
      if (!message) return;
      var existing = document.querySelector('.ljyyt-toast');
      if (existing) existing.remove();
      var el = document.createElement('div');
      el.className = 'ljyyt-toast';
      el.textContent = message;
      document.body.appendChild(el);
      requestAnimationFrame(function() { el.classList.add('show'); });
      setTimeout(function() {
        el.classList.remove('show');
        setTimeout(function() { el.remove(); }, 300);
      }, duration || 3000);
    }
    function showConfirm(message, onConfirm) {
      var overlay = document.createElement('div');
      overlay.className = 'ljyyt-confirm-overlay';
      overlay.innerHTML =
        '<div class="ljyyt-confirm-box">' +
          '<p>' + escapeMarkup(message) + '</p>' +
          '<div class="ljyyt-confirm-btns">' +
            '<button class="ljyyt-confirm-cancel">取消</button>' +
            '<button class="ljyyt-confirm-ok">确定</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(overlay);
      requestAnimationFrame(function() { overlay.classList.add('show'); });
      function close() {
        overlay.classList.remove('show');
        setTimeout(function() { overlay.remove(); }, 200);
      }
      overlay.querySelector('.ljyyt-confirm-cancel').onclick = close;
      overlay.querySelector('.ljyyt-confirm-ok').onclick = function() { close(); onConfirm(); };
      overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    }
    function hydrateIcons(root) {
      (root || document).querySelectorAll('[data-icon]').forEach(function(node) {
        var name = node.getAttribute('data-icon');
        var html = iconHtml(name);
        if (html) node.innerHTML = html;
      });
    }
    const providerSourceMap = {
      '聚合搜索': 'all',
      '丽江曲库': 'local',
      'Joox': 'joox',
      'QQ音乐': 'qq',
      '小秋音乐': 'lx_qq',
      '网易云音乐': 'netease',
      '酷我音乐': 'kuwo',
      '小蜗音乐': 'lx_kuwo',
      'Migu': 'migu',
      'B站': 'bilibili',
      'Netease': '_netease'
    };
    const sourceDisplayOrder = ['local', 'joox', 'qq', 'lx_qq', 'netease', 'kuwo', 'lx_kuwo', 'migu', 'bilibili', '_netease'];
    const aggregateSourceLabels = {
      local: '丽江曲库',
      joox: 'Joox',
      qq: 'QQ音乐',
      lx_qq: '小秋音乐',
      netease: '网易云音乐',
      migu: 'Migu',
      kuwo: '酷我音乐',
      lx_kuwo: '小蜗音乐',
      bilibili: 'B站',
      _netease: 'Netease'
    };
    const defaultEnabledSources = ['local', 'joox', 'qq', 'lx_qq', 'netease', 'kuwo', 'lx_kuwo', 'bilibili'];
    let libraryLoaded = false;
    let videosLoaded = false;
    let libraryTracks = [];
    let currentTrackIndex = 0;
    let activeProvider = '聚合搜索';
    let activeSearchFilter = 'songs';
    let currentSearchState = { songs: [], playlists: [], videos: [] };
    let currentMarketPlaylistTracks = [];
    let currentMarketPlaylistMeta = null;
    let searchVideoCache = [];
    let sourceConfigs = readSourceConfigs();
    let aggregatedSources = getEnabledSourceOrder();
    let lyricsRequestId = 0;
    let currentLyrics = { lines: [], synced: [], source: 'empty', activeIndex: -1 };
    let playQueue = [];
    let queueIndex = 0;
    let queueDrawerTab = 'queue';
    let volumeStep = 3;
    let blurredBackground = true;
    const playModes = [
      { label: '列表循环', value: 'list' },
      { label: '单曲循环', value: 'single' },
      { label: '随机播放', value: 'shuffle' }
    ];
    let playModeIndex = readStoredPlayModeIndex(localStorage, playModes.length);
    let lastLikeTapAt = 0;
    let currentTrack = {
      title: '快乐人生',
      artist: '和月圆',
      src: 'https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4NTQ=',
      cover: 'https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7N7s5enKLic15fx5DKYlTe6R5hBaC2WqqF3rZ22IrqsMY9qWWGD7KuDzzWNA9Z6RWag31oaw7M5NSDMK5fiaRP1mSMfRuLicUzVFU/0?wx_fmt=jpeg',
      duration: 223
    };
    let favoriteTracks = readStoredObjectList('ljyyt_otter_favorites');
    let historyTracks = readStoredObjectList('ljyyt_otter_history');
    let userPlaylists = normalizeStoredPlaylists(readStoredObjectList('ljyyt_otter_playlists'));
    const SEARCH_HISTORY_KEY = 'ljyyt_search_history';
    const LEGACY_SEARCH_HISTORY_KEYS = [
      'ljyyt_otter_search_history',
      'searchHistory',
      'search-history',
      'recentSearches',
      'recent_searches',
      'ljyytSearchHistory'
    ];
    let searchHistory = getSearchHistory();
    let playlistImportTab = 'link';
    let pendingPlaylistTrack = null;
    let restoredPlaybackTime = 0;
    let neteaseLoginTimer = null;
    let searchSuggestionRequestId = 0;
    var searchAbortController = null;
    const audioPlayer = document.getElementById('audio-player');
    const DEFAULT_COVER = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="20" y1="12" x2="102" y2="110" gradientUnits="userSpaceOnUse"><stop stop-color="#f4f7f6"/><stop offset="1" stop-color="#dbe6e3"/></linearGradient></defs><rect width="120" height="120" rx="24" fill="url(#g)"/><circle cx="60" cy="60" r="33" fill="#f9fbfa" stroke="#c8d5d1" stroke-width="2"/><circle cx="60" cy="60" r="10" fill="#d7e1de"/><path d="M71 38v28.5a9.5 9.5 0 1 1-5.8-8.7V43.6l-16 3.2v24.7a9.5 9.5 0 1 1-5.8-8.7V42.2L71 38z" fill="#8fa19b"/></svg>');
    function readStoredList(key) {
      const value = readStoredJson(key, []);
      return Array.isArray(value) ? value : [];
    }
    function filterStoredObjectList(value) {
      return Array.isArray(value)
        ? value.filter(function(item) { return item && typeof item === 'object' && !Array.isArray(item); })
        : [];
    }
    function readStoredObjectList(key) {
      const value = readStoredJson(key, []);
      return filterStoredObjectList(value);
    }
    function normalizeStoredPlaylists(list) {
      return filterStoredObjectList(list).map(function(playlist) {
        var tracks = filterStoredObjectList(playlist.tracks);
        return Object.assign({}, playlist, { tracks: tracks, count: tracks.length });
      });
    }
    function readStoredJson(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (error) {
        return fallback;
      }
    }
    function writeStoredList(key, value) {
      writeStoredJson(key, value);
    }
    function writeStoredJson(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {}
    }
    function writeStoredValue(key, value) {
      try {
        localStorage.setItem(key, String(value));
      } catch (error) {}
    }
    function removeStoredItem(key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {}
    }
    function removeSessionItem(key) {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {}
    }
    function normalizeSourceConfigs(value, legacySources) {
      var configMap = {};
      if (Array.isArray(value)) {
        value.forEach(function(item) {
          if (!item || typeof item !== 'object') return;
          var source = String(item.source || '').trim();
          if (!source || sourceDisplayOrder.indexOf(source) < 0) return;
          configMap[source] = {
            source: source,
            enabled: item.enabled !== false,
            showInPicker: item.showInPicker !== false
          };
        });
      }
      var legacyList = Array.isArray(legacySources) && legacySources.length
        ? legacySources.map(function(source) { return String(source || '').trim(); }).filter(Boolean)
        : defaultEnabledSources.slice();
      var configuredOrder = Array.isArray(value)
        ? value.map(function(item) { return item && String(item.source || '').trim(); }).filter(Boolean)
        : [];
      var ordered = [];
      var seenSources = new Set();
      configuredOrder.concat(legacyList, sourceDisplayOrder).forEach(function(source) {
        if (sourceDisplayOrder.indexOf(source) < 0 || seenSources.has(source)) return;
        var existing = configMap[source];
        seenSources.add(source);
        ordered.push(existing || {
          source: source,
          enabled: legacyList.indexOf(source) >= 0,
          showInPicker: true
        });
      });
      return ordered;
    }
    function readSourceConfigs() {
      return normalizeSourceConfigs(
        readStoredJson('ljyyt_otter_source_configs', []),
        readStoredList('ljyyt_otter_aggregated_sources')
      );
    }
    function getEnabledSourceOrder() {
      return sourceConfigs
        .filter(function(item) { return item && item.enabled !== false; })
        .map(function(item) { return item.source; });
    }
    function getSourceConfig(source) {
      source = String(source || '').trim();
      return sourceConfigs.find(function(item) { return item.source === source; }) || null;
    }
    function saveSourceConfigs() {
      aggregatedSources = getEnabledSourceOrder();
      writeStoredJson('ljyyt_otter_source_configs', sourceConfigs);
      writeStoredList('ljyyt_otter_aggregated_sources', aggregatedSources);
    }
    function readStoredPlayModeIndex(storage, modeCount) {
      try {
        var count = Number.isFinite(modeCount) && modeCount > 0 ? Math.floor(modeCount) : 3;
        var raw = Number((storage || localStorage).getItem('ljyyt_play_mode_index'));
        if (!Number.isFinite(raw)) return 0;
        var normalized = Math.floor(raw) % count;
        return normalized < 0 ? normalized + count : normalized;
      } catch (error) {
        return 0;
      }
    }
    function getSearchHistory() {
      const primary = readStoredJson(SEARCH_HISTORY_KEY, []);
      if (Array.isArray(primary) && primary.length) return setSearchHistory(primary);
      for (const key of LEGACY_SEARCH_HISTORY_KEYS) {
        const legacy = readStoredJson(key, []);
        if (Array.isArray(legacy) && legacy.length) return setSearchHistory(legacy);
      }
      return [];
    }
    function setSearchHistory(list) {
      const clean = Array.from(new Set((list || []).map((item) => String(item || '').trim()).filter(Boolean))).slice(0, 20);
      writeStoredJson(SEARCH_HISTORY_KEY, clean);
      return clean;
    }
    function clearStoredSearchHistory() {
      removeStoredItem(SEARCH_HISTORY_KEY);
      removeSessionItem(SEARCH_HISTORY_KEY);
      LEGACY_SEARCH_HISTORY_KEYS.forEach((key) => {
        removeStoredItem(key);
        removeSessionItem(key);
      });
    }
    function readStoredObject(key) {
      const value = readStoredJson(key, null);
      if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
      return value;
    }
    function writeStoredObject(key, value) {
      writeStoredJson(key, value);
    }
    const SETTINGS_KEY = 'ljyyt_otter_settings';
    const defaultSettings = {
      smartSource: true,
      showSourceLabels: true,
      embedCover: true,
      embedLyrics: true,
      volume: 100,
      fullBackgroundMode: 'cover',
      theme: 'light'
    };
    function normalizeAppSettings(stored) {
      var normalized = Object.assign({}, defaultSettings);
      if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return normalized;
      ['smartSource', 'showSourceLabels', 'embedCover', 'embedLyrics'].forEach(function(key) {
        if (typeof stored[key] === 'boolean') normalized[key] = stored[key];
      });
      var volume = Number(stored.volume);
      if (Number.isFinite(volume)) normalized.volume = Math.max(0, Math.min(100, Math.round(volume)));
      if (stored.fullBackgroundMode === 'theme' || stored.fullBackgroundMode === 'cover' || stored.fullBackgroundMode === 'texture') {
        normalized.fullBackgroundMode = stored.fullBackgroundMode;
      }
      if (stored.theme === 'dark' || stored.theme === 'light') normalized.theme = stored.theme;
      return normalized;
    }
    let appSettings = normalizeAppSettings(readStoredObject(SETTINGS_KEY));
    function saveAppSettings() {
      writeStoredObject(SETTINGS_KEY, appSettings);
    }
    function escapeMarkup(value) {
      return String(value || '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      })[char]);
    }
    function safeCover(value) {
      const source = String(value || DEFAULT_COVER);
      return source.replace(/^http:\/\//i, 'https://');
    }
    function imageFallbackAttr() {
      return " onerror=\"this.onerror=null;this.src='" + DEFAULT_COVER + "';\" alt=\"\"";
    }
    function setCoverImage(image, cover) {
      if (!image) return;
      image.alt = '';
      image.onerror = function() {
        this.onerror = null;
        this.src = DEFAULT_COVER;
      };
      image.src = safeCover(cover);
    }
    async function readSourceArray(path, declaration) {
      const response = await fetch(path);
      const text = await response.text();
      const start = text.indexOf(declaration);
      const arrayStart = text.indexOf('[', start);
      const arrayEnd = text.indexOf('\n];', arrayStart);
      if (start < 0 || arrayStart < 0 || arrayEnd < 0) throw new Error('数据格式无法识别');
      return Function('"use strict"; return (' + text.slice(arrayStart, arrayEnd + 2) + ');')();
    }
    function parseTrackDuration(value) {
      if (value == null || value === '') return 0;
      if (typeof value === 'string' && value.indexOf(':') >= 0) {
        var parts = value.split(':').map(function(part) { return Number(part) || 0; });
        return parts.reduce(function(total, part) { return total * 60 + part; }, 0);
      }
      var duration = Number(value) || 0;
      if (!Number.isFinite(duration)) return 0;
      if (duration > 10000) duration = duration / 1000;
      return Math.max(0, duration);
    }
    function formatDuration(seconds) {
      const total = Math.max(0, Math.round(parseTrackDuration(seconds)));
      return Math.floor(total / 60) + ':' + String(total % 60).padStart(2, '0');
    }
    function getSeekableDuration() {
      return parseTrackDuration(audioPlayer && audioPlayer.duration) ||
        parseTrackDuration(currentTrack && currentTrack.duration);
    }
    function clampSeekTime(seekTime, duration) {
      var value = Number(seekTime);
      var limit = parseTrackDuration(duration);
      if (!Number.isFinite(value) || value < 0) value = 0;
      if (!limit) return 0;
      return Math.max(0, Math.min(value, limit));
    }
    function seekAudioToTime(seekTime) {
      var duration = getSeekableDuration();
      if (!duration) return false;
      audioPlayer.currentTime = clampSeekTime(seekTime, duration);
      var current = document.getElementById('current-time');
      var line = document.getElementById('seek-line');
      var progress = Math.min(100, Math.max(0, audioPlayer.currentTime / duration * 100));
      if (current) current.textContent = formatDuration(audioPlayer.currentTime);
      if (line) line.style.setProperty('--audio-progress', progress + '%');
      updateMiniProgress(progress);
      return true;
    }
    function getTrackKey(track) {
      return [track && track.source || 'local', track && (track.urlId || track.id || track.src || track.title) || ''].join(':');
    }
    function isSameTrack(a, b) {
      return getTrackKey(a) === getTrackKey(b);
    }
    const TRADITIONAL_CHINESE_MAP = {
      '會': '会', '愛': '爱', '樂': '乐', '夢': '梦', '風': '风', '雲': '云', '聽': '听', '說': '说',
      '話': '话', '妳': '你', '祢': '你', '牠': '它', '祂': '他', '來': '来', '過': '过', '還': '还',
      '這': '这', '那': '那', '裡': '里', '裏': '里', '麼': '么', '為': '为', '與': '与', '給': '给',
      '讓': '让', '誰': '谁', '對': '对', '錯': '错', '無': '无', '別': '别', '離': '离', '開': '开',
      '關': '关', '長': '长', '門': '门', '間': '间', '時': '时', '後': '后', '前': '前', '點': '点',
      '聲': '声', '歲': '岁', '萬': '万', '個': '个', '們': '们', '從': '从', '當': '当', '應': '应',
      '樣': '样', '體': '体', '國': '国', '華': '华', '倫': '伦', '潔': '洁', '麗': '丽', '龍': '龙',
      '鳳': '凤', '葉': '叶', '麥': '麦', '黃': '黄', '張': '张', '劉': '刘', '陳': '陈', '楊': '杨',
      '趙': '赵', '鄭': '郑', '孫': '孙', '羅': '罗', '蕭': '萧', '許': '许', '謝': '谢', '鄧': '邓',
      '劍': '剑', '緣': '缘', '戀': '恋', '單': '单', '雙': '双', '盡': '尽', '滿': '满', '淚': '泪',
      '藍': '蓝', '貝': '贝', '貓': '猫', '魚': '鱼', '鳥': '鸟', '馬': '马', '島': '岛', '東': '东',
      '西': '西', '南': '南', '北': '北', '廣': '广', '廈': '厦', '灣': '湾', '臺': '台', '台': '台',
      '舊': '旧', '寫': '写', '讀': '读', '尋': '寻', '終': '终', '輕': '轻', '難': '难', '癡': '痴',
      '學': '学', '愛': '爱', '樂': '乐', '風': '风', '選': '选', '經': '经', '傷': '伤',
      '歡': '欢', '強': '强'
    };
    function normalizeTrackText(value) {
      return String(value || '').trim().toLowerCase().normalize('NFKC')
        .replace(/[\u3400-\u9fff]/g, function(char) { return TRADITIONAL_CHINESE_MAP[char] || char; })
        .replace(/[^\w\u4e00-\u9fff]+/g, '');
    }
    function findLibraryTrackMatch(track, tracks) {
      if (!track || !Array.isArray(tracks)) return null;
      var id = normalizeTrackText(track.urlId || track.url_id || track.id);
      var src = normalizeTrackText(track.src);
      var title = normalizeTrackText(track.title);
      var artist = normalizeTrackText(track.artist);
      return tracks.find(function(item) {
        if (!item) return false;
        var itemId = normalizeTrackText(item.urlId || item.url_id || item.id);
        var itemSrc = normalizeTrackText(item.src);
        if (id && itemId && id === itemId) return true;
        if (src && itemSrc && src === itemSrc) return true;
        return title && normalizeTrackText(item.title) === title &&
          (!artist || normalizeTrackText(item.artist) === artist);
      }) || null;
    }
    function getSelectedPlaybackSources() {
      var sources = typeof getEnabledSourceOrder === 'function'
        ? getEnabledSourceOrder()
        : (Array.isArray(aggregatedSources) ? aggregatedSources : []);
      return sources
        .map(function(source) { return String(source || '').trim(); })
        .filter(function(source, index, list) {
          return source && source !== 'local' && source !== 'all' && list.indexOf(source) === index;
        });
    }
    function getGlobalFallbackPlaybackSources() {
      var preferred = typeof getEnabledSourceOrder === 'function'
        ? getEnabledSourceOrder()
        : (Array.isArray(aggregatedSources) ? aggregatedSources : []);
      var builtInFallbackSources = ['joox', 'qq', 'lx_qq', 'netease', 'kuwo', 'lx_kuwo', 'bilibili', '_netease', 'migu'];
      var defaults = typeof defaultEnabledSources !== 'undefined' && Array.isArray(defaultEnabledSources) ? defaultEnabledSources : builtInFallbackSources;
      var allSources = typeof sourceDisplayOrder !== 'undefined' && Array.isArray(sourceDisplayOrder) ? sourceDisplayOrder : builtInFallbackSources;
      return preferred.concat(defaults, allSources)
        .map(function(source) { return String(source || '').trim(); })
        .filter(function(source, index, list) {
          return source && source !== 'local' && source !== 'all' && list.indexOf(source) === index;
        });
    }
    function getFallbackSearchSources(track) {
      var preferred = typeof getEnabledSourceOrder === 'function'
        ? getEnabledSourceOrder()
        : (Array.isArray(aggregatedSources) ? aggregatedSources : []);
      var builtInFallbackSources = ['joox', 'qq', 'lx_qq', 'netease', 'kuwo', 'lx_kuwo', 'bilibili', '_netease', 'migu'];
      var defaults = typeof defaultEnabledSources !== 'undefined' && Array.isArray(defaultEnabledSources) ? defaultEnabledSources : builtInFallbackSources;
      var allSources = typeof sourceDisplayOrder !== 'undefined' && Array.isArray(sourceDisplayOrder) ? sourceDisplayOrder : builtInFallbackSources;
      var sources = preferred.concat(defaults, allSources)
        .map(function(source) { return String(source || '').trim(); })
        .filter(function(source, index, list) {
          return source && source !== 'local' && source !== 'all' && list.indexOf(source) === index;
        });
      var source = String(track && track.source || '').trim();
      if (source === 'netease') {
        var neteaseIndex = sources.indexOf('netease');
        if (sources.indexOf('_netease') < 0) {
          if (neteaseIndex >= 0) sources.splice(neteaseIndex + 1, 0, '_netease');
          else sources.push('_netease');
        }
      }
      if (source === '_netease' && sources.indexOf('netease') < 0) sources.push('netease');
      var priority = ['joox', 'netease', '_netease'];
      if (source === 'netease') priority = ['_netease', 'joox', 'netease'];
      if (source === '_netease') priority = ['netease', 'joox', '_netease'];
      var slowLookup = new Set(['qq', 'lx_qq', 'lx_kuwo', 'bilibili', 'migu']);
      var ordered = [];
      function addOrdered(item) {
        item = String(item || '').trim();
        if (!item || ordered.indexOf(item) >= 0 || sources.indexOf(item) < 0) return;
        ordered.push(item);
      }
      priority.forEach(addOrdered);
      sources.forEach(function(item) {
        if (!slowLookup.has(item)) addOrdered(item);
      });
      sources.forEach(addOrdered);
      return ordered;
    }
    function inferTrackSourceCandidates(track) {
      var candidates = [];
      var selectedSources = getFallbackSearchSources(track);
      var selectedLookup = new Set(selectedSources);
      var add = function(source) {
        source = String(source || '').trim();
        if (!source || source === 'local' || source === 'all' || candidates.includes(source)) return;
        if (!selectedLookup.has(source)) return;
        candidates.push(source);
      };
      add(track && track.source);
      var label = normalizeTrackText(track && track.sourceLabel);
      [
        ['joox', 'joox'],
        ['qq', 'qq'],
        ['qq音乐', 'qq'],
        ['netease', 'netease'],
        ['网易', 'netease'],
        ['酷我', 'kuwo'],
        ['kuwo', 'kuwo'],
        ['咪咕', 'migu'],
        ['migu', 'migu'],
        ['b站', 'bilibili'],
        ['bilibili', 'bilibili']
      ].forEach(function(pair) {
        if (label.includes(pair[0])) add(pair[1]);
      });
      selectedSources.forEach(add);
      return candidates;
    }
    function isTrackMatchCandidate(target, candidate) {
      var title = normalizeTrackText(target && target.title);
      var artist = normalizeTrackText(target && target.artist);
      var candidateTitle = normalizeTrackText(candidate && candidate.title);
      var candidateArtist = normalizeTrackText(candidate && candidate.artist);
      if (hasConflictingTitlePart(target && target.title, candidate && candidate.title)) return false;
      var targetTitleVariants = getNormalizedTitleVariants(target && target.title);
      var candidateTitleVariants = getNormalizedTitleVariants(candidate && candidate.title);
      var simpleCandidateTitle = candidateTitleVariants[1] || normalizeTrackText(String(candidate && candidate.title || '').replace(/[（(].*?[）)]/g, ''));
      var titleMatches = title && candidateTitle && (
        title === candidateTitle ||
        title === simpleCandidateTitle ||
        targetTitleVariants.some(function(item) { return candidateTitleVariants.indexOf(item) >= 0; }) ||
        candidateTitle.indexOf(title) === 0 ||
        candidateTitle.indexOf(title + ' ') === 0 ||
        candidateTitle.indexOf(title + '（') === 0 ||
        candidateTitle.indexOf(title + '(') === 0
      );
      if (!titleMatches) return false;
      if (!artist) return true;
      return !candidateArtist || candidateArtist.includes(artist) || artist.includes(candidateArtist);
    }
    function getTitlePartMarker(value) {
      var title = normalizeTrackText(value);
      if (!title) return '';
      if (/没有下集|無下集|沒有下集|无下集/.test(title)) return 'none';
      if (/上集|上篇|上$/.test(title) || /爱的故事上/.test(title)) return 'upper';
      if (/下集|下篇|下$/.test(title) || /爱的故事下/.test(title)) return 'lower';
      return '';
    }
    function hasConflictingTitlePart(targetTitle, candidateTitle) {
      var targetMarker = getTitlePartMarker(targetTitle);
      if (!targetMarker) return false;
      var candidateMarker = getTitlePartMarker(candidateTitle);
      if (!candidateMarker) return true;
      return candidateMarker !== targetMarker;
    }
    function getNormalizedTitleVariants(value) {
      var raw = String(value || '').trim();
      var normalized = normalizeTrackText(raw);
      var variants = [];
      function add(item) {
        item = normalizeTrackText(item);
        if (item && variants.indexOf(item) < 0) variants.push(item);
      }
      add(raw);
      add(raw.replace(/[（(].*?[）)]/g, ''));
      add(raw.replace(/[.·・•\-_\s]+/g, ''));
      add(raw.replace(/[.·・•\-_\s]+/g, '').replace(/上集|下集|上篇|下篇/g, function(text) {
        return text === '上集' ? '上' : text === '下集' ? '下' : text === '上篇' ? '上' : '下';
      }));
      if (normalized) {
        add(normalized.replace(/上集|上篇/g, '上'));
        add(normalized.replace(/下集|下篇/g, '下'));
      }
      return variants;
    }
    function isLooseTitleMatchCandidate(target, candidate) {
      var title = normalizeTrackText(target && target.title);
      var candidateTitle = normalizeTrackText(candidate && candidate.title);
      if (hasConflictingTitlePart(target && target.title, candidate && candidate.title)) return false;
      var targetTitleVariants = getNormalizedTitleVariants(target && target.title);
      var candidateTitleVariants = getNormalizedTitleVariants(candidate && candidate.title);
      return !!(title && candidateTitle && targetTitleVariants.some(function(item) {
        return candidateTitleVariants.indexOf(item) >= 0;
      }));
    }
    function isBilibiliTrackMatchCandidate(target, candidate) {
      if (String(candidate && candidate.source || '') !== 'bilibili') return false;
      var title = normalizeTrackText(target && target.title);
      if (!title) return false;
      var artist = normalizeTrackText(target && target.artist);
      var blob = normalizeTrackText([
        candidate && candidate.title,
        candidate && candidate.artist,
        candidate && candidate.album
      ].filter(Boolean).join(' '));
      if (!blob || blob.indexOf(title) < 0) return false;
      return !artist || blob.indexOf(artist) >= 0;
    }
    function getNormalizedArtistTokens(value) {
      var rawItems = Array.isArray(value) ? value : String(value || '').split(/(?:feat|featuring|ft|with|和|与|及|\/|、|,|，|&|\+)+/i);
      return rawItems
        .map(function(item) { return normalizeTrackText(item); })
        .filter(Boolean);
    }
    function getPrimaryArtistName(value) {
      var rawItems = Array.isArray(value) ? value : String(value || '').split(/(?:feat|featuring|ft|with|和|与|及|\/|、|,|，|&|\+)+/i);
      for (var i = 0; i < rawItems.length; i++) {
        var item = String(rawItems[i] || '').trim();
        if (item) return item;
      }
      return '';
    }
    function getFallbackSearchQueries(track) {
      var title = String(track && track.title || '').trim();
      if (!title) return [];
      var primaryArtist = getPrimaryArtistName(track && track.artist);
      var queries = [];
      function add(query) {
        query = String(query || '').replace(/\s+/g, ' ').trim();
        if (query && queries.indexOf(query) < 0) queries.push(query);
      }
      if (primaryArtist && !isUnknownArtistName(primaryArtist)) add(title + ' ' + primaryArtist);
      add(title);
      var titleWithoutBrackets = title.replace(/[（(].*?[）)]/g, '').trim();
      if (titleWithoutBrackets && titleWithoutBrackets !== title) {
        if (primaryArtist && !isUnknownArtistName(primaryArtist)) add(titleWithoutBrackets + ' ' + primaryArtist);
        add(titleWithoutBrackets);
      }
      var compactTitle = title
        .replace(/[（(]\s*(上集|下集|上篇|下篇)\s*[）)]/g, ' $1')
        .replace(/[.·・•\-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (compactTitle && compactTitle !== title && compactTitle !== titleWithoutBrackets) {
        if (primaryArtist && !isUnknownArtistName(primaryArtist)) add(compactTitle + ' ' + primaryArtist);
        add(compactTitle);
      }
      return queries;
    }
    function isUnknownArtistName(value) {
      var artist = normalizeTrackText(value);
      return !artist || artist === normalizeTrackText('未知歌手') || artist === 'unknown' || artist === 'unknownartist';
    }
    function hasArtistMatch(target, candidate) {
      var targetArtist = normalizeTrackText(target && target.artist);
      var candidateArtist = normalizeTrackText(candidate && candidate.artist);
      if (isUnknownArtistName(targetArtist) || isUnknownArtistName(candidateArtist)) return false;
      if (targetArtist === candidateArtist) return true;
      var targetTokens = getNormalizedArtistTokens(target && target.artist);
      var candidateTokens = getNormalizedArtistTokens(candidate && candidate.artist);
      if (targetTokens.some(function(item) { return candidateTokens.indexOf(item) >= 0; })) return true;
      return candidateArtist.includes(targetArtist) || targetArtist.includes(candidateArtist);
    }
    function canRelaxKuwoArtistMatch(target, candidate) {
      var targetSource = String(target && target.source || '').trim();
      if (targetSource !== 'kuwo' && targetSource !== 'lx_kuwo') return false;
      if (String(candidate && candidate.source || '').trim() === targetSource) return false;
      if (!isLooseTitleMatchCandidate(target, candidate)) return false;
      if (!isUnknownArtistName(target && target.artist)) return false;
      return normalizeTrackText(target && target.title).length >= 6;
    }
    function getFallbackMatchScore(target, candidate, index) {
      var bilibiliMatch = typeof isBilibiliTrackMatchCandidate === 'function' && isBilibiliTrackMatchCandidate(target, candidate);
      if (!bilibiliMatch && !isLooseTitleMatchCandidate(target, candidate) && !isTrackMatchCandidate(target, candidate)) return -1;
      var strictTargetArtist = normalizeTrackText(target && target.artist);
      var relaxedCrossSourceTitleMatch = !bilibiliMatch && canRelaxKuwoArtistMatch(target, candidate);
      if (strictTargetArtist && !bilibiliMatch && !relaxedCrossSourceTitleMatch) {
        var strictCandidateArtist = normalizeTrackText(candidate && candidate.artist);
        if (isUnknownArtistName(strictCandidateArtist) || !hasArtistMatch(target, candidate)) return -1;
      }
      var score = Math.max(0, 40 - index);
      var title = normalizeTrackText(target && target.title);
      var candidateTitle = normalizeTrackText(candidate && candidate.title);
      var targetArtist = normalizeTrackText(target && target.artist);
      var candidateArtist = normalizeTrackText(candidate && candidate.artist);
      if (bilibiliMatch) score += 95;
      if (title && candidateTitle && title === candidateTitle) score += 120;
      else if (isLooseTitleMatchCandidate(target, candidate)) score += 90;
      if (isUnknownArtistName(targetArtist) || isUnknownArtistName(candidateArtist)) {
        score += 15;
      } else if (targetArtist === candidateArtist) {
        score += 100;
      } else {
        var targetTokens = getNormalizedArtistTokens(target && target.artist);
        var candidateTokens = getNormalizedArtistTokens(candidate && candidate.artist);
        if (targetTokens.some(function(item) { return candidateTokens.indexOf(item) >= 0; })) score += 55;
        else if (candidateArtist.includes(targetArtist) || targetArtist.includes(candidateArtist)) score += 35;
      }
      return score;
    }
    function pickFallbackTrackMatch(track, matches) {
      matches = Array.isArray(matches) ? matches : [];
      return getFallbackTrackMatches(track, matches)[0] || null;
    }
    function getFallbackTrackMatches(track, matches) {
      matches = Array.isArray(matches) ? matches : [];
      var ranked = [];
      var seen = new Set();
      function add(item, index) {
        var key = [
          item && item.source,
          item && (item.urlId || item.url_id || item.id || item.title),
          item && item.artist
        ].join(':');
        if (seen.has(key)) return;
        seen.add(key);
        var score = getFallbackMatchScore(track, item, index);
        if (score >= 0) ranked.push({ item: item, score: score, index: index });
      }
      matches.forEach(function(item, index) {
        add(item, index);
      });
      return ranked.sort(function(a, b) {
        return b.score - a.score || a.index - b.index;
      }).map(function(entry) { return entry.item; });
    }
    // ===== 音源切换性能优化：缓存层 =====
    var _fallbackSearchCache = new Map(); // key: title|artist|source|query -> { tracks, limit, expireAt }
    var _fallbackUrlCache = new Map(); // key: source|urlId -> { url, expireAt }
    var SEARCH_CACHE_TTL = 5 * 60 * 1000; // 5分钟
    var URL_CACHE_TTL = 30 * 60 * 1000; // 30分钟
    var FALLBACK_CACHE_MAX = 200;

    function _getFallbackCacheKey(track, source, query) {
      var title = String(track && track.title || '').trim().toLowerCase();
      var artist = String(track && track.artist || '').trim().toLowerCase();
      return source + '|' + title + '|' + artist + '|' + String(query || '').trim().toLowerCase();
    }

    function _getCachedFallbackSearch(track, source, query, limit) {
      var key = _getFallbackCacheKey(track, source, query);
      var entry = _fallbackSearchCache.get(key);
      if (!entry) return null;
      if (Date.now() > entry.expireAt) {
        _fallbackSearchCache.delete(key);
        return null;
      }
      if ((Number(entry.limit) || 0) < (Number(limit) || 0)) return null;
      return entry.tracks;
    }

    function _setCachedFallbackSearch(track, source, query, tracks, limit) {
      if (_fallbackSearchCache.size >= FALLBACK_CACHE_MAX) {
        var firstKey = _fallbackSearchCache.keys().next().value;
        if (firstKey) _fallbackSearchCache.delete(firstKey);
      }
      var key = _getFallbackCacheKey(track, source, query);
      _fallbackSearchCache.set(key, { tracks: tracks, limit: Number(limit) || 0, expireAt: Date.now() + SEARCH_CACHE_TTL });
    }

    function _getCachedUrl(match) {
      if (!match || !match.source || !match.urlId) return null;
      var key = match.source + '|' + match.urlId;
      var entry = _fallbackUrlCache.get(key);
      if (!entry) return null;
      if (Date.now() > entry.expireAt) {
        _fallbackUrlCache.delete(key);
        return null;
      }
      return entry.url;
    }

    function _setCachedUrl(match, url) {
      if (!match || !match.source || !match.urlId || !url) return;
      if (_fallbackUrlCache.size >= FALLBACK_CACHE_MAX) {
        var firstKey = _fallbackUrlCache.keys().next().value;
        if (firstKey) _fallbackUrlCache.delete(firstKey);
      }
      var key = match.source + '|' + match.urlId;
      _fallbackUrlCache.set(key, { url: url, expireAt: Date.now() + URL_CACHE_TTL });
    }
    // ===== 缓存层结束 =====

    async function resolvePlayableFallbackCandidate(track, source, match, skipUrls) {
      var cachedUrl = typeof _getCachedUrl === 'function' ? _getCachedUrl(match) : null;
      if (cachedUrl) {
        if (skipUrls.indexOf(String(cachedUrl).trim()) >= 0) throw new Error('cached url skipped');
        if (typeof isBlockedAudioUrl === 'function' && isBlockedAudioUrl(cachedUrl)) throw new Error('blocked cached fallback audio');
        return { source: source, match: match, url: cachedUrl };
      }
      var url = match && match.src ? match.src : await resolveExternalTrackUrl(match);
      if (!url || skipUrls.indexOf(String(url).trim()) >= 0) throw new Error('unplayable fallback candidate');
      if (typeof isBlockedAudioUrl === 'function' && isBlockedAudioUrl(url)) throw new Error('blocked fallback audio');
      if (typeof _setCachedUrl === 'function') _setCachedUrl(match, url);
      return { source: source, match: match, url: url };
    }
    async function resolveFallbackTrackFromSource(track, source, skipUrls, limit) {
      var searchLimit = Math.max(1, Number(limit) || SEARCH_RESULT_LIMIT);
      var queries = getFallbackSearchQueries(track);
      var candidates = [];
      for (var queryIndex = 0; queryIndex < queries.length; queryIndex++) {
        var query = queries[queryIndex];
        var matches = typeof _getCachedFallbackSearch === 'function' ? _getCachedFallbackSearch(track, source, query, searchLimit) : null;
        if (!matches) {
          matches = await fetchExternalSourceTracks(query, source, searchLimit);
          if (typeof _setCachedFallbackSearch === 'function') _setCachedFallbackSearch(track, source, query, matches, searchLimit);
        }
        candidates = getFallbackTrackMatches(track, matches);
        if (candidates.length) break;
      }
      if (!candidates.length) return null;
      var resolved = null;
      var batchSize = searchLimit <= 12 ? Math.min(3, searchLimit) : Math.min(8, searchLimit);
      for (var start = 0; start < candidates.length; start += batchSize) {
        var batch = candidates.slice(start, Math.min(candidates.length, start + batchSize));
        try {
          resolved = await Promise.any(batch.map(function(match) {
            return resolvePlayableFallbackCandidate(track, source, match, skipUrls);
          }));
        } catch (error) {
          resolved = null;
        }
        if (resolved) return resolved;
      }
      return null;
    }
    async function recoverPlayableTrackUrl(track, options) {
      if (!track || !track.title) return '';
      options = options || {};
      var silent = !!options.silent;
      var skipSources = (options.skipSources || []).map(function(source) { return String(source || '').trim(); }).filter(Boolean);
      var skipUrls = (options.skipUrls || []).map(function(url) { return String(url || '').trim(); }).filter(Boolean);
      var sources = inferTrackSourceCandidates(track).filter(function(source) { return skipSources.indexOf(source) < 0; });
      if (!sources.length) return '';
      var variantCandidates = [];
      var variants = Array.isArray(track && track.variants) ? track.variants.slice() : [];
      if (variants.length && sources.length) {
        sources.forEach(function(source) {
          if (skipSources.indexOf(source) >= 0) return;
          variants.forEach(function(item, index) {
            if (!item || item.source !== source) return;
            if (skipUrls.indexOf(String(item.src || '').trim()) >= 0) return;
            variantCandidates.push({
              source: source,
              index: index,
              item: Object.assign({}, item)
            });
          });
        });
      }
      for (var variantIndex = 0; variantIndex < variantCandidates.length; variantIndex++) {
        try {
          var variantResult = await resolvePlayableFallbackCandidate(track, variantCandidates[variantIndex].source, variantCandidates[variantIndex].item, skipUrls);
          if (!variantResult) continue;
          var variantMatch = variantResult.match;
          var variantUrl = variantResult.url;
          var variantOrigTitle = track.title, variantOrigArtist = track.artist, variantOrigCover = track.cover;
          Object.assign(track, variantMatch, {
            title: variantOrigTitle || variantMatch.title,
            artist: variantOrigArtist || variantMatch.artist,
            cover: variantOrigCover || variantMatch.cover || DEFAULT_COVER,
            source: variantMatch.source || variantResult.source,
            sourceLabel: variantMatch.sourceLabel || getSourceLabel(variantMatch.source || variantResult.source),
            urlId: variantMatch.urlId || variantMatch.url_id || variantMatch.id || track.urlId || track.url_id || track.id || '',
            src: variantUrl
          });
          return variantUrl;
        } catch (error) {
          if (!silent) console.warn('recoverPlayableTrackUrl: variant source ' + variantCandidates[variantIndex].source + ' failed', error);
        }
      }
      var requestedLimit = Number(options.searchLimit);
      if (!(requestedLimit > 0)) requestedLimit = 0;
      var searchLimit = requestedLimit
        ? Math.min(SEARCH_RESULT_LIMIT, requestedLimit)
        : (options.quickOnly ? Math.min(12, SEARCH_RESULT_LIMIT) : SEARCH_RESULT_LIMIT);
      var SOURCE_ORDER_GRACE_MS = 45;
      var pendingSources = new Array(sources.length);
      sources.forEach(function(source, index) {
        pendingSources[index] = Promise.resolve().then(function() {
          return resolveFallbackTrackFromSource(track, source, skipUrls, searchLimit);
        }).catch(function(error) {
          if (!silent) console.warn('recoverPlayableTrackUrl: source ' + source + ' failed', error);
          return null;
        });
      });
      for (var i = 0; i < pendingSources.length; i++) {
        var timedOut = false;
        var result = await Promise.race([
          pendingSources[i],
          new Promise(function(resolve) {
            setTimeout(function() {
              timedOut = true;
              resolve(null);
            }, SOURCE_ORDER_GRACE_MS);
          })
        ]);
        if (!result) continue;
        try {
          var match = result.match;
          var url = result.url;
          var origTitle = track.title, origArtist = track.artist, origCover = track.cover;
          Object.assign(track, match, {
            title: origTitle || match.title,
            artist: origArtist || match.artist,
            cover: origCover || match.cover || DEFAULT_COVER,
            source: match.source || result.source,
            sourceLabel: match.sourceLabel || getSourceLabel(match.source || result.source),
            urlId: match.urlId || match.url_id || match.id || track.urlId || track.url_id || track.id || '',
            src: url
          });
          return url;
        } catch (error) {}
      }
      if (!options.quickOnly) {
        for (var j = 0; j < pendingSources.length; j++) {
          var lateResult = await pendingSources[j];
          if (!lateResult) continue;
          try {
            var lateMatch = lateResult.match;
            var lateUrl = lateResult.url;
            var lateOrigTitle = track.title, lateOrigArtist = track.artist, lateOrigCover = track.cover;
            Object.assign(track, lateMatch, {
              title: lateOrigTitle || lateMatch.title,
              artist: lateOrigArtist || lateMatch.artist,
              cover: lateOrigCover || lateMatch.cover || DEFAULT_COVER,
              source: lateMatch.source || lateResult.source,
              sourceLabel: lateMatch.sourceLabel || getSourceLabel(lateMatch.source || lateResult.source),
              urlId: lateMatch.urlId || lateMatch.url_id || lateMatch.id || track.urlId || track.url_id || track.id || '',
              src: lateUrl
            });
            return lateUrl;
          } catch (error) {}
        }
      }
      return '';
    }
    function setQueue(tracks, index) {
      playQueue = Array.isArray(tracks) && tracks.length ? tracks.slice() : [currentTrack];
      queueIndex = Math.max(0, Math.min(Number(index) || 0, playQueue.length - 1));
      currentTrackIndex = queueIndex;
    }
    function syncQueueIndexToCurrentTrack() {
      if (!playQueue.length || !currentTrack) return;
      var activeIndex = playQueue.findIndex(function(item) { return isSameTrack(item, currentTrack); });
      if (activeIndex >= 0) {
        queueIndex = activeIndex;
        currentTrackIndex = activeIndex;
      } else {
        queueIndex = Math.max(0, Math.min(queueIndex, playQueue.length - 1));
        currentTrackIndex = queueIndex;
      }
    }
    function reconcileCurrentTrackInQueue(previousTrack) {
      if (!currentTrack) return;
      if (!playQueue.length) {
        setQueue([currentTrack], 0);
        return;
      }
      var previousKey = previousTrack ? getTrackKey(previousTrack) : '';
      var replacementIndex = previousKey
        ? playQueue.findIndex(function(item) { return getTrackKey(item) === previousKey; })
        : -1;
      if (replacementIndex < 0) replacementIndex = Math.max(0, Math.min(queueIndex, playQueue.length - 1));
      playQueue[replacementIndex] = currentTrack;
      if (previousKey) {
        playQueue = playQueue.filter(function(item, index) {
          return index === replacementIndex || getTrackKey(item) !== previousKey;
        });
      }
      queueIndex = Math.max(0, Math.min(replacementIndex, playQueue.length - 1));
      currentTrackIndex = queueIndex;
      syncQueueIndexToCurrentTrack();
    }
    var _lastSaveTime = 0;
    function normalizePlaybackStateTrack(track) {
      if (!track || typeof track !== 'object' || Array.isArray(track)) return null;
      var source = typeof track.source === 'string' && track.source.trim() ? track.source.trim() : 'local';
      var title = typeof track.title === 'string' && track.title.trim() ? track.title.trim() : '';
      var artist = typeof track.artist === 'string' && track.artist.trim() ? track.artist.trim() : '';
      var src = typeof track.src === 'string' ? track.src.trim() : '';
      var urlId = typeof track.urlId === 'string' ? track.urlId.trim() : (typeof track.url_id === 'string' ? track.url_id.trim() : '');
      var id = typeof track.id === 'string' ? track.id.trim() : '';
      if (!title && !artist && !src && !urlId && !id) return null;
      return {
        title: title || '未知歌曲',
        artist: artist || '未知歌手',
        cover: safeCover(typeof track.cover === 'string' && track.cover ? track.cover : DEFAULT_COVER),
        coverApi: typeof track.coverApi === 'string' ? track.coverApi : '',
        src: src,
        duration: parseTrackDuration(track.duration),
        source: source,
        sourceLabel: typeof track.sourceLabel === 'string' && track.sourceLabel.trim() ? track.sourceLabel.trim() : getSourceLabel(source),
        urlId: urlId,
        lyric_id: typeof track.lyric_id === 'string' ? track.lyric_id : '',
        id: id || urlId || src || title
      };
    }
    function savePlaybackState(force) {
      if (!currentTrack) return;
      var now = Date.now();
      if (!force && now - _lastSaveTime < 5000) return;
      _lastSaveTime = now;
      writeStoredObject('ljyyt_otter_playback_state', {
        track: currentTrack,
        queue: playQueue,
        queueIndex: queueIndex,
        currentTrackIndex: currentTrackIndex,
        currentTime: audioPlayer.currentTime || 0,
        timestamp: now
      });
    }
    function restorePlaybackState() {
      const state = readStoredObject('ljyyt_otter_playback_state');
      if (!state || !state.track) return false;
      var restoredTrack = normalizePlaybackStateTrack(state.track);
      if (!restoredTrack) return false;
      currentTrack = restoredTrack;
      var restoredQueue = filterStoredObjectList(state.queue).map(normalizePlaybackStateTrack).filter(Boolean);
      playQueue = restoredQueue.length ? restoredQueue : [currentTrack];
      if (!playQueue.some(function(item) { return isSameTrack(item, currentTrack); })) playQueue.unshift(currentTrack);
      queueIndex = Math.max(0, Math.min(Number(state.queueIndex) || 0, playQueue.length - 1));
      syncQueueIndexToCurrentTrack();
      restoredPlaybackTime = Math.max(0, Number(state.currentTime) || 0);
      updateTrackUi(currentTrack);
      updateLikeButton();
      renderQueue();
      loadLyricsForTrack(currentTrack);
      return true;
    }

    function getSearchInput() {
      return document.getElementById('search-input');
    }
    function getHomeSearchInput() {
      return document.getElementById('home-search-input');
    }
    function handleHomeSearchClick() {
      var homeInput = getHomeSearchInput();
      var searchInput = getSearchInput();
      showView('search');
      if (searchInput && homeInput) searchInput.value = homeInput.value || '';
      if (searchInput) searchInput.focus();
      if (!String(searchInput && searchInput.value || '').trim()) {
        renderSearchHistory(true);
      }
    }
    function syncHomeSearchInput() {
      var homeInput = getHomeSearchInput();
      var searchInput = getSearchInput();
      if (homeInput && searchInput && homeInput !== searchInput) {
        searchInput.value = homeInput.value;
      }
      updateSearchClearButton();
      hideSearchHistory();
    }
    function handleHomeSearchKey(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        var homeInput = getHomeSearchInput();
        var searchInput = getSearchInput();
        showView('search');
        if (searchInput && homeInput) searchInput.value = homeInput.value;
        hideSearchHistory();
        hideSearchSuggestions();
        performSearch({ remember: true });
      }
    }
    function isSearchInputFocused() {
      return document.activeElement === getSearchInput();
    }
    function hideSearchHistory() {
      const box = document.getElementById('search-history');
      if (box) {
        box.innerHTML = '';
        box.hidden = true;
      }
    }
    function hideSearchSuggestions() {
      searchSuggestionRequestId++;
      const box = document.getElementById('search-suggestions');
      if (box) {
        box.innerHTML = '';
        box.hidden = true;
      }
    }
    function hideSearchHistorySoon() {
      setTimeout(function() {
        if (!isSearchInputFocused()) {
          hideSearchHistory();
          hideSearchSuggestions();
        }
      }, 120);
    }
    function renderSearchHistory(force) {
      const input = getSearchInput();
      const box = document.getElementById('search-history');
      if (!box) return;
      const query = String(input?.value || '').trim();
      if (!force || !isSearchInputFocused() || query || !searchHistory.length) {
        box.innerHTML = '';
        box.hidden = true;
        return;
      }
      box.hidden = false;
      box.innerHTML = '<div class="search-history-head"><span>最近搜索</span><button type="button" onclick="clearSearchHistory()">清空</button></div>' +
        '<div class="history-chips">' + searchHistory.map((word) =>
          '<button class="history-chip" type="button" data-query="' + escapeMarkup(word) + '">' + escapeMarkup(word) + '</button>'
        ).join('') + '</div>';
      box.querySelectorAll('.history-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          var word = chip.dataset.query || chip.textContent || '';
          var searchInput = getSearchInput();
          var homeInput = getHomeSearchInput();
          showView('search');
          if (searchInput) searchInput.value = word;
          if (homeInput) homeInput.value = word;
          performSearch({ remember: true });
        });
      });
    }
    function showSearchHistoryFromClick() {
      var input = getSearchInput();
      if (String(input && input.value || '').trim()) return;
      hideSearchSuggestions();
      renderSearchHistory(true);
    }
    function buildSearchSuggestions(query, tracks) {
      var needle = String(query || '').trim().toLowerCase();
      if (!needle) return { artist: [], song: [], album: [], playlist: [], history: [] };
      var seen = {};
      var groups = { artist: [], song: [], album: [], playlist: [], history: [] };
      function add(type, text, meta, icon, score) {
        text = String(text || '').trim();
        if (!text) return;
        var key = type + ':' + text.toLowerCase();
        if (seen[key]) return;
        seen[key] = true;
        if (!groups[type]) groups[type] = [];
        groups[type].push({ type: type, text: text, meta: meta || '', icon: icon, score: score || 0 });
      }
      (tracks || []).forEach(function(track) {
        var title = String(track.title || '');
        var artist = String(track.artist || '');
        var album = String(track.album || '');
        var titleHit = title.toLowerCase().includes(needle);
        var artistHit = artist.toLowerCase().includes(needle);
        var albumHit = album.toLowerCase().includes(needle);
        if (titleHit) add('song', title, artist || '单曲', 'music', title.toLowerCase().startsWith(needle) ? 30 : 20);
        if (artistHit) add('artist', artist, '歌手', 'user', artist.toLowerCase().startsWith(needle) ? 24 : 14);
        if (albumHit) add('album', album, '专辑', 'album', album.toLowerCase().startsWith(needle) ? 22 : 12);
      });
      (marketItems || []).forEach(function(item) {
        var name = String(item && (item.name || item.title) || '');
        if (name.toLowerCase().includes(needle)) {
          add('playlist', name, '歌单', 'listVideo', name.toLowerCase().startsWith(needle) ? 20 : 10);
        }
      });
      searchHistory.forEach(function(word) {
        if (String(word || '').toLowerCase().includes(needle)) add('history', word, '最近搜索', 'history', 18);
      });
      Object.keys(groups).forEach(function(type) {
        groups[type] = groups[type]
          .sort(function(a, b) { return b.score - a.score || a.text.localeCompare(b.text); })
          .slice(0, 3);
      });
      return groups;
    }
    async function fetchNeteaseSuggestions(query) {
      query = String(query || '').trim();
      if (!query) return [];
      var endpoint = neteaseApiBase + '/suggest?keyword=' + encodeURIComponent(query);
      try {
        var response = await fetch(endpoint);
        if (!response.ok) return [];
        var payload = await response.json();
        var suggestions = Array.isArray(payload && payload.suggestions) ? payload.suggestions : [];
        if (suggestions.length) {
          return suggestions.map(function(item) {
            var type = ['artist', 'song', 'album', 'playlist'].includes(item.type) ? item.type : 'song';
            return {
              type: type,
              text: String(item.text || '').trim(),
              meta: String(item.meta || (type === 'artist' ? '歌手' : type === 'album' ? '专辑' : type === 'playlist' ? '歌单' : '单曲')),
              icon: type === 'artist' ? 'user' : type === 'album' ? 'album' : type === 'playlist' ? 'listVideo' : 'music',
              score: 100,
              source: item.source || 'netease'
            };
          }).filter(function(item) { return item.text; });
        }
      } catch (error) { console.warn('fetchNeteaseSuggestions: endpoint failed', error); }
      return [];
    }
    function groupSuggestionItems(items) {
      var groups = { artist: [], song: [], album: [], playlist: [], history: [] };
      (items || []).forEach(function(item) {
        var type = groups[item.type] ? item.type : 'song';
        if (groups[type].length < 3) groups[type].push(item);
      });
      return groups;
    }
    function renderSuggestionGroup(title, items) {
      if (!items.length) return '';
      return '<div class="suggestion-group-title">' + escapeMarkup(title) + '</div>' +
        items.map(function(item) {
          return '<button class="suggestion-item" type="button" data-query="' + escapeMarkup(item.text) + '">' +
            '<span class="suggestion-icon">' + iconHtml(item.icon || 'search') + '</span>' +
            '<span class="suggestion-copy"><strong>' + escapeMarkup(item.text) + '</strong><span>' + escapeMarkup(item.meta || '') + '</span></span>' +
          '</button>';
        }).join('');
    }
    function mergeSuggestionGroups(primary, fallback) {
      var groups = { artist: [], song: [], album: [], playlist: [], history: [] };
      Object.keys(groups).forEach(function(type) {
        var seen = {};
        function push(item) {
          if (!item || !item.text || groups[type].length >= 3) return;
          var key = String(item.text || '').trim().toLowerCase();
          if (!key || seen[key]) return;
          seen[key] = true;
          groups[type].push(item);
        }
        ((primary && primary[type]) || []).forEach(push);
        ((fallback && fallback[type]) || []).forEach(push);
      });
      return groups;
    }
    function bindSearchSuggestionClicks(box) {
      box.querySelectorAll('.suggestion-item').forEach(function(button) {
        button.addEventListener('mousedown', function(event) { event.preventDefault(); });
        button.addEventListener('click', function() {
          var word = button.dataset.query || button.textContent || '';
          var searchInput = getSearchInput();
          var homeInput = getHomeSearchInput();
          if (searchInput) searchInput.value = word;
          if (homeInput) homeInput.value = word;
          hideSearchSuggestions();
          performSearch({ remember: true });
        });
      });
    }
    function applySearchSuggestionGroups(box, suggestions) {
      var hasSuggestions = Object.keys(suggestions || {}).some(function(type) { return suggestions[type] && suggestions[type].length; });
      if (!hasSuggestions) {
        box.innerHTML = '';
        box.hidden = true;
        return false;
      }
      box.innerHTML =
        renderSuggestionGroup('歌手', suggestions.artist || []) +
        renderSuggestionGroup('单曲', suggestions.song || []) +
        renderSuggestionGroup('专辑', suggestions.album || []) +
        renderSuggestionGroup('歌单', suggestions.playlist || []) +
        renderSuggestionGroup('最近搜索', suggestions.history || []);
      box.hidden = false;
      bindSearchSuggestionClicks(box);
      return true;
    }
    async function renderSearchSuggestions(query) {
      query = String(query || '').trim();
      const box = document.getElementById('search-suggestions');
      if (!box) return;
      if (!query) {
        hideSearchSuggestions();
        return;
      }
      const requestId = ++searchSuggestionRequestId;
      var localSuggestions = buildSearchSuggestions(query, await ensureLibraryTracks().catch(function() { return []; }));
      if (requestId !== searchSuggestionRequestId) return;
      applySearchSuggestionGroups(box, localSuggestions);
      fetchNeteaseSuggestions(query).then(function(neteaseSuggestions) {
        if (requestId !== searchSuggestionRequestId) return;
        if (!neteaseSuggestions.length) return;
        var suggestions = mergeSuggestionGroups(groupSuggestionItems(neteaseSuggestions), localSuggestions);
        applySearchSuggestionGroups(box, suggestions);
      }).catch(function(error) {
        console.warn('renderSearchSuggestions: remote suggestions failed', error);
      });
    }
    function rememberSearchQuery(query) {
      const word = String(query || '').trim();
      if (!word) return;
      searchHistory = setSearchHistory([word, ...getSearchHistory().filter((item) => item !== word)]);
    }
    function clearSearchHistory() {
      showConfirm('确定清空搜索历史吗？', function() {
        searchHistory = [];
        clearStoredSearchHistory();
        const box = document.getElementById('search-history');
        if (box) {
          box.innerHTML = '';
          box.hidden = true;
        }
        hideSearchHistory();
      });
    }
    function updateSearchClearButton() {
      const searchInput = getSearchInput();
      const homeInput = getHomeSearchInput();
      const searchButton = document.getElementById('search-clear');
      const homeButton = document.getElementById('home-search-clear');
      if (searchButton) searchButton.classList.toggle('visible', !!String(searchInput?.value || '').trim());
      if (homeButton) homeButton.classList.toggle('visible', !!String(homeInput?.value || '').trim());
    }
    function clearHomeSearch(event, scope) {
      event?.preventDefault();
      event?.stopPropagation();
      const homeInput = getHomeSearchInput();
      const searchInput = getSearchInput();
      if (scope === 'home') {
        if (homeInput) {
          homeInput.value = '';
          homeInput.focus({ preventScroll: true });
        }
        if (searchInput) searchInput.value = '';
        updateSearchClearButton();
        hideSearchHistory();
        hideSearchSuggestions();
        return;
      }
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus({ preventScroll: true });
      }
      if (homeInput) homeInput.value = '';
      if (typeof performSearch === 'function' && getSearchInput()) performSearch({ remember: false });
      updateSearchClearButton();
      hideSearchHistory();
      hideSearchSuggestions();
    }
    const icons = {
      play: iconHtml('play'),
      pause: iconHtml('pause'),
      skipBack: iconHtml('previous'),
      skipForward: iconHtml('next'),
      repeat: iconHtml('repeat'),
      repeat1: iconHtml('repeatOne'),
      shuffle: iconHtml('shuffle'),
      listVideo: iconHtml('listVideo')
    };
    function updateControlIcons() {
      const mode = playModes[playModeIndex].value;
      document.getElementById('mode-button').innerHTML = mode === 'single' ? icons.repeat1 : (mode === 'shuffle' ? icons.shuffle : icons.repeat);
      document.getElementById('mode-button').setAttribute('aria-label', playModes[playModeIndex].label);
      document.querySelector('.controls button[aria-label="上一首"]').innerHTML = icons.skipBack;
      document.querySelector('.controls button[aria-label="下一首"]').innerHTML = icons.skipForward;
      document.querySelector('.controls button[aria-label="播放列表"]').innerHTML = icons.listVideo;
      document.querySelector('.mini-controls button[aria-label="上一首"]').innerHTML = icons.skipBack;
      document.querySelector('.mini-controls button[aria-label="下一首"]').innerHTML = icons.skipForward;
      document.querySelectorAll('.queue').forEach((button) => {
        button.innerHTML = icons.listVideo;
      });
    }
    function setPlayIcons(playing) {
      var miniPlay = document.getElementById('mini-play');
      var fullPlay = document.getElementById('full-play');
      var html = iconHtml(playing ? 'pause' : 'play') || (playing ? 'Ⅱ' : '▶');
      if (miniPlay) {
        miniPlay.innerHTML = '<span class="mini-play-glyph ' + (playing ? 'is-pause' : 'is-play') + '" aria-hidden="true"></span>';
        miniPlay.title = playing ? '暂停' : '播放';
        miniPlay.setAttribute('aria-label', playing ? '暂停' : '播放');
        miniPlay.classList.toggle('is-playing', !!playing);
      }
      if (fullPlay) {
        fullPlay.innerHTML = html;
        fullPlay.setAttribute('aria-label', playing ? '暂停' : '播放');
        fullPlay.classList.toggle('is-playing', !!playing);
      }
      updateControlIcons();
      renderQueue();
    }
    function setPlaybackResolving(resolving) {
      var miniPlay = document.getElementById('mini-play');
      var fullPlay = document.getElementById('full-play');
      var isResolving = !!resolving;
      [miniPlay, fullPlay].forEach(function(button) {
        if (!button) return;
        button.classList.toggle('is-buffering', isResolving);
        button.setAttribute('aria-busy', isResolving ? 'true' : 'false');
      });
    }
    function setResolvingUrlState(resolving) {
      _isResolvingUrl = !!resolving;
      if (typeof setPlaybackResolving === 'function') setPlaybackResolving(_isResolvingUrl);
    }
    const PAUSE_CONFIRM_DELAY_MS = 200;
    var pauseConfirmTimer = null;
    function clearPauseConfirmTimer() {
      if (!pauseConfirmTimer) return;
      clearTimeout(pauseConfirmTimer);
      pauseConfirmTimer = null;
    }
    function confirmAudioPaused() {
      clearPauseConfirmTimer();
      pauseConfirmTimer = setTimeout(function() {
        pauseConfirmTimer = null;
        if (!audioPlayer || audioPlayer.paused) setPlayIcons(false);
      }, PAUSE_CONFIRM_DELAY_MS);
    }
    function confirmAudioPlaying() {
      clearPauseConfirmTimer();
      setPlayIcons(true);
    }
    function updateMiniProgress(progress) {
      const mini = document.getElementById('mini-play');
      if (!mini) return;
      const value = Math.max(0, Math.min(100, Number(progress) || 0));
      mini.style.setProperty('--mini-progress', value + '%');
    }
    function updateTrackUi(track) {
      const cover = safeCover(track.cover);
      document.querySelector('.player-copy strong').textContent = track.title;
      document.querySelector('.player-copy span').textContent = '- ' + track.artist;
      setCoverImage(document.querySelector('.player img'), cover);
      document.querySelector('.full-meta h2').textContent = track.title;
      document.querySelector('.full-meta p').textContent = track.artist;
      setCoverImage(document.querySelector('.full-cover'), cover);
      document.querySelector('.fullscreen-bg').style.backgroundImage = 'linear-gradient(to bottom, rgba(16,28,27,.20), rgba(4,7,8,.88)), url("' + cover + '")';
      document.getElementById('duration-time').textContent = formatDuration(track.duration);
      document.getElementById('current-time').textContent = '0:00';
      document.getElementById('seek-line').style.setProperty('--audio-progress', '0%');
      updateMiniProgress(0);
    }
    function setCurrentTrack(track) {
      var prevSrc = currentTrack && currentTrack.src;
      var existingDuration = currentTrack && isSameTrack(track, currentTrack) ? currentTrack.duration : 0;
      currentTrack = {
        title: track.title || '未知歌曲',
        artist: track.artist || '未知歌手',
        cover: track.cover || DEFAULT_COVER,
        coverApi: track.coverApi || '',
        src: track.source && track.source !== 'local' ? (track.src || '') : (track.src || ''),
        duration: parseTrackDuration(track.duration) || parseTrackDuration(existingDuration),
        source: track.source || 'local',
        sourceLabel: track.sourceLabel || getSourceLabel(track.source || 'local'),
        variants: Array.isArray(track.variants) ? track.variants.map(function(item) { return Object.assign({}, item); }) : [],
        urlId: track.urlId || track.url_id || track.id || '',
        lyric_id: track.lyric_id || track.id || '',
        id: track.id || track.urlId || track.url_id || track.src || track.title
      };
      if (!currentTrack.src && prevSrc) {
        if (typeof setResolvingUrlState === 'function') setResolvingUrlState(true); else _isResolvingUrl = true;
        audioPlayer.pause();
        audioPlayer.removeAttribute('src');
        audioPlayer.load();
        if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;
      }
      if (!playQueue.length) setQueue([currentTrack], 0);
      updateTrackUi(currentTrack);
      updateLikeButton();
      renderQueue();
      loadLyricsForTrack(currentTrack);
      if (currentTrack.coverApi && (!currentTrack.cover || currentTrack.cover === DEFAULT_COVER)) {
        resolveExternalCover(currentTrack).then(function() { updateTrackUi(currentTrack); });
      }
      savePlaybackState(true);
      if (currentTrack.src && audioPlayer.getAttribute('src') !== currentTrack.src) {
        audioPlayer.src = currentTrack.src;
        audioPlayer.load();
      }
    }
    async function ensureLibraryTracks() {
      if (libraryTracks.length) return libraryTracks;
      libraryTracks = await readSourceArray('/script.js', 'const musicData');
      return libraryTracks;
    }
    async function findTrack(name, artist, cover) {
      const tracks = await ensureLibraryTracks();
      const foundIndex = tracks.findIndex((track) =>
        String(track.title || '').trim() === String(name || '').trim() &&
        (!artist || String(track.artist || '').trim() === String(artist || '').trim())
      );
      if (foundIndex >= 0) {
        currentTrackIndex = foundIndex;
        return tracks[foundIndex];
      }
      return { title: name, artist, cover, src: currentTrack.src, duration: currentTrack.duration };
    }
    async function ensurePlayableTrackUrl(track) {
      if (!track) return '';
      var hasUnstableNeteaseUrl = track.source === 'netease' && /music\.126\.net/i.test(track.src || '');
      var hasDeprecatedKuwoAudioUrl = isDeprecatedKuwoAudioUrl(track.src);
      if (track.src && !hasUnstableNeteaseUrl && !hasDeprecatedKuwoAudioUrl) return track.src;
      if (hasUnstableNeteaseUrl) track.src = '';
      if (hasDeprecatedKuwoAudioUrl) track.src = '';
      if (!track.source || track.source === 'local') {
        var localMatch = findLibraryTrackMatch(track, await ensureLibraryTracks());
        if (localMatch && localMatch.src) {
          var origTitle = track.title, origArtist = track.artist, origCover = track.cover;
          Object.assign(track, localMatch, {
            title: origTitle || localMatch.title,
            artist: origArtist || localMatch.artist,
            cover: origCover || localMatch.cover || DEFAULT_COVER
          });
          if (currentTrack && isSameTrack(track, currentTrack)) currentTrack.src = track.src || '';
          return track.src || '';
        }
      }
      if (track.source && track.source !== 'local') {
        track.src = await resolveExternalTrackUrl(track);
        if (currentTrack && isSameTrack(track, currentTrack)) currentTrack.src = track.src || '';
      }
      return track.src || '';
    }
    var _playRetryCount = 0;
    var _isResolvingUrl = false;
    var _playRequestId = 0;
    var _audioUnlocked = false;
    var _autoSkipFailureCount = 0;
    var _fallbackAttemptState = { key: '', sources: [], urls: [] };
    var _fallbackPrewarmState = { key: '', promise: null, result: null };
    var _proxyPlaybackAttemptLifecycle = null;
    const PRIMARY_PLAYBACK_TIMEOUT_MS = 3200;
    const FALLBACK_PLAYBACK_TIMEOUT_MS = 4200;
    const FALLBACK_TRIAL_PLAYBACK_TIMEOUT_MS = 1500;
    const PROXY_LINE_PLAYBACK_TIMEOUT_MS = 2500;
    const PREWARM_FAST_SWITCH_GRACE_MS = 180;
    const PRIMARY_PREWARM_FALLBACK_GRACE_MS = 900;
    const PRIMARY_RESOLVE_PREWARM_GRACE_MS = 900;
    const FALLBACK_PREWARM_LATE_GRACE_MS = 180;
    const SILENT_AUDIO_DATA_URI = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQQAAAAAAA==';
    function getTrackFallbackKey(track) {
      if (!track) return '';
      return [
        normalizeTrackText(track.title),
        normalizeTrackText(track.artist)
      ].join('|');
    }
    function ensureFallbackState(track, fallbackKey) {
      var key = fallbackKey || getTrackFallbackKey(track);
      if (_fallbackAttemptState.key !== key) {
        _fallbackAttemptState = { key: key, sources: [], urls: [] };
      }
      return _fallbackAttemptState;
    }
    function resetFallbackState(track, fallbackKey) {
      _fallbackAttemptState = { key: fallbackKey || getTrackFallbackKey(track), sources: [], urls: [] };
    }
    function resetAutoSkipFailureCount() {
      _autoSkipFailureCount = 0;
    }
    function cancelPendingPlaybackWork() {
      _playRequestId++;
      _playRetryCount = 0;
      resetAutoSkipFailureCount();
      if (_proxyPlaybackAttemptLifecycle) _proxyPlaybackAttemptLifecycle.active = false;
      _proxyPlaybackAttemptLifecycle = null;
      if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;
    }
    function isSmartSourceEnabled() {
      return !appSettings || appSettings.smartSource !== false;
    }
    function rememberPlaybackFailure(track, url, source, fallbackKey) {
      var state = ensureFallbackState(track, fallbackKey);
      source = String(source || (track && track.source) || '').trim();
      url = String(url || '').trim();
      if (source && source !== 'local' && state.sources.indexOf(source) < 0) state.sources.push(source);
      if (url && state.urls.indexOf(url) < 0) state.urls.push(url);
    }
    function cloneTrackForFallback(track) {
      return Object.assign({}, track || {});
    }
    function startFallbackPrewarm(track) {
      if (!isSmartSourceEnabled() || !track || !track.title) return null;
      var key = getTrackFallbackKey(track);
      if (!key) return null;
      if (_fallbackPrewarmState.key === key && _fallbackPrewarmState.promise) return _fallbackPrewarmState.promise;
      var snapshot = cloneTrackForFallback(track);
      var skipSources = snapshot.source && snapshot.source !== 'local' ? [snapshot.source] : [];
      var skipUrls = snapshot.src ? [normalizeAudioUrl(snapshot.src)] : [];
      var promise = recoverPlayableTrackUrl(snapshot, {
        skipSources: skipSources,
        skipUrls: skipUrls,
        searchLimit: Math.min(30, SEARCH_RESULT_LIMIT),
        silent: true
      }).then(function(url) {
        if (!url) return null;
        var result = { url: url, track: cloneTrackForFallback(snapshot) };
        if (_fallbackPrewarmState.key === key) _fallbackPrewarmState.result = result;
        return result;
      }).catch(function(error) {
        console.warn('startFallbackPrewarm failed', error);
        return null;
      });
      _fallbackPrewarmState = { key: key, promise: promise, result: null };
      return promise;
    }
    function isUsableFallbackPrewarmResult(result, state) {
      if (!result || !result.url || !result.track) return false;
      state = state || { sources: [], urls: [] };
      var source = String(result.track.source || '').trim();
      var url = normalizeAudioUrl(result.url);
      if (source && state.sources.indexOf(source) >= 0) return false;
      if (url && state.urls.indexOf(url) >= 0) return false;
      return true;
    }
    async function consumeFallbackPrewarm(track, state, fallbackKey, timeoutMs) {
      var key = fallbackKey || getTrackFallbackKey(track);
      if (!_fallbackPrewarmState.promise || _fallbackPrewarmState.key !== key) return null;
      if (_fallbackPrewarmState.result) {
        return isUsableFallbackPrewarmResult(_fallbackPrewarmState.result, state) ? _fallbackPrewarmState.result : null;
      }
      var timeout = Math.max(0, Number(timeoutMs) || 0);
      if (!timeout) return null;
      return waitForFallbackPrewarmResult(track, state, key, timeout);
    }
    async function waitForFallbackPrewarmResult(track, state, fallbackKey, timeoutMs) {
      var key = fallbackKey || getTrackFallbackKey(track);
      if (!_fallbackPrewarmState.promise || _fallbackPrewarmState.key !== key) return null;
      if (_fallbackPrewarmState.result) {
        return isUsableFallbackPrewarmResult(_fallbackPrewarmState.result, state) ? _fallbackPrewarmState.result : null;
      }
      var timeout = Math.max(0, Number(timeoutMs) || 0);
      if (!timeout) return null;
      return Promise.race([
        _fallbackPrewarmState.promise.then(function(result) {
          return isUsableFallbackPrewarmResult(result, state) ? result : null;
        }),
        new Promise(function(resolve) { setTimeout(function() { resolve(null); }, timeout); })
      ]);
    }
    function applyFallbackRecovery(track, recovered) {
      var recoveredTrack = recovered && recovered.track ? recovered.track : recovered;
      var url = normalizeAudioUrl(recovered && recovered.url || recoveredTrack && recoveredTrack.src || '');
      if (!track || !recoveredTrack || !url) return '';
      var origTitle = track.title, origArtist = track.artist, origCover = track.cover;
      Object.assign(track, recoveredTrack, {
        title: origTitle || recoveredTrack.title,
        artist: origArtist || recoveredTrack.artist,
        cover: origCover || recoveredTrack.cover || DEFAULT_COVER,
        source: recoveredTrack.source || track.source,
        sourceLabel: recoveredTrack.sourceLabel || getSourceLabel(recoveredTrack.source || track.source),
        urlId: recoveredTrack.urlId || recoveredTrack.url_id || recoveredTrack.id || track.urlId || track.url_id || track.id || '',
        src: url
      });
      return url;
    }
    function isAudioProxyUrl(url) {
      try {
        var parsed = new URL(String(url || ''), location.origin);
        return parsed.pathname === '/api/audio-proxy' || parsed.pathname === '/api/kuwo-audio' || parsed.pathname === '/proxy';
      } catch (error) {
        return false;
      }
    }
    function isDeprecatedKuwoAudioUrl(url) {
      try {
        var parsed = new URL(String(url || ''), location.origin);
        return parsed.pathname === '/api/kuwo-audio';
      } catch (error) {
        return /\/api\/kuwo-audio(?:\?|$)/i.test(String(url || ''));
      }
    }
    function isBlockedAudioUrl(url) {
      var text = normalizeAudioUrl(url).toLowerCase();
      if (!text) return false;
      var decoded = text;
      try {
        decoded = decodeURIComponent(text);
      } catch (error) {}
      return /(?:current[-_\s./]*channel[-_\s./]*(?:unavailable|forbidden|blocked|cannot[-_\s./]*play|cant[-_\s./]*play)|(?:cannot|cant)[-_\s./]*play|no[-_\s./]*free|copyright[-_\s./]*(?:notice|unavailable|blocked)|trylisten|audition|prompt[-_\s./]*(?:audio|notice)?)/i.test(decoded) ||
        /(?:当前.*?(?:渠道|音源).*?(?:无法播放|不可播放|不能播放)|(?:渠道|音源).*?(?:无法播放|不可播放|不能播放)|版权.*?(?:无法播放|不可播放|不能播放|暂无)|暂不支持|暂无版权|试听|提示音)/.test(decoded);
    }
    function normalizeAudioUrl(url) {
      return String(url || '').trim().replace(/&amp;/g, '&');
    }
    function isAutoplayPolicyBlocked(error) {
      var name = String(error && error.name || '');
      var message = String(error && error.message || error || '').toLowerCase();
      return name === 'NotAllowedError' || message.includes('user didn') || message.includes('autoplay');
    }
    function getAudioProxyUrl(url) {
      if (audioApiEndpoint) return audioApiEndpoint + '?url=' + encodeURIComponent(normalizeAudioUrl(url));
      var base = (_isLocalDev || useSameOriginAudioApi) ? '' : ljyytApiBase;
      return base + '/api/audio-proxy?url=' + encodeURIComponent(normalizeAudioUrl(url));
    }
    function isSilentAudioPrimerSrc(url) {
      return String(url || '') === SILENT_AUDIO_DATA_URI;
    }
    async function tryProxyPlaybackLine(rawUrl, requestId) {
      var lifecycle = typeof _proxyPlaybackAttemptLifecycle !== 'undefined' ? _proxyPlaybackAttemptLifecycle : null;
      function isAttemptActive() {
        return !lifecycle || lifecycle.active !== false;
      }
      rawUrl = normalizeAudioUrl(rawUrl);
      if (!/^https?:\/\//i.test(rawUrl) || isAudioProxyUrl(rawUrl)) return false;
      if (requestId && requestId !== _playRequestId) return false;
      if (!isAttemptActive()) return false;
      var proxyUrl = getAudioProxyUrl(rawUrl);
      var previousTrack = currentTrack ? Object.assign({}, currentTrack) : null;
      try {
        if (typeof setResolvingUrlState === 'function') setResolvingUrlState(true); else _isResolvingUrl = true;
        currentTrack.src = proxyUrl;
        audioPlayer.src = proxyUrl;
        audioPlayer.load();
        if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;
        await playAudioWithTimeout(PROXY_LINE_PLAYBACK_TIMEOUT_MS);
        if (requestId && requestId !== _playRequestId) return false;
        if (!isAttemptActive()) return false;
        if (!await confirmPlaybackStarted(requestId || _playRequestId)) throw new Error('Audio proxy line did not start playback');
        if (!isAttemptActive()) return false;
        _playRetryCount = 0;
        reconcileCurrentTrackInQueue(previousTrack);
        addHistory(currentTrack);
        setPlayIcons(true);
        savePlaybackState(true);
        return true;
      } catch (error) {
        if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;
        if (requestId && requestId !== _playRequestId) return false;
        if (!isAttemptActive()) return false;
        if (isAutoplayPolicyBlocked(error)) return false;
        rememberPlaybackFailure(currentTrack, proxyUrl, currentTrack && currentTrack.source);
        console.warn('tryProxyPlaybackLine failed', error);
        return false;
      }
    }
    async function switchToFallbackSource(reason, requestId, failedUrl) {
      if (requestId && requestId !== _playRequestId) return false;
      if (!currentTrack || _isResolvingUrl) return false;
      if (!isSmartSourceEnabled()) return false;
      failedUrl = failedUrl || currentTrack.src || audioPlayer.getAttribute('src') || '';
      var fallbackKey = typeof getTrackFallbackKey === 'function' ? getTrackFallbackKey(currentTrack) : '';
      rememberPlaybackFailure(currentTrack, failedUrl, currentTrack.source, fallbackKey);
      var initialState = ensureFallbackState(currentTrack, fallbackKey);
      var prewarmGraceMs = typeof PREWARM_FAST_SWITCH_GRACE_MS === 'number' ? PREWARM_FAST_SWITCH_GRACE_MS : 180;
      var fastPrewarmed = typeof waitForFallbackPrewarmResult === 'function'
        ? await waitForFallbackPrewarmResult(currentTrack, initialState, fallbackKey, prewarmGraceMs)
        : null;
      if (requestId && requestId !== _playRequestId) return false;
      var proxyAttemptControl = null;
      if (!fastPrewarmed) {
        proxyAttemptControl = { active: true };
        _proxyPlaybackAttemptLifecycle = proxyAttemptControl;
        var proxyAttempt = Promise.resolve().then(function() {
          return tryProxyPlaybackLine(failedUrl, requestId);
        }).catch(function() { return false; });
        var proxyFirstResult = '';
        if (typeof setTimeout === 'function') {
          proxyFirstResult = await Promise.race([
            proxyAttempt.then(function(switched) { return switched ? 'proxy' : ''; }),
            new Promise(function(resolve) { setTimeout(function() { resolve(''); }, 35); })
          ]);
        } else {
          proxyFirstResult = await proxyAttempt.then(function(switched) { return switched ? 'proxy' : ''; });
        }
        if (proxyFirstResult === 'proxy') {
          _proxyPlaybackAttemptLifecycle = null;
          return true;
        }
        proxyAttemptControl.active = false;
        _proxyPlaybackAttemptLifecycle = null;
      }
      var candidateSources = inferTrackSourceCandidates(currentTrack);
      var hasAlternativeSource = candidateSources.some(function(source) {
        return initialState.sources.indexOf(source) < 0;
      });
      if (requestId && requestId !== _playRequestId) return false;
      var attemptLimit = Math.max(1, candidateSources.length);
      for (var attempt = 0; attempt < attemptLimit; attempt++) {
        if (requestId && requestId !== _playRequestId) return false;
        var state = ensureFallbackState(currentTrack, fallbackKey);
        var previousFailedSources = state.sources.slice();
        var previousFailedUrls = state.urls.slice();
        var previousTrack = currentTrack ? Object.assign({}, currentTrack) : null;
        try {
          if (typeof setResolvingUrlState === 'function') setResolvingUrlState(true); else _isResolvingUrl = true;
          setPlayIcons(true);
          var prewarmed = fastPrewarmed || await consumeFallbackPrewarm(currentTrack, state, fallbackKey);
          fastPrewarmed = null;
          var fallbackUrl = prewarmed ? applyFallbackRecovery(currentTrack, prewarmed) : '';
          if (!fallbackUrl) {
            currentTrack.src = '';
            audioPlayer.removeAttribute('src');
            audioPlayer.load();
            fallbackUrl = await recoverPlayableTrackUrl(currentTrack, {
              skipSources: state.sources.slice(),
              skipUrls: state.urls.slice(),
              quickOnly: true
            });
            if (!fallbackUrl) {
              fallbackUrl = await recoverPlayableTrackUrl(currentTrack, {
                skipSources: state.sources.slice(),
                skipUrls: state.urls.slice(),
                searchLimit: Math.min(30, SEARCH_RESULT_LIMIT),
                silent: true
              });
            }
            if (!fallbackUrl) {
              var latePrewarmGraceMs = typeof FALLBACK_PREWARM_LATE_GRACE_MS === 'number' ? FALLBACK_PREWARM_LATE_GRACE_MS : 180;
              prewarmed = await consumeFallbackPrewarm(currentTrack, state, fallbackKey, latePrewarmGraceMs);
              fallbackUrl = prewarmed ? applyFallbackRecovery(currentTrack, prewarmed) : '';
            }
          }
          if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;
          if (requestId && requestId !== _playRequestId) return false;
          if (!fallbackUrl) return false;
          if (audioPlayer.getAttribute('src') !== fallbackUrl) {
            audioPlayer.src = fallbackUrl;
            audioPlayer.load();
          }
          if (restoredPlaybackTime && audioPlayer.readyState > 0) {
            audioPlayer.currentTime = Math.min(restoredPlaybackTime, audioPlayer.duration || restoredPlaybackTime);
            restoredPlaybackTime = 0;
          }
          var trialTimeoutMs = typeof FALLBACK_TRIAL_PLAYBACK_TIMEOUT_MS === 'number' ? FALLBACK_TRIAL_PLAYBACK_TIMEOUT_MS : FALLBACK_PLAYBACK_TIMEOUT_MS;
          await playAudioWithTimeout(trialTimeoutMs);
          if (requestId && requestId !== _playRequestId) return false;
          if (!await confirmPlaybackStarted(requestId || _playRequestId)) throw new Error('Audio fallback did not start playback');
          _playRetryCount = 0;
          resetFallbackState(currentTrack, fallbackKey);
          reconcileCurrentTrackInQueue(previousTrack);
          updateTrackUi(currentTrack);
          updateLikeButton();
          loadLyricsForTrack(currentTrack);
          addHistory(currentTrack);
          setPlayIcons(true);
          savePlaybackState(true);
          showToast('已自动切换至: ' + getTrackSourceDisplayName(currentTrack), 2200);
          return true;
        } catch (error) {
          if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;
          if (requestId && requestId !== _playRequestId) return false;
          if (isAutoplayPolicyBlocked(error)) return false;
          var activeState = ensureFallbackState(currentTrack, fallbackKey);
          previousFailedSources.forEach(function(source) {
            if (source && activeState.sources.indexOf(source) < 0) activeState.sources.push(source);
          });
          previousFailedUrls.forEach(function(url) {
            if (url && activeState.urls.indexOf(url) < 0) activeState.urls.push(url);
          });
          rememberPlaybackFailure(currentTrack, currentTrack && currentTrack.src || audioPlayer.getAttribute('src') || '', currentTrack && currentTrack.source, fallbackKey);
          console.warn('switchToFallbackSource failed', error);
        }
      }
      return false;
    }
    function unlockAudioContext(useSilentPrimer) {
      if (_audioUnlocked) return;
      try {
        if (useSilentPrimer && (!audioPlayer.getAttribute('src') || isSilentAudioPrimerSrc(audioPlayer.getAttribute('src')))) {
          var wasMuted = audioPlayer.muted;
          audioPlayer.muted = true;
          audioPlayer.src = SILENT_AUDIO_DATA_URI;
          audioPlayer.load();
          audioPlayer.play().then(function() {
            if (isSilentAudioPrimerSrc(audioPlayer.getAttribute('src'))) {
              audioPlayer.pause();
              audioPlayer.removeAttribute('src');
              audioPlayer.load();
            }
            audioPlayer.muted = wasMuted;
          }).catch(function() {
            audioPlayer.muted = wasMuted;
          });
        } else {
          audioPlayer.volume = audioPlayer.volume;
          audioPlayer.play().then(function() { audioPlayer.pause(); }).catch(function() {});
        }
        _audioUnlocked = true;
      } catch (e) {}
    }
    function waitForAudioReady(timeoutMs) {
      if (audioPlayer.error) return Promise.reject(new Error('AUDIO_NOT_READY'));
      if (audioPlayer.readyState >= 2) return Promise.resolve();
      return new Promise(function(resolve, reject) {
        var done = false;
        var timer = setTimeout(function() { finish(reject, new Error('AUDIO_NOT_READY')); }, timeoutMs || 6500);
        function cleanup() {
          audioPlayer.removeEventListener('loadedmetadata', onReady);
          audioPlayer.removeEventListener('canplay', onReady);
          audioPlayer.removeEventListener('canplaythrough', onReady);
          audioPlayer.removeEventListener('error', onError);
          clearTimeout(timer);
        }
        function finish(fn, value) {
          if (done) return;
          done = true;
          cleanup();
          fn(value);
        }
        function onReady() { finish(resolve); }
        function onError() { finish(reject, new Error('AUDIO_NOT_READY')); }
        audioPlayer.addEventListener('loadedmetadata', onReady, { once: true });
        audioPlayer.addEventListener('canplay', onReady, { once: true });
        audioPlayer.addEventListener('canplaythrough', onReady, { once: true });
        audioPlayer.addEventListener('error', onError, { once: true });
      });
    }
    function isPrewarmFallbackReadySignal(error) {
      return String(error && error.message || error || '') === 'PREWARM_FALLBACK_READY';
    }
    function waitForPrewarmFallbackDuringPrimary(track, fallbackKey, timeoutMs) {
      if (!isSmartSourceEnabled() || typeof waitForFallbackPrewarmResult !== 'function') return null;
      if (!track || !track.title) return null;
      var key = fallbackKey || getTrackFallbackKey(track);
      if (!_fallbackPrewarmState.promise || _fallbackPrewarmState.key !== key) return null;
      var state = ensureFallbackState(track, key);
      var timeout = Math.max(0, Number(timeoutMs) || 0);
      if (!timeout) return null;
      return new Promise(function(resolve, reject) {
        var done = false;
        var timer = setTimeout(function() {
          done = true;
          resolve(null);
        }, timeout);
        waitForFallbackPrewarmResult(track, state, key, timeout).then(function(result) {
          if (done || !result) return;
          done = true;
          clearTimeout(timer);
          reject(new Error('PREWARM_FALLBACK_READY'));
        }).catch(function() {
          if (done) return;
          done = true;
          clearTimeout(timer);
          resolve(null);
        });
      });
    }
    async function playAudioWithTimeout(timeoutMs, options) {
      options = options || {};
      var playPromise = audioPlayer.play();
      var races = [
        playPromise,
        waitForAudioReady(timeoutMs || 8000),
        new Promise(function(resolve, reject) {
          setTimeout(function() { reject(new Error('AUDIO_NOT_READY')); }, timeoutMs || 8000);
        })
      ];
      var prewarmRace = options.prewarmFallbackTrack
        ? waitForPrewarmFallbackDuringPrimary(
          options.prewarmFallbackTrack,
          options.fallbackKey,
          options.prewarmFallbackGraceMs
        )
        : null;
      if (prewarmRace) races.push(prewarmRace);
      await Promise.race(races);
    }
    function isTruncatedAudioDuration(actualSeconds, expectedSeconds) {
      actualSeconds = Number(actualSeconds);
      expectedSeconds = Number(expectedSeconds);
      if (!Number.isFinite(actualSeconds) || actualSeconds <= 0) return false;
      if (Number.isFinite(expectedSeconds) && expectedSeconds > 0) {
        return expectedSeconds - actualSeconds > 30 && actualSeconds < expectedSeconds * 0.6;
      }
      return actualSeconds <= 35;
    }
    async function confirmPlaybackStarted(requestId) {
      await new Promise(function(resolve) { setTimeout(resolve, 200); });
      if (requestId && requestId !== _playRequestId) return true;
      if (audioPlayer.paused || audioPlayer.error) return false;
      var trackSource = typeof currentTrack !== 'undefined' && currentTrack ? String(currentTrack.source || '') : '';
      if (trackSource && trackSource !== 'local') {
        var expectedDuration = typeof parseTrackDuration === 'function' && currentTrack ? parseTrackDuration(currentTrack.duration) : 0;
        if (isTruncatedAudioDuration(audioPlayer.duration, expectedDuration)) return false;
      }
      return true;
    }
    const MAX_CONSECUTIVE_AUTO_SKIPS = 2;
    async function autoPlayNextAfterFailure(requestId) {
      if (requestId && requestId !== _playRequestId) return false;
      const tracks = playQueue.length ? playQueue : await ensureLibraryTracks();
      if (requestId && requestId !== _playRequestId) return false;
      if (!tracks.length || tracks.length <= 1) return false;
      var skipLimit = Math.min(MAX_CONSECUTIVE_AUTO_SKIPS, tracks.length - 1);
      if (_autoSkipFailureCount >= skipLimit) return false;
      _autoSkipFailureCount++;
      await playTrackAt(queueIndex + 1, { autoSkip: true });
      return true;
    }
    async function handleNoPlayableSource(reason, requestId) {
      if (requestId && requestId !== _playRequestId) return false;
      setPlayIcons(false);
      if (await autoPlayNextAfterFailure(requestId)) {
        showToast('未找到可用音源，播放下一首', 2000);
        return true;
      }
      resetAutoSkipFailureCount();
      audioPlayer.pause();
      setPlayIcons(false);
      showToast(isSmartSourceEnabled() ? '连续多首都没有可用音源，已暂停播放' : '当前音源暂时无法播放', 2600);
      return false;
    }
    async function playCurrentTrack() {
      pausePreviewVideo();
      if (!currentTrack) return;
      var requestId = ++_playRequestId;
      if (!audioPlayer.getAttribute('src') || isSilentAudioPrimerSrc(audioPlayer.getAttribute('src'))) setCurrentTrack(currentTrack);
      var hadPlayableSrc = !!currentTrack.src;
      unlockAudioContext(!hadPlayableSrc);
      if (isSmartSourceEnabled()) startFallbackPrewarm(currentTrack);
      if (isDeprecatedKuwoAudioUrl(currentTrack.src)) currentTrack.src = '';
      if (currentTrack.src) {
        if (audioPlayer.getAttribute('src') !== currentTrack.src) {
          audioPlayer.src = currentTrack.src;
          audioPlayer.load();
        }
        try {
          if (restoredPlaybackTime && audioPlayer.readyState > 0) {
            audioPlayer.currentTime = Math.min(restoredPlaybackTime, audioPlayer.duration || restoredPlaybackTime);
            restoredPlaybackTime = 0;
          }
          await playAudioWithTimeout(PRIMARY_PLAYBACK_TIMEOUT_MS, {
            prewarmFallbackTrack: currentTrack,
            fallbackKey: getTrackFallbackKey(currentTrack),
            prewarmFallbackGraceMs: PRIMARY_PREWARM_FALLBACK_GRACE_MS
          });
          if (!await confirmPlaybackStarted(requestId)) throw new Error('Audio did not start playback');
          if (requestId !== _playRequestId) return;
          _playRetryCount = 0;
          resetAutoSkipFailureCount();
          addHistory(currentTrack);
          setPlayIcons(true);
          savePlaybackState(true);
          return;
        } catch (e) {
          if (requestId !== _playRequestId) return;
          if (isPrewarmFallbackReadySignal(e) && await switchToFallbackSource('prewarm-ready', requestId)) return;
          if (await switchToFallbackSource('play-failed', requestId)) return;
        }
      }
      if (typeof setResolvingUrlState === 'function') setResolvingUrlState(true); else _isResolvingUrl = true;
      setPlayIcons(true);
      var trackToPlay = currentTrack;
      var playableUrl = '';
      try {
        var resolvePromise = ensurePlayableTrackUrl(trackToPlay);
        var resolvePrewarmRace = isSmartSourceEnabled()
          ? waitForPrewarmFallbackDuringPrimary(trackToPlay, getTrackFallbackKey(trackToPlay), PRIMARY_RESOLVE_PREWARM_GRACE_MS)
          : null;
        playableUrl = resolvePrewarmRace ? await Promise.race([resolvePromise, resolvePrewarmRace]) : await resolvePromise;
      } catch (error) {
        if (isPrewarmFallbackReadySignal(error)) {
          if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;
          if (await switchToFallbackSource('prewarm-ready', requestId)) return;
        } else {
          console.warn('ensurePlayableTrackUrl failed', error);
        }
      } finally {
        if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;
      }
      if (requestId !== _playRequestId) return;
      if (playableUrl) {
        currentTrack.src = playableUrl;
        reconcileCurrentTrackInQueue(trackToPlay);
      }
      if (playableUrl && audioPlayer.getAttribute('src') !== playableUrl) {
        audioPlayer.src = playableUrl;
        audioPlayer.load();
      }
      if (!playableUrl) {
        if (isSmartSourceEnabled() && await switchToFallbackSource('resolve-empty', requestId)) return;
        await handleNoPlayableSource('resolve-empty', requestId);
        return;
      }
      try {
        if (restoredPlaybackTime && audioPlayer.readyState > 0) {
          audioPlayer.currentTime = Math.min(restoredPlaybackTime, audioPlayer.duration || restoredPlaybackTime);
          restoredPlaybackTime = 0;
        }
        await playAudioWithTimeout(PRIMARY_PLAYBACK_TIMEOUT_MS);
        if (!await confirmPlaybackStarted(requestId)) throw new Error('Audio did not start playback');
        if (requestId !== _playRequestId) return;
        _playRetryCount = 0;
        resetAutoSkipFailureCount();
        addHistory(currentTrack);
        setPlayIcons(true);
        savePlaybackState(true);
      } catch (error) {
        if (requestId !== _playRequestId) return;
        if (isPrewarmFallbackReadySignal(error) && await switchToFallbackSource('prewarm-ready', requestId)) return;
        if (isAutoplayPolicyBlocked(error)) {
          setPlayIcons(false);
          if (audioPlayer.getAttribute('src')) savePlaybackState(true);
          showToast('音源已就绪，请再次点击播放');
          return;
        }
        if (await switchToFallbackSource('play-failed', requestId)) return;
        if (_playRetryCount < 1 && currentTrack && currentTrack.source && currentTrack.source !== 'local') {
          _playRetryCount++;
          currentTrack.src = '';
          if (typeof setResolvingUrlState === 'function') setResolvingUrlState(true); else _isResolvingUrl = true;
          audioPlayer.removeAttribute('src');
          audioPlayer.load();
          if (typeof setResolvingUrlState === 'function') setResolvingUrlState(false); else _isResolvingUrl = false;
          return playCurrentTrack();
        }
        _playRetryCount = 0;
        await handleNoPlayableSource('play-failed', requestId);
      }
    }
    function pauseCurrentTrack() {
      cancelPendingPlaybackWork();
      audioPlayer.pause();
      setPlayIcons(false);
    }
    function toggleAudio(event) {
      if (event) event.stopPropagation();
      if (audioPlayer.paused) playCurrentTrack();
      else pauseCurrentTrack();
    }
    async function playTrackAt(index, options) {
      options = options || {};
      if (!options.autoSkip) resetAutoSkipFailureCount();
      const tracks = playQueue.length ? playQueue : await ensureLibraryTracks();
      if (!tracks.length) return;
      queueIndex = (index + tracks.length) % tracks.length;
      currentTrackIndex = queueIndex;
      setQueue(tracks, queueIndex);
      setCurrentTrack(tracks[queueIndex]);
      await playCurrentTrack();
    }
    function previousTrack(event) {
      if (event) event.stopPropagation();
      playTrackAt(queueIndex - 1);
    }
    function nextTrack(event) {
      if (event) event.stopPropagation();
      playTrackAt(queueIndex + 1);
    }
    async function handleTrackEnded() {
      const mode = playModes[playModeIndex].value;
      if (mode === 'single') {
        audioPlayer.currentTime = 0;
        await playCurrentTrack();
        return;
      }
      if (mode === 'shuffle') {
        const tracks = playQueue.length ? playQueue : await ensureLibraryTracks();
        if (!tracks.length) return;
        const nextIndex = tracks.length > 1
          ? (queueIndex + 1 + Math.floor(Math.random() * (tracks.length - 1))) % tracks.length
          : queueIndex;
        playTrackAt(nextIndex);
        return;
      }
      nextTrack();
    }
    function restartTrack() {
      audioPlayer.currentTime = 0;
      playCurrentTrack();
    }
    function cyclePlayMode(event) {
      if (event) event.stopPropagation();
      playModeIndex = (playModeIndex + 1) % playModes.length;
      writeStoredValue('ljyyt_play_mode_index', playModeIndex);
      document.getElementById('play-mode-label').textContent = playModes[playModeIndex].label;
      updateControlIcons();
    }
    function toggleQueueDrawer(event) {
      if (event) event.stopPropagation();
      queueDrawerTab = 'queue';
      renderQueue();
      const drawer = document.getElementById('queue-drawer');
      const willOpen = !drawer?.classList.contains('open');
      setQueueDrawerOpen(willOpen, event && event.currentTarget);
      document.getElementById('action-drawer')?.classList.remove('open');
      scrollCurrentQueueItemIntoView();
    }
    function openQueueFromMini(event) {
      if (event) event.stopPropagation();
      queueDrawerTab = 'queue';
      renderQueue();
      document.getElementById('action-drawer')?.classList.remove('open');
      setQueueDrawerOpen(true, event && event.currentTarget);
      scrollCurrentQueueItemIntoView();
    }
    var lastQueueDrawerTrigger = null;
    function setQueueDrawerOpen(open, trigger) {
      var contentEl = document.querySelector('.content');
      const drawer = document.getElementById('queue-drawer');
      if (open) {
        lastQueueDrawerTrigger = trigger && typeof trigger.focus === 'function' ? trigger : document.activeElement;
        document.body.style.overflow = 'hidden';
        if (contentEl) contentEl.style.overflowY = 'hidden';
      } else {
        document.body.style.overflow = '';
        if (contentEl) contentEl.style.overflowY = '';
      }
      drawer?.classList.toggle('open', !!open);
      drawer?.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.getElementById('queue-button')?.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.getElementById('mini-queue-button')?.setAttribute('aria-expanded', open ? 'true' : 'false');
      const scrim = document.getElementById('queue-scrim');
      scrim?.classList.toggle('open', !!open);
      scrim?.classList.toggle('light', !document.getElementById('full-player')?.classList.contains('open'));
      if (open) {
        drawer?.focus({ preventScroll: true });
        requestAnimationFrame(function() {
          var current = document.querySelector('#queue-drawer-list .current-track');
          if (current) current.scrollIntoView({ block: 'center', behavior: 'instant' });
        });
      } else {
        if (lastQueueDrawerTrigger && typeof lastQueueDrawerTrigger.focus === 'function') {
          lastQueueDrawerTrigger.focus({ preventScroll: true });
        }
        lastQueueDrawerTrigger = null;
      }
    }
    function closeQueueDrawer(event) {
      if (event) event.stopPropagation();
      setQueueDrawerOpen(false);
    }
    function switchQueueTab(event, tab) {
      if (event) event.stopPropagation();
      queueDrawerTab = tab === 'history' ? 'history' : 'queue';
      renderQueue();
    }
    function clearCurrentQueue(event) {
      if (event) event.stopPropagation();
      var msg = queueDrawerTab === 'history' ? '确定清空播放历史吗？' : '确定清空播放列表吗？';
      showConfirm(msg, function() {
        if (queueDrawerTab === 'history') {
          historyTracks = [];
          writeStoredList('ljyyt_otter_history', historyTracks);
        } else {
          playQueue = currentTrack ? [currentTrack] : [];
          queueIndex = 0;
        }
        renderQueue();
        renderHistory();
      });
    }
    function reshuffleQueue(event) {
      if (event) event.stopPropagation();
      if (!playQueue.length || playQueue.length < 2) return;
      const current = currentTrack;
      const rest = playQueue.filter((item) => !isSameTrack(item, current));
      for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = rest[i];
        rest[i] = rest[j];
        rest[j] = tmp;
      }
      playQueue = current ? [current, ...rest] : rest;
      queueIndex = 0;
      currentTrackIndex = 0;
      renderQueue();
      scrollCurrentQueueItemIntoView();
    }
    function showQueuePageFromDrawer(event) {
      if (event) event.stopPropagation();
      setQueueDrawerOpen(false);
      closeFullPlayer();
      showView(queueDrawerTab === 'history' ? 'history' : 'queue');
    }
    function removeTrackFromQueue(event, index, fromHistory) {
      if (event) event.stopPropagation();
      if (fromHistory) {
        const track = historyTracks[index];
        historyTracks = historyTracks.filter((item) => !isSameTrack(item, track));
        writeStoredList('ljyyt_otter_history', historyTracks);
      } else {
        const queue = playQueue.length ? playQueue : (currentTrack ? [currentTrack] : []);
        const track = queue[index];
        const removingCurrent = isSameTrack(track, currentTrack);
        playQueue = queue.filter((item, itemIndex) => itemIndex !== index);
        if (removingCurrent && playQueue.length) {
          queueIndex = Math.max(0, Math.min(index, playQueue.length - 1));
          setCurrentTrack(playQueue[queueIndex]);
          if (!audioPlayer.paused) playCurrentTrack();
        } else if (!playQueue.length && currentTrack && !removingCurrent) {
          playQueue = [currentTrack];
          queueIndex = 0;
        } else {
          syncQueueIndexToCurrentTrack();
        }
      }
      renderQueue();
      renderHistory();
    }
    function scrollCurrentQueueItemIntoView() {
      requestAnimationFrame(() => {
        document.querySelector('#queue-drawer-list .current-track')?.scrollIntoView({ block: 'center', behavior: 'instant' });
      });
    }
    var lastTrackActionTrigger = null;
    function closeTrackActionDrawer() {
      const drawer = document.getElementById('action-drawer');
      drawer?.classList.remove('open');
      drawer?.setAttribute('aria-hidden', 'true');
      document.getElementById('action-scrim')?.classList.remove('open');
      lastTrackActionTrigger?.setAttribute('aria-expanded', 'false');
      if (lastTrackActionTrigger && typeof lastTrackActionTrigger.focus === 'function') {
        lastTrackActionTrigger.focus({ preventScroll: true });
      }
      lastTrackActionTrigger = null;
    }
    function trackFromRow(row) {
      if (!row) return currentTrack;
      return {
        title: row.querySelector('.track-name')?.textContent?.trim() || currentTrack.title,
        artist: row.querySelector('.artist')?.textContent?.replace(/\s*·.*$/, '').trim() || currentTrack.artist,
        album: '',
        cover: row.querySelector('img')?.src || DEFAULT_COVER,
        source: 'local',
        sourceLabel: row.querySelector('.source, .source-badge')?.textContent?.trim() || '丽江曲库',
        src: ''
      };
    }
    function getFavoriteSearchQuery() {
      var input = document.getElementById('favorite-search-input');
      return String(input && input.value || '').trim().toLowerCase();
    }
    function getVisibleFavoriteTracks() {
      var query = getFavoriteSearchQuery();
      return query ? favoriteTracks.filter(function(track) {
        return [track.title, track.artist, track.album].some(function(value) {
          return String(value || '').toLowerCase().includes(query);
        });
      }) : favoriteTracks;
    }
    function trackFromRenderedRow(row) {
      if (!row) return currentTrack || { title: '', artist: '', src: '', cover: DEFAULT_COVER, duration: 0 };
      if (row.__ljyytTrack) return row.__ljyytTrack;
      var index = Number(row.dataset.index) || 0;
      var container = row.parentElement;
      var id = container && container.id;
      if (id === 'search-results') return currentSearchState.songs[index] || currentTrack;
      if (id === 'favorite-list') return getVisibleFavoriteTracks()[index] || currentTrack;
      if (id === 'market-playlist-list') return currentMarketPlaylistTracks[index] || currentTrack;
      if (id === 'history-list') return historyTracks[index] || currentTrack;
      if (id === 'queue-list') return (playQueue.length ? playQueue : [currentTrack])[index] || currentTrack;
      if (id === 'queue-drawer-list') {
        var drawerTracks = queueDrawerTab === 'history'
          ? historyTracks
          : (playQueue.length ? playQueue : [currentTrack]);
        return drawerTracks[index] || currentTrack;
      }
      return trackFromRow(row);
    }
    function openTrackActionDrawer(track, trigger) {
      if (!track) return;
      const drawer = document.getElementById('action-drawer');
      const content = document.getElementById('action-drawer-content');
      if (!drawer || !content) return;
      lastTrackActionTrigger = trigger && typeof trigger.focus === 'function' ? trigger : document.activeElement;
      lastTrackActionTrigger?.setAttribute('aria-expanded', 'true');
      const liked = favoriteTracks.some((item) => isSameTrack(item, track));
      content.innerHTML =
        '<div class="action-track">' +
          '<img src="' + escapeMarkup(safeCover(track.cover)) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '>' +
          '<div><strong id="action-drawer-title">' + escapeMarkup(track.title || '未知歌曲') + '</strong><span>' + escapeMarkup(track.artist || '未知歌手') + (track.album ? ' · ' + escapeMarkup(track.album) : '') + '</span></div>' +
        '</div>' +
        '<div class="action-list">' +
          '<button data-action="like">♡ ' + (liked ? '取消喜欢' : '喜欢') + '</button>' +
          '<button data-action="next">↳ 下一首播放</button>' +
          '<button data-action="playlist">＋ 添加到歌单</button>' +
          '<button data-action="download">⇩ 下载</button>' +
          '<button data-action="artist">♙ 歌手：' + escapeMarkup(track.artist || '未知歌手') + '</button>' +
          (track.album ? '<button data-action="album">◎ 专辑：' + escapeMarkup(track.album) + '</button>' : '') +
          '<button data-action="source">🔗 音源：<small>' + escapeMarkup(track.sourceLabel || getSourceLabel(track.source) || track.source || '丽江曲库') + '</small></button>' +
          '<button data-action="close">关闭</button>' +
        '</div>';
      content.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          handleTrackAction(button.dataset.action, track);
        });
      });
      setQueueDrawerOpen(false);
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.getElementById('action-scrim')?.classList.add('open');
      content.querySelector('button')?.focus();
    }
    function handleTrackAction(action, track) {
      if (action === 'like') {
        const liked = favoriteTracks.some((item) => isSameTrack(item, track));
        favoriteTracks = liked
          ? favoriteTracks.filter((item) => !isSameTrack(item, track))
          : [track, ...favoriteTracks];
        writeStoredList('ljyyt_otter_favorites', favoriteTracks);
        updateLikeButton();
        renderFavorites();
        showToast(liked ? '已取消喜欢' : '已添加到喜欢', 1500);
      } else if (action === 'next') {
        playQueue = playQueue.filter((item) => !isSameTrack(item, track));
        syncQueueIndexToCurrentTrack();
        const insertAt = Math.min(queueIndex + 1, playQueue.length || 1);
        playQueue.splice(insertAt, 0, track);
        renderQueue();
        showToast('已添加到下一首播放', 1500);
      } else if (action === 'playlist') {
        closeTrackActionDrawer();
        openAddToPlaylistDrawer(track);
        return;
      } else if (action === 'download') {
        downloadTrack(track);
        return;
      } else if (action === 'artist') {
        var artistQuery = String(track.artist || '').trim();
        if (artistQuery) {
          var si = getSearchInput();
          if (si) si.value = artistQuery;
          var hi = getHomeSearchInput();
          if (hi) hi.value = artistQuery;
          closeTrackActionDrawer();
          performSearch({ remember: true });
          return;
        }
      } else if (action === 'album' && track.album) {
        var albumQuery = String(track.album).trim();
        if (albumQuery) {
          var si2 = getSearchInput();
          if (si2) si2.value = albumQuery;
          var hi2 = getHomeSearchInput();
          if (hi2) hi2.value = albumQuery;
          closeTrackActionDrawer();
          performSearch({ remember: true });
          return;
        }
      }
      closeTrackActionDrawer();
    }
    async function downloadTrack(track) {
      if (!track) return;
      var button = document.querySelector('#action-drawer-content [data-action="download"]');
      if (button) button.textContent = '正在准备下载...';
      var url = await ensurePlayableTrackUrl(track);
      if (!url) {
        if (button) button.textContent = '下载失败，请换音源';
        showToast('当前歌曲地址解析失败，暂时无法下载');
        return;
      }
      var link = document.createElement('a');
      var filename = (track.title || 'song') + ' - ' + (track.artist || 'unknown') + '.mp3';
      link.href = url;
      link.download = filename.replace(/[\/:*?"<>|]+/g, '_');
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
      if (button) button.textContent = '已开始下载';
      showToast('开始下载：' + (track.title || '歌曲'), 2000);
      setTimeout(closeTrackActionDrawer, 500);
    }
    let isSeekingAudio = false;
    function applySeekFromClientX(clientX) {
      const seek = document.getElementById('full-seek');
      const line = document.getElementById('seek-line');
      const rect = (seek || line).getBoundingClientRect();
      const duration = getSeekableDuration();
      if (!duration || !rect.width) return;
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      seekAudioToTime(duration * ratio);
    }
    function seekAudio(event) {
      if (!event) return;
      event.preventDefault?.();
      event.stopPropagation?.();
      applySeekFromClientX(event.clientX || 0);
    }
    function initSeekDragging() {
      const seek = document.getElementById('full-seek');
      if (!seek || seek.dataset.dragReady) return;
      seek.dataset.dragReady = 'true';
      seek.addEventListener('pointerdown', function(event) {
        if (event.button !== undefined && event.button !== 0) return;
        isSeekingAudio = true;
        seek.setPointerCapture?.(event.pointerId);
        applySeekFromClientX(event.clientX);
        event.preventDefault();
        event.stopPropagation();
      });
      seek.addEventListener('pointermove', function(event) {
        if (!isSeekingAudio) return;
        applySeekFromClientX(event.clientX);
        event.preventDefault();
        event.stopPropagation();
      });
      function endSeek(event) {
        if (!isSeekingAudio) return;
        isSeekingAudio = false;
        try { seek.releasePointerCapture?.(event.pointerId); } catch (error) {}
      }
      seek.addEventListener('pointerup', endSeek);
      seek.addEventListener('pointercancel', endSeek);
    }
    function toggleLike(event, button) {
      if (event) event.stopPropagation();
      const exists = favoriteTracks.some((track) => isSameTrack(track, currentTrack));
      favoriteTracks = exists
        ? favoriteTracks.filter((track) => !isSameTrack(track, currentTrack))
        : [currentTrack, ...favoriteTracks];
      writeStoredList('ljyyt_otter_favorites', favoriteTracks);
      updateLikeButton();
      renderFavorites();
      showToast(exists ? '已取消喜欢' : '已添加到喜欢', 1500);
    }
    async function copyTextToClipboard(text) {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        return true;
      }
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-1000px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      var copied = false;
      try {
        copied = document.execCommand && document.execCommand('copy');
      } finally {
        textarea.remove();
      }
      return !!copied;
    }
    async function shareCurrentTrack() {
      const text = currentTrack.title + ' - ' + currentTrack.artist;
      try {
        if (navigator.share && typeof navigator.share === 'function') {
          await navigator.share({ title: '丽江音悦台', text });
        } else if (await copyTextToClipboard(text)) {
          showToast('已复制歌曲信息到剪贴板');
        }
      } catch (error) {
        if (error && error.name === 'AbortError') return;
        console.warn('share failed', error);
        try {
          if (await copyTextToClipboard(text)) showToast('已复制歌曲信息到剪贴板');
          else showToast('分享失败，请稍后重试');
        } catch (copyError) {
          console.warn('share fallback copy failed', copyError);
          showToast('分享失败，请稍后重试');
        }
      }
    }
    function updateLikeButton() {
      const button = document.querySelector('.like');
      if (!button) return;
      const liked = favoriteTracks.some((track) => isSameTrack(track, currentTrack));
      button.innerHTML = liked ? iconHtml('heartFilled') : iconHtml('heart');
      button.setAttribute('aria-label', liked ? '取消喜欢' : '喜欢');
    }
    function isKeyboardActivation(event) {
      return !!event && (event.key === 'Enter' || event.key === ' ' || event.code === 'Space');
    }
    function bindTrackRowKeyboard(row, handler) {
      if (!row || typeof handler !== 'function') return;
      row.addEventListener('keydown', function(event) {
        if (event.target !== row || !isKeyboardActivation(event)) return;
        event.preventDefault();
        handler(event);
      });
    }
    function getTrackRowAriaLabel(track) {
      var title = String(track && track.title || '未知歌曲').trim();
      var artist = String(track && track.artist || '').trim();
      return '播放 ' + title + (artist ? ' - ' + artist : '');
    }
    function renderTrackRows(container, tracks, emptyText, artistSuffix) {
      if (!tracks.length) {
        container.innerHTML = '<div class="empty-note">' + emptyText + '</div>';
        return;
      }
      container.innerHTML = tracks.map((track, index) => (
        '<div class="track" role="button" tabindex="0" aria-label="' + escapeMarkup(getTrackRowAriaLabel(track)) + '" data-index="' + index + '">' +
          '<img loading="lazy" src="' + escapeMarkup(safeCover(track.cover)) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '>' +
          '<div class="track-meta"><div class="track-name">' + escapeMarkup(track.title) + '</div><div class="artist">' + escapeMarkup(track.artist + (artistSuffix || '')) + (shouldShowSourceLabels() && track.sourceLabel && track.source !== 'local' ? '<span class="source-tag">' + escapeMarkup(track.sourceLabel) + '</span>' : '') + '</div></div>' +
          '<button class="dots" type="button" data-track-action-trigger aria-label="更多" aria-haspopup="dialog" aria-expanded="false">' + iconHtml('more') + '</button>' +
        '</div>'
      )).join('');
      container.querySelectorAll('.track').forEach((row, index) => {
        row.__ljyytTrack = tracks[index];
        function playRowTrack() {
          const track = tracks[index];
          setQueue(tracks, index);
          setCurrentTrack(track);
          openFullPlayer();
          playCurrentTrack();
        }
        row.addEventListener('click', (event) => {
          if (event.target.closest('.dots')) {
            event.stopPropagation();
            openTrackActionDrawer(tracks[index], event.target.closest('.dots'));
            return;
          }
          playRowTrack();
        });
        bindTrackRowKeyboard(row, playRowTrack);
      });
    }
    var _coverResolveId = 0;
    function renderSearchRows(tracks, sourceLabel) {
      var container = document.getElementById('search-results');
      if (!container) return;
      document.getElementById('search-song-count').textContent = tracks.length + ' 首';
      if (!tracks.length) {
        container.innerHTML = '<div class="empty-note">没有找到匹配歌曲，换个关键词试试。</div>';
        return;
      }
      sourceLabel = sourceLabel || activeProvider;
      container.innerHTML = tracks.map(function(track, index) {
        var sourceClass = String(track.source || 'local').replace(/[^a-z0-9_-]/gi, '');
        var badge = shouldShowSourceLabels() ? '<span class="source-badge ' + escapeMarkup(sourceClass) + '">' + escapeMarkup(track.sourceLabel || getSourceLabel(track.source) || sourceLabel) + '</span>' : '';
        var variantBadge = '';
        if (track.variants && track.variants.length) {
          variantBadge = '<span class="variant-badge" data-variant-index="' + index + '">' + iconHtml('layers') + '+' + track.variants.length + '</span>';
        }
        return '<div class="track" data-index="' + index + '">' +
          '<img loading="lazy" src="' + escapeMarkup(safeCover(track.cover)) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '>' +
          '<div class="track-meta"><div class="track-name"><span>' + escapeMarkup(track.title) + '</span>' + badge + variantBadge + '</div><div class="artist">' + escapeMarkup(track.artist || '未知歌手') + (track.album ? ' · ' + escapeMarkup(track.album) : '') + '</div></div>' +
          '<button class="dots" type="button" data-track-action-trigger aria-label="更多" aria-haspopup="dialog" aria-expanded="false">' + iconHtml('more') + '</button>' +
        '</div>';
      }).join('');
      container.querySelectorAll('.track').forEach(function(row, index) {
        row.__ljyytTrack = tracks[index];
        row.addEventListener('click', function(event) {
          if (event.target.closest('.dots')) {
            event.stopPropagation();
            openTrackActionDrawer(tracks[index], event.target.closest('.dots'));
            return;
          }
          if (event.target.closest('.variant-badge')) {
            event.stopPropagation();
            showVariantPopover(tracks[index], event.target.closest('.variant-badge'));
            return;
          }
          var track = tracks[index];
          setQueue(tracks, index);
          setCurrentTrack(track);
          openFullPlayer();
          playCurrentTrack();
        });
      });
      resolveSearchCovers(tracks, container);
      preResolveSearchUrls(tracks);
    }
    var _urlResolveId = 0;
    function preResolveSearchUrls(tracks) {
      var batchId = ++_urlResolveId;
      var pending = tracks.filter(function(t) { return !t.src && t.source && t.source !== 'local' && t.urlId; });
      if (!pending.length) return;
      var PREWARM_CONCURRENCY = 8;
      var idx = 0;
      var active = 0;
      function pump() {
        if (batchId !== _urlResolveId) return;
        while (active < PREWARM_CONCURRENCY && idx < pending.length) {
          let track = pending[idx++];
          active += 1;
          resolveExternalTrackUrl(track).then(function(url) {
            if (batchId !== _urlResolveId) return;
            if (url) track.src = url;
          }).catch(function() {}).finally(function() {
            active -= 1;
            pump();
          });
        }
      }
      pump();
    }
    function resolveSearchCovers(tracks, container) {
      var batchId = ++_coverResolveId;
      var pending = tracks.filter(function(t) { return t.coverApi && (!t.cover || t.cover === DEFAULT_COVER); });
      if (!pending.length) return;
      var BATCH = 5;
      var idx = 0;
      function nextBatch() {
        if (batchId !== _coverResolveId) return;
        var slice = pending.slice(idx, idx + BATCH);
        if (!slice.length) return;
        idx += BATCH;
        Promise.all(slice.map(function(track) {
          return resolveExternalCover(track).then(function() {
            if (batchId !== _coverResolveId) return;
            var trackIdx = tracks.indexOf(track);
            if (trackIdx < 0) return;
            var row = container.querySelector('.track[data-index="' + trackIdx + '"]');
            if (row && track.cover && track.cover !== DEFAULT_COVER) {
              var img = row.querySelector('img');
              if (img) img.src = track.cover;
            }
          });
        })).then(nextBatch);
      }
      nextBatch();
    }
    async function ensureSearchVideos() {
      if (searchVideoCache.length) return searchVideoCache;
      searchVideoCache = await readSourceArray('/videos/video_data.js', 'const videoData');
      return searchVideoCache;
    }
    const RECOMMEND_CATS = [
      { id: '全部', name: '全部' },
      { id: 'mine', name: '我的' },
      { id: 'featured', name: '精选' },
      { id: '华语', name: '华语' },
      { id: '欧美', name: '欧美' },
      { id: '流行', name: '流行' },
      { id: '说唱', name: '说唱' },
      { id: '摇滚', name: '摇滚' },
      { id: '电子', name: '电子' },
      { id: '民谣', name: '民谣' },
      { id: '轻音乐', name: '轻音乐' }
    ];
    const SPECIAL_CATS = [
      { id: '官方', name: '官方' },
      { id: '榜单', name: '榜单' },
      { id: 'toplist', name: '排行榜' }
    ];
    const MARKET_PAGE_SIZE = 30;
    let activeDiscoverCategory = '全部';
    let activeFeaturedTab = '官方';
    let marketOffset = 0;
    let marketHasMore = true;
    let marketLoading = false;
    let marketItems = [];
    const marketCache = Object.create(null);
    let activeMineTab = 'recommend';
    let mineDataCache = { recommend: null, created: null, subscribed: null, albums: null };
    let mineDataLoading = false;
    let mineHasMoreAlbums = false;

    function normalizeMarketPlaylist(item) {
      item = item || {};
      return {
        id: String(item.id || item.playlistId || ''),
        name: String(item.name || item.title || '未命名歌单'),
        coverUrl: safeCover(item.coverUrl || item.coverImgUrl || item.picUrl || item.cover || DEFAULT_COVER),
        playCount: Number(item.playCount || item.playcount || 0),
        trackCount: Number(item.trackCount || item.songCount || 0),
        tags: Array.isArray(item.tags) ? item.tags : []
      };
    }
    function normalizeNeteaseApiSong(song) {
      song = song || {};
      var artists = Array.isArray(song.ar) ? song.ar : (Array.isArray(song.artists) ? song.artists : []);
      var artistText = artists.map(function(item) { return item && item.name; }).filter(Boolean).join(' / ');
      var album = song.al || song.album || {};
      var albumName = typeof album === 'string' ? album : (album.name || '');
      var cover = typeof album === 'object' ? (album.picUrl || album.picUrlStr || '') : '';
      return {
        id: String(song.id || ''),
        title: String(song.name || song.title || ''),
        artist: artistText || String(song.artist || '未知歌手'),
        album: String(albumName || ''),
        cover: safeCover(cover || DEFAULT_COVER),
        src: '',
        source: '_netease',
        provider: 'netease-api',
        sourceLabel: 'Netease',
        urlId: String(song.id || song.urlId || song.url_id || ''),
        lyric_id: String(song.id || ''),
        duration: song.dt ? parseTrackDuration(song.dt / 1000) : parseTrackDuration(song.duration || song.interval || song.time || song.length)
      };
    }

    function getNeteaseRequestBases() {
      var bases = [neteaseApiBase];
      neteaseFallbackBases.forEach(function(base) {
        if (base && bases.indexOf(base) < 0) bases.push(base);
      });
      return bases;
    }

    function isNeteaseProxyHealthPayload(payload) {
      return !!(payload && payload.ok === true && payload.service === 'ljyyt-worker' && !payload.data && !payload.playlist && !payload.playlists && !payload.result);
    }

    async function fetchOtterNetease(path, payload) {
      var bases = getNeteaseRequestBases();
      if (!bases.length) throw new Error('otter netease api failed');
      try {
        return await Promise.any(bases.map(function(base) {
          return fetch(base + path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload || {})
          }).then(function(response) {
            if (!response.ok) throw new Error('otter netease api ' + response.status);
            return response.json();
          }).then(function(data) {
            if (isNeteaseProxyHealthPayload(data)) throw new Error('netease proxy returned health payload');
            return data;
          });
        }));
      } catch (error) {
        throw new Error('otter netease api failed');
      }
    }
    function adaptBridgeNeteaseTrack(bridgeTrack) {
      if (!bridgeTrack) return null;
      return {
        id: String(bridgeTrack.id || ''),
        title: String(bridgeTrack.name || bridgeTrack.title || ''),
        artist: String(bridgeTrack.artist || '未知歌手'),
        album: String(bridgeTrack.album || ''),
        cover: safeCover(bridgeTrack.cover || DEFAULT_COVER),
        src: '',
        source: '_netease',
        provider: 'netease-api',
        sourceLabel: 'Netease',
        urlId: String(bridgeTrack.urlId || bridgeTrack.id || ''),
        lyric_id: String(bridgeTrack.lyric_id || bridgeTrack.id || ''),
        duration: parseTrackDuration(bridgeTrack.duration || 0)
      };
    }

    async function searchNeteaseApiTracks(query, count) {
      var limit = Math.max(1, Math.min(100, Number(count) || SEARCH_RESULT_LIMIT));
      // 灰度：当 LJYYT_USE_PROVIDERS_BRIDGE 打开且 bridge 已注册 _netease provider 时，优先走桥
      if (typeof window !== 'undefined' && window.LJYYT_USE_PROVIDERS_BRIDGE === true && window.LjyytProviders) {
        try {
          var bridgeProvider = window.LjyytProviders.getProvider('_netease');
          if (bridgeProvider) {
            var bridgeResult = await bridgeProvider.search(String(query || ''), 1, limit);
            var adapted = ((bridgeResult && bridgeResult.tracks) || [])
              .map(adaptBridgeNeteaseTrack)
              .filter(function(track) { return track && track.title && track.urlId; });
            if (adapted.length) return adapted;
          }
        } catch (error) {
          if (typeof console !== 'undefined' && console.warn) {
            console.warn('[providers-bridge] netease search failed, falling back to direct otter call', error);
          }
        }
      }
      var payload = await fetchOtterNetease('/search', {
        keyword: String(query || ''),
        type: 1,
        page: 1,
        limit: limit,
        cookie: ''
      });
      var songs = payload && payload.data && payload.data.result && payload.data.result.songs || [];
      return (Array.isArray(songs) ? songs : []).map(normalizeNeteaseApiSong).filter(function(track) {
        return track.title && track.urlId;
      });
    }
    function normalizeNeteasePrimaryTrack(track) {
      var normalized = normalizeNeteaseApiSong(track);
      normalized.source = 'netease';
      normalized.provider = 'netease-api';
      normalized.sourceLabel = '网易云音乐';
      return normalized;
    }
    async function searchNeteasePrimaryTracks(query, count) {
      var tracks = await searchNeteaseApiTracks(query, count);
      return tracks.map(function(track) {
        track.source = 'netease';
        track.provider = 'netease-api';
        track.sourceLabel = '网易云音乐';
        return track;
      });
    }
    async function resolveNeteaseApiTrackUrl(track) {
      if (!track || !track.urlId) return '';
      var payload = await fetchOtterNetease('/song-url', {
        id: String(track.urlId),
        br: 192000,
        cookie: ''
      });
      var item = payload && payload.data && Array.isArray(payload.data.data) ? payload.data.data[0] : null;
      return normalizeAudioUrl(item && item.url || '').replace(/^http:\/\//i, 'https://');
    }

    function unwrapMarketList(payload, type) {
      var data = payload && payload.data ? payload.data : payload;
      var raw = [];
      if (Array.isArray(data)) raw = data;
      else if (type === 'toplist') raw = data && data.list || [];
      else raw = data && (data.playlists || data.result || (data.data && data.data.playlists)) || [];
      return raw.map(normalizeMarketPlaylist).filter(function(item) { return item.id && item.coverUrl; });
    }

    async function fetchMarketPlaylists(category, offset) {
      var requestCategory = category === 'featured' ? activeFeaturedTab : category;
      var isToplist = requestCategory === 'toplist';
      var cacheKey = 'market:' + requestCategory + ':' + (isToplist ? 0 : offset);
      if (marketCache[cacheKey]) return marketCache[cacheKey];
      var payload = isToplist
        ? await fetchOtterNetease('/toplist', { cookie: '' })
        : await fetchOtterNetease('/playlists', {
            cat: requestCategory || '全部',
            order: 'hot',
            limit: MARKET_PAGE_SIZE,
            offset: offset || 0,
            cookie: ''
          });
      var list = unwrapMarketList(payload, isToplist ? 'toplist' : 'playlist');
      marketCache[cacheKey] = list;
      return list;
    }

    function renderMarketCategories() {
      var row = document.querySelector('[data-view="search"] .discover-category-row');
      if (!row) return;
      row.innerHTML = RECOMMEND_CATS.map(function(cat) {
        return '<button class="discover-category-chip' + (activeDiscoverCategory === cat.id ? ' active' : '') + '" type="button" data-discover-category="' + escapeMarkup(cat.id) + '">' + escapeMarkup(cat.name) + '</button>';
      }).join('');
      hydrateIcons(row);
      row.querySelectorAll('.discover-category-chip').forEach(function(chip) {
        chip.addEventListener('click', function() {
          activeDiscoverCategory = chip.dataset.discoverCategory || '全部';
          marketOffset = 0;
          marketHasMore = true;
          renderIndexDiscoverPlaylists({ reset: true });
        });
      });
    }

    function renderFeaturedTabs() {
      if (activeDiscoverCategory !== 'featured') return '';
      return '<div class="discover-featured-tabs">' + SPECIAL_CATS.map(function(tab) {
        return '<button class="discover-featured-tab' + (activeFeaturedTab === tab.id ? ' active' : '') + '" type="button" data-featured-tab="' + escapeMarkup(tab.id) + '">' + escapeMarkup(tab.name) + '</button>';
      }).join('') + '</div>';
    }

    function renderMarketCards() {
      return marketItems.map(function(card) {
        return '<button class="discover-playlist-card" type="button" data-market-id="' + escapeMarkup(card.id) + '">' +
          '<span class="discover-cover"><img loading="lazy" src="' + escapeMarkup(card.coverUrl || DEFAULT_COVER) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '></span>' +
          '<strong>' + escapeMarkup(card.name) + '</strong>' +
        '</button>';
      }).join('');
    }

    function normalizeNeteasePlaylistTrack(track) {
      var artists = Array.isArray(track.ar) ? track.ar.map(function(item) { return item && item.name; }).filter(Boolean).join(' / ') : '';
      var album = track.al || {};
      return {
        id: String(track.id || ''),
        title: String(track.name || track.title || '未知歌曲'),
        artist: artists || String(track.artist || '未知歌手'),
        album: String(album.name || track.album || ''),
        cover: safeCover(album.picUrl || album.picUrlStr || track.cover || DEFAULT_COVER),
        duration: track.dt ? formatDuration(track.dt / 1000) : (track.duration || ''),
        src: '',
        source: 'netease',
        provider: 'netease-api',
        sourceLabel: '网易云音乐',
        urlId: String(track.id || track.urlId || track.url_id || ''),
        lyric_id: String(track.id || '')
      };
    }
    async function fetchMarketPlaylistDetail(id) {
      var payload = await fetchOtterNetease('/playlist', { playlistId: String(id || ''), cookie: '' });
      var playlist = payload && payload.playlist ? payload.playlist : payload;
      var tracks = Array.isArray(playlist && playlist.tracks) ? playlist.tracks.map(normalizeNeteasePlaylistTrack).filter(function(track) { return track.id && track.title; }) : [];
      var creator = playlist && playlist.creator ? playlist.creator : {};
      return {
        id: String(playlist && playlist.id || id || ''),
        name: String(playlist && playlist.name || '歌单'),
        cover: safeCover(playlist && playlist.coverImgUrl || DEFAULT_COVER),
        description: String(playlist && playlist.description || ''),
        creator: String(creator.nickname || ''),
        publishTime: Number(playlist && (playlist.createTime || playlist.updateTime) || 0),
        trackCount: Number(playlist && playlist.trackCount || tracks.length || 0),
        tracks: tracks
      };
    }
    function formatDetailDate(value) {
      var date = new Date(Number(value) || 0);
      if (Number.isNaN(date.getTime()) || date.getTime() <= 0) return '';
      return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    }
    function toggleMarketPlaylistDescription() {
      document.getElementById('market-playlist-description')?.classList.toggle('expanded');
    }
    function renderMarketPlaylistDetail(meta, tracks, loadingText) {
      currentMarketPlaylistMeta = meta || currentMarketPlaylistMeta || { name: '歌单', cover: DEFAULT_COVER, trackCount: 0 };
      currentMarketPlaylistTracks = Array.isArray(tracks) ? tracks : currentMarketPlaylistTracks;
      var title = currentMarketPlaylistMeta.name || '歌单';
      var cover = safeCover(currentMarketPlaylistMeta.cover || DEFAULT_COVER);
      var count = currentMarketPlaylistTracks.length || currentMarketPlaylistMeta.trackCount || 0;
      var pageTitle = document.getElementById('market-playlist-page-title');
      var titleNode = document.getElementById('market-playlist-title');
      var countNode = document.getElementById('market-playlist-count');
      var coverNode = document.getElementById('market-playlist-cover');
      var creatorNode = document.getElementById('market-playlist-creator');
      var dateNode = document.getElementById('market-playlist-date');
      var descNode = document.getElementById('market-playlist-description');
      var summaryNode = document.getElementById('market-playlist-summary');
      var description = String(currentMarketPlaylistMeta.description || '').trim();
      var creator = String(currentMarketPlaylistMeta.creator || '').trim();
      var date = formatDetailDate(currentMarketPlaylistMeta.publishTime);
      if (pageTitle) pageTitle.textContent = title;
      if (titleNode) titleNode.textContent = title;
      if (countNode) countNode.textContent = loadingText || (count + ' 首');
      if (coverNode) coverNode.src = cover;
      if (creatorNode) {
        creatorNode.textContent = creator;
        creatorNode.hidden = !creator;
      }
      if (dateNode) {
        dateNode.textContent = date;
        dateNode.hidden = !date;
      }
      if (descNode) {
        descNode.textContent = description;
        descNode.hidden = !description;
        descNode.classList.remove('expanded');
      }
      if (summaryNode) summaryNode.classList.toggle('has-description', !!description);
      renderPageTrackRows(document.getElementById('market-playlist-list'), currentMarketPlaylistTracks, loadingText || '这个歌单暂无可播放歌曲。', function(track, index) {
        setQueue(currentMarketPlaylistTracks, index);
        setCurrentTrack(track);
        openFullPlayer();
        playCurrentTrack();
      });
    }
    async function openDiscoverCard(card) {
      if (!card || !card.id) return;
      showView('market-playlist');
      var seed = { id: String(card.id), name: card.name || card.title || '歌单', cover: card.coverUrl || card.cover || DEFAULT_COVER, trackCount: card.trackCount || 0 };
      renderMarketPlaylistDetail(seed, [], '加载中...');
      window.history.replaceState(null, '', 'index.html?view=market-playlist&playlist=' + encodeURIComponent(card.id));
      try {
        var detail = await fetchMarketPlaylistDetail(card.id);
        renderMarketPlaylistDetail(detail, detail.tracks);
      } catch (error) {
        renderMarketPlaylistDetail(seed, [], '歌单加载失败，请稍后重试。');
      }
    }
    function playFirstMarketPlaylist() {
      if (!currentMarketPlaylistTracks.length) return;
      setQueue(currentMarketPlaylistTracks, 0);
      setCurrentTrack(currentMarketPlaylistTracks[0]);
      openFullPlayer();
      playCurrentTrack();
    }

    async function renderIndexDiscoverPlaylists(options) {
      options = options || {};
      var rail = document.getElementById('index-discover-playlists');
      if (!rail) return;
      renderMarketCategories();
      if (activeDiscoverCategory === 'mine') {
        renderDiscoverMyPlaylists(rail);
        return;
      }
      if (options.reset) {
        marketItems = [];
        marketOffset = 0;
        marketHasMore = true;
      }
      if (marketLoading) return;
      marketLoading = true;
      if (!marketItems.length) rail.innerHTML = '<div class="discover-market-loading"><span data-icon="spinner"></span><span>加载中...</span></div>';
      hydrateIcons(rail);
      try {
        var list = await fetchMarketPlaylists(activeDiscoverCategory, marketOffset);
        marketItems = marketOffset === 0 ? list : marketItems.concat(list);
        marketHasMore = list.length >= MARKET_PAGE_SIZE && activeFeaturedTab !== 'toplist';
        marketOffset += list.length;
        rail.innerHTML = renderFeaturedTabs() + '<div class="discover-playlist-grid-inner">' + renderMarketCards() + '</div>' + (marketHasMore ? '<div class="discover-market-loading" id="market-load-more"><span data-icon="spinner"></span><span>加载中...</span></div>' : '');
        hydrateIcons(rail);
        rail.querySelectorAll('[data-featured-tab]').forEach(function(tab) {
          tab.addEventListener('click', function() {
            activeFeaturedTab = tab.dataset.featuredTab || '官方';
            marketOffset = 0;
            marketHasMore = true;
            renderIndexDiscoverPlaylists({ reset: true });
          });
        });
        rail.querySelectorAll('[data-market-id]').forEach(function(node) {
          node.addEventListener('click', function() {
            var id = node.dataset.marketId || '';
            openDiscoverCard(marketItems.find(function(item) { return item.id === id; }));
          });
        });
        var loadMoreEl = document.getElementById('market-load-more');
        if (loadMoreEl && 'IntersectionObserver' in window) {
          var observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting && marketHasMore && !marketLoading) {
              observer.disconnect();
              renderIndexDiscoverPlaylists();
            }
          }, { root: document.querySelector('.content'), threshold: 0.1 });
          observer.observe(loadMoreEl);
        }
      } catch (error) {
        rail.innerHTML = '<div class="discover-market-error">发现页数据加载失败，请稍后刷新重试。</div>';
      } finally {
        marketLoading = false;
      }
    }

    function renderDiscoverMyPlaylists(rail) {
      var login = getStoredNeteaseLogin();
      var isLoggedIn = !!(login && login.cookie && login.profile);
      var MINE_TABS = [
        { id: 'recommend', name: '推荐' },
        { id: 'created', name: '创建' },
        { id: 'subscribed', name: '收藏' },
        { id: 'albums', name: '专辑' }
      ];
      var tabsHtml = '<div class="discover-mine-tabs">' + MINE_TABS.map(function(tab) {
        var count = mineDataCache[tab.id] ? mineDataCache[tab.id].length : '';
        var countHtml = count !== '' ? ' <span class="discover-mine-tab-count">' + count + '</span>' : '';
        return '<button class="discover-mine-tab' + (activeMineTab === tab.id ? ' active' : '') + '" data-mine-tab="' + tab.id + '">' + tab.name + countHtml + '</button>';
      }).join('') + '</div>';

      if (!isLoggedIn) {
        rail.innerHTML = tabsHtml + '<div class="discover-my-empty"><p>请先登录网易云账号以查看歌单</p>' +
          '<button class="discover-my-btn" style="margin-top:12px" onclick="openSettingDrawer(\'netease\')">' + iconHtml('user') + ' 前往设置</button></div>';
        hydrateIcons(rail);
        bindMineTabEvents(rail);
        return;
      }

      var cached = mineDataCache[activeMineTab];
      if (cached) {
        if (activeMineTab === 'albums') {
          renderMineAlbumGrid(rail, tabsHtml, cached);
        } else {
          renderMinePlaylistGrid(rail, tabsHtml, cached);
        }
        return;
      }

      rail.innerHTML = tabsHtml + '<div class="discover-market-loading"><span data-icon="spinner"></span><span>加载中...</span></div>';
      hydrateIcons(rail);
      bindMineTabEvents(rail);

      if (mineDataLoading) return;
      mineDataLoading = true;
      fetchMineTabData(login).then(function(list) {
        mineDataCache[activeMineTab] = list;
        if (activeDiscoverCategory === 'mine') {
          var currentRail = document.getElementById('index-discover-playlists');
          if (currentRail) {
            var newTabsHtml = buildMineTabsHtml(MINE_TABS);
            if (activeMineTab === 'albums') {
              renderMineAlbumGrid(currentRail, newTabsHtml, list);
            } else {
              renderMinePlaylistGrid(currentRail, newTabsHtml, list);
            }
          }
        }
      }).catch(function() {
        var currentRail = document.getElementById('index-discover-playlists');
        if (currentRail && activeDiscoverCategory === 'mine') {
          currentRail.innerHTML = tabsHtml + '<div class="discover-my-empty"><p>加载失败，请重试</p>' +
            '<button class="discover-my-btn" style="margin-top:12px" onclick="mineDataCache[\'' + activeMineTab + '\']=null; renderIndexDiscoverPlaylists()">重试</button></div>';
          hydrateIcons(currentRail);
          bindMineTabEvents(currentRail);
        }
      }).finally(function() { mineDataLoading = false; });
    }

    function buildMineTabsHtml(MINE_TABS) {
      return '<div class="discover-mine-tabs">' + MINE_TABS.map(function(tab) {
        var count = mineDataCache[tab.id] ? mineDataCache[tab.id].length : '';
        var countHtml = count !== '' ? ' <span class="discover-mine-tab-count">' + count + '</span>' : '';
        return '<button class="discover-mine-tab' + (activeMineTab === tab.id ? ' active' : '') + '" data-mine-tab="' + tab.id + '">' + tab.name + countHtml + '</button>';
      }).join('') + '</div>';
    }

    function bindMineTabEvents(rail) {
      rail.querySelectorAll('[data-mine-tab]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          activeMineTab = btn.dataset.mineTab;
          renderIndexDiscoverPlaylists({ reset: false });
        });
      });
    }

    async function fetchMineTabData(login) {
      var cookie = login.cookie;
      var userId = login.profile.userId || login.profile.id || '';
      if (activeMineTab === 'recommend') {
        var payload = await fetchOtterNetease('/recommend', { cookie: cookie });
        var result = payload.result || (payload.data && payload.data.result) || payload.recommend || [];
        return (Array.isArray(result) ? result : []).map(function(item) {
          return normalizeMarketPlaylist({
            id: item.id || item.playlistId,
            name: item.name || item.title,
            coverUrl: item.picUrl || item.coverImgUrl || item.cover,
            playCount: item.playcount || item.playCount || 0,
            trackCount: item.trackCount || item.songCount || 0
          });
        }).filter(function(p) { return p.id; });
      }
      if (activeMineTab === 'albums') {
        var albumPayload = await fetchOtterNetease('/album/sublist', { limit: 50, offset: 0, cookie: cookie });
        var albumData = albumPayload.data || albumPayload;
        var albums = (albumData && albumData.data) || albumData || [];
        if (!Array.isArray(albums)) albums = [];
        mineHasMoreAlbums = albums.length >= 50;
        return albums.map(function(item) {
          return { id: item.id, name: item.name, picUrl: safeCover(item.picUrl), artist: item.artists && item.artists[0] ? item.artists[0].name : (item.artist && item.artist.name || '') };
        });
      }
      var userPayload = await fetchOtterNetease('/user-playlists', { userId: String(userId), cookie: cookie });
      var playlists = userPayload.playlist || (userPayload.data && userPayload.data.playlist) || [];
      var all = playlists.map(function(item) {
        return {
          normalized: normalizeMarketPlaylist({
            id: item.id,
            name: item.name,
            coverUrl: item.coverImgUrl || item.picUrl,
            playCount: item.playCount || item.playcount || 0,
            trackCount: item.trackCount || 0
          }),
          isOwner: String(item.userId || (item.creator && item.creator.userId) || '') === String(userId)
        };
      });
      var created = all.filter(function(p) { return p.isOwner; }).map(function(p) { return p.normalized; });
      var subscribed = all.filter(function(p) { return !p.isOwner; }).map(function(p) { return p.normalized; });
      mineDataCache.created = created;
      mineDataCache.subscribed = subscribed;
      return activeMineTab === 'created' ? created : subscribed;
    }

    function renderMinePlaylistGrid(rail, tabsHtml, list) {
      if (!list || !list.length) {
        rail.innerHTML = tabsHtml + '<div class="discover-my-empty"><p>空空如也~</p></div>';
        hydrateIcons(rail);
        bindMineTabEvents(rail);
        return;
      }
      rail.innerHTML = tabsHtml + '<div class="discover-playlist-grid-inner">' + list.map(function(card) {
        return '<button class="discover-playlist-card" type="button" data-market-id="' + escapeMarkup(card.id) + '">' +
          '<span class="discover-cover"><img loading="lazy" src="' + escapeMarkup(card.coverUrl || DEFAULT_COVER) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '></span>' +
          '<strong>' + escapeMarkup(card.name) + '</strong>' +
        '</button>';
      }).join('') + '</div>';
      hydrateIcons(rail);
      bindMineTabEvents(rail);
      rail.querySelectorAll('[data-market-id]').forEach(function(node) {
        node.addEventListener('click', function() {
          var id = node.dataset.marketId || '';
          openDiscoverCard(list.find(function(item) { return item.id === id; }));
        });
      });
    }

    function renderMineAlbumGrid(rail, tabsHtml, list) {
      if (!list || !list.length) {
        rail.innerHTML = tabsHtml + '<div class="discover-my-empty"><p>空空如也~</p></div>';
        hydrateIcons(rail);
        bindMineTabEvents(rail);
        return;
      }
      var gridHtml = '<div class="discover-playlist-grid-inner">' + list.map(function(album) {
        return '<button class="discover-playlist-card" type="button" data-album-id="' + escapeMarkup(album.id) + '">' +
          '<span class="discover-cover"><img loading="lazy" src="' + escapeMarkup(album.picUrl || DEFAULT_COVER) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '></span>' +
          '<strong>' + escapeMarkup(album.name) + '</strong>' +
          (album.artist ? '<span class="discover-album-artist">' + escapeMarkup(album.artist) + '</span>' : '') +
        '</button>';
      }).join('') + '</div>';
      var loadMoreHtml = mineHasMoreAlbums ? '<div class="discover-mine-loadmore"><button class="discover-my-btn" id="mine-load-more-albums">加载更多</button></div>' : '';
      rail.innerHTML = tabsHtml + gridHtml + loadMoreHtml;
      hydrateIcons(rail);
      bindMineTabEvents(rail);
      rail.querySelectorAll('[data-album-id]').forEach(function(node) {
        node.addEventListener('click', function() {
          var id = node.dataset.albumId || '';
          var album = list.find(function(a) { return String(a.id) === id; });
          if (album) openDiscoverCard(normalizeMarketPlaylist({ id: 'nealbum_' + album.id, name: album.name, coverUrl: album.picUrl }));
        });
      });
      var loadMoreBtn = document.getElementById('mine-load-more-albums');
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
          loadMoreBtn.textContent = '加载中...';
          loadMoreBtn.disabled = true;
          var login = getStoredNeteaseLogin();
          var offset = list.length;
          fetchOtterNetease('/album/sublist', { limit: 50, offset: offset, cookie: login.cookie }).then(function(res) {
            var albumData = res.data || res;
            var newAlbums = (albumData && albumData.data) || albumData || [];
            if (!Array.isArray(newAlbums)) newAlbums = [];
            mineHasMoreAlbums = newAlbums.length >= 50;
            var mapped = newAlbums.map(function(item) {
              return { id: item.id, name: item.name, picUrl: safeCover(item.picUrl), artist: item.artists && item.artists[0] ? item.artists[0].name : (item.artist && item.artist.name || '') };
            });
            mineDataCache.albums = list.concat(mapped);
            var currentRail = document.getElementById('index-discover-playlists');
            if (currentRail && activeDiscoverCategory === 'mine') renderMineAlbumGrid(currentRail, buildMineTabsHtml([{id:'recommend',name:'推荐'},{id:'created',name:'创建'},{id:'subscribed',name:'收藏'},{id:'albums',name:'专辑'}]), mineDataCache.albums);
          }).catch(function() {
            loadMoreBtn.textContent = '加载失败，点击重试';
            loadMoreBtn.disabled = false;
          });
        });
      }
    }

    function renderSearchPlaylists(cards) {
      var container = document.getElementById('search-playlists');
      if (!container) return;
      if (!cards.length) {
        container.innerHTML = '<div class="empty-note">没有找到匹配歌单，换个关键词试试。</div>';
        return;
      }
      container.innerHTML = cards.map(function(card, index) {
        return '<button class="discover-playlist-card search-playlist-card" type="button" data-search-playlist="' + index + '">' +
          '<span class="discover-cover"><img loading="lazy" src="' + escapeMarkup(card.cover || DEFAULT_COVER) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '></span>' +
          '<strong>' + escapeMarkup(card.title) + '</strong>' +
        '</button>';
      }).join('');
      container.querySelectorAll('[data-search-playlist]').forEach(function(cardNode) {
        cardNode.addEventListener('click', function() {
          openDiscoverCard(cards[Number(cardNode.dataset.searchPlaylist) || 0]);
        });
      });
    }
    function renderSearchVideos(videos) {
      var container = document.getElementById('search-videos');
      if (!container) return;
      document.getElementById('search-video-count').textContent = videos.length + ' 个';
      if (!videos.length) {
        container.innerHTML = '<div class="empty-note">没有找到匹配 MV，换个关键词试试。</div>';
        return;
      }
      container.innerHTML = videos.map(function(video, index) {
        return '<div class="track" data-index="' + index + '">' +
          '<img loading="lazy" src="' + escapeMarkup(safeCover(video.cover)) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '>' +
          '<div class="track-meta"><div class="track-name">' + escapeMarkup(video.title || '未命名视频') + '</div><div class="artist">' + escapeMarkup(video.artist || '未知') + '<span class="source-badge bilibili">MV</span></div></div>' +
          '<button class="dots" aria-label="播放视频">' + iconHtml('play') + '</button>' +
        '</div>';
      }).join('');
      container.querySelectorAll('.track').forEach(function(row) {
        row.addEventListener('click', function() {
          var video = videos[Number(row.dataset.index) || 0];
          if (video) openVideo(video.title, video.artist, video.src, video.cover);
        });
      });
    }
    function applySearchFilter(filter) {
      activeSearchFilter = filter || activeSearchFilter || 'songs';
      document.querySelectorAll('.search-tab').forEach(function(tab) {
        tab.classList.toggle('active', tab.dataset.searchFilter === activeSearchFilter);
      });
      var map = {
        songs: 'search-songs-section',
        playlists: 'search-playlists-section',
        videos: 'search-videos-section'
      };
      Object.keys(map).forEach(function(key) {
        var section = document.getElementById(map[key]);
        if (section) section.classList.toggle('hidden', key !== activeSearchFilter);
      });
    }
    function resetSearchFilter() {
      activeSearchFilter = 'songs';
      applySearchFilter('songs');
    }
    function getSourceLabel(source) {
      return {
        local: '丽江曲库',
        joox: 'Joox',
        qq: 'QQ音乐',
        lx_qq: '小秋音乐',
        netease: '网易云音乐',
        _netease: 'Netease',
        kuwo: '酷我音乐',
        lx_kuwo: '小蜗音乐',
        migu: 'Migu',
        bilibili: 'B站'
      }[source] || source || '未知来源';
    }
    function shouldShowSourceLabels() {
      return !appSettings || appSettings.showSourceLabels !== false;
    }
    function getTrackSourceDisplayName(track) {
      if (!track) return '备用音源';
      var sourceLabel = getSourceLabel(track.source);
      var label = sourceLabel && sourceLabel !== track.source ? sourceLabel : (track.sourceLabel || track.source || '');
      return String(label || '备用音源').trim();
    }
    function normalizeExternalTrack(track) {
      var source = String(track.source || '');
      var artist = Array.isArray(track.artist) ? track.artist.join(' / ') : String(track.artist || '');
      var picId = String(track.pic_id || '');
      var coverApi = '';
      var cover = /^https?:\/\//i.test(picId) || picId.startsWith('//') ? picId : DEFAULT_COVER;
      if (picId && cover === DEFAULT_COVER) {
        coverApi = gdMusicApiBase + '?types=pic&source=' + encodeURIComponent(source) + '&id=' + encodeURIComponent(picId) + '&size=300';
      }
      if (cover.startsWith('//')) cover = 'https:' + cover;
      return {
        id: String(track.id || ''),
        title: String(track.name || track.title || ''),
        artist: artist || '未知歌手',
        album: String(track.album || ''),
        cover: safeCover(cover),
        coverApi: coverApi,
        src: '',
        source: source,
        sourceLabel: getSourceLabel(source),
        urlId: String(track.url_id || track.id || ''),
        lyric_id: String(track.lyric_id || track.id || ''),
        duration: parseTrackDuration(track.duration || track.interval || track.time || track.dt || track.length)
      };
    }
    async function resolveExternalCover(track) {
      if (!track.coverApi) return track;
      try {
        var payload = await fetchGdMusicJson(track.coverApi);
        var url = payload && payload.url ? String(payload.url) : '';
        if (url.startsWith('//')) url = 'https:' + url;
        if (/^https?:\/\//i.test(url)) track.cover = safeCover(url);
      } catch (error) { console.warn('resolveExternalCover: failed', error); }
      return track;
    }
    async function searchQqApiTracks(query, count, signal) {
      var total = Math.max(1, Number(count) || 20);
      var pageSize = Math.min(50, total);
      var pageCount = Math.max(1, Math.ceil(total / pageSize));
      var requests = [];
      for (var page = 1; page <= pageCount; page++) {
        requests.push(fetchQqSearchPage(query, page, pageSize, signal).catch(function() { return []; }));
      }
      var payloads = await Promise.all(requests);
      var seen = new Set();
      var tracks = [];
      payloads.forEach(function(payload) {
        (Array.isArray(payload) ? payload : []).map(normalizeExternalTrack).filter(function(track) { return track.title; }).forEach(function(track) {
          var key = [track.source, track.urlId || track.id || track.title, track.artist].join(':');
          if (seen.has(key)) return;
          seen.add(key);
          tracks.push(track);
        });
      });
      return tracks.slice(0, total);
    }
    function cloneTracksForSource(tracks, source) {
      return (Array.isArray(tracks) ? tracks : []).map(function(track) {
        return Object.assign({}, track, {
          source: source,
          sourceLabel: getSourceLabel(source)
        });
      });
    }
    async function searchLxQqTracks(query, count, signal) {
      return cloneTracksForSource(await searchQqApiTracks(query, count, signal), 'lx_qq');
    }
    async function searchLxKuwoTracks(query, count, signal) {
      var tracks = await searchGdMusicSourceTracks(query, 'kuwo', count, signal);
      return cloneTracksForSource(tracks, 'lx_kuwo');
    }
    function normalizeQqProxyTrack(track) {
      if (!track) return null;
      var songmid = String(track.url_id || track.urlId || track.lyric_id || track.id || '').replace(/^qq_/i, '');
      return {
        id: String(track.id || (songmid ? 'qq_' + songmid : '')),
        name: String(track.name || track.title || ''),
        title: String(track.name || track.title || ''),
        artist: Array.isArray(track.artist) ? track.artist : String(track.artist || '').split(/[\/、,，]+/).filter(Boolean),
        album: String(track.album || ''),
        pic_id: String(track.pic_id || track.cover || ''),
        url_id: songmid,
        lyric_id: String(track.lyric_id || songmid),
        source: 'qq'
      };
    }
    function isQqProxyHealthPayload(payload) {
      return payload && !Array.isArray(payload) && payload.ok === true && payload.service;
    }
    async function fetchQqSearchPage(query, page, count, signal) {
      var url = qqApiBase + '/search?name=' + encodeURIComponent(query) +
        '&count=' + encodeURIComponent(count) + '&pages=' + page;
      var primary = fetch(url, { signal: signal }).then(function(response) {
        if (!response.ok) throw new Error('QQ search ' + response.status);
        return response.json();
      }).then(function(payload) {
        if (isQqProxyHealthPayload(payload)) throw new Error('QQ api route not deployed');
        if (!Array.isArray(payload) || !payload.length) throw new Error('QQ search empty');
        return payload;
      }).catch(function(error) {
        console.warn('QQ primary search failed', error);
        throw error;
      });
      var fallback = fetch(qqFallbackProxyBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: signal,
        body: JSON.stringify({ type: 'search', query: query, page: page })
      }).then(function(response) {
        if (!response.ok) throw new Error('QQ fallback search ' + response.status);
        return response.json();
      }).then(function(payload) {
        var items = payload && Array.isArray(payload.items) ? payload.items : [];
        var tracks = items.slice(0, count).map(normalizeQqProxyTrack).filter(Boolean);
        if (!tracks.length) throw new Error('QQ fallback search empty');
        return tracks;
      }).catch(function(error) {
        console.warn('QQ fallback search failed', error);
        throw error;
      });
      try {
        return await Promise.any([primary, fallback]);
      } catch (error) {
        return [];
      }
    }
    async function fetchExternalSourceTracks(query, source, count, signal) {
      if (source === '_netease') {
        if (signal && signal.aborted) throw new DOMException('Aborted', 'AbortError');
        return searchNeteaseApiTracks(query, count);
      }
      if (source === 'netease' && typeof searchNeteasePrimaryTracks === 'function') {
        if (signal && signal.aborted) throw new DOMException('Aborted', 'AbortError');
        try {
          var gdNeteaseTracks = await searchGdMusicSourceTracks(query, source, count, signal);
          if (gdNeteaseTracks.length) return gdNeteaseTracks;
        } catch (error) {
          console.warn('searchGdMusicSourceTracks netease failed, using primary fallback', error);
        }
        try {
          var neteaseTracks = await searchNeteasePrimaryTracks(query, count);
          if (neteaseTracks.length) return neteaseTracks;
        } catch (error) {
          console.warn('searchNeteasePrimaryTracks failed, using GD fallback', error);
        }
      }
      if (source === 'qq') {
        if (signal && signal.aborted) throw new DOMException('Aborted', 'AbortError');
        return searchQqApiTracks(query, count, signal);
      }
      if (source === 'lx_qq') {
        if (signal && signal.aborted) throw new DOMException('Aborted', 'AbortError');
        return searchLxQqTracks(query, count, signal);
      }
      if (source === 'lx_kuwo') {
        if (signal && signal.aborted) throw new DOMException('Aborted', 'AbortError');
        return searchLxKuwoTracks(query, count, signal);
      }
      return searchGdMusicSourceTracks(query, source, count, signal);
    }
    async function searchGdMusicSourceTracks(query, source, count, signal) {
      var total = Math.max(1, Number(count) || 20);
      var pageSize = Math.min(50, total);
      var pageCount = Math.max(1, Math.ceil(total / pageSize));
      var requests = [];
      for (var page = 1; page <= pageCount; page++) {
        var url = gdMusicApiBase + '?types=search&source=' + encodeURIComponent(source) +
          '&name=' + encodeURIComponent(query) + '&count=' + encodeURIComponent(pageSize) + '&pages=' + page;
        requests.push(fetchGdMusicJson(url, signal).catch(function() { return []; }));
      }
      var payloads = await Promise.all(requests);
      var tracks = [];
      var seen = new Set();
      payloads.forEach(function(payload) {
        (Array.isArray(payload) ? payload : []).map(normalizeExternalTrack).filter(function(track) { return track.title; }).forEach(function(track) {
          var key = [track.source, track.urlId || track.id || track.title, track.artist].join(':');
          if (seen.has(key)) return;
          seen.add(key);
          tracks.push(track);
        });
      });
      return tracks.slice(0, total);
    }
    async function searchExternalSource(query, source, signal) {
      var tracks = await fetchExternalSourceTracks(query, source, SEARCH_RESULT_LIMIT, signal);
      return tracks;
    }
    async function resolveExternalTrackUrl(track) {
      if (!track || !track.source || !track.urlId) return '';
      var quality = '320';
      try {
        var settingQuality = typeof appSettings !== 'undefined' && appSettings ? String(appSettings.quality || '320') : '320';
        quality = ['128', '192', '320', '999'].includes(settingQuality) ? settingQuality : '320';
      } catch (error) {}
      if (track.source === '_netease') {
        try {
          return await resolveNeteaseApiTrackUrl(track);
        } catch (error) {
          console.warn('resolveNeteaseApiTrackUrl failed', error);
          return '';
        }
      }
      if (track.source === 'netease' && track.provider === 'netease-api') {
        try {
          return await resolveNeteaseApiTrackUrl(track);
        } catch (error) {
          console.warn('resolveNeteasePrimaryTrackUrl failed', error);
          return '';
        }
      }
      if (track.source === 'qq') {
        try {
          var qqPayload = await fetchQqTrackUrlPayload(track.urlId, quality);
          var qqUrl = normalizeAudioUrl(qqPayload && qqPayload.url ? String(qqPayload.url) : '');
          if (!qqUrl) return '';
          return /^http:\/\//i.test(qqUrl) ? getAudioProxyUrl(qqUrl) : qqUrl;
        } catch (error) {
          console.warn('resolveQqTrackUrl failed', error);
          return '';
        }
      }
      if (track.source === 'lx_qq' || track.source === 'lx_kuwo') {
        try {
          var lxPayload = await fetchLxTrackUrlPayload(track.source, track.urlId, quality);
          var lxUrl = normalizeAudioUrl(lxPayload && lxPayload.url ? String(lxPayload.url) : '');
          if (!lxUrl) return '';
          return /^http:\/\//i.test(lxUrl) ? getAudioProxyUrl(lxUrl) : lxUrl;
        } catch (error) {
          console.warn('resolveLxTrackUrl failed', error);
          return '';
        }
      }
      var url = gdMusicApiBase + '?types=url&source=' + encodeURIComponent(track.source) +
        '&id=' + encodeURIComponent(track.urlId) + '&br=' + encodeURIComponent(quality);
      try {
        var payload = await fetchGdMusicJson(url);
        var resolved = payload && payload.url ? String(payload.url) : '';
        if (resolved && track.source !== 'kuwo') resolved = resolved.replace(/^http:\/\//i, 'https://');
        resolved = normalizeAudioUrl(resolved);
        if (isBlockedAudioUrl(resolved)) return '';
        if (resolved) return resolved;
      } catch (error) { /* fallthrough */ }
      return '';
    }
    function getLxSourceCode(source) {
      return source === 'lx_kuwo' ? 'kw' : (source === 'lx_qq' ? 'tx' : '');
    }
    function mapLxQuality(quality) {
      return String(quality || '320') === '128' ? '128k' : '320k';
    }
    async function fetchLxTrackUrlPayload(source, urlId, quality) {
      var code = getLxSourceCode(source);
      var id = String(urlId || '').replace(/^qq_/i, '').replace(/^MUSIC_/i, '');
      if (!code || !id) return { url: '' };
      var base = (_isLocalDev || useSameOriginAudioApi) ? '' : ljyytApiBase;
      var response = await fetch(base + '/api/lx/url?source=' + encodeURIComponent(code) + '&id=' + encodeURIComponent(id) + '&br=' + encodeURIComponent(mapLxQuality(quality)));
      if (!response.ok) throw new Error('LX url ' + response.status);
      return response.json();
    }
    async function fetchQqTrackUrlPayload(urlId, quality) {
      function fetchWithTimeout(url, options, timeoutMs) {
        options = options || {};
        timeoutMs = timeoutMs || 4500;
        if (typeof AbortController === 'undefined') return fetch(url, options);
        const controller = new AbortController();
        const timeoutId = setTimeout(function() { controller.abort(); }, timeoutMs);
        const requestOptions = Object.assign({}, options, { signal: controller.signal });
        return fetch(url, requestOptions).finally(function() {
          clearTimeout(timeoutId);
        });
      }
      function asPlayablePayload(promise, label) {
        return promise.then(function(response) {
          if (!response.ok) throw new Error(label + ' ' + response.status);
          return response.json();
        }).then(function(payload) {
          if (label === 'QQ url' && isQqProxyHealthPayload(payload)) throw new Error('QQ api route not deployed');
          if (!payload || !payload.url) throw new Error(label + ' empty url');
          return payload;
        }).catch(function(error) {
          console.warn(label + ' failed', error);
          throw error;
        });
      }
      var official = asPlayablePayload(
        fetchWithTimeout(qqApiBase + '/url?id=' + encodeURIComponent(urlId) + '&br=' + encodeURIComponent(quality || '320'), null, 4500),
        'QQ url'
      );
      var fallback = asPlayablePayload(
        fetchWithTimeout(qqFallbackProxyBase, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'url', songmid: String(urlId || '').replace(/^qq_/i, ''), quality: mapLxQuality(quality || '320') })
        }, 4500),
        'QQ fallback url'
      );
      return Promise.any([official, fallback]);
    }
    function getKuwoAudioFallbackUrl(urlId) {
      return (_isLocalDev ? '' : ljyytApiBase) + '/api/kuwo-audio?rid=' + encodeURIComponent(urlId);
    }
    function filterLocalSearch(query, tracks) {
      var needle = String(query || '').trim().toLowerCase();
      if (!needle) return [];
      return (tracks || []).filter(function(track) {
        return [track.title, track.artist, track.album].some(function(value) {
          return String(value || '').toLowerCase().includes(needle);
        });
      }).map(function(track) {
        return Object.assign({ source: 'local', sourceLabel: '丽江曲库' }, track);
      });
    }
    function getActiveSearchSources() {
      var provider = activeProvider || '聚合搜索';
      if (provider === '聚合搜索') {
        return (typeof getEnabledSourceOrder === 'function' ? getEnabledSourceOrder() : aggregatedSources.slice());
      }
      var mapped = providerSourceMap[provider] || 'local';
      return [mapped];
    }
    function setSearchResultsActive(active) {
      var view = document.querySelector('[data-view="search"]');
      if (view) view.classList.toggle('discover-results-active', !!active);
      if (!active) {
        var results = document.getElementById('search-results');
        var count = document.getElementById('search-song-count');
        if (results) results.innerHTML = '';
        if (count) count.textContent = '0 首';
      }
    }
    function deduplicateSearchResults(tracks) {
      var seen = {};
      var result = [];
      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (!track || !track.title) continue;
        var normTitle = normalizeTrackText(track.title).replace(/\s*[（(].*?[）)]\s*/g, '');
        var normArtist = normalizeTrackText(track.artist).replace(/[\s/、，,]+/g, '/');
        var key = normTitle + '|' + normArtist;
        if (seen[key]) {
          var main = seen[key];
          if (!main.variants) main.variants = [];
          if (track.source !== main.source) main.variants.push(track);
          continue;
        }
        seen[key] = track;
        result.push(track);
      }
      return result;
    }
    function showVariantPopover(track, badgeEl) {
      closeVariantPopover();
      if (!track || !track.variants || !track.variants.length) return;
      var allVersions = [track].concat(track.variants);
      var rect = badgeEl.getBoundingClientRect();
      var scrim = document.createElement('div');
      scrim.className = 'variant-popover-scrim';
      scrim.addEventListener('click', closeVariantPopover);
      var popover = document.createElement('div');
      popover.className = 'variant-popover';
      popover.innerHTML =
        '<div class="variant-popover-header">更多版本 (' + allVersions.length + ')</div>' +
        '<div class="variant-popover-list">' +
        allVersions.map(function(v, i) {
          var srcClass = String(v.source || 'local').replace(/[^a-z0-9_-]/gi, '');
          var srcLabel = escapeMarkup(v.sourceLabel || getSourceLabel(v.source) || '未知');
          return '<button class="variant-popover-item" data-vi="' + i + '">' +
            '<span class="source-badge ' + srcClass + '">' + srcLabel + '</span>' +
            '<div class="variant-popover-item-info">' +
              '<div class="variant-popover-item-title">' + escapeMarkup(v.title || '未知歌曲') + '</div>' +
              '<div class="variant-popover-item-meta">' + escapeMarkup(v.artist || '未知歌手') + '</div>' +
            '</div>' +
            '<span class="variant-popover-play">' + iconHtml('play') + '</span>' +
          '</button>';
        }).join('') +
        '</div>';
      popover.querySelectorAll('.variant-popover-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
          e.stopPropagation();
          var vi = parseInt(item.dataset.vi, 10);
          var chosen = allVersions[vi];
          if (!chosen) return;
          closeVariantPopover();
          setCurrentTrack(chosen);
          openFullPlayer();
          playCurrentTrack();
        });
      });
      document.body.appendChild(scrim);
      document.body.appendChild(popover);
      var popW = popover.offsetWidth;
      var popH = popover.offsetHeight;
      var left = rect.left + rect.width / 2 - popW / 2;
      var top = rect.bottom + 6;
      if (left + popW > window.innerWidth - 8) left = window.innerWidth - 8 - popW;
      if (left < 8) left = 8;
      if (top + popH > window.innerHeight - 8) top = rect.top - popH - 6;
      popover.style.left = left + 'px';
      popover.style.top = top + 'px';
      window._variantPopover = popover;
      window._variantScrim = scrim;
    }
    function closeVariantPopover() {
      if (window._variantPopover) { window._variantPopover.remove(); window._variantPopover = null; }
      if (window._variantScrim) { window._variantScrim.remove(); window._variantScrim = null; }
    }
    async function performSearch(options) {
      options = options || {};
      var searchInput = getSearchInput();
      var homeInput = getHomeSearchInput();
      var query = String((searchInput && searchInput.value) || (homeInput && homeInput.value) || '').trim();
      showView('search');
      if (searchInput && searchInput.value !== query) searchInput.value = query;
      if (homeInput && homeInput.value !== query) homeInput.value = query;
      updateSearchClearButton();
      if (!query) {
        setSearchResultsActive(false);
        hideSearchHistory();
        hideSearchSuggestions();
        renderIndexDiscoverPlaylists();
        return;
      }
      if (options.remember !== false) rememberSearchQuery(query);
      hideSearchHistory();
      hideSearchSuggestions();
      setSearchResultsActive(true);
      if (searchAbortController) searchAbortController.abort();
      var controller = new AbortController();
      searchAbortController = controller;
      var signal = controller.signal;
      var container = document.getElementById('search-results');
      var count = document.getElementById('search-song-count');
      if (container) container.innerHTML = '<div class="empty-note" style="opacity:0.6">搜索中...</div>';
      if (count) count.textContent = '';
      try {
        var sources = getActiveSearchSources();
        var localTracks = [];
        if (sources.includes('local')) localTracks = filterLocalSearch(query, await ensureLibraryTracks());
        if (signal.aborted) return;
        var externalSources = sources.filter(function(source) { return source && source !== 'local'; });
        var allTracks = localTracks.slice();
        var needsDedup = sources.length > 1;
        if (localTracks.length) {
          currentSearchState.songs = localTracks;
          renderSearchRows(localTracks, activeProvider);
        }
        var pending = externalSources.length;
        if (!pending && localTracks.length) return;
        if (!pending && !localTracks.length) {
          if (container) container.innerHTML = '<div class="empty-note">未找到相关歌曲</div>';
          if (count) count.textContent = '0 首';
          return;
        }
        externalSources.forEach(function(source) {
          searchExternalSource(query, source, signal).then(function(tracks) {
            if (signal.aborted) return;
            if (tracks && tracks.length) {
              allTracks = allTracks.concat(tracks.filter(function(t) { return t && t.title; }));
              var results = needsDedup ? deduplicateSearchResults(allTracks) : allTracks;
              currentSearchState.songs = results;
              renderSearchRows(results, activeProvider);
            }
          }).catch(function(err) {
            if (err && err.name === 'AbortError') return;
          }).finally(function() {
            if (signal.aborted) return;
            pending--;
            if (pending <= 0 && !allTracks.length) {
              if (container) container.innerHTML = '<div class="empty-note">未找到相关歌曲</div>';
              if (count) count.textContent = '0 首';
            }
          });
        });
      } catch (error) {
        if (error && error.name === 'AbortError') return;
        if (container) container.innerHTML = '<div class="empty-note">搜索失败，请稍后重试。</div>';
        if (count) count.textContent = '0 首';
      }
    }
    var suggestionDebounceTimer = null;
    function handleDiscoverSearchInput() {
      var searchInput = getSearchInput();
      var homeInput = getHomeSearchInput();
      if (homeInput && searchInput) homeInput.value = searchInput.value;
      updateSearchClearButton();
      clearTimeout(suggestionDebounceTimer);
      if (!String(searchInput && searchInput.value || '').trim()) {
        setSearchResultsActive(false);
        hideSearchHistory();
        hideSearchSuggestions();
        renderIndexDiscoverPlaylists();
      } else {
        searchSuggestionRequestId++;
        hideSearchHistory();
        suggestionDebounceTimer = setTimeout(function() {
          renderSearchSuggestions(searchInput.value);
        }, 220);
      }
    }
    function handleSearchKey(event) {
      if (event && event.key === 'Enter') {
        event.preventDefault();
        performSearch({ remember: true });
      }
    }
    function clearFavoriteSearch(event) {
      if (event) event.preventDefault();
      var input = document.getElementById('favorite-search-input');
      if (input) input.value = '';
      renderFavorites();
      if (input) input.focus();
    }
    function renderFavorites() {
      var countLabel = document.getElementById('favorite-count');
      var query = getFavoriteSearchQuery();
      var clearButton = document.getElementById('favorite-search-clear');
      if (clearButton) clearButton.classList.toggle('visible', !!query);
      var visibleTracks = getVisibleFavoriteTracks();
      if (countLabel) {
        countLabel.textContent = query
          ? visibleTracks.length + ' / ' + favoriteTracks.length + ' 首歌曲'
          : favoriteTracks.length + ' 首歌曲';
      }
      renderTrackRows(
        document.getElementById('favorite-list'),
        visibleTracks,
        query ? '喜欢列表里没有匹配歌曲。' : '还没有喜欢的歌曲。播放歌曲时点爱心，就会收藏到这里。'
      );
    }
    function playFirstFavorite() {
      var visibleTracks = getVisibleFavoriteTracks();
      if (!favoriteTracks.length) {
        showView('search');
        return;
      }
      if (!visibleTracks.length) {
        showToast('当前筛选没有可播放的喜欢歌曲');
        return;
      }
      setQueue(visibleTracks, 0);
      setCurrentTrack(visibleTracks[0]);
      openFullPlayer();
      playCurrentTrack();
    }
    function clearFavorites() {
      favoriteTracks = [];
      writeStoredList('ljyyt_otter_favorites', favoriteTracks);
      updateLikeButton();
      renderFavorites();
    }
    function renderPageTrackRows(container, tracks, emptyText, onPlayTrack) {
      if (!container) return;
      if (!tracks.length) {
        container.innerHTML = '<div class="empty-note">' + escapeMarkup(emptyText || '暂无歌曲') + '</div>';
        return;
      }
      container.innerHTML = tracks.map(function(track, index) {
        var current = isSameTrack(track, currentTrack);
        return '<div class="track' + (current ? ' current-track' : '') + (current && !audioPlayer.paused ? ' is-playing' : '') + '" role="button" tabindex="0" aria-label="' + escapeMarkup(getTrackRowAriaLabel(track)) + '" data-index="' + index + '">' +
          '<div class="page-index">' + (current && !audioPlayer.paused ? '<span class="playing-bars"><i></i><i></i><i></i></span>' : (index + 1)) + '</div>' +
          '<img class="track-cover" loading="lazy" src="' + escapeMarkup(safeCover(track.cover)) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '>' +
          '<div class="track-meta"><div class="track-name">' + escapeMarkup(track.title || '未知歌曲') + '</div><div class="artist">' + escapeMarkup(track.artist || '未知歌手') + (track.album ? ' · ' + escapeMarkup(track.album) : '') + '</div></div>' +
          '<button class="dots" type="button" data-track-action-trigger aria-label="更多" aria-haspopup="dialog" aria-expanded="false">' + iconHtml('more') + '</button>' +
        '</div>';
      }).join('');
      container.querySelectorAll('.track').forEach(function(row) {
        row.__ljyytTrack = tracks[Number(row.dataset.index) || 0];
        function playRowTrack() {
          var index = Number(row.dataset.index) || 0;
          var track = tracks[index];
          if (!track) return;
          if (typeof onPlayTrack === 'function') onPlayTrack(track, index);
        }
        row.addEventListener('click', function(event) {
          var index = Number(row.dataset.index) || 0;
          var track = tracks[index];
          if (!track) return;
          if (event.target.closest('.dots')) {
            event.stopPropagation();
            event.stopImmediatePropagation?.();
            openTrackActionDrawer(track, event.target.closest('.dots'));
            return;
          }
          playRowTrack();
        });
        bindTrackRowKeyboard(row, playRowTrack);
      });
    }
    function addHistory(track) {
      if (!track || !track.title) return;
      historyTracks = [track, ...historyTracks.filter(function(item) {
        if (track.src && item.src && item.src === track.src) return false;
        return !isSameTrack(item, track);
      })].slice(0, 50);
      writeStoredList('ljyyt_otter_history', historyTracks);
      renderHistory();
    }
    function renderHistory() {
      const list = document.getElementById('history-list');
      if (!list) return;
      document.getElementById('history-summary-count').textContent = historyTracks.length + ' 首歌曲';
      document.getElementById('history-clear').hidden = !historyTracks.length;
      renderPageTrackRows(list, historyTracks, '暂无歌曲', function(track, index) {
        setQueue(historyTracks, index);
        setCurrentTrack(track);
        openFullPlayer();
        playCurrentTrack();
      });
    }
    function playFirstHistory() {
      if (!historyTracks.length) return;
      setQueue(historyTracks, 0);
      setCurrentTrack(historyTracks[0]);
      openFullPlayer();
      playCurrentTrack();
    }
    function clearHistory() {
      if (!historyTracks.length) return;
      showConfirm('确定清空播放历史吗？', function() {
        historyTracks = [];
        writeStoredList('ljyyt_otter_history', historyTracks);
        renderHistory();
      });
    }
    function renderQueue() {
      const list = document.getElementById('queue-list');
      const drawerList = document.getElementById('queue-drawer-list');
      const queue = playQueue.length ? playQueue : [];
      const drawerQueue = queue.length ? queue : (currentTrack ? [currentTrack] : []);
      const drawerTracks = queueDrawerTab === 'history' ? historyTracks : drawerQueue;
      const renderItems = (tracks, isDrawer) => tracks.length ? tracks.map((track, index) => {
        const current = isSameTrack(track, currentTrack);
        var removeLabel = (queueDrawerTab === 'history' ? '从最近播放删除 ' : '从播放列表删除 ') + (track.title || '未知歌曲');
        const actionButton = isDrawer
          ? '<button class="queue-remove" aria-label="' + escapeMarkup(removeLabel) + '" onclick="removeTrackFromQueue(event, ' + index + ', ' + (queueDrawerTab === 'history') + ')"><svg viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>'
          : '<button class="dots" type="button" data-track-action-trigger aria-label="更多" aria-haspopup="dialog" aria-expanded="false">' + iconHtml('more') + '</button>';
        var sourceTag = shouldShowSourceLabels() && track.sourceLabel && track.source !== 'local' ? '<span class="source">' + escapeMarkup(track.sourceLabel) + '</span>' : '';
        return '<div class="track' + (current ? ' current-track' : '') + (current && !audioPlayer.paused ? ' is-playing' : '') + '" role="button" tabindex="0" aria-label="' + escapeMarkup(getTrackRowAriaLabel(track)) + '" data-index="' + index + '">' +
          '<div style="position:relative;flex:none"><img loading="lazy" src="' + escapeMarkup(safeCover(track.cover)) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '><span class="playing-bars"><i></i><i></i><i></i></span></div>' +
          '<div class="track-meta"><div class="track-name">' + escapeMarkup(track.title || '未知歌曲') + '</div><div class="artist">' + escapeMarkup(track.artist || '未知歌手') + sourceTag + '</div></div>' +
          actionButton +
        '</div>';
      }).join('') : '<div class="empty-note">' + (queueDrawerTab === 'history' && isDrawer ? '最近播放为空。播放歌曲后会自动记录。' : '播放列表为空。先选择一首歌播放。') + '</div>';
      if (list) {
        document.getElementById('queue-summary-count').textContent = queue.length + ' 首歌曲';
        document.getElementById('queue-clear').hidden = !queue.length;
        renderPageTrackRows(list, queue, '暂无歌曲', function(track, index) {
          setQueue(queue, index);
          setCurrentTrack(track);
          openFullPlayer();
          playCurrentTrack();
        });
      }
      if (drawerList) drawerList.innerHTML = renderItems(drawerTracks, true);
      const count = document.getElementById('queue-count');
      const historyCount = document.getElementById('history-count');
      const reshuffle = document.getElementById('queue-reshuffle');
      if (count) count.textContent = queue.length;
      if (historyCount) historyCount.textContent = historyTracks.length;
      if (reshuffle) reshuffle.hidden = queueDrawerTab !== 'queue' || playModes[playModeIndex].value !== 'shuffle';
      document.getElementById('queue-tab-list')?.classList.toggle('active', queueDrawerTab === 'queue');
      document.getElementById('queue-tab-history')?.classList.toggle('active', queueDrawerTab === 'history');
      [[drawerList, drawerTracks]].forEach(([container, tracks]) => {
        if (!container) return;
        container.querySelectorAll('.track').forEach((row) => {
          function playDrawerTrack() {
            const index = Number(row.dataset.index) || 0;
            const track = tracks[index];
            if (!track) return;
            if (queueDrawerTab === 'history' && container === drawerList) {
              setQueue([track, ...queue.filter((item) => !isSameTrack(item, track))], 0);
            } else {
              setQueue(tracks, index);
            }
            setCurrentTrack(track);
            playCurrentTrack();
            setQueueDrawerOpen(false);
          }
          row.addEventListener('click', (event) => {
            if (event.target.closest('button')) return;
            playDrawerTrack();
          });
          bindTrackRowKeyboard(row, playDrawerTrack);
        });
      });
    }
    function playQueueFromPage() {
      const queue = playQueue.length ? playQueue : [];
      if (!queue.length) return;
      setQueue(queue, 0);
      setCurrentTrack(queue[0]);
      openFullPlayer();
      playCurrentTrack();
    }
    function clearQueue() {
      const queue = playQueue.length ? playQueue : (currentTrack ? [currentTrack] : []);
      if (!queue.length) return;
      showConfirm('确定清空播放列表吗？', function() {
        playQueue = [];
        queueIndex = 0;
        renderQueue();
      });
    }
    function renderPlaylists() {
      const list = document.getElementById('playlist-list');
      if (!userPlaylists.length) {
        list.innerHTML = '<div class="empty-note">还没有创建歌单。点“新建”后才会出现用户歌单。</div>';
        return;
      }
      list.innerHTML = userPlaylists.map((playlist, index) => (
        '<div class="playlist" data-index="' + index + '" onclick="showUserPlaylistDetail(' + index + ')"><div class="playlist-cover">' + iconHtml('music') + '</div><div><p>' +
        escapeMarkup(playlist.name || '未命名歌单') + '</p><small>' + getPlaylistCount(playlist) + ' 首 · ' + formatPlaylistDate(playlist.createdAt) + '</small></div><button class="playlist-row-action" onclick="event.stopPropagation(); openPlaylistManageDrawer(' + index + ')" aria-label="歌单更多操作">' + iconHtml('more') + '</button></div>'
      )).join('');
    }
    function getPlaylistCount(playlist) {
      if (Array.isArray(playlist?.tracks)) return playlist.tracks.length;
      return Number(playlist?.count || 0);
    }
    function formatPlaylistDate(value) {
      if (!value) return '用户创建';
      var date = new Date(value);
      if (Number.isNaN(date.getTime())) return '用户创建';
      return (date.getMonth() + 1) + '月' + date.getDate() + '日';
    }
    function savePlaylists() {
      writeStoredList('ljyyt_otter_playlists', userPlaylists);
      renderPlaylists();
      if (activeDiscoverCategory === 'mine') {
        var rail = document.getElementById('index-discover-playlists');
        if (rail) renderDiscoverMyPlaylists(rail);
      }
    }
    function openPlaylistDrawer(title, desc, body) {
      document.getElementById('playlist-drawer-title').textContent = title;
      document.getElementById('playlist-drawer-desc').textContent = desc || '';
      document.getElementById('playlist-drawer-body').innerHTML = body;
      hydrateIcons(document.getElementById('playlist-drawer-body'));
      document.getElementById('playlist-drawer').classList.add('open');
      document.getElementById('playlist-drawer-scrim').classList.add('open');
    }
    function closePlaylistDrawer() {
      document.getElementById('playlist-drawer')?.classList.remove('open');
      document.getElementById('playlist-drawer-scrim')?.classList.remove('open');
      pendingPlaylistTrack = null;
    }
    function openCreatePlaylistDrawer(event, seedTrack) {
      event?.stopPropagation?.();
      pendingPlaylistTrack = seedTrack || null;
      openPlaylistDrawer('新建歌单', '', '<input class="drawer-input" id="new-playlist-name" placeholder="歌单名称" maxlength="32" autofocus><div class="drawer-actions"><button onclick="closePlaylistDrawer()">取消</button><button class="primary" onclick="confirmCreatePlaylist()">创建</button></div>');
      setTimeout(function() { document.getElementById('new-playlist-name')?.focus(); }, 30);
    }
    function confirmCreatePlaylist() {
      var input = document.getElementById('new-playlist-name');
      var name = (input?.value || '').trim();
      if (!name) {
        input?.focus();
        return;
      }
      var tracks = pendingPlaylistTrack ? [pendingPlaylistTrack] : [];
      userPlaylists = [{ name: name, count: tracks.length, tracks: tracks, createdAt: Date.now() }, ...userPlaylists];
      savePlaylists();
      closePlaylistDrawer();
    }
    function openPlaylistImportDrawer(event) {
      event?.stopPropagation?.();
      playlistImportTab = 'link';
      renderPlaylistImportDrawer();
    }
    function renderPlaylistImportDrawer() {
      var linkActive = playlistImportTab === 'link' ? ' active' : '';
      var fileActive = playlistImportTab === 'file' ? ' active' : '';
      var body = '<div class="drawer-tabs"><button class="drawer-tab' + linkActive + '" onclick="switchPlaylistImportTab(&quot;link&quot;)">链接导入</button><button class="drawer-tab' + fileActive + '" onclick="switchPlaylistImportTab(&quot;file&quot;)">文件导入</button></div>';
      if (playlistImportTab === 'link') {
        body += '<input class="drawer-input" id="playlist-import-url" placeholder="输入歌单分享链接，如 https://kuwo.cn/playlist_detail/3596743037"><div class="drawer-tip">复制官方音乐 App 或网页里的歌单分享链接。当前会先保存为可管理歌单，后续接入对应平台解析后可自动补全歌曲。</div><div class="drawer-actions"><button onclick="closePlaylistDrawer()">取消</button><button class="primary" onclick="confirmImportPlaylistUrl()">获取歌单</button></div>';
      } else {
        body += '<label class="drawer-file-zone" for="playlist-import-file"><strong>点击选择 JSON 文件</strong><span>支持 Otter/本站导出的 { name, tracks } 或歌曲数组</span></label><input id="playlist-import-file" type="file" accept="application/json,.json" hidden onchange="handlePlaylistImportFile(event)"><div class="drawer-actions"><button onclick="closePlaylistDrawer()">取消</button><button class="primary" onclick="document.getElementById(&quot;playlist-import-file&quot;).click()">选择文件</button></div>';
      }
      openPlaylistDrawer('导入歌单', '', body);
    }
    function switchPlaylistImportTab(tab) {
      playlistImportTab = tab;
      renderPlaylistImportDrawer();
    }
    function confirmImportPlaylistUrl() {
      var input = document.getElementById('playlist-import-url');
      var url = (input?.value || '').trim();
      if (!url) {
        input?.focus();
        return;
      }
      var source = inferPlaylistSource(url);
      userPlaylists = [{ name: source + '歌单', count: 0, tracks: [], sourceUrl: url, createdAt: Date.now() }, ...userPlaylists];
      savePlaylists();
      closePlaylistDrawer();
    }
    function inferPlaylistSource(url) {
      if (/music\.163|163cn|netease/i.test(url)) return '网易云';
      if (/kuwo/i.test(url)) return '酷我';
      if (/kugou/i.test(url)) return '酷狗';
      if (/migu/i.test(url)) return '咪咕';
      if (/bilibili|b23/i.test(url)) return 'B站';
      return '导入';
    }
    function handlePlaylistImportFile(event) {
      var file = event.target.files && event.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function() {
        try {
          var data = JSON.parse(String(reader.result || ''));
          var playlist = normalizeImportedPlaylist(data, file.name.replace(/\.json$/i, ''));
          userPlaylists = [playlist, ...userPlaylists];
          savePlaylists();
          closePlaylistDrawer();
        } catch (error) {
          showToast('导入失败：文件不是可识别的歌单 JSON');
        }
      };
      reader.readAsText(file);
    }
    function normalizeImportedText(value, fallback, allowStructured) {
      if (Array.isArray(value)) {
        if (!allowStructured) return fallback || '';
        var list = value.map(function(item) { return normalizeImportedText(item, '', true); }).filter(Boolean);
        return list.length ? list.join(' / ') : (fallback || '');
      }
      if (value && typeof value === 'object') {
        if (!allowStructured) return fallback || '';
        return normalizeImportedText(value.name || value.title || value.text || value.value || value.url || '', fallback, true);
      }
      var text = String(value == null ? '' : value).trim();
      return text || (fallback || '');
    }
    function firstImportedText(values, fallback, allowStructured) {
      for (var i = 0; i < values.length; i++) {
        var text = normalizeImportedText(values[i], '', allowStructured);
        if (text) return text;
      }
      return fallback || '';
    }
    function normalizeImportedSource(value, label, url) {
      var sourceText = normalizeImportedText(value, '', false);
      var text = [sourceText, label, url].map(function(item) { return String(item || ''); }).join(' ');
      if (/bilibili|b23|B站|哔哩|嗶哩/i.test(text)) return 'bilibili';
      if (/netease|music\.163|网易|網易/i.test(text)) return 'netease';
      if (/kuwo|酷我/i.test(text)) return 'kuwo';
      if (/migu|咪咕/i.test(text)) return 'migu';
      if (/joox/i.test(text)) return 'joox';
      if (/qq\.com|y\.qq|QQ音乐/i.test(text)) return 'qq';
      return sourceText || 'import';
    }
    function normalizeImportedPlaylist(data, fallbackName) {
      var source = Array.isArray(data) ? { name: fallbackName || '导入歌单', tracks: data } : (data.playlist || data);
      var rawTracks = filterStoredObjectList(source.tracks);
      var tracks = rawTracks.map(function(item) {
        var rawUrl = firstImportedText([item.src, item.url], '', false);
        var importedSourceLabel = firstImportedText([item.sourceLabel], '', false);
        var importedSource = normalizeImportedSource(item.source, importedSourceLabel, rawUrl);
        return {
          title: firstImportedText([item.title, item.name, item.songName], '未知歌曲', false),
          artist: firstImportedText([item.artist, item.artists, item.singer], '未知歌手', true),
          album: firstImportedText([item.album], '', true),
          cover: safeCover(firstImportedText([item.cover, item.pic, item.albumPic], DEFAULT_COVER, true)),
          src: /^https?:\/\//i.test(rawUrl) ? rawUrl : '',
          source: importedSource,
          sourceLabel: importedSourceLabel || (importedSource === 'import' ? '导入' : (getSourceLabel(importedSource) || '导入')),
          duration: parseTrackDuration(item.duration || item.interval || item.time || item.dt || item.length)
        };
      });
      return { name: firstImportedText([source.name, source.title], fallbackName || '导入歌单', false), count: tracks.length, tracks: tracks, createdAt: Date.now() };
    }
    function openAddToPlaylistDrawer(track) {
      pendingPlaylistTrack = track;
      var body = userPlaylists.length
        ? '<div class="playlist-picker">' + userPlaylists.map(function(playlist, index) {
            return '<button onclick="addPendingTrackToPlaylist(' + index + ')"><span data-icon="music"></span><div><strong>' + escapeMarkup(playlist.name || '未命名歌单') + '</strong><small>' + getPlaylistCount(playlist) + ' 首</small></div></button>';
          }).join('') + '</div><div class="drawer-actions"><button onclick="openCreatePlaylistDrawer(event, pendingPlaylistTrack)">新建歌单</button><button class="primary" onclick="closePlaylistDrawer()">完成</button></div>'
        : '<div class="empty-note">还没有歌单。先新建一个歌单，再把这首歌加入进去。</div><div class="drawer-actions"><button onclick="closePlaylistDrawer()">取消</button><button class="primary" onclick="openCreatePlaylistDrawer(event, pendingPlaylistTrack)">新建歌单</button></div>';
      openPlaylistDrawer('添加到歌单', track.title || '', body);
    }
    function addPendingTrackToPlaylist(index) {
      if (!pendingPlaylistTrack || !userPlaylists[index]) return;
      var playlist = userPlaylists[index];
      var tracks = Array.isArray(playlist.tracks) ? playlist.tracks.slice() : [];
      if (!tracks.some(function(item) { return isSameTrack(item, pendingPlaylistTrack); })) tracks.unshift(pendingPlaylistTrack);
      userPlaylists[index] = { ...playlist, tracks: tracks, count: tracks.length };
      savePlaylists();
      closePlaylistDrawer();
    }
    function openPlaylistManageDrawer(index) {
      var playlist = userPlaylists[index];
      if (!playlist) return;
      var body = '<div class="action-track"><div class="playlist-cover">' + iconHtml('music') + '</div><div><strong>' + escapeMarkup(playlist.name || '未命名歌单') + '</strong><span>' + getPlaylistCount(playlist) + ' 首歌曲</span></div></div><div class="action-list"><button onclick="playPlaylist(' + index + ')">' + iconHtml('play') + ' 播放歌单</button><button onclick="renamePlaylist(' + index + ')">重命名</button><button onclick="deletePlaylist(' + index + ')">删除歌单</button><button onclick="closePlaylistDrawer()">关闭</button></div>';
      openPlaylistDrawer('歌单', '', body);
    }
    function playPlaylist(index) {
      var tracks = userPlaylists[index]?.tracks || [];
      if (!tracks.length) return;
      setQueue(tracks, 0);
      setCurrentTrack(playQueue[0]);
      openFullPlayer();
      playCurrentTrack();
      closePlaylistDrawer();
    }
    function renamePlaylist(index) {
      var oldName = userPlaylists[index]?.name || '';
      openPlaylistDrawer('重命名歌单', '', '<input class="drawer-input" id="rename-playlist-name" value="' + escapeMarkup(oldName) + '" maxlength="32"><div class="drawer-actions"><button onclick="closePlaylistDrawer()">取消</button><button class="primary" onclick="confirmRenamePlaylist(' + index + ')">保存</button></div>');
      setTimeout(function() { document.getElementById('rename-playlist-name')?.focus(); }, 30);
    }
    function confirmRenamePlaylist(index) {
      var name = (document.getElementById('rename-playlist-name')?.value || '').trim();
      if (!name || !userPlaylists[index]) return;
      userPlaylists[index] = { ...userPlaylists[index], name: name };
      savePlaylists();
      closePlaylistDrawer();
    }
    function deletePlaylist(index) {
      userPlaylists.splice(index, 1);
      savePlaylists();
      closePlaylistDrawer();
      if (currentUserPlaylistIndex === index) showView('mine');
    }
    var currentUserPlaylistIndex = -1;
    var playlistDetailSource = 'mine';
    function showUserPlaylistDetail(index, source) {
      currentUserPlaylistIndex = index;
      playlistDetailSource = source || (activeDiscoverCategory === 'mine' ? 'search' : 'mine');
      showView('user-playlist');
    }
    function goBackFromPlaylistDetail() {
      if (playlistDetailSource === 'search') {
        showView('search');
      } else {
        showView('mine');
      }
    }
    function renderUserPlaylistDetail() {
      var playlist = userPlaylists[currentUserPlaylistIndex];
      if (!playlist) { showView('mine'); return; }
      document.getElementById('user-playlist-title').textContent = playlist.name || '未命名歌单';
      document.getElementById('user-playlist-hero-title').textContent = playlist.name || '未命名歌单';
      var tracks = Array.isArray(playlist.tracks) ? playlist.tracks : [];
      document.getElementById('user-playlist-count').textContent = tracks.length + ' 首歌曲';
      var list = document.getElementById('user-playlist-list');
      if (!tracks.length) {
        list.innerHTML = '<div class="empty-note">歌单暂无歌曲，去搜索页添加喜欢的音乐吧。</div>';
        return;
      }
      list.innerHTML = tracks.map(function(track, i) {
        var cover = safeCover(track.cover || track.pic || DEFAULT_COVER);
        var title = escapeMarkup(track.title || track.name || '未知歌曲');
        var artist = escapeMarkup(track.artist || track.artists || '未知歌手');
        var sourceLabel = shouldShowSourceLabels() ? (track.sourceLabel || track.source || '') : '';
        return '<div class="track" onclick="playUserPlaylistTrack(' + i + ')">' +
          '<img src="' + escapeMarkup(cover) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '>' +
          '<div class="track-meta"><div class="track-name">' + title + '</div><div class="artist">' + artist + (sourceLabel ? '<span class="source-tag">' + escapeMarkup(sourceLabel) + '</span>' : '') + '</div></div>' +
          '<button class="track-remove" onclick="event.stopPropagation(); removeFromUserPlaylist(' + i + ')" aria-label="移除">' + iconHtml('close') + '</button>' +
          '</div>';
      }).join('');
    }
    function playUserPlaylistAll() {
      var playlist = userPlaylists[currentUserPlaylistIndex];
      if (!playlist || !playlist.tracks || !playlist.tracks.length) return;
      setQueue(playlist.tracks, 0);
      setCurrentTrack(playQueue[0]);
      openFullPlayer();
      playCurrentTrack();
    }
    function playUserPlaylistTrack(trackIndex) {
      var playlist = userPlaylists[currentUserPlaylistIndex];
      if (!playlist || !playlist.tracks) return;
      setQueue(playlist.tracks, trackIndex);
      setCurrentTrack(playQueue[trackIndex]);
      openFullPlayer();
      playCurrentTrack();
    }
    function removeFromUserPlaylist(trackIndex) {
      var playlist = userPlaylists[currentUserPlaylistIndex];
      if (!playlist || !Array.isArray(playlist.tracks)) return;
      playlist.tracks.splice(trackIndex, 1);
      playlist.count = playlist.tracks.length;
      savePlaylists();
      renderUserPlaylistDetail();
      showToast('已从歌单中移除');
    }
    function openUserPlaylistMenu() {
      var index = currentUserPlaylistIndex;
      var playlist = userPlaylists[index];
      if (!playlist) return;
      var body = '<div class="action-list">' +
        '<button onclick="playPlaylist(' + index + ')">' + iconHtml('play') + ' 播放全部</button>' +
        '<button onclick="renamePlaylistFromDetail(' + index + ')">' + iconHtml('settings') + ' 重命名</button>' +
        '<button onclick="exportUserPlaylist(' + index + ')">' + iconHtml('download') + ' 导出歌单</button>' +
        '<button class="danger" onclick="deletePlaylistFromDetail(' + index + ')">' + iconHtml('trash') + ' 删除歌单</button>' +
        '<button onclick="closePlaylistDrawer()">关闭</button></div>';
      openPlaylistDrawer(playlist.name || '歌单', '', body);
    }
    function renamePlaylistFromDetail(index) {
      var oldName = userPlaylists[index]?.name || '';
      openPlaylistDrawer('重命名歌单', '', '<input class="drawer-input" id="rename-playlist-name" value="' + escapeMarkup(oldName) + '" maxlength="32"><div class="drawer-actions"><button onclick="closePlaylistDrawer()">取消</button><button class="primary" onclick="confirmRenamePlaylistFromDetail(' + index + ')">保存</button></div>');
      setTimeout(function() { document.getElementById('rename-playlist-name')?.focus(); }, 30);
    }
    function confirmRenamePlaylistFromDetail(index) {
      var name = (document.getElementById('rename-playlist-name')?.value || '').trim();
      if (!name || !userPlaylists[index]) return;
      userPlaylists[index] = { ...userPlaylists[index], name: name };
      savePlaylists();
      closePlaylistDrawer();
      renderUserPlaylistDetail();
    }
    function deletePlaylistFromDetail(index) {
      userPlaylists.splice(index, 1);
      savePlaylists();
      closePlaylistDrawer();
      goBackFromPlaylistDetail();
      showToast('歌单已删除');
    }
    function exportUserPlaylist(index) {
      var playlist = userPlaylists[index];
      if (!playlist) return;
      var data = { name: playlist.name, tracks: playlist.tracks || [] };
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = (playlist.name || '歌单') + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      closePlaylistDrawer();
      showToast('歌单已导出');
    }
    function renderLyricsMessage(message) {
      var retry = message === '暂无歌词'
        ? '<div class="meta"><button class="lyrics-retry" onclick="event.stopPropagation(); loadLyricsForTrack(currentTrack)">重新搜索歌词</button></div>'
        : '';
      document.getElementById('lyrics-box').innerHTML = '<div class="meta">' + escapeMarkup(message) + '</div>' + retry;
    }
    function renderLyricsLines(lines, activeIndex, source) {
      var box = document.getElementById('lyrics-box');
      if (!box) return;
      if (!lines || !lines.length) {
        renderLyricsMessage('暂无歌词');
        return;
      }
      box.innerHTML = lines.map(function(line, index) {
          return '<div data-lyric-index="' + index + '" class="' + (index === activeIndex ? 'current' : '') + '">' + escapeMarkup(line) + '</div>';
        }).join('');
      currentLyrics.activeIndex = activeIndex;
      centerActiveLyric(activeIndex, false);
    }
    function centerActiveLyric(activeIndex, smooth) {
      var box = document.getElementById('lyrics-box');
      if (!box) return;
      var current = box.querySelector('[data-lyric-index="' + activeIndex + '"]');
      if (!current) return;
      requestAnimationFrame(function() {
        var boxRect = box.getBoundingClientRect();
        var lineRect = current.getBoundingClientRect();
        var delta = (lineRect.top + lineRect.height / 2) - (boxRect.top + boxRect.height / 2);
        var target = Math.max(0, box.scrollTop + delta);
        box.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' });
      });
    }
    function setActiveLyricLine(activeIndex) {
      var box = document.getElementById('lyrics-box');
      if (!box) return;
      box.querySelector('.current')?.classList.remove('current');
      var current = box.querySelector('[data-lyric-index="' + activeIndex + '"]');
      if (current) current.classList.add('current');
      centerActiveLyric(activeIndex, true);
    }
    function normalizeLyricRows(payload) {
      var synced = Array.isArray(payload.syncedLyrics) ? payload.syncedLyrics
        .map(function(entry) {
          return { time: Number(entry.time), text: String(entry.text || '').trim() };
        })
        .filter(function(entry) { return Number.isFinite(entry.time) && entry.text; }) : [];
      if (synced.length) {
        return {
          lines: synced.map(function(entry) { return entry.text; }),
          synced: synced
        };
      }
      return {
        lines: Array.isArray(payload.lines) ? payload.lines.filter(Boolean).map(String) : [],
        synced: []
      };
    }
    function parseLrcText(lrc) {
      if (!lrc || typeof lrc !== 'string') return [];
      var lines = lrc.split('\n');
      var result = [];
      for (var i = 0; i < lines.length; i++) {
        var match = lines[i].match(/^\[(\d+):(\d+(?:\.\d+)?)\](.*)/);
        if (match) {
          var time = parseInt(match[1]) * 60 + parseFloat(match[2]);
          var text = match[3].trim();
          if (text) result.push({ time: time, text: text });
        }
      }
      return result.sort(function(a, b) { return a.time - b.time; });
    }
    async function loadLyricsForTrack(track) {
      var requestId = ++lyricsRequestId;
      currentLyrics = { lines: [], synced: [], source: 'loading', activeIndex: -1 };
      renderLyricsMessage('正在搜索歌词...');
      try {
        if (track.source && track.source !== 'local' && track.lyric_id) {
          try {
            var gdUrl = gdMusicApiBase + '?types=lyric&source=' + encodeURIComponent(track.source) + '&id=' + encodeURIComponent(track.lyric_id);
            var gdPayload = await fetchGdMusicJson(gdUrl);
            if (requestId !== lyricsRequestId) return;
            if (gdPayload && gdPayload.lyric) {
              var synced = parseLrcText(gdPayload.lyric);
              if (synced.length) {
                currentLyrics = { lines: synced.map(function(e) { return e.text; }), synced: synced, source: track.sourceLabel || track.source, activeIndex: -1 };
                renderLyricsLines(currentLyrics.lines, 0, currentLyrics.source);
                return;
              }
            }
          } catch (e) { console.warn('GD lyrics fallback failed', e); }
        }
        var url = lyricsApiBase + '?title=' + encodeURIComponent(track.title || '') + '&artist=' + encodeURIComponent(track.artist || '');
        var response = await fetch(url);
        if (!response.ok) throw new Error('lyrics not found');
        var payload = await response.json();
        if (requestId !== lyricsRequestId) return;
        var rows = normalizeLyricRows(payload);
        if (!rows.lines.length) throw new Error('empty lyrics');
        currentLyrics = { lines: rows.lines, synced: rows.synced, source: payload.source || '公开歌词源', activeIndex: -1 };
        renderLyricsLines(rows.lines, 0, currentLyrics.source);
      } catch (error) {
        if (requestId !== lyricsRequestId) return;
        currentLyrics = { lines: [], synced: [], source: 'empty', activeIndex: -1 };
        renderLyricsMessage('暂无歌词');
      }
    }
    function syncLyrics() {
      if (!currentLyrics.lines.length) return;
      if (audioPlayer.paused && !document.getElementById('full-main')?.classList.contains('show-lyrics')) return;
      var duration = audioPlayer.duration || currentTrack.duration || 0;
      var activeIndex = 0;
      if (currentLyrics.synced.length) {
        var now = audioPlayer.currentTime + 0.12;
        for (var i = 0; i < currentLyrics.synced.length; i += 1) {
          if (Number(currentLyrics.synced[i].time) <= now) activeIndex = i;
          else break;
        }
      } else if (duration) {
        activeIndex = Math.min(currentLyrics.lines.length - 1, Math.floor(audioPlayer.currentTime / duration * currentLyrics.lines.length));
      }
      if (currentLyrics.activeIndex === activeIndex) return;
      currentLyrics.activeIndex = activeIndex;
      setActiveLyricLine(activeIndex);
    }
    function showLyricsPanel() {
      document.getElementById('full-main').classList.add('show-lyrics');
      if (!currentLyrics.lines.length && currentLyrics.source !== 'loading') loadLyricsForTrack(currentTrack);
      centerActiveLyric(Math.max(0, currentLyrics.activeIndex), false);
    }
    function toggleLyricsPanel(event) {
      if (event?.target?.closest?.('button, input, .seek, .controls, .full-meta')) return;
      var main = document.getElementById('full-main');
      var opening = !main.classList.contains('show-lyrics');
      main.classList.toggle('show-lyrics', opening);
      if (!opening) return;
      if (!currentLyrics.lines.length && currentLyrics.source !== 'loading') {
        loadLyricsForTrack(currentTrack);
        return;
      }
      syncLyrics();
      requestAnimationFrame(function() {
        centerActiveLyric(Math.max(0, currentLyrics.activeIndex), false);
      });
    }
    function setSettingsVolume(value) {
      var normalized = Math.max(0, Math.min(100, Number(value) || 0));
      appSettings.volume = normalized;
      saveAppSettings();
      audioPlayer.volume = normalized / 100;
      var label = document.getElementById('volume-label');
      if (label) label.textContent = normalized + '%';
      var slider = document.querySelector('[data-setting="volume"]');
      if (slider) slider.value = normalized;
    }
    function setFullBackgroundMode(value) {
      value = ['theme', 'cover', 'texture'].includes(value) ? value : 'cover';
      appSettings.fullBackgroundMode = value;
      saveAppSettings();
      blurredBackground = value === 'cover';
      var bg = document.querySelector('.fullscreen-bg');
      if (bg) bg.style.display = value === 'cover' ? 'block' : 'none';
      var full = document.getElementById('full-player');
      if (full) full.dataset.background = value;
      var select = document.getElementById('background-label');
      if (select) select.value = value;
    }
    function toggleThemeSetting(event) {
      if (event) event.stopPropagation();
      var next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      appSettings.theme = next;
      saveAppSettings();
      applyThemeSetting();
    }
    function applyThemeSetting() {
      var dark = appSettings.theme === 'dark';
      document.documentElement.classList.toggle('dark', dark);
      var label = document.getElementById('theme-setting-label');
      if (label) label.textContent = dark ? '深色' : '浅色';
      var switchButton = document.getElementById('theme-switch');
      if (switchButton) {
        switchButton.innerHTML = iconHtml(dark ? 'sun' : 'moon');
        switchButton.setAttribute('aria-label', dark ? '当前深色主题，切换到浅色主题' : '当前浅色主题，切换到深色主题');
        switchButton.setAttribute('aria-pressed', dark ? 'true' : 'false');
        switchButton.title = dark ? '切换到浅色主题' : '切换到深色主题';
      }
      if (window.LJYYTTheme && typeof window.LJYYTTheme.set === 'function') {
        window.LJYYTTheme.set(appSettings.theme);
      }
    }
    function syncSettingToggleState(button, enabled) {
      if (!button) return;
      var label = button.dataset.settingLabel || button.getAttribute('aria-label') || '设置';
      button.classList.toggle('off', !enabled);
      button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      button.setAttribute('aria-label', label + (enabled ? '开启' : '关闭'));
      button.title = label + (enabled ? '已开启' : '已关闭');
      button.dataset.stateText = enabled ? '开' : '关';
    }
    function initSettings() {
      appSettings = normalizeAppSettings(readStoredObject(SETTINGS_KEY));
      if (window.LJYYTTheme && typeof window.LJYYTTheme.get === 'function') {
        var saved = window.LJYYTTheme.get();
        if (saved === 'dark' || saved === 'light') appSettings.theme = saved;
      }
      document.querySelectorAll('.toggle[data-setting]').forEach(function(button) {
        var key = button.dataset.setting;
        var enabled = appSettings[key] !== false;
        syncSettingToggleState(button, enabled);
      });
      applyThemeSetting();
      setSettingsVolume(appSettings.volume);
      setFullBackgroundMode(appSettings.fullBackgroundMode);
    }

    function openSettingDrawer(type) {
      var titleMap = {
        netease: ['网易云账号', '打开网易云音乐 APP 扫一扫登录。'],
        sync: ['配置同步密钥', '请输入您的 SYNC_KEY 用于数据同步。'],
        api: ['自定义 API 地址', '自建后端用户可在此修改 API 地址，留空则恢复默认。'],
        version: ['版本更新', '当前为丽江音悦台 Otter 融合预览版。'],
        logs: ['诊断日志', '用于排查搜索、播放、歌词等运行异常。']
      };
      var config = titleMap[type] || ['设置', ''];
      document.getElementById('setting-drawer-title').textContent = config[0];
      document.getElementById('setting-drawer-desc').textContent = config[1];
      var body = document.getElementById('setting-drawer-body');
      if (type === 'netease') {
        renderNeteaseLoginDrawer();
        startNeteaseQrLogin();
      } else if (type === 'sync') {
        body.innerHTML = '<input class="drawer-input" type="password" placeholder="请输入 SYNC_KEY"><div class="drawer-actions"><button onclick="closeSettingDrawer()">取消</button><button class="primary" onclick="closeSettingDrawer()">确认</button></div>';
      } else if (type === 'api') {
        body.innerHTML = '<input class="drawer-input" placeholder="输入自建后端地址，如 https://my-api.example.com"><div class="drawer-actions"><button onclick="closeSettingDrawer()">恢复默认</button><button class="primary" onclick="closeSettingDrawer()">保存</button></div>';
      } else if (type === 'logs') {
        body.innerHTML = '<div class="cache-stat">暂无日志记录</div><div class="drawer-actions"><button onclick="closeSettingDrawer()">清空</button><button class="primary" onclick="closeSettingDrawer()">复制本次</button></div>';
      } else {
        body.innerHTML = '<div class="drawer-actions"><button class="primary" onclick="closeSettingDrawer()">知道了</button></div>';
      }
      document.getElementById('setting-drawer').classList.add('open');
      document.getElementById('setting-drawer-scrim').classList.add('open');
    }
    function closeSettingDrawer() {
      stopNeteaseLoginPolling();
      document.getElementById('setting-drawer').classList.remove('open');
      document.getElementById('setting-drawer-scrim').classList.remove('open');
    }
    function getStoredNeteaseLogin() {
      return readStoredObject('ljyyt_otter_netease_login');
    }
    function setNeteaseLoginState(profile, cookie) {
      writeStoredObject('ljyyt_otter_netease_login', { profile, cookie, timestamp: Date.now() });
      mineDataCache = { recommend: null, created: null, subscribed: null, albums: null };
      updateNeteaseLoginSetting();
    }
    function clearNeteaseLogin() {
      removeStoredItem('ljyyt_otter_netease_login');
      mineDataCache = { recommend: null, created: null, subscribed: null, albums: null };
      updateNeteaseLoginSetting();
      renderNeteaseLoginDrawer();
    }
    function updateNeteaseLoginSetting() {
      var login = getStoredNeteaseLogin();
      var name = login && login.profile && login.profile.nickname;
      var subtitle = document.getElementById('netease-login-subtitle');
      var action = document.getElementById('netease-login-action');
      if (subtitle) subtitle.textContent = name ? name : '登录后可同步歌单';
      if (action) action.textContent = name ? '已登录' : '登录';
    }
    function renderNeteaseLoginDrawer(message) {
      var login = getStoredNeteaseLogin();
      var body = document.getElementById('setting-drawer-body');
      if (!body) return;
      if (login && login.profile) {
        body.innerHTML =
          '<div class="cache-stat">' +
            '<strong>' + escapeMarkup(login.profile.nickname || '网易云用户') + '</strong><br>' +
            '<span>已登录网易云账号</span>' +
          '</div>' +
          '<div class="drawer-actions"><button onclick="clearNeteaseLogin()">退出登录</button><button class="primary" onclick="closeSettingDrawer()">完成</button></div>';
        return;
      }
      body.innerHTML =
        '<div class="cache-stat" id="netease-qr-box">' + escapeMarkup(message || '正在获取二维码...') + '</div>' +
        '<div class="drawer-actions"><button onclick="startNeteaseQrLogin()">刷新二维码</button><button class="primary" onclick="closeSettingDrawer()">取消</button></div>';
    }
    function stopNeteaseLoginPolling() {
      if (neteaseLoginTimer) {
        clearTimeout(neteaseLoginTimer);
        neteaseLoginTimer = null;
      }
    }
    async function startNeteaseQrLogin() {
      stopNeteaseLoginPolling();
      if (getStoredNeteaseLogin()) {
        renderNeteaseLoginDrawer();
        return;
      }
      renderNeteaseLoginDrawer('正在获取二维码...');
      try {
        var response = await fetch(neteaseApiBase + '/login/qr/key?timestamp=' + Date.now());
        if (!response.ok) throw new Error('获取二维码失败');
        var payload = await response.json();
        var key = payload && (payload.unikey || (payload.data && payload.data.unikey));
        if (!key) throw new Error('二维码 key 为空');
        var qrUrl = 'https://music.163.com/login?codekey=' + encodeURIComponent(key);
        var qrImage = '';
        try {
          var createResponse = await fetch(neteaseApiBase + '/login/qr/create?key=' + encodeURIComponent(key) + '&qrimg=true&timestamp=' + Date.now());
          if (createResponse.ok) {
            var createPayload = await createResponse.json();
            qrImage = createPayload.qrimg || (createPayload.data && createPayload.data.qrimg) || '';
          }
        } catch (error) {}
        if (!qrImage) qrImage = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=' + encodeURIComponent(qrUrl);
        var box = document.getElementById('netease-qr-box');
        if (box) {
          box.innerHTML =
            '<img src="' + qrImage + '" alt="网易云登录二维码" style="width:180px;height:180px;border-radius:12px;background:#fff;padding:8px;display:block;margin:0 auto 10px" onerror="this.style.display=\'none\';this.nextElementSibling.textContent=\'二维码图片加载失败，请点刷新二维码重试。\';">' +
            '<div>请使用网易云音乐 APP 扫码</div>';
        }
        pollNeteaseQrStatus(key);
      } catch (error) {
        renderNeteaseLoginDrawer('二维码获取失败，请检查网络后点刷新重试。');
      }
    }
    async function pollNeteaseQrStatus(key) {
      try {
        var response = await fetch(neteaseApiBase + '/login/qr/check?key=' + encodeURIComponent(key) + '&timestamp=' + Date.now());
        if (!response.ok) throw new Error('登录状态检查失败');
        var payload = await response.json();
        var code = Number(payload.code || (payload.data && payload.data.code));
        var message = payload.message || (payload.data && payload.data.message) || '';
        var box = document.getElementById('netease-qr-box');
        if (code === 803 && payload.cookie) {
          if (box) box.insertAdjacentHTML('beforeend', '<div>登录成功，正在同步用户信息...</div>');
          var profile = await fetchNeteaseProfile(payload.cookie);
          setNeteaseLoginState(profile || { nickname: '网易云用户' }, payload.cookie);
          renderNeteaseLoginDrawer();
          return;
        }
        if (code === 802 && box) box.querySelector('div:last-child').textContent = '扫描成功，请在手机确认';
        if ((code === 800 || code === 8821) && box) {
          box.querySelector('div:last-child').textContent = message || '二维码已过期，请刷新';
          return;
        }
        neteaseLoginTimer = setTimeout(function() { pollNeteaseQrStatus(key); }, 1600);
      } catch (error) {
        neteaseLoginTimer = setTimeout(function() { pollNeteaseQrStatus(key); }, 2200);
      }
    }
    async function fetchNeteaseProfile(cookie) {
      var response = await fetch(neteaseApiBase + '/my-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookie })
      });
      if (!response.ok) return null;
      var payload = await response.json();
      return payload.profile || (payload.data && payload.data.profile) || null;
    }
    async function loadFullLibrary() {
      if (libraryLoaded) return;
      const list = document.getElementById('library-list');
      list.innerHTML = '<div class="empty-note">正在读取丽江曲库...</div>';
      try {
        const tracks = await ensureLibraryTracks();
        list.innerHTML = tracks.map((track, index) => (
          '<div class="track' + (index === 0 ? ' active' : '') + '" data-index="' + index + '">' +
            '<img loading="lazy" src="' + escapeMarkup(safeCover(track.cover)) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '>' +
            '<div class="track-meta"><div class="track-name">' + escapeMarkup(track.title) + '</div><div class="artist">' + escapeMarkup(track.artist) + '</div></div>' +
            '<span class="source">丽江曲库</span><button class="dots" type="button" data-track-action-trigger aria-label="更多" aria-haspopup="dialog" aria-expanded="false">' + iconHtml('more') + '</button>' +
          '</div>'
        )).join('');
        list.querySelectorAll('.track').forEach((row, index) => {
          row.addEventListener('click', () => {
            const track = tracks[index];
            chooseTrack(track.title, track.artist, safeCover(track.cover), track.src, track.duration);
          });
        });
        libraryLoaded = true;
      } catch (error) {
        list.innerHTML = '<div class="empty-note">曲库读取失败，请刷新后重试。</div>';
      }
    }
    async function loadFullVideos() {
      if (videosLoaded) return;
      const list = document.getElementById('videos-list');
      list.innerHTML = '<div class="empty-note">正在读取 MV 视频...</div>';
      try {
        const videos = await readSourceArray('/videos/video_data.js', 'const videoData');
        list.innerHTML = videos.map((video, index) => (
          '<article class="mv-card" data-index="' + index + '"><div class="mv-image">' +
            '<img loading="lazy" src="' + escapeMarkup(safeCover(video.cover)) + '" referrerpolicy="no-referrer"' + imageFallbackAttr() + '>' +
            '<div class="play"><span>' + iconHtml('play') + '</span></div></div>' +
            '<div class="mv-title">' + escapeMarkup(video.title) + '</div><div class="mv-artist">' + escapeMarkup(video.artist) + '</div></article>'
        )).join('');
        list.querySelectorAll('.mv-card').forEach((card, index) => {
          card.addEventListener('click', () => {
            const video = videos[index];
            openVideo(video.title, video.artist, video.src, video.cover);
          });
        });
        videosLoaded = true;
      } catch (error) {
        list.innerHTML = '<div class="empty-note">视频读取失败，请刷新后重试。</div>';
      }
    }
    function pausePreviewVideo() {
      const video = document.getElementById('preview-video');
      if (!video) return;
      video.pause();
    }
    function stopPreviewVideo() {
      const video = document.getElementById('preview-video');
      if (!video) return;
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    function showView(target) {
      setQueueDrawerOpen(false);
      closeTrackActionDrawer();
      closeSettingDrawer();
      closePlaylistDrawer();
      views.forEach((view) => view.classList.remove('active'));
      const next = document.querySelector('[data-view="' + target + '"]');
      if (next) next.classList.add('active');
      document.getElementById('search-shell')?.classList.toggle('hidden', target !== 'home');
      document.body.classList.toggle('view-search', target === 'search');
      document.querySelector('.content').scrollTop = 0;
      tabs.forEach((item) => item.classList.toggle('active', item.dataset.target === target));
      if (!['home', 'search', 'favorites', 'mine'].includes(target)) {
        tabs.forEach((item) => item.classList.remove('active'));
      }
      sourceMenu.classList.remove('open');
      if (target !== 'video') {
        stopPreviewVideo();
      }
      if (target === 'library') loadFullLibrary();
      if (target === 'videos') loadFullVideos();
      if (target === 'favorites') renderFavorites();
      if (target === 'history') renderHistory();
      if (target === 'queue') renderQueue();
      if (target === 'mine') renderPlaylists();
      if (target === 'user-playlist') renderUserPlaylistDetail();
      if (target === 'search') { renderIndexDiscoverPlaylists(); }
    }
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        showView(tab.dataset.target);
      });
    });
    function toggleProvider(event) {
      event.stopPropagation();
      aggregateSourcePanel.classList.remove('open');
      var wrap = event.currentTarget && event.currentTarget.closest('.provider-wrap');
      if (wrap && sourceMenu && sourceMenu.parentElement !== wrap) wrap.appendChild(sourceMenu);
      sourceMenu.classList.toggle('open');
    }
    function toggleAggregateSourcePanel(event) {
      event.stopPropagation();
      sourceMenu.classList.remove('open');
      var open = !aggregateSourcePanel.classList.contains('open');
      aggregateSourcePanel.classList.toggle('open', open);
      document.getElementById('aggregate-source-chevron')?.classList.toggle('open', open);
    }
    function syncProviderSelection(provider) {
      activeProvider = provider || '聚合搜索';
      document.getElementById('provider-label').textContent = activeProvider;
      var discoverProvider = document.querySelector('#discover-provider-button span');
      if (discoverProvider) discoverProvider.textContent = activeProvider;
      document.querySelectorAll('.source-option').forEach((item) => {
        item.classList.toggle('selected', item.dataset.provider === activeProvider);
      });
      sourceMenu.classList.remove('open');
    }
    function refreshProviderOptionsVisibility() {
      document.querySelectorAll('.source-option').forEach(function(item) {
        var provider = item.dataset.provider || '';
        var source = providerSourceMap[provider];
        if (!source || source === 'all') {
          item.hidden = false;
          item.disabled = false;
          item.style.order = '-1';
          return;
        }
        var config = getSourceConfig(source);
        var index = sourceConfigs.findIndex(function(entry) { return entry.source === source; });
        var hiddenInPicker = config && config.showInPicker === false;
        var notSelected = config ? config.enabled === false : false;
        var hidden = hiddenInPicker || notSelected;
        item.hidden = !!hidden;
        item.disabled = !!hidden;
        item.style.order = index >= 0 ? String(index) : '99';
      });
      var activeSource = providerSourceMap[activeProvider];
      var activeConfig = getSourceConfig(activeSource);
      var activeHidden = activeSource && activeSource !== 'all' && activeConfig &&
        (activeConfig.showInPicker === false || activeConfig.enabled === false);
      if (activeHidden) {
        syncProviderSelection('聚合搜索');
      }
    }
    function updateAggregateSourceUI() {
      document.querySelectorAll('.aggregate-source-option').forEach((item) => {
        var source = item.dataset.source;
        var config = getSourceConfig(source);
        var selected = config ? config.enabled !== false : aggregatedSources.includes(source);
        var index = sourceConfigs.findIndex(function(entry) { return entry.source === source; });
        item.classList.toggle('selected', selected);
        var check = item.querySelector('.aggregate-check');
        if (check) check.innerHTML = selected ? iconHtml('check') : '';
        item.style.order = index >= 0 ? String(index) : '99';
        var tools = item.querySelector('.aggregate-source-tools');
        if (tools) {
          var showInPicker = !config || config.showInPicker !== false;
          tools.innerHTML =
            '<button class="aggregate-source-tool" type="button" aria-label="上移" onclick="moveAggregateSource(event, \'' + source + '\', -1)"' + (index <= 0 ? ' disabled' : '') + '>' + iconHtml('chevronUp') + '</button>' +
            '<button class="aggregate-source-tool" type="button" aria-label="下移" onclick="moveAggregateSource(event, \'' + source + '\', 1)"' + (index < 0 || index >= sourceConfigs.length - 1 ? ' disabled' : '') + '>' + iconHtml('chevronDown') + '</button>' +
            '<button class="aggregate-source-tool' + (showInPicker ? '' : ' hidden-state') + '" type="button" aria-label="' + (showInPicker ? '从下拉框隐藏' : '在下拉框显示') + '" onclick="toggleSourcePickerVisibility(event, \'' + source + '\')">' + iconHtml(showInPicker ? 'eye' : 'eyeOff') + '</button>';
        }
      });
      document.getElementById('aggregate-source-label').textContent = aggregatedSources
        .map(function(source) { return aggregateSourceLabels[source]; })
        .filter(Boolean)
        .join('\u3001');
      refreshProviderOptionsVisibility();
    }
    function toggleAggregateSource(event, source) {
      event.preventDefault();
      event.stopPropagation();
      var config = getSourceConfig(source);
      if (!config) return;
      if (config.enabled !== false) {
        if (aggregatedSources.length <= 1) return;
        config.enabled = false;
      } else {
        config.enabled = true;
      }
      saveSourceConfigs();
      updateAggregateSourceUI();
      if (activeProvider === '聚合搜索') renderIndexDiscoverPlaylists();
    }
    function moveAggregateSource(event, source, delta) {
      event.preventDefault();
      event.stopPropagation();
      var index = sourceConfigs.findIndex(function(item) { return item.source === source; });
      var nextIndex = index + delta;
      if (index < 0 || nextIndex < 0 || nextIndex >= sourceConfigs.length) return;
      var item = sourceConfigs.splice(index, 1)[0];
      sourceConfigs.splice(nextIndex, 0, item);
      saveSourceConfigs();
      updateAggregateSourceUI();
      if (activeProvider === '聚合搜索') renderIndexDiscoverPlaylists();
    }
    function toggleSourcePickerVisibility(event, source) {
      event.preventDefault();
      event.stopPropagation();
      var config = getSourceConfig(source);
      if (!config) return;
      config.showInPicker = config.showInPicker === false;
      saveSourceConfigs();
      updateAggregateSourceUI();
    }
    document.querySelectorAll('.search-tab').forEach((tab) => {
      tab.addEventListener('click', () => {});
    });
    // Discover category events are bound by renderMarketCategories(), matching dev PlaylistMarket dynamic filter row.
    document.querySelectorAll('.source-option').forEach((option) => {
      option.addEventListener('click', (event) => {
        event.stopPropagation();
        if (option.disabled) return;
        syncProviderSelection(option.dataset.provider);
        showView('search');
        var searchInput = getSearchInput();
        var query = String(searchInput && searchInput.value || '').trim();
        if (query) {
          performSearch({ remember: false });
        } else {
          renderIndexDiscoverPlaylists();
        }
      });
    });
    document.addEventListener('click', () => {
      sourceMenu.classList.remove('open');
      aggregateSourcePanel.classList.remove('open');
      document.getElementById('aggregate-source-chevron')?.classList.remove('open');
    });
    function handleLikePointer(event) {
      const likeButton = event.target.closest('.full-meta .like');
      if (!likeButton) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      const now = Date.now();
      if (now - lastLikeTapAt < 250) return;
      lastLikeTapAt = now;
      toggleLike(event, likeButton);
    }
    document.addEventListener('pointerup', handleLikePointer, true);
    document.addEventListener('click', handleLikePointer, true);
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('.dots');
      if (!trigger) return;
      event.preventDefault();
      event.stopPropagation();
      const row = event.target.closest('.track');
      const container = row && row.parentElement;
      if (container && (container.id === 'queue-drawer-list' || container.id === 'queue-list')) {
        openTrackActionDrawer(trackFromRenderedRow(row), trigger);
      } else {
        openTrackActionDrawer(trackFromRenderedRow(row), trigger);
      }
    }, true);
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('.dots');
      if (!trigger) return;
      event.stopPropagation();
      const row = event.target.closest('.track');
      const container = row && row.parentElement;
      const index = row ? Number(row.dataset.index) || 0 : 0;
      const queue = playQueue.length ? playQueue : [currentTrack];
      if (container && container.id === 'queue-drawer-list') {
        openTrackActionDrawer(queue[index] || currentTrack, trigger);
      }
    });
    function applyInitialRoute() {
      var params = new URLSearchParams(window.location.search);
      var view = params.get('view');
      var query = params.get('q') || params.get('keyword') || '';
      var source = params.get('source') || '';
      var sourceMap = {
        aggregate: '聚合搜索',
        all: '聚合搜索',
        local: '丽江曲库',
        joox: 'Joox',
        qq: 'QQ音乐',
        lx_qq: '小秋音乐',
        netease: '网易云音乐',
        kuwo: '酷我音乐',
        lx_kuwo: '小蜗音乐',
        migu: 'Migu',
        bilibili: 'B站',
        _netease: 'Netease'
      };
      if (source && sourceMap[source]) syncProviderSelection(sourceMap[source]);
      var playlistId = params.get('playlist') || '';
      if (view === 'market-playlist' && playlistId) {
        showView('market-playlist');
        var seed = { id: String(playlistId), name: '歌单', cover: DEFAULT_COVER, trackCount: 0 };
        renderMarketPlaylistDetail(seed, [], '加载中...');
        fetchMarketPlaylistDetail(playlistId)
          .then(function(detail) { renderMarketPlaylistDetail(detail, detail.tracks); })
          .catch(function() { renderMarketPlaylistDetail(seed, [], '歌单加载失败，请稍后重试。'); });
        return;
      }
      if (view === 'search' || query) {
        showView('search');
        if (query) {
          var input = document.getElementById('search-input');
          if (input) input.value = query;
          performSearch({ remember: false });
        }
        renderIndexDiscoverPlaylists();
      }
    }
    async function chooseTrack(name, artist, cover, src, duration) {
      pausePreviewVideo();
      setQueueDrawerOpen(false);
      closeTrackActionDrawer();
      closeSettingDrawer();
      const track = src ? { title: name, artist, cover, src, duration } : await findTrack(name, artist, cover);
      setCurrentTrack(track);
      openFullPlayer();
      playCurrentTrack();
    }
    function openVideo(name, artist, src, poster) {
      pauseCurrentTrack();
      document.getElementById('video-title').textContent = name;
      document.getElementById('video-artist').textContent = artist;
      const video = document.getElementById('preview-video');
      if (poster) video.poster = safeCover(poster);
      video.src = src;
      video.load();
      var wrap = document.getElementById('vp-wrap');
      wrap.classList.remove('is-playing', 'hide-controls');
      var endedOverlay = wrap.querySelector('.vp-ended-overlay');
      if (endedOverlay) endedOverlay.remove();
      showView('video');
      video.play().then(function() { wrap.classList.add('is-playing'); }).catch(function() {});
    }
    (function() {
      var vid = document.getElementById('preview-video');
      var wrap = document.getElementById('vp-wrap');
      if (!vid || !wrap) return;
      var hideTimer = null;
      var playIcon = '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none"/></svg>';
      var pauseIcon = '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="4" height="18" rx="1" fill="currentColor"/><rect x="15" y="3" width="4" height="18" rx="1" fill="currentColor"/></svg>';
      function fmtTime(s) { s = Math.floor(s || 0); var m = Math.floor(s / 60); return m + ':' + String(s % 60).padStart(2, '0'); }
      function setVideoProgressFromClientX(clientX) {
        if (!vid.duration) return;
        var progress = document.getElementById('vp-progress');
        var rect = progress.getBoundingClientRect();
        var ratio = Math.max(0, Math.min(1, (clientX - rect.left) / (rect.width || 1)));
        vid.currentTime = ratio * vid.duration;
        document.getElementById('vp-bar-fill').style.width = (ratio * 100) + '%';
      }
      function exitVideoFullscreen() {
        wrap.classList.remove('is-faux-fullscreen');
        document.body.classList.remove('video-faux-fullscreen');
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
      function enterVideoFullscreen() {
        if (wrap.classList.contains('is-faux-fullscreen') || document.fullscreenElement || document.webkitFullscreenElement) {
          exitVideoFullscreen();
          return;
        }
        if (wrap.requestFullscreen) {
          wrap.requestFullscreen().catch(function() {
            if (vid.webkitEnterFullscreen) vid.webkitEnterFullscreen();
            else { wrap.classList.add('is-faux-fullscreen'); document.body.classList.add('video-faux-fullscreen'); }
          });
        } else if (vid.webkitEnterFullscreen) {
          vid.webkitEnterFullscreen();
        } else {
          wrap.classList.add('is-faux-fullscreen');
          document.body.classList.add('video-faux-fullscreen');
        }
      }
      function scheduleHide() {
        clearTimeout(hideTimer);
        wrap.classList.remove('hide-controls');
        if (!vid.paused) hideTimer = setTimeout(function() { wrap.classList.add('hide-controls'); }, 3000);
      }
      wrap.addEventListener('mousemove', scheduleHide);
      wrap.addEventListener('touchstart', function() { if (wrap.classList.contains('hide-controls')) { scheduleHide(); } }, { passive: true });
      wrap.addEventListener('click', function(e) {
        if (e.target.closest('button, input, .vp-progress, .vp-controls')) return;
        if (vid.paused) { vid.play(); } else { vid.pause(); }
      });
      wrap.addEventListener('dblclick', function(e) {
        if (e.target.closest('button, input, .vp-progress, .vp-controls')) return;
        enterVideoFullscreen();
      });
      vid.addEventListener('play', function() {
        wrap.classList.add('is-playing');
        document.getElementById('vp-play').innerHTML = pauseIcon;
        scheduleHide();
      });
      vid.addEventListener('pause', function() {
        wrap.classList.remove('is-playing', 'hide-controls');
        document.getElementById('vp-play').innerHTML = playIcon;
        clearTimeout(hideTimer);
      });
      vid.addEventListener('timeupdate', function() {
        var dur = vid.duration || 0;
        document.getElementById('vp-cur').textContent = fmtTime(vid.currentTime);
        document.getElementById('vp-dur').textContent = fmtTime(dur);
        document.getElementById('vp-bar-fill').style.width = dur ? (vid.currentTime / dur * 100) + '%' : '0%';
      });
      vid.addEventListener('progress', function() {
        if (vid.buffered.length && vid.duration) {
          document.getElementById('vp-buffer').style.width = (vid.buffered.end(vid.buffered.length - 1) / vid.duration * 100) + '%';
        }
      });
      vid.addEventListener('ended', function() {
        wrap.classList.remove('is-playing', 'hide-controls');
        document.getElementById('vp-play').innerHTML = playIcon;
        var overlay = document.createElement('div');
        overlay.className = 'vp-ended-overlay';
        overlay.innerHTML = '<button>重新播放</button>';
        overlay.querySelector('button').onclick = function() { vid.currentTime = 0; vid.play(); overlay.remove(); };
        wrap.appendChild(overlay);
      });
      document.getElementById('vp-play').addEventListener('click', function(e) {
        e.stopPropagation();
        if (vid.paused) vid.play(); else vid.pause();
      });
      (function() {
        var progress = document.getElementById('vp-progress');
        var dragging = false;
        progress.addEventListener('pointerdown', function(e) {
          e.stopPropagation();
          e.preventDefault();
          dragging = true;
          progress.setPointerCapture?.(e.pointerId);
          setVideoProgressFromClientX(e.clientX);
        });
        progress.addEventListener('pointermove', function(e) {
          if (!dragging) return;
          e.preventDefault();
          setVideoProgressFromClientX(e.clientX);
        });
        function endDrag(e) {
          if (!dragging) return;
          dragging = false;
          try { progress.releasePointerCapture?.(e.pointerId); } catch (error) {}
        }
        progress.addEventListener('pointerup', endDrag);
        progress.addEventListener('pointercancel', endDrag);
      })();
      document.getElementById('vp-vol').addEventListener('input', function() {
        vid.volume = parseFloat(this.value);
        vid.muted = false;
      });
      document.getElementById('vp-mute').addEventListener('click', function(e) {
        e.stopPropagation();
        vid.muted = !vid.muted;
        document.getElementById('vp-vol').value = vid.muted ? 0 : vid.volume;
      });
      document.getElementById('vp-fs').addEventListener('click', function(e) {
        e.stopPropagation();
        enterVideoFullscreen();
      });
      document.getElementById('vp-pip').addEventListener('click', function(e) {
        e.stopPropagation();
        if (document.pictureInPictureElement) document.exitPictureInPicture(); else vid.requestPictureInPicture().catch(function() {});
      });
      document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
          wrap.classList.remove('is-faux-fullscreen');
          document.body.classList.remove('video-faux-fullscreen');
        }
      });
    })();
    function toggleSetting(event, element) {
      event.stopPropagation();
      var key = element && element.dataset && element.dataset.setting;
      var enabled = element.classList.contains('off');
      syncSettingToggleState(element, enabled);
      if (key) {
        appSettings[key] = enabled;
        saveAppSettings();
      }
      if (key === 'showSourceLabels') {
        renderSearchRows(currentSearchState.songs || [], activeProvider);
        renderFavorites();
        renderQueue();
        renderHistory();
        renderUserPlaylistDetail();
      }
    }
    function openFullPlayer() {
      pausePreviewVideo();
      closeTrackActionDrawer();
      closeSettingDrawer();
      setQueueDrawerOpen(false);
      document.getElementById('full-player').classList.add('open');
      document.body.classList.add('full-player-open');
      showLyricsPanel();
      setPlayIcons(!audioPlayer.paused);
    }
    function closeFullPlayer() {
      setQueueDrawerOpen(false);
      closeTrackActionDrawer();
      document.getElementById('full-player').classList.remove('open');
      document.getElementById('full-main').classList.remove('show-lyrics');
      document.body.classList.remove('full-player-open');
    }
    window.addEventListener('pagehide', stopPreviewVideo);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopPreviewVideo();
    });
    function updateAudioDurationUi() {
      if (!currentTrack) return;
      var duration = parseTrackDuration(audioPlayer.duration) || parseTrackDuration(currentTrack.duration);
      if (duration) currentTrack.duration = duration;
      document.getElementById('duration-time').textContent = formatDuration(duration);
    }
    audioPlayer.addEventListener('loadedmetadata', () => {
      updateAudioDurationUi();
      if (restoredPlaybackTime) {
        audioPlayer.currentTime = Math.min(restoredPlaybackTime, audioPlayer.duration || restoredPlaybackTime);
        document.getElementById('current-time').textContent = formatDuration(audioPlayer.currentTime);
        const duration = audioPlayer.duration || currentTrack.duration || 0;
        const progress = duration ? Math.min(100, (audioPlayer.currentTime / duration) * 100) : 0;
        document.getElementById('seek-line').style.setProperty('--audio-progress', progress + '%');
        updateMiniProgress(progress);
        restoredPlaybackTime = 0;
      }
    });
    audioPlayer.addEventListener('durationchange', updateAudioDurationUi);
    audioPlayer.addEventListener('canplay', updateAudioDurationUi);
    audioPlayer.addEventListener('timeupdate', () => {
      if (!isSeekingAudio) {
        const duration = audioPlayer.duration || currentTrack.duration || 0;
        const progress = duration ? Math.min(100, (audioPlayer.currentTime / duration) * 100) : 0;
        document.getElementById('current-time').textContent = formatDuration(audioPlayer.currentTime);
        document.getElementById('seek-line').style.setProperty('--audio-progress', progress + '%');
        updateMiniProgress(progress);
        syncLyrics();
      }
      savePlaybackState();
    });
    window.addEventListener('beforeunload', function() { savePlaybackState(true); });
    audioPlayer.addEventListener('pause', confirmAudioPaused);
    audioPlayer.addEventListener('play', confirmAudioPlaying);
    audioPlayer.addEventListener('playing', confirmAudioPlaying);
    audioPlayer.addEventListener('ended', handleTrackEnded);
    audioPlayer.addEventListener('error', function() {
      var requestId = _playRequestId;
      var failedSrc = audioPlayer.getAttribute('src') || '';
      if (!currentTrack || !failedSrc || isSilentAudioPrimerSrc(failedSrc) || _isResolvingUrl) return;
      console.warn('Audio playback error, attempting source fallback');
      switchToFallbackSource('audio-error', requestId, failedSrc).then(function(switched) {
        if (requestId !== _playRequestId || failedSrc !== audioPlayer.getAttribute('src')) return;
        if (switched) return;
        handleNoPlayableSource('audio-error', requestId);
      });
    });
    document.querySelectorAll('img').forEach((image) => {
      image.alt = '';
      image.onerror = function() {
        this.onerror = null;
        this.src = DEFAULT_COVER;
      };
    });
    if (!restorePlaybackState()) {
      setCurrentTrack(currentTrack);
    }
    hydrateIcons(document);
    initSeekDragging();
    updateControlIcons();
    document.getElementById('play-mode-label').textContent = playModes[playModeIndex].label;
    setPlayIcons(!audioPlayer.paused);
    initSettings();
    updateAggregateSourceUI();
    renderFavorites();
    renderHistory();
    renderQueue();
    renderPlaylists();
    hideSearchHistory();
    updateNeteaseLoginSetting();
    applyInitialRoute();

    // MediaSession API - system media controls
    function updateMediaSession() {
      if (!('mediaSession' in navigator) || !currentTrack) return;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title || '未知歌曲',
        artist: currentTrack.artist || '未知歌手',
        artwork: currentTrack.cover && currentTrack.cover !== DEFAULT_COVER
          ? [{ src: currentTrack.cover, sizes: '512x512', type: 'image/jpeg' }]
          : []
      });
    }
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', function() { playCurrentTrack(); });
      navigator.mediaSession.setActionHandler('pause', function() { pauseCurrentTrack(); });
      navigator.mediaSession.setActionHandler('previoustrack', function() { previousTrack(); });
      navigator.mediaSession.setActionHandler('nexttrack', function() { nextTrack(); });
      navigator.mediaSession.setActionHandler('seekto', function(details) {
        if (details && details.seekTime != null) seekAudioToTime(details.seekTime);
      });
    }
    var _origSetCurrentTrack = setCurrentTrack;
    setCurrentTrack = function(track) {
      _origSetCurrentTrack(track);
      updateMediaSession();
    };
    updateMediaSession();

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && document.getElementById('action-drawer')?.classList.contains('open')) {
        event.preventDefault();
        closeTrackActionDrawer();
        return;
      }
      if (event.key === 'Escape' && document.getElementById('queue-drawer')?.classList.contains('open')) {
        event.preventDefault();
        setQueueDrawerOpen(false);
        return;
      }
      var tag = (event.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || event.target.isContentEditable) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      switch (event.code) {
        case 'Space':
          event.preventDefault();
          toggleAudio();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          previousTrack();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextTrack();
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSettingsVolume(Math.min(100, (appSettings.volume || 0) + 5));
          showToast('音量 ' + appSettings.volume + '%', 1200);
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSettingsVolume(Math.max(0, (appSettings.volume || 0) - 5));
          showToast('音量 ' + appSettings.volume + '%', 1200);
          break;
        case 'KeyM':
          event.preventDefault();
          if (audioPlayer.volume > 0) {
            audioPlayer._savedVolume = appSettings.volume;
            setSettingsVolume(0);
            showToast('已静音', 1200);
          } else {
            setSettingsVolume(audioPlayer._savedVolume || 100);
            showToast('音量 ' + appSettings.volume + '%', 1200);
          }
          break;
      }
    });
