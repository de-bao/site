import { COLORS, SIZES } from '../constants'
import ModelSelector from './ModelSelector'

/**
 * 顶部栏组件
 */
const Header = ({ selectedModel, onModelChange }) => {
  return (
    <div style={{
      padding: `${SIZES.spacing.md} ${SIZES.spacing.xl}`,
      borderBottom: `1px solid ${COLORS.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 10
    }}>
      <ModelSelector selectedModel={selectedModel} onModelChange={onModelChange} />
      <button style={{
        background: COLORS.success,
        color: COLORS.white,
        border: 'none',
        padding: `${SIZES.spacing.sm} ${SIZES.spacing.lg}`,
        borderRadius: SIZES.borderRadius.sm,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: SIZES.spacing.xs,
        fontSize: '14px',
        fontWeight: 500,
        transition: 'background-color 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.success}
      >
        安装电脑版
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default Header
