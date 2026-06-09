const fs = require('fs');

const pageExpectations = [
  {
    file: 'artist.html',
    focusMarkers: [
      '.artist-song-card:focus-visible',
      '.artist-video-card:focus-visible'
    ],
    markers: [
      "makeLegacyActionCard(div, '播放歌曲 ' +",
      "makeLegacyActionCard(card, '打开视频 ' +"
    ]
  },
  {
    file: 'ranking.html',
    focusMarkers: [
      '.rank-item:focus-visible'
    ],
    markers: [
      "makeLegacyActionCard(div, '播放歌曲 ' +"
    ]
  },
  {
    file: 'video-player.html',
    focusMarkers: [
      '.video-card:focus-visible'
    ],
    markers: [
      "makeLegacyActionCard(card, '打开视频 ' +"
    ]
  }
];

for (const page of pageExpectations) {
  for (const file of [page.file, 'dist/' + page.file]) {
    const html = fs.readFileSync(file, 'utf8');

    for (const marker of [
      'function makeLegacyActionCard',
      "element.setAttribute('role', 'button');",
      'element.tabIndex = 0;',
      "element.setAttribute('aria-label', label);",
      "element.addEventListener('keydown', function(event) {",
      "event.key === 'Enter'",
      "event.key === ' '",
      "event.key === 'Spacebar'",
      'event.preventDefault();',
      'handler(event);'
    ]) {
      if (!html.includes(marker)) {
        throw new Error(file + ' is missing keyboard-accessible legacy card marker: ' + marker);
      }
    }

    for (const marker of page.markers) {
      if (!html.includes(marker)) {
        throw new Error(file + ' should wire legacy clickable cards through makeLegacyActionCard: ' + marker);
      }
    }

    for (const marker of page.focusMarkers) {
      if (!html.includes(marker)) {
        throw new Error(file + ' should expose a visible keyboard focus style for legacy cards: ' + marker);
      }
    }
  }
}
