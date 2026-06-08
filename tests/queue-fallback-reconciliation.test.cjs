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

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    console: { warn() {}, log() {}, error() {} },
    Math,
    renderCount: 0,
    scrollCount: 0
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'getTrackKey'),
    pickFunction(script, 'isSameTrack'),
    pickFunction(script, 'setQueue'),
    pickFunction(script, 'syncQueueIndexToCurrentTrack'),
    pickFunction(script, 'reconcileCurrentTrackInQueue'),
    pickFunction(script, 'reshuffleQueue')
  ].join('\n') + `
    function renderQueue() { renderCount += 1; }
    function scrollCurrentQueueItemIntoView() { scrollCount += 1; }

    currentTrack = {
      title: '偏偏喜欢你',
      artist: '陈百强',
      source: 'kuwo',
      sourceLabel: '酷我音乐',
      urlId: 'kuwo-2',
      src: 'https://bad.example/kuwo.mp3'
    };
    var previousTrack = Object.assign({}, currentTrack);
    playQueue = [
      { title: '香港', artist: '群星', source: 'joox', urlId: 'other', src: 'https://cdn.example/other.mp3' },
      Object.assign({}, currentTrack),
      { title: '下一首', artist: '群星', source: 'local', src: 'local-next.mp3' }
    ];
    queueIndex = 1;
    currentTrackIndex = 1;

    Object.assign(currentTrack, {
      source: 'joox',
      sourceLabel: 'Joox',
      urlId: 'joox-2',
      src: 'https://cdn.example/joox.mp3'
    });
    reconcileCurrentTrackInQueue(previousTrack);

    if (!isSameTrack(playQueue[queueIndex], currentTrack)) {
      throw new Error('fallback did not update the active queue item');
    }
    if (playQueue[queueIndex].source !== 'joox' || playQueue[queueIndex].urlId !== 'joox-2') {
      throw new Error('active queue item still points at the failed source');
    }
    if (playQueue.some(function(item) { return item.source === 'kuwo' || item.urlId === 'kuwo-2'; })) {
      throw new Error('queue still contains the failed source after fallback');
    }

    reshuffleQueue({ stopPropagation() {} });
    if (!isSameTrack(playQueue[0], currentTrack)) {
      throw new Error('reshuffleQueue did not keep the reconciled current track first');
    }
    if (playQueue.some(function(item) { return item.source === 'kuwo' || item.urlId === 'kuwo-2'; })) {
      throw new Error('reshuffleQueue reintroduced the failed source');
    }
    if (queueIndex !== 0 || currentTrackIndex !== 0) {
      throw new Error('reshuffleQueue left queue indexes out of sync');
    }
  `, sandbox);
}
