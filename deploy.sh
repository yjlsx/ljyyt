#!/bin/bash

# 丽江音悦台网站部署脚本

echo "丽江音悦台网站部署脚本"
echo "========================"

# 检查是否安装了必要的工具
if ! command -v rsync &> /dev/null; then
    echo "错误: 未找到 rsync。请先安装 rsync。"
    exit 1
fi

# 创建部署目录结构
echo "创建部署目录..."
mkdir -p dist/images

# 复制文件到部署目录
echo "复制文件..."
cp index.html style.css script.js README.md dist/
cp ../images/avatar.jpg dist/images/

echo "文件已复制到 dist/ 目录"

# 显示部署选项
echo ""
echo "部署选项:"
echo "1. 部署到本地服务器 (需要 http-server)"
echo "2. 部署到 GitHub Pages (需要 gh-pages)"
echo "3. 仅生成静态文件 (dist/ 目录)"
echo ""

read -p "请选择部署方式 (1-3): " choice

case $choice in
    1)
        if ! command -v http-server &> /dev/null; then
            echo "错误: 未找到 http-server。请先安装: npm install -g http-server"
            exit 1
        fi
        cd dist
        echo "启动本地服务器..."
        http-server -p 8080
        ;;
    2)
        if ! command -v gh-pages &> /dev/null; then
            echo "错误: 未找到 gh-pages。请先安装: npm install -g gh-pages"
            exit 1
        fi
        echo "部署到 GitHub Pages..."
        gh-pages -d dist
        ;;
    3)
        echo "静态文件已生成在 dist/ 目录。"
        echo "您可以将此目录的内容上传到任何静态托管服务。"
        ;;
    *)
        echo "无效选择。退出。"
        ;;
esac

echo "部署完成！"