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
  const inlineMatch = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (inlineMatch) return inlineMatch[1];

  const srcMatch = html.match(/<script[^>]+src=["']([^"']+)["'][^>]*><\/script>/i);
  if (!srcMatch) throw new Error(file + ' is missing application script');
  const scriptPath = path.resolve(path.dirname(file), srcMatch[1].replace(/^\.\//, ''));
  return fs.readFileSync(scriptPath, 'utf8');
}

function pickFunction(source, name) {
  let start = source.indexOf('function ' + name);
  if (start > 6 && source.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'" || char === String.fromCharCode(96)) {
      quote = char;
      continue;
    }
    if (char === '{') {
      depth += 1;
      opened = true;
    } else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

module.exports = {
  readSourceContent,
  getInlineScript,
  pickFunction
};
