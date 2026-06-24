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
  const animationVariants = animate
    ? {
        initial: { backgroundPosition: '0% center' },
        animate: { backgroundPosition: ['0% center', '100% center', '0% center'] },
      }
    : {}

  return (
    <motion.div
      className={`${className} bg-gradient-to-r from-[#f5eadb] via-[#d8c6ae] to-[#8d7d6b] bg-clip-text text-transparent bg-size-200`}
      initial="initial"
      animate={animate ? 'animate' : undefined}
      variants={animationVariants}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={animate ? { backgroundSize: '200% 200%' } : undefined}
    >
      {children}
    </motion.div>
  )
}
