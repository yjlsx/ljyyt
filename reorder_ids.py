import re
import os
import sys

# 配置
SCRIPT_PATH = '/mnt/workspace/2KuCohPDmUoRFypb4SJTM/script.js'

def reorder_ids():
    if not os.path.exists(SCRIPT_PATH):
        print(f"❌ 找不到脚本文件: {SCRIPT_PATH}")
        return

    print(f"📖 正在读取文件: {SCRIPT_PATH}...")
    with open(SCRIPT_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # 查找 musicData 数组
    # 兼容 const, var, let
    match = re.search(r'(?:const|var|let)\s+musicData\s*=\s*(\[[\s\S]*?\]);', content)
        
    if not match:
        print("❌ 无法在 script.js 中找到 musicData 数组，请检查数组变量名是否为 musicData。")
        return

    music_data_str = match.group(1)
    
    # 提取所有对象 {} 
    # 使用更严谨的正则匹配 {} 块
    items = re.findall(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', music_data_str)
    
    total = len(items)
    if total == 0:
        print("⚠️ 未在数组中找到任何歌曲对象。")
        return

    print(f"🔍 找到 {total} 首歌曲，开始重新排序...")
    
    updated_items = []
    for index, item in enumerate(items, start=1):
        # 替换 id 字段的值
        # 匹配 "id": 123 或 id: 123
        new_item = re.sub(r'(\bid\b\s*:\s*|["\']id["\']\s*:\s*)\d+', f'\\g<1>{index}', item)
        updated_items.append(new_item)
        
        # 显示进度
        if index % 10 == 0 or index == total:
            sys.stdout.write(f"\r⏳ 进度: {index}/{total} ({(index/total)*100:.1f}%)")
            sys.stdout.flush()

    print("\n\n🛠️ 正在重新组装数据并写回文件...")
    
    # 格式化输出数组字符串
    formatted_list = "[\n"
    for i, item in enumerate(updated_items):
        # 简单清理一下对象的格式，确保每一行缩进
        clean_item = item.strip()
        formatted_list += "    " + clean_item
        if i < len(updated_items) - 1:
            formatted_list += ",\n"
        else:
            formatted_list += "\n"
    formatted_list += "  ]"

    # 写回文件
    new_content = content.replace(match.group(1), formatted_list)
    
    with open(SCRIPT_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ 排序成功！ID 已重置为 1 到 {total}。")

if __name__ == "__main__":
    reorder_ids()
