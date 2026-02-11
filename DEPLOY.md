# 部署说明

## GitHub Actions 自动部署配置

由于 GitHub token 权限限制，需要手动添加 workflow 文件。

### 方法一：通过 GitHub 网页界面添加

1. 访问 https://github.com/de-bao/site
2. 点击 "Add file" -> "Create new file"
3. 文件路径输入：`.github/workflows/deploy.yml`
4. 复制以下内容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. 点击 "Commit new file"

### 方法二：更新 GitHub Token 权限

如果需要通过命令行推送 workflow 文件，需要更新 GitHub Personal Access Token，添加 `workflow` 权限。

### 启用 GitHub Pages

1. 访问 https://github.com/de-bao/site/settings/pages
2. 在 "Source" 下选择 "GitHub Actions"
3. 保存设置

完成以上步骤后，每次推送到 `main` 分支，GitHub Actions 会自动构建并部署网站。
