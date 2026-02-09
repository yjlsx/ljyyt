import re
import json

# 读取文件
file_path = r'D:\GitHub\ljyyt\videos\video_data.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 使用正则表达式匹配所有 id: 数字 的模式
# 找到所有的 id 字段并替换
pattern = r'id:\s*(\d+)'

def replace_id(match):
    global current_id
    old_id = match.group(1)
    new_id = str(current_id)
    current_id += 1
    return 'id: ' + new_id

# 从1001开始编号
current_id = 1001

# 替换所有id
new_content = re.sub(pattern, replace_id, content)

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('视频ID重新排序完成！')
print('ID已从1001开始连续编号')
