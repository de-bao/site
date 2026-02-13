import { useState } from 'react'
import { MODELS, MODEL_CONFIG, COLORS, SIZES } from '../constants'
import { useClickOutside } from '../hooks/useClickOutside'

/**
 * 模型选择器组件
 */
const ModelSelector = ({ selectedModel, onModelChange }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useClickOutside(() => setShowDropdown(false))

  const handleModelSelect = (model) => {
    onModelChange(model)
    setShowDropdown(false)
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: SIZES.spacing.xs,
          padding: `${SIZES.spacing.xs} ${SIZES.spacing.sm}`,
          borderRadius: SIZES.borderRadius.sm,
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.hover}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        {selectedModel}
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          backgroundColor: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: SIZES.borderRadius.md,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          minWidth: '200px',
          padding: `${SIZES.spacing.sm} 0`,
          marginTop: SIZES.spacing.sm,
          zIndex: 1000
        }}>
          {Object.values(MODELS).map((model) => {
            const config = MODEL_CONFIG[model]
            const isSelected = selectedModel === model
            return (
              <div
                key={model}
                onClick={() => handleModelSelect(model)}
                style={{
                  padding: `${SIZES.spacing.sm} ${SIZES.spacing.lg}`,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: isSelected ? COLORS.hover : 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.hover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isSelected ? COLORS.hover : 'transparent'}
              >
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{config.name}</div>
                  <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>{config.description}</div>
                </div>
                {isSelected && <span style={{ color: COLORS.primary }}>✓</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ModelSelector
