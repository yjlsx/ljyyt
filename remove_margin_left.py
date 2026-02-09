import re

print('🔍 移除 margin-left 样式...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\style.css', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 移除 margin-left: 10px;
old_style = r'margin-left:\s*\d+px;\s*'
if re.search(old_style, content):
    content = re.sub(old_style, '', content)
    print('✅ 已移除 margin-left 样式')
else:
    print('⚠️  未找到 margin-left 样式')

# 写回文件
with open('D:\\GitHub\\ljyyt\\style.css', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n📊 修复后文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 验证
if 'margin-left' in content:
    print('\n⚠️  文件中仍然包含 margin-left')
else:
    print('\n✅ margin-left 已完全移除')

print('\n✅ 样式修复完成！')
