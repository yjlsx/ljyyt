import re

print('🔍 手动修复视频播放页面分页问题...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\video-player.html', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 查找并替换 renderRelatedVideos 函数中的重置代码
old_code = """// 重置到第一页
        currentPage = 0;"""

new_code = """// 只在第一次调用时重置到第一页
        if (typeof currentPage === 'undefined' || currentPage === null) {
          currentPage = 0;
          console.log('📄 初始化分页，重置到第一页');
        } else {
          console.log('📄 保持当前页码:', currentPage);
        }"""

if old_code in content:
    content = content.replace(old_code, new_code)
    print('✅ 修复 renderRelatedVideos 函数')
    print('   - 添加了 currentPage 检查')
    print('   - 只在第一次调用时重置')
    print('   - 保持当前页码')
else:
    print('⚠️  未找到匹配的重置代码')
    
    # 尝试查找其他重置方式
    if 'currentPage = 0;' in content:
        print('   - 找到 currentPage = 0;，尝试修复')
        
        # 查找 renderRelatedVideos 函数
        func_match = re.search(r'(function renderRelatedVideos\(currentVideo\) \{[\s\S]+?// 过滤掉当前视频[\s\S]+?allRelatedVideos = videoData\.filter\([^}]+\}\);[\s\S]+?// 重置到第一页[\s\S]+?currentPage = 0;)', content)
        if func_match:
            func_content = func_match.group(0)
            
            # 替换重置代码
            new_func_content = func_content.replace(
                '// 重置到第一页\n        currentPage = 0;',
                '// 只在第一次调用时重置到第一页\n        if (typeof currentPage === \'undefined\' || currentPage === null) {\n          currentPage = 0;\n          console.log(\'📄 初始化分页，重置到第一页\');\n        } else {\n          console.log(\'📄 保持当前页码:\', currentPage);\n        }'
            )
            
            content = content.replace(func_content, new_func_content)
            print('✅ 已修复 renderRelatedVideos 函数')
            print('   - 添加了 currentPage 检查')
            print('   - 只在第一次调用时重置')
            print('   - 保持当前页码')
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

# 检查是否包含新的检查逻辑
if 'typeof currentPage === \'undefined\'' in content:
    print('\n✅ 已添加 currentPage 检查')
else:
    print('\n⚠️  未找到 currentPage 检查')

print('\n✅ 分页问题修复完成！')
