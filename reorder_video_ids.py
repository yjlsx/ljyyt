import json
import os

print('🔍 重新排序视频ID...\n')

# 视频数据文件路径
video_data_path = r'D:\GitHub\ljyyt\videos\video_data.js'

# 检查文件是否存在
if not os.path.exists(video_data_path):
    print(f'❌ 文件不存在: {video_data_path}')
    exit(1)

print(f'📋 文件路径: {video_data_path}')

# 读取文件
try:
    with open(video_data_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f'📋 文件大小: {len(content)} 字节')
    print(f'   行数: {content.count(chr(10))} 行')
    
    # 查找 videoData 数组定义
    import re
    video_data_match = re.search(r'const videoData\s*=\s*\[(\s*.*?)\];', content)
    
    if not video_data_match:
        print('❌ 未找到 videoData 数组定义')
        exit(1)
    
    video_data_str = video_data_match.group(1)
    
    print(f'📋 找到 videoData 数组')
    print(f'   长度: {len(video_data_str)} 字节')
    
    # 解析视频数据
    try:
        video_data_list = json.loads('[' + video_data_str + ']')
        print(f'✅ 视频数量: {len(video_data_list)} 个')
    except json.JSONDecodeError as e:
        print(f'❌ JSON 解析失败: {e}')
        exit(1)
    
    # 检查现有ID
    existing_ids = []
    for video in video_data_list:
        if 'id' in video:
            existing_ids.append(video['id'])
    
    print(f'\n📋 现有ID: {existing_ids}')
    if existing_ids:
        print(f'   最小ID: {min(existing_ids)}')
        print(f'   最大ID: {max(existing_ids)}')
    
    # 检查是否有重复ID
    id_counts = {}
    for video in video_data_list:
        if 'id' in video:
            video_id = video['id']
            if video_id in id_counts:
                id_counts[video_id] += 1
            else:
                id_counts[video_id] = 1
    
    duplicate_ids = [vid for vid, count in id_counts.items() if count > 1]
    if duplicate_ids:
        print(f'\n⚠️  发现重复ID: {duplicate_ids}')
    else:
        print('\n✅ 没有重复ID')
    
    # 重新排序视频ID
    print('\n🔄 开始重新排序视频ID...')
    
    new_id = 1001  # 从1001开始
    
    # 按标题排序
    sorted_videos = sorted(video_data_list, key=lambda x: x.get('title', ''))
    
    # 重新分配ID
    for video in sorted_videos:
        old_id = video.get('id')
        video['id'] = new_id
        print(f'   {old_id} -> {new_id}: {video.get('title', '未知')}')
        new_id += 1
    
    # 生成新的 videoData 数组
    new_video_data_str = json.dumps(sorted_videos, ensure_ascii=False, indent=2)
    
    # 替换 videoData 数组
    old_video_data_pattern = r'const videoData\s*=\s*\[(.*?)\];'
    new_video_data_pattern = f'const videoData = {new_video_data_str};'
    
    content = re.sub(old_video_data_pattern, new_video_data_pattern, content)
    
    # 写回文件
    with open(video_data_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'\n📊 修复后文件统计:')
    print(f'   文件大小: {len(content)} 字节')
    print(f'   行数: {content.count(chr(10))} 行')
    
    # 验证
    if 'const videoData = [' in content:
        print('\n✅ videoData 数组已更新')
    else:
        print('\n❌ videoData 数组未找到')
    
    # 统计新ID
    new_ids = [video['id'] for video in sorted_videos]
    print(f'\n📊 新ID统计:')
    print(f'   最小ID: {min(new_ids)}')
    print(f'   最大ID: {max(new_ids)}')
    print(f'   ID数量: {len(new_ids)}')
    print(f'   是否连续: {new_ids == list(range(min(new_ids), max(new_ids) + 1))}')
    
    print('\n✅ 视频ID重新排序完成！')
    print('\n💡 说明:')
    print('   - 所有视频ID已从1001开始重新排序')
    print('   - 按标题排序后重新分配ID')
    print('   - 避免了ID错乱和重复问题')
    print('   - 现有ID已按顺序排列')
    
except FileNotFoundError:
    print(f'❌ 文件不存在: {video_data_path}')
except Exception as e:
    print(f'❌ 处理失败: {e}')
