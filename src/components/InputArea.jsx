import { COLORS, SIZES } from '../constants'

/**
 * 输入区域组件
 */
const InputArea = ({ inputValue, onInputChange, onSend, textareaRef }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const hoverHandlers = {
    onMouseEnter: (e) => { e.currentTarget.style.backgroundColor = COLORS.hover },
    onMouseLeave: (e) => { e.currentTarget.style.backgroundColor = 'transparent' }
  }

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: COLORS.background,
      borderTop: `1px solid ${COLORS.border}`,
      padding: `${SIZES.spacing.lg} ${SIZES.spacing.xl}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: 'column', gap: SIZES.spacing.sm }}>
        <div style={{
          background: COLORS.backgroundGray,
          border: `1px solid ${COLORS.border}`,
          borderRadius: SIZES.borderRadius.lg,
          padding: SIZES.spacing.md,
          display: 'flex',
          alignItems: 'flex-end',
          gap: SIZES.spacing.md
        }}>
          {/* 左侧工具栏 */}
          <div style={{ display: 'flex', gap: SIZES.spacing.sm, fontSize: '14px', color: 'rgba(0,0,0,0.9)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: SIZES.spacing.xs, padding: `${SIZES.spacing.xs} ${SIZES.spacing.sm}`, borderRadius: SIZES.borderRadius.sm, cursor: 'pointer', transition: 'background-color 0.2s' }} {...hoverHandlers}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.74121 3.17676C9.89642 1.88502 11.9715 1.59281 13.001 2.62207L13.1289 2.76465C14.002 3.83505 13.6794 5.82083 12.4443 7.88086C13.7358 10.0358 14.0282 12.1093 12.999 13.1387L12.8574 13.2676C11.7872 14.1405 9.8019 13.8175 7.74219 12.583C5.68184 13.8185 3.69561 14.1417 2.625 13.2686L2.4834 13.1396C1.45403 12.1102 1.74622 10.0361 3.03809 7.88086C1.80268 5.82062 1.48033 3.83423 2.35352 2.76367L2.48145 2.62207C3.51103 1.59274 5.58588 1.88478 7.74121 3.17676Z" fill="currentColor" fillOpacity="0.9" />
              </svg>
              <span>深度思考</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: SIZES.spacing.xs, padding: `${SIZES.spacing.xs} ${SIZES.spacing.sm}`, borderRadius: SIZES.borderRadius.sm, cursor: 'pointer', background: COLORS.border, transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.disabled} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.border}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8.0019 13.1391C10.8399 13.1391 13.1405 10.8384 13.1405 8.00044C13.1405 5.16245 10.8399 2.86182 8.0019 2.86182C5.16392 2.86182 2.86328 5.16245 2.86328 8.00044C2.86328 10.8384 5.16392 13.1391 8.0019 13.1391Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>自动搜索</span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: SIZES.spacing.xs, padding: `${SIZES.spacing.xs} ${SIZES.spacing.sm}`, borderRadius: SIZES.borderRadius.sm, cursor: 'pointer', transition: 'background-color 0.2s' }} {...hoverHandlers}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4.49609 8.79297C6.01297 8.79297 7.24299 10.0223 7.24316 11.5391C7.24303 13.0558 6.013 14.2861 4.49609 14.2861C2.97927 14.286 1.75013 13.0558 1.75 11.5391C1.75018 10.0224 2.9793 8.79307 4.49609 8.79297Z" fill="currentColor" fillOpacity="0.9" />
              </svg>
              <span>工具</span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* 输入框 */}
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
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
              color: COLORS.text,
              lineHeight: '1.5'
            }}
          />

          {/* 右侧按钮 */}
          <div style={{ display: 'flex', gap: SIZES.spacing.sm, alignItems: 'center' }}>
            <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: SIZES.borderRadius.md, transition: 'background-color 0.2s' }} {...hoverHandlers}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.002 3.06055C10.4161 3.06065 10.752 3.39639 10.752 3.81055V9.25H16.1914C16.6056 9.25 16.9414 9.58579 16.9414 10C16.9414 10.4142 16.6056 10.75 16.1914 10.75H10.752V16.1895C10.752 16.6036 10.4161 16.9394 10.002 16.9395C9.58774 16.9395 9.25195 16.6037 9.25195 16.1895V10.75H3.8125C3.39829 10.75 3.0625 10.4142 3.0625 10C3.0625 9.58579 3.39829 9.25 3.8125 9.25H9.25195V3.81055C9.25195 3.39633 9.58774 3.06055 10.002 3.06055Z" />
              </svg>
            </div>
            <button
              onClick={onSend}
              disabled={!inputValue.trim()}
              style={{
                width: '32px',
                height: '32px',
                border: 'none',
                borderRadius: SIZES.borderRadius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s',
                flexShrink: 0,
                background: inputValue.trim() ? COLORS.primary : COLORS.disabled,
                color: COLORS.white,
                pointerEvents: inputValue.trim() ? 'auto' : 'none'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8L14 2L10 8L14 14L2 8Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: COLORS.textMuted, fontSize: '12px' }}>
          内容由AI生成，仅供参考
        </div>
      </div>
    </div>
  )
}

export default InputArea
