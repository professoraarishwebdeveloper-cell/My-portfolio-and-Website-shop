'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface CounterAnimatedProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function CounterAnimated({
  from,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
}: CounterAnimatedProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = (currentTime - startTime) / 1000

      if (elapsed < duration) {
        const progress = Math.min(elapsed / duration, 1)
        setCount(Math.floor(from + (to - from) * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(to)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, from, to, duration])

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
      {prefix}
      {count}
      {suffix}
    </motion.div>
  )
}
