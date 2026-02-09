import re

print('🔍 更新音乐时间CSS样式...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\style.css', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 更新音乐时间样式
# 原始样式：
# .music-card .card-body small {
#   margin-left: 10px;
#   font-size: 0.85rem;
#   opacity: 0.8;
# }

# 更新为：
# .music-card .card-body small {
#   font-size: 0.85rem;
#   opacity: 0.8;
# }

old_style = r'/\* 音乐卡片时间样式 \*/\.music-card \.card-body small \{[^}]+\}'

new_style = r"""/* 音乐卡片时间样式 */
.music-card .card-body small {
  font-size: 0.85rem;
  opacity: 0.8;
}"""

if re.search(old_style, content, re.DOTALL):
    content = re.sub(old_style, new_style, content, flags=re.DOTALL)
    print('✅ 更新音乐时间样式')
    print('   - 移除了 margin-left（现在使用 me-2 类）')
    print('   - 保留了字体大小和透明度')
else:
    print('⚠️  未找到匹配的样式')
    
    # 检查是否需要添加
    if '.music-card .card-body small' not in content:
        print('   - 样式不存在，添加新样式')
        # 在 .music-card.active 样式后添加
        music_card_pattern = r'(\.music-card\.active \{[^}]+\})'
        if re.search(music_card_pattern, content):
            content = re.sub(
                music_card_pattern,
                r"""\1

/* 音乐卡片时间样式 */
.music-card .card-body small {
  font-size: 0.85rem;
  opacity: 0.8;
}""",
                content
            )
            print('   - 已添加新样式')
        else:
            print('   - 无法添加样式')

# 写回文件
with open('D:\\GitHub\\ljyyt\\style.css', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n📊 修复后文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 验证
if '.music-card .card-body small' in content:
    print('\n✅ 音乐时间样式存在')
    
    # 检查是否还有 margin-left
    if 'margin-left' in content and '.music-card .card-body small' in content:
        # 提取相关样式
        small_style_match = re.search(r'\.music-card \.card-body small \{([^}]+)\}', content)
        if small_style_match:
            style_content = small_style_match.group(1)
            if 'margin-left' in style_content:
                print('⚠️  样式中仍然包含 margin-left')
            else:
                print('✅ 样式中不包含 margin-left（正确）')
else:
    print('\n❌ 音乐时间样式不存在')

print('\n✅ CSS样式更新完成！')
