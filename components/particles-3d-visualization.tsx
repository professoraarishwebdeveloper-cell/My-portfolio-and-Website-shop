'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PointMaterial, Points } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random particles in a sphere
  const particles = useMemo(() => {
    const temp = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000 * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 2 + Math.random() * 2

      temp[i] = r * Math.sin(phi) * Math.cos(theta)
      temp[i + 1] = r * Math.sin(phi) * Math.sin(theta)
      temp[i + 2] = r * Math.cos(phi)
    }
    return temp
  }, [])

  return (
    <>
      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#00d4ff" size={0.05} sizeAttenuation depthWrite={false} />
      </Points>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial transparent opacity={0.05} wireframe color="#00d4ff" />
      </mesh>
    </>
  )
}

export function Particles3DVisualization() {
  return (
    <div className="w-full h-screen bg-cosmic-void relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={2}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 drop-shadow-lg">
            AARISH KHATIB
          </h1>
          <p className="text-lg font-medium text-[#DCE7F7] drop-shadow-md">
            Digital Universe in Motion
          </p>
        </div>
      </div>
    </div>
  )
}
