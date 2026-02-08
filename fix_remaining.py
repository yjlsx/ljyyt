import re

print('🔍 修复剩余的函数...\n')

# 读取文件
with open('rD:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 修复 playMusic 函数
old_playmusic = r"audioPlayer\.play\(\)\.then\(function\(\) \{\s+"
new_playmusic = r"audioPlayer.play().then(function() {\n    isPlaying = true;\n    updatePlayButton();\n    "

if old_playmusic in content:
    content = content.replace(old_playmusic, new_playmusic)
    print('✅ 修复 playMusic 函数')
else:
    print('⚠️  playMusic 函数 - 未找到匹配')

# 修复 pauseMusic 函数
old_pausemusic = r"audioPlayer\.pause\(\);"
new_pausemusic = r"audioPlayer.pause();\n  isPlaying = false;\n  updatePlayButton();"

# 只替换第一个匹配（在 pauseMusic 函数中的）
pausemusic_pattern = r"(function pauseMusic\(\) \{[^}]*audioPlayer\.pause\(\);)"
match = re.search(pausemusic_pattern, content)
if match:
    old_text = match.group(1)
    new_text = old_text.replace(old_pausemusic, new_pausemusic)
    content = content.replace(old_text, new_text, 1)
    print('✅ 修复 pauseMusic 函数')
else:
    print('⚠️  pauseMusic 函数 - 未找到匹配')

# 修复 loadTrack 函数中的 savePlayerState
old_loadtrack = r"// 保存播放器状态\s+if \(typeof savePlayerState === 'function'\) \{\s+savePlayerState\(track\.id, 0, false, track\);\s+\}"
new_loadtrack = "// 注意：不在 loadTrack 时保存状态，避免重置播放进度"

if old_loadtrack in content:
    content = content.replace(old_loadtrack, new_loadtrack)
    print('✅ 修复 loadTrack 函数')
else:
    print('⚠️  loadTrack 函数 - 未找到匹配')

# 写回文件
with open('D:\\GitHub\\ljyyt\\script.js', 'w', encoding='utf-8') as f:
    f.write(content)

# 验证语法
open_braces = content.count('{')
close_braces = content.count('}')
open_parens = content.count('(')
close_parens = content.count(')')

print('\n🔍 语法验证:')
if open_braces == close_braces:
    print(f'   ✅ 括号匹配: {{ {open_braces} 个, }} {close_braces} 个')
else:
    print(f'   ❌ 括号不匹配: {{ {open_braces} 个, }} {close_braces} 个')

if open_parens == close_parens:
    print(f'   ✅ 圆括号匹配: ( {open_parens} 个, ) {close_parens} 个')
else:
    print(f'   ❌ 圆括号不匹配: ( {open_parens} 个, ) {close_parens} 个')

print('\n✅ 修复完成！')
