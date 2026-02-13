/**
 * 文件处理工具
 */

/**
 * 读取文件为Base64
 * @param {File} file - 文件对象
 * @returns {Promise<string>} Base64字符串
 */
export function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * 读取文件为文本
 * @param {File} file - 文件对象
 * @returns {Promise<string>} 文件文本内容
 */
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsText(file, 'UTF-8')
  })
}

/**
 * 获取文件类型
 * @param {File} file - 文件对象
 * @returns {string} 文件类型 ('image' | 'document' | 'other')
 */
export function getFileType(file) {
  if (file.type.startsWith('image/')) {
    return 'image'
  }
  if (file.type.includes('pdf') || 
      file.type.includes('document') || 
      file.type.includes('text') ||
      file.name.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|md)$/i)) {
    return 'document'
  }
  return 'other'
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的文件大小
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * 处理文件列表
 * @param {FileList} files - 文件列表
 * @returns {Promise<Array>} 处理后的文件信息数组
 */
export async function processFiles(files) {
  const fileArray = Array.from(files)
  const processedFiles = []
  
  for (const file of fileArray) {
    const fileType = getFileType(file)
    const fileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      fileType: fileType,
      lastModified: file.lastModified
    }
    
    // 如果是图片，读取为base64
    if (fileType === 'image') {
      try {
        fileInfo.data = await readFileAsBase64(file)
      } catch (error) {
        console.error('读取图片失败:', error)
        continue
      }
    } else if (fileType === 'document' && file.size < 1024 * 1024) {
      // 如果是文档且小于1MB，尝试读取文本内容
      try {
        fileInfo.text = await readFileAsText(file)
      } catch (error) {
        console.warn('读取文档内容失败:', error)
      }
    }
    
    processedFiles.push(fileInfo)
  }
  
  return processedFiles
}

/**
 * 创建文件输入元素
 * @param {string} accept - 接受的文件类型
 * @param {boolean} multiple - 是否支持多选
 * @returns {Promise<FileList>} 选择的文件列表
 */
export function selectFiles(accept = '*/*', multiple = true) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.multiple = multiple
    input.onchange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        resolve(e.target.files)
      } else {
        reject(new Error('未选择文件'))
      }
    }
    input.oncancel = () => {
      reject(new Error('取消选择'))
    }
    input.click()
  })
}
