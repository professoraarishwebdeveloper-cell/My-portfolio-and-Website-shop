'use client'

import { motion } from 'framer-motion'

interface ShimmerEffectProps {
  className?: string
  duration?: number
}

export function ShimmerEffect({ className = '', duration = 3 }: ShimmerEffectProps) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        backgroundSize: '200% 100%',
        backgroundPosition: '200% 0',
      }}
      animate={{
        backgroundPosition: ['-200% 0', '200% 0'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      aria-hidden="true"
    />
  )
}
