const fs = require('fs');
const vm = require('vm');

function getApplicationScript(file) {
  if (file.endsWith('.js')) return fs.readFileSync(file, 'utf8');
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(file + ' is missing inline application script');
  return match[1];
}

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < script.length; index += 1) {
    const char = script[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') {
      depth += 1;
      opened = true;
    } else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

function pickConstObject(script, name) {
  const start = script.indexOf('const ' + name + ' = {');
  if (start < 0) throw new Error('Missing const ' + name);
  const end = script.indexOf('\n    };', start);
  if (end < 0) throw new Error('Could not read const ' + name);
  return script.slice(start, end + '\n    };'.length);
}

function loadMatchSandbox(file, extras) {
  const script = getApplicationScript(file);
  const sandbox = Object.assign({
    console: { warn() {}, log() {}, error() {} },
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    gdMusicApiBase: '/api/gd-music',
    gdMusicFallbackBases: [],
    _isLocalDev: true,
    AbortController,
    DOMException,
    setTimeout,
    clearTimeout,
    aggregatedSources: ['local', 'joox', 'netease', 'kuwo'],
    safeCover(value) { return value || 'cover.jpg'; },
    getSourceLabel(source) {
      return { joox: 'Joox', netease: '网易云音乐', kuwo: '酷我音乐' }[source] || source;
    }
  }, extras || {});
  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getSelectedPlaybackSources'),
    pickFunction(script, 'getFallbackSearchSources'),
    pickFunction(script, 'inferTrackSourceCandidates'),
    pickFunction(script, 'isTrackMatchCandidate'),
    pickFunction(script, 'getTitlePartMarker'),
    pickFunction(script, 'hasConflictingTitlePart'),
    pickFunction(script, 'getNormalizedTitleVariants'),
    pickFunction(script, 'isLooseTitleMatchCandidate'),
    pickFunction(script, 'isBilibiliTrackMatchCandidate'),
    pickFunction(script, 'getNormalizedArtistTokens'),
    pickFunction(script, 'getPrimaryArtistName'),
    pickFunction(script, 'getFallbackSearchQueries'),
    pickFunction(script, 'isUnknownArtistName'),
    pickFunction(script, 'hasArtistMatch'),
    pickFunction(script, 'canRelaxKuwoArtistMatch'),
    pickFunction(script, 'getFallbackMatchTier'),
    pickFunction(script, 'getFallbackMatchScore'),
    pickFunction(script, 'pickFallbackTrackMatch'),
    pickFunction(script, 'getFallbackTrackMatches'),
    pickFunction(script, 'resolvePlayableFallbackCandidate'),
    pickFunction(script, 'resolveFallbackTrackFromSource'),
    pickFunction(script, 'recoverPlayableTrackUrl')
  ].join('\n'), sandbox);
  return sandbox;
}

function verifyUnknownKuwoArtistDoesNotMatchKnownWrongArtist(file) {
  const sandbox = loadMatchSandbox(file);
  const target = {
    title: '偏偏喜欢你',
    artist: '未知歌手',
    source: 'kuwo',
    sourceLabel: '酷我音乐'
  };
  const wrong = {
    title: '偏偏喜欢你',
    artist: '张国荣',
    source: 'joox',
    sourceLabel: 'Joox',
    urlId: 'wrong-artist'
  };
  if (sandbox.getFallbackMatchScore(target, wrong, 0) >= 0) {
    throw new Error(file + ' should not cross-match Kuwo unknown-artist tracks to a known different artist by title only');
  }
}

function verifyArtistSubstringDoesNotCountAsSameSinger(file) {
  const sandbox = loadMatchSandbox(file);
  const target = { title: '偏偏喜欢你', artist: '陈百强', source: 'kuwo' };
  const cover = { title: '偏偏喜欢你', artist: '陈百强翻唱', source: 'joox', urlId: 'cover' };
  if (sandbox.getFallbackMatchScore(target, cover, 0) >= 0) {
    throw new Error(file + ' should not treat artist substrings such as 陈百强翻唱 as the original singer');
  }
}

function verifyTrackMatchRejectsWeakArtistMetadata(file) {
  const sandbox = loadMatchSandbox(file);
  const target = { title: '偏偏喜欢你', artist: '陈百强', source: 'kuwo' };
  const emptyArtist = { title: '偏偏喜欢你', artist: '', source: 'joox', urlId: 'empty-artist' };
  const coverArtist = { title: '偏偏喜欢你', artist: '陈百强翻唱', source: 'joox', urlId: 'cover-artist' };
  const traditional = { title: '偏偏喜歡你', artist: '陳百強', source: 'joox', urlId: 'traditional' };
  const duetTarget = { title: '相约到永久', artist: '张学友 / 陈慧娴', source: 'kuwo' };
  const duetCandidate = { title: '相约到永久', artist: '張學友', source: 'joox', urlId: 'duet' };

  if (sandbox.isTrackMatchCandidate(target, emptyArtist)) {
    throw new Error(file + ' should not accept exact-title fallback candidates with missing artist metadata');
  }
  if (sandbox.isTrackMatchCandidate(target, coverArtist)) {
    throw new Error(file + ' should not accept artist substring matches such as 陈百强翻唱');
  }
  if (!sandbox.isTrackMatchCandidate(target, traditional)) {
    throw new Error(file + ' should still match simplified/traditional exact artist metadata');
  }
  if (!sandbox.isTrackMatchCandidate(duetTarget, duetCandidate)) {
    throw new Error(file + ' should still match shared artists from multi-artist metadata');
  }
}

async function verifyTopRankedCandidateIsNotStolenByFasterLooseCandidate(file) {
  const sandbox = loadMatchSandbox(file, {
    fetchExternalSourceTracks() {
      return Promise.resolve([
        {
          title: '偏偏喜欢你',
          artist: '陈百强',
          source: 'joox',
          sourceLabel: 'Joox',
          urlId: 'exact'
        },
        {
          title: '偏偏喜欢你 (翻唱版)',
          artist: '陈百强',
          source: 'joox',
          sourceLabel: 'Joox',
          urlId: 'loose'
        }
      ]);
    },
    resolveExternalTrackUrl(track) {
      if (track && track.urlId === 'exact') {
        return new Promise((resolve) => setTimeout(() => resolve('https://cdn.example.test/exact.mp3'), 80));
      }
      if (track && track.urlId === 'loose') {
        return new Promise((resolve) => setTimeout(() => resolve('https://cdn.example.test/loose.mp3'), 5));
      }
      return Promise.resolve('');
    }
  });
  const track = {
    title: '偏偏喜欢你',
    artist: '陈百强',
    source: 'kuwo',
    sourceLabel: '酷我音乐',
    src: 'https://cdn.example.test/failed-kuwo.mp3'
  };
  const result = await sandbox.resolveFallbackTrackFromSource(track, 'joox', ['https://cdn.example.test/failed-kuwo.mp3'], 12);
  if (!result || result.url !== 'https://cdn.example.test/exact.mp3' || result.match.urlId !== 'exact') {
    throw new Error(file + ' should prefer the top-ranked exact fallback candidate over a faster loose candidate');
  }
}

(async () => {
  for (const file of ['index.html', 'js/app.js', 'dist/index.html']) {
    verifyUnknownKuwoArtistDoesNotMatchKnownWrongArtist(file);
    verifyArtistSubstringDoesNotCountAsSameSinger(file);
    verifyTrackMatchRejectsWeakArtistMetadata(file);
    await verifyTopRankedCandidateIsNotStolenByFasterLooseCandidate(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
