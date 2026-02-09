import re

print('🔍 修复音乐列表布局（同一行显示）...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 修复 renderMusicList 函数中的音乐卡片布局
# 原始代码：
# '<div class="flex-grow-1">' +
#   '<h6 class="card-title mb-1">' + track.title + '</h6>' +
#   '<p class="card-text text-muted mb-1">' + track.artist + '</p>' +
#   '<small class="text-muted">' + formatTime(track.duration) + '</small>' +
# '</div>' +

# 修改为：
# '<div class="flex-grow-1">' +
#   '<h6 class="card-title mb-1">' + track.title + '</h6>' +
#   '<div class="d-flex align-items-center">' +
#     '<p class="card-text text-muted mb-0 me-2">' + track.artist + '</p>' +
#     '<small class="text-muted">' + formatTime(track.duration) + '</small>' +
#   '</div>' +
# '</div>' +

old_layout = r"'<div class=\"flex-grow-1\">' \+.*?'<p class=\"card-text text-muted mb-1\">' \+ track\.artist \+ '</p>' \+.*?'<small class=\"text-muted\">' \+ formatTime\(track\.duration\) \+ '</small>' \+.*?'</div>' \+"

new_layout = r"""'<div class="flex-grow-1">' +
            '<h6 class="card-title mb-1">' + track.title + '</h6>' +
            '<div class="d-flex align-items-center">' +
              '<p class="card-text text-muted mb-0 me-2">' + track.artist + '</p>' +
              '<small class="text-muted">' + formatTime(track.duration) + '</small>' +
            '</div>' +
          '</div>' +"""

if re.search(old_layout, content, re.DOTALL):
    content = re.sub(old_layout, new_layout, content, flags=re.DOTALL)
    print('✅ 修复音乐列表布局')
    print('   - 将歌手名字和时间放在同一行')
    print('   - 使用 d-flex 布局')
    print('   - 添加了 me-2 间距')
else:
    print('⚠️  未找到匹配的布局代码')
    
    # 尝试更简单的替换
    if 'card-text text-muted mb-1">' in content:
        print('   - 找到 mb-1 类，尝试替换')
        content = content.replace(
            "card-text text-muted mb-1\">",
            "card-text text-muted mb-0 me-2\">"
        )
        print('   - 已替换 mb-1 为 mb-0 me-2')

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

# 检查是否包含新的布局
if 'd-flex align-items-center">' in content:
    print('\n✅ 找到新的布局代码')
else:
    print('\n⚠️  未找到新的布局代码')

print('\n✅ 布局修复完成！')
