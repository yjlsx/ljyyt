import re

print('🔍 验证播放进度修复...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 检查项
checks = [
    {
        'name': 'loadTrack 函数不再重置播放进度',
        'pattern': r'function loadTrack\(index\).*?(?=function playMusic)',
        'should_not_contain': ['savePlayerState(track.id, 0, false, track)'],
        'should_contain': ['注意：不在 loadTrack 时保存状态']
    },
    {
        'name': 'DOMContentLoaded 中使用 loadedmetadata 事件',
        'pattern': r'document\.addEventListener\(\'DOMContentLoaded\'',
        'should_contain': ['loadedmetadata', 'onMetadataLoaded', 'removeEventListener']
    },
    {
        'name': 'initPlayerStateRestore 使用 loadedmetadata 事件',
        'pattern': r'function initPlayerStateRestore\(\)',
        'should_contain': ['loadedmetadata', 'onMetadataLoaded', 'removeEventListener']
    },
    {
        'name': 'playMusic 函数保存播放状态',
        'pattern': r'function playMusic\(\)',
        'should_contain': ['savePlayerState', 'audioPlayer.currentTime', 'true']
    },
    {
        'name': 'pauseMusic 函数保存播放状态',
        'pattern': r'function pauseMusic\(\)',
        'should_contain': ['savePlayerState', 'audioPlayer.currentTime', 'false']
    }
]

all_passed = True

for check in checks:
    print(f'📋 检查: {check["name"]}')
    
    # 提取相关代码段
    match = re.search(check['pattern'], content, re.DOTALL)
    if not match:
        print(f'   ❌ 未找到相关代码')
        all_passed = False
        continue
    
    code_section = match.group(0)
    
    # 检查不应该包含的内容
    if 'should_not_contain' in check:
        for item in check['should_not_contain']:
            if item in code_section:
                print(f'   ❌ 仍然包含不应有的代码: {item}')
                all_passed = False
    
    # 检查应该包含的内容
    if 'should_contain' in check:
        all_contained = True
        for item in check['should_contain']:
            if item not in code_section:
                print(f'   ❌ 缺少应有的代码: {item}')
                all_passed = False
                all_contained = False
        
        if all_contained:
            print(f'   ✅ 包含所有必要的代码')
    
    print()

# 统计信息
print('📊 代码统计:')
loadedmetadata_count = content.count('loadedmetadata')
onMetadataLoaded_count = content.count('onMetadataLoaded')
removeEventListener_count = content.count('removeEventListener')

print(f'   loadedmetadata 事件: {loadedmetadata_count} 处')
print(f'   onMetadataLoaded 函数: {onMetadataLoaded_count} 处')
print(f'   removeEventListener 调用: {removeEventListener_count} 处')

if loadedmetadata_count >= 2 and onMetadataLoaded_count >= 2 and removeEventListener_count >= 2:
    print(f'   ✅ 事件处理正确')
else:
    print(f'   ⚠️ 事件处理可能有问题')
    all_passed = False

print()

# 最终结果
if all_passed:
    print('✅ 所有检查通过！播放进度修复成功。')
    print()
    print('💡 测试建议:')
    print('   1. 打开 test_progress.html 进行自动化测试')
    print('   2. 在 index.html 中播放音乐，然后刷新页面')
    print('   3. 观察播放进度是否正确恢复')
else:
    print('❌ 部分检查未通过，请检查修复代码。')
