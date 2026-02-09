import socket

def get_local_ip():
    try:
        # 创建一个UDP套接字
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # 连接到一个不存在的地址，不会实际发送数据
        s.connect(('8.8.8.8', 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except:
        return '127.0.0.1'

if __name__ == '__main__':
    ip = get_local_ip()
    print('=' + '='*50)
    print('丽江音悦台 - 移动端测试')
    print('=' + '='*50)
    print()
    print('你的电脑IP地址：' + ip)
    print()
    print('访问地址：')
    print('  电脑浏览器：http://localhost:8000')
    print('  手机浏览器：http://' + ip + ':8000')
    print()
    print('测试页面：')
    print('  主页：http://' + ip + ':8000/index.html')
    print('  测试页：http://' + ip + ':8000/mobile_test.html')
    print()
    print('=' + '='*50)
