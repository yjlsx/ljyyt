import re

print('🔍 修复视频播放页面分页问题...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\video-player.html', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 查找并修复 playVideo 函数中的分页重置问题
# 问题：每次播放视频时都会重置 currentPage = 0
# 解决：只在第一次播放时重置，或者不重置

old_playvideo = r"""function playVideo\(videoId\) \{
      var video = findVideoById\(videoId\);
      if \(video\) \{
        currentVideoId = videoId;
        renderVideoPlayer\(video\);
        renderRelatedVideos\(video\);
        // 滚动到顶部
        window\.scrollTo\(0, 0\);
      \}
    \}"""

new_playvideo = r"""function playVideo(videoId) {
      var video = findVideoById(videoId);
      if (video) {
        currentVideoId = videoId;
        renderVideoPlayer(video);
        
        // 只在第一次播放或切换到不同视频时才重新渲染相关视频
        if (currentVideoId !== videoId) {
          renderRelatedVideos(video);
        }
        
        // 滚动到顶部
        window.scrollTo(0, 0);
      }
    }"""

if old_playvideo in content:
    content = content.replace(old_playvideo, new_playvideo)
    print('✅ 修复 playVideo 函数')
    print('   - 添加了视频ID检查')
    print('   - 避免不必要的重新渲染')
else:
    print('⚠️  未找到匹配的 playVideo 函数')
    
    # 尝试更简单的修复
    if 'renderRelatedVideos(video);' in content:
        print('   - 找到 renderRelatedVideos 调用')
        # 查找并修复 renderRelatedVideos 函数中的重置代码
        old_render = r'function renderRelatedVideos\(currentVideo\) \{[^}]*currentPage = 0;'
        new_render = r'function renderRelatedVideos(currentVideo) {'
        
        if re.search(old_render, content):
            content = re.sub(old_render, new_render, content)
            print('   - 已移除 currentPage = 0 重置')
        else:
            print('   - 未找到 currentPage = 0 重置')
    else:
        print('   - 未找到 renderRelatedVideos 调用')

# 写回文件
with open('D:\\GitHub\\ljyyt\\video-player.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n📊 修复后文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 验证语法
open_braces = content.count('{')
close_braces = content.count('}')
open_parens = content.count('(')
close_parens = content.count(')')

print('\n🔍 语法验证:')
if open_braces == close_braces:
    print(f'✅ 括号匹配: {{ {open_braces} 个, }} {close_braces} 个')
else:
    print(f'❌ 括号不匹配: {{ {open_braces} 个, }} {close_braces} 个')

if open_parens == close_parens:
    print(f'✅ 圆括号匹配: ( {open_parens} 个, ) {close_parens} 个')
else:
    print(f'❌ 圆括号不匹配: ( {open_parens} 个, ) {close_parens} 个')

print('\n✅ 分页问题修复完成！')
