'use client'

import { motion } from 'framer-motion'
import { use3DDepth } from '@/hooks/use3DDepth'
import { ReactNode } from 'react'

interface TimelineNode3DProps {
  year: string
  title: string
  description: string
  details: string[]
  isLast?: boolean
  index?: number
}

export function TimelineNode3D({
  year,
  title,
  description,
  details,
  isLast = false,
  index = 0,
}: TimelineNode3DProps) {
  const depth = use3DDepth(0.4)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true, margin: '-50px' }}
      className="mb-12 relative"
    >
      {/* Timeline dot with 3D effect */}
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          {/* Animated node */}
          <motion.div
            style={{
              transform: `perspective(1000px) rotateX(${depth.rotateX * 0.3}deg) rotateY(${depth.rotateY * 0.3}deg)`,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.2 }}
            className="relative"
          >
            {/* Outer glow ring */}
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 20px 5px rgba(0, 212, 255, 0.2)',
                  '0 0 40px 10px rgba(0, 212, 255, 0.4)',
                  '0 0 20px 5px rgba(0, 212, 255, 0.2)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />

            {/* Node circle */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cosmic-accent to-cosmic-glow flex items-center justify-center border-2 border-cosmic-void relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 rounded-full bg-cosmic-void"
              />
            </div>
          </motion.div>

          {/* Connecting line */}
          {!isLast && (
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="w-1 h-20 bg-gradient-to-b from-cosmic-accent/50 to-cosmic-glow/10 mt-2 origin-top"
            />
          )}
        </div>

        {/* Content card with 3D parallax */}
        <motion.div
          style={{
            transform: `perspective(1200px) rotateX(${depth.rotateX * 0.4}deg) rotateY(${depth.rotateY * 0.4}deg) translateZ(${depth.intensity * 15}px)`,
            transformStyle: 'preserve-3d',
          }}
          className="flex-1 pt-2"
        >
          <div
            className="
              glass-card p-8 group
              bg-gradient-to-br from-cosmic-deep/50 to-cosmic-void/50
              border border-white/10 hover:border-cosmic-accent/30
              transition-all duration-300
              relative overflow-hidden
            "
          >
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cosmic-accent/5 via-transparent to-cosmic-glow/5 pointer-events-none"
            />

            <div className="relative z-10">
              {/* Year badge */}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-cosmic-accent/20 to-cosmic-glow/20 border border-cosmic-accent/30 text-cosmic-accent text-xs font-semibold mb-3"
              >
                {year}
              </motion.span>

              {/* Title */}
              <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-cosmic-accent transition-colors">
                {title}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm mb-4">{description}</p>

              {/* Details list */}
              <ul className="space-y-2">
                {details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index || 0) * 0.1 + i * 0.05 }}
                    viewport={{ once: true }}
                    className="text-white/60 text-sm flex gap-2"
                  >
                    <span className="text-cosmic-accent mt-0.5">•</span>
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
