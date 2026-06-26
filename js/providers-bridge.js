/**
 * providers-bridge.js
 *
 * 浏览器侧的 Provider 桥接层。把 `src/providers/*.ts` 里的逻辑用
 * 经典脚本（非 module）落到 `window.LjyytProviders`，保留 index.html
 * 内联 app.js 的运行方式不变。
 *
 * 默认行为：
 * - `window.LJYYT_ENABLE_PROVIDERS_BRIDGE` 不为 true 时，**完全不注册**
 *   任何 Provider，只把空 manager 暴露在 `window.LjyytProviders` 上，
 *   方便 app.js 做能力探测。app.js 的现有路径完全不受影响。
 * - 当该开关为 true 时，自动注册一个网易云 Provider，base 用
 *   `window.LJYYT_API_BASE` + `/api/netease`，回退到
 *   `https://otter-music.pages.dev/music-api/netease`。
 *
 * 这个文件**故意**写成 ES5 兼容的语法 + classic script，原因：
 *   1. 与 `index.html` 中其他 `<script>`（site-config.js / theme.js /
 *      icons.js / fix_wechat_images.js）保持一致；
 *   2. 内联 app.js 期望它在被解析之前就把 `window.LjyytProviders`
 *      准备好，所以不能用 `type="module"` 的异步加载。
 */
(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  // ---------- 工具：与 BaseProvider.ts 中的 normalizeString / similarity 对齐 ----------

  function normalizeString(str) {
    return String(str == null ? '' : str)
      .toLowerCase()
      .replace(/[\s\-_()()【】\[\]]/g, '')
      .trim();
  }

  function stringSimilarity(a, b) {
    if (a === b) return 1;
    if (!a.length || !b.length) return 0;
    var m = a.length;
    var n = b.length;
    var prev = new Array(n + 1);
    var curr = new Array(n + 1);
    for (var j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) {
      curr[0] = i;
      for (var k = 1; k <= n; k++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(k - 1) ? 0 : 1;
        var del = prev[k] + 1;
        var ins = curr[k - 1] + 1;
        var sub = prev[k - 1] + cost;
        var min = del < ins ? del : ins;
        if (sub < min) min = sub;
        curr[k] = min;
      }
      for (var p = 0; p <= n; p++) prev[p] = curr[p];
    }
    return 1 - prev[n] / Math.max(m, n);
  }

  function calculateTrackSimilarity(a, b) {
    if (!a || !b) return 0;
    var nameScore = stringSimilarity(normalizeString(a.name || a.title), normalizeString(b.name || b.title));
    var artistScore = stringSimilarity(normalizeString(a.artist), normalizeString(b.artist));
    return nameScore * 0.6 + artistScore * 0.4;
  }

  // 与 BaseProvider.parseLrc 对齐
  function parseLrc(lrcText) {
    var lines = [];
    var timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
    String(lrcText == null ? '' : lrcText)
      .split('\n')
      .forEach(function (line) {
        var matches = [];
        var m;
        timeRegex.lastIndex = 0;
        while ((m = timeRegex.exec(line)) !== null) matches.push(m);
        if (!matches.length) return;
        var text = line.replace(timeRegex, '').trim();
        if (!text) return;
        for (var i = 0; i < matches.length; i++) {
          var match = matches[i];
          var minutes = parseInt(match[1] || '0', 10);
          var seconds = parseInt(match[2] || '0', 10);
          var msStr = (match[3] || '0');
          while (msStr.length < 3) msStr = msStr + '0';
          var milliseconds = parseInt(msStr, 10);
          lines.push({ time: minutes * 60 + seconds + milliseconds / 1000, text: text });
        }
      });
    lines.sort(function (a, b) { return a.time - b.time; });
    return { lines: lines, raw: lrcText };
  }

  // ---------- 请求层：多 base fallback + AbortSignal 透传 + 超时 ----------

  function request(urls, options) {
    options = options || {};
    var list = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);
    if (!list.length) return Promise.reject(new Error('providers-bridge: empty url list'));
    if (options.signal && options.signal.aborted) {
      return Promise.reject(new DOMException('Aborted', 'AbortError'));
    }

    var controller = new AbortController();
    var onAbort = function () { controller.abort(); };
    if (options.signal) options.signal.addEventListener('abort', onAbort);
    var timeoutMs = typeof options.timeout === 'number' ? options.timeout : 10000;
    var timer = setTimeout(function () { controller.abort(); }, timeoutMs);

    var headers = {};
    if (options.headers) {
      Object.keys(options.headers).forEach(function (k) { headers[k] = options.headers[k]; });
    }
    var body;
    if (options.body !== undefined) {
      if (typeof options.body === 'string' || options.body instanceof FormData) {
        body = options.body;
      } else {
        if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
        body = JSON.stringify(options.body);
      }
    }
    var responseType = options.responseType || 'json';
    var method = options.method || 'GET';

    var attempts = list.map(function (url) {
      return fetch(url, { method: method, headers: headers, body: body, signal: controller.signal })
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return responseType === 'json' ? response.json() : response.text();
        })
        .then(function (data) {
          if (typeof options.validate === 'function' && !options.validate(data)) {
            throw new Error('providers-bridge: response failed validation');
          }
          return data;
        });
    });

    var settle = typeof Promise.any === 'function'
      ? Promise.any(attempts)
      : Promise.all(attempts.map(function (p) {
          return p.then(
            function (v) { return { ok: true, value: v }; },
            function (e) { return { ok: false, error: e }; }
          );
        })).then(function (results) {
          for (var i = 0; i < results.length; i++) {
            if (results[i].ok) return results[i].value;
          }
          throw new Error('providers-bridge: all endpoints failed');
        });

    return settle.then(
      function (value) {
        clearTimeout(timer);
        if (options.signal) options.signal.removeEventListener('abort', onAbort);
        return value;
      },
      function (error) {
        clearTimeout(timer);
        if (options.signal) options.signal.removeEventListener('abort', onAbort);
        if (options.signal && options.signal.aborted) {
          throw new DOMException('Aborted', 'AbortError');
        }
        if (controller.signal.aborted) {
          throw new Error('providers-bridge: request timeout after ' + timeoutMs + 'ms');
        }
        throw error;
      }
    );
  }

  // ---------- 网易云 Provider（与 app.js 中 fetchOtterNetease 行为对齐） ----------

  function isNeteaseHealthPayload(data) {
    return !!(data && data.ok === true && data.service === 'ljyyt-worker' && !data.data && !data.result && !data.playlist && !data.playlists);
  }

  function createNeteaseProvider(config) {
    config = config || {};
    var bases = (config.bases || []).filter(Boolean);
    if (!bases.length) throw new Error('NeteaseProvider: empty bases');
    var sourceCode = config.useGlobalSourceCode || '_netease';
    var bitrate = config.defaultBitrate || 192000;

    function post(path, payload, signal) {
      var urls = bases.map(function (b) { return String(b).replace(/\/+$/, '') + path; });
      return request(urls, {
        method: 'POST',
        body: payload || {},
        responseType: 'json',
        signal: signal,
        timeout: config.timeout || 10000,
        validate: function (data) {
          if (!data || typeof data !== 'object') return false;
          return !isNeteaseHealthPayload(data);
        }
      });
    }

    function normalizeSong(song) {
      if (!song) return null;
      var artists = song.ar || song.artists || [];
      var artistText = artists.map(function (a) { return a && a.name; }).filter(Boolean).join(' / ');
      var album = song.al || song.album || {};
      var albumName = typeof album === 'string' ? album : (album && album.name) || '';
      var cover = typeof album === 'object' && album ? (album.picUrl || '') : '';
      var durationSec = song.dt ? Math.floor(song.dt / 1000) : (song.duration || 0);
      var idStr = String(song.id == null ? '' : song.id);
      if (!idStr) return null;
      return {
        id: idStr,
        name: String(song.name == null ? '' : song.name),
        artist: artistText || '未知歌手',
        album: albumName,
        cover: cover || undefined,
        duration: durationSec,
        source: sourceCode,
        sourceLabel: '网易云音乐',
        provider: 'netease-api',
        urlId: idStr,
        lyric_id: idStr
      };
    }

    return {
      source: sourceCode,
      label: '网易云音乐',
      enabled: config.enabled !== false,
      priority: typeof config.priority === 'number' ? config.priority : 100,

      setEnabled: function (value) { this.enabled = !!value; },

      search: function (keyword, page, limit, signal) {
        page = page || 1;
        limit = Math.max(1, Math.min(100, limit || 20));
        return post('/search', { keyword: String(keyword || ''), type: 1, page: page, limit: limit, cookie: '' }, signal)
          .then(function (payload) {
            var data = (payload && payload.data) || {};
            var songs = (data.result && data.result.songs) || [];
            var tracks = (Array.isArray(songs) ? songs : []).map(normalizeSong).filter(Boolean);
            return {
              tracks: tracks,
              total: (data.result && data.result.songCount) || tracks.length,
              hasMore: tracks.length === limit
            };
          });
      },

      getPlayUrl: function (track, _quality, signal) {
        if (!track || !(track.urlId || track.id)) return Promise.reject(new Error('[netease] missing track id'));
        var id = track.urlId || track.id;
        return post('/song-url', { id: String(id), br: bitrate, cookie: '' }, signal)
          .then(function (payload) {
            var outer = (payload && payload.data) || {};
            var item = Array.isArray(outer.data) ? outer.data[0] : null;
            var raw = String((item && item.url) || '');
            if (!raw) throw new Error('[netease] no playable url');
            return {
              url: raw.replace(/^http:\/\//i, 'https://'),
              bitrate: (item && item.br) || bitrate,
              expiresAt: Date.now() + 20 * 60 * 1000
            };
          });
      },

      getLyric: function (track, signal) {
        if (!track) return Promise.resolve({ lines: [] });
        var id = track.lyric_id || track.urlId || track.id;
        if (!id) return Promise.resolve({ lines: [] });
        return post('/lyric', { id: String(id), cookie: '' }, signal).then(function (payload) {
          var data = (payload && payload.data) || payload || {};
          var lrcText = data.lrc && data.lrc.lyric;
          return lrcText ? parseLrc(lrcText) : { lines: [] };
        });
      }
    };
  }

  // ---------- QQ 音乐 Provider（与 app.js 中 searchQqApiTracks / fetchQqTrackUrlPayload 对齐） ----------

  function isQqProxyHealthPayload(payload) {
    return !!(payload && !Array.isArray(payload) && payload.ok === true && payload.service);
  }

  function normalizeQqTrack(raw, sourceCode, sourceLabel) {
    if (!raw) return null;
    var artistText = Array.isArray(raw.artist)
      ? raw.artist.join(' / ')
      : String(raw.artist == null ? '' : raw.artist);
    var idStr = String(raw.id == null ? '' : raw.id);
    var urlId = String(raw.url_id || raw.urlId || raw.id || '');
    if (!idStr && !urlId) return null;
    var cover = raw.pic_id || raw.cover || '';
    var coverUrl = '';
    var picId = '';
    if (typeof cover === 'string') {
      if (/^https?:\/\//i.test(cover) || cover.indexOf('//') === 0) {
        coverUrl = cover.indexOf('//') === 0 ? 'https:' + cover : cover;
      } else if (cover) {
        picId = cover;
      }
    }
    return {
      id: idStr || urlId,
      name: String(raw.name || raw.title || ''),
      artist: artistText || '未知歌手',
      album: String(raw.album == null ? '' : raw.album),
      cover: coverUrl || undefined,
      picId: picId || undefined,
      duration: typeof raw.duration === 'number' ? raw.duration : (raw.interval || 0),
      source: sourceCode,
      sourceLabel: sourceLabel,
      provider: 'qq-api',
      urlId: urlId || idStr,
      lyric_id: String(raw.lyric_id || urlId || idStr)
    };
  }

  function createQqProvider(config) {
    config = config || {};
    var primaryBase = String(config.primaryBase || '').replace(/\/+$/, '');
    var fallbackProxy = String(config.fallbackProxy || '').replace(/\/+$/, '');
    if (!primaryBase && !fallbackProxy) throw new Error('QqProvider: need primaryBase or fallbackProxy');
    var sourceCode = config.useGlobalSourceCode || 'qq';
    var sourceLabel = sourceCode === 'lx_qq' ? '小秋音乐' : 'QQ音乐';
    var defaultBitrate = config.defaultBitrate || '320';
    var timeout = config.timeout || 10000;

    function searchPrimary(keyword, page, count, signal) {
      if (!primaryBase) return Promise.reject(new Error('no primary base'));
      var url = primaryBase + '/search?name=' + encodeURIComponent(keyword) +
        '&count=' + encodeURIComponent(count) + '&pages=' + encodeURIComponent(page);
      return request(url, {
        method: 'GET',
        responseType: 'json',
        signal: signal,
        timeout: timeout,
        validate: function (data) {
          if (isQqProxyHealthPayload(data)) return false;
          return Array.isArray(data);
        }
      });
    }

    function searchFallback(keyword, page, signal) {
      if (!fallbackProxy) return Promise.reject(new Error('no fallback proxy'));
      return request(fallbackProxy, {
        method: 'POST',
        body: { type: 'search', query: keyword, page: page },
        responseType: 'json',
        signal: signal,
        timeout: timeout,
        validate: function (data) {
          return !!(data && Array.isArray(data.items));
        }
      }).then(function (data) {
        return data.items || [];
      });
    }

    function urlPrimary(urlId, quality, signal) {
      if (!primaryBase) return Promise.reject(new Error('no primary base'));
      var url = primaryBase + '/url?id=' + encodeURIComponent(urlId) +
        '&br=' + encodeURIComponent(quality || defaultBitrate);
      return request(url, {
        method: 'GET',
        responseType: 'json',
        signal: signal,
        timeout: timeout,
        validate: function (data) {
          if (isQqProxyHealthPayload(data)) return false;
          return !!(data && data.url);
        }
      });
    }

    function urlFallback(urlId, quality, signal) {
      if (!fallbackProxy) return Promise.reject(new Error('no fallback proxy'));
      var songmid = String(urlId || '').replace(/^qq_/i, '');
      var br = String(quality || defaultBitrate) === '128' ? '128k' : '320k';
      return request(fallbackProxy, {
        method: 'POST',
        body: { type: 'url', songmid: songmid, quality: br },
        responseType: 'json',
        signal: signal,
        timeout: timeout,
        validate: function (data) {
          return !!(data && data.url);
        }
      });
    }

    return {
      source: sourceCode,
      label: sourceLabel,
      enabled: config.enabled !== false,
      priority: typeof config.priority === 'number' ? config.priority : 100,

      setEnabled: function (v) { this.enabled = !!v; },

      search: function (keyword, page, limit, signal) {
        page = page || 1;
        limit = Math.max(1, Math.min(50, limit || 20));
        var primary = searchPrimary(keyword, page, limit, signal);
        var fallback = searchFallback(keyword, page, signal);
        var first = typeof Promise.any === 'function'
          ? Promise.any([primary, fallback])
          : primary.catch(function () { return fallback; });
        return first.then(function (rawList) {
          var tracks = (Array.isArray(rawList) ? rawList : [])
            .map(function (raw) { return normalizeQqTrack(raw, sourceCode, sourceLabel); })
            .filter(Boolean);
          return { tracks: tracks, total: tracks.length, hasMore: tracks.length >= limit };
        });
      },

      getPlayUrl: function (track, quality, signal) {
        if (!track || !(track.urlId || track.id)) return Promise.reject(new Error('[qq] missing track id'));
        var id = track.urlId || track.id;
        var primary = urlPrimary(id, quality, signal);
        var fallback = urlFallback(id, quality, signal);
        var first = typeof Promise.any === 'function'
          ? Promise.any([primary, fallback])
          : primary.catch(function () { return fallback; });
        return first.then(function (payload) {
          var raw = String(payload && payload.url || '');
          if (!raw) throw new Error('[qq] no playable url');
          return {
            url: raw.replace(/^http:\/\//i, 'https://'),
            bitrate: payload && payload.br,
            expiresAt: Date.now() + 20 * 60 * 1000
          };
        });
      },

      getLyric: function (_track, _signal) {
        // QQ lyric 在 app.js 走的是统一 lyrics API；此处保持空实现，调用方需自行处理
        return Promise.resolve({ lines: [] });
      }
    };
  }

  // ---------- 酷我 / Joox / Migu / Bilibili Provider —— 走 gd-music API ----------

  function normalizeGdMusicTrack(raw, sourceCode, sourceLabel) {
    if (!raw) return null;
    var artistText = Array.isArray(raw.artist) ? raw.artist.join(' / ') : String(raw.artist == null ? '' : raw.artist);
    var idStr = String(raw.id == null ? '' : raw.id);
    var urlId = String(raw.url_id || raw.urlId || raw.id || '');
    if (!idStr && !urlId) return null;
    var rawPicId = String(raw.pic_id == null ? '' : raw.pic_id);
    var cover = '';
    var picId = '';
    if (rawPicId) {
      if (/^https?:\/\//i.test(rawPicId)) cover = rawPicId;
      else if (rawPicId.indexOf('//') === 0) cover = 'https:' + rawPicId;
      else picId = rawPicId;
    }
    return {
      id: idStr || urlId,
      name: String(raw.name || raw.title || ''),
      artist: artistText || '未知歌手',
      album: String(raw.album == null ? '' : raw.album),
      cover: cover || undefined,
      picId: picId || undefined,
      duration: typeof raw.duration === 'number' ? raw.duration : (raw.interval || 0),
      source: sourceCode,
      sourceLabel: sourceLabel,
      provider: 'gd-music',
      urlId: urlId || idStr,
      lyric_id: String(raw.lyric_id || urlId || idStr)
    };
  }

  function createGdMusicProvider(config) {
    config = config || {};
    var sourceCode = config.useGlobalSourceCode || config.gdSource;
    if (!sourceCode) throw new Error('GdMusicProvider: missing source');
    var gdSource = config.gdSource || sourceCode;
    var bases = (config.bases || []).map(function (b) { return String(b).replace(/\/+$/, ''); }).filter(Boolean);
    if (!bases.length) throw new Error('GdMusicProvider: empty bases');
    var sourceLabel = config.label || sourceCode;
    var timeout = config.timeout || 10000;
    var defaultBitrate = config.defaultBitrate || '320';
    var keepHttp = !!config.keepHttpUrl; // kuwo 在 app.js 里不强行 https

    function fetchGd(query, signal) {
      var urls = bases.map(function (b) { return b + query; });
      return request(urls, {
        method: 'GET',
        responseType: 'json',
        signal: signal,
        timeout: timeout
      });
    }

    return {
      source: sourceCode,
      label: sourceLabel,
      enabled: config.enabled !== false,
      priority: typeof config.priority === 'number' ? config.priority : 100,

      setEnabled: function (v) { this.enabled = !!v; },

      search: function (keyword, page, limit, signal) {
        page = page || 1;
        limit = Math.max(1, Math.min(50, limit || 20));
        var query = '?types=search&source=' + encodeURIComponent(gdSource) +
          '&name=' + encodeURIComponent(String(keyword || '')) +
          '&count=' + encodeURIComponent(limit) + '&pages=' + encodeURIComponent(page);
        return fetchGd(query, signal).then(function (data) {
          var list = Array.isArray(data) ? data : (data && Array.isArray(data.data) ? data.data : []);
          var tracks = list
            .map(function (raw) { return normalizeGdMusicTrack(raw, sourceCode, sourceLabel); })
            .filter(Boolean);
          return { tracks: tracks, total: tracks.length, hasMore: tracks.length >= limit };
        });
      },

      getPlayUrl: function (track, quality, signal) {
        if (!track || !(track.urlId || track.id)) return Promise.reject(new Error('[' + sourceCode + '] missing track id'));
        var id = track.urlId || track.id;
        var query = '?types=url&source=' + encodeURIComponent(gdSource) +
          '&id=' + encodeURIComponent(id) +
          '&br=' + encodeURIComponent(quality || defaultBitrate);
        return fetchGd(query, signal).then(function (data) {
          var raw = String(data && data.url || '');
          if (!raw) throw new Error('[' + sourceCode + '] no playable url');
          var resolved = keepHttp ? raw : raw.replace(/^http:\/\//i, 'https://');
          return { url: resolved, bitrate: data && data.br, expiresAt: Date.now() + 20 * 60 * 1000 };
        });
      },

      getLyric: function (track, signal) {
        if (!track || !(track.lyric_id || track.urlId || track.id)) return Promise.resolve({ lines: [] });
        var id = track.lyric_id || track.urlId || track.id;
        var query = '?types=lyric&source=' + encodeURIComponent(gdSource) +
          '&id=' + encodeURIComponent(id);
        return fetchGd(query, signal).then(function (data) {
          var lrcText = data && (data.lyric || data.lrc) || '';
          return lrcText ? parseLrc(lrcText) : { lines: [] };
        }).catch(function () { return { lines: [] }; });
      }
    };
  }


  // ---------- ProviderManager（与 ProviderManagerImpl 对齐，去掉 TS 装饰） ----------

  function createProviderManager() {
    var providers = {}; // source -> Provider[]

    function priorityOf(p) {
      return typeof p.priority === 'number' ? p.priority : 100;
    }

    function listFor(source) {
      return providers[source] ? providers[source].slice() : [];
    }

    function deduplicate(tracks) {
      var seen = {};
      var out = [];
      for (var i = 0; i < tracks.length; i++) {
        var t = tracks[i];
        var key = normalizeString(String(t.name || '') + '-' + String(t.artist || '') + '-' + String(t.source || ''));
        if (seen[key]) continue;
        seen[key] = true;
        out.push(t);
      }
      return out;
    }

    return {
      register: function (provider) {
        if (!provider || !provider.source) return;
        var list = providers[provider.source] || [];
        if (list.indexOf(provider) >= 0) return;
        list.push(provider);
        list.sort(function (a, b) { return priorityOf(a) - priorityOf(b); });
        providers[provider.source] = list;
      },

      unregister: function (provider) {
        if (!provider || !provider.source) return;
        var list = providers[provider.source];
        if (!list) return;
        var next = list.filter(function (p) { return p !== provider; });
        if (next.length) providers[provider.source] = next;
        else delete providers[provider.source];
      },

      setEnabled: function (source, enabled) {
        var list = providers[source];
        if (!list) return;
        list.forEach(function (p) {
          if (typeof p.setEnabled === 'function') p.setEnabled(enabled);
          else p.enabled = !!enabled;
        });
      },

      getProvider: function (source) {
        var list = listFor(source);
        for (var i = 0; i < list.length; i++) {
          if (list[i].enabled) return list[i];
        }
        return undefined;
      },

      getProviders: function (source) {
        return listFor(source).filter(function (p) { return p.enabled; });
      },

      getEnabledProviders: function () {
        var out = [];
        Object.keys(providers).forEach(function (key) {
          providers[key].forEach(function (p) { if (p.enabled) out.push(p); });
        });
        return out;
      },

      searchAll: function (keyword, limit, signal) {
        limit = limit || 20;
        var enabled = this.getEnabledProviders();
        var calls = enabled.map(function (provider) {
          return provider.search(keyword, 1, limit, signal).catch(function (err) {
            if (typeof console !== 'undefined' && console.warn) {
              console.warn('[providers-bridge:' + provider.source + '] search failed:', err);
            }
            return { tracks: [], total: 0 };
          });
        });
        return Promise.all(calls).then(function (results) {
          var all = [];
          results.forEach(function (r) { if (r && r.tracks) all.push.apply(all, r.tracks); });
          var unique = deduplicate(all);
          return {
            tracks: unique.slice(0, limit),
            total: unique.length,
            hasMore: unique.length > limit
          };
        });
      },

      autoMatch: function (track, signal) {
        var self = this;
        var candidates = this.getEnabledProviders().filter(function (p) { return p.source !== track.source; });
        var keyword = String(track.name || '') + ' ' + String(track.artist || '');
        var matches = [];
        var jobs = candidates.map(function (provider) {
          return provider.search(keyword.trim(), 1, 10, signal).then(function (res) {
            (res.tracks || []).forEach(function (matched) {
              var score = calculateTrackSimilarity(track, matched);
              if (score > 0.8) {
                matches.push({ original: track, matched: matched, score: score, source: provider.source });
              }
            });
          }).catch(function (err) {
            if (typeof console !== 'undefined' && console.warn) {
              console.warn('[providers-bridge:' + provider.source + '] auto-match failed:', err);
            }
          });
        });
        return Promise.all(jobs).then(function () {
          matches.sort(function (a, b) { return b.score - a.score; });
          // self 仅用于避免 lint 警告
          return self ? matches : matches;
        });
      },

      getPlayUrlWithFallback: function (track, strategy, quality, signal) {
        strategy = strategy || 'auto-switch';
        var self = this;
        var provider = this.getProvider(track.source);
        if (!provider) return Promise.reject(new Error('[providers-bridge] provider not found for ' + track.source));
        return provider.getPlayUrl(track, quality, signal).catch(function (error) {
          if (typeof console !== 'undefined' && console.warn) {
            console.warn('[providers-bridge:' + track.source + '] play url failed:', error);
          }
          if (strategy !== 'auto-switch') throw error;
          return self.autoMatch(track, signal).then(function (matches) {
            return matches.reduce(function (chain, match) {
              return chain.catch(function () {
                var fallback = self.getProvider(match.source);
                if (!fallback) throw new Error('no fallback');
                return fallback.getPlayUrl(match.matched, quality, signal);
              });
            }, Promise.reject(new Error('start')));
          }).catch(function () { throw error; });
        });
      }
    };
  }

  // ---------- 安装到 window.LjyytProviders ----------

  function defaultNeteaseBases() {
    var base = window.LJYYT_API_BASE || 'https://ljyyt-api.yjlsx0.workers.dev';
    var fallback = window.LJYYT_OTTER_FALLBACK_BASE || 'https://otter-music.pages.dev/music-api';
    return [String(base).replace(/\/+$/, '') + '/api/netease', String(fallback).replace(/\/+$/, '') + '/netease'];
  }

  function defaultGdMusicBases() {
    var base = window.LJYYT_API_BASE || 'https://ljyyt-api.yjlsx0.workers.dev';
    var fallback = window.LJYYT_OTTER_FALLBACK_BASE || 'https://otter-music.pages.dev/music-api';
    return [
      String(fallback).replace(/\/+$/, ''),
      String(base).replace(/\/+$/, '') + '/api/gd-music',
      'https://music-api.gdstudio.xyz/api.php'
    ];
  }

  function defaultQqBases() {
    var base = window.LJYYT_API_BASE || 'https://ljyyt-api.yjlsx0.workers.dev';
    var fallback = window.LJYYT_OTTER_FALLBACK_BASE || 'https://otter-music.pages.dev/music-api';
    return {
      primaryBase: String(base).replace(/\/+$/, '') + '/api/qq',
      fallbackProxy: String(fallback).replace(/\/+$/, '') + '/qqmusic/proxy'
    };
  }

  var manager = createProviderManager();

  var bridge = {
    version: 1,
    manager: manager,
    register: function (p) { manager.register(p); },
    unregister: function (p) { manager.unregister(p); },
    getProvider: function (s) { return manager.getProvider(s); },
    getProviders: function (s) { return manager.getProviders(s); },
    getEnabledProviders: function () { return manager.getEnabledProviders(); },
    searchAll: function (kw, limit, signal) { return manager.searchAll(kw, limit, signal); },
    autoMatch: function (t, signal) { return manager.autoMatch(t, signal); },
    getPlayUrlWithFallback: function (t, strategy, quality, signal) {
      return manager.getPlayUrlWithFallback(t, strategy, quality, signal);
    },
    createNeteaseProvider: createNeteaseProvider,
    createQqProvider: createQqProvider,
    createGdMusicProvider: createGdMusicProvider,
    _internal: {
      normalizeString: normalizeString,
      stringSimilarity: stringSimilarity,
      calculateTrackSimilarity: calculateTrackSimilarity,
      parseLrc: parseLrc,
      isNeteaseHealthPayload: isNeteaseHealthPayload,
      isQqProxyHealthPayload: isQqProxyHealthPayload,
      defaultNeteaseBases: defaultNeteaseBases,
      defaultGdMusicBases: defaultGdMusicBases,
      defaultQqBases: defaultQqBases,
      request: request
    }
  };

  // 自动注册 —— 仅当开关明确开启时
  if (window.LJYYT_ENABLE_PROVIDERS_BRIDGE === true) {
    function safeRegister(label, factory) {
      try { manager.register(factory()); }
      catch (e) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('[providers-bridge] failed to auto-register ' + label + ' provider:', e);
        }
      }
    }
    safeRegister('netease', function () {
      return createNeteaseProvider({
        bases: defaultNeteaseBases(),
        useGlobalSourceCode: '_netease'
      });
    });
    safeRegister('qq', function () {
      var qq = defaultQqBases();
      return createQqProvider({
        primaryBase: qq.primaryBase,
        fallbackProxy: qq.fallbackProxy,
        useGlobalSourceCode: 'qq'
      });
    });
    safeRegister('kuwo', function () {
      return createGdMusicProvider({
        bases: defaultGdMusicBases(),
        useGlobalSourceCode: 'kuwo',
        gdSource: 'kuwo',
        label: '酷我音乐',
        keepHttpUrl: true
      });
    });
  }

  window.LjyytProviders = bridge;
})();
