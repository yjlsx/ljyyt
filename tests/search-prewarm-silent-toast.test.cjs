const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];

  if (!script.includes('resolveExternalTrackUrlForSearchPrewarm(track).then')) {
    throw new Error(file + ' should prewarm search URLs through the silent resolver');
  }
  if (!script.includes("var shouldShowToast = attemptLimit > 0 && requestId && requestId === _playRequestId;")) {
    throw new Error(file + ' should only show fallback toast for real playback requests');
  }
}
