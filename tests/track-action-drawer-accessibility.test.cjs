const fs = require('fs');

function pickFunction(script, name) {
  const start = script.indexOf('function ' + name);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let end = start; end < script.length; end += 1) {
    const char = script[end];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') {
      depth += 1;
      opened = true;
    } else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) return script.slice(start, end + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const openBody = pickFunction(script, 'openTrackActionDrawer');
  const closeBody = pickFunction(script, 'closeTrackActionDrawer');

  for (const marker of [
    'id="action-drawer" role="dialog"',
    'aria-modal="true"',
    'aria-labelledby="action-drawer-title"',
    'aria-hidden="true"',
    'tabindex="-1"',
    '<strong id="action-drawer-title">'
  ]) {
    if (!html.includes(marker) && !openBody.includes(marker)) {
      throw new Error(file + ' action drawer is missing accessibility marker: ' + marker);
    }
  }

  for (const marker of [
    'var lastTrackActionTrigger = null;',
    'function openTrackActionDrawer(track, trigger)',
    "lastTrackActionTrigger = trigger && typeof trigger.focus === 'function' ? trigger : document.activeElement;",
    "lastTrackActionTrigger?.setAttribute('aria-expanded', 'true');",
    "drawer.setAttribute('aria-hidden', 'false');",
    "content.querySelector('button')?.focus();"
  ]) {
    if (!script.includes(marker) && !openBody.includes(marker)) {
      throw new Error(file + ' openTrackActionDrawer is missing accessibility marker: ' + marker);
    }
  }

  for (const marker of [
    "drawer?.setAttribute('aria-hidden', 'true');",
    "lastTrackActionTrigger?.setAttribute('aria-expanded', 'false');",
    'lastTrackActionTrigger.focus({ preventScroll: true });',
    'lastTrackActionTrigger = null;'
  ]) {
    if (!closeBody.includes(marker)) {
      throw new Error(file + ' closeTrackActionDrawer is missing focus restoration marker: ' + marker);
    }
  }

  if (!script.includes('data-track-action-trigger')) {
    throw new Error(file + ' track action trigger buttons should expose a stable data marker');
  }
  if (!script.includes('aria-haspopup="dialog"') || !script.includes('aria-expanded="false"')) {
    throw new Error(file + ' track action trigger buttons should expose dialog popup state');
  }
  if (!script.includes("openTrackActionDrawer(tracks[index], event.target.closest('.dots'))")) {
    throw new Error(file + ' list more buttons should pass their trigger to openTrackActionDrawer');
  }

  const keydownStart = script.indexOf("document.addEventListener('keydown', function(event)");
  const keydownBody = keydownStart >= 0 ? script.slice(keydownStart, script.indexOf('});', keydownStart) + 3) : '';
  for (const marker of [
    "if (event.key === 'Escape' && document.getElementById('action-drawer')?.classList.contains('open')) {",
    'event.preventDefault();',
    'closeTrackActionDrawer();',
    'return;'
  ]) {
    if (!keydownBody.includes(marker)) {
      throw new Error(file + ' global keydown should close the action drawer before player shortcuts: ' + marker);
    }
  }
}
