# 同步搜索页的导航栏，使其与首页一致

import re
import os

# 读取首页的导航栏
html_file = r'D:\GitHub\ljyyt\index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 提取首页的导航栏
match = re.search(r'<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">.*?</nav>', html_content, flags=re.DOTALL)
if match:
    navbar_html = match.group(0)
    
    # 同步到搜索页
    search_file = r'D:\GitHub\ljyyt\search.html'
    
    if os.path.exists(search_file):
        with open(search_file, 'r', encoding='utf-8') as f:
            search_content = f.read()
        
        # 替换搜索页的导航栏
        search_content = re.sub(
            r'<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">.*?</nav>',
            navbar_html,
            search_content,
            flags=re.DOTALL
        )
        
        # 写回搜索页
        with open(search_file, 'w', encoding='utf-8') as f:
            f.write(search_content)
        
        print('✓ 已同步搜索页的导航栏，使其与首页一致')
        print('\n' + '='*60)
        print('搜索页导航栏同步完成')
        print('='*60)
        print('\n修复内容：')
        print('✓ 搜索页的导航栏与首页一致')
        print('✓ 保留搜索页的功能')
        print('\n请在电脑和手机上刷新搜索页查看效果！')
    else:
        print('⚠ 搜索页不存在')
else:
    print('⚠ 未找到首页的导航栏')
