const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '..', 'tests');
const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.test.cjs'));
let updated = 0;

files.forEach(file => {
  const filePath = path.join(testsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  if (content.includes('test-helpers.cjs')) return;
  if (!content.includes("readFileSync('index.html'") && !content.includes('readFileSync("index.html"')) return;
  if (content.match(/const indexHtml = fs\.readFileSync\('index\.html', 'utf8'\);/)) {
    content = content.replace(/(const fs = require\('fs'\);)/, "$1\nconst { readSourceContent } = require('./test-helpers.cjs');");
    content = content.replace(/const indexHtml = fs\.readFileSync\('index\.html', 'utf8'\);/g, "const src = readSourceContent('.');");
    content = content.replace(/const distHtml = fs\.readFileSync\('dist\/index\.html', 'utf8'\);/g, "const dist = readSourceContent('dist');");
    content = content.replace(/const distIndexHtml = fs\.readFileSync\('dist\/index\.html', 'utf8'\);/g, "const dist = readSourceContent('dist');");
    content = content.replace(/\[\['index\.html', indexHtml\], \['dist\/index\.html', distHtml\]\]/g, "[['index.html', src.combined], ['dist/index.html', dist.combined]]");
    content = content.replace(/\bindexHtml\.includes\(/g, 'src.combined.includes(');
    content = content.replace(/\bdistHtml\.includes\(/g, 'dist.combined.includes(');
    content = content.replace(/\bdistIndexHtml\.includes\(/g, 'dist.combined.includes(');
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log('Updated:', file);
  }
});
console.log('Total:', updated);
