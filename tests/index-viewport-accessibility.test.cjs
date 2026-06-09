const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<meta\s+name=["']viewport["']\s+content=["']([^"']+)["']/i);
  if (!match) {
    throw new Error(file + ' is missing the viewport meta tag');
  }
  const content = match[1];
  if (/maximum-scale\s*=/.test(content) || /user-scalable\s*=\s*no/i.test(content)) {
    throw new Error(file + ' should not disable user zoom in the viewport meta tag: ' + content);
  }
  if (!content.includes('viewport-fit=cover')) {
    throw new Error(file + ' should preserve viewport-fit=cover for safe-area layout');
  }
}
