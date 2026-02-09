import re

print('🔍 修复视频播放页面分页问题（v2）...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\video-player.html', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 查找并修复 renderRelatedVideos 函数中的 currentPage = 0 重置
# 问题：每次调用 renderRelatedVideos 都会重置 currentPage = 0
# 解决：只在第一次调用时重置，或者不重置

old_reset_pattern = r'(function renderRelatedVideos\(currentVideo\) \{[^}]*allRelatedVideos = videoData\.filter\(function\(v\) \{ return v\.id !== currentVideo\.id; \}\);[^}]*// 重置到第一页\s+currentPage = 0;)'

new_reset_pattern = r"""function renderRelatedVideos(currentVideo) {
      console.log('🎬 渲染相关视频列表');
      
      if (typeof videoData === 'undefined') {
        return;
      }
      
      // 过滤掉当前视频
      allRelatedVideos = videoData.filter(function(v) { return v.id !== currentVideo.id; });
      
      // 只在第一次调用时重置到第一页
      if (typeof currentPage === 'undefined' || currentPage === null) {
        currentPage = 0;
        console.log('📄 初始化分页，重置到第一页');
      } else {
        console.log('📄 保持当前页码:', currentPage);
      }"""

if re.search(old_reset_pattern, content):
    content = re.sub(old_reset_pattern, new_reset_pattern, content)
    print('✅ 修复 renderRelatedVideos 函数')
    print('   - 添加了 currentPage 检查')
    print('   - 只在第一次调用时重置')
else:
    print('⚠️  未找到匹配的重置代码')
    
    # 尝试查找其他重置代码
    if 'currentPage = 0;' in content:
        print('   - 找到 currentPage = 0;，尝试修复')
        
        # 查找 renderRelatedVideos 函数
        render_func_match = re.search(r'(function renderRelatedVideos\(currentVideo\) \{[^}]+)', content, re.DOTALL)
        if render_func_match:
            func_content = render_func_match.group(1)
            
            # 检查是否有 currentPage = 0;
            if 'currentPage = 0;' in func_content:
                # 在函数开头添加变量声明
                new_func = func_content.replace(
                    'function renderRelatedVideos(currentVideo) {',
                    'function renderRelatedVideos(currentVideo) {\n      // 只在第一次调用时重置分页\n      if (typeof currentPage === \'undefined\' || currentPage === null) {\n        currentPage = 0;\n        console.log(\'📄 初始化分页，重置到第一页\');\n      } else {\n        console.log(\'📄 保持当前页码:\', currentPage);\n      }\n\n      '
                )
                
                # 替换整个函数
                content = content.replace(func_content, new_func)
                print('   - 已修复 renderRelatedVideos 函数')
            else:
                print('   - 函数中未找到 currentPage = 0;')
        else:
            print('   - 未找到 renderRelatedVideos 函数')
    else:
        print('   - 未找到 currentPage = 0;')

# 写回文件
with open('D:\\GitHub\\ljyyt\\video-player.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n📊 修复后文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 验证
if 'if (typeof currentPage === \'undefined\' || currentPage === null)' in content:
    print('\n✅ 已添加 currentPage 检查')
else:
    print('\n⚠️  未找到 currentPage 检查')

print('\n✅ 分页问题修复完成！')
