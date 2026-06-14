const fs = require('fs');
const vm = require('vm');

function getInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(file + ' is missing its inline app script');
  return match[1];
}

function pickFunction(source, name) {
  const start = source.indexOf('function ' + name);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
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
      if (opened && depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

function pickConstArray(source, name) {
  const start = source.indexOf('const ' + name + ' = [');
  if (start < 0) throw new Error('Missing const array ' + name);
  const end = source.indexOf('];', start);
  if (end < 0) throw new Error('Could not read const array ' + name);
  return source.slice(start, end + 2);
}

function verifySourceConfig(file) {
  const script = getInlineScript(file);
  const sandbox = {
    stored: {},
    localStorage: {
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(sandbox.stored, key) ? sandbox.stored[key] : null;
      },
      setItem(key, value) {
        sandbox.stored[key] = String(value);
      },
      removeItem(key) {
        delete sandbox.stored[key];
      }
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickConstArray(script, 'sourceDisplayOrder'),
    pickConstArray(script, 'defaultEnabledSources'),
    pickFunction(script, 'readStoredJson'),
    pickFunction(script, 'readStoredList'),
    pickFunction(script, 'writeStoredList'),
    pickFunction(script, 'writeStoredJson'),
    pickFunction(script, 'normalizeSourceConfigs'),
    pickFunction(script, 'readSourceConfigs'),
    pickFunction(script, 'getEnabledSourceOrder'),
    pickFunction(script, 'getSourceConfig'),
    pickFunction(script, 'saveSourceConfigs'),
    "this.sourceConfigs = normalizeSourceConfigs([{ source: 'bilibili', enabled: true, showInPicker: false }, { source: 'qq', enabled: true }, { source: 'joox', enabled: true }], ['kuwo', 'netease']);",
    'this.enabledBefore = getEnabledSourceOrder();',
    "this.biliConfig = getSourceConfig('bilibili');",
    'saveSourceConfigs();'
  ].join('\n'), sandbox);

  if (sandbox.enabledBefore.join(',') !== 'bilibili,qq,joox,kuwo,netease') {
    throw new Error(file + ' should preserve saved source order before appending missing sources');
  }
  if (!sandbox.biliConfig || sandbox.biliConfig.showInPicker !== false) {
    throw new Error(file + ' should preserve picker visibility per source');
  }
  const storedConfigs = JSON.parse(sandbox.stored.ljyyt_otter_source_configs || '[]');
  const storedAggregate = JSON.parse(sandbox.stored.ljyyt_otter_aggregated_sources || '[]');
  if (!storedConfigs.some((item) => item.source === 'bilibili' && item.showInPicker === false)) {
    throw new Error(file + ' should persist source picker visibility');
  }
  if (storedAggregate.join(',') !== 'bilibili,qq,joox,kuwo,netease') {
    throw new Error(file + ' should keep legacy aggregate source storage in sync');
  }
}

for (const file of ['index.html', 'dist/index.html']) {
  verifySourceConfig(file);
}
