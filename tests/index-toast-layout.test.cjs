const fs = require('fs');

function pickCssRule(css, selector) {
  const start = css.indexOf(selector + ' {');
  if (start < 0) throw new Error('Missing CSS rule ' + selector);
  const bodyStart = css.indexOf('{', start) + 1;
  const bodyEnd = css.indexOf('}', bodyStart);
  if (bodyEnd < 0) throw new Error('Unclosed CSS rule ' + selector);
  return css.slice(bodyStart, bodyEnd);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const toastRule = pickCssRule(html, '.ljyyt-toast');

  for (const marker of [
    'max-width: min(calc(100vw - 32px), 420px);',
    'white-space: normal;',
    'overflow-wrap: anywhere;',
    'text-align: center;'
  ]) {
    if (!toastRule.includes(marker)) {
      throw new Error(file + ' toast layout should include marker: ' + marker);
    }
  }

  if (toastRule.includes('white-space: nowrap')) {
    throw new Error(file + ' toast layout should not force long messages onto one clipped line');
  }
}
