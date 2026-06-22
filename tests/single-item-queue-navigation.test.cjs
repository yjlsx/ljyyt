const fs = require('fs');
const vm = require('vm');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let opened = false;
  for (let end = start; end < script.length; end += 1) {
    const char = script[end];
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

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    const html = fs.readFileSync(file, 'utf8');
    const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
    const sandbox = {
      libraryFallbackCalls: 0,
      played: []
    };
    vm.createContext(sandbox);
    vm.runInContext([
      pickFunction(script, 'setQueue'),
      pickFunction(script, 'resetAutoSkipFailureCount'),
      pickFunction(script, 'playTrackAt')
    ].join('\n') + `
      currentTrack = { title: '队列里的单曲', artist: '歌手', src: 'queue.mp3' };
      playQueue = [currentTrack];
      queueIndex = 0;
      currentTrackIndex = 0;
      async function ensureLibraryTracks() {
        libraryFallbackCalls += 1;
        return [
          { title: '曲库第一首', artist: '其他歌手', src: 'library-1.mp3' },
          { title: '曲库第二首', artist: '其他歌手', src: 'library-2.mp3' }
        ];
      }
      function setCurrentTrack(track) {
        currentTrack = track;
        played.push(track.title);
      }
      async function playCurrentTrack() {}
      this.playNext = playTrackAt(1);
    `, sandbox);
    await sandbox.playNext;
    if (sandbox.libraryFallbackCalls !== 0) {
      throw new Error(file + ' should not fall back to the full library when a one-song queue is active');
    }
    if (sandbox.played[0] !== '队列里的单曲') {
      throw new Error(file + ' should loop the single active queue track, got ' + sandbox.played[0]);
    }
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
