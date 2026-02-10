# 修复火箭按钮CSS格式

import re

# 火箭按钮CSS样式（格式化）
rocket_css = '''
  /* 向上火箭按钮 - 全局样式 */
  .scroll-to-top {
    position: fixed !important;
    bottom: 110px !important;
    right: 20px !important;
    width: 50px !important;
    height: 50px !important;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: white !important;
    border: none !important;
;
    border-radius: 50% !important;
    font-size: 1.2rem !important;
    cursor: pointer !important;
    z-index: 99999 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transition: all 0.3s ease !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  .scroll-to-top.show {
    opacity: 1 !important;
    visibility: visible !important;
  }
  
  .scroll-to-top:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4) !important;
  }
  
  .scroll-to-top:active {
    transform: translateY(-1px) !important;
  }
'''

# 1. 修复主页
html_file = r'D:\GitHub\ljyyt\index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 删除旧的火箭按钮CSS
html_content = re.sub(r'/\* 向上火箭按钮 - 全局样式 \*/.*?\.scroll-to-top:active \{.*?\}', '', html_content, flags=re.DOTALL)

# 在</head>前添加格式化的CSS
html_content = html_content.replace('</head>', rocket_css + '</head>')

# 写回HTML文件
with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print('✓ 已修复主页火箭按钮CSS格式')

# 2. 修复搜索页
search_file = r'D:\GitHub\ljyyt\search.html'

if os.path.exists(search_file):
    with open(search_file, 'r', encoding='utf-8') as f:
        search_content = f.read()
    
    # 删除旧的火箭按钮CSS
    search_content = re.sub(r'/\* 向上火箭按钮 - 全局样式 \*/.*?\.scroll-to-top:active.?\{.*?\}', '', search_content, flags=re.DOTALL)
    
    # 在</head>前添加格式化的CSS
    search_content = search_content.replace('</head>', rocket_css + '</head>')
    
    with open(search_file, 'w', encoding='utf-8') as f:
        f.write(search_content)
    
    print('✓ 已修复搜索页火箭按钮CSS格式')
else:
    print('⚠ 搜索页不存在')

# 3. 修复视频播放页
video_file = r'D:\GitHub\ljyyt\video-player.html'

if os.path.exists(video_file):
    with open(video_file, 'r', encoding='utf-8') as f:
        video_content = f.read()
    
    # 删除旧的火箭按钮CSS
    video_content = re.sub(r'/\* 向上火箭按钮 - 全局样式 \*/.*?\.scroll-to-top:active.?\{.*?\}', '', video_content, flags=re.DOTALL)
    
    # 在</head>前添加格式化的CSS
    video_content = video_content.replace('</head>', rocket_css + '</head>')
    
    with open(video_file, 'w', encoding='utf-8') as f:
        f.write(video_content)
    
    print('✓ 已修复视频播放页火箭按钮CSS格式')
else:
    print('⚠ 视频播放页不存在')

print('\n' + '='*60)
print('CSS格式修复完成')
print('='*60)
print('\n修复内容：')
print('✓ 火箭按钮CSS已格式化')
print('✓ 代码不再压缩成一行')
print('✓ 所有页面都已更新')
print('\n请在电脑和手机上刷新页面查看效果！')
