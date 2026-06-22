'use client'

import { useRef, useState, ReactNode } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { HeroSphere } from '@/components/hero-sphere'
import { StarField } from '@/components/star-field'
import { ParallaxSection } from '@/components/parallax-section'
import { FloatingText } from '@/components/floating-text'
import { BloomEffect } from '@/components/bloom-effect'
import { TiltCard } from '@/components/tilt-card'
import { CounterStat } from '@/components/counter-stat'
import { ArrowRight, Sparkles, Code, Palette, Zap, Star, ExternalLink, Lightbulb, Rocket, Cpu } from 'lucide-react'

// Magnetic button with premium effects
function MagneticButton({ children, className, href }: { children: ReactNode; className?: string; href?: string }) {
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

// Premium reveal animation
function RevealSection({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
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

// Enhanced feature card with 3D tilt
function FeatureCard({ icon: Icon, title, description, accent = 'accent' }: { icon: React.ElementType; title: string; description: string; accent?: 'accent' | 'glow' | 'aurora' }) {
  return (
    <TiltCard className="glass-card glass-card-hover p-8 group cursor-hover h-full">
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <BloomEffect color={accent} intensity="medium" className="mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cosmic-accent/20 to-cosmic-glow/20 flex items-center justify-center">
            <Icon className="w-8 h-8 text-cosmic-accent" />
          </div>
        </BloomEffect>
        <h3 className="text-xl font-display font-semibold text-white mb-3">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      </motion.div>
    </TiltCard>
  )
}

// Showcase card with enhanced visuals
function ShowcaseCard({ 
  title, 
  description, 
  technologies,
  icon: Icon,
  gradient = 'from-cosmic-accent to-cosmic-glow'
}: {
  title: string
  description: string
  technologies: string[]
  icon: React.ElementType
  gradient?: string
}) {
  return (
    <TiltCard className={`glass-card glass-card-hover group overflow-hidden h-full`}>
      <div className={`bg-gradient-to-br ${gradient} p-px h-full`}>
        <div className="bg-cosmic-void p-8 h-full flex flex-col">
          <BloomEffect intensity="light" className="mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-cosmic-accent" />
            </div>
          </BloomEffect>
          <h3 className="text-lg font-display font-semibold text-white mb-3">{title}</h3>
          <p className="text-white/60 text-sm mb-6 flex-grow">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-1 text-xs rounded-full bg-white/5 text-white/70 border border-white/10 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
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
    <div className="relative overflow-hidden">
      <StarField />

      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Particle Universe */}
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
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cosmic-accent/10 to-cosmic-glow/10 border border-cosmic-accent/40 text-sm text-white/70 mb-8 backdrop-blur-md"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.15), inset 0 0 20px rgba(0, 255, 255, 0.05)',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-cosmic-accent" />
              </motion.div>
              Premium Digital Universe
            </motion.div>

            {/* Main Heading with Animation */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block text-white"
              >
                AARISH
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block text-gradient-animated"
              >
                KHATIB
              </motion.span>
            </h1>

            {/* Role Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm md:text-base text-white/70 mb-12"
            >
              {['Creative Developer', 'Full-Stack Engineer', 'AI Innovator', 'Web Architect'].map((role, i) => (
                <FloatingText key={role} delay={0.8 + i * 0.1} duration={5} intensity={10}>
                  <motion.span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-cosmic-accent/50 transition-colors cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmic-accent" />
                    {role}
                  </motion.span>
                </FloatingText>
              ))}
            </motion.div>

            {/* Hero Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-white/60 max-w-2xl mx-auto mb-12 text-base md:text-lg"
            >
              Crafting Awwwards-level digital experiences with cutting-edge technology, cinematic interactions, and premium design.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <MagneticButton href="/store" className="magnetic-btn">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Services <Rocket className="w-4 h-4" />
                </span>
                <div className="magnetic-btn-glow" />
              </MagneticButton>

              <MagneticButton href="/contact" className="btn-secondary">
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project <ArrowRight className="w-4 h-4" />
                </span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-cosmic-accent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <RevealSection className="section-padding bg-gradient-to-b from-transparent via-cosmic-deep/30 to-cosmic-void relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-cosmic-accent/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              <span className="text-gradient">Track Record</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">Proven expertise in delivering premium digital solutions</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <CounterStat value={50} suffix="+" label="Projects" description="Completed & Delivered" />
            <CounterStat value={100} suffix="%" label="Satisfaction" description="Client Retention" />
            <CounterStat value={3} suffix="+" label="Years" description="Industry Experience" />
            <CounterStat value={24} suffix="/7" label="Support" description="Always Available" />
          </div>
        </div>
      </RevealSection>

      {/* ===== CAPABILITIES SECTION ===== */}
      <RevealSection className="section-padding bg-cosmic-void">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              <span className="text-gradient">What I Create</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">Specialized in premium digital experiences powered by cutting-edge technology</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Code}
              title="Full-Stack Development"
              description="Enterprise-grade applications with React, Next.js, TypeScript, and modern architecture. Performance-optimized and production-ready."
              accent="accent"
            />
            <FeatureCard
              icon={Palette}
              title="Creative Design"
              description="Awwwards-level interfaces with glassmorphism, 3D effects, and cinematic micro-interactions that captivate and convert."
              accent="glow"
            />
            <FeatureCard
              icon={Cpu}
              title="AI Integration"
              description="Intelligent solutions leveraging AI/ML, automation, and advanced analytics to optimize and innovate your digital presence."
              accent="aurora"
            />
          </div>
        </div>
      </RevealSection>

      {/* ===== FEATURED SERVICES SECTION ===== */}
      <RevealSection className="section-padding bg-gradient-to-b from-cosmic-void via-cosmic-deep/20 to-cosmic-void">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                <span className="text-gradient">Featured Expertise</span>
              </h2>
              <p className="text-white/60 max-w-xl">Specialized capabilities tailored for modern digital challenges</p>
            </div>
            <Link
              href="/projects"
              className="btn-secondary flex items-center gap-2 cursor-hover whitespace-nowrap"
            >
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ShowcaseCard
              icon={Rocket}
              title="Web Applications"
              description="Scalable, performant web apps with real-time capabilities and seamless user experiences"
              technologies={['React', 'Next.js', 'Node.js']}
              gradient="from-cosmic-accent/20 to-cosmic-glow/20"
            />
            <ShowcaseCard
              icon={Lightbulb}
              title="AI Solutions"
              description="Intelligent systems with machine learning, chatbots, and autonomous automation"
              technologies={['Python', 'TensorFlow', 'LLMs']}
              gradient="from-cosmic-glow/20 to-cosmic-aurora-end/20"
            />
            <ShowcaseCard
              icon={Star}
              title="Premium UI/UX"
              description="Cinematic interfaces with 3D, particles, animations, and glassmorphism effects"
              technologies={['Three.js', 'Framer', 'GSAP']}
              gradient="from-cosmic-aurora-end/20 to-cosmic-accent/20"
            />
          </div>
        </div>
      </RevealSection>

      {/* ===== JOURNEY PREVIEW ===== */}
      <RevealSection className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              <span className="text-gradient">My Journey</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">From crypto trading to premium web development</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              { year: '2021', title: 'Forex & Crypto Trading', desc: 'Started trading in financial markets' },
              { year: '2022', title: 'First Websites', desc: 'Built my first web development projects' },
              { year: '2023', title: 'Full Stack Development', desc: 'Mastered full-stack development' },
              { year: '2024', title: 'Creative Development', desc: 'Focused on Awwwards-level design' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="mb-8 relative"
              >
                <div className="glass-card p-6 md:p-8 flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cosmic-accent to-cosmic-glow flex items-center justify-center font-display font-bold text-cosmic-void">
                      {i + 1}
                    </div>
                    {i < 3 && <div className="w-1 h-16 bg-gradient-to-b from-cosmic-accent to-transparent mt-2" />}
                  </div>
                  <div>
                    <span className="text-cosmic-accent text-sm font-semibold">{item.year}</span>
                    <h3 className="text-xl font-display font-semibold text-white mt-1">{item.title}</h3>
                    <p className="text-white/60 text-sm mt-2">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ===== CTA SECTION ===== */}
      <RevealSection className="section-padding">
        <div className="container mx-auto px-4">
          <ParallaxSection offset={40}>
            <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden group">
              {/* Animated background gradient */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-br from-cosmic-accent/5 via-cosmic-glow/5 to-cosmic-aurora-end/5 opacity-0 group-hover:opacity-100 transition-opacity"
              />

              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-8 bg-gradient-to-br from-cosmic-accent to-cosmic-glow rounded-full flex items-center justify-center"
                >
                  <Star className="w-8 h-8 text-cosmic-void" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  Ready to Build Something{' '}
                  <span className="text-gradient">Extraordinary?</span>
                </h2>
                <p className="text-white/60 max-w-xl mx-auto mb-10 text-lg">
                  Let's collaborate to create premium digital experiences that leave lasting impressions on your audience.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <MagneticButton href="/store" className="magnetic-btn">
                    <span className="relative z-10 flex items-center gap-2">
                      View Packages <Rocket className="w-4 h-4" />
                    </span>
                  </MagneticButton>
                  <MagneticButton href="/contact" className="btn-secondary">
                    <span className="relative z-10">Schedule Call</span>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ParallaxSection>
        </div>
      </RevealSection>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 border-t border-white/5 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-8"
          >
            <div>
              <div className="text-2xl font-display font-bold text-gradient mb-2">Aarish Khatib</div>
              <p className="text-white/40 text-sm">Premium Digital Architect</p>
            </div>
            <div className="text-center text-white/40 text-sm">
              <p>© 2026 Aarish Khatib. All rights reserved.</p>
              <p className="mt-2">Crafted with precision. Delivered with excellence.</p>
            </div>
            <div className="flex gap-4">
              {['GitHub', 'Twitter', 'LinkedIn'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, color: '#00d4ff' }}
                  className="text-white/40 hover:text-cosmic-accent transition-colors text-sm"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
