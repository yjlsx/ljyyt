const fs = require('fs');
const vm = require('vm');

function getInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(file + ' is missing the main inline script');
  return match[1];
}

function pickFunction(script, name) {
  const marker = 'function ' + name;
  const start = script.indexOf(marker);
  if (start < 0) throw new Error('Could not find function ' + name);
  let depth = 0;
  let inString = null;
  let escaped = false;
  for (let i = start; i < script.length; i += 1) {
    const char = script[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === inString) {
        inString = null;
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      inString = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return script.slice(start, i + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

function createSandbox(file, overrides = {}) {
  const script = getInlineScript(file);
  const sandbox = {
    encodeURIComponent,
    URL,
    ljyytApiBase: 'https://worker.example',
    audioApiEndpoint: '',
    useSameOriginAudioApi: false,
    _isLocalDev: false,
    ...overrides
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'normalizeAudioUrl'),
    pickFunction(script, 'getAudioProxyUrl')
  ].join('\n'), sandbox);
  return sandbox;
}

const rawAudioUrl = 'https://music.example/song.mp3?token=a&amp;b=2';
const encodedAudioUrl = encodeURIComponent('https://music.example/song.mp3?token=a&b=2');

for (const file of ['index.html', 'dist/index.html']) {
  let sandbox = createSandbox(file, {
    audioApiEndpoint: 'https://audio.example/proxy'
  });
  let proxyUrl = sandbox.getAudioProxyUrl(rawAudioUrl);
  if (proxyUrl !== 'https://audio.example/proxy?url=' + encodedAudioUrl) {
    throw new Error(file + ' getAudioProxyUrl should use window.AUDIO_API_ENDPOINT when configured, got: ' + proxyUrl);
  }

  sandbox = createSandbox(file, {
    useSameOriginAudioApi: true
  });
  proxyUrl = sandbox.getAudioProxyUrl(rawAudioUrl);
  if (proxyUrl !== '/api/audio-proxy?url=' + encodedAudioUrl) {
    throw new Error(file + ' getAudioProxyUrl should respect LJYYT_ENABLE_SAME_ORIGIN_AUDIO_API outside local dev, got: ' + proxyUrl);
  }

  sandbox = createSandbox(file);
  proxyUrl = sandbox.getAudioProxyUrl(rawAudioUrl);
  if (proxyUrl !== 'https://worker.example/api/audio-proxy?url=' + encodedAudioUrl) {
    throw new Error(file + ' getAudioProxyUrl should keep using LJYYT_API_BASE by default on static deployments, got: ' + proxyUrl);
  }
}
