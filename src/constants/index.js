/**
 * 应用常量定义
 */

// 模型配置
export const MODELS = {
  HUNYUAN: 'Hunyuan',
  DEEPSEEK: 'DeepSeek'
}

export const MODEL_CONFIG = {
  [MODELS.HUNYUAN]: {
    name: 'Hunyuan',
    description: '全能处理，深度思考'
  },
  [MODELS.DEEPSEEK]: {
    name: 'DeepSeek',
    description: '适合深度思考'
  }
}

// 颜色常量
export const COLORS = {
  primary: '#0066ff',
  primaryDark: '#0052cc',
  success: '#22c55e',
  successHover: '#16a34a',
  background: '#ffffff',
  backgroundLight: '#f5f5f5',
  backgroundGray: '#f9fafb',
  border: '#e5e7eb',
  text: '#1f2937',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  hover: '#f3f4f6',
  hoverDark: '#e5e7eb',
  disabled: '#d1d5db',
  white: '#ffffff',
  black: '#000000'
}

// 尺寸常量
export const SIZES = {
  sidebarWidth: '260px',
  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '12px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '40px'
  }
}

// 建议卡片配置
export const SUGGESTION_CARDS = [
  {
    id: 'download',
    title: '下载元宝电脑版',
    subtitle: '快速启动，划词问答，多格式全能处理',
    type: 'download',
    image: '/yuanbao_files/NjZlZDhiNDQtM2Q2Ni00MmViLTgzZDQtM2RjM2RjZjFlZmVh.png',
    prompt: '下载元宝电脑版'
  },
  {
    id: 'painting',
    title: '国画创作',
    subtitle: '工笔荷花',
    type: 'normal',
    prompt: '国画创作'
  },
  {
    id: 'image',
    title: '识图求知',
    subtitle: '结合财报数据计算毛利率',
    type: 'normal',
    prompt: '识图求知'
  },
  {
    id: 'discovery',
    title: '好奇发现',
    subtitle: '如果地球没有风',
    type: 'normal',
    prompt: '好奇发现'
  }
]

// 导航项配置
export const NAV_ITEMS = [
  { id: 'yuanbao', label: '元宝', icon: '元', active: true },
  { id: 'gallery', label: '灵感图库', icon: '🏞️' },
  { id: 'apps', label: '全部应用', icon: '🗂️' },
  { id: 'favorites', label: '全部收藏', icon: '⭐' }
]

// 文件类型支持
export const SUPPORTED_FILE_TYPES = [
  'jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif',
  'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'doc', 'docx',
  'txt', 'csv', 'text', 'bat', 'c', 'cpp', 'cs', 'css',
  'go', 'h', 'hpp', 'ini', 'java', 'js', 'json', 'log',
  'lua', 'md', 'php', 'pl', 'py', 'rb', 'sh', 'sql',
  'swift', 'tex', 'toml', 'vue', 'yaml', 'yml', 'xml', 'html'
]
