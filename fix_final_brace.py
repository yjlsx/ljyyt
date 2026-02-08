import re

print('🔍 修复最后的括号问题...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 查找问题行
lines = content.split('\n')

# 找到包含 "});" 且在 "DOMContentLoaded" 事件监听器结束位置的行
for i, line in enumerate(lines):
    if '});' in line and i > 900 and i < 1000:
        # 检查前几行，确认这是 DOMContentLoaded 的结束
        context = '\n'.join(lines[max(0, i-5):i+1])
        if 'DOMContentLoaded' in context or '页面初始化完成' in context:
            print(f'找到问题行 {i+1}: {line.strip()}')
            print('前5行:')
            for j in range(max(0, i-5), i):
                print(f'  {j+1}: {lines[j]}')
            
            # 修复这一行
            lines[i] = line.replace('});', '});')
            
            # 实际上，我们需要检查这是否是多余的 })
            # 让我们看看这个 }); 前面是否已经有正确的结束
            if i > 0 and '});' in lines[i-1]:
                print(f'⚠️  前一行也有 });，可能这一行是多余的')
                # 检查是否应该删除这一行
                print(f'修复: 将这一行的 }); 替换为 }')
                lines[i] = line.replace('});', '}')
            
            break

# 写回文件
content = '\n'.join(lines)
with open('D:\\GitHub\\ljyyt\\script.js', 'w', encoding='utf-8') as f:
    f.write(content)

# 验证语法
open_braces = content.count('{')
close_braces = content.count('}')
open_parens = content.count('(')
close_parens = content.count(')')

print('\n🔍 修复后语法验证:')
if open_braces == close_braces:
    print(f'✅ 括号匹配: {{ {open_braces} 个, }} {close_braces} 个')
else:
    print(f'❌ 括号不匹配: {{ {open_braces} 个, }} {close_braces} 个')

if open_parens == close_parens:
    print(f'✅ 圆括号匹配: ( {open_parens} 个, ) {close_parens} 个')
else:
    print(f'❌ 圆括号不匹配: ( {open_parens} 个, ) {close_parens} 个')

print('\n✅ 修复完成！')
