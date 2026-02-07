import re
import json

# 读取原始 script.js 文件
with open('D:\\GitHub\\lijiang-music-website\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取 musicData 数组
pattern = r'const musicData = (\[.*?\]);'
match = re.search(pattern, content, re.DOTALL)

if match:
    music_data_str = match.group(1)
    print('找到 musicData，长度:', len(music_data_str))
    
    # 读取 script_fixed.js 文件
    with open('D:\\GitHub\\lijiang-music-website\\script_fixed.js', 'r', encoding='utf-8') as f:
        fixed_content = f.read()
    
    # 替换 musicData
    new_fixed_content = re.sub(
        r'const musicData = \[.*?\];',
        'const musicData = ' + music_data_str + ';',
        fixed_content,
        flags=re.DOTALL
    )
    
    # 写回文件
    with open('D:\\GitHub\\lijiang-music-website\\script_fixed.js', 'w', encoding='utf-8') as f:
        f.write(new_fixed_content)
    
    print('✅ musicData 已更新到 script_fixed.js')
else:
    print('❌ 未找到 musicData')
