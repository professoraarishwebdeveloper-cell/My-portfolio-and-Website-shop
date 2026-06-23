'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FloatingTextProps {
  children: ReactNode
  delay?: number
  duration?: number
  intensity?: number
  className?: string
}

export function FloatingText({ 
  children, 
  delay = 0, 
  duration = 6, 
  intensity = 20,
  className = ''
}: FloatingTextProps) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: [0, -intensity, 0], opacity: 1 }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
