'use client'

import { motion } from 'framer-motion'
import { use3DDepth } from '@/hooks/use3DDepth'
import { ReactNode } from 'react'

interface SkillNode3DProps {
  icon: React.ElementType
  title: string
  description: string
  skills: string[]
  color: 'accent' | 'glow' | 'aurora'
  delay?: number
}

const colorMap = {
  accent: {
    bg: 'from-cosmic-accent/10 to-cosmic-accent/5',
    border: 'border-cosmic-accent/30',
    icon: 'text-cosmic-accent',
    glow: 'shadow-cosmic-accent-glow',
  },
  glow: {
    bg: 'from-cosmic-glow/10 to-cosmic-glow/5',
    border: 'border-cosmic-glow/30',
    icon: 'text-cosmic-glow',
    glow: 'shadow-cosmic-glow-glow',
  },
  aurora: {
    bg: 'from-cosmic-aurora-end/10 to-cosmic-aurora-end/5',
    border: 'border-cosmic-aurora-end/30',
    icon: 'text-cosmic-aurora-end',
    glow: 'shadow-cosmic-aurora-glow',
  },
}

export function SkillNode3D({
  icon: Icon,
  title,
  description,
  skills,
  color,
  delay = 0,
}: SkillNode3DProps) {
  const depth = use3DDepth(0.3)
  const colors = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true, margin: '-50px' }}
      style={{
        transform: `perspective(1200px) rotateX(${depth.rotateX * 0.5}deg) rotateY(${depth.rotateY * 0.5}deg) translateZ(${depth.intensity * 10}px)`,
        transformStyle: 'preserve-3d',
      }}
      className="h-full"
    >
      <div
        className={`
          h-full relative overflow-hidden rounded-2xl p-8
          bg-gradient-to-br ${colors.bg}
          border ${colors.border}
          backdrop-blur-md
          group
          hover:border-opacity-100 transition-all duration-300
        `}
      >
        {/* Animated gradient overlay on hover */}
        <div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
            bg-gradient-to-br from-cosmic-accent via-cosmic-glow to-cosmic-aurora-end
          `}
        />

        {/* Glow effect */}
        <motion.div
          animate={{ boxShadow: ['0 0 20px rgba(0, 212, 255, 0.1)', '0 0 40px rgba(0, 212, 255, 0.2)', '0 0 20px rgba(0, 212, 255, 0.1)'] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center mb-6`}
          >
            <Icon className={`w-8 h-8 ${colors.icon}`} />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-cosmic-accent transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm mb-6 leading-relaxed">{description}</p>

          {/* Skills tags */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: (delay || 0) + i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`
                  px-3 py-1 text-xs rounded-full
                  bg-white/5 border ${colors.border}
                  text-white/70 hover:text-white hover:border-opacity-100
                  transition-all cursor-default
                `}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
