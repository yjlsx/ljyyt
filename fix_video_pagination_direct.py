import re

print('🔍 直接修复视频播放页面分页问题...\n')

# 读取文件
with open('D:\\GitHub\\'ljyyt\\video-player.html', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 查找 renderRelatedVideos 函数并修复
# 问题：每次调用都会重置 currentPage = 0
# 解决：只在第一次调用时重置

# 查找函数开始位置
func_start = content.find('function renderRelatedVideos(currentVideo) {')
if func_start != -1:
    print('✅ 找到 renderRelatedVideos 函数')
    
    # 查找函数结束位置
    func_end = content.find('}', func_start)
    if func_end != -1:
        # 提取函数内容
        func_content = content[func_start:func_end+1]
        
        # 查找重置代码
        reset_pos = func_content.find('// 重置到第一页')
        if reset_pos != -1:
            # 查找下一行
            next_line_start = func_content.find('\n', reset_pos)
            if next_line_start != -1:
                # 查找 currentPage = 0;
                reset_code_pos = func_content.find('currentPage = 0;', next_line_start)
                if reset_code_pos != -1:
                    # 找到这行的结束
                    reset_code_end = func_content.find(';', reset_code_pos)
                    if reset_code_end != -1:
                        # 替换重置代码
                        old_code = func_content[reset_code_pos:reset_code_end+1]
                        new_code = """// 只在第一次调用时重置到第一页
        if (typeof currentPage === 'undefined' || currentPage === null) {
          currentPage = 0;
          console.log('📄 初始化分页，重置到第一页');
        } else {
          console.log('📄 保持当前页码:', currentPage);
        }"""
                        
                        func_content = func_content[:reset_code_pos] + new_code + func_content[reset_code_end+1:]
                        
                        # 替换函数内容
                        content = content[:func_start] + func_content + content[func_end+1:]
                        
                        print('✅ 修复 renderRelatedVideos 函数')
                        print('   - 添加了 currentPage 检查')
                        print('   - 只在第一次调用时重置')
                        print('   - 保持当前页码')
                    else:
                        print('⚠️  未找到重置代码结束位置')
                else:
                    print('⚠️  未找到重置代码')
            else:
                print('⚠️  未找到下一行')
        else:
            print('⚠️  未找到重置代码')
    else:
        print('❌ 未找到函数结束位置')
else:
    print('❌ 未找到 renderRelatedVideos 函数')

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
    print('\n⚠️  未找到 currentPage: 检查')

print('\n✅ 分页问题修复完成！')
