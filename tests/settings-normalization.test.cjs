const fs = require('fs');
const vm = require('vm');

function pickFunction(source, name) {
  const marker = 'function ' + name + '(';
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
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
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error('Could not extract function ' + name);
}

function evaluateHelpers(html) {
  const defaultSettingsMatch = html.match(/const defaultSettings = \{[\s\S]*?\n    \};/);
  if (!defaultSettingsMatch) throw new Error('Missing defaultSettings declaration');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext([
    pickFunction(html, 'readStoredJson'),
    pickFunction(html, 'readStoredObject'),
    defaultSettingsMatch[0],
    pickFunction(html, 'normalizeAppSettings'),
    'this.readStoredObject = readStoredObject;',
    'this.normalizeAppSettings = normalizeAppSettings;',
    'this.defaultSettings = defaultSettings;'
  ].join('\n'), sandbox);
  return sandbox;
}

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');

  if (!html.includes('normalizeAppSettings(readStoredObject(SETTINGS_KEY))')) {
    throw new Error(file + ' should normalize stored settings before merging defaults');
  }
  if (html.includes('Object.assign({}, defaultSettings, readStoredObject(SETTINGS_KEY) || {})')) {
    throw new Error(file + ' still merges unvalidated stored settings directly');
  }

  const helpers = evaluateHelpers(html);
  const invalidObjects = [
    '[]',
    'null',
    '"dark"',
    '42'
  ];

  for (const raw of invalidObjects) {
    const localStorage = {
      getItem() {
        return raw;
      }
    };
    const readObject = vm.runInNewContext(
      [
        pickFunction(html, 'readStoredJson'),
        pickFunction(html, 'readStoredObject'),
        'readStoredObject("settings")'
      ].join('\n'),
      { localStorage }
    );
    if (readObject !== null) {
      throw new Error(file + ' readStoredObject should reject non-plain object JSON: ' + raw);
    }
  }

  const normalized = helpers.normalizeAppSettings({
    smartSource: false,
    showSourceLabels: 0,
    embedCover: 'false',
    embedLyrics: true,
    volume: '88',
    fullBackgroundMode: 'poster',
    theme: 'neon',
    extraKey: 'ignored'
  });

  const expected = {
    smartSource: false,
    showSourceLabels: true,
    embedCover: true,
    embedLyrics: true,
    volume: 88,
    fullBackgroundMode: 'cover',
    theme: 'light',
    playlistSortMode: 'added',
    bilibiliMatchKeywords: ''
  };

  for (const [key, value] of Object.entries(expected)) {
    if (normalized[key] !== value) {
      throw new Error(file + ' normalized ' + key + ' to ' + normalized[key] + ', expected ' + value);
    }
  }

  if (Object.prototype.hasOwnProperty.call(normalized, 'extraKey')) {
    throw new Error(file + ' normalizeAppSettings should discard unknown keys');
  }

  const clamped = helpers.normalizeAppSettings({
    volume: 200,
    theme: 'dark',
    fullBackgroundMode: 'texture',
    playlistSortMode: 'artist',
    bilibiliMatchKeywords: '  live, cover  '
  });
  if (
    clamped.volume !== 100 ||
    clamped.theme !== 'dark' ||
    clamped.fullBackgroundMode !== 'texture' ||
    clamped.playlistSortMode !== 'artist' ||
    clamped.bilibiliMatchKeywords !== 'live, cover'
  ) {
    throw new Error(file + ' should clamp volume and preserve valid enum/text settings');
  }
}
