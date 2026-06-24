'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GradientTextAnimatedProps {
  children: ReactNode
  className?: string
  animate?: boolean
}

export function GradientTextAnimated({
  children,
  className = '',
  animate = true,
}: GradientTextAnimatedProps) {
  return (
    <motion.div
      className={`${className} bg-gradient-to-r from-[#f5eadb] via-[#d8c6ae] to-[#8d7d6b] bg-clip-text text-transparent`}
      animate={
        animate
          ? {
              opacity: [1, 0.8, 1],
            }
          : {}
      }
      transition={
        animate
          ? {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : {}
      }
    >
      {children}
    </motion.div>
  )
}
