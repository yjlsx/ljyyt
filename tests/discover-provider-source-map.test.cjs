const path = require('path');
const fs = require('fs');
const vm = require('vm');

function getInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const srcMatch = html.match(/<script[^>]*\bsrc=["'']([^"']*app\.js)["'']/i);
  if (srcMatch) {
    const appJsPath = path.join(path.dirname(file), srcMatch[1]);
    if (fs.existsSync(appJsPath)) {
      return fs.readFileSync(appJsPath, 'utf8');
    }
  }
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(file + ' is missing inline application script');
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
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
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
  const start = source.indexOf('const ' + name + ' =');
  if (start < 0) throw new Error('Missing const object ' + name);
  const open = source.indexOf('{', start);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(open, index + 1);
    }
  }
  throw new Error('Could not parse const object ' + name);
}

function evaluateProviderMap(script) {
  return vm.runInNewContext('(' + pickConstObject(script, 'providerSourceMap') + ')');
}

function getActiveSearchSources(script, provider, aggregateSources) {
  const sandbox = { aggregatedSources: aggregateSources.slice() };
  vm.createContext(sandbox);
  vm.runInContext([
    'var activeProvider = ' + JSON.stringify(provider) + ';',
    'const providerSourceMap = ' + pickConstObject(script, 'providerSourceMap') + ';',
    pickFunction(script, 'getActiveSearchSources'),
    'this.sources = getActiveSearchSources();'
  ].join('\n'), sandbox);
  return sandbox.sources;
}

for (const file of ['index.html', 'dist/index.html']) {
  const script = getInlineScript(file);
  const providerMap = evaluateProviderMap(script);

  if (providerMap['网易云音乐'] !== 'netease') {
    throw new Error(file + ' should keep 网易云音乐 mapped to the primary netease source');
  }

  if (providerMap['QQ音乐'] !== 'qq') {
    throw new Error(file + ' should map the QQ provider option to the qq source');
  }

  if (providerMap.Netease !== '_netease') {
    throw new Error(file + ' should map the Netease provider option to the backup _netease source');
  }

  const backupSources = getActiveSearchSources(script, 'Netease', ['kuwo', '_netease']);
  if (backupSources.length !== 1 || backupSources[0] !== '_netease') {
    throw new Error(file + ' should search only _netease after selecting the Netease provider');
  }

  const aggregateSources = getActiveSearchSources(script, '聚合搜索', ['kuwo', '_netease']);
  if (aggregateSources.join(',') !== 'kuwo,_netease') {
    throw new Error(file + ' should leave aggregate search backed by the selected aggregate sources');
  }
}
