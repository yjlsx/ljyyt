import re

print('🔍 修复视频播放页面分页问题...\n')

# 读取文件

with open('D:\\GitHub\\ljyyt\\video-player.html', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print('   文件大小: ' + str(len(content)) + ' 字节')
print('   行数: ' + str(content.count('\n')) + ' 行')

# 查找 renderRelatedVideos 函数
render_related_match = re.search(r'function renderRelatedVideos\(currentVideo\) \{[\s\S]+?// 渲染相关视频列表[\s\S]+?// 渲染当前视频[\s\S]+?// \{[^}]+\}+\}', content, re.DOTALL)

if render_related_match:
    print('✅ 找到 renderRelatedVideos 函数')
    
    # 提取函数内容
    func_content = render_related_match.group(1)
    
    # 查找重置代码
    reset_code_pattern = r'(// 重置到第一页\s+currentPage = 0;)'
    
    if reset_code_pattern in func_content:
        print('   找到重置代码: ' + reset_code_pattern)
        
        # 替换重置代码
        new_reset_code = r"""// 只在第一次调用时重置到第一页
        if (typeof currentPage === 'undefined' || currentPage === null) {
          currentPage = 0;
          console.log('📄 初始化分页，重置到第一页');
        } else {
          console.log('📄 保持当前页码:', currentPage);
        }"""
        
        content = func_content.replace(reset_code_pattern, new_reset_code)
        print('✅ 修复 renderRelatedVideos 函数')
        print('   - 添加了 currentPage 检查')
        print('   - 只在第一次调用时重置')
        print('   - 保持当前页码')
    else:
        print('⚠️  未找到重置代码')
else:
    print('⚠️  未找到 renderRelatedVideos 函数')
    
    # 写回文件
    with open('D:\\GitHub\\ljyyt\\video-player.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print('\n📊 修复后文件统计:')
    print('   文件大小: ' + str(len(content)) + ' 字节')
    print('   行数: ' + str(content.count('\n')) + ' 行')
    
    # 验证语法
    open_braces = content.count('{')
    close_braces = content.count('}')
    open_parens = content.count('(')
    close_parens = content.count(')')
    
    print('\n🔍 语法验证:')
    if open_braces == close_braces:
        print('✅ 括号匹配: { ' + str(open_braces) + ' 个, } ' + str(close_braces) + ' 个')
    else:
        print('❌ 括号不匹配: { ' + str(open_braces) + ' 个, } ' + str(close_braces) + ' 个')
    
    if open_parens == close_parens:
        print('✅ 圆括号匹配: ( ' + str(open_parens) + ' 个, ) ' + str(close_parens) + ' 个')
    else:
        print('❌ 圆括号不匹配: ( ' + str(open_parens) + ' 个, ) ' + str(close_parens) + ' 个')
    
    # 检查是否包含新的检查逻辑
    if 'typeof currentPage === \'undefined\'' in content:
        print('\n✅ 已添加 currentPage 检查')
    else:
        print('\n⚠️  未找到 currentPage 检查')
    
    print('\n✅ 分页问题修复完成！')
    print('\n💡 说明:')
    print('   - 只在第一次调用 renderRelatedVideos 时重置分页')
    print('   - 保持当前页码')
    print('   - 避免了不必要的重置')
else:
    print('\n⚠️  未找到 renderRelatedVideos 函数')
    
except Exception as e:
    print('❌ 处理失败: ' + str(e))
