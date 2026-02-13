/**
 * 本地存储服务 - 使用 localStorage 持久化聊天记录
 */

const STORAGE_KEY = 'chat_history'
const CURRENT_CHAT_KEY = 'current_chat_id'
const CHAT_COUNTER_KEY = 'chat_id_counter'

/**
 * 保存聊天记录到本地存储
 * @param {Map} chats - 聊天会话Map
 */
export function saveChatsToLocal(chats) {
  try {
    // 将Map转换为数组
    const chatsArray = Array.from(chats.values())
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatsArray))
  } catch (error) {
    console.error('保存聊天记录失败:', error)
    // 如果存储空间不足，尝试清理旧数据
    if (error.name === 'QuotaExceededError') {
      console.warn('存储空间不足，尝试清理旧数据')
      // 只保留最近的10个聊天
      const chatsArray = Array.from(chats.values())
      const recentChats = chatsArray.slice(-10)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentChats))
    }
  }
}

/**
 * 从本地存储加载聊天记录
 * @returns {Map} 聊天会话Map
 */
export function loadChatsFromLocal() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return new Map()
    
    const chatsArray = JSON.parse(data)
    // 将数组转换回Map
    const chats = new Map()
    chatsArray.forEach(chat => {
      chats.set(chat.id, chat)
    })
    return chats
  } catch (error) {
    console.error('加载聊天记录失败:', error)
    return new Map()
  }
}

/**
 * 保存当前聊天ID
 * @param {number} chatId - 当前聊天ID
 */
export function saveCurrentChatId(chatId) {
  try {
    localStorage.setItem(CURRENT_CHAT_KEY, String(chatId))
  } catch (error) {
    console.error('保存当前聊天ID失败:', error)
  }
}

/**
 * 加载当前聊天ID
 * @returns {number|null} 当前聊天ID
 */
export function loadCurrentChatId() {
  try {
    const chatId = localStorage.getItem(CURRENT_CHAT_KEY)
    return chatId ? Number(chatId) : null
  } catch (error) {
    console.error('加载当前聊天ID失败:', error)
    return null
  }
}

/**
 * 保存聊天ID计数器
 * @param {number} counter - 聊天ID计数器
 */
export function saveChatIdCounter(counter) {
  try {
    localStorage.setItem(CHAT_COUNTER_KEY, String(counter))
  } catch (error) {
    console.error('保存聊天ID计数器失败:', error)
  }
}

/**
 * 加载聊天ID计数器
 * @returns {number} 聊天ID计数器
 */
export function loadChatIdCounter() {
  try {
    const counter = localStorage.getItem(CHAT_COUNTER_KEY)
    return counter ? Number(counter) : 1
  } catch (error) {
    console.error('加载聊天ID计数器失败:', error)
    return 1
  }
}

/**
 * 清除所有聊天记录
 */
export function clearAllChats() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(CURRENT_CHAT_KEY)
    localStorage.removeItem(CHAT_COUNTER_KEY)
  } catch (error) {
    console.error('清除聊天记录失败:', error)
  }
}
