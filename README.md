# 豹网 - AI助手前端

基于 Vue 3 Composition API 的简洁AI助手前端项目。

## 📋 项目简介

这是一个轻量级的AI助手前端项目，采用 Vue 3 Composition API 开发，代码简洁清晰，易于定制和扩展。

## 🛠️ 技术栈

- **Vue 3** (3.4.15) - Composition API
- **Vite** (5.0.8) - 构建工具

## 📁 项目结构

```
site/
├── src/
│   ├── components/          # Vue组件
│   │   ├── Sidebar.vue     # 侧边栏
│   │   ├── Header.vue      # 顶部栏
│   │   ├── ChatArea.vue    # 聊天区域
│   │   ├── InputArea.vue   # 输入区域
│   │   ├── ModelSelector.vue  # 模型选择器
│   │   ├── SuggestionCards.vue # 建议卡片
│   │   └── DragOverlay.vue  # 拖拽覆盖层
│   ├── composables/        # 组合式函数
│   │   ├── useClickOutside.js
│   │   └── useDragAndDrop.js
│   ├── constants/          # 常量定义
│   │   └── index.js
│   ├── App.vue             # 根组件
│   ├── main.js             # 入口文件
│   └── index.css           # 全局样式
├── index.html              # HTML模板
├── vite.config.js          # Vite配置
└── package.json            # 项目配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发

```bash
npm run dev
```

访问 `http://localhost:5173`

### 构建

```bash
npm run build
```

## 💡 核心功能

- ✅ 聊天界面（消息列表）
- ✅ 模型选择
- ✅ 示例问题卡片
- ✅ 文件拖拽上传
- ✅ 响应式布局

## 🔨 接入API

修改 `src/App.vue` 中的 `handleSend` 函数：

```javascript
const handleSend = async (text) => {
  if (!text?.trim()) return

  isChatMode.value = true
  messages.value.push({ role: 'user', content: text })
  
  // 调用你的API
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      message: text, 
      model: selectedModel.value 
    })
  })
  const data = await response.json()
  
  messages.value.push({ role: 'assistant', content: data.reply })
  inputValue.value = ''
}
```

## 📝 自定义

- **修改模型**：编辑 `src/constants/index.js` 中的 `MODELS` 和 `MODEL_CONFIG`
- **修改建议卡片**：编辑 `src/constants/index.js` 中的 `SUGGESTION_CARDS`
- **修改导航**：编辑 `src/constants/index.js` 中的 `NAV_ITEMS`
- **修改颜色**：编辑 `src/constants/index.js` 中的 `COLORS`

## 📄 License

MIT
