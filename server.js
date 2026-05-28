const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = __dirname;
const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);
const LYRICS_FILE = path.join(ROOT, 'data', 'lyrics.json');
const THIRD_PARTY_LYRICS_URL = process.env.LYRICS_SEARCH_URL || '';
const DEFAULT_SOURCES = ['kugou', 'rangotec', 'lrcapi', 'kuwo', 'netease', 'qq', 'local'];

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp'
};

function normalizeText(value) {
  return String(value || '')
    .replace(/\.(mp3|flac|wav|m4a)$/i, '')
    .replace(/[《》"'`]/g, ' ')
    .replace(/[()（）\[\]【】]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizeArtistList(value) {
  return normalizeText(value)
    .split(/[\/、,&，;；\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function canonicalSongTitle(value) {
  return normalizeText(
    String(value || '')
      .replace(/[\(\[（【].*?[\)\]）】]/g, ' ')
      .replace(/(?:dj版?|live版?|现场版|伴奏版?|纯音乐版|remix版?|cover版?|翻唱版|完整版|片段版|demo版|新版|原版|剪辑版|抖音版)/gi, ' ')
  );
}

function isTitleCompatible(queryTitle, candidateTitle) {
  const query = canonicalSongTitle(queryTitle);
  const candidate = canonicalSongTitle(candidateTitle);
  if (!query) return true;
  if (!candidate) return false;
  if (query === candidate) return true;
  if (candidate.startsWith(query + ' ')) return true;
  if (query.startsWith(candidate + ' ')) return true;
  return false;
}

function isArtistCompatible(queryArtist, candidateArtist) {
  const queryList = normalizeArtistList(queryArtist);
  const candidateList = normalizeArtistList(candidateArtist);
  if (!queryList.length) return true;
  if (!candidateList.length) return false;

  return queryList.some((queryItem) => {
    return candidateList.some((candidateItem) => {
      return candidateItem === queryItem || candidateItem.includes(queryItem) || queryItem.includes(candidateItem);
    });
  });
}

function isCandidateCompatible(query, candidateTitle, candidateArtist) {
  return isTitleCompatible(query.title, candidateTitle) && isArtistCompatible(query.artist, candidateArtist);
}

function decodeEntities(value) {
  return String(value || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"');
}

function splitLines(raw) {
  if (Array.isArray(raw)) {
    return raw.map((line) => String(line || '').trim()).filter(Boolean);
  }

  return String(raw || '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^\[[^\]]+\]\s*/, '').trim())
    .filter(Boolean);
}

function scoreCandidate(query, candidateTitle, candidateArtist) {
  const queryTitle = normalizeText(query.title);
  const queryArtist = normalizeText(query.artist);
  const title = normalizeText(candidateTitle);
  const artist = normalizeText(candidateArtist);

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

function getAutoMatchThreshold(query) {
  const hasTitle = !!normalizeText(query.title);
  const hasArtist = !!normalizeText(query.artist);

  if (hasTitle && hasArtist) return 70;
  if (hasTitle) return 35;
  if (hasArtist) return 25;
  return 999;
}

function ensureAutoMatch(score, query, source) {
  const threshold = getAutoMatchThreshold(query);
  if (score < threshold) {
    throw new Error(source + ' candidate score too low');
  }
}

function decodeBase64Utf8(value) {
  try {
    return Buffer.from(String(value || ''), 'base64').toString('utf8');
  } catch (error) {
    return '';
  }
}

function formatDurationText(rawDuration) {
  const value = Number(rawDuration);
  if (!value || Number.isNaN(value)) return '';

  const seconds = value > 1000 ? Math.round(value / 1000) : Math.round(value);
  const minutes = Math.floor(seconds / 60);
  const remain = seconds % 60;
  return `${minutes}:${String(remain).padStart(2, '0')}`;
}

function loadLyricsLibrary() {
  try {
    if (!fs.existsSync(LYRICS_FILE)) return [];
    const raw = fs.readFileSync(LYRICS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load lyrics library:', error.message);
    return [];
  }
}

function findLyricsInLibrary(query) {
  const title = normalizeText(query.title);
  const artist = normalizeText(query.artist);
  const id = String(query.id || '').trim();

  if (!title && !artist && !id) return null;

  const library = loadLyricsLibrary();
  let best = null;
  let bestScore = -1;

  library.forEach((item) => {
    const itemId = String(item.id || '').trim();
    const itemTitle = item.title || '';
    const itemArtist = item.artist || '';

    let score = scoreCandidate(query, itemTitle, itemArtist);
    if (id && itemId && itemId === id) score += 100;

    if (isCandidateCompatible(query, itemTitle, itemArtist) && score > bestScore) {
      best = item;
      bestScore = score;
    }
  });

  return bestScore >= getAutoMatchThreshold(query) ? best : null;
}

function requestText(targetUrl, options = {}) {
  const client = targetUrl.startsWith('https://') ? https : http;
  const method = options.method || 'GET';
  const headers = options.headers || {};
  const body = options.body || null;

  return new Promise((resolve, reject) => {
    const req = client.request(targetUrl, { method, headers }, (res) => {
      let data = '';
      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        resolve(data);
      });
    });

    req.on('error', reject);
    req.setTimeout(options.timeout || 8000, () => {
      req.destroy(new Error('request timeout'));
    });

    if (body) req.write(body, 'utf8');
    req.end();
  });
}

function resolveRedirectUrl(targetUrl, options = {}, redirectsLeft = 4) {
  const client = targetUrl.startsWith('https://') ? https : http;
  const method = options.method || 'GET';
  const headers = options.headers || {};

  return new Promise((resolve, reject) => {
    const req = client.request(targetUrl, { method, headers }, (res) => {
      const statusCode = Number(res.statusCode || 0);

      if (statusCode >= 300 && statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirectsLeft <= 0) {
          reject(new Error('too many redirects'));
          return;
        }

        const nextUrl = new URL(res.headers.location, targetUrl).toString();
        resolve(resolveRedirectUrl(nextUrl, options, redirectsLeft - 1));
        return;
      }

      if (statusCode < 200 || statusCode >= 300) {
        res.resume();
        reject(new Error(`HTTP ${statusCode}`));
        return;
      }

      res.resume();
      resolve({
        finalUrl: targetUrl,
        contentType: String(res.headers['content-type'] || '')
      });
    });

    req.on('error', reject);
    req.setTimeout(options.timeout || 8000, () => {
      req.destroy(new Error('request timeout'));
    });
    req.end();
  });
}

async function requestJson(targetUrl, options = {}) {
  const text = await requestText(targetUrl, options);
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error('invalid JSON response');
  }
}

function buildSuccess(source, title, artist, lines, extra) {
  return Object.assign({
    found: true,
    source,
    title: title || '',
    artist: artist || '',
    lines: splitLines(lines)
  }, extra || {});
}

function parseTimedLyrics(raw) {
  return String(raw || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseLrcTimestampToSeconds(raw) {
  const value = String(raw || '').trim();
  const match = value.match(/^(\d+):(\d+)(?:[.:](\d+))?$/);
  if (!match) return null;

  const minutes = Number(match[1] || 0);
  const seconds = Number(match[2] || 0);
  const fractionRaw = match[3] || '0';
  let fraction = 0;

  if (fractionRaw.length === 3) fraction = Number(fractionRaw) / 1000;
  else if (fractionRaw.length === 2) fraction = Number(fractionRaw) / 100;
  else if (fractionRaw.length === 1) fraction = Number(fractionRaw) / 10;
  else fraction = Number(fractionRaw) / Math.pow(10, fractionRaw.length);

  return minutes * 60 + seconds + fraction;
}

function parseSyncedLyrics(raw) {
  return String(raw || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .reduce((result, line) => {
      if (!line) return result;

      const karaokeMatch = line.match(/^\[(\d+:\d+(?:[:.]\d+)?)\,(\d+:\d+(?:[:.]\d+)?)\](.*)$/);
      if (karaokeMatch) {
        const time = parseLrcTimestampToSeconds(karaokeMatch[1]);
        const text = String(karaokeMatch[3] || '').trim();
        if (time !== null && text) result.push({ time, text });
        return result;
      }

      const match = line.match(/^\[(\d+:\d+(?:[.:]\d+)?)\](.*)$/);
      if (match) {
        const time = parseLrcTimestampToSeconds(match[1]);
        const text = String(match[2] || '').trim();
        if (time !== null && text) result.push({ time, text });
      }

      return result;
    }, []);
}

function parseKuwoSyncedLyrics(lrcList) {
  return (Array.isArray(lrcList) ? lrcList : [])
    .map((item) => ({
      time: Number(item && item.time),
      text: String(item && item.lineLyric || '').trim()
    }))
    .filter((item) => !Number.isNaN(item.time) && item.text);
}

function buildPreviewLines(raw, limit) {
  return splitLines(raw)
    .filter((line) => line && !/^(作词|作曲|编曲|录音|混音|制作人|母带|OP|SP|词：|曲：)/.test(String(line).trim()))
    .slice(0, limit || 2);
}

async function fetchKugouPreview(candidateId, accesskey) {
  if (!candidateId || !accesskey) return [];

  try {
    const downloadUrl = new URL('https://lyrics.kugou.com/download');
    downloadUrl.searchParams.set('ver', '1');
    downloadUrl.searchParams.set('client', 'pc');
    downloadUrl.searchParams.set('id', String(candidateId));
    downloadUrl.searchParams.set('accesskey', String(accesskey));
    downloadUrl.searchParams.set('fmt', 'lrc');
    downloadUrl.searchParams.set('charset', 'utf8');

    const lyricResult = await requestJson(downloadUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'Referer': 'https://www.kugou.com/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    return buildPreviewLines(decodeBase64Utf8(lyricResult.content), 2);
  } catch (error) {
    return [];
  }
}

function sanitizeProviderText(value) {
  return String(value || '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function searchRangotecLyrics(query) {
  if (query.source === 'rangotec' && query.providerId) {
    const title = sanitizeProviderText(query.title);
    const artist = sanitizeProviderText(query.artist);
    const queries = [];
    if (title) queries.push({ title, artist });
    if (title) queries.push({ title, artist: '' });
    if (!title && artist) queries.push({ title: artist, artist: '' });

    for (const itemQuery of queries) {
      const apiUrl = new URL('https://tools.rangotec.com/api/anon/lrc');
      if (itemQuery.title) apiUrl.searchParams.set('title', itemQuery.title);
      if (itemQuery.artist) apiUrl.searchParams.set('artist', itemQuery.artist);
      apiUrl.searchParams.set('od', 'desc');

      const result = await requestJson(apiUrl.toString(), {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      });

      const items = Array.isArray(result && result.data) ? result.data : [];
      const forced = items.find((item) => String(item.id || '') === String(query.providerId));
      if (!forced) continue;

      const forcedLines = splitLines(forced.lrc || '');
      if (!forcedLines.length) {
        throw new Error('rangotec forced lyric returned empty lrc');
      }

      return buildSuccess('rangotec', forced.title || query.title, forced.artist || query.artist, forcedLines, {
        providerId: String(forced.id || ''),
        album: forced.album || '',
        providerTid: String(forced.tid || ''),
        syncedLyrics: parseSyncedLyrics(forced.lrc || '')
      });
    }

    throw new Error('rangotec forced lyric not found');
  }

  const title = sanitizeProviderText(query.title);
  const artist = sanitizeProviderText(query.artist);

  if (!title) {
    throw new Error('rangotec requires title');
  }

  const apiUrl = new URL('https://tools.rangotec.com/api/anon/lrc');
  apiUrl.searchParams.set('title', title);
  if (artist) apiUrl.searchParams.set('artist', artist);
  apiUrl.searchParams.set('od', 'desc');

  const result = await requestJson(apiUrl.toString(), {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  if (!result || result.code !== 200) {
    throw new Error(`rangotec returned code ${result && result.code !== undefined ? result.code : 'unknown'}`);
  }

  const items = Array.isArray(result.data) ? result.data : [];
  if (!items.length) {
    throw new Error('rangotec returned no lyric rows');
  }

  let best = null;
  let bestScore = -1;
  items.forEach((item) => {
    const score = scoreCandidate(query, item.title, item.artist);
    if (isCandidateCompatible(query, item.title, item.artist) && score > bestScore) {
      best = item;
      bestScore = score;
    }
  });

  ensureAutoMatch(bestScore, query, 'rangotec');

  const lines = splitLines(best && best.lrc ? best.lrc : '');
  if (!lines.length) {
    throw new Error('rangotec returned empty lrc');
  }

  const syncedLyrics = parseSyncedLyrics(best && best.lrc ? best.lrc : '');

  return buildSuccess('rangotec', best.title || query.title, best.artist || query.artist, lines, {
    providerId: String(best.id || ''),
    album: best.album || '',
    providerTid: String(best.tid || ''),
    syncedLyrics
  });
}

async function searchLrcApiLyrics(query) {
  const title = sanitizeProviderText(query.title);
  const artist = sanitizeProviderText(query.artist);

  if (!title && !artist) {
    throw new Error('lrcapi requires title or artist');
  }

  const apiUrl = new URL('https://api.lrc.cx/lyrics');
  if (title) apiUrl.searchParams.set('title', title);
  if (artist) apiUrl.searchParams.set('artist', artist);

  const rawLyrics = await requestText(apiUrl.toString(), {
    headers: {
      'Accept': 'text/plain, text/lrc;q=0.9, */*;q=0.8',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const lines = splitLines(rawLyrics);
  if (!lines.length) {
    throw new Error('lrcapi returned empty lyric');
  }

  return buildSuccess('lrcapi', query.title || title, query.artist || artist, lines, {
    providerId: [title, artist].filter(Boolean).join('::'),
    syncedLyrics: parseSyncedLyrics(rawLyrics)
  });
}

async function searchLrcApiCover(query) {
  const title = sanitizeProviderText(query.title);
  const artist = sanitizeProviderText(query.artist);

  if (!title && !artist) {
    throw new Error('cover requires title or artist');
  }

  const apiUrl = new URL('https://api.lrc.cx/cover');
  if (title) apiUrl.searchParams.set('title', title);
  if (artist) apiUrl.searchParams.set('artist', artist);

  const result = await resolveRedirectUrl(apiUrl.toString(), {
    headers: {
      'Accept': 'image/*,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  if (!result.finalUrl) {
    throw new Error('cover returned no image url');
  }

  return {
    found: true,
    source: 'lrcapi-cover',
    title: query.title || title,
    artist: query.artist || artist,
    imageUrl: result.finalUrl,
    contentType: result.contentType || ''
  };
}

async function searchKugouLyrics(query) {
  if (query.source === 'kugou' && query.candidateId && query.accesskey) {
    const forcedDownloadUrl = new URL('https://lyrics.kugou.com/download');
    forcedDownloadUrl.searchParams.set('ver', '1');
    forcedDownloadUrl.searchParams.set('client', 'pc');
    forcedDownloadUrl.searchParams.set('id', String(query.candidateId));
    forcedDownloadUrl.searchParams.set('accesskey', String(query.accesskey));
    forcedDownloadUrl.searchParams.set('fmt', 'lrc');
    forcedDownloadUrl.searchParams.set('charset', 'utf8');

    const forcedLyricResult = await requestJson(forcedDownloadUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'Referer': 'https://www.kugou.com/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const forcedDecoded = decodeBase64Utf8(forcedLyricResult.content);
    const forcedLines = splitLines(forcedDecoded);
    const forcedSyncedLyrics = parseSyncedLyrics(forcedDecoded);
    if (!forcedLines.length) {
      throw new Error('kugou forced download returned empty lyric');
    }

    return buildSuccess('kugou', query.title, query.artist, forcedLines, {
      providerId: String(query.candidateId),
      syncedLyrics: forcedSyncedLyrics
    });
  }

  const keyword = [query.title, query.artist].filter(Boolean).join(' ');
  const searchUrl = new URL('https://lyrics.kugou.com/search');
  searchUrl.searchParams.set('ver', '1');
  searchUrl.searchParams.set('man', 'yes');
  searchUrl.searchParams.set('client', 'pc');
  searchUrl.searchParams.set('keyword', keyword || query.title || query.artist || '');

  const searchResult = await requestJson(searchUrl.toString(), {
    headers: {
      'Accept': 'application/json',
      'Referer': 'https://www.kugou.com/',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const candidates = Array.isArray(searchResult.candidates) ? searchResult.candidates : [];
  if (!candidates.length) {
    throw new Error('kugou search returned no candidates');
  }

  let best = null;
  let bestScore = -1;
  candidates.forEach((candidate) => {
    const score = scoreCandidate(query, candidate.song, candidate.singer);
    if (isCandidateCompatible(query, candidate.song, candidate.singer) && score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  });

  ensureAutoMatch(bestScore, query, 'kugou');

  if (!best || !best.id || !best.accesskey) {
    throw new Error('kugou search returned no downloadable candidate');
  }

  const downloadUrl = new URL('https://lyrics.kugou.com/download');
  downloadUrl.searchParams.set('ver', '1');
  downloadUrl.searchParams.set('client', 'pc');
  downloadUrl.searchParams.set('id', String(best.id));
  downloadUrl.searchParams.set('accesskey', String(best.accesskey));
  downloadUrl.searchParams.set('fmt', 'lrc');
  downloadUrl.searchParams.set('charset', 'utf8');

  const lyricResult = await requestJson(downloadUrl.toString(), {
    headers: {
      'Accept': 'application/json',
      'Referer': 'https://www.kugou.com/',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const decoded = decodeBase64Utf8(lyricResult.content);
  const lines = splitLines(decoded);
  const syncedLyrics = parseSyncedLyrics(decoded);
  if (!lines.length) {
    throw new Error('kugou download returned empty lyric');
  }

  return buildSuccess('kugou', best.song || query.title, best.singer || query.artist, lines, {
    providerId: String(best.id),
    syncedLyrics
  });
}

async function searchKugouCandidates(query) {
  const queries = [];
  const title = String(query.title || '').trim();
  const artist = String(query.artist || '').trim();
  const combined = [title, artist].filter(Boolean).join(' ');

  if (combined) queries.push(combined);
  if (title && queries.indexOf(title) === -1) queries.push(title);
  if (artist && queries.indexOf(artist) === -1) queries.push(artist);

  const deduped = new Map();

  for (const keyword of queries) {
    const searchUrl = new URL('https://lyrics.kugou.com/search');
    searchUrl.searchParams.set('ver', '1');
    searchUrl.searchParams.set('man', 'yes');
    searchUrl.searchParams.set('client', 'pc');
    searchUrl.searchParams.set('keyword', keyword);

    const result = await requestJson(searchUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'Referer': 'https://www.kugou.com/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const candidates = Array.isArray(result.candidates) ? result.candidates : [];
    candidates.forEach((candidate) => {
      const candidateId = String(candidate.id || '');
      const accesskey = String(candidate.accesskey || '');
      if (!candidateId || !accesskey) return;

      const key = candidateId + '::' + accesskey;
      if (deduped.has(key)) return;

      deduped.set(key, {
        source: 'kugou',
        title: candidate.song || '',
        artist: candidate.singer || '',
        album: candidate.album || '',
        duration: candidate.duration || '',
        candidateId,
        accesskey
      });
    });
  }

  const sorted = Array.from(deduped.values())
    .filter((item) => isCandidateCompatible(query, item.title, item.artist))
    .sort((a, b) => scoreCandidate(query, b.title, b.artist) - scoreCandidate(query, a.title, a.artist))
    .slice(0, 12);

  await Promise.all(sorted.slice(0, 6).map(async (item) => {
    item.previewLines = await fetchKugouPreview(item.candidateId, item.accesskey);
    item.durationText = formatDurationText(item.duration);
  }));

  sorted.slice(6).forEach((item) => {
    item.previewLines = [];
    item.durationText = formatDurationText(item.duration);
  });

  return sorted;
}

async function searchRangotecCandidates(query) {
  const title = sanitizeProviderText(query.title);
  const artist = sanitizeProviderText(query.artist);
  if (!title && !artist) return [];

  const queries = [];
  if (title) queries.push({ title, artist });
  if (title) queries.push({ title, artist: '' });
  if (!title && artist) queries.push({ title: artist, artist: '' });

  const deduped = new Map();

  for (const itemQuery of queries) {
    const apiUrl = new URL('https://tools.rangotec.com/api/anon/lrc');
    if (itemQuery.title) apiUrl.searchParams.set('title', itemQuery.title);
    if (itemQuery.artist) apiUrl.searchParams.set('artist', itemQuery.artist);
    apiUrl.searchParams.set('od', 'desc');

    const result = await requestJson(apiUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const items = Array.isArray(result && result.data) ? result.data : [];
    items.forEach((item) => {
      const providerId = String(item.id || '');
      if (!providerId || deduped.has(providerId)) return;
      deduped.set(providerId, {
        source: 'rangotec',
        title: item.title || '',
        artist: item.artist || '',
        album: item.album || '',
        providerId,
        previewLines: buildPreviewLines(item.lrc || '', 2)
      });
    });
  }

  return Array.from(deduped.values())
    .filter((item) => isCandidateCompatible(query, item.title, item.artist))
    .sort((a, b) => scoreCandidate(query, b.title, b.artist) - scoreCandidate(query, a.title, a.artist))
    .slice(0, 16);
}

async function searchLrcApiCandidates(query) {
  const title = sanitizeProviderText(query.title);
  const artist = sanitizeProviderText(query.artist);

  if (!title) return [];

  try {
    const result = await searchLrcApiLyrics({ title, artist });
    return [{
      source: 'lrcapi',
      title: result.title || title,
      artist: result.artist || artist,
      album: '',
      providerId: [title, artist].filter(Boolean).join('::'),
      previewLines: buildPreviewLines(result.lines, 2)
    }];
  } catch (error) {
    return [];
  }
}

async function searchKuwoCandidates(query) {
  const queries = [];
  const title = String(query.title || '').trim();
  const artist = String(query.artist || '').trim();
  const combined = [title, artist].filter(Boolean).join(' ');

  if (combined) queries.push(combined);
  if (title && queries.indexOf(title) === -1) queries.push(title);
  if (artist && queries.indexOf(artist) === -1) queries.push(artist);

  const deduped = new Map();

  for (const keyword of queries) {
    const searchUrl = new URL('https://search.kuwo.cn/r.s');
    searchUrl.searchParams.set('all', keyword);
    searchUrl.searchParams.set('ft', 'music');
    searchUrl.searchParams.set('itemset', 'web_2013');
    searchUrl.searchParams.set('client', 'kt');
    searchUrl.searchParams.set('pn', '0');
    searchUrl.searchParams.set('rn', '12');
    searchUrl.searchParams.set('rformat', 'json');
    searchUrl.searchParams.set('encoding', 'utf8');

    const searchBody = await requestText(searchUrl.toString(), {
      headers: {
        'Referer': 'https://www.kuwo.cn/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const candidates = parseKuwoSearchCandidates(searchBody);
    candidates.forEach((candidate) => {
      const providerId = String(candidate.id || '');
      if (!providerId || deduped.has(providerId)) return;
      deduped.set(providerId, {
        source: 'kuwo',
        title: candidate.title || '',
        artist: candidate.artist || '',
        album: '',
        providerId
      });
    });
  }

  return Array.from(deduped.values())
    .filter((item) => isCandidateCompatible(query, item.title, item.artist))
    .sort((a, b) => scoreCandidate(query, b.title, b.artist) - scoreCandidate(query, a.title, a.artist))
    .slice(0, 16);
}

async function searchNeteaseCandidates(query) {
  const queries = [];
  const title = String(query.title || '').trim();
  const artist = String(query.artist || '').trim();
  const combined = [title, artist].filter(Boolean).join(' ');

  if (combined) queries.push(combined);
  if (title && queries.indexOf(title) === -1) queries.push(title);
  if (artist && queries.indexOf(artist) === -1) queries.push(artist);

  const deduped = new Map();

  for (const keyword of queries) {
    const searchUrl = new URL('https://music.163.com/api/search/get');
    searchUrl.searchParams.set('s', keyword);
    searchUrl.searchParams.set('type', '1');
    searchUrl.searchParams.set('limit', '12');
    searchUrl.searchParams.set('offset', '0');

    const searchResult = await requestJson(searchUrl.toString(), {
      headers: {
        'Referer': 'https://music.163.com/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const songs = searchResult && searchResult.result && Array.isArray(searchResult.result.songs)
      ? searchResult.result.songs
      : [];

    songs.forEach((song) => {
      const providerId = String(song.id || '');
      if (!providerId || deduped.has(providerId)) return;
      deduped.set(providerId, {
        source: 'netease',
        title: song.name || '',
        artist: Array.isArray(song.artists) ? song.artists.map((item) => item.name).join('、') : '',
        album: song.album && song.album.name ? song.album.name : '',
        providerId,
        durationText: formatDurationText(song.duration || 0)
      });
    });
  }

  return Array.from(deduped.values())
    .filter((item) => isCandidateCompatible(query, item.title, item.artist))
    .sort((a, b) => scoreCandidate(query, b.title, b.artist) - scoreCandidate(query, a.title, a.artist))
    .slice(0, 16);
}

async function searchQQCandidates(query) {
  const queries = [];
  const title = String(query.title || '').trim();
  const artist = String(query.artist || '').trim();
  const combined = [title, artist].filter(Boolean).join(' ');

  if (combined) queries.push(combined);
  if (title && queries.indexOf(title) === -1) queries.push(title);
  if (artist && queries.indexOf(artist) === -1) queries.push(artist);

  const deduped = new Map();

  for (const keyword of queries) {
    const searchBody = JSON.stringify({
      comm: {
        cv: 0,
        ct: 24,
        format: 'json',
        uin: 0,
        platform: 'yqq.json'
      },
      req_1: {
        module: 'music.search.SearchCgiService',
        method: 'DoSearchForQQMusicDesktop',
        param: {
          num_per_page: 12,
          page_num: 1,
          query: keyword,
          search_type: 0
        }
      }
    });

    const searchResult = await requestJson('https://u.y.qq.com/cgi-bin/musicu.fcg', {
      method: 'POST',
      body: searchBody,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Origin': 'https://y.qq.com',
        'Referer': 'https://y.qq.com/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const searchBodyData = searchResult && searchResult.req_1 && searchResult.req_1.data && searchResult.req_1.data.body;
    const songs = searchBodyData && searchBodyData.song && Array.isArray(searchBodyData.song.list)
      ? searchBodyData.song.list
      : (searchBodyData && searchBodyData.songlist && Array.isArray(searchBodyData.songlist.list)
          ? searchBodyData.songlist.list
          : []);

    songs.forEach((song) => {
      const providerId = String(song.id || song.songid || '');
      if (!providerId || deduped.has(providerId)) return;
      deduped.set(providerId, {
        source: 'qq',
        title: song.name || song.title || '',
        artist: Array.isArray(song.singer) ? song.singer.map((item) => item.name).join('、') : '',
        album: song.album && song.album.name ? song.album.name : '',
        providerId,
        providerMid: String(song.mid || song.songmid || ''),
        durationText: formatDurationText(song.interval || 0)
      });
    });
  }

  return Array.from(deduped.values())
    .filter((item) => isCandidateCompatible(query, item.title, item.artist))
    .sort((a, b) => scoreCandidate(query, b.title, b.artist) - scoreCandidate(query, a.title, a.artist))
    .slice(0, 16);
}

async function searchLocalCandidates(query) {
  const library = loadLyricsLibrary();
  return library
    .map((item) => ({
      source: 'local-library',
      title: item.title || '',
      artist: item.artist || '',
      album: item.album || '',
      providerId: String(item.id || ''),
      previewLines: buildPreviewLines(item.lines || item.lyrics || '', 2)
    }))
    .filter((item) => isCandidateCompatible(query, item.title, item.artist))
    .sort((a, b) => scoreCandidate(query, b.title, b.artist) - scoreCandidate(query, a.title, a.artist))
    .slice(0, 16);
}

function parseKuwoSearchCandidates(raw) {
  const candidates = [];
  const regex = /'MUSICRID':'MUSIC_(\d+)'.+?'ARTIST':'([^']*)'.+?'SONGNAME':'([^']*)'/gs;
  let match = regex.exec(raw);

  while (match) {
    candidates.push({
      id: match[1],
      artist: decodeEntities(match[2]),
      title: decodeEntities(match[3])
    });
    match = regex.exec(raw);
  }

  return candidates;
}

async function searchKuwoLyrics(query) {
  const keyword = [query.title, query.artist].filter(Boolean).join(' ');
  const searchUrl = new URL('https://search.kuwo.cn/r.s');
  searchUrl.searchParams.set('all', keyword || query.title || query.artist || '');
  searchUrl.searchParams.set('ft', 'music');
  searchUrl.searchParams.set('itemset', 'web_2013');
  searchUrl.searchParams.set('client', 'kt');
  searchUrl.searchParams.set('pn', '0');
  searchUrl.searchParams.set('rn', '8');
  searchUrl.searchParams.set('rformat', 'json');
  searchUrl.searchParams.set('encoding', 'utf8');

  const searchBody = await requestText(searchUrl.toString(), {
    headers: {
      'Referer': 'https://www.kuwo.cn/',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const candidates = parseKuwoSearchCandidates(searchBody);
  if (!candidates.length) {
    throw new Error('kuwo search returned no candidates');
  }

  let best = null;
  let bestScore = -1;
  candidates.forEach((candidate) => {
    const score = scoreCandidate(query, candidate.title, candidate.artist);
    if (isCandidateCompatible(query, candidate.title, candidate.artist) && score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  });

  ensureAutoMatch(bestScore, query, 'kuwo');

  if (!best || !best.id) {
    throw new Error('kuwo search returned no lyric id');
  }

  const lyricUrl = new URL('https://m.kuwo.cn/newh5/singles/songinfoandlrc');
  lyricUrl.searchParams.set('musicId', String(best.id));

  const lyricResult = await requestJson(lyricUrl.toString(), {
    headers: {
      'Cookie': 'kw_token=codex',
      'Referer': 'https://www.kuwo.cn/',
      'User-Agent': 'Mozilla/5.0',
      'csrf': 'codex'
    }
  });

  const lrcList = lyricResult && lyricResult.data && Array.isArray(lyricResult.data.lrclist)
    ? lyricResult.data.lrclist
    : [];
  const lines = lrcList.map((item) => item.lineLyric).filter(Boolean);
  const syncedLyrics = parseKuwoSyncedLyrics(lrcList);

  if (!lines.length) {
    throw new Error('kuwo lyric returned empty lrclist');
  }

  return buildSuccess('kuwo', best.title || query.title, best.artist || query.artist, lines, {
    providerId: String(best.id),
    syncedLyrics
  });
}

async function searchNeteaseLyrics(query) {
  const keyword = [query.title, query.artist].filter(Boolean).join(' ');
  const searchUrl = new URL('https://music.163.com/api/search/get');
  searchUrl.searchParams.set('s', keyword || query.title || query.artist || '');
  searchUrl.searchParams.set('type', '1');
  searchUrl.searchParams.set('limit', '8');
  searchUrl.searchParams.set('offset', '0');

  const searchResult = await requestJson(searchUrl.toString(), {
    headers: {
      'Referer': 'https://music.163.com/',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const songs = searchResult && searchResult.result && Array.isArray(searchResult.result.songs)
    ? searchResult.result.songs
    : [];
  if (!songs.length) {
    throw new Error('netease search returned no songs');
  }

  let best = null;
  let bestScore = -1;
  songs.forEach((song) => {
    const artist = Array.isArray(song.artists) ? song.artists.map((item) => item.name).join('、') : '';
    const score = scoreCandidate(query, song.name, artist);
    if (isCandidateCompatible(query, song.name, artist) && score > bestScore) {
      best = song;
      bestScore = score;
    }
  });

  ensureAutoMatch(bestScore, query, 'netease');

  if (!best || !best.id) {
    throw new Error('netease search returned no lyric id');
  }

  const lyricUrl = new URL('https://music.163.com/api/song/lyric');
  lyricUrl.searchParams.set('os', 'pc');
  lyricUrl.searchParams.set('id', String(best.id));
  lyricUrl.searchParams.set('lv', '-1');
  lyricUrl.searchParams.set('tv', '-1');

  const lyricResult = await requestJson(lyricUrl.toString(), {
    headers: {
      'Referer': 'https://music.163.com/',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const lyricText = lyricResult && lyricResult.lrc ? lyricResult.lrc.lyric : '';
  const lines = splitLines(lyricText);
  if (!lines.length) {
    throw new Error('netease lyric returned empty lrc');
  }

  const translatedLyricText = lyricResult && lyricResult.tlyric ? lyricResult.tlyric.lyric : '';
  const translatedLines = splitLines(translatedLyricText);
  const timedLines = parseTimedLyrics(lyricText);
  const timedTranslatedLines = parseTimedLyrics(translatedLyricText);
  const syncedLyrics = parseSyncedLyrics(lyricText);

  const artist = Array.isArray(best.artists) ? best.artists.map((item) => item.name).join('、') : query.artist;
  return buildSuccess('netease', best.name || query.title, artist, lines, {
    providerId: String(best.id),
    translationLines: translatedLines,
    timedLines,
    timedTranslationLines: timedTranslatedLines,
    syncedLyrics
  });
}

async function searchQQLyrics(query) {
  const searchBody = JSON.stringify({
    comm: {
      cv: 0,
      ct: 24,
      format: 'json',
      uin: 0,
      platform: 'yqq.json'
    },
    req_1: {
      module: 'music.search.SearchCgiService',
      method: 'DoSearchForQQMusicDesktop',
      param: {
        num_per_page: 8,
        page_num: 1,
        query: [query.title, query.artist].filter(Boolean).join(' '),
        search_type: 0
      }
    }
  });

  const searchResult = await requestJson('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    method: 'POST',
    body: searchBody,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Origin': 'https://y.qq.com',
      'Referer': 'https://y.qq.com/',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const searchBodyData = searchResult && searchResult.req_1 && searchResult.req_1.data && searchResult.req_1.data.body;
  const songs = searchBodyData && searchBodyData.song && Array.isArray(searchBodyData.song.list)
    ? searchBodyData.song.list
    : (searchBodyData && searchBodyData.songlist && Array.isArray(searchBodyData.songlist.list)
        ? searchBodyData.songlist.list
        : []);

  if (!songs.length) {
    throw new Error('qq search returned no songs');
  }

  let best = null;
  let bestScore = -1;
  songs.forEach((song) => {
    const artist = Array.isArray(song.singer) ? song.singer.map((item) => item.name).join('、') : '';
    const score = scoreCandidate(query, song.name || song.title, artist);
    if (isCandidateCompatible(query, song.name || song.title, artist) && score > bestScore) {
      best = song;
      bestScore = score;
    }
  });

  ensureAutoMatch(bestScore, query, 'qq');

  const songMid = best && (best.mid || best.songmid);
  const songId = best && (best.id || best.songid);
  if (!songMid || !songId) {
    throw new Error('qq search returned no songmid');
  }

  const lyricBody = JSON.stringify({
    comm: {
      cv: 0,
      ct: 24,
      format: 'json',
      uin: 0,
      platform: 'yqq.json'
    },
    req_1: {
      module: 'music.musichallSong.PlayLyricInfo',
      method: 'GetPlayLyricInfo',
      param: {
        songMID: songMid,
        songID: songId,
        trans_t: 0,
        roma_t: 0
      }
    }
  });

  const lyricResult = await requestJson('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    method: 'POST',
    body: lyricBody,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Origin': 'https://y.qq.com',
      'Referer': 'https://y.qq.com/',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const rawLyric = lyricResult && lyricResult.req_1 && lyricResult.req_1.data
    ? lyricResult.req_1.data.lyric
    : '';
  const lines = splitLines(decodeBase64Utf8(rawLyric));
  if (!lines.length) {
    throw new Error('qq lyric returned empty lyric');
  }

  const artist = Array.isArray(best.singer) ? best.singer.map((item) => item.name).join('、') : query.artist;
  return buildSuccess('qq', best.name || best.title || query.title, artist, lines, {
    providerId: String(songId),
    providerMid: String(songMid)
  });
}

async function searchCustomUpstream(query) {
  if (!THIRD_PARTY_LYRICS_URL) {
    throw new Error('custom upstream is not configured');
  }

  const upstreamUrl = new URL(THIRD_PARTY_LYRICS_URL);
  if (query.id) upstreamUrl.searchParams.set('id', query.id);
  if (query.title) upstreamUrl.searchParams.set('title', query.title);
  if (query.artist) upstreamUrl.searchParams.set('artist', query.artist);

  const result = await requestJson(upstreamUrl.toString(), {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const lines = splitLines(result.lines || result.lyrics);
  if (!lines.length) {
    throw new Error('custom upstream returned empty lyric');
  }

  return buildSuccess(result.source || 'custom-upstream', result.title || query.title, result.artist || query.artist, lines);
}

async function searchLocalLyrics(query) {
  const localMatch = findLyricsInLibrary(query);
  if (!localMatch) {
    throw new Error('local library returned no match');
  }

  return buildSuccess(
    'local-library',
    localMatch.title || query.title,
    localMatch.artist || query.artist,
    localMatch.lines || localMatch.lyrics,
    { providerId: String(localMatch.id || '') }
  );
}

const sourceResolvers = {
  rangotec: searchRangotecLyrics,
  lrcapi: searchLrcApiLyrics,
  kugou: searchKugouLyrics,
  kuwo: searchKuwoLyrics,
  netease: searchNeteaseLyrics,
  qq: searchQQLyrics,
  local: searchLocalLyrics,
  custom: searchCustomUpstream
};

const candidateResolvers = {
  kugou: searchKugouCandidates,
  kuwo: searchKuwoCandidates,
  netease: searchNeteaseCandidates,
  qq: searchQQCandidates,
  rangotec: searchRangotecCandidates,
  lrcapi: searchLrcApiCandidates,
  local: searchLocalCandidates
};

function getRequestedSources(rawSources) {
  if (!rawSources) return DEFAULT_SOURCES.slice();
  const requested = String(rawSources)
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return requested.length ? requested : DEFAULT_SOURCES.slice();
}

async function searchLyrics(query, requestedSources) {
  const tried = [];
  let sources = getRequestedSources(requestedSources);

  if (query.source) {
    sources = [String(query.source).toLowerCase()].concat(
      sources.filter((item) => item !== String(query.source).toLowerCase())
    );
  }

  if (THIRD_PARTY_LYRICS_URL && sources.indexOf('custom') === -1) {
    sources.push('custom');
  }

  for (const source of sources) {
    const resolver = sourceResolvers[source];
    if (!resolver) {
      tried.push({ source, ok: false, error: 'unsupported source' });
      continue;
    }

    try {
      const result = await resolver(query);
      result.tried = tried.concat([{ source, ok: true }]);
      return result;
    } catch (error) {
      tried.push({
        source,
        ok: false,
        error: error && error.message ? error.message : 'unknown error'
      });
    }
  }

  return {
    found: false,
    source: '',
    title: query.title || '',
    artist: query.artist || '',
    lines: [],
    tried
  };
}

async function searchLyricsCandidates(query, requestedSources) {
  if (!String(query.title || '').trim() && !String(query.artist || '').trim()) {
    return {
      code: 200,
      msg: '成功',
      candidates: []
    };
  }

  const candidates = [];
  const sources = getRequestedSources(requestedSources);

  for (const source of sources) {
    const resolver = candidateResolvers[source];
    if (!resolver) continue;

    try {
      const result = await resolver(query);
      result.forEach((item) => candidates.push(item));
    } catch (error) {
      continue;
    }
  }

  return {
    code: 200,
    msg: '成功',
    candidates: candidates.slice(0, 20)
  };
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(payload));
}

function sendFile(req, res, targetPath) {
  const parsedPath = path.normalize(targetPath);
  if (!parsedPath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(parsedPath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(parsedPath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=300'
    });
    fs.createReadStream(parsedPath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host || `localhost:${PORT}`}`);

  if (requestUrl.pathname === '/api/lyrics') {
    try {
      const payload = await searchLyrics({
        id: requestUrl.searchParams.get('id') || '',
        title: requestUrl.searchParams.get('title') || '',
        artist: requestUrl.searchParams.get('artist') || '',
        source: requestUrl.searchParams.get('source') || '',
        candidateId: requestUrl.searchParams.get('candidateId') || '',
        accesskey: requestUrl.searchParams.get('accesskey') || '',
        providerId: requestUrl.searchParams.get('providerId') || ''
      }, requestUrl.searchParams.get('sources') || '');
      sendJson(res, 200, payload);
    } catch (error) {
      sendJson(res, 502, {
        found: false,
        source: 'error',
        lines: [],
        message: error.message
      });
    }
    return;
  }

  if (requestUrl.pathname === '/api/lyrics/search') {
    try {
      const payload = await searchLyricsCandidates({
        title: requestUrl.searchParams.get('title') || '',
        artist: requestUrl.searchParams.get('artist') || ''
      }, requestUrl.searchParams.get('sources') || 'kugou,kuwo,netease,qq,rangotec,lrcapi,local');
      sendJson(res, 200, payload);
    } catch (error) {
      sendJson(res, 502, {
        code: 502,
        msg: error.message,
        candidates: []
      });
    }
    return;
  }

  if (requestUrl.pathname === '/api/cover') {
    try {
      const payload = await searchLrcApiCover({
        title: requestUrl.searchParams.get('title') || '',
        artist: requestUrl.searchParams.get('artist') || ''
      });
      sendJson(res, 200, payload);
    } catch (error) {
      sendJson(res, 502, {
        found: false,
        source: 'error',
        imageUrl: '',
        message: error.message
      });
    }
    return;
  }

  let relativePath = decodeURIComponent(requestUrl.pathname);
  if (relativePath === '/') relativePath = '/player.html';
  const absolutePath = path.join(ROOT, relativePath.replace(/^\/+/, ''));
  sendFile(req, res, absolutePath);
});

server.listen(PORT, HOST, () => {
  console.log(`Ljyyt server listening on http://${HOST}:${PORT}`);
  console.log(`Lyrics API ready at http://${HOST}:${PORT}/api/lyrics`);
  console.log(`Default lyric sources: ${DEFAULT_SOURCES.join(' -> ')}`);
});
