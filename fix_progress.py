import re

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 修复1: 修改 loadTrack 函数，不要在加载时重置播放进度为0
# 将 savePlayerState(track.id, 0, false, track) 改为不保存状态，或者保存当前状态
content = re.sub(
    r'// 保存播放器状态\s+if \(typeof savePlayerState === \'function\'\) \{\s+savePlayerState\(track\.id, 0, false, track\);\s+\}',
    '// 注意：不在 loadTrack 时保存状态，避免重置播放进度',
    content
)

# 修复2: 改进恢复播放状态的逻辑，使用 loadedmetadata 事件确保音频加载完成后再设置进度
# 找到恢复播放状态的代码块，并改进它
old_restore_pattern = r'if \(trackIndex !== -1\) \{\s+currentTrackIndex = trackIndex;\s+loadTrack\(currentTrackIndex\);\s+// 恢复播放位置\s+if \(savedState\.currentTime > 0\) \{\s+audioPlayer\.currentTime = savedState\.currentTime;\s+\}\s+// 如果之前在播放，则继续播放\s+if \(savedState\.isPlaying\) \{\s+playMusic\(\);\s+\}\s+console\.log\(\'✅ 播放状态已恢复\'\);'

new_restore_code = '''if (trackIndex !== -1) {
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
            
            // 移除事件监听器，避免重复触发
            audioPlayer.removeEventListener('loadedmetadata', onMetadataLoaded);
          });
        }'''

content = re.sub(old_restore_pattern, new_restore_code, content)

# 写回文件
with open('D:\\GitHub\\ljyyt\\script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ 播放进度恢复问题已修复')
print('   1. 移除了 loadTrack 中重置播放进度的代码')
print('   2. 改进了恢复播放状态的逻辑，使用 loadedmetadata 事件')
