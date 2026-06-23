'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'

interface CounterStatProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
}

export function CounterStat({ value, suffix = '', prefix = '', label, description }: CounterStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const duration = 2000
    const incrementTime = duration / end

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-5xl md:text-7xl font-display font-bold mb-2">
        <span className="text-gradient">{prefix}{count}{suffix}</span>
      </div>
      <div className="mb-1 text-sm font-medium text-[#DCE7F7] md:text-base">{label}</div>
      {description && <p className="text-xs font-medium text-[#B8C6DC]">{description}</p>}
    </motion.div>
  )
}
