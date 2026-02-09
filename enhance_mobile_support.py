import re

# 读取index.html文件
file_path = r'D:\GitHub\ljyyt\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 检查并添加必要的移动端meta标签
mobile_metas = [
    ('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">', 'viewport'),
    ('<meta name="apple-mobile-web-app-capable" content="yes">', 'apple-web-app'),
    ('<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',">', 'status-bar'),
    ('<meta name="format-detection" content="telephone=no">', 'format-detection'),
    ('<meta name="mobile-web-app-capable" content="yes">', 'mobile-web-app'),
]

head_end = content.find('</head>')
if head_end == -1:
    print('错误：找不到</head>标签')
    exit(1)

head_content = content[:head_end]

# 检查是否缺少必要的meta标签
missing_metas = []
for meta_tag, meta_name in mobile_metas:
    if meta_tag not in head_content:
        missing_metas.append(meta_tag)

if missing_metas:
    print('发现缺少的移动端meta标签，正在添加...')
    # 在charset标签后插入meta标签
    charset_pos = head_content.find('<meta charset=')
    if charset_pos != -1:
        # 找到charset标签的结束位置
        charset_end = head_content.find('>', charset_pos) + 1
        # 插入缺少的meta标签
        new_head = head_content[:charset_end] + '\n  ' + '\n  '.join(missing_metas) + '\n' + head_content[charset_end:]
        content = new_head + content[head_end:]
        print('✓ 已添加移动端meta标签')
else:
    print('✓ 所有必要的移动端meta标签已存在')

# 检查是否引用了style_mobile.css
if 'style_mobile.css' not in content:
    print('正在添加style_mobile.css引用...')
    # 在style.css后添加
    style_css_pos = content.find('<link rel="stylesheet" href="style.css">')
    if style_css_pos != -1:
        style_css_end = content.find('>', style_css_pos) + 1
        content = content[:style_css_end] + '\n  <link rel="stylesheet" href="style_mobile.css">' + content[style_css_end:]
        print('✓ 已添加style_mobile.css引用')
else:
    print('✓ style_mobile.css已引用')

# 检查并优化底部播放器的移动端显示
if 'bottom-player' in content:
    # 确保底部播放器有正确的移动端样式
    if 'position: fixed' not in content or 'bottom: 0' not in content:
        print('正在优化底部播放器定位...')
        # 在style标签中添加移动端播放器样式
        style_end = content.find('</style>')
        if style_end != -1:
            mobile_player_style = '''
    
    /* 移动端底部播放器优化 */
    @media (max-width: 767.98px) {
      .bottom-player {
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 9999 !important;
      }
      
      body {
        padding-bottom: 80px !important;
      }
    }
'''
            content = content[:style_end] + mobile_player_style + content[style_end:]
            print('✓ 已优化底部播放器移动端样式')
    else:
        print('✓ 底部播放器移动端样式已优化')

# 检查并优化触摸事件
if 'touch-action' not in content:
    print('正在添加触摸优化...')
    style_end = content.find('</style>')
    if style_end != -1:
        touch_style = '''
    
    /* 触摸优化 */
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
    }
    
    .music-card, .video-card, .btn {
      touch-action: manipulation;
      cursor: pointer;
    }
'''
        content = content[:style_end] + touch_style + content[style_end:]
        print('✓ 已添加触摸优化')
else:
    print('✓ 触摸优化已存在')

# 检查并优化视频播放器的移动端显示
if 'video-player' in content or 'video' in content.lower():
    print('正在优化视频播放器移动端显示...')
    style_end = content.find('</style>')
    if style_end != -1:
        video_style = '''
    
    /* 视频播放器移动��优化 */
    @media (max-width: 767.98px) {
      video, iframe {
        max-width: 100% !important;
        height: auto !important;
      }
      
      .video-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 比例 */
        height: 0;
        overflow: hidden;
      }
      
      .video-container video,
      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
'''
        content = content[:style_end] + video_style + content[style_end:]
        print('✓ 已优化视频播放器移动端显示')

# 检查并优化搜索框的移动端显示
if 'search' in content.lower():
    print('正在优化搜索框移动端显示...')
    style_end = content.find('</style>')
    if style_end != -1:
        search_style = '''
    
    /* 搜索框移动端优化 */
    @media (max-width: 767.98px) {
      #search-form {
        width: 100%;
        margin-top: 0.5rem;
      }
      
      #search-input {
        flex: 1;
        font-size: 16px; /* 防止iOS自动缩放 */
      }
    }
'''
        content = content[:style_end] + search_style + content[style_end:]
        print('✓ 已优化搜索框移动端显示')

# 检查并优化导航栏的移动端显示
if 'navbar' in content:
    print('正在优化导航栏移动端显示...')
    style_end = content.find('</style>')
    if style_end != -1:
        navbar_style = '''
    
    /* 导航栏移动端优化 */
    @media (max-width: 767.98px) {
      .navbar {
        padding: 0.5rem 0;
      }
      
      .navbar-brand {
        font-size: 1rem;
      }
      
      .navbar-brand img {
        width: 28px;
        height: 28px;
      }
      
      .navbar-collapse {
        background: #0d6efd;
        padding: 1rem 0;
      }
      
      .nav-link {
        padding: 0.75rem 1rem;
      }
    }
'''
        content = content[:style_end] + navbar_style + content[style_end:]
        print('✓ 已优化导航栏移动端显示')

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('\n' + '='*50)
print('移动端优化完成！')
print('='*50)
print('\n已完成的优化：')
print('✓ 添加移动端meta标签')
print('✓ 引用style_mobile.css')
print('✓ 优化底部播放器')
print('✓ 添加触摸优化')
print('✓ 优化视频播放器')
print('✓ 优化搜索框')
print('✓ 优化导航栏')
print('\n现在你的网站可以在手机上完美使用了！')
