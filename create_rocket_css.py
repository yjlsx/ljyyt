# 创建独立的火箭按钮CSS文件

# 火箭按钮CSS样式
rocket_css = '''/* 向上火箭按钮 */
.scroll-to-top {
  position: fixed !important;
  bottom: 110px !important;
  right: 20px !important;
  width: 50px !important;
  height: 50px !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border: none !important;
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

# 写入CSS文件
css_file = r'D:\GitHub\ljyyt\scroll_to_top.css'
with open(css_file, 'w', encoding='utf-8') as f:
    f.write(rocket_css)

print('✓ 已创建 scroll_to_top.css 文件')

# 更新HTML文件，删除内联样式，添加link标签
import re

html_file = r'D:\GitHub\ljyyt\index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 删除内联的火箭按钮CSS
html_content = re.sub(r'/\* 向上火箭按钮 - 全局样式 \*/.*?\.scroll-to-top:active \{.*?\}', '', html_content, flags=re.DOTALL)

# 删除旧的link标签
html_content = re.sub(r'<link rel="stylesheet" href="scroll_to_top\.css">', '', html_content)

# 在style.css后添加link标签
html_content = html_content.replace(
    '<link rel="stylesheet" href="style.css">',
    '<link rel="stylesheet" href="style.css">\n  <link rel="stylesheet" href="scroll_to_top.css">'
)

# 写回HTML文件
with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print('✓ 已更新 index.html')

# 更新搜索页
search_file = r'D:\GitHub\ljyyt\search.html'

if os.path.exists(search_file):
    with open(search_file, 'r', encoding='utf-8') as f:
        search_content = f.read()
    
    # 删除内联的火箭按钮CSS
    search_content = re.sub(r'/\* 向上火箭按钮 - 全局样式 \*/.*?\.scroll-to-top:active \{.*?\}', '', search_content, flags=re.DOTALL)
    
    # 删除旧的link标签
    search_content = re.sub(r'<link rel="stylesheet" href="scroll_to_top\.css">', '', search_content)
    
    # 在style.css后添加link标签
    search_content = search_content.replace(
        '<link rel="stylesheet" href="style.css">',
        '<link rel="stylesheet" href="style.css">\n  <link rel="stylesheet" href="scroll_to_top.css">'
    )
    
    with open(search_file, 'w', encoding='utf-8') as f:
        f.write(search_content)
    
    print('✓ 已更新 search.html')

# 更新视频播放页
video_file = r'D:\GitHub\ljyyt\video-player.html'

if os.path.exists(video_file):
    with open(video_file, 'r', encoding='utf-8') as f:
        video_content = f.read()
    
    # 删除内联的火箭按钮CSS
    video_content = re.sub(r'/\* 向上火箭按钮 - 全局样式 \*/.*?\.scroll-to-top:active \{.*?\}', '', video_content, flags=re.DOTALL)
    
    # 删除旧的link标签
    video_content = re.sub(r'<link rel="stylesheet" href="scroll_to_top\.css">', '', video_content)
    
    # 在style.css后添加link标签
    video_content = video_content.replace(
        '<link rel="stylesheet" href="style.css">',
        '<link rel="stylesheet" href="style.css">\n  <link rel="stylesheet" href="scroll_to_top.css">'
    )
    
    with open(video_file, 'w', encoding='utf-8') as f:
        f.write(video_content)
    
    print('✓ 已更新 video-player.html')

print('\n' + '='*60)
print('火箭按钮CSS文件创建完成')
print('='*60)
print('\n修复内容：')
print('✓ 创建独立的 scroll_to_top.css 文件')
print('✓ 删除内联CSS代码')
print('✓ 添加link标签引用')
print('✓ 更新所有页面')
print('\n请在电脑和手机上刷新页面查看效果！')
