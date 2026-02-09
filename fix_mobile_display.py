# 修复移动端显示问题

# 1. 修复 style_mobile.css
css_file = r'D:\GitHub\ljyyt\style_mobile.css'

with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

# 问题1：导航栏颜色变成蓝色 - 修复导航栏背景色
# 找到并替换导航栏折叠菜单的背景色
css_content = css_content.replace(
    '  .navbar-collapse {\n    background: #0d6efd;',
    '  .navbar-collapse {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);'
)

# 问题2：底部播放器歌名不显示 - 移除隐藏当前播放信息的样式
# 在小屏幕设备中，不应该隐藏当前播放信息
css_content = css_content.replace(
    '  /* 隐藏当前播放信息 */\n  .bottom-player .current-track-info {\n    display: none !important;\n  }',
    '  /* 显示当前播放信息 - 移动端优化 */\n  .bottom-player .current-track-info {\n    display: flex !important;\n    flex-direction: column;\n    align-items: flex-start;\n    min-width: 120px;\n  }\n  \n  .bottom-player .current-track-info img {\n    display: none !important;\n  }\n  \n  .bottom-player .current-track-info h6 {\n    font-size: 0.85rem !important;\n    font-weight: 600;\n    margin-bottom: 2px !important;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-width: 100%;\n  }\n  \n  .bottom-player .current-track-info small {\n    font-size: 0.7rem !important;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-width: 100%;\n  }'
)

# 问题3：播放器按钮上下分布 - 修复播放控制布局
# 找到播放控制部分并优化
css_content = css_content.replace(
    '  /* 播放控制优化 */\n  .bottom-player .player-controls {\n    margin-right: 8px !important;\n    gap: 4px;\n  }',
    '  /* 播放控制优化 - 水平排列 */\n  .bottom-player .player-controls {\n    margin-right: 8px !important;\n    gap: 4px;\n    display: flex !important;\n    flex-direction: row !important;\n    align-items: center !important;\n  }'
)

# 优化底部播放器整体布局
css_content = css_content.replace(
    '  /* === 底部播放器完全优化 === */\n  .bottom-player {\n    padding: 8px 0 !important;\n    min-height: 80px;\n  }',
    '  /* === 底部播放器完全优化 === */\n  .bottom-player {\n    padding: 8px 0 !important;\n    min-height: 70px;\n    background: linear-gradient(180deg, rgba(102, 126, 234, 0.98) 0%, rgba(118, 75, 162, 0.98) 100%) !important;\n  }'
)

# 优化进度条容器
css_content = css_content.replace(
    '  /* 进度条优化 */\n  .bottom-player .progress-container {\n    flex-grow: 1 !important;\n    margin: 0 8px !important;\n  }',
    '  /* 进度条优化 */\n  .bottom-player .progress-container {\n    flex-grow: 1 !important;\n    margin: 0 8px !important;\n    min-width: 0;\n  }\n  \n  .bottom-player .progress-container .d-flex {\n    flex-direction: row !important;\n    align-items: center !important;\n  }'
)

# 修复大屏手机中的当前播放信息显示
css_content = css_content.replace(
    '  .bottom-player .current-track-info {\n    display: flex !important;\n  }',
    '  .bottom-player .current-track-info {\n    display: flex !important;\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  \n  .bottom-player .current-track-info img {\n    display: none !important;\n  }'
)

# 修复横屏模式中的当前播放信息
css_content = css_content.replace(
    '  .bottom-player .current-track-info {\n    display: none !important;\n  }',
    '  .bottom-player .current-track-info {\n    display: flex !important;\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  \n  .bottom-player .current-track-info img {\n    display: none !important;\n  }'
)

# 写回CSS文件
with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)

print('✓ 已修复 style_mobile.css')

# 2. 修复 index.html 中的内联样式
html_file = r'D:\GitHub\ljyyt\index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 修复底部播放器的背景色
html_content = html_content.replace(
    'background: linear-gradient(180deg, rgba(13, 110, 253, 0.95) 0%, rgba(102, 16, 242, 0.95) 100%);',
    'background: linear-gradient(180deg, rgba(102, 126, 234, 0.98) 0%, rgba(118, 75, 162, 0.98) 100%);'
)

# 写回HTML文件
with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print('✓ 已修复 index.html')

print('\n' + '='*50)
print('移动端显示问题修复完成！')
print('='*50)
print('\n已修复的问题：')
print('✓ 导航栏颜色已修复为紫色渐变')
print('✓ 底部播放器歌名现在可以显示')
print('✓ 播放控制按钮已改为水平排列')
print('✓ 底部播放器背景色已修复')
print('\n请在手机上刷新页面查看效果！')
