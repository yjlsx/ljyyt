const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];

  const setQueueStart = script.indexOf('function setQueue(tracks, index)');
  if (setQueueStart < 0) {
    throw new Error(file + ' is missing setQueue');
  }
  const setQueueBody = script.slice(setQueueStart, script.indexOf('var _lastSaveTime', setQueueStart));
  if (!setQueueBody.includes('currentTrackIndex = queueIndex')) {
    throw new Error(file + ' does not keep currentTrackIndex in sync when setting a queue');
  }

  const previousStart = script.indexOf('function previousTrack');
  const nextStart = script.indexOf('function nextTrack');
  const endedStart = script.indexOf('async function handleTrackEnded');
  if (previousStart < 0 || nextStart < 0 || endedStart < 0) {
    throw new Error(file + ' is missing queue navigation functions');
  }

  const previousBody = script.slice(previousStart, nextStart);
  const nextBody = script.slice(nextStart, endedStart);
  if (!previousBody.includes('playTrackAt(queueIndex - 1)')) {
    throw new Error(file + ' previousTrack does not navigate from the active queue index');
  }
  if (!nextBody.includes('playTrackAt(queueIndex + 1)')) {
    throw new Error(file + ' nextTrack does not navigate from the active queue index');
  }
}

const entryFunctions = [
  'function playPlaylist',
  'function playUserPlaylistAll',
  'function playUserPlaylistTrack',
  'function playFirstHistory',
  'function playFirstMarketPlaylist',
  'function playFirstFavorite',
  'function playQueueFromPage'
];

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  for (const signature of entryFunctions) {
    const start = script.indexOf(signature);
    if (start < 0) {
      throw new Error(file + ' is missing ' + signature);
    }
    const after = script.slice(start);
    const closingIndex = after.indexOf('\n    }\n');
    if (closingIndex < 0) {
      throw new Error(file + ' could not parse end of ' + signature);
    }
    const body = after.slice(0, closingIndex);
    if (!body.includes('setQueue(')) {
      throw new Error(file + ' ' + signature + ' does not call setQueue');
    }
    if (/\bplayQueue\s*=\s*/.test(body)) {
      throw new Error(file + ' ' + signature + ' assigns playQueue directly instead of using setQueue');
    }
    if (/\bqueueIndex\s*=\s*(?:index|trackIndex|0)/.test(body)) {
      throw new Error(file + ' ' + signature + ' still assigns queueIndex outside setQueue');
    }
  }
}
