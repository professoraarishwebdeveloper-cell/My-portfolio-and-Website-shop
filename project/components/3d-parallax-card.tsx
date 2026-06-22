'use client'

import { motion } from 'framer-motion'
import { use3DDepth } from '@/hooks/use3DDepth'
import { ReactNode } from 'react'

interface Card3DParallaxProps {
  children: ReactNode
  className?: string
  intensity?: number
  delay?: number
}

export function Card3DParallax({ children, className = '', intensity = 0.5, delay = 0 }: Card3DParallaxProps) {
  const depth = use3DDepth(intensity)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      style={{
        transform: `perspective(1200px) rotateX(${depth.rotateX}deg) rotateY(${depth.rotateY}deg) translateZ(${depth.intensity * 20}px)`,
        transformStyle: 'preserve-3d',
      }}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </motion.div>
  )
}
