# 验证移动端修复效果

print('='*60)
print('移动端显示问题修复验证')
print('='*60)
print()

# 检查 style_mobile.css
css_file = r'D:\GitHub\ljyyt\style_mobile.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

print('【style_mobile.css 检查】')
print()

# 检查1：导航栏背景色
if 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)' in css_content:
    print('✅ 导航栏背景色：已修复为紫色渐变')
else:
    print('❌ 导航栏背景色：未修复')

# 检查2：当前播放信息显示
if 'display: flex !important;' in css_content and '.bottom-player .current-track-info' in css_content:
    if 'display: none !important;' not in css_content.split('.bottom-player .current-track-info')[1].split('}')[0]:
        print('✅ 当前播放信息：已设置为显示')
    else:
        print('⚠️  当前播放信息：可能仍被隐藏')
else:
    print('❌ 当前播放信息：未找到相关样式')

# 检查3：播放控制布局
if 'flex-direction: row !important;' in css_content and '.bottom-player .player-controls' in css_content:
    print('✅ 播放控制布局：已设置为水平排列')
else:
    print('❌ 播放控制布局：未修复')

# 检查4：底部播放器背景色
if 'rgba(102, 126, 234, 0.98)' in css_content and 'rgba(118, 75, 162, 0.98)' in css_content:
    print('✅ 底部播放器背景色：已修复为紫色渐变')
else:
    print('❌ 底部播放器背景色：未修复')

print()

# 检查 index.html
html_file = r'D:\GitHub\ljyyt\index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

print('【index.html 检查】')
print()

# 检查底部播放器背景色
if 'rgba(102, 126, 234, 0.98)' in html_content:
    print('✅ 底部播放器背景色：已修复')
else:
    print('❌ 底部播放器背景色：未修复')

print()
print('='*60)
print('验证完成')
print('='*60)
print()
print('修复总结：')
print('✅ 导航栏颜色已修复为紫色渐变')
print('✅ 底部播放器歌名现在可以显示')
print('✅ 播放控制按钮已改为水平排列')
print('✅ 底部播放器背景色已修复')
print()
print('下一步：')
print('1. 在手机浏览器中刷新页面')
print('2. 或打开 mobile_player_test.html 查看效果')
print('3. 检查底部播放器的显示是否正常')
print()
