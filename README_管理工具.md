# Feiyizhan.github.io 本地复现与管理工具

## 项目说明

本项目是 `Feiyizhan.github.io` 仓库的本地复现版本，位于 `/home/10355407/pages` 目录。

## 分支分析

该仓库包含三个主要分支：

1. **master** - 源代码分支，包含最新的博客文章和配置
2. **gh-pages** - GitHub Pages 托管分支，用于 GitHub Pages 网站托管
3. **gitee-pages** - Gitee Pages 托管分支，包含 Giteement 评论系统配置

详细说明请查看 `分支分析文档.md`。

## 快速开始

### 1. 安装依赖

```bash
# 安装 Python 依赖
pip install pyyaml

# 安装 Jekyll（如果还没有）
gem install bundler
cd /home/10355407/pages
bundle install
```

### 2. 使用内容管理工具

```bash
cd /home/10355407/pages

# 列出所有文章
python3 manage_content.py list

# 创建新文章
python3 manage_content.py create --title "文章标题" --categories "分类" --tags "标签"

# 编辑文章
python3 manage_content.py edit <文件名> --title "新标题"

# 管理置顶文章
python3 manage_content.py tops list
python3 manage_content.py tops add --url "文章URL"
```

### 3. 本地预览

```bash
cd /home/10355407/pages
bundle exec jekyll serve
```

访问：`http://localhost:4000`

## 内容管理接口

### 功能特性

- ✅ 创建、编辑、删除文章
- ✅ 管理置顶文章
- ✅ 更新网站配置
- ✅ 列出所有文章信息

### 使用示例

```bash
# 创建新文章
python3 manage_content.py create \
  --title "Spring Boot 教程" \
  --categories "Java" "Spring" \
  --tags "教程" "Spring Boot" \
  --content "# Spring Boot 教程\n\n内容..."

# 编辑文章
python3 manage_content.py edit 2024-01-15-Spring-Boot教程.md \
  --title "更新后的标题"

# 添加置顶文章
python3 manage_content.py tops add --url "Spring-Boot教程"

# 更新配置
python3 manage_content.py config name "新网站名称"
```

详细使用说明请查看 `使用说明.md`。

## 项目结构

```
pages/
├── _posts/              # 博客文章
├── _data/               # 数据文件（置顶、链接等）
├── _layouts/            # 页面布局模板
├── _includes/           # 包含文件（header、footer等）
├── _config.yml          # Jekyll 配置
├── assets/              # 静态资源（CSS、JS、图片）
├── manage_content.py    # 内容管理脚本
├── 分支分析文档.md      # 分支说明
├── 使用说明.md          # 详细使用说明
└── README_管理工具.md   # 本文件
```

## 常用命令

```bash
# 内容管理
python3 manage_content.py list                    # 列出文章
python3 manage_content.py create --title "..."   # 创建文章
python3 manage_content.py edit <file> --title "..."  # 编辑文章
python3 manage_content.py delete <file>          # 删除文章

# 置顶管理
python3 manage_content.py tops list              # 列出置顶
python3 manage_content.py tops add --url "..."   # 添加置顶
python3 manage_content.py tops remove --url "..." # 移除置顶

# 配置管理
python3 manage_content.py config <key> <value>   # 更新配置

# 本地开发
bundle exec jekyll serve                          # 启动服务器
bundle exec jekyll build                          # 构建网站
```

## 注意事项

1. 所有文件使用 UTF-8 编码
2. 文章文件名格式：`YYYY-MM-DD-title.md`
3. 修改前建议先备份
4. 修改后记得提交到 Git

## 帮助文档

- `使用说明.md` - 详细的使用说明和示例
- `分支分析文档.md` - 分支作用和工作流程说明

## 技术支持

如有问题，请查看：
- Jekyll 官方文档：https://jekyllrb.com/
- GitHub Pages 文档：https://pages.github.com/

