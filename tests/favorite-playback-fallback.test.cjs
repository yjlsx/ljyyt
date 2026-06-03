const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];

for (const name of [
  'normalizeTrackText',
  'inferTrackSourceCandidates',
  'isTrackMatchCandidate',
  'normalizeExternalTrack',
  'fetchGdMusicJson',
  'fetchExternalSourceTracks',
  'recoverPlayableTrackUrl'
]) {
  if (!script.includes('function ' + name)) {
    throw new Error('Missing function ' + name);
  }
}

const pickFunction = (name) => {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let end = start;
  let opened = false;
  for (; end < script.length; end++) {
    const char = script[end];
    if (char === '{') {
      depth++;
      opened = true;
    } else if (char === '}') {
      depth--;
      if (opened && depth === 0) {
        end++;
        break;
      }
    }
  }
  return script.slice(start, end);
};

const sandbox = {
  console: { warn: function() {}, log: function() {}, error: function() {} },
  DEFAULT_COVER: 'cover.jpg',
  gdMusicApiBase: '/api/gd-music',
  gdMusicFallbackBases: ['https://music-api.example.test/api.php'],
  _isLocalDev: true,
  AbortController,
  DOMException,
  setTimeout,
  clearTimeout,
  aggregatedSources: ['local', 'joox', 'netease', 'kuwo'],
  safeCover(value) {
    return value || 'cover.jpg';
  },
  getSourceLabel(source) {
    return { joox: 'Joox', netease: '网易云音乐', kuwo: '酷我音乐' }[source] || source;
  },
  async fetch(url) {
    const parsed = new URL(url);
    const source = parsed.searchParams.get('source');
    const query = parsed.searchParams.get('name');
    sandbox.calls.push({ query, source });
    return {
      ok: true,
      async json() {
        if (source !== 'joox') return [];
        return [{
          id: '123',
          name: 'My Soul',
          artist: ['July'],
          album: 'Beyond The Memory',
          source: 'joox',
          url_id: '123'
        }];
      }
    };
  },
  async resolveExternalTrackUrl(track) {
    return track && track.urlId === '123' ? 'https://cdn.example.com/my-soul.mp3' : '';
  },
  calls: []
};

vm.createContext(sandbox);
vm.runInContext([
  pickFunction('normalizeTrackText'),
  pickFunction('inferTrackSourceCandidates'),
  pickFunction('isTrackMatchCandidate'),
  pickFunction('normalizeExternalTrack'),
  pickFunction('fetchGdMusicJson'),
  pickFunction('fetchExternalSourceTracks'),
  pickFunction('recoverPlayableTrackUrl')
].join('\n'), sandbox);

(async () => {
  if (!sandbox.isTrackMatchCandidate(
    { title: 'My Soul', artist: 'July' },
    { title: 'My Soul (Instrumental|Bonus Track)', artist: 'July' }
  )) {
    throw new Error('Expected title variants with the same artist to match');
  }
  const favorite = { title: 'My Soul', artist: 'July', sourceLabel: 'Joox', src: '' };
  const url = await sandbox.recoverPlayableTrackUrl(favorite);
  if (url !== 'https://cdn.example.com/my-soul.mp3') {
    throw new Error('Expected recovered playback URL, got ' + url);
  }
  if (favorite.src !== url || favorite.source !== 'joox' || favorite.urlId !== '123') {
    throw new Error('Expected favorite track to be hydrated with playable source metadata');
  }
  if (!sandbox.calls.length || sandbox.calls[0].source !== 'joox') {
    throw new Error('Expected sourceLabel to prioritize Joox recovery');
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
