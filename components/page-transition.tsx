'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const variants = {
    fadeOut: {
      opacity: 0,
      y: 20,
    },
    fadeIn: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <motion.div
      initial="fadeIn"
      animate="fadeIn"
      variants={variants}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
