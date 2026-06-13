const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '..', 'tests');
const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.test.cjs'));
let updated = 0;

files.forEach(file => {
  const filePath = path.join(testsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  if (content.includes('readSourceContent')) return;
  if (!content.includes("for (const file of ['index.html', 'dist/index.html'])")) return;
  
  // Add import after fs require
  content = content.replace(
    /(const fs = require\('fs'\);)/,
    "$1\nconst { readSourceContent } = require('./test-helpers.cjs');"
  );
  
  // Replace the loop + readFileSync pattern
  content = content.replace(
    /for \(const file of \['index\.html', 'dist\/index\.html'\]\) \{\s*const (html|content|source) = fs\.readFileSync\(file, 'utf8'\);/g,
    "for (const file of ['index.html', 'dist/index.html']) {\n  const src = file === 'index.html' ? readSourceContent('.') : readSourceContent('dist');\n  const $1 = src.combined;"
  );
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log('Fixed:', file);
  }
});

console.log('Total:', updated);
