import re

print('🔍 修复音乐列表布局...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 修复 renderMusicList 函数中的音乐卡片布局
# 原始代码：
# '<small class="text-muted">时长: ' + formatTime(track.duration) + '</small>' +
# 修改为：
# '<small class="text-muted ms-3">' + formatTime(track.duration) + '</small>' +

old_layout = r"'<small class=\"text-muted\">时长: ' \+ formatTime\(track\.duration\) \+ '</small>' \+"
new_layout = r"'<small class=\"text-muted ms-3\">' + formatTime(track.duration) + '</small>' +"

if old_layout in content:
    content = content.replace(old_layout, new_layout)
    print('✅ 修复音乐列表布局')
    print('   - 移除了"时长"两个字')
    print('   - 添加了 ms-3 类来增加与歌手名字的距离')
else:
    print('⚠️  未找到匹配的布局代码')
    
    # 尝试查找类似的代码
    if '时长:' in content:
        print('   - 找到"时长:"，尝试其他匹配方式')
        # 使用更简单的替换
        content = content.replace(
            "时长: ",
            ""
        )
        print('   - 已移.除"时长:"')
    else:
        print('   - 未找到"时长:"')

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

# 检查是否还有"时长:"
if '时长:' in content:
    print('\n⚠️  警告: 文件中仍然包含"时长:"')
else:
    print('\n✅ "时长:"已完全移除')

print('\n✅ 布局修复完成！')
