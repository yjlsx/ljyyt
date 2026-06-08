const fs = require('fs');

function pickFunction(script, name) {
  const start = script.indexOf('function ' + name);
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

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const clearSearchHistory = pickFunction(script, 'clearSearchHistory');
  const clearCurrentQueue = pickFunction(script, 'clearCurrentQueue');

  if (!clearSearchHistory.includes("showConfirm('确定清空搜索历史吗？'")) {
    throw new Error(file + ' clears search history without custom confirmation');
  }

  if (!clearCurrentQueue.includes("var msg = queueDrawerTab === 'history' ? '确定清空播放历史吗？' : '确定清空播放列表吗？';")) {
    throw new Error(file + ' does not prepare the queue/history clear confirmation message');
  }

  if (!clearCurrentQueue.includes('showConfirm(msg, function()')) {
    throw new Error(file + ' clears queue/history without custom confirmation');
  }
}
