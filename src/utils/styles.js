/**
 * 样式工具函数
 */

import { COLORS, SIZES } from '../constants'

/**
 * 创建基础按钮样式
 */
export const createButtonStyle = (variant = 'default', disabled = false) => {
  const baseStyle = {
    border: 'none',
    borderRadius: SIZES.borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 500
  }

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        background: disabled ? COLORS.disabled : COLORS.primary,
        color: COLORS.white
      }
    case 'success':
      return {
        ...baseStyle,
        background: disabled ? COLORS.disabled : COLORS.success,
        color: COLORS.white
      }
    case 'ghost':
      return {
        ...baseStyle,
        background: 'transparent',
        color: COLORS.textSecondary
      }
    default:
      return baseStyle
  }
}

/**
 * 创建卡片样式
 */
export const createCardStyle = (hover = false) => ({
  background: COLORS.background,
  border: `1px solid ${COLORS.border}`,
  borderRadius: SIZES.borderRadius.md,
  padding: `${SIZES.spacing.md} ${SIZES.spacing.lg}`,
  cursor: 'pointer',
  transition: 'all 0.2s',
  ...(hover && {
    '&:hover': {
      borderColor: COLORS.primary
    }
  })
})

/**
 * 创建输入框样式
 */
export const createInputStyle = () => ({
  border: 'none',
  background: 'transparent',
  fontSize: '14px',
  fontFamily: 'inherit',
  outline: 'none',
  color: COLORS.text,
  lineHeight: '1.5',
  width: '100%'
})

/**
 * 创建hover效果处理器
 */
export const createHoverHandlers = (hoverColor = COLORS.hover) => ({
  onMouseEnter: (e) => {
    e.currentTarget.style.backgroundColor = hoverColor
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.backgroundColor = 'transparent'
  }
})

/**
 * 创建容器样式
 */
export const createContainerStyle = (direction = 'row') => ({
  display: 'flex',
  flexDirection: direction,
  alignItems: 'center',
  gap: SIZES.spacing.md
})
