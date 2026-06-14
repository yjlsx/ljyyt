const fs = require('fs');
const vm = require('vm');

function getInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(file + ' is missing its inline app script');
  return match[1];
}

function pickFunction(source, name) {
  let start = source.indexOf('function ' + name);
  if (start > 6 && source.slice(start - 6, start) === 'async ') start -= 6;
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

async function verifyFallback(file) {
  const script = getInlineScript(file);
  const calls = [];
  const sandbox = {
    fetch: async (url) => {
      calls.push(url);
      if (calls.length === 1) {
        return {
          ok: true,
          json: async () => ({ ok: true, service: 'ljyyt-worker' })
        };
      }
      return {
        ok: true,
        json: async () => ({ data: { playlists: [{ id: 1, name: 'Fallback' }] } })
      };
    }
  };
  vm.createContext(sandbox);
  await vm.runInContext([
    "const neteaseApiBase = 'https://primary.example/api/netease';",
    "const neteaseFallbackBases = ['https://otter-music.pages.dev/music-api/netease'];",
    pickFunction(script, 'getNeteaseRequestBases'),
    pickFunction(script, 'isNeteaseProxyHealthPayload'),
    pickFunction(script, 'fetchOtterNetease'),
    "fetchOtterNetease('/playlists', { cat: '全部' }).then(function(result) { this.result = result; }.bind(this));"
  ].join('\n'), sandbox);

  if (calls.length !== 2) {
    throw new Error(file + ' should retry the Otter NetEase fallback after a stale proxy health payload');
  }
  if (calls[0] !== 'https://primary.example/api/netease/playlists') {
    throw new Error(file + ' should try the configured NetEase API base first');
  }
  if (calls[1] !== 'https://otter-music.pages.dev/music-api/netease/playlists') {
    throw new Error(file + ' should fall back to the direct Otter NetEase API');
  }
  if (!sandbox.result || !sandbox.result.data || sandbox.result.data.playlists[0].name !== 'Fallback') {
    throw new Error(file + ' should return the fallback NetEase payload');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await verifyFallback(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
