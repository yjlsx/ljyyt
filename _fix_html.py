# -*- coding: utf-8 -*-
"""修复 index.html 的重复 </head>/<body> 问题"""

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 找到所有 </head> 和 <body> 的位置
head_close = []
body_open = []
for i, line in enumerate(lines):
    if '</head>' in line:
        head_close.append(i)
    if line.strip() == '<body>':
        body_open.append(i)

print(f'</head> 出现在行: {[h+1 for h in head_close]}')
print(f'<body> 出现在行: {[b+1 for b in body_open]}')

# 第一个 </head> 是正确的 (line 19, index 18)
# 第二个 </head> 是 orphaned CSS 结尾 (line 489, index 488)
# 第一个 <body> 是 orphaned (line 20, index 19)
# 第二个 <body> 是正确的 (line 490, index 489)

# 保留 head_close[0] 之前的内容, 然后 body_open[1] 之后的内容
# 即: lines[:19] + lines[489:]
if len(head_close) >= 2 and len(body_open) >= 2:
    keep_before = head_close[0]  # 保留到第一个 </head> (不包含)
    keep_from = body_open[1]     # 从第二个 <body> 开始保留
    
    new_lines = lines[:keep_before + 1] + lines[keep_from:]
    
    removed = len(lines) - len(new_lines)
    print(f'删除了 {removed} 行孤立的 CSS 代码')
    print(f'新文件共 {len(new_lines)} 行')
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print('修复完成!')
else:
    print('未找到重复的标签，请手动检查')
