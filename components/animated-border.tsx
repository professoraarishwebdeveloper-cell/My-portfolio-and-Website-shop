'use client'

import React from 'react'

interface AnimatedBorderProps {
  children: React.ReactNode
  color?: string
  speed?: number
  borderWidth?: number
  borderRadius?: number
  className?: string
}

export function AnimatedBorder({
  children,
  color = '#4ecdc4',
  speed = 3,
  borderWidth = 2,
  borderRadius = 12,
  className = '',
}: AnimatedBorderProps) {
  const animationId = `border-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={className}>
      <style>{`
        @keyframes ${animationId} {
          0% { border-color: ${color}; box-shadow: 0 0 10px ${color}40; }
          50% { border-color: ${color}80; box-shadow: 0 0 20px ${color}80; }
          100% { border-color: ${color}; box-shadow: 0 0 10px ${color}40; }
        }
        .animated-border-${animationId} {
          border: ${borderWidth}px solid ${color};
          border-radius: ${borderRadius}px;
          animation: ${animationId} ${speed}s ease-in-out infinite;
          position: relative;
        }
      `}</style>
      <div className={`animated-border-${animationId}`}>
        {children}
      </div>
    </div>
  )
}
