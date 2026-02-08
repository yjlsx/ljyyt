import re

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 修复 initPlayerStateRestore 函数，使用 loadedmetadata 事件
old_pattern = r'function initPlayerStateRestore\(\) \{.*?if \(trackIndex !== -1\) \{.*?currentTrackIndex = trackIndex;.*?setTimeout\(function\(\) \{.*?loadTrack\(currentTrackIndex\);.*?if \(savedState\.currentTime > 0\) \{.*?audioPlayer\.currentTime = savedState\.currentTime;.*?\}.*?if \(savedState\.isPlaying\) \{.*?playMusic\(\);.*?\}.*?console\.log\(\'✅ 播放状态已恢复\'\);.*?\}, 500\);.*?return true;.*?\}.*?\}.*?return false;.*?\}'

new_code = '''function initPlayerStateRestore() {
    console.log('📥 初始化播放器状态恢复...');
    
    if (typeof hasSavedPlayerState === 'function' && hasSavedPlayerState()) {
      const savedState = restorePlayerState();
      
      if (savedState && savedState.trackData) {
        console.log('📥 恢复播放状态:', savedState.trackData.title);
        
        const trackIndex = musicData.findIndex(function(track) {
          return track.id === savedState.trackId;
        });
        
        if (trackIndex !== -1) {
          currentTrackIndex = trackIndex;
          
          // 先加载音乐
          loadTrack(currentTrackIndex);
          
          // 使用 loadedmetadata 事件确保音频加载完成后再设置进度
          audioPlayer.addEventListener('loadedmetadata', function onMetadataLoaded() {
            // 恢复播放位置
            if (savedState.currentTime > 0) {
              audioPlayer.currentTime = savedState.currentTime;
              console.log('📍 恢复播放位置:', savedState.currentTime);
            }
            
            // 如果之前在播放，则继续播放
            if (savedState.isPlaying) {
              playMusic();
            }
            
            console.log('✅ 播放状态已恢复');
            
            // 移除事件事件监听器，避免重复触发
            audioPlayer.removeEventListener('loadedmetadata', onMetadataLoaded);
          });
          
          return true;
        }
      }
    }
    
    return false;
  }'''

content = re.sub(old_pattern, new_code, content, flags=re.DOTALL)

# 写回文件
with open('D:\\GitHub\\ljyyt\\script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ initPlayerStateRestore 函数已修复')
