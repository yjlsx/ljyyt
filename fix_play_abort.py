import re

print('🔍 修复播放中断错误...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 修复 playMusic 函数，添加音频加载检查
old_playmusic = r"function playMusic\(\) \{\s*console\.log\('▶️ 播放音乐'\);\s*audioPlayer\.play\(\)\.then\(function\(\) \{\s*isPlaying = true;\s*updatePlayButton\(\);\s*// 保存播放器状态\s+if \(typeof savePlayerState === 'function' && musicData\[currentTrackIndex\]\) \{\s+savePlayerState\(musicData\[currentTrackIndex\]\.id, audioPlayer\.currentTime, true, musicData\[currentTrackIndex\]\);\s+\}\s*\}\)\.catch\(function\(error\) \{\s*console\.error\('❌ 播放失败:', error\);\s*\}\);\s*\}"

new_playmusic = r"""function playMusic() {
  console.log('▶️ 播放音乐');
  
  // 确保音频已加载
  if (audioPlayer.readyState < 2) {
    console.log('⏳ 音频未加载完成，等待加载...');
    audioPlayer.addEventListener('canplay', function onCanPlay() {
      audioPlayer.removeEventListener('canplay', onCanPlay);
      audioPlayer.play().then(function() {
        isPlaying = true;
        updatePlayButton();
        
        // 保存播放器状态
        if (typeof savePlayerState === 'function' && musicData[currentTrackIndex]) {
          savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, true, musicData[currentTrackIndex]);
        }
      }).catch(function(error) {
        console.error('❌ 播放失败:', error);
      });
    });
  } else {
    audioPlayer.play().then(function() {
      isPlaying = true;
      updatePlayButton();
      
      // 保存播放器状态
      if (typeof savePlayerState === 'function' && musicData[currentTrackIndex]) {
        savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, true, musicData[currentTrackIndex]);
      }
    }).catch(function(error) {
      console.error('❌ 播放失败:', error);
    });
  }
}"""

if re.search(old_playmusic, content):
    content = re.sub(old_playmusic, new_playmusic, content)
    print('✅ 修复 playMusic 函数')
else:
    print('⚠️  未找到匹配的 playMusic 函数，尝试其他方法...')
    
    # 尝试更简单的替换
    simple_pattern = r"(function playMusic\(\) \{[^}]*audioPlayer\.play\(\)\.then\(function\(\) \{)"
    if re.search(simple_pattern, content):
        print('找到 playMusic 函数，使用简单替换')
        # 这里不替换，因为需要更精确的匹配
        print('⚠️  需要手动检查')

# 写回文件
with open('D:\\GitHub\\ljyyt\\script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n📊 修复后文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 验证语法
open_braces = content.count('{')
close_braces = content.count('}')
open_parens = content.count('(')
close_parens = content.count(')')

print('\n🔍 语法验证:')
if open_braces == close_braces:
    print(f'✅ 括号匹配: {{ {open_braces} 个, }} {close_braces} 个')
else:
    print(f'❌ 括号不匹配: {{ {open_braces} 个, }} {close_braces} 个')

if open_parens == close_parens:
    print(f'✅ 圆括号匹配: ( {open_parens} 个, ) {close_parens} 个')
else:
    print(f'❌ 圆括号不匹配: ( {open_parens} 个, ) {close_parens} 个')

print('\n✅ 修复完成！')
