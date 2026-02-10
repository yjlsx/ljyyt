// 播放器状态管理 - 跨页面共享
console.log('🎵 播放器状态管理模块加载');

// 保存播放器状态到 localStorage
function savePlayerState(trackId, currentTime, isPlaying, trackData, volume) {
  const playerState = {
    trackId: trackId,
    currentTime: currentTime,
    isPlaying: isPlaying,
    timestamp: Date.now(),
    trackData: trackData || null,
    volume: volume !== undefined ? volume : 0.5 // 默认音量0.5
  };
  localStorage.setItem('playerState', JSON.stringify(playerState));
  console.log('💾 播放器状态已保存:', playerState);
}

// 从 localStorage 恢复播放器状态
function restorePlayerState() {
  const savedState = localStorage.getItem('playerState');
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      // 检查状态是否还有效（不超过30分钟）
      if (Date.now() - state.timestamp < 30 * 60 * 1000) {
        console.log('📥 恢复播放器状态:', state);
        return state;
      } else {
        console.log('⚠️ 播放器状态已过期');
        localStorage.removeItem('playerState');
        return null;
      }
    } catch (e) {
      console.error('❌ 恢复播放器状态失败:', e);
      localStorage.removeItem('playerState');
      return null;
    }
  }
  return null;
}

// 清除播放器状态
function clearPlayerState() {
  localStorage.removeItem('playerState');
  console.log('🗑️ 播放器状态已清除');
}

// 检查是否有保存的播放状态
function hasSavedPlayerState() {
  const savedState = localStorage.getItem('playerState');
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      return Date.now() - state.timestamp < 30 * 60 * 1000;
    } catch (e) {
      return false;
    }
  }
  return false;
}
