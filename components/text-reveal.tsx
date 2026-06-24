'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface TextRevealProps {
  children: ReactNode
  className?: string
  staggerContainer?: boolean
  delay?: number
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      mass: 0.2,
    },
  },
}

export function TextReveal({
  children,
  className = '',
  staggerContainer = true,
  delay = 0,
}: TextRevealProps) {
  const text = typeof children === 'string' ? children : ''

  if (!staggerContainer) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={itemVariants} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
