import { useState, useRef, useEffect } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([])
  const [isChatMode, setIsChatMode] = useState(false)
  const [selectedModel, setSelectedModel] = useState('Hunyuan')
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const modelDropdownRef = useRef(null)
  const textareaRef = useRef(null)

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target)) {
        setShowModelDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    // 处理文件上传
  }

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      backgroundColor: '#ffffff'
    }}>
      {/* 左侧导航栏 */}
      <div style={{
        width: '260px',
        backgroundColor: '#f5f5f5',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* 顶部按钮 */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer', 
            borderRadius: '6px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer', 
            borderRadius: '6px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* 搜索框 */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 12px', 
            backgroundColor: '#ffffff', 
            borderRadius: '6px', 
            border: '1px solid #e5e7eb' 
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM13 13l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Q 搜索" 
              style={{ 
                border: 'none', 
                outline: 'none', 
                flex: 1, 
                fontSize: '14px',
                background: 'transparent'
              }} 
            />
          </div>
        </div>

        {/* 导航项 */}
        <div style={{ padding: '8px', flex: 1, overflow: 'auto' }}>
          {/* 元宝 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 12px', 
            cursor: 'pointer', 
            borderRadius: '6px', 
            backgroundColor: '#e0e7ff',
            color: '#0066ff',
            marginBottom: '4px'
          }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>元</div>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>元宝</span>
          </div>

          {/* 灵感图库 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 12px', 
            cursor: 'pointer', 
            borderRadius: '6px', 
            marginBottom: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '16px' }}>🏞️</span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>灵感图库</span>
          </div>

          {/* 全部应用 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 12px', 
            cursor: 'pointer', 
            borderRadius: '6px', 
            marginBottom: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '16px' }}>🗂️</span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>全部应用</span>
          </div>

          {/* 全部收藏 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 12px', 
            cursor: 'pointer', 
            borderRadius: '6px', 
            marginBottom: '16px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '16px' }}>⭐</span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>全部收藏</span>
          </div>

          {/* 分组 */}
          <div style={{ 
            marginTop: '16px', 
            marginBottom: '8px', 
            padding: '0 12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>分组</span>
            <span style={{ cursor: 'pointer', fontSize: '12px', color: '#9ca3af' }}>➕</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 12px', 
            cursor: 'pointer', 
            borderRadius: '6px',
            marginBottom: '16px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '16px' }}>📄</span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>分组示例</span>
          </div>

          {/* 聊天 */}
          <div style={{ 
            marginTop: '16px', 
            marginBottom: '8px', 
            padding: '0 12px' 
          }}>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>聊天</span>
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              style={{ 
                padding: '8px 12px', 
                fontSize: '14px', 
                color: '#6b7280', 
                cursor: 'pointer', 
                borderRadius: '6px', 
                marginBottom: '4px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              💬 {`0112新对话 ${i + 1}`}
            </div>
          ))}
        </div>

        {/* 底部 */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            color: '#6b7280', 
            marginBottom: '8px',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: '14px' }}>前往下载中心</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 12px', 
            cursor: 'pointer',
            borderRadius: '6px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              backgroundColor: '#d1d5db' 
            }}></div>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>用户名称</span>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 顶部模型选择器 */}
        <div style={{
          padding: '12px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 10
        }}>
          <div ref={modelDropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowModelDropdown(!showModelDropdown)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {selectedModel}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {showModelDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                minWidth: '200px',
                padding: '8px 0',
                marginTop: '8px',
                zIndex: 1000
              }}>
                <div
                  onClick={() => {
                    setSelectedModel('Hunyuan')
                    setShowModelDropdown(false)
                  }}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: selectedModel === 'Hunyuan' ? '#f3f4f6' : 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedModel === 'Hunyuan' ? '#f3f4f6' : 'transparent'}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Hunyuan</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>全能处理，深度思考</div>
                  </div>
                  {selectedModel === 'Hunyuan' && <span style={{ color: '#0066ff' }}>✓</span>}
                </div>
                <div
                  onClick={() => {
                    setSelectedModel('DeepSeek')
                    setShowModelDropdown(false)
                  }}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: selectedModel === 'DeepSeek' ? '#f3f4f6' : 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedModel === 'DeepSeek' ? '#f3f4f6' : 'transparent'}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>DeepSeek</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>适合深度思考</div>
                  </div>
                  {selectedModel === 'DeepSeek' && <span style={{ color: '#0066ff' }}>✓</span>}
                </div>
              </div>
            )}
          </div>
          <button style={{
            background: '#22c55e',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
          >
            安装电脑版
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 主内容 */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 24px 200px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        >
          {!isChatMode ? (
            <>
              {/* 问候语 */}
              <h1 style={{ fontSize: '48px', fontWeight: '600', color: '#1f2937', margin: '40px 0 24px' }}>Hi，</h1>

              {/* 分隔线 */}
              <div style={{ width: '100%', height: '1px', backgroundColor: '#e5e7eb', marginBottom: '32px' }}></div>

              {/* 建议卡片 */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center',
                width: '100%'
              }}>
                {/* 红色促销卡片 */}
                <div style={{
                  background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7a45 100%)',
                  borderRadius: '8px',
                  padding: '16px',
                  color: 'white',
                  cursor: 'pointer',
                  flex: '0 0 228px',
                  maxWidth: '228px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '120px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 8px',
                    fontSize: '12px',
                    borderRadius: '8px 8px 0 0'
                  }}>元宝派红包 新春领不停</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '24px' }}>抢10亿红包!</div>
                  <div style={{ fontSize: '14px' }}>万元小马卡天天抽!</div>
                  <img 
                    src="/yuanbao_files/NzFkYzk2NzYtNGM4Mi00Y2U4LWI1NzYtZmRmM2FlMmYwNmYx_compress.webp" 
                    alt="Red Envelope" 
                    style={{ 
                      position: 'absolute', 
                      bottom: '-10px', 
                      right: '-10px', 
                      width: '80px', 
                      height: 'auto', 
                      opacity: 0.8 
                    }} 
                  />
                </div>

                {/* 下载元宝电脑版 */}
                <div style={{
                  background: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  minWidth: '200px',
                  flex: '0 0 auto',
                  transition: 'all 0.2s'
                }}
                onClick={() => handleExampleClick('下载元宝电脑版')}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 102, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <img src="/yuanbao_files/NjZlZDhiNDQtM2Q2Ni00MmViLTgzZDQtM2RjM2RjZjFlZmVh.png" alt="Download" style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>下载元宝电脑版</span>
                    <span style={{ marginLeft: 'auto', color: '#666666' }}>→</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>快速启动，划词问答，多格式全能处理</div>
                </div>

                {/* 国画创作 */}
                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  minWidth: '144px',
                  flex: '0 0 auto',
                  transition: 'all 0.2s'
                }}
                onClick={() => handleExampleClick('国画创作')}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0066ff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>国画创作</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>工笔荷花</div>
                </div>

                {/* 识图求知 */}
                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  minWidth: '144px',
                  flex: '0 0 auto',
                  transition: 'all 0.2s'
                }}
                onClick={() => handleExampleClick('识图求知')}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0066ff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>识图求知</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>结合财报数据计算毛利率</div>
                </div>

                {/* 好奇发现 */}
                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  minWidth: '144px',
                  flex: '0 0 auto',
                  transition: 'all 0.2s'
                }}
                onClick={() => handleExampleClick('好奇发现')}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0066ff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>好奇发现</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>如果地球没有风</div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    flexDirection: message.role === 'user' ? 'row-reverse' : 'row'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 500,
                    background: message.role === 'user'
                      ? '#0066ff'
                      : 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)'
                  }}>
                    {message.role === 'user' ? '我' : '元'}
                  </div>
                  <div style={{
                    maxWidth: '70%',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    background: message.role === 'user' ? '#0066ff' : 'white',
                    color: message.role === 'user' ? 'white' : '#1f2937',
                    border: message.role === 'user' ? 'none' : '1px solid #e5e7eb'
                  }}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 拖拽上传提示 */}
        {isDragging && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              maxWidth: '400px'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>文件拖动到此处即可上传</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                支持文件格式：jpg、jpeg、png、webp、bmp、gif、pdf、xls、xlsx、ppt、pptx、doc、docx、txt、csv、text、bat、c、cpp、cs、css、go、h、hpp、ini、java、js、json、log、lua、md、php、pl、py、rb、sh、sql、swift、tex、toml、vue、yaml、yml、xml、html
              </div>
            </div>
          </div>
        )}

        {/* 底部输入框 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderTop: '1px solid #e5e7eb',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '12px'
            }}>
              {/* 左侧工具栏 */}
              <div style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'rgba(0,0,0,0.9)' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.74121 3.17676C9.89642 1.88502 11.9715 1.59281 13.001 2.62207L13.1289 2.76465C14.002 3.83505 13.6794 5.82083 12.4443 7.88086C13.7358 10.0358 14.0282 12.1093 12.999 13.1387L12.8574 13.2676C11.7872 14.1405 9.8019 13.8175 7.74219 12.583C5.68184 13.8185 3.69561 14.1417 2.625 13.2686L2.4834 13.1396C1.45403 12.1102 1.74622 10.0361 3.03809 7.88086C1.80268 5.82062 1.48033 3.83423 2.35352 2.76367L2.48145 2.62207C3.51103 1.59274 5.58588 1.88478 7.74121 3.17676Z" fill="currentColor" fillOpacity="0.9"/>
                  </svg>
                  <span>深度思考</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  cursor: 'pointer', 
                  background: '#e5e7eb',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.0019 13.1391C10.8399 13.1391 13.1405 10.8384 13.1405 8.00044C13.1405 5.16245 10.8399 2.86182 8.0019 2.86182C5.16392 2.86182 2.86328 5.16245 2.86328 8.00044C2.86328 10.8384 5.16392 13.1391 8.0019 13.1391Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>自动搜索</span>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.49609 8.79297C6.01297 8.79297 7.24299 10.0223 7.24316 11.5391C7.24303 13.0558 6.013 14.2861 4.49609 14.2861C2.97927 14.286 1.75013 13.0558 1.75 11.5391C1.75018 10.0224 2.9793 8.79307 4.49609 8.79297Z" fill="currentColor" fillOpacity="0.9"/>
                  </svg>
                  <span>工具</span>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* 输入框 */}
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="有问题，尽管问，shift+enter换行"
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'none',
                  minHeight: '24px',
                  maxHeight: '120px',
                  overflowY: 'auto',
                  outline: 'none',
                  color: '#1f2937',
                  lineHeight: '1.5'
                }}
              />

              {/* 右侧发送按钮 */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer', 
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.002 3.06055C10.4161 3.06065 10.752 3.39639 10.752 3.81055V9.25H16.1914C16.6056 9.25 16.9414 9.58579 16.9414 10C16.9414 10.4142 16.6056 10.75 16.1914 10.75H10.752V16.1895C10.752 16.6036 10.4161 16.9394 10.002 16.9395C9.58774 16.9395 9.25195 16.6037 9.25195 16.1895V10.75H3.8125C3.39829 10.75 3.0625 10.4142 3.0625 10C3.0625 9.58579 3.39829 9.25 3.8125 9.25H9.25195V3.81055C9.25195 3.39633 9.58774 3.06055 10.002 3.06055Z"/>
                  </svg>
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: 'none',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                    transition: 'background-color 0.2s',
                    flexShrink: 0,
                    background: inputValue.trim() ? '#0066ff' : '#d1d5db',
                    color: 'white',
                    pointerEvents: inputValue.trim() ? 'auto' : 'none'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8L14 2L10 8L14 14L2 8Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            {/* 版权信息 */}
            <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px' }}>
              内容由AI生成，仅供参考
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
