'use client'

import React from 'react'

interface GlowTextProps {
  children: React.ReactNode
  color?: string
  glowColor?: string
  intensity?: number
  speed?: number
  className?: string
}

export function GlowText({
  children,
  color = '#ffffff',
  glowColor = '#4ecdc4',
  intensity = 1,
  speed = 3,
  className = '',
}: GlowTextProps) {
  const animationId = `glow-text-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={className}>
      <style>{`
        @keyframes ${animationId} {
          0%, 100% {
            text-shadow: 0 0 ${10 * intensity}px ${glowColor},
                        0 0 ${20 * intensity}px ${glowColor},
                        0 0 ${30 * intensity}px ${glowColor}80;
            color: ${color};
          }
          50% {
            text-shadow: 0 0 ${20 * intensity}px ${glowColor},
                        0 0 ${40 * intensity}px ${glowColor},
                        0 0 ${60 * intensity}px ${glowColor}60;
            color: ${color}dd;
          }
        }
        .glow-text-${animationId} {
          animation: ${animationId} ${speed}s ease-in-out infinite;
        }
      `}</style>
      <span className={`glow-text-${animationId}`}>{children}</span>
    </div>
  )
}
