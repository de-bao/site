import { useState, useRef, useEffect } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChatMode, setIsChatMode] = useState(false)
  const mainContainerRef = useRef(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      if (mainContainerRef.current) {
        mainContainerRef.current.scrollTop = mainContainerRef.current.scrollHeight
      }
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const content = inputValue.trim()

    if (!isChatMode) {
      setIsChatMode(true)
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '这是一个模拟回复。在实际项目中，这里会调用AI API来生成回复。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleExampleQuestion = (text) => {
    setInputValue(text)
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="yb-layout agent-layout layout-pc yb-layout--pc-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      backgroundColor: 'var(--background-page_background_web, #f5f5f5)'
    }}>
      {/* 顶部固定导航栏 */}
      <div className="yb-nav-fixed yb-nav-fixed--pc-ctx" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        padding: '12px 16px'
      }}>
        <div className="yb-common-nav__trigger yb-common-nav__trigger--grey" style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: '6px',
          backgroundColor: '#f3f4f6'
        }}>
          <span style={{ fontSize: '20px', color: '#666' }}>☰</span>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="yb-layout__content agent-layout__content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        marginLeft: '260px'
      }}>
        {/* 聊天内容区域 */}
        <div className="agent-dialogue" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div className="agent-dialogue__content-wrapper" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="agent-dialogue__content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* 聊天消息区域 */}
              <div className="agent-dialogue__content--common agent-dialogue__content--common-not-speaking" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                <div className="agent-dialogue__content--common__content" id="chat-content" style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }} ref={mainContainerRef}>
                  {!isChatMode ? (
                    <div className="agent-dialogue__content--common__homepage" style={{
                      width: '100%',
                      maxWidth: '800px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '32px'
                    }}>
                      {/* Hi，我是元宝标题 */}
                      <div className="say-hi_say-hi__2TUvz say-hi_align-center__dbw-X say-hi_size-medium__IqDo8" style={{
                        textAlign: 'center',
                        marginTop: '40px'
                      }}>
                        <h1 className="say-hi_title__-GN0J" style={{
                          fontSize: '32px',
                          fontWeight: 600,
                          color: '#1f2937',
                          margin: 0
                        }}>Hi，我是元宝</h1>
                      </div>

                      {/* 输入引导项 */}
                      <div className="input-guide-v2" style={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        justifyContent: 'center'
                      }}>
                        {[
                          { title: '下载元宝电脑版', subtitle: '快速启动，划词问答，多格式全能处理' },
                          { title: '国画创作', subtitle: '工笔荷花' },
                          { title: '识图求知', subtitle: '结合财报数据计算毛利率' },
                          { title: '好奇发现', subtitle: '如果地球没有风' }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="input-guide-v2-item"
                            onClick={() => handleExampleQuestion(item.title)}
                            style={{
                              background: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              padding: '12px 16px',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              minWidth: '200px',
                              flex: '1 1 auto',
                              maxWidth: '300px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#0066ff'
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 102, 255, 0.1)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#e5e7eb'
                              e.currentTarget.style.boxShadow = 'none'
                            }}
                          >
                            <div className="input-guide-v2-item__title-wrap" style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '4px'
                            }}>
                              <span style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>{item.title}</span>
                            </div>
                            <span className="input-guide-v2-item__subtitle" style={{
                              fontSize: '12px',
                              color: '#6b7280'
                            }}>{item.subtitle}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {messages.map((message) => (
                        <div
                          key={message.id}
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

                      {isLoading && (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 500,
                            flexShrink: 0
                          }}>
                            元
                          </div>
                          <div style={{
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            display: 'flex',
                            gap: '4px',
                            alignItems: 'center'
                          }}>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              background: '#9ca3af',
                              borderRadius: '50%',
                              animation: 'bounce 1.4s infinite ease-in-out',
                              animationDelay: '0ms'
                            }}></div>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              background: '#9ca3af',
                              borderRadius: '50%',
                              animation: 'bounce 1.4s infinite ease-in-out',
                              animationDelay: '150ms'
                            }}></div>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              background: '#9ca3af',
                              borderRadius: '50%',
                              animation: 'bounce 1.4s infinite ease-in-out',
                              animationDelay: '300ms'
                            }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 输入框区域 */}
                <div className="agent-dialogue__content--common__input agent-chat__input-box" style={{
                  padding: '16px 24px',
                  background: 'white',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <div className="agent-dialogue__content--common__input__content" style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                  }}>
                    {/* 输入工具栏 */}
                    <div className="style__text-area__start___B3hfY" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                      paddingLeft: '4px'
                    }}>
                      {/* 深度思考按钮 */}
                      <div className="ThinkSelector_iconContainer__5HMzp" style={{
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
                        <div className="ThinkSelector_iconButton__ikmxD" style={{
                          width: '16px',
                          height: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.74121 3.17676C9.89642 1.88502 11.9715 1.59281 13.001 2.62207L13.1289 2.76465C14.002 3.83505 13.6794 5.82083 12.4443 7.88086C13.7358 10.0358 14.0282 12.1093 12.999 13.1387L12.8574 13.2676C11.7872 14.1405 9.8019 13.8175 7.74219 12.583C5.68184 13.8185 3.69561 14.1417 2.625 13.2686L2.4834 13.1396C1.45403 12.1102 1.74622 10.0361 3.03809 7.88086C1.80268 5.82062 1.48033 3.83423 2.35352 2.76367L2.48145 2.62207C3.51103 1.59274 5.58588 1.88478 7.74121 3.17676ZM3.78906 8.99121C3.5844 9.38197 3.42119 9.76094 3.30176 10.1191C2.87109 11.4111 3.10053 12.0594 3.33203 12.291C3.56382 12.5224 4.21138 12.7508 5.50293 12.3203C5.86105 12.2009 6.23914 12.0365 6.62988 11.832C6.11465 11.4433 5.6037 11.0011 5.11133 10.5088C4.61932 10.0168 4.17756 9.50607 3.78906 8.99121ZM11.6924 8.99121C11.3038 9.50628 10.8623 10.0176 10.3701 10.5098C9.8781 11.0017 9.36738 11.4436 8.85254 11.832C9.2432 12.0365 9.62148 12.2 9.97949 12.3193C11.2712 12.7499 11.9187 12.5215 12.1504 12.29C12.3818 12.0584 12.6111 11.4106 12.1807 10.1191C12.0613 9.76095 11.8971 9.382 11.6924 8.99121ZM7.74121 4.60449C7.14654 5.0171 6.54395 5.51762 5.96094 6.10059C5.37795 6.68359 4.87738 7.28626 4.46484 7.88086C4.87711 8.47532 5.37627 9.07839 5.95898 9.66113C6.54239 10.2445 7.146 10.7446 7.74121 11.1572C8.33603 10.7448 8.93937 10.2452 9.52246 9.66211C10.1055 9.07907 10.6051 8.4757 11.0176 7.88086C10.6049 7.28598 10.1047 6.68284 9.52148 6.09961C8.93871 5.5169 8.33558 5.01691 7.74121 4.60449ZM5.50195 3.44043C4.21021 3.00992 3.56173 3.23924 3.33008 3.4707C3.09874 3.70267 2.87149 4.35064 3.30176 5.6416C3.4212 5.99984 3.58447 6.37866 3.78906 6.76953C4.17759 6.25456 4.62021 5.74407 5.1123 5.25195C5.60467 4.75963 6.11561 4.31738 6.63086 3.92871C6.23967 3.72379 5.86052 3.55995 5.50195 3.44043ZM12.1523 3.4707C11.9207 3.23922 11.2723 3.01086 9.98047 3.44141C9.62227 3.5608 9.24333 3.72405 8.85254 3.92871C9.36727 4.31709 9.87822 4.75913 10.3701 5.25098C10.8623 5.74319 11.3038 6.25444 11.6924 6.76953C11.897 6.37858 12.0612 5.99986 12.1807 5.6416C12.611 4.35025 12.3838 3.70236 12.1523 3.4707Z" fill="currentColor" fillOpacity="0.9"></path>
                          </svg>
                        </div>
                        <span style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.9)' }}>深度思考</span>
                      </div>

                      {/* 自动搜索按钮 */}
                      <div className="index_v2_selectArrowButtonWrapper__ggyIU" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        backgroundColor: '#e5e7eb'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                      >
                        <div className="index_v2_mainSection__SNIvs" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <div className="index_v2_contentIcon__7r1jf">
                            <div className="index_v2_stillIcon__YzNea">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.0019 13.1391C10.8399 13.1391 13.1405 10.8384 13.1405 8.00044C13.1405 5.16245 10.8399 2.86182 8.0019 2.86182C5.16392 2.86182 2.86328 5.16245 2.86328 8.00044C2.86328 10.8384 5.16392 13.1391 8.0019 13.1391Z" stroke="currentColor" strokeLinecap="round"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.00076 13.1391C9.13596 13.1391 10.0562 10.8384 10.0562 8.00044C10.0562 5.16245 9.13596 2.86182 8.00076 2.86182C6.86556 2.86182 5.94531 5.16245 5.94531 8.00044C5.94531 10.8384 6.86556 13.1391 8.00076 13.1391Z" stroke="currentColor" strokeLinecap="round"></path>
                                <path d="M1.38478 6.22949C1.13962 6.75405 1 7.35789 1 8.0005C1 8.6431 1.13962 9.24694 1.38478 9.7715" stroke="currentColor" strokeLinecap="round"></path>
                                <path d="M14.6152 6.22949C14.8604 6.75405 15 7.35789 15 8.0005C15 8.6431 14.8604 9.24694 14.6152 9.7715" stroke="currentColor" strokeLinecap="round"></path>
                                <path d="M2.86328 8H13.1405" stroke="currentColor" strokeLinecap="round"></path>
                              </svg>
                            </div>
                          </div>
                          <div className="index_v2_contentText__bscyr" style={{
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.9)'
                          }}>自动搜索</div>
                        </div>
                        <div className="index_v2_actionSection__ih7td" style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                      </div>

                      {/* 工具按钮 */}
                      <button type="button" className="ybc-atomSelect-tools" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: 'rgba(0, 0, 0, 0.9)',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_2524_43861)">
                            <path d="M4.49609 8.79297C6.01297 8.79297 7.24299 10.0223 7.24316 11.5391C7.24303 13.0558 6.013 14.2861 4.49609 14.2861C2.97927 14.286 1.75013 13.0558 1.75 11.5391C1.75018 10.0224 2.9793 8.79307 4.49609 8.79297ZM11.2432 8.79297C12.7599 8.79309 13.9891 10.0224 13.9893 11.5391C13.9891 13.0558 12.76 14.286 11.2432 14.2861C9.72626 14.2861 8.49622 13.0558 8.49609 11.5391C8.49627 10.0223 9.72629 8.79297 11.2432 8.79297ZM4.49609 9.99219C3.64214 9.99229 2.9494 10.685 2.94922 11.5391C2.94935 12.3931 3.64211 13.0858 4.49609 13.0859C5.35016 13.0859 6.04284 12.3932 6.04297 11.5391C6.04279 10.685 5.35013 9.99219 4.49609 9.99219ZM11.2432 9.99219C10.3891 9.99219 9.69647 10.685 9.69629 11.5391C9.69642 12.3932 10.3891 13.0859 11.2432 13.0859C12.0971 13.0858 12.7899 12.3931 12.79 11.5391C12.7899 10.685 12.0971 9.99231 11.2432 9.99219ZM4.49609 2.0459C6.01298 2.0459 7.24299 3.27525 7.24316 4.79199C7.24303 6.30877 6.013 7.53906 4.49609 7.53906C2.97927 7.53896 1.75013 6.30871 1.75 4.79199C1.75017 3.27531 2.97929 2.046 4.49609 2.0459ZM10.9385 2.31738C11.0476 2.03155 11.4524 2.03156 11.5615 2.31738L11.958 3.3584C12.0979 3.72561 12.3928 4.01276 12.7637 4.14258L13.6016 4.43555C13.8987 4.53987 13.8986 4.96004 13.6016 5.06445L12.7637 5.3584C12.3929 5.48819 12.0979 5.77451 11.958 6.1416L11.5615 7.18262C11.4525 7.46885 11.0475 7.46885 10.9385 7.18262L10.542 6.1416C10.4021 5.77451 10.1071 5.48819 9.73633 5.3584L8.89844 5.06445C8.60143 4.96003 8.60134 4.53987 8.89844 4.43555L9.73633 4.14258C10.1072 4.01276 10.4021 3.72561 10.542 3.3584L10.9385 2.31738ZM4.49609 3.24512C3.64213 3.24522 2.94939 3.93795 2.94922 4.79199C2.94935 5.64607 3.64211 6.33877 4.49609 6.33887C5.35016 6.33887 6.04284 5.64613 6.04297 4.79199C6.0428 3.93789 5.35014 3.24512 4.49609 3.24512Z" fill="currentColor" fillOpacity="0.9"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_2524_43861">
                              <rect width="16" height="16" fill="currentColor"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <span style={{ fontSize: '14px' }}>工具</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="agent-dialogue__content--common__input-box" style={{
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '12px'
                    }}>
                      <textarea
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value)
                          e.target.style.height = 'auto'
                          e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                        }}
                        onKeyDown={handleKeyPress}
                        placeholder="有问题，尽管问，shift+enter换行"
                        rows={1}
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
                      <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isLoading}
                        className="style__send-btn___RwTm5"
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                          transition: 'background-color 0.2s',
                          flexShrink: 0,
                          background: inputValue.trim() && !isLoading ? '#0066ff' : '#d1d5db',
                          color: 'white'
                        }}
                        onMouseEnter={(e) => {
                          if (inputValue.trim() && !isLoading) {
                            e.target.style.background = '#0052cc'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (inputValue.trim() && !isLoading) {
                            e.target.style.background = '#0066ff'
                          }
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="agent-dialogue__content-copyright" style={{
            padding: '8px 24px',
            textAlign: 'center'
          }}>
            <div className="copyright-wp">
              <div className="copyright">
                <div className="copyright__item" style={{
                  fontSize: '12px',
                  color: '#9ca3af'
                }}>内容由AI生成，仅供参考</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 左侧导航栏（简化版） */}
      <div className="yb-nav yb-common-nav yb-nav--overlay yb-nav--pc-ctx yb-nav--floating" style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '260px',
        height: '100vh',
        background: 'white',
        borderRight: '1px solid #e5e7eb',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="yb-nav__header yb-common-nav__hd" style={{
          padding: '12px 16px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div className="yb-common-nav__trigger" style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '6px'
          }}>
            <span style={{ fontSize: '20px' }}>☰</span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937' }}>元宝</div>
        </div>
        <div className="yb-common-nav__tool" style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: '#6b7280'
        }}>
          <span style={{ fontSize: '20px' }}>🔍</span>
          <p style={{ margin: 0, fontSize: '14px' }}>搜索</p>
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="yb-nav__footer" style={{
          padding: '12px 16px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div className="index_pc_download__A+Izz yb__pc_download" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            <span>⬇</span>
            <div>前往下载中心</div>
          </div>
        </div>
      </div>

      {/* 加载动画CSS */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

export default App
