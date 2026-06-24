'use client'

import { motion } from 'framer-motion'

interface MeshGradientBgProps {
  variant?: 'warm' | 'cool' | 'purple' | 'vibrant'
  intensity?: 'low' | 'medium' | 'high'
}

const gradientConfigs = {
  warm: { stops: ['#f5eadb', '#d8c6ae', '#8d7d6b', '#f5eadb'] },
  cool: { stops: ['#e0f7fa', '#80deea', '#4dd0e1', '#e0f7fa'] },
  purple: { stops: ['#e1bee7', '#ce93d8', '#ba68c8', '#e1bee7'] },
  vibrant: { stops: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ff6b6b'] },
}

const intensityOpacity = {
  low: 0.15,
  medium: 0.3,
  high: 0.5,
}

export function MeshGradientBg({
  variant = 'warm',
  intensity = 'medium',
}: MeshGradientBgProps) {
  const config = gradientConfigs[variant]
  const opacity = intensityOpacity[intensity]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>
        <circle cx="100" cy="100" r="100" fill={config.stops[0]} opacity={opacity} filter="url(#blur)" />
        <circle cx="300" cy="150" r="120" fill={config.stops[1]} opacity={opacity} filter="url(#blur)" />
        <circle cx="200" cy="300" r="110" fill={config.stops[2]} opacity={opacity} filter="url(#blur)" />
      </motion.svg>
    </div>
  )
}
