import { COLORS, SIZES } from '../constants'

/**
 * 聊天区域组件
 */
const ChatArea = ({ messages, isChatMode, children, onDragOver, onDragLeave, onDrop }) => {
  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${SIZES.spacing.xxl} ${SIZES.spacing.xl} 200px`,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {!isChatMode ? (
        <>
          <h1 style={{ fontSize: '48px', fontWeight: '600', color: COLORS.text, margin: `${SIZES.spacing.xxl} 0 ${SIZES.spacing.xl}` }}>Hi，</h1>
          <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.border, marginBottom: '32px' }}></div>
          {children}
        </>
      ) : (
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: SIZES.spacing.lg }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: SIZES.spacing.md,
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
                color: COLORS.white,
                fontSize: '12px',
                fontWeight: 500,
                background: message.role === 'user'
                  ? COLORS.primary
                  : `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`
              }}>
                {message.role === 'user' ? '我' : '元'}
              </div>
              <div style={{
                maxWidth: '70%',
                borderRadius: SIZES.borderRadius.lg,
                padding: `${SIZES.spacing.md} ${SIZES.spacing.lg}`,
                fontSize: '14px',
                lineHeight: '1.6',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                background: message.role === 'user' ? COLORS.primary : COLORS.background,
                color: message.role === 'user' ? COLORS.white : COLORS.text,
                border: message.role === 'user' ? 'none' : `1px solid ${COLORS.border}`
              }}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChatArea
