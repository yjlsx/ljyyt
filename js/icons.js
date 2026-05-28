(function() {
  'use strict';

  function icon(paths, extraClass) {
    return '<svg class="line-icon' + (extraClass ? ' ' + extraClass : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + paths + '</svg>';
  }

  window.LJYYTIcons = {
    home: icon('<path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10.5V20h14v-9.5"></path>'),
    search: icon('<path d="m21 21-4.3-4.3"></path><circle cx="11" cy="11" r="6.5"></circle>'),
    grid: icon('<rect x="4" y="4" width="6" height="6" rx="1.5"></rect><rect x="14" y="4" width="6" height="6" rx="1.5"></rect><rect x="4" y="14" width="6" height="6" rx="1.5"></rect><rect x="14" y="14" width="6" height="6" rx="1.5"></rect>'),
    queue: icon('<path d="M8 6h13M8 12h13M8 18h13"></path><path d="M3 6h.01M3 12h.01M3 18h.01"></path>'),
    previous: icon('<path d="M19 20V4"></path><path d="m15 19-8-7 8-7v14Z"></path>'),
    play: icon('<path d="M8 5v14l11-7Z"></path>', 'icon-play'),
    pause: icon('<path d="M9 5v14"></path><path d="M15 5v14"></path>', 'icon-pause'),
    next: icon('<path d="M5 4v16"></path><path d="m9 5 8 7-8 7V5Z"></path>'),
    heart: icon('<path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z"></path>'),
    heartFilled: icon('<path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z"></path>', 'icon-filled'),
    volume: icon('<path d="M11 5 6 9H3v6h3l5 4V5Z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M18 6a8 8 0 0 1 0 12"></path>'),
    repeat: icon('<path d="m17 2 4 4-4 4"></path><path d="M3 11V9a3 3 0 0 1 3-3h15"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v2a3 3 0 0 1-3 3H3"></path>'),
    repeatOne: icon('<path d="m17 2 4 4-4 4"></path><path d="M3 11V9a3 3 0 0 1 3-3h15"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v2a3 3 0 0 1-3 3H3"></path><path d="M11 10h1v4"></path>'),
    shuffle: icon('<path d="m18 14 4 4-4 4"></path><path d="m18 2 4 4-4 4"></path><path d="M2 18h1.5A6.5 6.5 0 0 0 9.7 13.5l.6-3A6.5 6.5 0 0 1 16.5 6H22"></path><path d="M2 6h1.5A6.5 6.5 0 0 1 9 9"></path>'),
    close: icon('<path d="M18 6 6 18M6 6l12 12"></path>'),
    music: icon('<path d="M9 18V5l10-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="16" cy="16" r="3"></circle>'),
    video: icon('<rect x="3" y="6" width="14" height="12" rx="2"></rect><path d="m17 10 4-2.5v9L17 14"></path>'),
    trophy: icon('<path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"></path><path d="M8 6H4a3 3 0 0 0 3 4"></path><path d="M16 6h4a3 3 0 0 1-3 4"></path><path d="M12 12v5"></path><path d="M8 21h8"></path><path d="M9 17h6"></path>'),
    rocket: icon('<path d="M14 4c3 1 5 3 6 6l-5 5c-2.5.5-4.5-.2-6-1.7S6.8 9.8 7.3 7.3L14 4Z"></path><path d="M9 15l-3 3"></path><path d="M7 13l-3 1 1-3"></path><path d="M11 17l-1 3 3-1"></path><circle cx="15" cy="9" r="1.4"></circle>'),
    history: icon('<path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path><path d="M12 7v5l3 2"></path>'),
    share: icon('<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4"></path>'),
    sort: icon('<path d="M8 7h10"></path><path d="M8 12h7"></path><path d="M8 17h4"></path><path d="M4 6v12"></path><path d="m2 16 2 2 2-2"></path>'),
    inbox: icon('<path d="M4 4h16l2 10v6H2v-6l2-10Z"></path><path d="M2 14h6l2 3h4l2-3h6"></path>'),
    chevronLeft: icon('<path d="m15 18-6-6 6-6"></path>'),
    chevronRight: icon('<path d="m9 18 6-6-6-6"></path>'),
    target: icon('<circle cx="12" cy="12" r="7"></circle><circle cx="12" cy="12" r="2"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path>'),
    headphones: icon('<path d="M4 14v-2a8 8 0 0 1 16 0v2"></path><path d="M4 14h3v6H4v-6ZM17 14h3v6h-3v-6Z"></path>'),
    user: icon('<circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path>'),
    album: icon('<circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="2"></circle>'),
    clock: icon('<circle cx="12" cy="12" r="8"></circle><path d="M12 8v5l3 2"></path>'),
    wave: icon('<path d="M3 12h3l2-7 4 14 3-9 2 2h4"></path>'),
    spinner: icon('<path d="M12 2a10 10 0 1 1-7.1 2.9"></path>', 'icon-spin')
    ,
    sun: icon('<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>'),
    moon: icon('<path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z"></path>')
  };
})();
