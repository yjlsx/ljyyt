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
