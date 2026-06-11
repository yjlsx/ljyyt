export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    try {
      if (url.pathname === '/api/lyrics') {
        return await withCache(request, ctx, () => handleLyricsRequest(url));
      }

      if (url.pathname === '/api/lyrics/search') {
        return await handleLyricsSearchRequest(url);
      }

      if (url.pathname === '/api/netease/suggest') {
        return await handleNeteaseSuggestRequest(url);
      }

      if (url.pathname.startsWith('/api/netease/')) {
        return await handleNeteaseProxyRequest(request, url);
      }

      if (url.pathname === '/api/gd-music') {
        return await handleGdMusicRequest(url);
      }

      if (url.pathname === '/api/qq/search') {
        return await handleQqSearchRequest(url);
      }

      if (url.pathname === '/api/qq/url') {
        return await handleQqUrlRequest(url);
      }

      if (url.pathname === '/api/cover') {
        return await withCache(request, ctx, () => handleCoverRequest(url));
      }

      if (url.pathname === '/api/kuwo-url') {
        return await handleKuwoUrlRequest(url);
      }

      if (url.pathname === '/api/kuwo-audio') {
        return await handleKuwoAudioRequest(request, url);
      }

      if (url.pathname === '/api/audio-proxy') {
        return await handleAudioProxyRequest(request, url);
      }

      return jsonResponse({ ok: true, service: 'ljyyt-worker' });
    } catch (error) {
      return jsonResponse(
        {
          found: false,
          error: error instanceof Error ? error.message : 'Unknown worker error'
        },
        500
      );
    }
  }
};

const MAX_UPSTREAM_JSON_BYTES = 2 * 1024 * 1024;
const MAX_UPSTREAM_TEXT_BYTES = 256 * 1024;
const WORKER_UPSTREAM_TIMEOUT_MS = 12000;
const OTTER_NETEASE_API_BASE = 'https://otter-music.pages.dev/music-api/netease';
const QQ_SEARCH_URL = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
const QQ_MEDIA_URL = 'https://lxmusicapi.onrender.com/url/tx';
const QQ_REFERER = 'https://y.qq.com/';
const QQ_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36';
const NETEASE_PROXY_PATHS = new Set([
  '/login/qr/key',
  '/login/qr/create',
  '/login/qr/check',
  '/my-info',
  '/recommend',
  '/album/sublist',
  '/user-playlists',
  '/playlist',
  '/playlists',
  '/toplist',
  '/search',
  '/song-url',
  '/song-detail'
]);

async function withCache(request, ctx, handler) {
  if (request.method !== 'GET') {
    return handler();
  }

  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  const response = await handler();
  if (await isCacheableApiResponse(response)) {
    const cacheable = new Response(response.body, response);
    cacheable.headers.set('Cache-Control', 'public, max-age=1800');
    ctx.waitUntil(cache.put(request, cacheable.clone()));
    return cacheable;
  }
  if (response.ok) {
    const uncacheable = new Response(response.body, response);
    uncacheable.headers.set('Cache-Control', 'no-store');
    return uncacheable;
  }
  return response;
}

async function isCacheableApiResponse(response) {
  if (!response.ok) return false;
  const contentType = response.headers.get('Content-Type') || '';
  if (!contentType.includes('application/json')) return true;
  try {
    const payload = await response.clone().json();
    return !(payload && payload.found === false);
  } catch (error) {
    return false;
  }
}

async function handleLyricsRequest(url) {
  const lookup = buildLookup(
    url.searchParams.get('title') || '',
    url.searchParams.get('artist') || ''
  );
  const requestedSource = String(url.searchParams.get('source') || '').trim().toLowerCase();
  const requestedProviderId = String(url.searchParams.get('providerId') || '').trim();

  if (!lookup.title) {
    return jsonResponse({ found: false, message: 'Missing title' }, 400);
  }

  if (requestedSource === 'rangotec' && requestedProviderId) {
    const forcedRangotec = await fetchRangotecLyrics(lookup, requestedProviderId);
    if (forcedRangotec.lines.length) {
      return jsonResponse({
        found: true,
        source: 'rangotec',
        title: forcedRangotec.title || lookup.title,
        artist: forcedRangotec.artist || lookup.artist,
        album: forcedRangotec.album || '',
        providerId: forcedRangotec.providerId || requestedProviderId,
        lines: forcedRangotec.lines,
        syncedLyrics: forcedRangotec.syncedLyrics
      });
    }
  }

  if (requestedSource === 'netease' && requestedProviderId) {
    const forcedNetease = await fetchNeteaseLyrics(lookup, requestedProviderId);
    if (forcedNetease.lines.length) {
      return jsonResponse({
        found: true,
        source: 'netease',
        title: forcedNetease.title || lookup.title,
        artist: forcedNetease.artist || lookup.artist,
        album: forcedNetease.album || '',
        providerId: forcedNetease.providerId || requestedProviderId,
        lines: forcedNetease.lines,
        syncedLyrics: forcedNetease.syncedLyrics
      });
    }
  }

  const exactPayload = await fetchLrclibExact(lookup);
  const exactResult = parseLrclibPayload(exactPayload);
  if (exactResult.lines.length) {
    return jsonResponse({
      found: true,
      source: 'lrclib',
      title: exactResult.title || lookup.title,
      artist: exactResult.artist || lookup.artist,
      album: exactResult.album || '',
      providerId: exactResult.providerId || '',
      lines: exactResult.lines,
      syncedLyrics: exactResult.syncedLyrics
    });
  }

  const lrclibSearchResult = await fetchLrclibSearchLyrics(lookup);
  if (lrclibSearchResult.lines.length) {
    return jsonResponse({
      found: true,
      source: 'lrclib',
      title: lrclibSearchResult.title || lookup.title,
      artist: lrclibSearchResult.artist || lookup.artist,
      album: lrclibSearchResult.album || '',
      providerId: lrclibSearchResult.providerId || '',
      lines: lrclibSearchResult.lines,
      syncedLyrics: lrclibSearchResult.syncedLyrics
    });
  }

  const rangotec = await fetchRangotecLyrics(lookup);
  if (rangotec.lines.length) {
    return jsonResponse({
      found: true,
      source: 'rangotec',
      title: rangotec.title || lookup.title,
      artist: rangotec.artist || lookup.artist,
      album: rangotec.album || '',
      providerId: rangotec.providerId || '',
      lines: rangotec.lines,
      syncedLyrics: rangotec.syncedLyrics
    });
  }

  const netease = await fetchNeteaseLyrics(lookup);
  if (netease.lines.length) {
    return jsonResponse({
      found: true,
      source: 'netease',
      title: netease.title || lookup.title,
      artist: netease.artist || lookup.artist,
      album: netease.album || '',
      providerId: netease.providerId || '',
      lines: netease.lines,
      syncedLyrics: netease.syncedLyrics
    });
  }

  const lyricsOvh = await fetchLyricsOvh(lookup);
  if (lyricsOvh.lines.length) {
    return jsonResponse({
      found: true,
      source: 'lyricsovh',
      title: lookup.title,
      artist: lookup.artist,
      album: '',
      providerId: '',
      lines: lyricsOvh.lines,
      syncedLyrics: []
    });
  }

  return jsonResponse({
    found: false,
    source: 'none',
    title: lookup.title,
    artist: lookup.artist,
    lines: [],
    syncedLyrics: [],
    message: 'No lyrics found'
  });
}

async function handleLyricsSearchRequest(url) {
  const lookup = buildLookup(
    url.searchParams.get('title') || '',
    url.searchParams.get('artist') || ''
  );

  if (!lookup.title && !lookup.artist) {
    return jsonResponse({
      code: 200,
      msg: '成功',
      candidates: []
    });
  }

  const [lrclibCandidates, rangotecCandidates, neteaseCandidates] = await Promise.all([
    fetchLrclibCandidates(lookup),
    fetchRangotecCandidates(lookup),
    fetchNeteaseCandidates(lookup)
  ]);

  return jsonResponse({
    code: 200,
    msg: '成功',
    candidates: dedupeCandidates([...lrclibCandidates, ...rangotecCandidates, ...neteaseCandidates]).slice(0, 20)
  });
}

async function handleNeteaseSuggestRequest(url) {
  const keyword = String(url.searchParams.get('keyword') || url.searchParams.get('q') || '').trim();
  if (!keyword) {
    return jsonResponse({ suggestions: [] });
  }

  const suggestUrl = new URL('https://music.163.com/api/search/suggest/web');
  suggestUrl.searchParams.set('s', keyword);
  const payload = await fetchJson(suggestUrl.toString());
  const result = payload && payload.result ? payload.result : {};
  const seen = new Set();
  const suggestions = [];

  function pushUnique(text, type, id, meta) {
    text = String(text || '').trim();
    if (!text) return;
    const key = `${type}:${text}`;
    if (seen.has(key)) return;
    seen.add(key);
    suggestions.push({
      text,
      type,
      id: id === undefined || id === null ? '' : String(id),
      source: 'netease',
      meta: String(meta || '')
    });
  }

  (Array.isArray(result.artists) ? result.artists : []).slice(0, 3).forEach((artist) => {
    pushUnique(artist.name, 'artist', artist.id, '歌手');
  });
  (Array.isArray(result.songs) ? result.songs : []).slice(0, 3).forEach((song) => {
    const artists = Array.isArray(song.artists) ? song.artists.map((item) => item.name).filter(Boolean).join('/') : '';
    pushUnique([song.name, artists].filter(Boolean).join(' - '), 'song', song.id, artists || '单曲');
  });
  (Array.isArray(result.albums) ? result.albums : []).slice(0, 3).forEach((album) => {
    const artist = album.artist && album.artist.name ? album.artist.name : '';
    pushUnique([album.name, artist].filter(Boolean).join(' - '), 'album', album.id, artist || '专辑');
  });
  (Array.isArray(result.playlists) ? result.playlists : []).slice(0, 3).forEach((playlist) => {
    pushUnique(playlist.name, 'playlist', playlist.id, '歌单');
  });

  return jsonResponse({ suggestions });
}

function isAllowedNeteaseProxyPath(pathname) {
  const subPath = String(pathname || '').slice('/api/netease'.length);
  return NETEASE_PROXY_PATHS.has(subPath);
}

async function handleNeteaseProxyRequest(request, url) {
  if (!isAllowedNeteaseProxyPath(url.pathname)) {
    return jsonResponse({ error: 'Unsupported NetEase endpoint' }, 404);
  }
  if (request.method !== 'GET' && request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const subPath = url.pathname.slice('/api/netease'.length);
  const target = new URL(OTTER_NETEASE_API_BASE + subPath);
  url.searchParams.forEach((value, key) => {
    target.searchParams.append(key, value);
  });

  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'ljyyt-worker/1.0'
  };
  const init = {
    method: request.method,
    headers,
    redirect: 'follow'
  };
  if (request.method === 'POST') {
    headers['Content-Type'] = request.headers.get('Content-Type') || 'application/json';
    init.body = await request.text();
  }

  const response = await fetchWithTimeout(target.toString(), init);
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Cache-Control', 'no-store');
  if (!responseHeaders.get('Content-Type')) {
    responseHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
}

async function handleGdMusicRequest(url) {
  const target = new URL('https://music-api.gdstudio.xyz/api.php');
  for (const [key, value] of url.searchParams.entries()) {
    if (['types', 'source', 'name', 'count', 'pages', 'id', 'br', 'size'].includes(key)) {
      target.searchParams.set(key, value);
    }
  }
  const payload = await fetchJson(target.toString());
  return jsonResponse(payload);
}

function normalizeQqSearchSong(song) {
  const songmid = String(song && (song.mid || song.songmid) || '');
  const albummid = String(song && ((song.album && song.album.mid) || song.albummid) || '');
  const artist = Array.isArray(song && song.singer) ? song.singer.map((item) => item && item.name).filter(Boolean) : [];
  return {
    id: songmid ? `qq_${songmid}` : String(song && (song.id || song.songid) || ''),
    name: song && (song.title || song.songname || song.name) || '',
    title: song && (song.title || song.songname || song.name) || '',
    artist,
    album: song && ((song.album && (song.album.title || song.album.name)) || song.albumname) || '',
    pic_id: albummid ? `https://y.gtimg.cn/music/photo_new/T002R800x800M000${albummid}.jpg` : '',
    url_id: songmid,
    lyric_id: songmid,
    source: 'qq'
  };
}

async function handleQqSearchRequest(url) {
  const query = String(url.searchParams.get('name') || url.searchParams.get('q') || '').trim();
  if (!query) return jsonResponse([]);
  const page = Math.max(1, Number(url.searchParams.get('pages') || url.searchParams.get('page')) || 1);
  const count = Math.max(1, Math.min(50, Number(url.searchParams.get('count')) || 20));
  const response = await fetchWithTimeout(QQ_SEARCH_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Origin': QQ_REFERER.replace(/\/$/, ''),
      'Referer': QQ_REFERER,
      'User-Agent': QQ_USER_AGENT,
      'Cookie': 'uin='
    },
    body: JSON.stringify({
      req_1: {
        method: 'DoSearchForQQMusicDesktop',
        module: 'music.search.SearchCgiService',
        param: {
          num_per_page: count,
          page_num: page,
          query,
          search_type: 0
        }
      }
    })
  });
  if (!response.ok) throw new Error(`QQ search HTTP ${response.status}`);
  const text = await readLimitedText(response, MAX_UPSTREAM_JSON_BYTES);
  const payload = JSON.parse(text);
  const list = payload && payload.req_1 && payload.req_1.data && payload.req_1.data.body && payload.req_1.data.body.song
    ? payload.req_1.data.body.song.list
    : [];
  return jsonResponse((Array.isArray(list) ? list : []).map(normalizeQqSearchSong).filter((item) => item.name && item.url_id));
}

function mapQqQuality(br) {
  const value = Number(br) || 320;
  if (value <= 128) return '128k';
  return '320k';
}

async function handleQqUrlRequest(url) {
  const songmid = String(url.searchParams.get('id') || url.searchParams.get('songmid') || '').trim().replace(/^qq_/i, '');
  if (!songmid) return jsonResponse({ url: '', error: 'Missing songmid' }, 400);
  const quality = mapQqQuality(url.searchParams.get('br'));
  const response = await fetchWithTimeout(`${QQ_MEDIA_URL}/${encodeURIComponent(songmid)}/${encodeURIComponent(quality)}`, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': QQ_USER_AGENT,
      'X-Request-Key': 'share-v3'
    }
  });
  if (!response.ok) return jsonResponse({ url: '', quality, error: `QQ url HTTP ${response.status}` }, 502);
  const text = await readLimitedText(response, MAX_UPSTREAM_JSON_BYTES);
  const payload = JSON.parse(text);
  const resolvedUrl = payload && payload.url ? String(payload.url) : '';
  if (resolvedUrl) return jsonResponse({ url: resolvedUrl, quality });
  const upstreamMsg = payload && payload.msg ? String(payload.msg) : 'QQ upstream returned no url';
  return jsonResponse({ url: '', quality, error: upstreamMsg });
}

async function handleCoverRequest(url) {
  const lookup = buildLookup(
    url.searchParams.get('title') || '',
    url.searchParams.get('artist') || ''
  );

  if (!lookup.title || !lookup.artist) {
    return jsonResponse({ found: false, message: 'Missing title or artist' }, 400);
  }

  const coverUrl = new URL('https://api.lrc.cx/cover');
  coverUrl.searchParams.set('title', lookup.title);
  coverUrl.searchParams.set('artist', lookup.artist);

  const response = await fetchWithTimeout(coverUrl.toString(), {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'User-Agent': 'ljyyt-worker/1.0'
    }
  });

  if (!response.ok) {
    return jsonResponse({
      found: false,
      source: 'lrcapi-cover',
      title: lookup.title,
      artist: lookup.artist
    }, response.status === 570 ? 404 : response.status);
  }

  return jsonResponse({
    found: true,
    source: 'lrcapi-cover',
    title: lookup.title,
    artist: lookup.artist,
    imageUrl: response.url
  });
}

function buildLookup(rawTitle, rawArtist) {
  let title = sanitizeText(rawTitle);
  let artist = sanitizeText(rawArtist);
  const separators = [' - ', ' — ', ' – ', ' | ', '｜', '_'];

  if (artist && title && title.toLowerCase().startsWith(artist.toLowerCase())) {
    title = title.slice(artist.length).replace(/^(\s*[-—–|｜_:：]+\s*)+/, '').trim() || title;
  }

  if (!artist && title) {
    for (const separator of separators) {
      const index = title.indexOf(separator);
      if (index > 0 && index < title.length - separator.length) {
        const left = title.slice(0, index).trim();
        const right = title.slice(index + separator.length).trim();
        if (left && right) {
          artist = left;
          title = right;
          break;
        }
      }
    }
  }

  return { title, artist };
}

function sanitizeText(value) {
  return String(value || '')
    .replace(/\.(mp3|flac|wav|m4a)$/i, '')
    .replace(/&amp;/gi, '&')
    .replace(/_/g, ' ')
    .replace(/[《》"'`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeMatchText(value) {
  return sanitizeText(value).toLowerCase();
}

function scoreCandidateMatch(lookup, candidateTitle, candidateArtist) {
  const queryTitle = normalizeMatchText(lookup && lookup.title);
  const queryArtist = normalizeMatchText(lookup && lookup.artist);
  const title = normalizeMatchText(candidateTitle);
  const artist = normalizeMatchText(candidateArtist);

  let score = 0;

  if (queryTitle && title === queryTitle) score += 80;
  else if (queryTitle && title.includes(queryTitle)) score += 45;
  else if (queryTitle && queryTitle.includes(title)) score += 30;

  if (queryArtist && artist === queryArtist) score += 60;
  else if (queryArtist && artist.includes(queryArtist)) score += 35;
  else if (queryArtist && queryArtist.includes(artist)) score += 20;

  if (!queryArtist && artist) score += 5;
  if (!queryTitle && title) score += 5;

  return score;
}

async function readLimitedText(response, maxBytes) {
  const reader = response.body && response.body.getReader ? response.body.getReader() : null;
  if (!reader) {
    const text = await response.text();
    if (new TextEncoder().encode(text).byteLength > maxBytes) {
      throw new Error('upstream response too large');
    }
    return text;
  }

  const chunks = [];
  let receivedBytes = 0;
  while (true) {
    const result = await reader.read();
    if (result.done) break;
    const value = result.value || new Uint8Array();
    receivedBytes += value.byteLength;
    if (receivedBytes > maxBytes) {
      try { await reader.cancel(); } catch (error) {}
      throw new Error('upstream response too large');
    }
    chunks.push(value);
  }

  const buffer = new Uint8Array(receivedBytes);
  let offset = 0;
  chunks.forEach((chunk) => {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  });
  return new TextDecoder().decode(buffer);
}

async function fetchWithTimeout(url, options = {}) {
  const timeoutMs = Number(options.timeoutMs) || WORKER_UPSTREAM_TIMEOUT_MS;
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort(new Error('upstream request timeout'));
  }, timeoutMs);

  if (options.signal) {
    if (options.signal.aborted) {
      clearTimeout(timer);
      throw options.signal.reason || new Error('upstream request aborted');
    }
    options.signal.addEventListener('abort', () => {
      controller.abort(options.signal.reason || new Error('upstream request aborted'));
    }, { once: true });
  }

  const fetchOptions = Object.assign({}, options, {
    signal: controller.signal
  });
  delete fetchOptions.timeoutMs;

  try {
    return await fetch(url, fetchOptions);
  } catch (error) {
    if (timedOut) {
      throw new Error('upstream request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJson(url) {
  const response = await fetchWithTimeout(url, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'ljyyt-worker/1.0'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const text = await readLimitedText(response, MAX_UPSTREAM_JSON_BYTES);
  return JSON.parse(text);
}

async function fetchLrclibExact(lookup) {
  if (!lookup.artist) return null;
  const url = new URL('https://lrclib.net/api/get');
  url.searchParams.set('track_name', lookup.title);
  url.searchParams.set('artist_name', lookup.artist);
  try {
    return await fetchJson(url.toString());
  } catch (error) {
    return null;
  }
}

async function fetchLrclibCandidates(lookup) {
  const url = new URL('https://lrclib.net/api/search');
  if (lookup.title) url.searchParams.set('track_name', lookup.title);
  if (lookup.artist) url.searchParams.set('artist_name', lookup.artist);
  if (!lookup.artist && lookup.title) url.searchParams.set('q', lookup.title);
  if (!lookup.title && lookup.artist) url.searchParams.set('q', lookup.artist);

  try {
    const payload = await fetchJson(url.toString());
    const items = Array.isArray(payload) ? payload : [];
    return items.map((item) => normalizeCandidateFromLrclib(item)).filter(Boolean);
  } catch (error) {
    return [];
  }
}

async function fetchLrclibSearchLyrics(lookup) {
  const candidates = await fetchLrclibCandidates(lookup);
  if (!candidates.length || !candidates[0].providerId) {
    return emptyLyricsResult();
  }

  try {
    const payload = await fetchJson(`https://lrclib.net/api/get/${encodeURIComponent(String(candidates[0].providerId))}`);
    return parseLrclibPayload(payload);
  } catch (error) {
    return emptyLyricsResult();
  }
}

function parseLrclibPayload(payload) {
  if (!payload) return emptyLyricsResult();

  const syncedLyrics = parseSyncedLyrics(payload.syncedLyrics || '');
  const lines = syncedLyrics.length
    ? syncedLyrics.map((entry) => entry.text).filter(Boolean)
    : splitLyrics(payload.plainLyrics || '');

  return {
    lines,
    syncedLyrics,
    title: payload.trackName || payload.name || '',
    artist: payload.artistName || '',
    album: payload.albumName || '',
    providerId: payload.id || ''
  };
}

async function fetchLyricsOvh(lookup) {
  if (!lookup.artist || !lookup.title) return emptyLyricsResult();

  try {
    const payload = await fetchJson(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(lookup.artist)}/${encodeURIComponent(lookup.title)}`
    );
    return {
      lines: splitLyrics(payload && payload.lyrics ? payload.lyrics : ''),
      syncedLyrics: []
    };
  } catch (error) {
    return emptyLyricsResult();
  }
}

async function fetchRangotecCandidates(lookup) {
  if (!lookup.title && !lookup.artist) return [];

  const queries = [];
  if (lookup.title) queries.push({ title: lookup.title, artist: lookup.artist });
  if (lookup.title) queries.push({ title: lookup.title, artist: '' });
  if (!lookup.title && lookup.artist) queries.push({ title: lookup.artist, artist: '' });

  const deduped = new Map();

  for (const itemQuery of queries) {
    const url = new URL('https://tools.rangotec.com/api/anon/lrc');
    if (itemQuery.title) url.searchParams.set('title', itemQuery.title);
    if (itemQuery.artist) url.searchParams.set('artist', itemQuery.artist);
    url.searchParams.set('od', 'desc');

    try {
      const payload = await fetchJson(url.toString());
      const rows = Array.isArray(payload && payload.data) ? payload.data : [];
      rows.forEach((item) => {
        const candidate = normalizeCandidateFromRangotec(item);
        if (!candidate || !candidate.providerId || deduped.has(candidate.providerId)) return;
        deduped.set(candidate.providerId, candidate);
      });
    } catch (error) {
      continue;
    }
  }

  return Array.from(deduped.values())
    .sort((a, b) => scoreCandidateMatch(lookup, b.title, b.artist) - scoreCandidateMatch(lookup, a.title, a.artist));
}

async function fetchRangotecLyrics(lookup, forcedProviderId = '') {
  const candidates = await fetchRangotecCandidates(lookup);
  if (!candidates.length) {
    return emptyLyricsResult();
  }

  const best = forcedProviderId
    ? candidates.find((candidate) => String(candidate.providerId) === String(forcedProviderId))
    : candidates[0];
  if (!best.previewSourceLyrics) {
    return emptyLyricsResult();
  }

  return {
    lines: splitLyrics(best.previewSourceLyrics),
    syncedLyrics: parseSyncedLyrics(best.previewSourceLyrics),
    title: best.title,
    artist: best.artist,
    album: best.album,
    providerId: best.providerId
  };
}

async function fetchNeteaseCandidates(lookup) {
  const keyword = [lookup.title, lookup.artist].filter(Boolean).join(' ');
  if (!keyword) return [];

  const url = new URL('https://music.163.com/api/search/get/');
  url.searchParams.set('s', keyword);
  url.searchParams.set('type', '1');
  url.searchParams.set('limit', '8');

  try {
    const payload = await fetchJson(url.toString());
    const songs = Array.isArray(payload && payload.result && payload.result.songs)
      ? payload.result.songs
      : [];
    return songs.map((item) => normalizeCandidateFromNetease(item)).filter(Boolean);
  } catch (error) {
    return [];
  }
}

async function fetchNeteaseLyrics(lookup, forcedProviderId = '') {
  const candidates = await fetchNeteaseCandidates(lookup);
  const first = forcedProviderId
    ? candidates.find((candidate) => String(candidate.providerId) === String(forcedProviderId))
    : candidates[0];
  if (!first || !first.providerId) {
    return emptyLyricsResult();
  }

  const lyricUrl = new URL('https://music.163.com/api/song/lyric');
  lyricUrl.searchParams.set('os', 'pc');
  lyricUrl.searchParams.set('id', String(first.providerId));
  lyricUrl.searchParams.set('lv', '-1');
  lyricUrl.searchParams.set('tv', '-1');

  try {
    const payload = await fetchJson(lyricUrl.toString());
    const syncedLyrics = parseSyncedLyrics(payload && payload.lrc ? payload.lrc.lyric : '');
    const translated = parseSyncedLyrics(payload && payload.tlyric ? payload.tlyric.lyric : '');
    const lines = syncedLyrics.length
      ? syncedLyrics.map((entry) => entry.text).filter(Boolean)
      : splitLyrics(payload && payload.lrc ? payload.lrc.lyric : '');

    return {
      lines,
      syncedLyrics: syncedLyrics.length ? syncedLyrics : translated,
      title: first.title,
      artist: first.artist,
      album: first.album,
      providerId: first.providerId
    };
  } catch (error) {
    return emptyLyricsResult();
  }
}

function normalizeCandidateFromLrclib(item) {
  if (!item) return null;
  const previewLines = splitLyrics(item.plainLyrics || item.syncedLyrics || '').slice(0, 2);
  return {
    source: 'lrclib',
    title: item.trackName || item.name || '',
    artist: item.artistName || '',
    album: item.albumName || '',
    providerId: item.id || '',
    candidateId: '',
    accesskey: '',
    previewLines
  };
}

function normalizeCandidateFromNetease(item) {
  if (!item) return null;
  const artists = Array.isArray(item.artists)
    ? item.artists.map((artist) => artist && artist.name).filter(Boolean).join(' / ')
    : '';
  return {
    source: 'netease',
    title: item.name || '',
    artist: artists,
    album: item.album && item.album.name ? item.album.name : '',
    providerId: item.id || '',
    candidateId: '',
    accesskey: '',
    previewLines: []
  };
}

function normalizeCandidateFromRangotec(item) {
  if (!item) return null;
  const lyricsText = String(item.lrc || '');
  return {
    source: 'rangotec',
    title: item.title || '',
    artist: item.artist || '',
    album: item.album || '',
    providerId: item.id ? String(item.id) : '',
    candidateId: '',
    accesskey: '',
    previewLines: splitLyrics(lyricsText).slice(0, 2),
    previewSourceLyrics: lyricsText
  };
}

function dedupeCandidates(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || !(item.title || item.artist)) return false;
    const key = [
      item.source || '',
      item.providerId || '',
      item.title || '',
      item.artist || ''
    ].join('::').toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function splitLyrics(value) {
  return String(value || '')
    .split(/\r?\n/)
    .map((line) => String(line || '').replace(/^\[[^\]]+\]/g, '').trim())
    .filter(Boolean);
}

function parseSyncedLyrics(value) {
  return String(value || '')
    .split(/\r?\n/)
    .map((line) => {
      const match = String(line || '').match(/^\[(\d{2}):(\d{2}(?:\.\d{1,3})?)\](.*)$/);
      if (!match) return null;
      return {
        time: Number(match[1]) * 60 + Number(match[2]),
        text: String(match[3] || '').trim()
      };
    })
    .filter((item) => item && item.text);
}

function emptyLyricsResult() {
  return {
    lines: [],
    syncedLyrics: [],
    title: '',
    artist: '',
    album: '',
    providerId: ''
  };
}

async function handleKuwoUrlRequest(url) {
  const rid = String(url.searchParams.get('rid') || '').trim();
  if (!rid) {
    return jsonResponse({ url: '', error: 'Missing rid' }, 400);
  }
  const text = await resolveKuwoRawUrl(rid);
  if (text) {
    return jsonResponse({ url: text });
  }
  return jsonResponse({ url: '' });
}

async function resolveKuwoRawUrl(rid) {
  rid = String(rid || '').trim().replace(/^MUSIC_/i, '');
  if (!rid) return '';
  const target = `http://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=MUSIC_${encodeURIComponent(rid)}`;
  try {
    const response = await fetchWithTimeout(target, {
      headers: {
        'Accept': 'text/plain,*/*',
        'Referer': 'https://www.kuwo.cn/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!response.ok) {
      return '';
    }
    const text = (await readLimitedText(response, MAX_UPSTREAM_TEXT_BYTES)).trim();
    if (text && /^https?:\/\//i.test(text)) {
      return text;
    }
    return '';
  } catch (error) {
    return '';
  }
}

function wrapAudioProxyResponse(response) {
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Range, Content-Length, Content-Type');
  responseHeaders.set('Cache-Control', 'no-store');
  if (!responseHeaders.get('Content-Type')) responseHeaders.set('Content-Type', 'audio/mpeg');
  if (!responseHeaders.get('Accept-Ranges')) responseHeaders.set('Accept-Ranges', 'bytes');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
}

async function handleKuwoAudioRequest(request, url) {
  const rid = String(url.searchParams.get('rid') || '').trim();
  const audioUrl = await resolveKuwoRawUrl(rid);
  if (!audioUrl) {
    return jsonResponse({ url: '', error: rid ? 'resolve failed' : 'Missing rid' }, rid ? 502 : 400);
  }
  const headers = {
    'Accept': '*/*',
    'Referer': 'https://www.kuwo.cn/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };
  const range = request.headers.get('Range');
  if (range) headers.Range = range;
  let playbackUrl;
  try {
    playbackUrl = new URL(audioUrl);
  } catch (error) {
    return jsonResponse({ url: '', error: 'Invalid audio url' }, 502);
  }
  const response = await fetchAudioProxyResponse(playbackUrl, headers);
  return wrapAudioProxyResponse(response);
}

function isBlockedAudioProxyHost(hostname) {
  const host = String(hostname || '').trim().toLowerCase().replace(/^\[|\]$/g, '');
  if (!host) return true;
  if (host === 'localhost' || host.endsWith('.localhost')) return true;
  if (host === 'metadata.google.internal') return true;
  if (host === '::' || host === '0:0:0:0:0:0:0:0') return true;
  if (host === '::1' || host === '0:0:0:0:0:0:0:1') return true;
  const mappedIpv4 = host.match(/^(?:::ffff:|0:0:0:0:0:ffff:)(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mappedIpv4) return isBlockedAudioProxyHost(mappedIpv4[1]);
  if (/^(fc|fd)[0-9a-f]{2}:/i.test(host) || /^fe[89ab][0-9a-f]:/i.test(host)) return true;

  const ipv4Match = host.match(/^(\d{1,3})(?:\.(\d{1,3})){3}$/);
  if (!ipv4Match) return false;

  const parts = host.split('.').map((part) => Number(part));
  if (parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const first = parts[0];
  const second = parts[1];
  if (first === 0 || first === 10 || first === 127) return true;
  if (first === 169 && second === 254) return true;
  if (first === 172 && second >= 16 && second <= 31) return true;
  if (first === 192 && second === 168) return true;
  if (first >= 224) return true;
  return false;
}

async function handleAudioProxyRequest(request, url) {
  const rawUrl = String(url.searchParams.get('url') || '').trim();
  let audioUrl;
  try {
    audioUrl = new URL(rawUrl);
  } catch (error) {
    return jsonResponse({ url: '', error: 'Invalid url' }, 400);
  }
  if (!['http:', 'https:'].includes(audioUrl.protocol)) {
    return jsonResponse({ url: '', error: 'Unsupported url' }, 400);
  }
  if (isBlockedAudioProxyHost(audioUrl.hostname)) {
    return jsonResponse({ url: '', error: 'Blocked audio proxy host' }, 403);
  }
  const headers = {
    'Accept': '*/*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };
  const range = request.headers.get('Range');
  if (range) headers.Range = range;
  const response = await fetchAudioProxyResponse(audioUrl, headers);
  return wrapAudioProxyResponse(response);
}

async function fetchAudioProxyResponse(audioUrl, headers, redirectsLeft = 4) {
  if (!['http:', 'https:'].includes(audioUrl.protocol)) {
    return jsonResponse({ url: '', error: 'Unsupported redirect url' }, 400);
  }
  if (isBlockedAudioProxyHost(audioUrl.hostname)) {
    return jsonResponse({ url: '', error: 'Blocked audio proxy host' }, 403);
  }

  const response = await fetchWithTimeout(audioUrl.toString(), {
    headers,
    redirect: 'manual'
  });
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('Location');
    if (!location) return response;
    if (redirectsLeft <= 0) {
      return jsonResponse({ url: '', error: 'too many redirects' }, 508);
    }
    let nextUrl;
    try {
      nextUrl = new URL(location, audioUrl);
    } catch (error) {
      return jsonResponse({ url: '', error: 'Invalid redirect url' }, 400);
    }
    return fetchAudioProxyResponse(nextUrl, headers, redirectsLeft - 1);
  }
  return response;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Range'
  };
}

function jsonResponse(payload, status = 200, cacheControl = 'no-store') {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cacheControl,
      ...corsHeaders()
    }
  });
}
