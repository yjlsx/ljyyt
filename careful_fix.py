import re

print('🔍 小心地修复所有问题...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 修复1: 修改 playMusic 函数
old_playmusic = r"function playMusic\(\) \{\s*console\.log\('▶️ 播放音乐'\);\s*audioPlayer\.play\(\)\.then\(function\(\) \{\s*"
new_playmusic = r"function playMusic() {\n  console.log('▶️ 播放音乐');\n  audioPlayer.play().then(function() {\n    isPlaying = true;\n    updatePlayButton();\n    "

if old_playmusic in content:
    content = content.replace(old_playmusic, new_playmusic)
    print('✅ 修复1: playMusic 函数')
else:
    print('⚠️  修复1: playMusic 函数 - 未找到匹配')

# 修复2: 修改 pauseMusic 函数
old_pausemusic = r"function pauseMusic\(\) \{\s*console\.log\('⏸️ 暂停音乐'\);\s*audioPlayer\.pause\(\);"
new_pausemusic = r"function pauseMusic() {\n  console.log('⏸️ 暂停音乐');\n  audioPlayer.pause();\n  isPlaying = false;\n  updatePlayButton();"

if old_pausemusic in content:
    content = content.replace(old_pausemusic, new_pausemusic)
    print('✅ 修复2: pauseMusic 函数')
else:
    print('⚠️  修复2: pauseMusic 函数 - 未找到匹配')

# 修复3: 移除 loadTrack 中的 savePlayerState 调用
old_loadtrack = r"// 保存播放器状态\s+if \(typeof savePlayerState === 'function'\) \{\s+savePlayerState\(track\.id, 0, false, track\);\s+\}"
new_loadtrack = "// 注意：不在 loadTrack 时保存状态，避免重置播放进度"

if old_loadtrack in content:
    content = content.replace(old_loadtrack, new_loadtrack)
    print('✅ 修复3: loadTrack 函数 - 移除进度重置')
else:
    print('⚠️  修复3: loadTrack 函数 - 未找到匹配')

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

print('\n✅ 基础修复完成！')
