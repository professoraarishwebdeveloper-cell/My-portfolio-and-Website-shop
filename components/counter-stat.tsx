'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView, motion } from 'framer-motion'

interface CounterStatProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function CounterStat({ value, suffix = '', prefix = '', label, description }: CounterStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const target = Math.min(999, Math.max(0, Math.floor(Number(value) || 0)))

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    if (target === 0) {
      setCount(0)
      return
    }

    const duration = 1500
    const startTime = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const next = Math.min(Math.round(easeOutCubic(progress) * target), target)
      setCount(next)
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, target])

  const displayCount = Math.min(count, target)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 rounded-2xl border border-white/10 bg-[#0d1528] p-6 text-center shadow-2xl"
    >
      <div className="mb-2 text-5xl font-bold text-white drop-shadow-lg md:text-7xl">
        {prefix}{displayCount}{suffix}
      </div>
      <div className="text-sm font-semibold text-slate-200 md:text-base">{label}</div>
      {description && <p className="mt-1 text-xs font-medium text-slate-300">{description}</p>}
    </motion.div>
  )
}
