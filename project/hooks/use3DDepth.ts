'use client'

import { useEffect, useState, useRef } from 'react'

interface DepthPosition {
  x: number
  y: number
  rotateX: number
  rotateY: number
  intensity: number
}

/**
 * Custom hook for managing 3D depth interactions
 * Tracks mouse position and device orientation for parallax effects
 * Returns normalized depth values for 3D transforms
 */
export function use3DDepth(intensity: number = 0.5) {
  const [depth, setDepth] = useState<DepthPosition>({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    intensity: 0,
  })

  const mouseRef = useRef({ x: 0, y: 0 })
  const throttleRef = useRef(false)

  useEffect(() => {
    // Mouse tracking for desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleRef.current) return

      throttleRef.current = true
      requestAnimationFrame(() => {
        mouseRef.current = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        }

        setDepth({
          x: mouseRef.current.x * intensity * 10,
          y: mouseRef.current.y * intensity * 10,
          rotateX: mouseRef.current.y * intensity * 5,
          rotateY: mouseRef.current.x * intensity * 5,
          intensity,
        })

        throttleRef.current = false
      })
    }

    // Device orientation for mobile (fallback to mouse if unavailable)
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (throttleRef.current) return

      throttleRef.current = true
      requestAnimationFrame(() => {
        const alpha = (e.alpha || 0) / 360
        const beta = (e.beta || 0) / 360
        const gamma = (e.gamma || 0) / 360

        setDepth({
          x: gamma * intensity * 10,
          y: beta * intensity * 10,
          rotateX: beta * intensity * 5,
          rotateY: gamma * intensity * 5,
          intensity,
        })

        throttleRef.current = false
      })
    }

    // Request permission for iOS 13+
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      // iOS 13+: permission required
    } else {
      // Android or older iOS
      window.addEventListener('deviceorientation', handleDeviceOrientation)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }
  }, [intensity])

  return depth
}
