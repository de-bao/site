import { useState, useCallback } from 'react'

/**
 * 拖拽上传Hook
 * @param {Function} onDrop - 文件拖放完成后的回调
 * @returns {Object} { isDragging, handlers }
 */
export const useDragAndDrop = (onDrop) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    if (onDrop) {
      onDrop(e.dataTransfer.files)
    }
  }, [onDrop])

  return {
    isDragging,
    handlers: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    }
  }
}
