import os
import re

print('🔍 开始验证修复...\n')

# 检查script.js文件
script_path = 'D:\\GitHub\\ljyyt\\script.js'
if os.path.exists(script_path):
    file_size = os.path.getsize(script_path)
    print(f'✅ script.js 文件存在')
    print(f'   文件大小: {file_size} 字节')
    
    if file_size > 1000:
        print(f'   ✅ 文件大小正常（大于1000字节）')
    else:
        print(f'   ❌ 文件大小异常（小于1000字节）')
    
    # 读取文件内容
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查关键函数
    checks = [
        ('musicData', '音乐数据'),
        ('function playMusic()', 'playMusic函数'),
        ('function pauseMusic()', 'pauseMusic函数'),
        ('function updatePlayButton()', 'updatePlayButton函数'),
        ('isPlaying = true', '播放状态更新'),
        ('isPlaying = false', '暂停状态更新'),
        ('updatePlayButton()', '更新播放按钮'),
        ('function renderMusicList()', '渲染音乐列表'),
        ('function renderVideoList()', '渲染视频列表'),
    ]
    
    print(f'\n📋 检查关键代码:')
    for pattern, description in checks:
        if pattern in content:
            print(f'   ✅ {description} 存在')
        else:
            print(f'   ❌ {description} 缺失')
    
    # 检查音乐数据数量
    music_data_count = content.count('id:')
    print(f'\n📊 数据统计:')
    print(f'   音乐数据条目: 约 {music_data_count // 5} 条')
    
else:
    print(f'❌ script.js 文件不存在')

# 检查其他文件
files_to_check = [
    'D:\\GitHub\\ljyyt\\index.html',
    'D:\\GitHub\\ljyyt\\videos\\video_data.js',
    'D:\\GitHub\\ljyyt\\player_state.js',
    'D:\\GitHub\\ljyyt\\player_state_enhanced.js',
]

print(f'\n📁 检查其他文件:')
for file_path in files_to_check:
    if os.path.exists(file_path):
        file_size = os.path.getsize(file_path)
        print(f'   ✅ {os.path.basename(file_path)} ({file_size} 字节)')
    else:
        print(f'   ❌ {os.path.basename(file_path)} 不存在')

print(f'\n✅ 验证完成！')
print(f'\n💡 建议:')
print(f'   1. 在浏览器中打开 index.html 测试')
print(f'   2. 检查音乐列表是否正常显示')
print(f'   3. 点击播放按钮，验证图标是否切换')
print(f'   4. 切换到视频标签页，检查视频列表')
