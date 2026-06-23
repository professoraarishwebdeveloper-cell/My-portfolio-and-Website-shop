'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BloomEffectProps {
  children: ReactNode
  color?: 'accent' | 'glow' | 'aurora'
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
}

const colorMap = {
  accent: 'rgba(0, 212, 255, 0.3)',
  glow: 'rgba(124, 58, 237, 0.3)',
  aurora: 'rgba(236, 72, 153, 0.3)',
}

const intensityMap = {
  light: 20,
  medium: 40,
  strong: 60,
}

export function BloomEffect({ 
  children, 
  color = 'accent', 
  className = '',
  intensity = 'medium'
}: BloomEffectProps) {
  const blurRadius = intensityMap[intensity]

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        filter: `drop-shadow(0 0 ${blurRadius}px ${colorMap[color]})`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
