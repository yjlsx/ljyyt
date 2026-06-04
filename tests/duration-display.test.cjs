const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];

const pickFunction = (name) => {
  let start = script.indexOf('function ' + name);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let opened = false;
  for (let end = start; end < script.length; end++) {
    const char = script[end];
    if (char === '{') {
      depth++;
      opened = true;
    } else if (char === '}') {
      depth--;
      if (opened && depth === 0) return script.slice(start, end + 1);
    }
  }
  throw new Error('Could not read function ' + name);
};

for (const file of ['index.html', 'dist/index.html']) {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('function parseTrackDuration')) {
    throw new Error(file + ' is missing duration normalization');
  }
  if (!content.includes('duration: parseTrackDuration(track.duration)')) {
    throw new Error(file + ' does not normalize duration when setting current track');
  }
  if (!content.includes('var existingDuration = currentTrack && isSameTrack(track, currentTrack) ? currentTrack.duration : 0')) {
    throw new Error(file + ' can still inherit a previous song duration');
  }
  if (content.includes("formatDuration(track.duration || audioPlayer.duration)")) {
    throw new Error(file + ' can still show stale audio duration before new metadata loads');
  }
  if (!content.includes('duration: parseTrackDuration(track.duration || track.interval || track.time || track.dt || track.length)')) {
    throw new Error(file + ' does not carry external search result durations');
  }
  if (!content.includes("audioPlayer.addEventListener('durationchange'")) {
    throw new Error(file + ' does not refresh the duration when audio metadata changes');
  }
  if (!content.includes('function updateAudioDurationUi')) {
    throw new Error(file + ' does not centralize audio duration display updates');
  }
}

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext([
  pickFunction('parseTrackDuration'),
  pickFunction('formatDuration')
].join('\n'), sandbox);

if (sandbox.parseTrackDuration('3:43') !== 223) {
  throw new Error('Expected 3:43 to normalize to 223 seconds');
}
if (sandbox.parseTrackDuration(223000) !== 223) {
  throw new Error('Expected millisecond duration to normalize to seconds');
}
if (sandbox.formatDuration('3:43') !== '3:43') {
  throw new Error('Expected formatted duration strings to display intact');
}
