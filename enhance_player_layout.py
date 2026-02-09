# 进一步优化移动端播放器布局

css_file = r'D:\GitHub\ljyyt\style_mobile.css'

with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

# 在超小屏幕设备部分添加更详细的播放器布局优化
mobile_player_enhancement = '''
  
  /* === 底部播放器布局完全重构 === */
  .bottom-player {
    padding: 6px 0 !important;
    min-height: 70px !important;
    background: linear-gradient(180deg, rgba(102, 126, 234, 0.98) 0%, rgba(118, 75, 162, 0.98) 100%) !important;
  }
  
  .bottom-player .container {
    padding: 0 10px !important;
  }
  
  /* 播放器主容器 - 确保水平布局 */
  .bottom-player .d-flex {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    flex-wrap: nowrap !important;
  }
  
  /* 当前播放信息 - 左侧显示 */
  .bottom-player .current-track-info {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    justify-content: center !important;
    flex: 0 0 auto !important;
    min-width: 100px !important;
    max-width: 120px !important;
    margin-right: 8px !important;
    padding: 0 !important;
  }
  
  .bottom-player .current-track-info img {
    display: none !important;
  }
  
  .bottom-player .current-track-info h6 {
    font-size: 0.8rem !important;
    font-weight: 600 !important;
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.2 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 100% !important;
    color: #fff !important;
  }
  
  .bottom-player .current-track-info small {
    font-size: 0.7rem !important;
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.1 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 100% !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }
  
  /* 播放控制按钮 - 水平排列 */
  .bottom-player .player-controls {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    margin: 0 6px !important;
    flex: 0 0 auto !important;
  }
  
  .bottom-player .player-controls .btn {
    padding: 0.4rem 0.5rem !important;
    font-size: 0.8rem !important;
    min-width: 32px !important;
    min-height: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  .bottom-player #play-btn {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
    font-size: 0.9rem !important;
    padding: 0 !important;
  }
  
  /* 进度条 - 中间显示 */
  .bottom-player .progress-container {
    flex: 1 1 auto !important;
    margin: 0 6px !important;
    min-width: 0 !important;
    max-width: none !important;
  }
  
  .bottom-player .progress-container .d-flex {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 4px !important;
  }
  
  .bottom-player .progress {
    height: 4px !important;
    border-radius: 2px !important;
    background: rgba(255, 255, 255, 0.3) !important;
    flex: 1 !important;
    min-width: 0 !important;
  }
  
  .bottom-player .progress-bar {
    background: #fff !important;
  }
  
  .bottom-player #current-time,
  .bottom-player #total-time {
    font-size: 0.65rem !important;
    min-width: 24px !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }
  
  /* 音量控制 - 隐藏 */
  .bottom-player .volume-control {
    display: none !important;
  }
  
  /* 确保所有按钮都是圆形的 */
  .bottom-player .btn-outline-light {
    border-radius: 50% !important;
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
    background: transparent !important;
    color: #fff !important;
  }
  
  .bottom-player .btn-light {
    background: #fff !important;
    color: #667eea !important;
    border: none !important;
  }
'''

# 找到超小屏幕设备的开始位置
start_marker = '/* ============================================\n   超小屏幕设备 (手机竖屏, < 576px)\n   ============================================ */\n@media (max-width: 575.98px) {'

if start_marker in css_content:
    # 找到这个媒体查询的结束位置
    start_pos = css_content.find(start_marker)
    # 找到下一个媒体查询的开始
    next_media = css_content.find('/* ============================================\n   小屏幕设备', start_pos)
    
    if next_media != -1:
        # 在这个媒体查询的末尾（下一个媒体查询之前）插入我们的优化
        # 找到最后一个 }
        insert_pos = css_content.rfind('}', 0, next_media)
        if insert_pos != -1:
            css_content = css_content[:insert_pos] + mobile_player_enhancement + css_content[insert_pos:]
            print('✓ 已在超小屏幕媒体查询中添加播放器布局优化')
else:
    print('⚠ 未找到超小屏幕媒体查询，尝试其他方法')
    # 在文件末尾添加
    css_content += '\n\n' + mobile_player_enhancement

# 写回文件
with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)

print('✓ 播放器布局优化完成')
print('\n优化内容：')
print('✓ 播放器采用水平布局')
print('✓ 歌名和歌手信息在左侧显示')
print('✓ 播放控制按钮水平排列')
print('✓ 进度条在中间显示')
print('✓ 所有元素大小和间距优化')
print('\n请在手机上刷新页面查看效果！')
