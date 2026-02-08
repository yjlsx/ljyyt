import re

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 修复 playMusic 函数
content = re.sub(
    r'audioPlayer\.play\(\)\.then\(function\(\) \{',
    'audioPlayer.play().then(function() {\n    isPlaying = true;\n    updatePlayButton();',
    content
)

# 修复 pauseMusic 函数
content = re.sub(
    r'(audioPlayer\.pause\(\);)',
    r'\1\n  isPlaying = false;\n  updatePlayButton();',
    content
)

# 写回文件
with open('D:\\GitHub\\ljyyt\\script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ 播放按钮修复完成')
