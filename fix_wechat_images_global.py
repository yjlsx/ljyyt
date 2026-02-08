import re

print('🔍 修复微信公众号图片防盗链问题（全局方案）...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 检查是否已经有 referrer meta 标签
if '<meta name="referrer" content="no-referrer">' in content:
    print('\n✅ 已经存在 referrer meta 标签，无需修改')
else:
    # 在 <head> 标签后添加 referrer meta 标签
    head_pattern = r'(<head>)'
    if re.search(head_pattern, content):
        content = re.sub(
            head_pattern,
            r'\1\n  <meta name="referrer" content="no-referrer">',
            content,
            count=1
        )
        print('\n✅ 已添加 referrer meta 标签')
    else:
        print('\n❌ 未找到 <head> 标签')

# 写回文件
with open('D:\\GitHub\\ljyyt\\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n📊 修复后文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 验证
if '<meta name="referrer" content="no-referrer">' in content:
    print('\n✅ 验证通过：referrer meta 标签已添加')
else:
    print('\n❌ 验证失败：referrer meta 标签未添加')

print('\n✅ 全局方案修复完成！')
print('\n💡 说明:')
print('   - 这个方案会告诉浏览器对所有请求都不带 Referer 头')
print('   - 微信服务器看到空 Referer 时通常会放行')
print('   - 这是最简单有效的解决方案')
