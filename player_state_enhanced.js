// 播放器状态增强 - 自动保存和恢复播放状态
console.log('🎵 播放器状态增强模块加载');

// 定期保存播放进度
function startProgressAutoSave() {
  console.log('⏰ 启动播放进度自动保存...');
  
  setInterval(function() {
    if (typeof isPlaying !== 'undefined' && isPlaying && typeof savePlayerState === 'function' && typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
      savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, true, musicData[currentTrackIndex]);
    }
  }, 5000);
}

// 初始化增强功能
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    startProgressAutoSave();
  }, 1000);
});
