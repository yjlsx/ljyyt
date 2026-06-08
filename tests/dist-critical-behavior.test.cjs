const fs = require('fs');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
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
  throw new Error('Could not parse function ' + name);
}

const indexScript = fs.readFileSync('index.html', 'utf8').match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
const distScript = fs.readFileSync('dist/index.html', 'utf8').match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];

const criticalMarkers = {
  fetchGdMusicJson: [
    'Promise.any',
    "setTimeout(function() { ac.abort(); }, 10000)",
    "if (!_isLocalDev && urls[0].indexOf(gdMusicApiBase) === 0) urls.shift()"
  ],
  performSearch: [
    "搜索中...",
    'renderSearchRows(localTracks, activeProvider)',
    'externalSources.forEach(function(source)',
    'pending--;',
    'deduplicateSearchResults(allTracks)'
  ],
  playCurrentTrack: [
    'unlockAudioContext();',
    'if (currentTrack.src) {',
    "showToast('当前音源暂时无法播放');",
    "showToast('播放失败，请重试或切换歌曲');"
  ],
  handleTrackAction: [
    "showToast(liked ? '已取消喜欢' : '已添加到喜欢', 1500)",
    "showToast('已添加到下一首播放', 1500)",
    'performSearch({ remember: true });'
  ],
  clearSearchHistory: [
    "showConfirm('确定清空搜索历史吗？'"
  ],
  clearCurrentQueue: [
    "showConfirm(msg, function()"
  ]
};

for (const [functionName, markers] of Object.entries(criticalMarkers)) {
  const indexBody = pickFunction(indexScript, functionName);
  const distBody = pickFunction(distScript, functionName);
  for (const marker of markers) {
    if (!indexBody.includes(marker)) {
      throw new Error('index.html ' + functionName + ' is missing critical marker: ' + marker);
    }
    if (!distBody.includes(marker)) {
      throw new Error('dist/index.html ' + functionName + ' is missing critical marker: ' + marker);
    }
  }
}
