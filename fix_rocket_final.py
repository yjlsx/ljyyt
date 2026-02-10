# 修复火箭按钮的显示逻辑和添加到其他页面

import re

# 1. 修复主页的火箭按钮显示逻辑
html_file = r'D:\GitHub\ljyyt\index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 删除旧的JavaScript
html_content = re.sub(r'<script>.*?function log\(message\).*?\).*?</script>', '', html_content, flags=re.DOTALL)

# 删除测试按钮
html_content = re.sub(r'<!-- 测试按钮 -->.*?</button>', '', html_content, flags=re.DOTALL)

# 添加新的JavaScript，修复显示逻辑
new_javascript = '''
  <script>
    // 控制台输出函数
    function log(message) {
      console.log(message);
    }
    
    // 滚动到顶部函数
    function scrollToTop() {
      log('scrollToTop 被调用');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // 显示/隐藏火箭按钮
    function updateRocketButton() {
      var scrollToTopBtn = document.getElementById('scrollToTopBtn');
      if (scrollToTopBtn) {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        log('当前滚动位置：' + scrollPosition);
        
        // 只有滚动超过300px才显示
        if (scrollPosition > 300) {
          scrollToTopBtn.classList.add('show');
          log('火箭按钮已显示');
        } else {
          scrollToTopBtn.classList.remove('show');
          log('火箭按钮已隐藏');
        }
      }
    }
    
    // 页面加载完成后检查
    document.addEventListener('DOMContentLoaded', function() {
      log('DOM已加载');
      
      var scrollToTopBtn = document.getElementById('scrollToTopBtn');
      if (scrollToTopBtn) {
        log('火箭按钮元素已找到');
        
        // 检查按钮样式
        var computedStyle = window.getComputedStyle(scrollToTopBtn);
        if (computedStyle.position === 'fixed') {
          log('火箭按钮样式正确');
        } else {
          log('火箭按钮样式错误：position = ' + computedStyle.position);
        }
        
        // 初始状态：隐藏
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        log('火箭按钮初始状态：隐藏');
        
        // 检查滚动位置，如果超过300px则显示
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollPosition > 300) {
          scrollToTopBtn.classList.add('show');
          log('页面加载时火箭按钮已显示');
        }
      } else {
        log('错误：找不到火箭按钮元素');
      }
      
      // 添加滚动事件监听器
      window.addEventListener('scroll', updateRocketButton);
      log('滚动事件监听器已添加');
      
      // 为导航栏品牌添加点击事件
      var navbarBrand = document.querySelector('.navbar-brand');
      if (navbarBrand) {
        navbarBrand.addEventListener('click', function(e) {
          e.preventDefault();
          scrollToTop();
        });
      }
      
      // 为首页链接添加点击事件
      var homeLink = document.querySelector('.nav-link.active[href="#"]');
      if (homeLink) {
        homeLink.addEventListener('click', function(e) {
          e.preventDefault();
          scrollToTop();
        });
      }
      
      // 为头像添加点击事件
      var avatar = document.querySelector('.navbar-brand img');
      if (avatar) {
        avatar.style.cursor = 'pointer';
        avatar.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          scrollToTop();
        });
      }
      
      log('火箭按钮功能已初始化');
    });
  </script>
'''

# 在</body>前添加
html_content = html_content.replace('</body>', new_javascript + '</body>')

# 写回HTML文件
with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print('✓ 已修复主页火箭按钮显示逻辑')
print('✓ 已删除测试按钮')

# 2. 添加火箭按钮到搜索页
search_file = r'D:\GitHub\ljyyt\search.html'

if os.path.exists(search_file):
    with open(search_file, 'r', encoding='utf-8') as f:
        search_content = f.read()
    
    # 检查是否已有火箭按钮
    if 'scrollToTopBtn' not in search_content:
        # 在</body>前添加火箭按钮和JavaScript
        search_content = search_content.replace('</body>', rocket_button + '</body>')
        
        with open(search_file, 'w', encoding='utf-8') as f:
            f.write(search_content)
        
        print('✓ 已添加火箭按钮到搜索页')
    else:
        print('✓ 搜索页已有火箭按钮')
else:
    print('⚠ 搜索页不存在')

# 3. 添加火箭按钮到视频播放页
video_file = r'D:\GitHub\ljyyt\video-player.html'

if os.path.exists(video_file):
    with open(video_file, 'r', encoding='utf-8') as f:
        video_content = f.read()
    
    # 检查是否已有火箭按钮
    if 'scrollToTopBtn' not in video_content:
        # 在</body>前添加火箭按钮和JavaScript
        video_content = video_content.replace('</body>', rocket_button + '</body>')
        
        with open(video_file, 'w', encoding='utf-8') as f:
            f.write(video_content)
        
        print('✓ 已添加火箭按钮到视频播放页')
    else:
        print('✓ 视频播放页已有火箭按钮')
else:
    print('⚠ 视频播放页不存在')

print('\n' + '='*60)
print('所有修复完成')
print('='*60)
print('\n修复内容：')
print('✓ 修复火箭按钮显示逻辑（滚动超过300px才显示）')
print('✓ 删除测试按钮')
print('✓ 添加火箭按钮到搜索页')
print('✓ 添加火箭按钮到视频播放页')
print('\n请在电脑和手机上刷新页面查看效果！')
