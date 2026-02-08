print('🔍 查找括号不匹配的位置...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\script.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

brace_count = 0
error_lines = []

for line_num, line in enumerate(lines, 1):
    open_count = line.count('{')
    close_count = line.count('}')
    
    old_count = brace_count
    brace_count += open_count - close_count
    
    # 如果这一行导致括号数量变为负数，说明有多余的 }
    if brace_count < 0:
        error_lines.append({
            'line': line_num,
            'content': line.strip(),
            'brace_count': brace_count,
            'type': '多余的 }'
        })
        brace_count = 0  # 重置计数
    
    # 记录括号数量变化
    if open_count > 0 or close_count > 0:
        pass  # 可以在这里记录每一行的括号状态

print('📊 括号统计:')
print(f'   最终括号数量: {brace_count}')
print(f'   发现的错误行数: {len(error_lines)}')

if error_lines:
    print('\n❌ 发现括号错误:\n')
    for error in error_lines:
        print(f'   行 {error["line"]}: {error["type"]}')
        print(f'   内容: {error["content"][:80]}...')
        print()
else:
    # 如果没有发现负数，但最终数量不为0，说明在文件末尾缺少括号
    if brace_count > 0:
        print(f'\n⚠️  文件末尾缺少 {brace_count} 个 }}')
        print('   最后几行:')
        for line in lines[-5:]:
            print(f'   {line.rstrip()}')
    elif brace_count < 0:
        print(f'\n⚠️  文件中有多余的 {-brace_count} 个 }}')
        # 查找可能的问题区域
        print('   正在查找问题区域...')
        
        # 重新分析，记录每一行的括号状态
        brace_stack = []
        for line_num, line in enumerate(lines, 1):
            for char_pos, char in enumerate(line):
                if char == '{':
                    brace_stack.append((line_num, char_pos))
                elif char == '}':
                    if brace_stack:
                        brace_stack.pop()
                    else:
                        print(f'   发现多余的 }} 在行 {line_num}, 位置 {char_pos}')
                        print(f'   内容: {line.strip()}')
                        # 显示上下文
                        start = max(0, line_num - 3)
                        end = min(len(lines), line_num + 2)
                        print('   上下文:')
                        for i in range(start, end):
                            marker = '>>>' if i == line_num - 1 else '   '
                            print(f'   {marker} {i+1}: {lines[i].rstrip()}')
                        break
            if brace_count < 0 and len(brace_stack) == 0:
                break
