'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ScrollTree() {
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const trunk = useTransform(scrollYProgress, [0, 0.55, 1], [0, 1, 1])
  const canopy = useTransform(scrollYProgress, [0.2, 0.7, 1], [0, 0.7, 1])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none relative h-[420px] w-[320px] select-none"
      style={{ perspective: 1200 }}
      whileHover={{ rotateX: 4, rotateY: -4 }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
    >
      <svg viewBox="0 0 320 420" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="treeStroke" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5EAEF9" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#4B45F4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#A53FB0" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <motion.path
          d="M160 372 C160 320 158 270 160 226 C161 182 158 142 160 92"
          fill="none"
          stroke="url(#treeStroke)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            pathLength: trunk,
            filter: 'drop-shadow(0 0 16px rgba(34, 211, 238, 0.14))',
          }}
        />

        <motion.path
          d="M160 300 C140 286 120 266 104 244"
          fill="none"
          stroke="url(#treeStroke)"
          strokeWidth="2.4"
          strokeLinecap="round"
          style={{ pathLength: canopy, opacity: canopy }}
        />
        <motion.path
          d="M160 264 C178 244 199 227 224 210"
          fill="none"
          stroke="url(#treeStroke)"
          strokeWidth="2.4"
          strokeLinecap="round"
          style={{ pathLength: canopy, opacity: canopy }}
        />
        <motion.path
          d="M160 230 C145 210 132 188 122 162"
          fill="none"
          stroke="url(#treeStroke)"
          strokeWidth="2.2"
          strokeLinecap="round"
          style={{ pathLength: canopy, opacity: canopy }}
        />
        <motion.path
          d="M160 204 C174 186 188 170 204 154"
          fill="none"
          stroke="url(#treeStroke)"
          strokeWidth="2.2"
          strokeLinecap="round"
          style={{ pathLength: canopy, opacity: canopy }}
        />
        <motion.path
          d="M160 168 C150 148 142 128 136 104"
          fill="none"
          stroke="url(#treeStroke)"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ pathLength: canopy, opacity: canopy }}
        />
        <motion.path
          d="M160 170 C171 150 184 132 198 116"
          fill="none"
          stroke="url(#treeStroke)"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ pathLength: canopy, opacity: canopy }}
        />

        <motion.circle
          cx="160"
          cy="90"
          r="22"
          fill="none"
          stroke="#F8FAFC"
          strokeOpacity="0.16"
          strokeWidth="1.5"
          style={{ scale: canopy, opacity: canopy }}
        />
        <motion.circle
          cx="160"
          cy="90"
          r="8"
          fill="#F8FAFC"
          fillOpacity="0.14"
          style={{ scale: canopy, opacity: canopy }}
        />
      </svg>
    </motion.div>
  )
}
