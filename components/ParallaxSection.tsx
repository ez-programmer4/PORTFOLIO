'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = "",
  direction = 'up'
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(smoothProgress, [0, 1], [100 * speed, -100 * speed])
      case 'down':
        return useTransform(smoothProgress, [0, 1], [-100 * speed, 100 * speed])
      case 'left':
        return useTransform(smoothProgress, [0, 1], [100 * speed, -100 * speed])
      case 'right':
        return useTransform(smoothProgress, [0, 1], [-100 * speed, 100 * speed])
      default:
        return useTransform(smoothProgress, [0, 1], [100 * speed, -100 * speed])
    }
  }
  
  const transform = getTransform()
  
  const getMotionStyle = () => {
    if (direction === 'left' || direction === 'right') {
      return { x: transform }
    }
    return { y: transform }
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={getMotionStyle()}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}
