import re

print('🔍 开始修复所有问题...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 修复1: 修改 playMusic 函数
old_playmusic_pattern = r"(function playMusic\(\) \{[^}]*audioPlayer\.play\(\)\.then\(function\(\) \{)"
match = re.search(old_playmusic_pattern, content)
if match:
    old_text = match.group(1)
    new_text = old_text.replace(
        "audioPlayer.play().then(function() {",
        "audioPlayer.play().then(function() {\n    isPlaying = true;\n    updatePlayButton();"
    )
    content = content.replace(old_text, new_text, 1)
    print('✅ 修复1: playMusic 函数')
else:
    print('⚠️  修复1: playMusic 函数 - 未找到匹配')

# 修复2: 修改 pauseMusic 函数
old_pausemusic_pattern = r"(function pauseMusic\(\) \{[^}]*audioPlayer\.pause\(\);)"
match = re.search(old_pausemusic_pattern, content)
if match:
    old_text = match.group(1)
    new_text = old_text.replace(
        "audioPlayer.pause();",
        "audioPlayer.pause();\n  isPlaying = false;\n  updatePlayButton();"
    )
    content = content.replace(old_text, new_text, 1)
    print('✅ 修复2: pauseMusic 函数')
else:
    print('⚠️  修复2: pauseMusic 函数 - 未找到匹配')

# 修复3: 移除 loadTrack 中的 savePlayerState 调用
old_loadtrack_pattern = r"(// 保存播放器状态\s+if \(typeof savePlayerState === 'function'\) \{\s+savePlayerState\(track\.id, 0, false, track\);\s+\})"
match = re.search(old_loadtrack_pattern, content)
if match:
    old_text = match.group(1)
    new_text = "// 注意：不在 loadTrack 时保存状态，避免重置播放进度"
    content = content.replace(old_text, new_text, 1)
    print('✅ 修复3: loadTrack 函数 - 移除进度重置')
else:
    print('⚠️  修复3: loadTrack 函数 - 未找到匹配')

# 修复4: 改进 DOMContentLoaded 中的恢复逻辑
old_restore_pattern = r"(if \(trackIndex !== -1\) \{\s+currentTrackIndex = trackIndex;\s+)loadTrack\(currentTrackIndex\);\s+(\s+// 恢复播放位置\s+if \(savedState\.currentTime > 0\) \{\s+audioPlayer\.currentTime = savedState\.currentTime;\s+\}\s+\s+// 如果之前在播放，则继续播放\s+if \(savedState\.isPlaying\) \{\s+playMusic\(\);\s+\}\s+\s+console\.log\('✅ 播放状态已恢复'\);)"

new_restore_code = r"""\1// 先通过 loadTrack 加载音乐
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
          });"""

match = re.search(old_restore_pattern, content)
if match:
    old_text = match.group(0)
    content = content.replace(old_text, new_restore_code, 1)
    print('✅ 修复4: DOMContentLoaded 恢复逻辑')
else:
    print('⚠️  修复4: DOMContentLoaded 恢复逻辑 - 未找到匹配')

# 修复5: 改进 initPlayerStateRestore 函数
old_init_restore_pattern = r"(if \(trackIndex !== -1\) \{\s+currentTrackIndex = trackIndex;\s+\s+)setTimeout\(function\(\) \{\s+loadTrack\(currentTrackIndex\);\s+\s+if \(savedState\.currentTime > 0\) \{\s+audioPlayer\.currentTime = savedState\.currentTime;\s+\}\s+\s+if \(savedState\.isPlaying\) \{\s+playMusic\(\);\s+\}\s+\s+console\.log\('✅ 播放状态已恢复'\);\s+\}, 500\);"

new_init_restore_code = r"""\1// 先通过 loadTrack 加载音乐
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
          });"""

match = re.search(old_init_restore_pattern, content)
if match:
    old_text = match.group(0)
    content = content.replace(old_text, new_init_restore_code, 1)
    print('✅ 修复5: initPlayerStateRestore 函数')
else:
    print('⚠️  修复5: initPlayerStateRestore 函数 - 未找到匹配')

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
open_brackets = content.count('[')
close_brackets = content.count(']')

print('\n🔍 语法验证:')
all_good = True

if open_braces == close_braces:
    print(f'   ✅ 括号匹配: {{ {open_braces} 个, }} {close_braces} 个')
else:
    print(f'   ❌ 括号不匹配: {{ {open_braces} 个, }} {close_braces} 个')
    all_good = False

if open_parens == close_parens:
    print(f'   ✅ 圆括号匹配: ( {open_parens} 个, ) {close_parens} 个')
else:
    print(f'   ❌ 圆括号不匹配: ( {open_parens} 个, ) {close_parens} 个')
    all_good = False

if open_brackets == close_brackets:
    print(f'   ✅ 方括号匹配: [ {open_brackets} 个, ] {close_brackets} 个')
else:
    print(f'   ❌ 方括号不匹配: [ {open_brackets} 个, ] {close_brackets} 个')
    all_good = False

# 检查关键函数
functions = ['renderMusicList', 'renderVideoList', 'loadTrack', 'playMusic', 'pauseMusic']
print('\n📋 关键函数检查:')
for func in functions:
    if f'function {func}' in content:
        print(f'   ✅ {func} 函数存在')
    else:
        print(f'   ❌ {func} 函数不存在')
        all_good = False

if all_good:
    print('\n✅ 所有修复完成，语法检查通过！')
else:
    print('\n⚠️  修复完成，但存在一些问题，请检查')
