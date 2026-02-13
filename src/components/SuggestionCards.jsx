import { SUGGESTION_CARDS, COLORS, SIZES } from '../constants'

/**
 * 建议卡片组件
 */
const SuggestionCards = ({ onCardClick }) => {
  const handleCardClick = (prompt) => {
    if (onCardClick) {
      onCardClick(prompt)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: SIZES.spacing.md,
      justifyContent: 'center',
      width: '100%'
    }}>
      {/* 促销卡片 */}
      <div style={{
        background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7a45 100%)',
        borderRadius: SIZES.borderRadius.md,
        padding: SIZES.spacing.lg,
        color: COLORS.white,
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
          padding: `${SIZES.spacing.xs} ${SIZES.spacing.sm}`,
          fontSize: '12px',
          borderRadius: `${SIZES.borderRadius.md} ${SIZES.borderRadius.md} 0 0`
        }}>元宝派红包 新春领不停</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: SIZES.spacing.xl }}>抢10亿红包!</div>
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

      {/* 其他建议卡片 */}
      {SUGGESTION_CARDS.map((card) => (
        <div
          key={card.id}
          style={{
            background: COLORS.background,
            border: `1px solid ${COLORS.border}`,
            borderRadius: SIZES.borderRadius.md,
            padding: `${SIZES.spacing.md} ${SIZES.spacing.lg}`,
            cursor: 'pointer',
            minWidth: card.type === 'download' ? '200px' : '144px',
            flex: '0 0 auto',
            transition: 'all 0.2s'
          }}
          onClick={() => handleCardClick(card.prompt)}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = COLORS.primary
            if (card.type === 'download') {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 102, 255, 0.1)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = COLORS.border
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {card.type === 'download' ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: SIZES.spacing.sm, marginBottom: SIZES.spacing.xs }}>
                <img src={card.image} alt={card.title} style={{ width: '16px', height: '16px' }} />
                <span style={{ fontSize: '14px', fontWeight: '500', color: COLORS.text }}>{card.title}</span>
                <span style={{ marginLeft: 'auto', color: COLORS.textSecondary }}>→</span>
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>{card.subtitle}</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '14px', fontWeight: '500', color: COLORS.text, marginBottom: SIZES.spacing.xs }}>{card.title}</div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>{card.subtitle}</div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default SuggestionCards
