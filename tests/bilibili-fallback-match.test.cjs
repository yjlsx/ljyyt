const fs = require('fs');
const vm = require('vm');

function pickFunction(script, name) {
  const start = script.indexOf('function ' + name);
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

function verifyBilibiliMatch(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    appSettings: {
      bilibiliMatchKeywords: ''
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getBilibiliMatchKeywords'),
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
    pickFunction(script, 'getFallbackMatchScore'),
    pickFunction(script, 'getFallbackTrackMatches')
  ].join('\n'), sandbox);

  const target = { title: '山海', artist: '草东没有派对' };
  const candidates = [
    { source: 'bilibili', title: '4K现场 草东没有派对 山海 伍佰联唱', artist: '音乐现场', album: '热门投稿', urlId: 'bv-ok' },
    { source: 'bilibili', title: '山海纯音乐翻弹', artist: '吉他社', album: '翻弹', urlId: 'bv-wrong' }
  ];
  const matches = sandbox.getFallbackTrackMatches(target, candidates);
  if (!matches.length || matches[0].urlId !== 'bv-ok') {
    throw new Error(file + ' should match Bilibili candidates by combined title/artist/album text');
  }
  if (sandbox.getFallbackMatchScore(target, candidates[1], 0) >= 0) {
    throw new Error(file + ' should reject Bilibili candidates missing the target artist in their searchable blob');
  }

  sandbox.appSettings.bilibiliMatchKeywords = '翻弹';
  if (sandbox.getFallbackMatchScore(target, candidates[1], 0) < 0) {
    throw new Error(file + ' should allow user-defined Bilibili match keywords to loosen artist matching');
  }
}

for (const file of ['index.html', 'dist/index.html']) {
  verifyBilibiliMatch(file);
}
