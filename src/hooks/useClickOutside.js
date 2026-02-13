import { useEffect, useRef } from 'react'

/**
 * 检测点击外部区域的Hook
 * @param {Function} handler - 点击外部时执行的回调
 * @returns {Object} ref - 需要绑定到目标元素的ref
 */
export const useClickOutside = (handler) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handler])

  return ref
}
