'use client'

import React from 'react'

interface GradientOrbProps {
  colors?: string[]
  size?: number
  speed?: number
  blur?: number
  intensity?: number
  className?: string
}

export function GradientOrb({
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'],
  size = 400,
  speed = 20,
  blur = 120,
  intensity = 0.8,
  className = '',
}: GradientOrbProps) {
  const gradientId = `gradient-orb-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ filter: `blur(${blur}px)` }}
        viewBox="0 0 1200 1200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            {colors.map((color, i) => (
              <stop
                key={i}
                offset={`${(i / (colors.length - 1)) * 100}%`}
                stopColor={color}
                stopOpacity={intensity}
              />
            ))}
          </radialGradient>
          <style>{`
            @keyframes orbFloat {
              0%, 100% { transform: translate(0, 0); }
              33% { transform: translate(100px, -100px); }
              66% { transform: translate(-80px, 120px); }
            }
            .orb-circle {
              animation: orbFloat ${speed}s ease-in-out infinite;
            }
          `}</style>
        </defs>
        <circle
          className="orb-circle"
          cx="600"
          cy="600"
          r={size / 2}
          fill={`url(#${gradientId})`}
        />
      </svg>
    </div>
  )
}
