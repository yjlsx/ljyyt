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

function pickConstObject(source, name) {
  const start = source.indexOf('const ' + name + ' = {');
  if (start < 0) throw new Error('Missing const object ' + name);
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
      if (opened && depth === 0) {
        let end = index + 1;
        if (source.slice(end, end + 1) === ';') end += 1;
        return source.slice(start, end);
      }
    }
  }
  throw new Error('Could not parse const object ' + name);
}

function pickConstArray(source, name) {
  const start = source.indexOf('const ' + name + ' = [');
  if (start < 0) throw new Error('Missing const array ' + name);
  const end = source.indexOf('];', start);
  if (end < 0) throw new Error('Could not read const array ' + name);
  return source.slice(start, end + 2);
}

function makeOption(provider) {
  return {
    dataset: { provider },
    classList: { toggle() {} },
    style: {},
    hidden: false,
    disabled: false
  };
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

  const pickerOptions = [
    makeOption('聚合搜索'),
    makeOption('丽江曲库'),
    makeOption('Joox'),
    makeOption('QQ音乐'),
    makeOption('B站')
  ];
  const pickerSandbox = {
    sourceConfigs: [
      { source: 'bilibili', enabled: true, showInPicker: true },
      { source: 'qq', enabled: true, showInPicker: true },
      { source: 'joox', enabled: true, showInPicker: true },
      { source: 'local', enabled: true, showInPicker: true }
    ],
    activeProvider: '聚合搜索',
    sourceMenu: { classList: { remove() {} } },
    document: {
      querySelectorAll(selector) {
        return selector === '.source-option' ? pickerOptions : [];
      },
      getElementById(id) {
        if (id === 'provider-label') return { textContent: '' };
        return null;
      },
      querySelector() {
        return null;
      }
    },
    getSourceConfig(source) {
      return pickerSandbox.sourceConfigs.find((item) => item.source === source) || null;
    }
  };
  vm.createContext(pickerSandbox);
  vm.runInContext([
    pickConstObject(script, 'providerSourceMap'),
    pickFunction(script, 'syncProviderSelection'),
    pickFunction(script, 'refreshProviderOptionsVisibility'),
    'refreshProviderOptionsVisibility();'
  ].join('\n'), pickerSandbox);

  const ordersByProvider = Object.fromEntries(pickerOptions.map((item) => [item.dataset.provider, item.style.order]));
  if (ordersByProvider['B站'] !== '0' || ordersByProvider['QQ音乐'] !== '1' || ordersByProvider['Joox'] !== '2' || ordersByProvider['丽江曲库'] !== '3') {
    throw new Error(file + ' should order search source picker options exactly like sourceConfigs');
  }
  if (!(Number(ordersByProvider['聚合搜索']) < Number(ordersByProvider['B站']))) {
    throw new Error(file + ' should keep aggregate search as the first picker option');
  }
}

for (const file of ['index.html', 'dist/index.html']) {
  verifySourceConfig(file);
}
