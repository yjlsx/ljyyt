const fs = require('fs');

for (const file of ['css/search-app.css', 'dist/css/search-app.css']) {
  const css = fs.readFileSync(file, 'utf8');
  const balance = css.split('').reduce((depth, char) => {
    if (char === '{') return depth + 1;
    if (char === '}') return depth - 1;
    return depth;
  }, 0);
  if (balance !== 0) {
    throw new Error(file + ' has unbalanced CSS braces');
  }
  if (/@media\s*\([^)]*\)\s*\{\s*$/s.test(css)) {
    throw new Error(file + ' should not end with an empty unclosed media block');
  }
  if (!/\.search-page\s+:is\([^)]*button[^)]*a[^)]*\):focus-visible\s*\{[^}]*outline:\s*2px\s+solid\s+var\(--search-brand\)[^}]*box-shadow:\s*0\s+0\s+0\s+4px\s+rgba\(69,\s*213,\s*195,\s*0\.18\)/s.test(css)) {
    throw new Error(file + ' should provide a visible focus ring for search page controls');
  }
}
