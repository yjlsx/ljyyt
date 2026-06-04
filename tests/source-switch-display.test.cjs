const fs = require('fs');

const files = ['index.html', 'dist/index.html'];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const marker of [
    'class="variant-badge"',
    'function showVariantPopover',
    'function closeVariantPopover',
    'track.variants && track.variants.length',
    "event.target.closest('.variant-badge')"
  ]) {
    if (!html.includes(marker)) {
      throw new Error(file + ' is missing source variant UI marker: ' + marker);
    }
  }
}
