#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
歌曲ID重新排序工具 (Python版)
功能：按顺序重新分配歌曲ID（从1开始），并显示处理进度
"""

import re
import os
import sys
import time
from pathlib import Path

# 配置
SCRIPT_FILE = Path(__file__).parent / 'script.js'
BACKUP_FILE = Path(__file__).parent / 'script.js.backup'

# 颜色代码
class Colors:
    RESET = '\033[0m'
    BOLD = '\033[1m'
    GREEN = '\033[32m'
    YELLOW = '\033[33m'
    BLUE = '\033[34m'
    CYAN = '\033[36m'
    RED = '\033[31m'
    MAGENTA = '\033[35m'

def log(message, color='RESET'):
    """彩色日志输出"""
    color_code = getattr(Colors, color.upper(), Colors.RESET)
    print(f'{color_code}{message}{Colors.RESET}')

def progress_bar(current, total, label='', bar_length=40):
    """显示进度条"""
    progress = current / total
    filled_length = int(bar_length * progress)
    bar = '█' * filled_length + '░' * (bar_length - filled_length)
    percentage = progress * 100
    
    sys.stdout.write(f'\r{Colors.CYAN}{label} {Colors.BOLD}[{bar}] {percentage:.1f}% ({current}/{total}){Colors.RESET}')
    sys.stdout.flush()
    
    if current == total:
        print()  # 换行

def extract_song_objects(music_data_str):
    """
    提取所有歌曲对象
    使用状态机解析嵌套的大括号
    """
    songs = []
    depth = 0
    current_obj = ''
    in_string = False
    string_char = ''
    i = 0
    
    while i < len(music_data_str):
        char = music_data_str[i]
        prev_char = music_data_str[i - 1] if i > 0 else ''
        
        # 处理字符串（单引号和双引号）
        if char in ('"', "'") and prev_char != '\\':
            if not in_string:
                in_string = True
                string_char = char
            elif char == string_char:
                in_string = False
        
        # 不在字符串内时处理大括号
        if not in_string:
            if char == '{':
                depth += 1
                if depth == 1:
                    current_obj = '{'
                    i += 1
                    continue
            elif char == '}':
                current_obj += char
                depth -= 1
                if depth == 0:
                    songs.append(current_obj.strip())
                    current_obj = ''
                    i += 1
                    continue
        
        # 在对象内部时累积字符
        if depth > 0:
            current_obj += char
        
        i += 1
    
    return songs

def reorder_song_id(song_obj, new_id):
    """
    重新分配歌曲ID
    支持多种格式：
    - "id": 123
    - 'id': 123
    - id: 123
    """
    # 使用正则表达式替换ID
    pattern = r'''(["']?)id\1\s*:\s*\d+'''
    replacement = f'id: {new_id}'
    new_song_obj = re.sub(pattern, replacement, song_obj, count=1)
    
    return new_song_obj

def reorder_songs():
    """主函数：重新排序歌曲ID"""
    
    # 打印标题
    print()
    log('🎵 歌曲ID重新排序工具 (Python版)', 'BOLD')
    log('═' * 60, 'CYAN')
    
    try:
        # 步骤1: 读取文件
        log('\n📖 步骤 1/5: 读取 script.js...', 'BLUE')
        if not SCRIPT_FILE.exists():
            raise FileNotFoundError(f'找不到文件: {SCRIPT_FILE}')
        
        with open(SCRIPT_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        log('✓ 文件读取成功', 'GREEN')
        
        # 步骤2: 创建备份
        log('\n💾 步骤 2/5: 创建备份文件...', 'BLUE')
        with open(BACKUP_FILE, 'w', encoding='utf-8') as f:
            f.write(content)
        
        log(f'✓ 备份已保存: {BACKUP_FILE.name}', 'GREEN')
        
        # 步骤3: 提取音乐数据
        log('\n🔍 步骤 3/5: 解析音乐数据...', 'BLUE')
        
        # 使用正则表达式匹配 musicData 数组
        music_data_pattern = r'const musicData = \[([\s\S]*?)\];'
        match = re.search(music_data_pattern, content)
        
        if not match:
            raise ValueError('无法找到 musicData 数组')
        
        music_data_str = match.group(1)
        
        # 提取所有歌曲对象
        songs = extract_song_objects(music_data_str)
        
        log(f'✓ 找到 {len(songs)} 首歌曲', 'GREEN')
        
        # 步骤4: 重新分配ID
        log('\n🔄 步骤 4/5: 重新分配ID...', 'BLUE')
        reordered_songs = []
        
        for i, song in enumerate(songs, start=1):
            new_song = reorder_song_id(song, i)
            reordered_songs.append(new_song)
            
            # 显示进度
            progress_bar(i, len(songs), '处理进度:')
            
            # 轻微延迟使进度条更可见（可选）
            # time.sleep(0.01)
        
        log('✓ ID重新分配完成', 'GREEN')
        
        # 步骤5: 写入文件
        log('\n💾 步骤 5/5: 保存修改...', 'BLUE')
        
        # 重新构建 musicData 数组
        new_music_data = 'const musicData = [\n  ' + ',\n  '.join(reordered_songs) + '\n];'
        
        # 替换原内容
        new_content = re.sub(
            r'const musicData = \[[\s\S]*?\];',
            new_music_data,
            content,
            count=1
        )
        
        # 写入文件
        with open(SCRIPT_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        log('✓ 文件保存成功', 'GREEN')
        
        # 总结
        print()
        log('═' * 60, 'CYAN')
        log('✨ 重新排序完成！', 'BOLD')
        log('\n📊 处理统计:', 'YELLOW')
        log(f'   • 总歌曲数: {len(songs)}', 'CYAN')
        log(f'   • ID范围: 1 - {len(songs)}', 'CYAN')
        log(f'   • 备份文件: {BACKUP_FILE.name}', 'CYAN')
        log('\n💡 提示: 如需恢复，运行: cp script.js.backup script.js', 'YELLOW')
        log('═' * 60 + '\n', 'CYAN')
        
        return True
        
    except Exception as e:
        log(f'\n❌ 错误: {str(e)}', 'RED')
        log('\n💡 如果文件已损坏，可以从备份恢复:', 'YELLOW')
        log('   cp script.js.backup script.js', 'CYAN')
        return False

if __name__ == '__main__':
    success = reorder_songs()
    sys.exit(0 if success else 1)
