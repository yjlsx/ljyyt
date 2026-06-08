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

  if (!html.includes('id="theme-switch"')) {
    throw new Error(file + ' theme switch should have a stable id for state syncing');
  }

  const applyBody = pickFunction(script, 'applyThemeSetting');
  for (const marker of [
    "var switchButton = document.getElementById('theme-switch');",
    "switchButton.innerHTML = iconHtml(dark ? 'sun' : 'moon');",
    "switchButton.setAttribute('aria-label', dark ? '当前深色主题，切换到浅色主题' : '当前浅色主题，切换到深色主题');",
    "switchButton.setAttribute('aria-pressed', dark ? 'true' : 'false');",
    "switchButton.title = dark ? '切换到浅色主题' : '切换到深色主题';",
    "label.textContent = dark ? '深色' : '浅色';"
  ]) {
    if (!applyBody.includes(marker)) {
      throw new Error(file + ' applyThemeSetting is missing theme switch state marker: ' + marker);
    }
  }
}
