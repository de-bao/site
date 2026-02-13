<template>
  <div :class="['sidebar', { collapsed: collapsed }]">
    <!-- 顶部按钮 -->
    <div class="sidebar-header">
      <div
        class="header-button"
        @click="$emit('toggle')"
        @mouseenter="handleHover"
        @mouseleave="handleLeave"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 5H17M3 10H17M3 15H17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div
        v-if="!collapsed"
        class="header-button"
        @mouseenter="handleHover"
        @mouseleave="handleLeave"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 4V16M4 10H16"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>

    <!-- 搜索框 -->
    <div v-if="!collapsed" class="sidebar-search">
      <div class="search-box">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM13 13l-3-3"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <input type="text" placeholder="Q 搜索" class="search-input" />
      </div>
    </div>

    <!-- 导航项 -->
    <div v-if="!collapsed" class="sidebar-content">
        <div
          v-for="item in navItems"
          :key="item.id"
          :class="['nav-item', { active: item.active }]"
          @mouseenter="!item.active && handleHover($event)"
          @mouseleave="!item.active && handleLeave($event)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span :class="['nav-label', { 'font-medium': item.active }]">{{ item.label }}</span>
        </div>

      <!-- 分组 -->
      <div class="group-header">
        <span class="group-title">分组</span>
        <span class="group-add">➕</span>
      </div>
      <div class="group-item" @mouseenter="handleHover" @mouseleave="handleLeave">
        <span class="nav-icon">📄</span>
        <span class="nav-label">分组示例</span>
      </div>
    </div>

    <!-- 底部 -->
    <div v-if="!collapsed" class="sidebar-footer">
      <div class="footer-item" @mouseenter="handleHover" @mouseleave="handleLeave">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2V14M2 8H14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span>前往下载中心</span>
      </div>
      <div ref="userDropdownRef" class="user-dropdown">
        <div class="footer-user" @click="showUserDropdown = !showUserDropdown" @mouseenter="handleHover" @mouseleave="handleLeave">
          <div class="user-avatar"></div>
          <span>用户名称</span>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M3.5 5.00024L6.5 8.00024L9.5 5.00024"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div v-if="showUserDropdown" class="user-dropdown-menu">
          <div class="user-dropdown-item" @click="showUserDropdown = false" @mouseenter="handleItemHover" @mouseleave="handleItemLeave">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2L10 6L14 7L10 8L8 12L6 8L2 7L6 6L8 2Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>设置</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NAV_ITEMS } from '../constants'
import { useClickOutside } from '../composables/useClickOutside'

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])

const navItems = NAV_ITEMS
const showUserDropdown = ref(false)

// 点击外部关闭用户下拉菜单
const userDropdownRef = useClickOutside(() => {
  showUserDropdown.value = false
})

const handleHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleLeave = (e) => {
  e.currentTarget.style.backgroundColor = 'transparent'
}

const handleItemHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f3f4f6'
}

const handleItemLeave = (e) => {
  e.currentTarget.style.backgroundColor = 'transparent'
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  background-color: #f5f5f5;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.header-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.sidebar-search {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  background: transparent;
}

.sidebar-content {
  padding: 8px;
  flex: 1;
  overflow: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 4px;
}

.nav-item.active {
  background-color: #e0e7ff;
  color: #0066ff;
}

.nav-item:not(.active) {
  color: #6b7280;
}

.nav-item:not(.active):last-of-type {
  margin-bottom: 16px;
}


.nav-icon {
  font-size: 16px;
}

.nav-label {
  font-size: 14px;
}

.font-medium {
  font-weight: 500;
}

.group-header {
  margin-top: 16px;
  margin-bottom: 8px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.group-title {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
}

.group-add {
  cursor: pointer;
  font-size: 12px;
  color: #9ca3af;
}

.group-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}


.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #6b7280;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 6px;
}

.user-dropdown {
  position: relative;
}

.footer-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  width: 100%;
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #d1d5db;
}

.footer-user span {
  font-size: 14px;
  color: #6b7280;
  flex: 1;
}

.user-dropdown-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
}

.user-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #1f2937;
  transition: background-color 0.2s;
}

.user-dropdown-item svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}
</style>
