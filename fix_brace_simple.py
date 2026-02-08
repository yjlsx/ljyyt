import re

print('🔍 修复括号问题...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 查找并替换问题模式
# 查找: console.log('🎬 视频数量:', ...);\n});
# 替换为: console.log('🎬 视频数量:', ...);\n}

pattern = r"(console\.log\('🎬 视频数量:', typeof videoData !== 'undefined' \? videoData\.length : '未定义'\);\);)\s+(\});"

match = re.search(pattern, content)
if match:
    print('找到问题模式')
    print('匹配内容:', match.group(0)[:100])
    
    # 替换为正确的格式
    replacement = r"\1\n}"
    content = re.sub(pattern, replacement, content)
    
    print('✅ 已修复')
else:
    print('未找到问题模式，尝试其他方法...')
    
    # 尝试更简单的替换
    content = content.replace(
        "console.log('🎬 视频数量:', typeof videoData !== 'undefined' ? videoData.length : '未定义');\n});",
        "console.log('🎬 视频数量:', typeof videoData !== 'undefined' ? videoData.length : '未定义');\n}"
    )
    print('✅ 已尝试修复')

# 写回文件
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
