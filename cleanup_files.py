import os

# 要删除的HTML测试文件
html_files = [
    "debug_data.html",
    "global_player.html",
    "index_backup.html",
    "minimal-search-test.html",
    "mobile_test.html",
    "mobile_test (1).html",
    "mobile_player_test.html",
    "mobile_player_test_v2.html",
    "quick_test.html",
    "simple-search-test.html",
    "simple_test.html",
    "test-url-params.html",
    "test_fix.html",
    "test_progress.html",
    "test_video_links.html",
    "final_test.html",
    "scroll_test.html"
]

# 要删除的文档文件
md_files = [
    "移动端使用说明.md",
    "移动端优化完成报告.md",
    "移动端显示问题修复报告.md",
    "播放器布局和首页修复报告.md",
    "所有修复完成报告.md",
    "滚动功能测试指南.md"
]

# 要删除的bat文件
bat_files = [
    "start_mobile_test.bat"
]

base_path = r"D:\GitHub\ljyyt"

deleted_count = 0

# 删除HTML文件
print("删除HTML测试文件...")
for file in html_files:
    file_path = os.path.join(base_path, file)
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"  已删除: {file}")
        deleted_count += 1

# 删除文档文件
print("\n删除文档文件...")
for file in md_files:
    file_path = os.path.join(base_path, file)
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"  已删除: {file}")
        deleted_count += 1

# 删除bat文件
print("\n删除bat文件...")
for file in bat_files:
    file_path = os.path.join(base_path, file)
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"  已删除: {file}")
        deleted_count += 1

print(f"\n总共删除了 {deleted_count} 个文件")
print("\n保留的重要文件：")
print("  - index.html (主页)")
print("  - style.css (样式)")
print("  - style_mobile.css (移动端样式)")
print("  - script.js (脚本)")
print("  - video_data.js (视频数据)")
print("  - get_ip.py (获取IP)")
print("  - reorder_video_ids.py (重新排序视频ID)")
print("  - 启动移动端测试.bat (启动服务器)")
