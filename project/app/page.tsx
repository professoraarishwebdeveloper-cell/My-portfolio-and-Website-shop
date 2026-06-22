'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { HeroSphere } from '@/components/hero-sphere'
import { ArrowRight, Sparkles, Code, Palette, Zap, Star, ExternalLink } from 'lucide-react'

// Magnetic button component
function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) * 0.3
    const y = (e.clientY - centerY) * 0.3
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const motionDiv = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{motionDiv}</Link>
  }

  return motionDiv
}

// Animated section reveal
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stats counter component
function StatCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000
      const incrementTime = duration / end

      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start >= end) clearInterval(timer)
      }, incrementTime)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-6xl font-display font-bold text-gradient-animated">
        {count}{suffix}
      </div>
      <div className="text-white/50 text-sm md:text-base mt-2">{label}</div>
    </div>
  )
}

// Project card for preview
function ProjectPreviewCard({ title, description, image, href, technologies }: {
  title: string
  description: string
  image: string
  href: string
  technologies: string[]
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXAmount = ((e.clientY - centerY) / (rect.height / 2)) * -5
    const rotateYAmount = ((e.clientX - centerX) / (rect.width / 2)) * 5
    setRotateX(rotateXAmount)
    setRotateY(rotateYAmount)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group glass-card overflow-hidden cursor-hover"
    >
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-white group-hover:text-cosmic-accent transition-colors">
          {title}
        </h3>
        <p className="text-white/60 text-sm mt-2 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/70 border border-white/10">
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-2 mt-4 text-cosmic-accent text-sm font-medium hover:gap-4 transition-all"
        >
          View Project <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  )
}

// Feature highlight card
function FeatureHighlight({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="glass-card glass-card-hover p-8 text-center group cursor-hover">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cosmic-accent/20 to-cosmic-glow/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8 text-cosmic-accent" />
      </div>
      <h3 className="text-xl font-display font-semibold text-white mb-3">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  )
}

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Sphere Background */}
        <HeroSphere />

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8"
            >
              <Sparkles className="w-4 h-4 text-cosmic-accent" />
              Creating Digital Universes
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight">
              <span className="block text-white">AARISH</span>
              <span className="block text-gradient-animated">KHATIB</span>
            </h1>

            {/* Roles */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm md:text-base text-white/70 mb-12">
              {['Creative Developer', 'Trader', 'AI Enthusiast', 'Website Architect'].map((role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cosmic-accent" />
                  {role}
                </motion.span>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <MagneticButton href="/store" className="magnetic-btn">
                <span className="relative z-10">Explore Universe</span>
                <div className="magnetic-btn-glow" />
              </MagneticButton>

              <MagneticButton href="/contact" className="btn-secondary">
                <span className="relative z-10 flex items-center gap-2">
                  Hire Me <ArrowRight className="w-4 h-4" />
                </span>
              </MagneticButton>

              <MagneticButton href="/store" className="btn-secondary">
                <span className="relative z-10 flex items-center gap-2">
                  Store <ExternalLink className="w-4 h-4" />
                </span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-cosmic-accent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <RevealSection className="section-padding bg-gradient-to-b from-transparent via-cosmic-deep/50 to-cosmic-void">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCounter value={50} suffix="+" label="Projects Delivered" />
            <StatCounter value={100} suffix="%" label="Client Satisfaction" />
            <StatCounter value={3} suffix="+" label="Years Experience" />
            <StatCounter value={24} suffix="/7" label="Support Available" />
          </div>
        </div>
      </RevealSection>

      {/* What I Do Section */}
      <RevealSection className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-gradient">What I Do</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Transforming ideas into digital realities with cutting-edge technology and creative excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <FeatureHighlight
              icon={Code}
              title="Full-Stack Development"
              description="Building enterprise-grade applications with React, Next.js, and modern technologies."
            />
            <FeatureHighlight
              icon={Palette}
              title="Creative Design"
              description="Crafting visually stunning experiences that captivate and convert."
            />
            <FeatureHighlight
              icon={Zap}
              title="AI Integration"
              description="Leveraging AI tools to automate, optimize, and innovate solutions."
            />
          </div>
        </div>
      </RevealSection>

      {/* Featured Projects Preview */}
      <RevealSection className="section-padding bg-gradient-to-b from-cosmic-void via-cosmic-deep/30 to-cosmic-void">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                <span className="text-gradient">Featured Work</span>
              </h2>
              <p className="text-white/60">Explore some of my recent projects</p>
            </div>
            <Link
              href="/projects"
              className="btn-secondary flex items-center gap-2 cursor-hover"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectPreviewCard
              title="Trading Bot"
              description="AI-powered automated trading system with real-time market analysis"
              image="https://images.unsplash.com/photo-1611974789855-9c2a0a723214?w=800&h=600&fit=crop"
              href="/projects/trading-bot"
              technologies={['Python', 'TensorFlow', 'WebSocket']}
            />
            <ProjectPreviewCard
              title="Crypto Dashboard"
              description="Real-time cryptocurrency portfolio tracker with advanced analytics"
              image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop"
              href="/projects/crypto-dashboard"
              technologies={['React', 'Next.js', 'Chart.js']}
            />
            <ProjectPreviewCard
              title="Portfolio Template"
              description="Premium portfolio template for creative professionals"
              image="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop"
              href="/projects/portfolio-template"
              technologies={['Next.js', 'Three.js', 'Framer Motion']}
            />
          </div>
        </div>
      </RevealSection>

      {/* CTA Section */}
      <RevealSection className="section-padding">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-accent/10 via-transparent to-cosmic-glow/10" />

            <div className="relative z-10">
              <Star className="w-12 h-12 text-cosmic-accent mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Ready to Build Something{' '}
                <span className="text-gradient">Extraordinary?</span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8">
                Let's collaborate and create digital experiences that leave lasting impressions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton href="/store" className="magnetic-btn">
                  <span className="relative z-10">Get Started</span>
                </MagneticButton>
                <MagneticButton href="/contact" className="btn-secondary">
                  <span className="relative z-10">Let's Talk</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Footer Preview */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xl font-display font-bold text-gradient">AK</div>
            <div className="text-white/40 text-sm">
              © 2026 Aarish Khatib. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
