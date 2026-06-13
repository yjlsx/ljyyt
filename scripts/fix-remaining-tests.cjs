const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '..', 'tests');
const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.test.cjs'));
let updated = 0;

files.forEach(file => {
  const filePath = path.join(testsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  if (content.includes('readSourceContent') || content.includes('getInlineScript')) return;
  if (!content.includes("'index.html'") && !content.includes('"index.html"')) return;
  
  // Pattern 1: const html = fs.readFileSync('index.html', 'utf8');
  const simplePattern = /const\s+(html|indexHtml)\s*=\s*fs\.readFileSync\('index\.html',\s*'utf8'\);/g;
  if (simplePattern.test(content)) {
    content = content.replace(
      /(const fs = require\('fs'\);)/,
      "$1\nconst { readSourceContent } = require('./test-helpers.cjs');"
    );
    content = content.replace(
      /const\s+html\s*=\s*fs\.readFileSync\('index\.html',\s*'utf8'\);/g,
      "const html = readSourceContent('.').combined;"
    );
    content = content.replace(
      /const\s+indexHtml\s*=\s*fs\.readFileSync\('index\.html',\s*'utf8'\);/g,
      "const indexHtml = readSourceContent('.').combined;"
    );
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log('Fixed:', file);
  }
});

console.log('Total:', updated);
