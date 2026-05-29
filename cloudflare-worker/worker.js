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
        return await withCache(request, ctx, () => handleLyricsSearchRequest(url));
      }

      if (url.pathname === '/api/netease/suggest') {
        return await withCache(request, ctx, () => handleNeteaseSuggestRequest(url));
      }

      if (url.pathname === '/api/gd-music') {
        return await withCache(request, ctx, () => handleGdMusicRequest(url));
      }

      if (url.pathname === '/api/cover') {
        return await withCache(request, ctx, () => handleCoverRequest(url));
      }

      return jsonResponse({ ok: true, service: 'ljyyt-worker' });
    } catch (error) {
      const msg = error instanceof Error ? error.message : '';
      const safeMsg = /timeout|HTTP \d{3}/.test(msg) ? msg : 'Internal error';
      return jsonResponse(
        {
          found: false,
          error: safeMsg
        },
        500
      );
    }
  }
};

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
  if (response.ok) {
    ctx.waitUntil(cache.put(request, response.clone()));
  }
  return response;
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
    syncedLyrics: []
  }, 404);
}

async function handleLyricsSearchRequest(url) {
  const lookup = buildLookup(
    url.searchParams.get('title') || '',
    url.searchParams.get('artist') || ''
  );

  if (!lookup.title && !lookup.artist) {
    return jsonResponse({ candidates: [] });
  }

  const [lrclibCandidates, rangotecCandidates, neteaseCandidates] = await Promise.all([
    fetchLrclibCandidates(lookup),
    fetchRangotecCandidates(lookup),
    fetchNeteaseCandidates(lookup)
  ]);

  return jsonResponse({
    candidates: dedupeCandidates([...lrclibCandidates, ...rangotecCandidates, ...neteaseCandidates]).slice(0, 12)
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

  const response = await fetch(coverUrl.toString(), {
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

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'ljyyt-worker/1.0'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
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

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Cache-Control': 'public, max-age=1800',
    'X-Content-Type-Options': 'nosniff'
  };
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders()
    }
  });
}
