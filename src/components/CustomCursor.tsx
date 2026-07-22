import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'IMG' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.group') ||
        target.closest('div[class*="aspect"]') ||
        target.classList.contains('interactive') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="hidden md:block pointer-events-none z-[9999] fixed inset-0 overflow-hidden">
      {/* 1. Center Dot in System Dark Crimson #761D19 */}
      <motion.div
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[10000] ${
          isHovered
            ? 'bg-[#990000] shadow-[0_0_8px_rgba(153,0,0,0.5)]'
            : 'bg-[#761D19]'
        }`}
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1500,
          damping: 50,
          mass: 0.1,
        }}
      />

      {/* 2. Soft Ring Follower in System Dark Crimson #761D19 */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] ${
          isHovered
            ? 'border-2 border-[#990000] bg-[#761D19]/25 shadow-[0_0_12px_rgba(118,29,25,0.3)]'
            : 'border border-[#761D19]/80 bg-[#761D19]/10'
        }`}
        animate={{
          x: mousePosition.x - (isHovered ? 26 : 14),
          y: mousePosition.y - (isHovered ? 26 : 14),
          width: isHovered ? 52 : 28,
          height: isHovered ? 52 : 28,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 26,
          mass: 0.35,
        }}
      />
    </div>
  )
}
