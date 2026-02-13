import { SUPPORTED_FILE_TYPES, COLORS, SIZES } from '../constants'

/**
 * 拖拽覆盖层组件
 */
const DragOverlay = ({ isVisible }) => {
  if (!isVisible) return null

  return (
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
        background: COLORS.white,
        borderRadius: SIZES.borderRadius.lg,
        padding: SIZES.spacing.xxl,
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <div style={{ fontSize: '48px', marginBottom: SIZES.spacing.lg }}>📁</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: SIZES.spacing.sm }}>文件拖动到此处即可上传</div>
        <div style={{ fontSize: '14px', color: COLORS.textSecondary }}>
          支持文件格式：{SUPPORTED_FILE_TYPES.join('、')}
        </div>
      </div>
    </div>
  )
}

export default DragOverlay
