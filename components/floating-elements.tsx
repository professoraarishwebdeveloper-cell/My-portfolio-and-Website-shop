'use client'

import { motion } from 'framer-motion'

interface FloatingElementsProps {
  count?: number
  variant?: 'subtle' | 'dramatic' | 'gentle'
}

const variants = {
  subtle: {
    y: [0, -10, 0],
    opacity: [0.3, 0.6, 0.3],
    duration: 6,
  },
  dramatic: {
    y: [0, -30, 0],
    opacity: [0.2, 0.8, 0.2],
    duration: 8,
  },
  gentle: {
    y: [0, -5, 0],
    opacity: [0.4, 0.7, 0.4],
    duration: 5,
  },
}

function FloatingDot({ delay, variant = 'subtle' }: { delay: number; variant?: keyof typeof variants }) {
  const config = variants[variant]

  return (
    <motion.div
      className="absolute w-2 h-2 bg-gradient-to-r from-[#d8c6ae] to-[#f5eadb] rounded-full blur-sm"
      animate={{
        y: config.y,
        opacity: config.opacity,
      }}
      transition={{
        duration: config.duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function FloatingElements({ count = 8, variant = 'subtle' }: FloatingElementsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <FloatingDot
          key={i}
          delay={i * 0.5}
          variant={variant}
        />
      ))}
    </div>
  )
}
