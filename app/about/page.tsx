'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Code, TrendingUp, Bot, Globe, Target, Rocket, Lightbulb, Heart, Award, Users } from 'lucide-react'
import { Particles3DVisualization } from '@/components/particles-3d-visualization'
import { Card3DParallax } from '@/components/3d-parallax-card'
import { use3DDepth } from '@/hooks/use3DDepth'

// Animated reveal section
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

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

// Glass card with 3D tilt
function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card glass-card-hover p-8 transition-transform duration-300 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

// Timeline milestone
function TimelineMilestone({ year, title, description, icon: Icon, isLeft = true }: {
  year: string
  title: string
  description: string
  icon: React.ElementType
  isLeft?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'} ${isLeft ? 'text-right' : 'text-left'}`}
    >
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        <span className="text-cosmic-accent font-display font-bold text-lg">{year}</span>
        <h3 className="text-2xl font-display font-semibold text-white mt-2">{title}</h3>
        <p className="text-slate-300/85 mt-2">{description}</p>
      </div>

      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cosmic-accent to-cosmic-glow flex items-center justify-center z-10 shrink-0">
        <Icon className="w-8 h-8 text-white" />
      </div>

      <div className="flex-1" />
    </motion.div>
  )
}

// Value card
function ValueCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <GlassCard className="text-center cursor-hover">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cosmic-accent/20 to-cosmic-glow/20 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-cosmic-accent" />
      </div>
      <h3 className="text-xl font-display font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-300/85 text-sm">{description}</p>
    </GlassCard>
  )
}

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-accent/5 via-transparent to-transparent" />

        <motion.div
          style={{ y: heroY, opacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cosmic-accent font-semibold tracking-[0.28em] uppercase text-sm">About Me</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mt-4 mb-6 tracking-tight drop-shadow-[0_12px_30px_rgba(2,6,23,0.45)]">
              <span className="text-white">The Story Behind</span>
              <br />
              <span className="text-gradient">The Code</span>
            </h1>
            <p className="text-slate-200/95 text-lg md:text-xl max-w-2xl mx-auto leading-8 font-medium">
              A passionate developer, trader, and AI enthusiast on a mission to create
              digital experiences that inspire and transform.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3D Visualization Section */}
      <section className="relative h-screen">
        <Particles3DVisualization />
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 3D Depth Visualization Side */}
            <RevealSection className="relative">
              <Card3DParallax intensity={0.6} delay={0.1}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-accent/20 to-cosmic-glow/20 rounded-3xl transform -rotate-3" />
                  <div className="absolute inset-0 bg-cosmic-deep rounded-3xl overflow-hidden">
                    {/* Abstract geometric visualization */}
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="relative w-full h-64">
                        {/* Animated geometric shapes */}
                        <motion.div
                          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                          transition={{ duration: 8, repeat: Infinity }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-32 h-32 border-2 border-cosmic-accent/40 rounded-full" />
                          <div className="absolute w-24 h-24 border-2 border-cosmic-glow/40 rounded-full" />
                          <div className="absolute w-16 h-16 border-2 border-cosmic-aurora-end/40 rounded-full" />
                        </motion.div>
                        
                        {/* Floating particles */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [0, -30, 0],
                              x: [0, Math.cos(i * Math.PI / 3) * 40, 0],
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              duration: 4 + i,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                            className="absolute w-2 h-2 rounded-full bg-cosmic-accent"
                            style={{
                              left: `${50 + Math.cos(i * Math.PI / 3) * 40}%`,
                              top: `${50 + Math.sin(i * Math.PI / 3) * 40}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-transparent to-transparent" />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-cosmic-accent/30 rounded-full" />
                  <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-cosmic-glow/30 rounded-full" />
                </div>
              </Card3DParallax>
            </RevealSection>

            {/* Text Side */}
            <RevealSection delay={0.2}>
              <div className="glass-card p-7 md:p-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight">
                Hello, I'm <span className="text-gradient">Aarish Khatib</span>
              </h2>
              <div className="space-y-5 text-slate-200/92 leading-8">
                <p>
                  I'm a creative developer and digital architect passionate about building
                  experiences that push the boundaries of what's possible on the web.
                </p>
                <p>
                  My journey into technology began with a curiosity for how things work.
                  What started as simple HTML experiments evolved into a deep passion for
                  creating beautiful, functional, and impactful digital solutions.
                </p>
                <p>
                  Beyond coding, I've immersed myself in the world of trading — exploring
                  cryptocurrency markets, forex, and Indian stock markets. This unique
                  combination of technical skills and financial acumen allows me to build
                  sophisticated trading systems and analytics tools.
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 rounded-xl bg-white/8 border border-white/12">
                  <div className="text-2xl font-display font-bold text-cosmic-accent">50+</div>
                  <div className="text-slate-300/85 text-sm">Projects</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/8 border border-white/12">
                  <div className="text-2xl font-display font-bold text-cosmic-accent">3+</div>
                  <div className="text-slate-300/85 text-sm">Years</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/8 border border-white/12">
                  <div className="text-2xl font-display font-bold text-cosmic-accent">100%</div>
                  <div className="text-slate-300/85 text-sm">Dedication</div>
                </div>
              </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Skills & Domains */}
      <section className="section-padding bg-gradient-to-b from-cosmic-void via-cosmic-deep/30 to-cosmic-void">
        <div className="container mx-auto px-4">
          <RevealSection className="text-center mb-16">
            <span className="text-cosmic-accent font-medium tracking-widest uppercase text-sm">What I Do</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 text-white">
              Areas of <span className="text-gradient">Expertise</span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard>
              <Code className="w-10 h-10 text-cosmic-accent mb-4" />
              <h3 className="text-xl font-display font-semibold text-white mb-3">Web Development</h3>
              <p className="text-slate-300/85 text-sm">
                Full-stack development with React, Next.js, and modern technologies
              </p>
            </GlassCard>

            <GlassCard>
              <TrendingUp className="w-10 h-10 text-cosmic-accent mb-4" />
              <h3 className="text-xl font-display font-semibold text-white mb-3">Trading</h3>
              <p className="text-slate-300/85 text-sm">
                Crypto, Forex, and Indian stock market trading and automation
              </p>
            </GlassCard>

            <GlassCard>
              <Bot className="w-10 h-10 text-cosmic-accent mb-4" />
              <h3 className="text-xl font-display font-semibold text-white mb-3">AI Integration</h3>
              <p className="text-slate-300/85 text-sm">
                Building intelligent systems with ChatGPT, Claude, and ML APIs
              </p>
            </GlassCard>

            <GlassCard>
              <Globe className="w-10 h-10 text-cosmic-accent mb-4" />
              <h3 className="text-xl font-display font-semibold text-white mb-3">Digital Strategy</h3>
              <p className="text-slate-300/85 text-sm">
                SEO, performance optimization, and scalable architecture
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <RevealSection className="text-center mb-16">
            <span className="text-cosmic-accent font-medium tracking-widest uppercase text-sm">My Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 text-white">
              Core <span className="text-gradient">Values</span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <ValueCard
              icon={Lightbulb}
              title="Innovation"
              description="Always exploring new technologies and approaches to solve problems creatively."
            />
            <ValueCard
              icon={Target}
              title="Excellence"
              description="Every project is an opportunity to deliver something exceptional."
            />
            <ValueCard
              icon={Heart}
              title="Passion"
              description="Genuine enthusiasm for creating digital experiences that matter."
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-gradient-to-b from-cosmic-void via-cosmic-deep/30 to-cosmic-void">
        <div className="container mx-auto px-4">
          <RevealSection className="text-center mb-16">
            <span className="text-cosmic-accent font-medium tracking-widest uppercase text-sm">The Journey</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 text-white">
              Key <span className="text-gradient">Milestones</span>
            </h2>
          </RevealSection>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cosmic-accent via-cosmic-glow to-transparent hidden md:block" />

            <div className="space-y-16">
              <TimelineMilestone
                year="2023"
                title="Programming Journey Begins"
                description="Started learning Python and JavaScript, building first projects"
                icon={Code}
                isLeft={true}
              />
              <TimelineMilestone
                year="2024"
                title="Trading & AI Exploration"
                description=" dove into crypto trading and began experimenting with AI tools"
                icon={TrendingUp}
                isLeft={false}
              />
              <TimelineMilestone
                year="2025"
                title="Certifications & Growth"
                description="Earned multiple certifications and expanded professional skillset"
                icon={Award}
                isLeft={true}
              />
              <TimelineMilestone
                year="2026"
                title="Professional Developer"
                description="Building premium digital experiences for clients worldwide"
                icon={Rocket}
                isLeft={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 md:p-20 text-center max-w-4xl mx-auto">
            <Rocket className="w-16 h-16 text-cosmic-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Looking <span className="text-gradient">Ahead</span>
            </h2>
            <p className="text-slate-200/92 text-lg mb-8 max-w-2xl mx-auto leading-8">
              My vision is to continue pushing the boundaries of web development,
              building AI-powered solutions, and helping businesses transform
              their digital presence. Every project is an opportunity to create
              something meaningful.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-slate-200/90">
                <Users className="w-4 h-4 inline mr-2" />
                Grow the team
              </div>
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-slate-200/90">
                <Globe className="w-4 h-4 inline mr-2" />
                Global reach
              </div>
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-slate-200/90">
                <Bot className="w-4 h-4 inline mr-2" />
                AI innovations
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
