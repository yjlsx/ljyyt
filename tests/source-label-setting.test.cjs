const fs = require('fs');
const vm = require('vm');

function pickFunction(script, name) {
  const start = script.indexOf('function ' + name);
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

  const helperBody = pickFunction(script, 'shouldShowSourceLabels');
  if (!helperBody.includes("appSettings.showSourceLabels !== false")) {
    throw new Error(file + ' shouldShowSourceLabels should read appSettings.showSourceLabels');
  }

  const searchBody = pickFunction(script, 'renderSearchRows');
  if (!searchBody.includes('shouldShowSourceLabels()')) {
    throw new Error(file + ' renderSearchRows should respect the show source labels setting');
  }

  const tracksBody = pickFunction(script, 'renderTrackRows');
  if (!tracksBody.includes('shouldShowSourceLabels()')) {
    throw new Error(file + ' renderTrackRows should respect the show source labels setting');
  }

  const queueBody = pickFunction(script, 'renderQueue');
  if (!queueBody.includes('shouldShowSourceLabels()')) {
    throw new Error(file + ' renderQueue should respect the show source labels setting');
  }

  const playlistBody = pickFunction(script, 'renderUserPlaylistDetail');
  if (!playlistBody.includes('shouldShowSourceLabels()')) {
    throw new Error(file + ' renderUserPlaylistDetail should respect the show source labels setting');
  }

  const toggleBody = pickFunction(script, 'toggleSetting');
  for (const marker of [
    "if (key === 'showSourceLabels') {",
    'renderSearchRows(currentSearchState.songs || [], activeProvider);',
    'renderFavorites();',
    'renderQueue();',
    'renderHistory();',
    'renderUserPlaylistDetail();'
  ]) {
    if (!toggleBody.includes(marker)) {
      throw new Error(file + ' toggleSetting should refresh source label surfaces after marker: ' + marker);
    }
  }

  const sandbox = {
    DEFAULT_COVER: 'cover.jpg',
    currentTrack: null,
    playQueue: [],
    queueIndex: 0,
    currentTrackIndex: 0,
    setQueue(tracks, index) {
      this.playQueue = tracks;
      this.queueIndex = index;
      this.currentTrackIndex = index;
    },
    updateTrackUi() {},
    updateLikeButton() {},
    renderQueue() {},
    loadLyricsForTrack() {},
    savePlaybackState() {},
    isSameTrack(a, b) {
      return a && b && String(a.id || a.title) === String(b.id || b.title);
    },
    audioPlayer: {
      _src: '',
      pause() {},
      getAttribute(name) {
        return name === 'src' ? this._src : '';
      },
      setAttribute(name, value) {
        if (name === 'src') this._src = value;
      },
      removeAttribute() {},
      load() {}
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'getSourceLabel'),
    pickFunction(script, 'parseTrackDuration'),
    pickFunction(script, 'setCurrentTrack'),
    'setCurrentTrack({ id: "kuwo-1", title: "偏偏喜欢你", artist: "陈百强", source: "kuwo", src: "https://example.test/song.mp3" });'
  ].join('\n'), sandbox);

  if (sandbox.currentTrack.sourceLabel !== '酷我音乐') {
    throw new Error(file + ' setCurrentTrack should derive external source labels from source, got ' + sandbox.currentTrack.sourceLabel);
  }
}
