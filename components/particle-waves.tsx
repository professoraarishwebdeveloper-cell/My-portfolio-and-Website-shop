'use client'

import React, { useEffect, useRef } from 'react'

interface ParticleWavesProps {
  particleCount?: number
  speed?: number
  size?: number
  opacity?: number
  colors?: string[]
  waveAmplitude?: number
  waveFrequency?: number
  className?: string
}

export function ParticleWaves({
  particleCount = 100,
  speed = 1,
  size = 3,
  opacity = 0.6,
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
  waveAmplitude = 50,
  waveFrequency = 0.02,
  className = '',
}: ParticleWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    angle: number
  }>>([])
  const timeRef = useRef(0)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * size + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      timeRef.current += 0.01

      particlesRef.current.forEach((particle) => {
        // Wave motion
        const wave = Math.sin(timeRef.current * waveFrequency + particle.angle) * waveAmplitude
        particle.x += particle.vx + Math.cos(particle.angle) * wave * 0.01
        particle.y += particle.vy + Math.sin(particle.angle) * wave * 0.01

        // Wrap around edges
        if (particle.x < -10) particle.x = canvas.offsetWidth + 10
        if (particle.x > canvas.offsetWidth + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.offsetHeight + 10
        if (particle.y > canvas.offsetHeight + 10) particle.y = -10

        // Draw particle
        ctx.fillStyle = particle.color
        ctx.globalAlpha = opacity
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particleCount, speed, size, opacity, colors, waveAmplitude, waveFrequency])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  )
}
