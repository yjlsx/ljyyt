# 去掉导航栏中的品牌名称和头像

import re

# 读取主页
html_file = r'D:\GitHub\ljyyt\index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 替换导航栏品牌，只保留搜索栏
html_content = re.sub(
    r'<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">.*?</nav>',
    '''<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#" onclick="scrollToTop(); return false;">首页</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#about">关于我们</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contact">联系我们</a>
            </li>
          </ul>
          <!-- 搜索栏 -->
          <form class="d-flex" id="search-form">
            <input class="form-control me-2" type="search" id="search-input" placeholder="搜索音乐..." aria-label="搜索">
            <button class="btn btn-outline-light" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>''',
    html_content,
    flags=re.DOTALL
)

# 删除导航栏品牌相关的JavaScript
html_content = re.sub(r'// 为导航栏品牌添加点击事件.*?// 为头像添加点击事件', '', html_content, flags=re.DOTALL)

# 写回HTML文件
with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print('✓ 已去掉导航栏中的品牌名称和头像')
print('✓ 已保留导航链接和搜索栏')
print('✓ 已删除导航栏品牌相关的JavaScript')

print('\n' + '='*60)
print('导航栏品牌名称和头像去掉完成')
print('='*60)
print('\n修复内容：')
print('✓ 去掉导航栏中的"丽江音悦台"文字和头像')
print('✓ 保留导航链接和搜索栏')
print('✓ 删除导航栏品牌相关的JavaScript')
print('\n请在电脑和手机上刷新页面查看效果！')
