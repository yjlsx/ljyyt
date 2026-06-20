const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];

  if (!script.includes('resolveExternalTrackUrlForSearchPrewarm(track).then')) {
    throw new Error(file + ' should prewarm search URLs through the silent resolver');
  }
  if (script.includes("showToast('正在搜索免费音源...'")) {
    throw new Error(file + ' should not show the fallback loading toast');
  }
  if (!script.includes('if (!message) return;')) {
    throw new Error(file + ' should suppress normalized empty toast messages');
  }
}
