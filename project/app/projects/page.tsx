'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, Star, Code, Layers, Globe, Cpu, TrendingUp, Zap, Bot } from 'lucide-react'
import { use3DDepth } from '@/hooks/use3DDepth'
import { Card3DParallax } from '@/components/3d-parallax-card'

// Project data
const projects = [
  {
    id: 1,
    title: 'Trading Bot',
    slug: 'trading-bot',
    description: 'AI-powered automated trading system with real-time market analysis and risk management.',
    long_description: 'A sophisticated trading bot that uses machine learning algorithms to analyze market patterns and execute trades automatically. Features include risk management, portfolio rebalancing, and real-time alerts.',
    category: 'AI & Automation',
    technologies: ['Python', 'TensorFlow', 'CCXT', 'WebSocket', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a723214?w=800&h=600&fit=crop',
    featured: true,
    live_url: null,
    github_url: null,
    icon: TrendingUp,
    color: '#f7931a',
  },
  {
    id: 2,
    title: 'Crypto Dashboard',
    slug: 'crypto-dashboard',
    description: 'Real-time cryptocurrency portfolio tracker with advanced analytics and price alerts.',
    long_description: 'A comprehensive dashboard for tracking cryptocurrency investments with real-time price updates, portfolio analytics, profit/loss calculations, and customizable alerts.',
    category: 'Web Application',
    technologies: ['React', 'Next.js', 'Chart.js', 'WebSocket', 'Supabase'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    featured: true,
    live_url: null,
    github_url: null,
    icon: Layers,
    color: '#00d4ff',
  },
  {
    id: 3,
    title: 'Portfolio Template',
    slug: 'portfolio-template',
    description: 'Premium portfolio template for developers and creative professionals.',
    long_description: 'A stunning, customizable portfolio template designed for developers, designers, and creative professionals. Features smooth animations, 3D effects, and responsive design.',
    category: 'Template',
    technologies: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    featured: true,
    live_url: null,
    github_url: null,
    icon: Star,
    color: '#7c3aed',
  },
  {
    id: 4,
    title: 'AI Image Generator',
    slug: 'ai-image-generator',
    description: 'Text-to-image generator with custom model fine-tuning for specific art styles.',
    long_description: 'An AI-powered image generation tool using Stable Diffusion with custom fine-tuned models for specific art styles and use cases.',
    category: 'AI & Automation',
    technologies: ['Python', 'PyTorch', 'Stable Diffusion', 'FastAPI', 'React'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    featured: true,
    live_url: null,
    github_url: null,
    icon: Bot,
    color: '#ec4899',
  },
  {
    id: 5,
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'Full-featured e-commerce solution with inventory and order management.',
    long_description: 'A complete e-commerce platform with product management, inventory tracking, payment integration, order management, and customer analytics.',
    category: 'Web Application',
    technologies: ['Next.js', 'Stripe', 'Supabase', 'Tailwind CSS', 'Redis'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    featured: false,
    live_url: null,
    github_url: null,
    icon: Globe,
    color: '#10b981',
  },
  {
    id: 6,
    title: 'Task Automation Suite',
    slug: 'task-automation',
    description: 'Automated workflow system for business process optimization.',
    long_description: 'A suite of automation tools for streamlining business workflows including email automation, file processing, and API integrations.',
    category: 'AI & Automation',
    technologies: ['Node.js', 'Python', 'Bull', 'Redis', 'Docker'],
    image: 'https://images.unsplash.com/photo-1518438088903-9c6fa2a6f9e4?w=800&h=600&fit=crop',
    featured: false,
    live_url: null,
    github_url: null,
    icon: Zap,
    color: '#f59e0b',
  },
]

const categories = ['All', 'Web Application', 'AI & Automation', 'Template']

// Premium 3D abstract project card
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const depth = use3DDepth(0.5)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card3DParallax intensity={0.6} delay={index * 0.1}>
      <motion.div
        style={{
          transform: `perspective(1200px) rotateX(${depth.rotateX * 0.4}deg) rotateY(${depth.rotateY * 0.4}deg) translateZ(${depth.intensity * 10}px)`,
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group h-full"
      >
        {/* Gradient border overlay */}
        <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="absolute inset-0 rounded-3xl bg-cosmic-void" />
        </div>

        {/* Main card */}
        <div className="relative glass-card overflow-hidden h-full flex flex-col">
          {/* Abstract 3D visualization */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-cosmic-deep/50 to-cosmic-void flex items-center justify-center">
            {/* Animated 3D geometry background */}
            <div className="absolute inset-0">
              {/* Floating geometric shapes */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  className="w-32 h-32 rounded-2xl opacity-30"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)`,
                    border: `2px solid ${project.color}40`,
                  }}
                />
              </motion.div>

              {/* Animated grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id={`grid-${project.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d={`M 40 0 L 0 0 0 40`} fill="none" stroke={project.color} strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
              </svg>

              {/* Floating particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.random() * 60 - 30, 0],
                    y: [0, Math.random() * 60 - 30, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: project.color,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 12px ${project.color}`,
                  }}
                />
              ))}
            </div>

            {/* Icon and category in center */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                  border: `2px solid ${project.color}`,
                }}
              >
                <project.icon className="w-8 h-8" style={{ color: project.color }} />
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: `${project.color}20`,
                  border: `1px solid ${project.color}40`,
                  color: project.color,
                }}
              >
                {project.category}
              </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-display font-semibold text-white flex-1">{project.title}</h3>
              {project.featured && (
                <Star className="w-4 h-4" style={{ color: project.color }} />
              )}
            </div>
            <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-auto pb-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/70 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <a
                href={`/projects/${project.slug}`}
                className="flex items-center gap-1 text-sm hover:gap-2 transition-all flex-1"
                style={{ color: project.color }}
              >
                View Case <ArrowRight className="w-4 h-4" />
              </a>
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Glow effect on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              boxShadow: `inset 0 0 40px ${project.color}20, 0 0 40px ${project.color}15`,
            }}
          />
        </div>
      </motion.div>
    </Card3DParallax>
  )
}

// Featured project hero with 3D abstract visualization
function FeaturedProjectHero({ project }: { project: typeof projects[0] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const depth = use3DDepth(0.4)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      className="glass-card overflow-hidden max-w-6xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* 3D Abstract visualization */}
        <div
          className="relative aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-cosmic-deep/70 to-cosmic-void flex items-center justify-center overflow-hidden"
          style={{
            transform: `perspective(1200px) rotateX(${depth.rotateX * 0.2}deg) rotateY(${depth.rotateY * 0.2}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Animated 3D background */}
          <div className="absolute inset-0">
            {/* Rotating cube */}
            <motion.div
              animate={{ rotateX: 360, rotateY: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ perspective: '1000px' }}
            >
              <div
                className="w-40 h-40"
                style={{
                  background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)`,
                  border: `2px solid ${project.color}`,
                  borderRadius: '8px',
                }}
              />
            </motion.div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 3) * 100, 0],
                  y: [0, Math.sin(i * Math.PI / 3) * 100, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  background: project.color,
                  left: '50%',
                  top: '50%',
                  boxShadow: `0 0 15px ${project.color}`,
                  marginLeft: '-5px',
                  marginTop: '-5px',
                }}
              />
            ))}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cosmic-void lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void to-transparent lg:hidden" />

          {/* Icon overlay */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                border: `2px solid ${project.color}`,
              }}
            >
              <project.icon className="w-10 h-10" style={{ color: project.color }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit"
            style={{
              background: `${project.color}20`,
              color: project.color,
            }}
          >
            <Star className="w-3 h-3" />
            Featured Project
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {project.title}
          </h2>

          <p className="text-white/60 mb-6">{project.long_description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-white/5 text-white/70 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 font-medium hover:gap-4 transition-all"
            style={{ color: project.color }}
          >
            View Full Project <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  )

  const featuredProject = projects.find((p) => p.featured)

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-accent/10 border border-cosmic-accent/20 text-cosmic-accent text-sm mb-6">
              <Code className="w-4 h-4" />
              Selected Works
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-white">My</span>
              <br />
              <span className="text-gradient-animated">Projects</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              A showcase of projects that demonstrate my skills in full-stack development,
              AI integration, and creative web experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className="section-padding pt-0">
          <div className="container mx-auto px-4">
            <FeaturedProjectHero project={featuredProject} />
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="section-padding pt-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-hover ${
                  activeCategory === cat
                    ? 'bg-cosmic-accent text-white'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-cosmic-void via-cosmic-deep/30 to-cosmic-void">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center max-w-2xl mx-auto">
            <Cpu className="w-12 h-12 text-cosmic-accent mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Have a Project in <span className="text-gradient">Mind</span>?
            </h2>
            <p className="text-white/60 mb-8">
              Let's collaborate and build something amazing together.
            </p>
            <motion.a
              href="/store"
              className="magnetic-btn inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Your Project</span>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}
