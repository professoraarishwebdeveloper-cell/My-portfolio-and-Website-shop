'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
  align?: 'center' | 'left'
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = 'center',
}: PageHeaderProps) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-20 mb-14 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-accent">{eyebrow}</p>
      )}
      <h1 className="text-4xl font-bold text-white drop-shadow-lg md:text-6xl lg:text-7xl">{title}</h1>
      {description && (
        <p className={`mt-5 text-lg font-medium leading-[1.8] text-slate-200 md:text-xl ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
      {children}
    </motion.div>
  )
}
