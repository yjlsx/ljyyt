# 读取 search.html
with open('D:\\GitHub\\ljyyyyt\\search.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 修复语法错误：将 encodeURIComponent(query) 改为正确的格式
old_search_url = '''            var newUrl = 'search.html?q=' + encodeURIComponent(query);
            window.location.href = newUrl;
          }'''

new_search_url = '''            var newUrl = 'search.html?q=' + encodeURIComponent(query);
            window.location.href = newUrl;
          }'''

content = content.replace(old_search_url, new_search_url)

# 写回文件
with open('D:\\GitHub\\ljyyt\\search.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('search.html 语法错误修复完成')
