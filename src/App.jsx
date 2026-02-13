import { useState, useRef } from 'react'
import { MODELS, COLORS } from './constants'
import { useDragAndDrop } from './hooks/useDragAndDrop'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ChatArea from './components/ChatArea'
import SuggestionCards from './components/SuggestionCards'
import InputArea from './components/InputArea'
import DragOverlay from './components/DragOverlay'

/**
 * 主应用组件
 * 遵循Clean Code原则：单一职责、组件拆分、逻辑分离
 */
function App() {
  // 状态管理
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([])
  const [isChatMode, setIsChatMode] = useState(false)
  const [selectedModel, setSelectedModel] = useState(MODELS.HUNYUAN)
  const textareaRef = useRef(null)

  // 拖拽上传
  const { isDragging, handlers: dragHandlers } = useDragAndDrop((files) => {
    // TODO: 处理文件上传
    console.log('Files dropped:', files)
  })

  // 事件处理函数
  const handleSend = () => {
    if (!inputValue.trim()) return
    
    setIsChatMode(true)
    setMessages([...messages, { role: 'user', content: inputValue }])
    setInputValue('')
    
    if (textareaRef.current) {
      textareaRef.current.value = ''
    }
  }

  const handleExampleClick = (text) => {
    setInputValue(text)
    if (textareaRef.current) {
      textareaRef.current.value = text
    }
    setTimeout(() => handleSend(), 100)
  }

  const handleInputChange = (value) => {
    setInputValue(value)
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: COLORS.background
    }}>
      {/* 左侧导航栏 */}
      <Sidebar />

      {/* 主内容区域 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.background,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 顶部栏 */}
        <Header selectedModel={selectedModel} onModelChange={setSelectedModel} />

        {/* 聊天区域 */}
        <ChatArea
          messages={messages}
          isChatMode={isChatMode}
          onDragOver={dragHandlers.onDragOver}
          onDragLeave={dragHandlers.onDragLeave}
          onDrop={dragHandlers.onDrop}
        >
          <SuggestionCards onCardClick={handleExampleClick} />
        </ChatArea>

        {/* 拖拽覆盖层 */}
        <DragOverlay isVisible={isDragging} />

        {/* 输入区域 */}
        <InputArea
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSend={handleSend}
          textareaRef={textareaRef}
        />
      </div>
    </div>
  )
}

export default App
