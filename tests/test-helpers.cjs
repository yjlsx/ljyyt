const fs = require('fs');
const path = require('path');

// Read all source content (HTML, CSS, JS) from a directory
function readSourceContent(baseDir = '.') {
  const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

  let appJs = '';
  let stylesCss = '';

  const appJsPath = path.join(baseDir, 'js/app.js');
  const stylesCssPath = path.join(baseDir, 'css/styles.css');

  if (fs.existsSync(appJsPath)) {
    appJs = fs.readFileSync(appJsPath, 'utf8');
  }

  if (fs.existsSync(stylesCssPath)) {
    stylesCss = fs.readFileSync(stylesCssPath, 'utf8');
  }

  // Combine all content for backward-compatible string searches
  const combined = indexHtml + '\n' + stylesCss + '\n' + appJs;

  return {
    indexHtml,
    appJs,
    stylesCss,
    combined,
    includes: (str) => combined.includes(str)
  };
}

// Get inline script content (handles both monolithic and split structures)
function getInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const srcMatch = htm