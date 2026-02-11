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

### 自动部署（推荐）

项目已配置 GitHub Actions，推送到 `main` 分支后会自动构建并部署。

**首次部署设置：**

1. **启用 GitHub Pages**：
   - 访问 https://github.com/de-bao/site/settings/pages
   - 在 "Source" 下选择 "GitHub Actions"
   - 保存设置

2. **自动部署**：
   - 推送到 `main` 分支后，GitHub Actions 会自动：
     - 安装依赖 (`npm ci`)
     - 构建项目 (`npm run build`)
     - 部署到 GitHub Pages
   - 访问 `https://debaosite.dpdns.org` 或 `https://de-bao.github.io/site`

**注意**：如果 workflow 文件不存在，需要手动在 GitHub 网页上创建 `.github/workflows/deploy.yml`，内容参考项目根目录的对应文件。

### 手动部署（如果需要）

```bash
npm run build
# 然后将 dist/ 目录的内容推送到 gh-pages 分支
```

## 项目结构

```
site/
├── src/
│   ├── components/     # React 组件
│   ├── data/           # 数据文件
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # 入口文件
│   └── index.css       # 全局样式
├── index_files/        # 静态资源（图片、JS等）
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
├── tailwind.config.js  # Tailwind 配置
├── package.json        # 项目依赖
└── .github/workflows/  # GitHub Actions 配置
    └── deploy.yml       # 自动部署脚本
```

---

## 重构流程详解：从 Jekyll 到 React

### 📚 目录
1. [原来的架构（Jekyll）](#原来的架构jekyll)
2. [现在的架构（React + Vite）](#现在的架构react--vite)
3. [重构步骤详解](#重构步骤详解)
4. [部署流程对比](#部署流程对比)
5. [日常使用流程](#日常使用流程)
6. [常见问题](#常见问题)

---

### 原来的架构（Jekyll）

#### 工作原理
```
你的电脑 → 编辑 Markdown/HTML → Git Push → GitHub
                                           ↓
                                    Jekyll 自动构建
                                           ↓
                                    生成静态网站
                                           ↓
                                    GitHub Pages 展示
```

#### 特点
- ✅ **简单**：直接写 HTML/Markdown，GitHub 自动处理
- ✅ **零配置**：GitHub 内置支持 Jekyll
- ❌ **功能有限**：主要是静态内容展示
- ❌ **构建慢**：每次推送都要等 Jekyll 构建
- ❌ **技术老旧**：Ruby 生态，现代前端功能支持有限

---

### 现在的架构（React + Vite）

#### 工作原理
```
你的电脑 → 编辑 React 组件 → npm run build → 生成 dist/
                                           ↓
                                    Git Push → GitHub
                                           ↓
                                    GitHub Actions 自动构建
                                           ↓
                                    部署到 GitHub Pages
```

#### 特点
- ✅ **现代化**：使用最新的 React 18
- ✅ **组件化**：代码复用，易于维护
- ✅ **构建快**：Vite 比 Jekyll 快 10-100 倍
- ✅ **功能强大**：可以添加交互、动画等现代功能
- ✅ **开发体验好**：热更新，实时预览

---

### 重构步骤详解

#### 第一步：清理旧项目
```bash
# 删除旧的 Git 历史
rm -rf .git
git init

# 删除旧文件（如果有）
rm -rf _layouts _includes _config.yml
```

#### 第二步：初始化 React 项目
```bash
# 创建 package.json（定义项目依赖）
npm init -y

# 安装 React 和构建工具
npm install react react-dom
npm install -D vite @vitejs/plugin-react
npm install -D tailwindcss postcss autoprefixer
```

#### 第三步：迁移内容
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

#### 第四步：配置构建工具
```javascript
// vite.config.js
export default {
  base: '/',  // 部署路径
  build: {
    outDir: 'dist',  // 输出目录
  }
}
```

#### 第五步：配置自动部署
```yaml
# .github/workflows/deploy.yml
# 当推送到 main 分支时：
# 1. 安装 Node.js
# 2. 安装依赖 (npm ci)
# 3. 构建项目 (npm run build)
# 4. 部署到 GitHub Pages
```

---

### 部署流程对比

#### Jekyll（旧方式）
```
1. 编辑文件（HTML/Markdown）
2. git add .
3. git commit -m "更新内容"
4. git push
5. ⏳ 等待 GitHub 自动构建（1-5分钟）
6. ✅ 网站更新完成
```

#### React + GitHub Actions（新方式）
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

### 日常使用流程

#### 场景1：修改论文列表

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

#### 场景2：修改样式

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

#### 场景3：添加新功能

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

### 常见问题

#### Q1: 为什么需要 `npm install`？
**A**: React 项目依赖很多第三方库（React、Vite、Tailwind 等），`npm install` 会下载这些依赖到 `node_modules/` 文件夹。

#### Q2: `dist/` 文件夹是什么？
**A**: `dist/` 是构建后的产物，包含：
- 压缩后的 JavaScript
- 优化后的 CSS
- 处理后的 HTML
- 静态资源

GitHub Pages 展示的就是 `dist/` 里的内容。

#### Q3: 为什么本地运行 `npm run dev` 和线上不一样？
**A**: 
- `npm run dev`：开发模式，代码未压缩，便于调试
- `npm run build`：生产模式，代码压缩优化，体积小，速度快

线上展示的是构建后的版本。

#### Q4: 如何添加新的依赖？
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

#### Q5: 如何回退到旧版本？
```bash
# 查看提交历史
git log

# 回退到指定提交
git reset --hard 提交ID

# 强制推送（谨慎使用）
git push -f origin main
```

#### Q6: 本地测试构建结果
```bash
# 1. 构建项目
npm run build

# 2. 预览构建结果
npm run preview

# 3. 访问 http://localhost:4173
# 这样可以看到和线上完全一样的效果
```

---

### 技术栈对比

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

### 总结

#### 重构的好处
1. ✅ **代码更清晰**：组件化，易于理解和修改
2. ✅ **开发更快**：热更新，实时预览
3. ✅ **功能更强**：可以添加复杂的交互功能
4. ✅ **维护更容易**：数据与展示分离，修改更方便
5. ✅ **性能更好**：Vite 构建，代码优化

#### 需要适应的新概念
1. **组件化思维**：把页面拆分成独立组件
2. **数据驱动**：数据变化，页面自动更新
3. **构建流程**：代码需要构建后才能部署
4. **依赖管理**：通过 `package.json` 管理依赖

#### 下一步学习建议
1. 学习 React 基础：组件、Props、State
2. 学习 Tailwind CSS：快速样式开发
3. 学习 Git：版本控制基础
4. 学习 JavaScript ES6+：现代 JS 语法

---

**有问题随时问！** 🚀

---

## API 集成：现代前端与后端交互

### 当前项目状态

✅ **纯前端项目**：
- React 18 + Vite + Tailwind CSS
- 数据来自静态文件（`src/data/publications.js`）
- 无后端依赖，可直接部署到静态托管（GitHub Pages）

---

### 如何添加后端 API 调用

#### 示例1：从 API 获取论文列表（替换静态数据）

**当前方式（静态数据）**：
```jsx
// src/components/Publications.jsx
import { publications } from '../data/publications'

const Publications = () => {
  return (
    <div>
      {publications.map(pub => (
        <PublicationItem key={pub.id} publication={pub} />
      ))}
    </div>
  )
}
```

**改为 API 调用**：
```jsx
// src/components/Publications.jsx
import { useState, useEffect } from 'react'
import Section from './Section'

const Publications = () => {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // 组件加载时获取数据
    fetch('https://api.example.com/publications')
      .then(response => {
        if (!response.ok) {
          throw new Error('网络请求失败')
        }
        return response.json()
      })
      .then(data => {
        setPublications(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, []) // 空数组表示只在组件挂载时执行一次

  if (loading) {
    return <Section title="Publications"><div>加载中...</div></Section>
  }

  if (error) {
    return <Section title="Publications"><div>错误：{error}</div></Section>
  }

  return (
    <Section title="Publications">
      {publications.map(pub => (
        <PublicationItem key={pub.id} publication={pub} />
      ))}
    </Section>
  )
}
```

---

#### 示例2：提交表单数据到后端

```jsx
// src/components/ContactForm.jsx
import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('https://api.example.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('提交失败')
      }

      const data = await response.json()
      setResult({ success: true, message: '提交成功！' })
      setFormData({ name: '', email: '', message: '' }) // 清空表单
    } catch (error) {
      setResult({ success: false, message: '提交失败，请重试' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="姓名"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="邮箱"
      />
      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="留言"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? '提交中...' : '提交'}
      </button>
      {result && (
        <div className={result.success ? 'text-green-600' : 'text-red-600'}>
          {result.message}
        </div>
      )}
    </form>
  )
}
```

---

#### 示例3：使用自定义 Hook 封装 API 调用

```jsx
// src/hooks/usePublications.js
import { useState, useEffect } from 'react'

export const usePublications = () => {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.example.com/publications')
      .then(response => response.json())
      .then(data => {
        setPublications(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { publications, loading, error }
}

// 在组件中使用
// src/components/Publications.jsx
import { usePublications } from '../hooks/usePublications'

const Publications = () => {
  const { publications, loading, error } = usePublications()

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error}</div>

  return (
    <Section title="Publications">
      {publications.map(pub => (
        <PublicationItem key={pub.id} publication={pub} />
      ))}
    </Section>
  )
}
```

---

#### 示例4：使用 axios（更强大的 HTTP 客户端）

```bash
# 安装 axios
npm install axios
```

```jsx
// src/components/Publications.jsx
import axios from 'axios'
import { useState, useEffect } from 'react'

const Publications = () => {
  const [publications, setPublications] = useState([])

  useEffect(() => {
    axios.get('https://api.example.com/publications')
      .then(response => {
        setPublications(response.data)
      })
      .catch(error => {
        console.error('获取数据失败:', error)
      })
  }, [])

  // ... 渲染逻辑
}
```

---

### Jekyll vs React：后端交互对比

#### Jekyll（静态网站生成器）

**特点**：
- ❌ **无法直接调用 API**：Jekyll 在构建时生成静态 HTML，运行时无法动态获取数据
- ❌ **数据必须预先写入**：所有数据必须在构建时存在
- ❌ **无状态管理**：无法处理用户交互、表单提交等动态操作
- ✅ **适合**：纯静态内容展示（博客、文档、简历）

**工作流程**：
```
编辑 Markdown/HTML 
  → Jekyll 构建（生成静态 HTML）
  → 部署到服务器
  → 用户访问（只看到静态 HTML，无法交互）
```

---

#### React（现代前端框架）

**特点**：
- ✅ **可以直接调用 API**：在浏览器中运行时动态获取数据
- ✅ **动态数据**：数据可以实时从后端获取
- ✅ **状态管理**：可以处理用户交互、表单、实时更新等
- ✅ **适合**：需要交互的应用（表单、实时数据、用户认证等）

**工作流程**：
```
React 代码构建
  → 部署到服务器（静态文件）
  → 用户访问
  → 浏览器加载 React
  → React 运行时调用 API 获取数据
  → 动态更新页面
```

---

### 实际应用场景对比

#### 场景1：显示论文列表

**Jekyll**：
```html
<!-- 必须在构建时写入所有论文 -->
<ul>
  <li>论文1</li>
  <li>论文2</li>
  <!-- 添加新论文需要重新构建 -->
</ul>
```

**React（静态数据）**：
```jsx
// 当前方式：数据在代码中
import { publications } from '../data/publications'
// 添加新论文需要修改代码并重新部署
```

**React（API 调用）**：
```jsx
// 从后端 API 获取
fetch('https://api.example.com/publications')
// 添加新论文只需更新数据库，前端自动显示
```

---

#### 场景2：用户留言功能

**Jekyll**：
- ❌ **无法实现**：Jekyll 只能显示静态内容，无法处理表单提交

**React**：
```jsx
// ✅ 可以轻松实现
const handleSubmit = async (e) => {
  e.preventDefault()
  await fetch('https://api.example.com/messages', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
}
```

---

#### 场景3：实时数据更新

**Jekyll**：
- ❌ **无法实现**：页面是静态的，无法实时更新

**React**：
```jsx
// ✅ 可以定时刷新数据
useEffect(() => {
  const interval = setInterval(() => {
    fetch('https://api.example.com/latest')
      .then(res => res.json())
      .then(data => setLatestData(data))
  }, 5000) // 每5秒更新一次

  return () => clearInterval(interval)
}, [])
```

---

### 总结

#### 你的项目现在是纯前端

✅ **当前状态**：
- React + Vite（现代前端框架）
- 数据来自静态文件
- 可以直接部署到 GitHub Pages（静态托管）

✅ **添加后端交互很简单**：
- 在组件中使用 `fetch` 或 `axios` 调用 API
- 使用 React Hooks（`useState`, `useEffect`）管理数据
- 处理加载状态、错误处理

#### 与 Jekyll 的核心区别

| 特性 | Jekyll | React（你的项目） |
|------|--------|------------------|
| **数据来源** | 构建时写入 | 运行时获取（可调用 API） |
| **交互能力** | 无 | 有（表单、实时更新等） |
| **状态管理** | 无 | 有（React State） |
| **API 调用** | ❌ 无法调用 | ✅ 可以调用 |
| **适用场景** | 静态内容 | 静态 + 动态交互 |

#### 下一步

如果你想添加后端交互：

1. **创建 API 服务**（可选）：
   - 使用 Node.js + Express
   - 或使用 Python + Flask/FastAPI
   - 或使用现成的后端服务（Firebase、Supabase 等）

2. **在前端调用 API**：
   - 使用 `fetch` 或 `axios`
   - 使用 React Hooks 管理状态

3. **处理 CORS**（如果 API 在不同域名）：
   - 后端需要设置 CORS 头
   - 或使用代理（Vite 支持）

**简单来说**：你的项目已经是现代前端了，添加 API 调用就像在组件中加几行代码一样简单！🚀
