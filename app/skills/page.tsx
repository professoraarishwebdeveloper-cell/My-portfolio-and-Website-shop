'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'
import { Card3DParallax } from '@/components/3d-parallax-card'
import { use3DDepth } from '@/hooks/use3DDepth'

// Skill data
const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 95, color: '#61DAFB' },
      { name: 'Next.js', level: 92, color: '#ffffff' },
      { name: 'TypeScript', level: 90, color: '#3178C6' },
      { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
      { name: 'Framer Motion', level: 88, color: '#FF0050' },
      { name: 'Three.js', level: 85, color: '#000000' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 88, color: '#339933' },
      { name: 'Python', level: 85, color: '#3776AB' },
      { name: 'PostgreSQL', level: 88, color: '#336791' },
      { name: 'Supabase', level: 90, color: '#3ECF8E' },
      { name: 'REST APIs', level: 92, color: '#00D4FF' },
    ],
  },
  {
    category: 'Finance',
    skills: [
      { name: 'Crypto Trading', level: 85, color: '#F7931A' },
      { name: 'Forex', level: 80, color: '#00D4FF' },
      { name: 'Stock Market', level: 82, color: '#00C853' },
      { name: 'Technical Analysis', level: 85, color: '#7C3AED' },
    ],
  },
  {
    category: 'AI & Automation',
    skills: [
      { name: 'ChatGPT/GPT-4', level: 90, color: '#10A37F' },
      { name: 'Claude', level: 88, color: '#CC785C' },
      { name: 'Prompt Engineering', level: 92, color: '#FF6B6B' },
      { name: 'API Integration', level: 90, color: '#00D4FF' },
    ],
  },
  {
    category: 'Tools & Platforms',
    skills: [
      { name: 'Git/GitHub', level: 90, color: '#181717' },
      { name: 'Vercel', level: 92, color: '#ffffff' },
      { name: 'Linux/Server', level: 80, color: '#FCC624' },
      { name: 'Figma', level: 85, color: '#F24E1E' },
    ],
  },
  {
    category: 'Soft Skills',
    skills: [
      { name: 'Public Speaking', level: 90, color: '#FF6B6B' },
      { name: 'Problem Solving', level: 95, color: '#00D4FF' },
      { name: 'Multitasking', level: 88, color: '#7C3AED' },
      { name: 'Communication', level: 90, color: '#10B981' },
    ],
  },
]

// Floating particles for background
function FloatingParticles({ count = 150 }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += 0.0003
    pointsRef.current.rotation.x += 0.0002
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 3D Skill Galaxy Scene
function SkillGalaxyScene() {
  return (
    <div className="absolute inset-0 opacity-20">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <FloatingParticles />
      </Canvas>
    </div>
  )
}

// Skill orbit visualization with 3D depth
function SkillOrbit({ skills }: { skills: { name: string; level: number; color: string }[] }) {
  const depth = use3DDepth(0.3)

  return (
    <motion.div
      style={{
        transform: `perspective(1200px) rotateX(${depth.rotateX * 0.3}deg) rotateY(${depth.rotateY * 0.3}deg) translateZ(${depth.intensity * 10}px)`,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full max-w-md mx-auto aspect-square"
    >
      {/* Center */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cosmic-accent"
        style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)' }}
      />

      {/* Orbit rings with gradient */}
      {[0.3, 0.5, 0.7, 0.9].map((radius, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.2 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: `${radius * 100}%`,
            height: `${radius * 100}%`,
            borderColor: `rgba(0, 212, 255, ${0.3 - i * 0.05})`,
          }}
        />
      ))}

      {/* Skills as orbiting dots with 3D depth */}
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2
        const radius = (skill.level / 100) * 45 + 5 // percentage to radius
        const x = Math.cos(angle) * radius + 50
        const y = Math.sin(angle) * radius + 50

        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="absolute group"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `perspective(800px) translate(-50%, -50%) rotateX(${depth.rotateX * 0.2}deg) rotateY(${depth.rotateY * 0.2}deg)`,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.8 }}
          >
            <div
              className="w-3 h-3 rounded-full transform transition-all duration-300 group-hover:scale-150"
              style={{
                backgroundColor: skill.color,
                boxShadow: `0 0 10px ${skill.color}`,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute left-full ml-2 whitespace-nowrap z-10 pointer-events-none"
            >
              <span className="text-sm text-white bg-cosmic-deep/95 px-2 py-1 rounded border border-white/10">
                {skill.name} ({skill.level}%)
              </span>
            </motion.div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// Skill card with 3D parallax effect
function SkillCard({ skill, index }: { skill: { name: string; level: number; color: string }; index: number }) {
  const depth = use3DDepth(0.4)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card3DParallax intensity={0.5} delay={index * 0.05}>
      <motion.div
        style={{
          transform: `perspective(1200px) rotateX(${depth.rotateX * 0.5}deg) rotateY(${depth.rotateY * 0.5}deg) translateZ(${depth.intensity * 10}px)`,
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="glass-card p-4 cursor-hover transition-all duration-200"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">{skill.name}</span>
          <span className="text-sm text-slate-300">{skill.level}%</span>
        </div>

        {/* Skill level bar with glow */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#111a2f]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
              boxShadow: isHovered ? `0 0 15px ${skill.color}` : 'none',
            }}
          />
        </div>

        {/* Hover glow effect */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 30px ${skill.color}20, 0 0 30px ${skill.color}10`,
          }}
        />
      </motion.div>
    </Card3DParallax>
  )
}

// Category section
function CategorySection({ category, skills, index }: { category: string; skills: { name: string; level: number; color: string }[]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-16"
    >
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-2xl font-display font-semibold text-gradient">{category}</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-cosmic-accent/50 to-transparent" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <SkillGalaxyScene />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cosmic-accent font-medium tracking-widest uppercase text-sm">My Expertise</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mt-4 mb-6">
              <span className="text-white">Skills</span>
              <br />
              <span className="text-gradient-animated">Galaxy</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-medium leading-[1.8] text-slate-200">
              Each skill is a star in my universe. Explore the constellations
              of technologies and expertise I've developed over the years.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          {/* Skills by category */}
          {skillCategories.map((cat, i) => (
            <CategorySection key={cat.category} category={cat.category} skills={cat.skills} index={i} />
          ))}
        </div>
      </section>

      {/* Interactive Orbit Visualization */}
      <section className="section-padding bg-gradient-to-b from-cosmic-void via-cosmic-deep/30 to-cosmic-void">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Skill <span className="text-gradient">Orbits</span>
            </h2>
            <p className="mx-auto max-w-xl font-medium leading-[1.8] text-slate-200">
              Distance from center represents proficiency level. Hover to see details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {skillCategories.slice(0, 3).map((cat) => (
                <div key={cat.category}>
                  <h3 className="text-lg font-semibold text-white mb-4">{cat.category}</h3>
                  <SkillOrbit skills={cat.skills} />
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {skillCategories.slice(3).map((cat) => (
                <div key={cat.category}>
                  <h3 className="text-lg font-semibold text-white mb-4">{cat.category}</h3>
                  <SkillOrbit skills={cat.skills} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Put These Skills to <span className="text-gradient">Work</span>?
            </h2>
            <p className="mb-8 font-medium leading-[1.8] text-slate-200">
              Let's collaborate on your next project.
            </p>
            <motion.a
              href="/store"
              className="magnetic-btn inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start a Project</span>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}
