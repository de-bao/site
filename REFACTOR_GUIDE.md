# 重构流程详解：从 Jekyll 到 React

## 📚 目录
1. [原来的架构（Jekyll）](#原来的架构jekyll)
2. [现在的架构（React + Vite）](#现在的架构react--vite)
3. [重构步骤详解](#重构步骤详解)
4. [部署流程对比](#部署流程对比)
5. [日常使用流程](#日常使用流程)
6. [常见问题](#常见问题)

---

## 原来的架构（Jekyll）

### 工作原理
```
你的电脑 → 编辑 Markdown/HTML → Git Push → GitHub
                                           ↓
                                    Jekyll 自动构建
                                           ↓
                                    生成静态网站
                                           ↓
                                    GitHub Pages 展示
```

### 特点
- ✅ **简单**：直接写 HTML/Markdown，GitHub 自动处理
- ✅ **零配置**：GitHub 内置支持 Jekyll
- ❌ **功能有限**：主要是静态内容展示
- ❌ **构建慢**：每次推送都要等 Jekyll 构建
- ❌ **技术老旧**：Ruby 生态，现代前端功能支持有限

### 文件结构（示例）
```
site/
├── _config.yml          # Jekyll 配置
├── index.html           # 主页
├── _layouts/            # 模板
├── _includes/           # 组件片段
└── assets/              # 静态资源
```

---

## 现在的架构（React + Vite）

### 工作原理
```
你的电脑 → 编辑 React 组件 → npm run build → 生成 dist/
                                           ↓
                                    Git Push → GitHub
                                           ↓
                                    GitHub Actions 自动构建
                                           ↓
                                    部署到 GitHub Pages
```

### 特点
- ✅ **现代化**：使用最新的 React 18
- ✅ **组件化**：代码复用，易于维护
- ✅ **构建快**：Vite 比 Jekyll 快 10-100 倍
- ✅ **功能强大**：可以添加交互、动画等现代功能
- ✅ **开发体验好**：热更新，实时预览

### 文件结构
```
site/
├── src/                      # 源代码目录
│   ├── components/          # React 组件
│   │   ├── Header.jsx      # 头部组件
│   │   ├── News.jsx         # 新闻组件
│   │   ├── Publications.jsx # 论文组件
│   │   └── ...              # 其他组件
│   ├── data/                # 数据文件
│   │   └── publications.js  # 论文数据
│   ├── App.jsx              # 主应用组件
│   ├── main.jsx             # 入口文件
│   └── index.css            # 全局样式
├── index_files/             # 静态资源（图片、JS等）
├── index.html               # HTML 模板
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
├── package.json             # 项目依赖配置
└── .github/workflows/       # GitHub Actions 配置
    └── deploy.yml           # 自动部署脚本
```

---

## 重构步骤详解

### 第一步：清理旧项目
```bash
# 删除旧的 Git 历史
rm -rf .git
git init

# 删除旧文件（如果有）
rm -rf _layouts _includes _config.yml
```

### 第二步：初始化 React 项目
```bash
# 创建 package.json（定义项目依赖）
npm init -y

# 安装 React 和构建工具
npm install react react-dom
npm install -D vite @vitejs/plugin-react
npm install -D tailwindcss postcss autoprefixer
```

### 第三步：迁移内容
1. **提取数据**：从原始 HTML 提取内容到 JavaScript 文件
   ```javascript
   // src/data/publications.js
   export const publications = [
     {
       title: "论文标题",
       authors: "作者",
       year: "2024",
       // ...
     }
   ]
   ```

2. **创建组件**：将 HTML 片段转换为 React 组件
   ```jsx
   // src/components/Publications.jsx
   import { publications } from '../data/publications.js'
   
   const Publications = () => {
     return (
       <div>
         {publications.map(paper => (
           <div key={paper.title}>{paper.title}</div>
         ))}
       </div>
     )
   }
   ```

3. **复制静态资源**：图片、JS 文件等复制到 `index_files/`

### 第四步：配置构建工具
```javascript
// vite.config.js
export default {
  base: '/',  // 部署路径
  build: {
    outDir: 'dist',  // 输出目录
  }
}
```

### 第五步：配置自动部署
```yaml
# .github/workflows/deploy.yml
# 当推送到 main 分支时：
# 1. 安装 Node.js
# 2. 安装依赖 (npm ci)
# 3. 构建项目 (npm run build)
# 4. 部署到 GitHub Pages
```

---

## 部署流程对比

### Jekyll（旧方式）
```
1. 编辑文件（HTML/Markdown）
2. git add .
3. git commit -m "更新内容"
4. git push
5. ⏳ 等待 GitHub 自动构建（1-5分钟）
6. ✅ 网站更新完成
```

### React + GitHub Actions（新方式）
```
1. 编辑 React 组件
2. npm run dev  # 本地预览（可选）
3. git add .
4. git commit -m "更新内容"
5. git push
6. ⏳ GitHub Actions 自动：
   - 安装 Node.js
   - 安装依赖
   - 构建项目
   - 部署到 Pages（2-3分钟）
7. ✅ 网站更新完成
```

**关键区别**：
- Jekyll：GitHub 服务器自动构建，你不需要本地构建
- React：GitHub Actions 在云端构建，你也可以本地构建测试

---

## 日常使用流程

### 场景1：修改论文列表

**旧方式（Jekyll）**：
```html
<!-- 直接编辑 HTML -->
<tr>
  <td>新论文标题</td>
  <td>作者</td>
</tr>
```

**新方式（React）**：
```javascript
// 1. 编辑数据文件
// src/data/publications.js
export const publications = [
  // ... 现有论文
  {
    title: "新论文标题",
    authors: "作者",
    year: "2024"
  }
]

// 2. 组件自动显示（无需修改组件代码）
```

### 场景2：修改样式

**旧方式（Jekyll）**：
```html
<!-- 内联样式或单独的 CSS -->
<div style="color: red;">文本</div>
```

**新方式（React）**：
```jsx
// 使用 Tailwind CSS（推荐）
<div className="text-red-600">文本</div>

// 或自定义样式
<div className="custom-style">文本</div>
```

### 场景3：添加新功能

**旧方式（Jekyll）**：
- 需要写原生 JavaScript
- 难以复用代码
- 维护困难

**新方式（React）**：
```jsx
// 1. 创建新组件
// src/components/NewFeature.jsx
const NewFeature = () => {
  return <div>新功能</div>
}

// 2. 在 App.jsx 中使用
import NewFeature from './components/NewFeature'

function App() {
  return (
    <div>
      <Header />
      <NewFeature />  {/* 添加新功能 */}
    </div>
  )
}
```

---

## 常见问题

### Q1: 为什么需要 `npm install`？
**A**: React 项目依赖很多第三方库（React、Vite、Tailwind 等），`npm install` 会下载这些依赖到 `node_modules/` 文件夹。

### Q2: `dist/` 文件夹是什么？
**A**: `dist/` 是构建后的产物，包含：
- 压缩后的 JavaScript
- 优化后的 CSS
- 处理后的 HTML
- 静态资源

GitHub Pages 展示的就是 `dist/` 里的内容。

### Q3: 为什么本地运行 `npm run dev` 和线上不一样？
**A**: 
- `npm run dev`：开发模式，代码未压缩，便于调试
- `npm run build`：生产模式，代码压缩优化，体积小，速度快

线上展示的是构建后的版本。

### Q4: 如何添加新的依赖？
```bash
# 添加生产依赖（运行时需要）
npm install 包名

# 添加开发依赖（构建时需要）
npm install -D 包名

# 然后提交 package.json 和 package-lock.json
git add package.json package-lock.json
git commit -m "添加新依赖"
git push
```

### Q5: 如何回退到旧版本？
```bash
# 查看提交历史
git log

# 回退到指定提交
git reset --hard 提交ID

# 强制推送（谨慎使用）
git push -f origin main
```

### Q6: 本地测试构建结果
```bash
# 1. 构建项目
npm run build

# 2. 预览构建结果
npm run preview

# 3. 访问 http://localhost:4173
# 这样可以看到和线上完全一样的效果
```

---

## 技术栈对比

| 特性 | Jekyll | React + Vite |
|------|--------|--------------|
| **学习曲线** | 简单 | 中等 |
| **构建速度** | 慢（1-5分钟） | 快（几秒） |
| **代码复用** | 困难 | 简单（组件化） |
| **交互功能** | 有限 | 强大 |
| **现代化** | 老旧 | 最新 |
| **维护性** | 一般 | 优秀 |
| **扩展性** | 有限 | 无限 |

---

## 总结

### 重构的好处
1. ✅ **代码更清晰**：组件化，易于理解和修改
2. ✅ **开发更快**：热更新，实时预览
3. ✅ **功能更强**：可以添加复杂的交互功能
4. ✅ **维护更容易**：数据与展示分离，修改更方便
5. ✅ **性能更好**：Vite 构建，代码优化

### 需要适应的新概念
1. **组件化思维**：把页面拆分成独立组件
2. **数据驱动**：数据变化，页面自动更新
3. **构建流程**：代码需要构建后才能部署
4. **依赖管理**：通过 `package.json` 管理依赖

### 下一步学习建议
1. 学习 React 基础：组件、Props、State
2. 学习 Tailwind CSS：快速样式开发
3. 学习 Git：版本控制基础
4. 学习 JavaScript ES6+：现代 JS 语法

---

**有问题随时问！** 🚀
