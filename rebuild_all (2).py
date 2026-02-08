# 读取原始的 index.html
with open('D:\\GitHub\\ljyyt\\index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# 读取当前的 search.html
with open('D:\\GitHub\\ljyyt\\search.html', 'r', encoding='utf-8') as f:
    search_content = f.read()

# 1. 修改 index.html，添加搜索框和播放器状态管理
# 在导航栏中添加搜索框
index_nav_old = '''        </ul>
      </div>
    </nav>'''

index_nav_new = '''        </ul>
        <!-- 搜索框 -->
        <form class="d-flex ms-3" id="search-form" action="search.html" method="GET">
          <div class="input-group">
            <input type="text" class="form-control" id="search-input" name="q" placeholder="搜索音乐或视频..." aria-label="搜索">
            <button class="btn btn-outline-light" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    </nav>'''

index_content = index_content.replace(index_nav_old, index_nav_new)

# 添加 player_state.js 引用
index_scripts_old = '''  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- 视频数据 -->
  <script src="videos/video_data.js"></script>
  
  <!-- 主脚本 -->
  <script src="script.js"></script>
</body>
</html>'''

index_scripts_new = '''  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- 视频数据 -->
  <script src="videos/video_data.js"></script>
  
  <!-- 播放器状态管理 -->
  <script src="player_state.js"></script>
  
  <!-- 主脚本 -->
  <script src="script.js"></script>
</body>
</html>'''

index_content = index_content.replace(index_scripts_old, index_scripts_new)

# 修改 script.js，添加播放器状态保存
script_js_old = '''// 播放音乐
function playMusic() {
  console.log('▶️ 播放音乐');
  audioPlayer.play().then(function() {
    isPlaying = true;
    updatePlayButton();
  }).catch(function(error) {
    console.error('❌ 播放失败:', error);
  });
}'''

script_js_new = '''// 播放音乐
function playMusic() {
  console.log('▶️ 播放音乐');
  audioPlayer.play().then(function() {
    isPlaying = true;
    updatePlayButton();
    // 保存播放状态
    if (typeof savePlayerState === 'function') {
      savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, isPlaying, musicData[currentTrackIndex]);
    }
  }).catch(function(error) {
    console.error('❌ 播放失败:', error);
  });
}'''

index_content = index_content.replace(script_js_old, script_js_new)

# 修改 script.js，添加暂停时保存状态
script_js_pause_old = '''// 暂停音乐
function pauseMusic() {
  console.log('⏸️ 暂停音乐);
  audioPlayer.pause();
  isPlaying = false;
  updatePlayButton();
}'''

script_js_pause_new = '''// 暂停音乐
function pauseMusic() {
  console.log('⏸️ 暂停音乐');
  audioPlayer.pause();
  isPlaying = false;
  updatePlayButton();
  // 保存播放状态
  if (typeof savePlayerState === 'function') {
    savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, isPlaying, musicData[currentTrackIndex]);
  }
}'''

index_content = index_content.replace(script_js_pause_old, script_js_pause_new)

# 修改 script.js，添加恢复播放状态逻辑
script_js_dom_loaded_old = '''// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM加载完成，开始初始化...');
  
  // 渲染音乐列表
  renderMusicList();
  
  // 渲染视频列表
  renderVideoList();
  
  // 初始化播放器事件监听
  initPlayerEvents();
  
  // 默认加载第一首歌
  if (musicData.length > 0) {
    loadTrack(0);
    console.log('✅ 已加载第一首歌:', musicData[0].title);
  }
  
  console.log('✅ 页面初始化完成');
  console.log('🎵 音乐数量:', musicData.length);
  console.log('🎬 视频数量:', typeof videoData !== 'undefined' ? videoData.length : '未定义');
});'''

script_js_dom_loaded_new = '''// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM加载完成，开始初始化...');
  
  // 检查并恢复播放器状态
  if (typeof restorePlayerState === 'function' && hasSavedPlayerState()) {
    const savedState = restorePlayerState();
    if (savedState && savedState.trackData) {
      console.log('🔄 恢复播放器状态:', savedState.trackData.title);
      const trackIndex = musicData.findIndex(t => t.id === savedState.trackId);
      if (trackIndex !== -1) {
        currentTrackIndex = trackIndex;
        loadTrack(currentTrackIndex);
        audioPlayer.currentTime = savedState.currentTime;
        if (savedState.isPlaying) {
          playMusic();
        }
      }
    }
  }
  
  // 渲染音乐列表
  renderMusicList();
  
  // 渲染视频列表
  renderVideoList();
  
  // 初始化播放器事件监听
  initPlayerEvents();
  
  // 只有在没有恢复播放器状态时才默认加载第一首歌
  if (!hasSavedPlayerState() && musicData.length > 0) {
    loadTrack(0);
    console.log('✅ 已加载第一首歌:', musicData[0].title);
  }
  
  console.log('✅ 页面初始化完成');
  console.log('🎵 音乐数量:', musicData.length);
  console.log('🎬 视频数量:', typeof videoData !== 'undefined' ? videoData.length : '未定义');
});'''

index_content = index_content.replace(script_js_dom_loaded_old, script_js_dom_loaded_new)

# 写回 index.html
with open('D:\\GitHub\\ljyyt\\index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)

print('index.html 修复完成')

# 2. 重建 search.html
search_html = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="format-detection" content="telephone=no">
  <meta name="mobile-web-app-capable" content="yes">
  <title>搜索结果 - 丽江音悦台</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="style_mobile.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
    .nav-tabs .nav-link {
      color: #495057;
      font-weight: 500;
      padding: 10px 20px;
    }
    .nav-tabs .nav-link.active {
      color: #0d6efd;
      font-weight: 600;
      border-bottom: 3px solid #0d6efd;
    }
    .music-card, .video-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .music-card:hover, .video-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0,0.15);
    }
    .music-card.active, .video-card.active {
      border: 2px solid #0d6efd;
      background-color: #f8f9fa;
    }
    .album-cover {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }
    .bottom-player {
      background: linear-gradient(180deg, rgba(13, 110, 253, 0.95) 0%, rgba(102, 16, 242, 0.95) 100%);
      backdrop-filter: blur(10px);
      padding: 10px 0;
      z-index: 1000;
    }
    .tab-content {
      min-height: 400px;
    }
    
    /* 移动端优化 */
    @media (max-width: 575.98px) {
      .nav-tabs .nav-link {
        padding: 0.6rem 1rem;
        font-size: 0.95rem;
      }
      .album-cover {
        width: 48px;
        height: 48px;
      }
      .bottom-player {
        padding: 8px 0;
      }
    }
    
    /* 搜索页面特定样式 */
    body {
      padding-top: 80px;
    }
    
    .search-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 3rem 0;
      margin-bottom: 2rem;
    }
    
    .search-container {
      padding: 20px 0;
    }
    
    .search-results-title {
      color: white;
      margin-bottom: 1.5rem;
      display: inline-block;
      padding: 8px 20px;
      border-radius: 25px;
      font-weight: 600;
    }
    
    .search-results-title.music-title {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .search-results-title.video-title {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
    }
  </style>
</head>
<body>
  <!-- 导航栏 -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <img src="./images/avatar.jpg" alt="丽江音悦台" width="40" height="40" class="rounded-circle me-2">
        丽江音悦台
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="="nav-item">
            <a class="nav-link" href="index.html">首页</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="index.html#about">关于我们</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="index.html#contact">联系我们</a>
          </li>
        </ul>
        <!-- 搜索框 -->
        <form class="d-flex ms-3" id="nav-search-form" action="search.html" method="GET">
          <div class="input-group">
            <input type="text" class="form-control" id="nav-search-input" name="q" placeholder="搜索音乐或视频..." aria-label="搜索">
            <button class="btn btn-outline-light" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </nav>

  <!-- 搜索横幅 -->
  <header class="search-hero py-5">
    <div class="container text-center text-white">
      <h1 class="display-4 fw-bold">搜索结果</h1>
      <p class="lead">传承纳西文化，分享民族音乐之美</p>
      <div class="mt-4">
        <div class="input-group w-50 mx-auto">
          <input type="text" class="form-control form-control-lg" id="search-input" placeholder="搜索音乐或视频...">
          <button class="btn btn-light btn-lg" id="search-btn">
            <i class="fas fa-search text-primary"></i>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- 搜索结果内容 -->
  <section class="search-container">
    <div class="container">
      <div class="search-results-box" style="background: rgba(255, 255,255, 0.1); backdrop-filter: blur(10px); border-radius: 15px; padding: 25px; margin-bottom: 25px;">
        <!-- 搜索统计 -->
        <div class="alert alert-info mb-4" id="search-stats" style="display: none;">
          找到 <span id="total-count">0</span> 个结果 (<span id="music-count">0</span> 首乐, <span id="video-count">0</span> 个视频)
        </div>
        
        <!-- 音乐结果 -->
        <h3 class="search-results-title music-title">
          <i class="fas fa-music me-2"></i>音乐
        </h3>
        <div class="row" id="music-results">
          <!-- 音乐结果将通过JavaScript动态生成 -->
        </div>
        
        <!-- 视频结果 -->
        <h3 class="search-results-title video-title mt-4">
          <i class="fas fa-video me-2"></i>视频
        </h3>
        <div class="row" id="video-results">
          <!-- 视频结果将通过JavaScript动态生成 -->
        </div>
        
        <!-- 无结果提示 -->
        <div class="text-center py-5" id="no-results" style="display: none;">
          <i class="fas fa-search fa-3x mb-3 text-muted"></i>
          <h5 class="text-white">未找到相关结果</h5>
          <p class="text-white-50">请尝试使用其他关键词进行搜索</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 页脚 -->
  <footer class="bg-dark text-white py-4">
    <div class="container text-center">
      <p>&copy; 2026 丽江音悦台.保留所有权利。</p>
      <p>传承纳西文化，分享民族音乐之美</p>
    </div>
  </footer>

  <!-- 音频播放器 -->
  <audio id="audio-player"></audio>

  <!-- 底部悬浮播放器 -->
  <div id="bottom-player" class="bottom-player fixed-bottom text-white shadow-lg">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between">
        <!-- 当前播放信息 -->
        <div class="current-track-info d-flex align-items-center flex-grow-1">
          <img id="current-cover" src="./images/avatar.jpg" alt="专辑封面" class="rounded me-2" width="50" height="50">
          <div>
            <h6 id="current-title" class="mb-0">请选择一首歌曲</h6>
            <small id="current-artist" class="text-white-50">-</small>
          </div>
        </div>
        
        <!-- 播放控制 -->
        <div class="player-controls d-flex align-items-center me-3">
          <button id="prev-btn" class="btn btn-outline-light btn-sm me-2"><i class="fas fa-step-backward"></i></button>
          <button id="play-btn" class="btn btn-light rounded-circle" style="width: 40px; height: 40px;">
            <i class="fas fa-play text-primary"></i>
          </button>
          <button id="next-btn" class="btn btn-outline-light btn-sm ms-2"><i class="fas fa-step-forward"></i></button>
        </div>
        
        <!-- 进度条和时间 -->
        <div class="progress-container flex-grow-1 me-3">
          <div class="d-flex align-items-center">
            <span id="current-time" class="text-white-50" style="font-size: 0.8rem;">0:00</span>
            <div id="progress-container" class="progress flex-grow-1" style="height: 6px; background: rgba(255,255,255,0.3); border-radius: 3px; cursor: pointer;">
              <div id="progress-bar" class="progress-bar" role="progressbar" style="width: 0%; background: #fff; height: 100%; transition: width: 0.1s linear;"></div>
            </div>
            <span id="total-time" class="text-white-50" style="font-size: 0.8rem;">0:00</span>
          </div>
        </div>
        
        <!-- 音量控制 -->
        <div class="volume-control d-flex align-items-center">
          <i class="fas fa-volume-up text-white-50 me-2"></i>
          <input type="range" id="volume-slider" class="form-range" min="0" max="1" step="0.01" value="0.7" style="width: 80px;">
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- 视频数据 -->
  <script src="videos/video_data.js"></script>
  
  <!-- 主脚本 -->
  <script src="script.js"></script>
  
  <!-- 播放器状态管理 -->
  <script src="player_state.js"></script>
  
  <script>
    console.log('🔍 搜索页面加载');
    
    // 获取URL参数
    function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\\]]/, '\\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    // 格式化时间
    function formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '00:00';
      var min = Math.floor(seconds / 60);
      var sec = Math.floor(seconds % 60);
      return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
    }
    
    // 搜索函数
    function search(query) {
      query = query.toLowerCase().trim();
      
      if (!query) {
        return {
          music: [],
          video: []
        };
      }
      
      var results = {
        music: [],
        video: []
      };
      
      // 搜索音乐
      if (typeof musicData !== 'undefined') {
        results.music = musicData.filter(function(track) {
          return track.title.toLowerCase().indexOf(query) !== -1 || 
                 track.artist.toLowerCase().indexOf(query) !== -1 ||
                 track.album.toLowerCase().indexOf(query) !== -1;
        });
      }
      
      // 搜索视频
      if (typeof videoData !== 'undefined') {
        results.video = videoData.filter(function(video) {
          return video.title.toLowerCase().indexOf(query) !== -1 || 
                 video.artist.toLowerCase().indexOf(query) !== -1 ||
                 video.album.toLowerCase().indexOf(query) !== -1;
        });
      }
      
      return results;
    }
    
    // 显示搜索结果
    function displayResults(results) {
      var musicContainer = document.getElementById('music-results');
      var videoContainer = document.getElementById('video-results');
      var noResultsDiv = document.getElementById('no-results');
      var searchStatsCount = document.getElementById('search-stats');
      var totalCount = document.getElementById('total-count');
      var musicCount = document.getElementById('music-count');
      var videoCount = document.getElementById('video-count');
      
      // 更新计数
      var total = results.music.length + results.video.length;
      totalCount.textContent = total;
      musicCount.textContent = results.music.length;
      videoCount.textContent = results.video.length;
      
      // 显示统计信息
      if (total > 0) {
        searchStatsCount.style.display = 'block';
      } else {
        searchStatsCount.style.display = 'none';
      }
      
      // 显示音乐结果
      if (results.music.length > 0) {
        var musicHtml = '';
        results.music.forEach(function(track) {
          musicHtml += `
            <div class="col-md-6 col-lg-4 mb-3">
              <div class="card music-card" data-id="${track.id}">
                <div class="card-body d-flex align-items-center">
                  <img src="${track.cover}" alt="${track.title}" class="album-cover me-3">
                  <div class="flex-grow-1">
                    <h6 class="card-title mb-1">${track.title}</h6>
                    <p class="card-text text-muted mb-0">${track.artist} <span class="ms-4">${formatTime(track.duration)}</span></p>
                  </div>
                  <i class="fas fa-music text-primary ms-2" style="font-size: 1.2rem;"></i>
                </div>
              </div>
            </div>
          `;
        });
        musicContainer.innerHTML = musicHtml;
        
        // 添加音乐卡片点击事件
        document.querySelectorAll('.music-card').forEach(function(card) {
          card.addEventListener('click', function() {
            var trackId = parseInt(this.getAttribute('data-id'));
            console.log('🎵 点击了音乐卡片 ID:', trackId);
            // 播放音乐
            playMusicById(trackId);
          });
          card.style.cursor = 'pointer';
        });
      } else {
        musicContainer.innerHTML = '<p class="text-muted">未找到相关音乐</p>';
      }
      
      // 显示视频结果
      if (results.video.length > 0) {
        var videoHtml = '';
        results.video.forEach(function(track, index) {
          videoHtml += `
            <div class="col-md-6 col-lg-4 mb-4">
              <div class="card video-card" data-id="${track.id}">
                <div class="card-body p-0">
                  <div class="position-relative">
                    <img src="${track.cover}" alt="${track.title.title}" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="position-absolute top-50 start-50 translate-middle">
                      <i class="fas fa-play-circle text-white" style="font-size: 3rem; opacity: 0.8;"></i>
                    </div>
                    <div class="position-absolute bottom-0 start-0 end-0 p-2" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);">
                      <span class="text-white small">${formatTime(track.duration)}</span>
                    </div>
                  </div>
                </div>
                <div class="p-3">
                  <h6 class="card-title mb-1">${track.title}</h6>
                  <p class="card-text text-muted mb-0 small">${track.artist}</p>
                </div>
                </div>
              </div>
            </div>
          `;
        });
        videoContainer.innerHTML = videoHtml;
        
        // 添加视频卡片点击事件
        document.querySelectorAll('.video-card').forEach(function(card) {
          card.addEventListener('click', function() {
            var videoId = parseInt(this.getAttribute('data-id'));
            console.log('🎬 点击了视频卡片 ID:', videoId);
            // 跳转到视频播放页面并自动播放
            window.location.href = 'video-player.html?id=' + videoId + '&autoplay=true';
          });
          card.style.cursor = 'pointer';
        });
      } else {
        videoContainer.innerHTML = '<p class="text-muted">未找到相关视频</p>';
      }
      
      // 显示无结果提示
      if (total === 0) {
        noResultsDiv.style.display = 'block';
      } else {
        noResultsDiv.style.display = 'none';
      }
    }
    
    // 根据ID播放音乐
    function playMusicById(id) {
      var track = musicData.find(t => t.id === id);
      if (track) {
        console.log('🎵 开始播放音乐:', track.title);
        
        // 更新播放器
        currentTrackIndex = musicData.findIndex(t => t.id === id);
        isPlaying = true;
        
        // 更新底部播放器UI
        document.getElementById('current-title').textContent = track.title;
        document.getElementById('current-artist').textContent = track.artist;
        document.getElementById('current-cover').src = track.cover;
        
        // 加载音频
        audioPlayer.src = track.src;
        
        // 播放音乐
        audioPlayer.play().then(function() {
          console.log('✅ 音乐开始播放');
          isPlaying = true;
          updatePlayButton();
          // 保存播放状态到localStorage，以便在页面间共享
          if (typeof savePlayerState === 'function') {
            savePlayerState(track.id, audioPlayer.currentTime, isPlaying, track);
          }
        }).catch(function(error) {
          console.error('❌ 播放失败:', error);
          isPlaying = false;
          updatePlayButton();
        });
        
        // 更新播放按钮
        updatePlayButton();
      }
    }
    
    // 执行搜索
    function performSearch(query) {
      console.log('🔍 开始搜索:', query);
      
      setTimeout(function() {
        try {
          var results = search(query);
          console.log('✅ 搜索完成: 音乐', results.music.length, '个, 视频', results.video.length, '个');
          
          displayResults(results);
        } catch (error) {
          console.error('❌ 搜索失败:', error);
          alert('搜索失败: ' + error.message);
        }
      }, 100);
    }
    
    // 页面加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
      console.log('✅ 页面加载完成');
      
      // 检查并恢复播放器状态
      if (typeof restorePlayerState === 'function' && hasSavedPlayerState()) {
        try {
          const savedState = restorePlayerState();
          if (savedState && savedState.trackData) {
            console.log('🔄 恢复播放器状态:', savedState.trackData.title);
            const trackIndex = musicData.findIndex(t => t.id === savedState.trackId);
            if (trackIndex !== -1) {
              currentTrackIndex = trackIndex;
              // 更新底部播放器UI
              document.getElementById('current-title').textContent = savedState.trackData.title;
              document.getElementById('current-artist').textContent = savedState.trackData.artist;
              document.getElementById('current-cover').src = savedState.trackData.cover;
              
              // 加载音频
              audioPlayer.src = savedState.trackData.src;
              
              // 设置播放位置
              audioPlayer.currentTime = savedState.currentTime;
              
              // 如果之前在播放，则继续播放
              if (savedState.isPlaying) {
                audioPlayer.play().then(function() {
                  isPlaying = true;
                  updatePlayButton();
                }).catch(function(error) {
                  console.error('❌ 恢复播放失败:', error);
                  isPlaying = false;
                  updatePlayButton();
                });
              }
            }
          }
        } catch (error) {
          console.error('❌ 恢复播放器状态时出错:', error);
        }
      }
      
      // 检查数据是否已加载
      var checkDataInterval = setInterval(function() {
        if (typeof musicData !== 'undefined' && typeof videoData !== 'undefined') {
          clearInterval(checkDataInterval);
          console.log('✅ 数据加载完成: 音乐', musicData.length, '首, 视频', videoData.length, '个');
          
          // 获取URL中的搜索关键词
          var query = getUrlParameter('q');
          if (query) {
            document.getElementById('search-input').value = query;
            performSearch(query);
          }
        }
      }, 100);
      
      // 设置超时检查
      setTimeout(function() {
        if (typeof musicData === 'undefined' || typeof videoData === 'undefined') {
          console.error('❌ 数据加载超时');
          document.getElementById('search-stats').innerHTML = '<p class="text-danger">数据加载失败，请刷新页面重试</p>';
          document.getElementById('search-stats').style.display = 'block';
        }
      }, 5000);
      
      // 绑定搜索按钮事件
      document.getElementById('search-btn').addEventListener('click', function() {
        var query = document.getElementById('search-input').value.trim();
        if (query) {
          // 更新URL并执行搜索
          var newUrl = 'search.html?q=' + encodeURIComponent(query);
          window.location.href = newUrl;
        }
      });
      
      // 绑定回车键事件
      document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          var query = this.value.trim();
          if (query) {
            // 更新URL并执行搜索
            var newUrl = 'search.html?q=' + encodeURIComponent(query);
            window.location.href = newUrl;
          }
        }
      });
    });
  </script>
</body>
</html>'''

# 写回 search.html
with open('D:\\GitHub\\ljyyt\\search.html', 'w', encoding='utf-8') as f:
    f.write(search_html)

print('所有文件修复完成')
