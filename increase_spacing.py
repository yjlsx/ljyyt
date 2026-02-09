import re

print('🔍 增加歌手名和时间的距离...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 查找并替换 me-2 为 me-4（增加距离）
old_spacing = "me-2\">"
new_spacing = "me-4\">"

if old_spacing in content:
    count = content.count(old_spacing)
    content = content.replace(old_spacing, new_spacing)
    print(f'✅ 已将 {count} 处 me-2 替换为 me-4')
    print('   - 距离从 0.5rem (8px) 增加到 1.5rem (24px)')
else:
    print('⚠️  未找到 me-2，尝试查找其他间距类')
    
    # 检查是否有其他间距类
    if 'me-1' in content:
        print('   - 找到 me-1，替换为 me-4')
        content = content.replace('me-1">', 'me-4>')
    elif 'me-3' in content:
        print('   - 找到 me-3，替换为 me-5')
        content = content.replace('me-3">', 'me-5>')
    else:
        print('   - 未找到间距类，添加 me-4')
        # 在歌手名字的 p 标签中添加 me-4
        content = content.replace(
            "card-text text-muted mb-0\">",
            "card-text text-muted mb-0 me-4\">"
        )

# 写回文件
with open('D:\\GitHub\\ljyyt\\script.js', 'w', encoding='utf-8') as f:
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

# 检查是否包含新的间距
if 'me-4' in content:
    print('\n✅ 已添加 me-4 间距类')
    print('   - 距离为 1.5rem (24px)')
elif 'me-5' in content:
    print('\n✅ 已添加 me-5 间距类')
    print('   - 距离为 2rem (32px)')
else:
    print('\n⚠️  未找到新的间距类')

print('\n✅ 距离调整完成！')
