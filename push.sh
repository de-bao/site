#!/bin/bash
# 推送脚本 - 将 pages 文件夹推送到 GitHub

cd "$(dirname "$0")"

echo "========================================="
echo "开始推送到 GitHub 仓库..."
echo "========================================="

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "检测到未提交的更改，正在添加..."
    git add .
    
    read -p "请输入提交信息 (直接回车使用默认信息): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="更新内容 $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    git commit -m "$commit_msg"
    echo "✓ 已提交更改"
else
    echo "✓ 没有未提交的更改"
fi

# 推送到远程仓库
echo ""
echo "正在推送到 GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✓ 推送成功！"
    echo "========================================="
    echo ""
    echo "仓库地址：https://github.com/de-bao/pages"
    echo ""
    echo "如果启用了 GitHub Pages，请访问："
    echo "https://de-bao.github.io/pages/"
    echo ""
else
    echo ""
    echo "========================================="
    echo "✗ 推送失败，请检查："
    echo "  1. 网络连接"
    echo "  2. GitHub token 配置"
    echo "  3. 仓库权限"
    echo "========================================="
    exit 1
fi

