const fs = require('fs');
const vm = require('vm');

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
      if (opened && depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    favoriteTracks: [
      { title: '不匹配的第一首', artist: '歌手 A', album: '', src: 'a.mp3' },
      { title: '香港之歌', artist: '歌手 B', album: '', src: 'b.mp3' }
    ],
    queued: null,
    current: null,
    opened: false,
    played: false,
    navigated: '',
    document: {
      getElementById(id) {
        if (id !== 'favorite-search-input') return null;
        return { value: '香港' };
      }
    },
    setQueue(tracks, index) {
      sandbox.queued = { tracks: tracks.slice(), index };
    },
    setCurrentTrack(track) {
      sandbox.current = track;
    },
    openFullPlayer() {
      sandbox.opened = true;
    },
    playCurrentTrack() {
      sandbox.played = true;
    },
    showView(view) {
      sandbox.navigated = view;
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'getFavoriteSearchQuery'),
    pickFunction(script, 'getVisibleFavoriteTracks'),
    pickFunction(script, 'playFirstFavorite')
  ].join('\n'), sandbox);

  sandbox.playFirstFavorite();

  if (!sandbox.queued || sandbox.queued.tracks.length !== 1 || sandbox.queued.tracks[0].title !== '香港之歌') {
    throw new Error(file + ' should queue the filtered favorite results when favorite search is active');
  }
  if (!sandbox.current || sandbox.current.title !== '香港之歌') {
    throw new Error(file + ' should start playback from the first visible favorite result');
  }
  if (!sandbox.opened || !sandbox.played) {
    throw new Error(file + ' should open the player and start playback for the filtered favorite result');
  }
  if (sandbox.navigated) {
    throw new Error(file + ' should not navigate away when filtered favorites have results');
  }
}
