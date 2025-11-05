#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
网页内容管理接口
用于方便管理员修改博客内容，包括：
- 添加/编辑/删除文章
- 管理置顶文章
- 修改网站配置
"""

import os
import sys
import yaml
import json
from datetime import datetime
from pathlib import Path
import argparse

# 项目根目录
BASE_DIR = Path(__file__).parent
POSTS_DIR = BASE_DIR / "_posts"
DATA_DIR = BASE_DIR / "_data"
CONFIG_FILE = BASE_DIR / "_config.yml"


class ContentManager:
    """内容管理器"""
    
    def __init__(self):
        self.posts_dir = POSTS_DIR
        self.data_dir = DATA_DIR
        self.config_file = CONFIG_FILE
    
    def list_posts(self):
        """列出所有文章"""
        posts = []
        for post_file in sorted(self.posts_dir.glob("*.md"), reverse=True):
            with open(post_file, 'r', encoding='utf-8') as f:
                content = f.read()
                if content.startswith('---'):
                    # 提取 front matter
                    parts = content.split('---', 2)
                    if len(parts) >= 3:
                        try:
                            front_matter = yaml.safe_load(parts[1])
                            posts.append({
                                'file': post_file.name,
                                'title': front_matter.get('title', '无标题'),
                                'date': front_matter.get('date', ''),
                                'categories': front_matter.get('categories', []),
                                'tags': front_matter.get('tags', [])
                            })
                        except:
                            pass
        return posts
    
    def create_post(self, title, categories=None, tags=None, content=""):
        """创建新文章"""
        # 生成文件名
        date_str = datetime.now().strftime("%Y-%m-%d")
        safe_title = "".join(c if c.isalnum() or c in ('-', '_') else '-' 
                             for c in title)
        filename = f"{date_str}-{safe_title}.md"
        filepath = self.posts_dir / filename
        
        if filepath.exists():
            print(f"错误：文件 {filename} 已存在")
            return False
        
        # 创建 front matter
        front_matter = {
            'layout': 'post',
            'title': title,
            'categories': categories or [],
            'tags': tags or [],
            'author': 'Feiyizhan',
            'description': content[:100] if content else title,
            'issueId': title
        }
        
        # 写入文件
        post_content = f"""---
{self._dict_to_yaml(front_matter)}
---

{content}

"""
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(post_content)
        
        print(f"✓ 文章已创建：{filename}")
        return True
    
    def edit_post(self, filename, title=None, content=None, categories=None, tags=None):
        """编辑文章"""
        filepath = self.posts_dir / filename
        if not filepath.exists():
            print(f"错误：文件 {filename} 不存在")
            return False
        
        with open(filepath, 'r', encoding='utf-8') as f:
            file_content = f.read()
        
        if not file_content.startswith('---'):
            print("错误：文件格式不正确")
            return False
        
        # 分离 front matter 和内容
        parts = file_content.split('---', 2)
        if len(parts) < 3:
            print("错误：无法解析文件格式")
            return False
        
        # 解析 front matter
        front_matter = yaml.safe_load(parts[1])
        body_content = parts[2].strip()
        
        # 更新字段
        if title:
            front_matter['title'] = title
        if categories is not None:
            front_matter['categories'] = categories
        if tags is not None:
            front_matter['tags'] = tags
        if content is not None:
            body_content = content
        
        # 写回文件
        new_content = f"""---
{self._dict_to_yaml(front_matter)}
---

{body_content}

"""
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ 文章已更新：{filename}")
        return True
    
    def delete_post(self, filename):
        """删除文章"""
        filepath = self.posts_dir / filename
        if not filepath.exists():
            print(f"错误：文件 {filename} 不存在")
            return False
        
        confirm = input(f"确定要删除 {filename} 吗？(y/N): ")
        if confirm.lower() != 'y':
            print("已取消")
            return False
        
        filepath.unlink()
        print(f"✓ 文章已删除：{filename}")
        return True
    
    def list_top_posts(self):
        """列出置顶文章"""
        tops_file = self.data_dir / "tops.yml"
        if not tops_file.exists():
            return []
        
        with open(tops_file, 'r', encoding='utf-8') as f:
            tops = yaml.safe_load(f) or []
        return tops
    
    def add_top_post(self, post_url):
        """添加置顶文章"""
        tops_file = self.data_dir / "tops.yml"
        tops = self.list_top_posts()
        
        # 检查是否已存在
        for top in tops:
            if top.get('url') == post_url:
                print(f"错误：文章 {post_url} 已在置顶列表中")
                return False
        
        tops.append({'url': post_url})
        
        with open(tops_file, 'w', encoding='utf-8') as f:
            yaml.dump(tops, f, allow_unicode=True, default_flow_style=False)
        
        print(f"✓ 已添加置顶文章：{post_url}")
        return True
    
    def remove_top_post(self, post_url):
        """移除置顶文章"""
        tops_file = self.data_dir / "tops.yml"
        tops = self.list_top_posts()
        
        new_tops = [t for t in tops if t.get('url') != post_url]
        
        if len(new_tops) == len(tops):
            print(f"错误：文章 {post_url} 不在置顶列表中")
            return False
        
        with open(tops_file, 'w', encoding='utf-8') as f:
            yaml.dump(new_tops, f, allow_unicode=True, default_flow_style=False)
        
        print(f"✓ 已移除置顶文章：{post_url}")
        return True
    
    def update_config(self, key, value):
        """更新配置文件"""
        with open(self.config_file, 'r', encoding='utf-8') as f:
            config = yaml.safe_load(f)
        
        # 支持嵌套键，如 "author.name"
        keys = key.split('.')
        current = config
        for k in keys[:-1]:
            if k not in current:
                current[k] = {}
            current = current[k]
        current[keys[-1]] = value
        
        with open(self.config_file, 'w', encoding='utf-8') as f:
            yaml.dump(config, f, allow_unicode=True, default_flow_style=False, sort_keys=False)
        
        print(f"✓ 配置已更新：{key} = {value}")
        return True
    
    def _dict_to_yaml(self, data):
        """将字典转换为 YAML 字符串"""
        yaml_str = yaml.dump(data, allow_unicode=True, default_flow_style=False, sort_keys=False)
        return yaml_str.strip()


def main():
    parser = argparse.ArgumentParser(description='网页内容管理工具')
    subparsers = parser.add_subparsers(dest='command', help='可用命令')
    
    # 列出文章
    parser_list = subparsers.add_parser('list', help='列出所有文章')
    
    # 创建文章
    parser_create = subparsers.add_parser('create', help='创建新文章')
    parser_create.add_argument('--title', required=True, help='文章标题')
    parser_create.add_argument('--categories', nargs='+', help='分类列表')
    parser_create.add_argument('--tags', nargs='+', help='标签列表')
    parser_create.add_argument('--content', default='', help='文章内容')
    
    # 编辑文章
    parser_edit = subparsers.add_parser('edit', help='编辑文章')
    parser_edit.add_argument('filename', help='文章文件名')
    parser_edit.add_argument('--title', help='新标题')
    parser_edit.add_argument('--content', help='新内容')
    parser_edit.add_argument('--categories', nargs='+', help='新分类列表')
    parser_edit.add_argument('--tags', nargs='+', help='新标签列表')
    
    # 删除文章
    parser_delete = subparsers.add_parser('delete', help='删除文章')
    parser_delete.add_argument('filename', help='文章文件名')
    
    # 置顶文章
    parser_tops = subparsers.add_parser('tops', help='管理置顶文章')
    parser_tops.add_argument('action', choices=['list', 'add', 'remove'], help='操作')
    parser_tops.add_argument('--url', help='文章URL（用于add/remove）')
    
    # 配置
    parser_config = subparsers.add_parser('config', help='更新配置')
    parser_config.add_argument('key', help='配置键（支持嵌套，如 author.name）')
    parser_config.add_argument('value', help='配置值')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    manager = ContentManager()
    
    try:
        if args.command == 'list':
            posts = manager.list_posts()
            print(f"\n共 {len(posts)} 篇文章：\n")
            for post in posts:
                print(f"  {post['file']}")
                print(f"    标题: {post['title']}")
                print(f"    日期: {post['date']}")
                print(f"    分类: {', '.join(post['categories'])}")
                print(f"    标签: {', '.join(post['tags'])}")
                print()
        
        elif args.command == 'create':
            manager.create_post(
                title=args.title,
                categories=args.categories,
                tags=args.tags,
                content=args.content
            )
        
        elif args.command == 'edit':
            manager.edit_post(
                filename=args.filename,
                title=args.title,
                content=args.content,
                categories=args.categories,
                tags=args.tags
            )
        
        elif args.command == 'delete':
            manager.delete_post(args.filename)
        
        elif args.command == 'tops':
            if args.action == 'list':
                tops = manager.list_top_posts()
                print(f"\n共 {len(tops)} 篇置顶文章：\n")
                for top in tops:
                    print(f"  - {top.get('url', '')}")
            elif args.action == 'add':
                if not args.url:
                    print("错误：需要提供 --url 参数")
                    return
                manager.add_top_post(args.url)
            elif args.action == 'remove':
                if not args.url:
                    print("错误：需要提供 --url 参数")
                    return
                manager.remove_top_post(args.url)
        
        elif args.command == 'config':
            manager.update_config(args.key, args.value)
    
    except Exception as e:
        print(f"错误：{e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()

