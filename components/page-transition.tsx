'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [displayLocation, setDisplayLocation] = useState(pathname)
  const [transitionStage, setTransitionStage] = useState<'fadeOut' | 'fadeIn'>('fadeIn')

  useEffect(() => {
    if (pathname !== displayLocation) {
      setTransitionStage('fadeOut')
    }
  }, [pathname, displayLocation])

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

  const handleAnimationComplete = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayLocation(pathname)
      setTransitionStage('fadeIn')
    }
  }

  return (
    <motion.div
      initial="fadeIn"
      animate={transitionStage}
      variants={variants}
      onAnimationComplete={handleAnimationComplete}
      transition={
        transitionStage === 'fadeOut'
          ? { duration: 0.4, ease: 'easeInOut' }
          : { duration: 0.6, ease: 'easeOut' }
      }
      key={displayLocation}
    >
      {children}
    </motion.div>
  )
}
