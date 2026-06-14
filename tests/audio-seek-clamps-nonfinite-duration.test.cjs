const fs = require('fs');
const vm = require('vm');

function getInlineScript(file) {
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
  for (let end = start; end < script.length; end += 1) {
    const char = script[end];
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
      if (opened && depth === 0) return script.slice(start, end + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

function createSandbox(audioDuration, trackDuration) {
  const styleWrites = [];
  const sandbox = {
    audioPlayer: {
      duration: audioDuration,
      currentTime: 0
    },
    currentTrack: {
      duration: trackDuration
    },
    currentTimeText: '',
    miniProgress: [],
    styleWrites,
    document: {
      getElementById(id) {
        if (id === 'full-seek') {
          return {
            getBoundingClientRect() {
              return { left: 0, width: 100 };
            }
          };
        }
        if (id === 'seek-line') {
          return {
            getBoundingClientRect() {
              return { left: 0, width: 100 };
            },
            style: {
              setProperty(name, value) {
                styleWrites.push({ name, value });
              }
            }
          };
        }
        if (id === 'current-time') {
          return {
            set textContent(value) {
              sandbox.currentTimeText = value;
            },
            get textContent() {
              return sandbox.currentTimeText;
            }
          };
        }
        return null;
      }
    },
    updateMiniProgress(value) {
      sandbox.miniProgress.push(value);
    }
  };
  vm.createContext(sandbox);
  return sandbox;
}

for (const file of ['index.html', 'dist/index.html']) {
  const script = getInlineScript(file);
  for (const marker of [
    'function getSeekableDuration',
    'function clampSeekTime',
    'function seekAudioToTime'
  ]) {
    if (!script.includes(marker)) {
      throw new Error(file + ' is missing seek safety helper marker: ' + marker);
    }
  }
  if (script.includes('audioPlayer.currentTime = details.seekTime')) {
    throw new Error(file + ' still writes raw MediaSession seekTime directly');
  }
  if (!script.includes('seekAudioToTime(details.seekTime)')) {
    throw new Error(file + ' should route MediaSession seekto through seekAudioToTime');
  }

  const functions = [
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'formatDuration'),
    pickFunction(script, 'getSeekableDuration'),
    pickFunction(script, 'clampSeekTime'),
    pickFunction(script, 'seekAudioToTime'),
    pickFunction(script, 'applySeekFromClientX')
  ].join('\n');

  const fallbackSandbox = createSandbox(Infinity, 200);
  vm.runInContext(functions, fallbackSandbox);
  if (fallbackSandbox.getSeekableDuration() !== 200) {
    throw new Error(file + ' should ignore non-finite audio duration and use track duration');
  }
  fallbackSandbox.applySeekFromClientX(50);
  if (fallbackSandbox.audioPlayer.currentTime !== 100) {
    throw new Error(file + ' should clamp pointer seek against the finite track duration');
  }
  if (fallbackSandbox.styleWrites.at(-1).value !== '50%') {
    throw new Error(file + ' should render clamped pointer seek progress');
  }

  const noDurationSandbox = createSandbox(Infinity, Infinity);
  vm.runInContext(functions, noDurationSandbox);
  noDurationSandbox.applySeekFromClientX(50);
  if (noDurationSandbox.audioPlayer.currentTime !== 0 || noDurationSandbox.styleWrites.length) {
    throw new Error(file + ' should ignore pointer seek when no finite duration is available');
  }

  const mediaSandbox = createSandbox(120, 300);
  vm.runInContext(functions, mediaSandbox);
  if (mediaSandbox.clampSeekTime(999, 120) !== 120) {
    throw new Error(file + ' should clamp seek values above duration');
  }
  if (mediaSandbox.clampSeekTime(-10, 120) !== 0) {
    throw new Error(file + ' should clamp negative seek values to zero');
  }
  mediaSandbox.seekAudioToTime(Infinity);
  if (mediaSandbox.audioPlayer.currentTime !== 0) {
    throw new Error(file + ' should not write non-finite seekTime to audio currentTime');
  }
  mediaSandbox.seekAudioToTime(999);
  if (mediaSandbox.audioPlayer.currentTime !== 120) {
    throw new Error(file + ' should clamp MediaSession seekTime to the seekable duration');
  }
}
