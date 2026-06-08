#!/bin/bash

set -e

echo "丽江音悦台网站部署脚本"
echo "========================"

echo "生成 dist/..."
npm run build

echo ""
echo "部署选项:"
echo "1. 部署到本地服务器 (需要 http-server)"
echo "2. 部署到 GitHub Pages (需要 gh-pages)"
echo "3. 仅生成静态文件 (dist/ 目录)"
echo ""

read -p "请选择部署方式 (1-3): " choice

case "$choice" in
  1)
    if ! command -v http-server >/dev/null 2>&1; then
      echo "错误: 未找到 http-server。请先安装: npm install -g http-server"
      exit 1
    fi
    echo "启动本地服务器..."
    cd dist
    http-server -p 8080
    ;;
  2)
    if ! command -v gh-pages >/dev/null 2>&1; then
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
    exit 1
    ;;
esac

echo "部署完成！"
