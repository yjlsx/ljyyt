const fs = require('fs');

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

  for (const marker of [
    'data-setting-label="智能音源"',
    'data-setting-label="显示音源标签"',
    'data-setting-label="内嵌封面"',
    'data-setting-label="内嵌歌词"'
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' setting toggle is missing stable label marker: ' + marker);
    }
  }

  const syncBody = pickFunction(script, 'syncSettingToggleState');
  for (const marker of [
    "button.classList.toggle('off', !enabled);",
    "button.setAttribute('aria-pressed', enabled ? 'true' : 'false');",
    "button.setAttribute('aria-label', label + (enabled ? '开启' : '关闭'));",
    "button.title = label + (enabled ? '已开启' : '已关闭');",
    "button.dataset.stateText = enabled ? '开' : '关';"
  ]) {
    if (!syncBody.includes(marker)) {
      throw new Error(file + ' syncSettingToggleState is missing marker: ' + marker);
    }
  }

  const initBody = pickFunction(script, 'initSettings');
  if (!initBody.includes('syncSettingToggleState(button, enabled);')) {
    throw new Error(file + ' initSettings should sync full toggle state through syncSettingToggleState');
  }

  const toggleBody = pickFunction(script, 'toggleSetting');
  if (!toggleBody.includes('syncSettingToggleState(element, enabled);')) {
    throw new Error(file + ' toggleSetting should sync full toggle state after user interaction');
  }
}
