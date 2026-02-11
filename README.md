# Index - Resume

现代化的个人简历页面，使用 React + Vite + Tailwind CSS 构建。

## 技术栈

- **React 18** - 现代化的 UI 框架
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **GitHub Pages** - 自动部署

## 开发

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

## 部署

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

1. 推送到 `main` 分支
2. GitHub Actions 会自动构建并部署
3. 访问 `https://debaosite.dpdns.org` 或 `https://de-bao.github.io/site`

## 项目结构

```
site/
├── src/
│   ├── components/     # React 组件
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # 入口文件
│   └── index.css       # 全局样式
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
├── tailwind.config.js  # Tailwind 配置
└── package.json        # 项目依赖
```
