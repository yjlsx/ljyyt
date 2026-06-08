const fs = require('fs');

for (const file of ['script.js', 'dist/script.js']) {
  const script = fs.readFileSync(file, 'utf8');
  const beforeUnloadListeners = script.match(/window\.addEventListener\('beforeunload'/g) || [];
  const visibilityListeners = script.match(/document\.addEventListener\('visibilitychange'/g) || [];
  const periodicSaves = script.match(/setInterval\(function\(\)\s*\{\s*if \(musicData\[currentTrackIndex\]\) \{\s*persistCurrentPlayerState\(/g) || [];

  if (beforeUnloadListeners.length !== 1) {
    throw new Error(file + ' should register exactly one beforeunload player-state save listener, found ' + beforeUnloadListeners.length);
  }

  if (visibilityListeners.length !== 1) {
    throw new Error(file + ' should register exactly one visibilitychange player-state save listener, found ' + visibilityListeners.length);
  }

  if (periodicSaves.length !== 1) {
    throw new Error(file + ' should keep one periodic player-state save loop, found ' + periodicSaves.length);
  }

  if (!script.includes("console.log('🔄 页面卸载前保存播放器状态');")) {
    throw new Error(file + ' should keep the unload save diagnostic log on the single lifecycle listener');
  }
}
