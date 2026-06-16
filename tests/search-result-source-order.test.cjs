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
  if (start < 0) throw new Error('Missing const object ' + name);
  const end = script.indexOf('};', start);
  if (end < 0) throw new Error('Could not read const object ' + name);
  return script.slice(start, end + 2);
}

function pickConstAssignment(script, name) {
  const start = script.indexOf('const ' + name + ' = ');
  if (start < 0) throw new Error('Missing const ' + name);
  const end = script.indexOf('};', start);
  if (end < 0) throw new Error('Could not read const ' + name);
  return script.slice(start, end + 2);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    activeProvider: '聚合搜索',
    getEnabledSourceOrder() {
      return ['kuwo', 'qq', 'netease'];
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'providerSourceMap'),
    pickConstAssignment(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getActiveSearchSources'),
    pickFunction(script, 'deduplicateSearchResults'),
    pickFunction(script, 'getSourceLabel')
  ].join('\n'), sandbox);

  if (sandbox.getSourceLabel('kuwo') !== '酷我音乐' || sandbox.getSourceLabel('qq') !== 'QQ音乐') {
    throw new Error(file + ' should display source labels exactly like settings');
  }

  const results = sandbox.deduplicateSearchResults([
    { title: '香港', artist: '陈百强', source: 'qq', sourceLabel: 'QQ音乐' },
    { title: '香港', artist: '陈百强', source: 'kuwo', sourceLabel: '酷我音乐' },
    { title: '香港', artist: '陈百强', source: 'netease', sourceLabel: '网易云音乐' }
  ]);

  if (results.length !== 1 || results[0].source !== 'kuwo') {
    throw new Error(file + ' should prefer the enabled aggregate source order for the displayed search result');
  }
  if (!results[0].variants || results[0].variants.length !== 2) {
    throw new Error(file + ' should keep other sources as variants');
  }
}
