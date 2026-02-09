import re

print('🔍 添加音乐时间CSS样式...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\style.css', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 检查是否已经有音乐时间样式
if '.music-card .card-body small' in content:
    print('\n✅ 已经存在音乐时间样式，无需添加')
else:
    # 在 .music-card 样式后添加音乐时间样式
    music_card_pattern = r'(\.music-card\.active \{[^}]+\})'
    
    if re.search(music_card_pattern, content):
        new_style = r"""\1

/* 音乐卡片时间样式 */
.music-card .card-body small {
  margin-left: 10px;
  font-size: 0.85rem;
  opacity: 0.8;
}"""
        
        content = re.sub(music_card_pattern, new_style, content)
        print('✅ 已添加音乐时间样式')
        print('   - 添加了 margin-left: 10px 来增加与歌手名字的距离')
        print('   - 调整了字体大小和透明度')
    else:
        print('⚠️  未找到 .music-card.active 样式，尝试其他方法')
        
        # 尝试在文件末尾添加
        if content.strip().endswith('}'):
            content = content.rstrip() + '\n\n/* 音乐卡片时间样式 */\n.music-card .card-body small {\n  margin-left: 10px;\n  font-size: 0.85rem;\n  opacity: 0.8;\n}\n'
            print('✅ 已在文件末尾添加音乐时间样式')
        else:
            print('❌ 无法添加样式')

# 写回文件
with open('D:\\GitHub\\ljyyt\\style.css', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n📊 修复后文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 验证
if '.music-card .card-body small' in content:
    print('\n✅ 音乐时间样式已添加')
else:
    print('\n❌ 音乐时间样式未添加')

print('\n✅ CSS样式添加完成！')
