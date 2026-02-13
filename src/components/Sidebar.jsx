import { NAV_ITEMS, COLORS, SIZES } from '../constants'

/**
 * 侧边栏组件
 */
const Sidebar = () => {
  const hoverHandlers = {
    onMouseEnter: (e) => { e.currentTarget.style.backgroundColor = COLORS.hover },
    onMouseLeave: (e) => { e.currentTarget.style.backgroundColor = 'transparent' }
  }

  return (
    <div style={{
      width: SIZES.sidebarWidth,
      backgroundColor: COLORS.backgroundLight,
      borderRight: `1px solid ${COLORS.border}`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 顶部按钮 */}
      <div style={{ display: 'flex', gap: SIZES.spacing.sm, padding: `${SIZES.spacing.md} ${SIZES.spacing.lg}`, borderBottom: `1px solid ${COLORS.border}` }}>
        {[1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: SIZES.borderRadius.sm,
              transition: 'background-color 0.2s'
            }}
            {...hoverHandlers}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {i === 1 ? (
                <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </div>
        ))}
      </div>

      {/* 搜索框 */}
      <div style={{ padding: `${SIZES.spacing.md} ${SIZES.spacing.lg}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: SIZES.spacing.sm,
          padding: `${SIZES.spacing.sm} ${SIZES.spacing.md}`,
          backgroundColor: COLORS.background,
          borderRadius: SIZES.borderRadius.sm,
          border: `1px solid ${COLORS.border}`
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM13 13l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
      <div style={{ padding: SIZES.spacing.sm, flex: 1, overflow: 'auto' }}>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SIZES.spacing.sm,
              padding: `${SIZES.spacing.sm} ${SIZES.spacing.md}`,
              cursor: 'pointer',
              borderRadius: SIZES.borderRadius.sm,
              backgroundColor: item.active ? '#e0e7ff' : 'transparent',
              color: item.active ? COLORS.primary : COLORS.textSecondary,
              marginBottom: SIZES.spacing.xs,
              ...(item.id === 'favorites' && { marginBottom: SIZES.spacing.lg })
            }}
            {...(!item.active && hoverHandlers)}
          >
            {item.id === 'yuanbao' ? (
              <div style={{
                width: '16px',
                height: '16px',
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.white,
                fontSize: '10px',
                fontWeight: 'bold'
              }}>元</div>
            ) : (
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
            )}
            <span style={{ fontSize: '14px', fontWeight: item.active ? 500 : 400 }}>{item.label}</span>
          </div>
        ))}

        {/* 分组 */}
        <div style={{ marginTop: SIZES.spacing.lg, marginBottom: SIZES.spacing.sm, padding: `0 ${SIZES.spacing.md}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: COLORS.textMuted, fontWeight: 500 }}>分组</span>
          <span style={{ cursor: 'pointer', fontSize: '12px', color: COLORS.textMuted }}>➕</span>
        </div>
        <div style={{ padding: `${SIZES.spacing.sm} ${SIZES.spacing.md}`, cursor: 'pointer', borderRadius: SIZES.borderRadius.sm, marginBottom: SIZES.spacing.lg }} {...hoverHandlers}>
          <span style={{ fontSize: '16px' }}>📄</span>
          <span style={{ fontSize: '14px', color: COLORS.textSecondary, marginLeft: SIZES.spacing.sm }}>分组示例</span>
        </div>

        {/* 聊天历史 */}
        <div style={{ marginTop: SIZES.spacing.lg, marginBottom: SIZES.spacing.sm, padding: `0 ${SIZES.spacing.md}` }}>
          <span style={{ fontSize: '12px', color: COLORS.textMuted }}>聊天</span>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: `${SIZES.spacing.sm} ${SIZES.spacing.md}`,
              fontSize: '14px',
              color: COLORS.textSecondary,
              cursor: 'pointer',
              borderRadius: SIZES.borderRadius.sm,
              marginBottom: SIZES.spacing.xs
            }}
            {...hoverHandlers}
          >
            💬 {`0112新对话 ${i + 1}`}
          </div>
        ))}
      </div>

      {/* 底部 */}
      <div style={{ padding: `${SIZES.spacing.md} ${SIZES.spacing.lg}`, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: SIZES.spacing.sm, cursor: 'pointer', color: COLORS.textSecondary, marginBottom: SIZES.spacing.sm, padding: `${SIZES.spacing.sm} ${SIZES.spacing.md}`, borderRadius: SIZES.borderRadius.sm }} {...hoverHandlers}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: '14px' }}>前往下载中心</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: SIZES.spacing.sm, padding: `${SIZES.spacing.sm} ${SIZES.spacing.md}`, cursor: 'pointer', borderRadius: SIZES.borderRadius.sm }} {...hoverHandlers}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: COLORS.disabled }}></div>
          <span style={{ fontSize: '14px', color: COLORS.textSecondary }}>用户名称</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
