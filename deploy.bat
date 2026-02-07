@echo off
REM 丽江音悦台网站部署脚本 (Windows)

echo 丽江音悦台网站部署脚本
echo ========================

REM 创建部署目录
echo 创建部署目录...
if not exist dist mkdir dist
if not exist dist\images mkdir dist\images

REM 复制文件到部署目录
echo 复制文件...
copy index.html dist\
copy style.css dist\
copy script.js dist\
copy README.md dist\
copy ..\images\avatar.jpg dist\images\

echo 文件已复制到 dist/ 目录

REM 显示部署选项
echo.
echo 部署选项:
echo 1. 部署到本地服务器 (需要 Python 或 Node.js)
echo 2. 仅生成静态文件 (dist/ 目录)
echo.

set /p choice=请选择部署方式 (1-2): 

if "%choice%"=="1" (
    echo 启动本地服务器...
    cd dist
    REM 尝试使用 Python 启动本地服务器
    python -m http.server 8080
    if errorlevel 1 (
        REM 如果 Python 不可用，则尝试 Node.js 的 http-server
        echo 未找到 Python，尝试 Node.js http-server...
        http-server -p 8080
    )
) else if "%choice%"=="2" (
    echo 静态文件已生成在 dist/ 目录。
    echo 您可以将此目录的内容上传到任何静态托管服务。
) else (
    echo 无效选择。退出。
)

echo 部署完成！
pause