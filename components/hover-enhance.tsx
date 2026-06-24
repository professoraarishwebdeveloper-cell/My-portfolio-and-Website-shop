'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverEnhanceProps extends MotionProps {
  children: ReactNode
  className?: string
  scaleOnHover?: number
  shadowOnHover?: string
  glowColor?: string
}

export function HoverEnhance({
  children,
  className = '',
  scaleOnHover = 1.02,
  shadowOnHover = 'lg',
  glowColor = 'rgba(245, 234, 219, 0.2)',
  ...props
}: HoverEnhanceProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: scaleOnHover,
        boxShadow: `0 0 40px ${glowColor}`,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
