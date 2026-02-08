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
  
  <!-- 播放器状态管理 -->
  <script src="player_state.js"></script>
  
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
  console.log('⏸️ 暂停音乐');
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
  
  // 检查并恢复播放器状态
  if (typeof restorePlayerState === 'function' && hasSavedPlayerState()) {
    const savedState = restorePlayerState();
    if (savedState && savedState.trackData) {
      console.log('🔄 恢复播放器状态:', savedState.trackData.title);
      const trackIndex = musicData.findIndex(t => t.t.id === savedState.trackId);
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

script_js_dom_loaded_new = '''// 页面加载完成后初���化
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
