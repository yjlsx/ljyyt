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

async function verifyTruncatedExternalAudioSwitchesBeforeEnded(file, knownDuration) {
  const script = getApplicationScript(file);
  const promptUrl = knownDuration
    ? 'https://cdn.example.test/kuwo-22s-prompt.mp3'
    : 'https://cdn.example.test/kuwo-30s-prompt.mp3';
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    Number,
    Math,
    setTimeout,
    clearTimeout,
    _playRequestId: knownDuration ? 41 : 42,
    _isResolvingUrl: false,
    _truncatedFallbackAttemptKey: '',
    currentTrack: {
      title: '偏偏喜欢你',
      artist: '陈百强',
      source: 'kuwo',
      sourceLabel: '酷我音乐',
      src: promptUrl,
      duration: knownDuration ? 240 : 0
    },
    audioPlayer: {
      _src: promptUrl,
      duration: knownDuration ? 22 : 30,
      paused: false,
      error: null,
      getAttribute(name) {
        return name === 'src' ? this._src : '';
      }
    },
    switchCalls: [],
    noPlayableCalls: [],
    document: {
      getElementById() {
        return { textContent: '' };
      }
    },
    updatePlayerMetaActions() {},
    async switchToFallbackSource(reason, requestId, failedUrl) {
      sandbox.switchCalls.push({ reason, requestId, failedUrl });
      return true;
    },
    async handleNoPlayableSource(reason, requestId) {
      sandbox.noPlayableCalls.push({ reason, requestId });
      return false;
    }
  };

  vm.createContext(sandbox);
  vm.runInContext([
    pickConstObject(script, 'TRADITIONAL_CHINESE_MAP'),
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'formatDuration'),
    pickFunction(script, 'normalizeTrackText'),
    pickFunction(script, 'getTrackFallbackKey'),
    pickFunction(script, 'normalizeAudioUrl'),
    pickFunction(script, 'isTruncatedAudioDuration'),
    pickFunction(script, 'shouldRejectExternalAudioDuration'),
    pickFunction(script, 'handleTruncatedPlaybackIfNeeded'),
    pickFunction(script, 'updateAudioDurationUi')
  ].join('\n'), sandbox);

  sandbox.updateAudioDurationUi();
  await new Promise((resolve) => setTimeout(resolve, 0));

  const expectedDuration = knownDuration ? 240 : 0;
  if (sandbox.currentTrack.duration !== expectedDuration) {
    throw new Error(file + ' should not overwrite track duration with prompt audio duration');
  }
  if (sandbox.switchCalls.length !== 1) {
    throw new Error(file + ' should immediately switch away from short external prompt audio');
  }
  const call = sandbox.switchCalls[0];
  if (call.reason !== 'truncated-audio' || call.failedUrl !== promptUrl) {
    throw new Error(file + ' should pass the prompt audio URL into truncated-audio fallback');
  }
  if (sandbox.noPlayableCalls.length) {
    throw new Error(file + ' should search another source before auto-skipping a truncated prompt');
  }
}

function verifyPlayingEventDoesNotResetFallbackState(file) {
  const script = getApplicationScript(file);
  const body = pickFunction(script, 'confirmAudioPlaying');
  if (body.includes('resetFallbackState(currentTrack)')) {
    throw new Error(file + ' should not reset fallback failures on the early playing event before audio is validated');
  }
}

(async () => {
  for (const file of ['index.html', 'js/app.js', 'dist/index.html']) {
    verifyPlayingEventDoesNotResetFallbackState(file);
    await verifyTruncatedExternalAudioSwitchesBeforeEnded(file, true);
    await verifyTruncatedExternalAudioSwitchesBeforeEnded(file, false);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
