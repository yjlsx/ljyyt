// 播放器状态管理 - 跨页面共享
console.log('🎵 播放器状态管理模块加载');

function readPlayerStateValue(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writePlayerStateValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {}
}

function removePlayerStateValue(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {}
}

// 保存播放器状态到 localStorage
function savePlayerState(trackId, currentTime, isPlaying, trackData, volume) {
  const playerState = {
    trackId: trackId,
    currentTime: currentTime || 0,
    isPlaying: isPlaying || false,
    timestamp: Date.now(),
    trackData: trackData || null,
    volume: volume !== undefined ? volume : (typeof audioPlayer !== 'undefined' ? audioPlayer.volume : 0.5)
  };
  writePlayerStateValue('playerState', JSON.stringify(playerState));
  console.log('💾 播放器状态已保存:', playerState);
}

// 从 localStorage 恢复播放器状态
function restorePlayerState() {
  const savedState = readPlayerStateValue('playerState');
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      // 检查状态是否还有效（不超过24小时）
      if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
        console.log('📥 恢复播放器状态:', state);
        return state;
      } else {
        console.log('⚠️ 播放器状态已过期');
        removePlayerStateValue('playerState');
        return null;
      }
    } catch (e) {
      console.error('❌ 恢复播放器状态失败:', e);
      removePlayerStateValue('playerState');
      return null;
    }
  }
  return null;
}

// 清除播放器状态
function clearPlayerState() {
  removePlayerStateValue('playerState');
  console.log('🗑️ 播放器状态已清除');
}

// 检查是否有保存的播放状态
function hasSavedPlayerState() {
  const savedState = readPlayerStateValue('playerState');
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
