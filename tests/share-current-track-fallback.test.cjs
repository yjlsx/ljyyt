const fs = require('fs');
const vm = require('vm');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < script.length; index += 1) {
    const char = script[index];
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
      if (opened && depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

async function verifyFallbackCopy(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  if (!script.includes('function copyTextToClipboard(text)')) {
    throw new Error(file + ' is missing a share copy fallback helper');
  }
  const sandbox = {
    currentTrack: { title: '香港', artist: '陈百强' },
    navigator: {},
    copiedText: '',
    removed: false,
    toasts: [],
    console: { warn() {} },
    document: {
      body: {
        appendChild(node) {
          sandbox.appended = node;
        }
      },
      createElement(tag) {
        if (tag !== 'textarea') throw new Error('Unexpected fallback element: ' + tag);
        return {
          value: '',
          setAttribute() {},
          style: {},
          focus() {},
          select() {
            sandbox.copiedText = this.value;
          },
          remove() {
            sandbox.removed = true;
          }
        };
      },
      execCommand(command) {
        return command === 'copy';
      }
    },
    showToast(message) {
      sandbox.toasts.push(message);
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'copyTextToClipboard'),
    pickFunction(script, 'shareCurrentTrack')
  ].join('\n'), sandbox);

  await sandbox.shareCurrentTrack();
  if (sandbox.copiedText !== '香港 - 陈百强' || !sandbox.removed) {
    throw new Error(file + ' did not copy through the textarea fallback');
  }
  if (!sandbox.toasts.includes('已复制歌曲信息到剪贴板')) {
    throw new Error(file + ' did not confirm fallback copy success');
  }
}

async function verifyShareFailureFallsBackToCopy(file) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];
  const sandbox = {
    currentTrack: { title: '偏偏喜欢你', artist: '陈百强' },
    navigator: {
      async share() {
        throw new Error('share unavailable');
      },
      clipboard: {
        async writeText(text) {
          sandbox.clipboardText = text;
        }
      }
    },
    clipboardText: '',
    toasts: [],
    console: { warn() {} },
    document: {
      body: { appendChild() {} },
      createElement() {
        throw new Error('textarea fallback should not be needed when clipboard works');
      }
    },
    showToast(message) {
      sandbox.toasts.push(message);
    }
  };
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(script, 'copyTextToClipboard'),
    pickFunction(script, 'shareCurrentTrack')
  ].join('\n'), sandbox);

  await sandbox.shareCurrentTrack();
  if (sandbox.clipboardText !== '偏偏喜欢你 - 陈百强') {
    throw new Error(file + ' did not fall back to clipboard when native share failed');
  }
  if (!sandbox.toasts.includes('已复制歌曲信息到剪贴板')) {
    throw new Error(file + ' did not confirm copy after native share failure');
  }
}

(async () => {
  for (const file of ['index.html', 'dist/index.html']) {
    await verifyFallbackCopy(file);
    await verifyShareFailureFallsBackToCopy(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
