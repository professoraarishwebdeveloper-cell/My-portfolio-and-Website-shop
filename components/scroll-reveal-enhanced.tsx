'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface ScrollRevealEnhancedProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  variant?: 'fade' | 'scale' | 'rotate' | 'blur'
}

const directionVariants = {
  up: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
}

const variantStyles = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  scale: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
  rotate: { initial: { opacity: 0, rotate: -5 }, animate: { opacity: 1, rotate: 0 } },
  blur: { initial: { opacity: 0, filter: 'blur(10px)' }, animate: { opacity: 1, filter: 'blur(0px)' } },
}

export function ScrollRevealEnhanced({
  children,
  delay = 0,
  direction = 'up',
  variant = 'fade',
}: ScrollRevealEnhancedProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const currentVariant = variant === 'fade' ? variantStyles.fade : variantStyles[variant]
  const directionVariant = directionVariants[direction]

  const combinedVariants = {
    initial: { ...currentVariant.initial, ...directionVariant.initial },
    animate: { ...currentVariant.animate, ...directionVariant.animate },
  }

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      variants={combinedVariants}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}
