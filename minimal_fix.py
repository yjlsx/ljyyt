import re

print('🔍 最小化修复 - 只修复播放按钮问题...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 修复1: 在 playMusic 函数中添加 isPlaying 和 updatePlayButton
# 查找: audioPlayer.play().then(function() {
# 在后面添加: isPlaying = true; updatePlayButton();

pattern = r"(audioPlayer\.play\(\)\.then\(function\(\) \{)"
if re.search(pattern, content):
    # 只替换第一个匹配（在 playMusic 函数中的）
    content = re.sub(pattern, r"\1\n    isPlaying = true;\n    updatePlayButton();", content, count=1)
    print('✅ 修复1: playMusic 函数 - 添加状态更新')
else:
    print('⚠️  修复1: 未找到匹配')

# 修复2: 在 pauseMusic 函数中添加 isPlaying 和 updatePlayButton
# 查找: audioPlayer.pause();
# 在后面添加: isPlaying = false; updatePlayButton();

# 先找到 pauseMusic 函数的位置
pausemusic_match = re.search(r"function pauseMusic\(\) \{", content)
if pausemusic_match:
    # 从这个位置开始查找第一个 audioPlayer.pause();
    pausemusic_start = pausemusic_match.start()
    pause_section = content[pausemusic_start:pausemusic_start + 500]
    
    # 在这个段落中替换
    pause_pattern = r"(audioPlayer\.pause\(\);)"
    if re.search(pause_pattern, pause_section):
        # 在整个文件中替换，但只替换 pauseMusic 函数中的第一个
        # 我们需要更精确的匹配
        full_pattern = r"(function pauseMusic\(\) \{[^}]*?audioPlayer\.pause\(\);)"
        match = re.search(full_pattern, content)
        if match:
            old_text = match.group(1)
            new_text = old_text.replace(
                "audioPlayer.pause();",
                "audioPlayer.pause();\n  isPlaying = false;\n  updatePlayButton();"
            )
            content = content.replace(old_text, new_text, 1)
            print('✅ 修复2: pauseMusic 函数 - 添加状态更新')
        else:
            print('⚠️  修复2: 未找到精确匹配')
    else:
        print('⚠️  修复2: pauseMusic 函数中未找到 audioPlayer.pause()')
else:
    print('⚠️  修复2: 未找到 pauseMusic 函数')

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

# 检查关键函数
functions = ['renderMusicList', 'renderVideoList', 'loadTrack', 'playMusic', 'pauseMusic']
print('\n📋 关键函数检查:')
for func in functions:
    if f'function {func}' in content:
        print(f'   ✅ {func} 函数存在')
    else:
        print(f'   ❌ {func} 函数不存在')

print('\n✅ 最小化修复完成！')
