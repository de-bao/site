<template>
  <div class="suggestion-cards">
    <div
      v-for="card in suggestionCards"
      :key="card.id"
      class="suggestion-card"
      @click="handleCardClick(card.prompt)"
      @mouseenter="handleEnter"
      @mouseleave="handleLeave"
    >
      <div class="card-title">{{ card.title }}</div>
      <div class="card-subtitle">{{ card.subtitle }}</div>
    </div>
  </div>
</template>

<script setup>
import { SUGGESTION_CARDS } from '../constants'

const suggestionCards = SUGGESTION_CARDS

const emit = defineEmits(['cardClick'])

const handleCardClick = (prompt) => {
  emit('cardClick', prompt)
}

const handleEnter = (e) => {
  e.currentTarget.style.borderColor = '#0066ff'
  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 102, 255, 0.1)'
}

const handleLeave = (e) => {
  e.currentTarget.style.borderColor = '#e5e7eb'
  e.currentTarget.style.boxShadow = 'none'
}
</script>

<style scoped>
.suggestion-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  width: 100%;
}

.suggestion-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  min-width: 144px;
  flex: 0 0 auto;
  transition: all 0.2s;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
}

.card-subtitle {
  font-size: 12px;
  color: #6b7280;
}
</style>
