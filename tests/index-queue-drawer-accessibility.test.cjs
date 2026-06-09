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
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
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
  const setBody = pickFunction(script, 'setQueueDrawerOpen');
  const toggleBody = pickFunction(script, 'toggleQueueDrawer');
  const miniBody = pickFunction(script, 'openQueueFromMini');

  for (const marker of [
    'id="queue-button"',
    'aria-controls="queue-drawer"',
    'aria-expanded="false"',
    'id="mini-queue-button"',
    'role="dialog"',
    'aria-modal="true"',
    'aria-hidden="true"',
    'tabindex="-1"'
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' queue drawer markup is missing accessibility marker: ' + marker);
    }
  }

  for (const marker of [
    'var lastQueueDrawerTrigger = null;',
    'function setQueueDrawerOpen(open, trigger)',
    "lastQueueDrawerTrigger = trigger && typeof trigger.focus === 'function' ? trigger : document.activeElement;",
    "drawer?.setAttribute('aria-hidden', open ? 'false' : 'true');",
    "document.getElementById('queue-button')?.setAttribute('aria-expanded', open ? 'true' : 'false');",
    "document.getElementById('mini-queue-button')?.setAttribute('aria-expanded', open ? 'true' : 'false');",
    "drawer?.focus({ preventScroll: true });",
    'lastQueueDrawerTrigger.focus({ preventScroll: true });',
    'lastQueueDrawerTrigger = null;'
  ]) {
    if (!script.includes(marker) && !setBody.includes(marker)) {
      throw new Error(file + ' setQueueDrawerOpen is missing accessibility marker: ' + marker);
    }
  }

  if (!toggleBody.includes('setQueueDrawerOpen(willOpen, event && event.currentTarget);')) {
    throw new Error(file + ' toggleQueueDrawer should pass the trigger button to setQueueDrawerOpen');
  }
  if (!miniBody.includes('setQueueDrawerOpen(true, event && event.currentTarget);')) {
    throw new Error(file + ' openQueueFromMini should pass the trigger button to setQueueDrawerOpen');
  }

  const keydownStart = script.indexOf("document.addEventListener('keydown', function(event)");
  const keydownBody = keydownStart >= 0 ? script.slice(keydownStart, script.indexOf('});', keydownStart) + 3) : '';
  for (const marker of [
    "if (event.key === 'Escape' && document.getElementById('queue-drawer')?.classList.contains('open')) {",
    'setQueueDrawerOpen(false);',
    'return;'
  ]) {
    if (!keydownBody.includes(marker)) {
      throw new Error(file + ' global keydown should close the queue drawer before player shortcuts: ' + marker);
    }
  }
}
