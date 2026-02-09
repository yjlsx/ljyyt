@echo off
chcp 65001 >nul
echo ========================================
echo 丽江音悦台 - 移动端测试启动器
echo ========================================
echo.
echo 正在启动本地服务器...
echo.

cd /d "%~dp0"

echo 服务器信息：
echo - 本地访问：http://localhost:8000
echo - 移动端访问：http://[你的电脑IP]:8000
echo.
echo 提示：
echo 1. 在电脑浏览器中访问上述地址测试
echo 2. 在手机浏览器中访问移动端地址测试
echo 3. 按 Ctrl+C 停止服务器
echo.
echo ========================================
echo.

python -m http.server 8000

pause
