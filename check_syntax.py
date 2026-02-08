import re

print('🔍 检查 script.js 语法...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 检查常见的语法错误
errors = []

# 1. 检查括号匹配
open_braces = content.count('{')
close_braces = content.count('}')
if open_braces != close_braces:
    errors.append(f'括号不匹配: {{ {open_braces} 个, }} {close_braces} 个')

# 2. 检查圆括号匹配
open_parens = content.count('(')
close_parens = content.count(')')
if open_parens != close_parens:
    errors.append(f'圆括号不匹配: ( {open_parens} 个, ) {close_parens} 个')

# 3. 检查方括号匹配
open_brackets = content.count('[')
close_brackets = content.count(']')
if open_brackets != close_brackets:
    errors.append(f'方括号不匹配: [ {open_brackets} 个, ] {close_brackets} 个')

# 4. 检查音乐数据定义
music_data_match = re.search(r'const musicData\s*=\s*\[', content)
if not music_data_match:
    errors.append('未找到 musicData 定义')

# 5. 检查音乐数据是否正确结束
music_data_section = re.search(r'const musicData\s*=\s*\[(.*?)\];', content, re.DOTALL)
if not music_data_section:
    errors.append('musicData 数组未正确结束')

# 6. 检查是否有未闭合的字符串
single_quotes = content.count("'")
if single_quotes % 2 != 0:
    errors.append(f'单引号数量为奇数: {single_quotes} 个')

# 7. 检查是否有未闭合的双引号
double_quotes = content.count('"')
if double_quotes % 2 != 0:
    errors.append(f'双引号数量为奇数: {double_quotes} 个')

# 8. 检查是否有语法错误的常见模式
syntax_errors = [
    (r'\[\s*\]', '空数组 []'),
    (r'\{\s*\}', '空对象 {}'),
    (r',\s*\]', '数组末尾多余的逗号'),
    (r',\s*\}', '对象末尾多余的逗号'),
]

for pattern, description in syntax_errors:
    if re.search(pattern, content):
        # 这些可能是正常的，只是警告
        pass

# 9. 检查关键函数是否存在
functions = [
    'renderMusicList',
    'renderVideoList',
    'loadTrack',
    'playMusic',
    'pauseMusic',
    'DOMContentLoaded'
]

for func in functions:
    if func not in content:
        errors.append(f'未找到函数或事件: {func}')

# 输出结果
if errors:
    print('❌ 发现语法错误:\n')
    for error in errors:
        print(f'   - {error}')
else:
    print('✅ 未发现明显的语法错误\n')

# 统计信息
print('📊 代码统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')
print(f'   函数定义: {content.count("function ")} 个')
print(f'   事件监听: {content.count("addEventListener")} 个')
print(f'   console.log: {content.count("console.log")} 个')

# 检查音乐数据
music_data_start = content.find('const musicData')
if music_data_start != -1:
    music_data_end = content.find('];', music_data_start)
    if music_data_end != -1:
        music_data_section = content[music_data_start:music_data_end+2]
        id_count = music_data_section.count('id:')
        print(f'   音乐数据条目: 约 {id_count} 个')
    else:
        print('   ⚠️  musicData 未正确结束')
else:
    print('   ⚠️  未找到 musicData')

# 检查是否有 videoData 引用
if 'videoData' in content:
    print(f'   ✅ 包含 videoData 引用')
else:
    print(f'   ⚠️  未找到 videoData 引用')

print('\n💡 建议:')
if errors:
    print('   请修复上述语法错误')
else:
    print('   语法检查通过，请在浏览器中测试')
    print('   打开浏览器控制台 (F12) 查看详细日志')
