'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Code, TrendingUp, Award, Rocket, Star, ChevronRight, MapPin } from 'lucide-react'
import { TimelineNode3D } from '@/components/timeline-node-3d'
import { Card3DParallax } from '@/components/3d-parallax-card'

// Journey data
const journeyData = [
  {
    year: 2023,
    title: 'The Beginning',
    icon: Code,
    color: '#00d4ff',
    description: 'Started the programming journey with curiosity and determination.',
    milestones: [
      'First Python scripts and automation',
      'HTML/CSS fundamentals',
      'JavaScript basics',
      'Built first website',
      'Learned Git and version control',
    ],
  },
  {
    year: 2024,
    title: 'Trading & AI',
    icon: TrendingUp,
    color: '#7c3aed',
    description: 'Explored cryptocurrency trading and discovered the power of AI tools.',
    milestones: [
      'Crypto trading strategies',
      'Forex market analysis',
      'Indian stock market',
      'AI tool experimentation',
      'First automation projects',
      'Started freelancing',
    ],
  },
  {
    year: 2025,
    title: 'Certifications',
    icon: Award,
    color: '#ec4899',
    description: 'Earned certifications and expanded professional skillset.',
    milestones: [
      'ChatGPT & AI Tools Workshop',
      'Public Speaking Certification',
      'Multitasking Excellence Course',
      'Advanced React development',
      'Full-stack project completion',
    ],
  },
  {
    year: 2026,
    title: 'Professional',
    icon: Rocket,
    color: '#10b981',
    description: 'Building premium digital experiences for clients worldwide.',
    milestones: [
      'Enterprise clients',
      'International projects',
      'Premium pricing tier',
      'Full-stack agency',
      'Team expansion planning',
    ],
  },
]

// Timeline card component
function TimelineCard({ data, index, isLeft }: { data: typeof journeyData[0]; index: number; isLeft: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })
  const [isExpanded, setIsExpanded] = useState(false)

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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative ${isLeft ? 'pr-12' : 'pl-12'}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card glass-card-hover p-8 cursor-hover"
      >
        {/* Year badge */}
        <div
          className="absolute -top-4 px-4 py-1 rounded-full text-sm font-bold"
          style={{
            background: `linear-gradient(135deg, ${data.color}, ${data.color}cc)`,
            color: 'white',
          }}
        >
          {data.year}
        </div>

        <div className="flex items-start gap-4">
          <div>
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: `${data.color}20` }}
            >
              <data.icon style={{ color: data.color }} className="w-7 h-7" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-display font-semibold text-white mb-2">{data.title}</h3>
            <p className="text-white/60 mb-4">{data.description}</p>

            {/* Expandable milestones */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-cosmic-accent text-sm hover:gap-3 transition-all"
            >
              {isExpanded ? 'Hide' : 'View'} Milestones
              <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>

            <motion.div
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2">
                {data.milestones.map((milestone, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 text-white/70 text-sm"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: data.color }}
                    />
                    {milestone}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Timeline connector dot */}
      <div
        className={`absolute top-8 w-4 h-4 rounded-full z-10 ${isLeft ? 'right-0' : 'left-0'}`}
        style={{
          backgroundColor: data.color,
          boxShadow: `0 0 20px ${data.color}`,
          [isLeft ? 'marginRight' : 'marginLeft']: '-8px',
        }}
      />
    </motion.div>
  )
}

// Roadmap visualization with 3D timeline nodes
function RoadmapVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-12">
      {/* Timeline nodes */}
      {journeyData.map((data, i) => (
        <TimelineNode3D
          key={data.year}
          year={data.year.toString()}
          title={data.title}
          description={data.description}
          details={data.milestones}
          index={i}
          isLast={i === journeyData.length - 1}
        />
      ))}
    </div>
  )
}

// Animated path
function AnimatedPath() {
  const pathRef = useRef<SVGPathElement>(null)
  const { scrollYProgress } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1])

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        ref={pathRef}
        d="M50 0 L50 100"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="0.3"
        strokeDasharray="0 1"
        style={{
          pathLength,
          strokeDasharray: '0 1',
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function JourneyPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-glow/5 via-transparent to-transparent" />

        <motion.div
          style={{ y: heroY }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cosmic-accent font-medium tracking-widest uppercase text-sm">My Path</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mt-4 mb-6">
              <span className="text-white">The</span>
              <br />
              <span className="text-gradient-animated">Journey</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
              Every step has been a learning experience. Here's how it all unfolded.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <RoadmapVisualization />

          {/* Decorative elements */}
          <div className="absolute left-0 top-1/4 w-64 h-64 bg-cosmic-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-0 top-1/2 w-64 h-64 bg-cosmic-glow/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Current Status */}
      <section className="section-padding bg-gradient-to-b from-cosmic-void via-cosmic-deep/30 to-cosmic-void">
        <div className="container mx-auto px-4">
          <Card3DParallax intensity={0.7} delay={0.2}>
            <div className="glass-card p-12 md:p-20 text-center max-w-4xl mx-auto relative overflow-hidden">
              {/* Animated background gradient */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-br from-cosmic-accent/5 via-cosmic-glow/5 to-cosmic-aurora-end/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              />

              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-6"
                >
                  <MapPin className="w-full h-full text-cosmic-accent" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Current <span className="text-gradient">Location</span>
                </h2>
                <p className="text-white/60 text-lg mb-8">
                  Building premium digital experiences for clients worldwide.
                  Always learning, always growing, always creating.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  {['Next.js', 'Three.js', 'AI Integration', 'Enterprise Apps', 'Trading Systems'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, translateY: -2 }}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:border-cosmic-accent/50 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </Card3DParallax>
        </div>
      </section>

      {/* Future Vision */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Star className="w-12 h-12 text-cosmic-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              The <span className="text-gradient">Future</span> Awaits
            </h2>
            <p className="text-white/60 text-lg mb-8">
              This journey is just the beginning. With every project, every line of code,
              and every challenge overcome, the path forward becomes clearer.
              The best is yet to come.
            </p>
            <motion.a
              href="/store"
              className="magnetic-btn inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Be Part of the Journey</span>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}
