/* components.js — 统一注入导航栏和底部播放器
   每个页面只需在 <body> 里放：
   <div id="navbar-placeholder"></div>
   <div id="player-placeholder"></div>
   然后在 <body> 末尾加 <script src="components.js"></script>
*/
(function() {
  'use strict';

  // 判断当前页面
  var path = (location.pathname || '').toLowerCase();
  var page = 'index';
  if (path.includes('music-player'))    page = 'music';
  if (path.includes('ranking'))         page = 'ranking';
  if (path.includes('search'))          page = 'search';
  if (path.includes('artist'))          page = 'artist';
  if (path.includes('video-player'))    page = 'video';

  function a(p, label, icon, active) {
    var cls = active ? ' nav-link active' : ' nav-link';
    var icn = icon ? '<i class="fas ' + icon + ' me-1"></i>' : '';
    return '<li class="nav-item"><a class="' + cls + '" href="' + p + '">' + icn + label + '</a></li>';
  }

  // ============ 导航栏 ============
  var navbar =
    '<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">' +
      '<div class="container">' +
        '<a class="navbar-brand" href="index.html">' +
          '<img src="./images/avatar.jpg" alt="丽江音悦台" width="40" height="40" class="rounded-circle me-2">' +
          '<div class="d-flex flex-column">' +
            '<span class="brand-name">丽江音悦台</span>' +
            '<span class="brand-slogan">传承纳西文化，分享民族音乐之美</span>' +
          '</div>' +
        '</a>' +
        '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">' +
          '<span class="navbar-toggler-icon"></span>' +
        '</button>' +
        '<div class="collapse navbar-collapse" id="navbarNav">' +
          '<ul class="navbar-nav me-auto">' +
            a('index.html',    '首页',    null,              page === 'index') +
            a('music-player.html', '播放器', 'fa-compact-disc', page === 'music') +
            a('ranking.html',  '排行榜',  'fa-trophy',        page === 'ranking') +
            a('#about',        '关于我们', null,              false) +
          '</ul>' +
          '<div class="d-none d-md-flex align-items-center ms-2">' +
            '<form action="search.html" method="GET" class="d-flex">' +
              '<input type="text" name="q" class="form-control form-control-sm bg-white text-dark border-secondary" placeholder="搜索歌曲..." style="width:160px">' +
            '</form>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</nav>';

  // ============ 底部播放器 ============
  var bottomPlayer =
    '<audio id="audio-player"></audio>' +
    '<div id="bottom-player" class="bottom-player fixed-bottom text-white shadow-lg">' +
      '<div class="container">' +
        '<div class="d-flex align-items-center justify-content-between">' +
          '<div class="current-track-info d-flex align-items-center flex-grow-1 me-3">' +
            '<img id="current-cover" src="./images/avatar.jpg" alt="专辑封面" class="rounded me-2" width="50" height="50">' +
            '<div>' +
              '<h6 id="current-title" class="mb-0" aria-live="polite">请选择一首歌曲</h6>' +
              '<small id="current-artist" class="text-white-50">-</small>' +
            '</div>' +
          '</div>' +
          '<div class="player-controls d-flex align-items-center me-3">' +
            '<button id="prev-btn" class="btn btn-outline-light btn-sm me-2" aria-label="上一首"><i class="fas fa-step-backward"></i></button>' +
            '<button id="play-btn" class="btn btn-light rounded-circle" style="width:40px;height:40px;" aria-label="播放或暂停">' +
              '<i class="fas fa-play text-primary"></i>' +
            '</button>' +
            '<button id="next-btn" class="btn btn-outline-light btn-sm ms-2" aria-label="下一首"><i class="fas fa-step-forward"></i></button>' +
          '</div>' +
          '<div class="progress-container flex-grow-1 me-3">' +
            '<div class="d-flex align-items-center">' +
              '<span id="current-time" class="text-white-50 me-2" style="font-size:0.8rem;">0:00</span>' +
              '<div id="progress-container" class="progress flex-grow-1" style="height:6px;background:rgba(255,255,255,0.3);border-radius:3px;cursor:pointer;" role="slider" aria-label="播放进度">' +
                '<div id="progress-bar" class="progress-bar" role="progressbar" style="width:0%;background:#fff;height:100%;transition:width 0.1s linear;"></div>' +
              '</div>' +
              '<span id="total-time" class="text-white-50 ms-2" style="font-size:0.8rem;">0:00</span>' +
            '</div>' +
          '</div>' +
          '<div class="volume-control d-flex align-items-center">' +
            '<i class="fas fa-volume-up text-white-50 me-2"></i>' +
            '<input type="range" id="volume-slider" class="form-range" min="0" max="1" step="0.01" value="0.5" style="width:80px;">' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  // ============ 注入到 DOM ============
  var np = document.getElementById('navbar-placeholder');
  var pp = document.getElementById('player-placeholder');

  if (np && !np.children.length) {
    np.outerHTML = navbar;
  }
  if (pp && !pp.children.length) {
    pp.outerHTML = bottomPlayer;
  }

})();
