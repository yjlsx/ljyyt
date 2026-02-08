print('🔍 修复转义字符问题...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 修复前统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   \\[currentTrackIndex\\] 出现次数: {content.count(chr(92)+chr(91)+chr(99)+chr(117)+chr(114)+chr(114)+chr(101)+chr(110)+chr(116)+chr(84)+chr(114)+chr(97)+chr(99)+chr(107)+chr(73)+chr(110)+chr(100)+chr(101)+chr(120)+chr(93))}')

# 修复转义的方括号
content = content.replace('\\[currentTrackIndex\\]', '[currentTrackIndex]')

print('\n📋 修复后统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   [currentTrackIndex] 出现次数: {content.count("[currentTrackIndex]")}')

# 写回文件
with open('D:\\GitHub\\ljyyt\\script.js', 'w', encoding='utf-8') as f:
    f.write(content)

# 验证语法
open_braces = content.count('{')
close_braces = content.count('}')
open_parens = content.count('(')
close_parens = content.count(')')
open_brackets = content.count('[')
close_brackets = content.count(']')

print('\n🔍 语法验证:')
if open_braces == close_braces:
    print(f'✅ 括号匹配: {{ {open_braces} 个, }} {close_braces} 个')
else:
    print(f'❌ 括号不匹配: {{ {open_braces} 个, }} {close_braces} 个')

if open_parens == close_parens:
    print(f'✅ 圆括号匹配: ( {open_parens} 个, ) {close_parens} 个')
else:
    print(f'❌ 圆括号不匹配: ( {open_parens} 个, ) {close_parens} 个')

if open_brackets == close_brackets:
    print(f'✅ 方括号匹配: [ {open_brackets} 个, ] {close_brackets} 个')
else:
    print(f'❌ 方括号不匹配: [ {open_brackets} 个, ] {close_brackets} 个')

print('\n✅ 转义字符修复完成！')
