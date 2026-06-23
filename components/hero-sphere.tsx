'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Particle Sphere Component
function ParticleSphere({ count = 5000 }) {
  const pointsRef = useRef<THREE.Points>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Generate sphere positions
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi

      const x = Math.cos(theta) * Math.sin(phi) * 2.5
      const y = Math.sin(theta) * Math.sin(phi) * 2.5
      const z = Math.cos(phi) * 2.5

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    return positions
  }, [count])

  // Track mouse for interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    // Auto rotation
    pointsRef.current.rotation.y += 0.002
    pointsRef.current.rotation.x += 0.001

    // Mouse interaction
    pointsRef.current.rotation.y += mousePosition.x * 0.002
    pointsRef.current.rotation.x += mousePosition.y * 0.002

    // Pulsing effect
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    pointsRef.current.scale.setScalar(scale)
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Floating particles background
function FloatingParticles({ count = 200 }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += 0.0005
    pointsRef.current.rotation.x += 0.0002
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  )
}

// Glowing ring effect
function GlowingRings() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.2
    ringRef.current.rotation.x = Math.PI / 2
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3.5, 0.01, 16, 100]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} />
    </mesh>
  )
}

// Main scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />

      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.8}>
        <ParticleSphere count={2200} />
      </Float>

      <FloatingParticles count={120} />
      <GlowingRings />
    </>
  )
}

// Fallback for when WebGL is not available
function FallbackHero() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* CSS animated sphere fallback */}
      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmic-accent via-cosmic-glow to-cosmic-aurora-end opacity-20 animate-pulse-glow" />
        <div className="absolute inset-4 rounded-full bg-cosmic-void" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-r from-cosmic-accent/10 via-transparent to-cosmic-glow/10" />
      </div>
    </div>
  )
}

// WebGL Check hook
function useWebGL() {
  const [hasWebGL, setHasWebGL] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setHasWebGL(!!gl)
    } catch (e) {
      setHasWebGL(false)
    }
  }, [])

  return hasWebGL
}

export function HeroSphere() {
  const hasWebGL = useWebGL()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-72 h-72 md:w-[560px] md:h-[560px] animate-pulse bg-cosmic-deep/45 rounded-full" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0">
      {hasWebGL ? (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      ) : (
        <FallbackHero />
      )}
    </div>
  )
}
