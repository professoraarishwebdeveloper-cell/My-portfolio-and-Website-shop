'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x030014, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create stars
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 1000
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200

      // Mix of cyan and purple colors
      const isAccent = Math.random() > 0.5
      if (isAccent) {
        colors[i * 3] = 0 // R
        colors[i * 3 + 1] = 0.82 // G (00d4ff)
        colors[i * 3 + 2] = 1 // B
      } else {
        colors[i * 3] = 0.49 // R (7c3aed)
        colors[i * 3 + 1] = 0.23 // G
        colors[i * 3 + 2] = 0.93 // B
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const starMaterial = new THREE.PointsMaterial({
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Slow rotation
      stars.rotation.x += 0.00005
      stars.rotation.y += 0.0001

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />
}
