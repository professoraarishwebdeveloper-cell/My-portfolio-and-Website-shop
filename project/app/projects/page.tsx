'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, Star, Code, Layers, Globe, Cpu, TrendingUp, Zap, Bot } from 'lucide-react'

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

// Project card component
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card overflow-hidden cursor-hover group"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-cosmic-void/30 to-transparent" />

        {/* Category badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
          style={{
            background: `${project.color}20`,
            border: `1px solid ${project.color}40`,
            color: project.color,
          }}
        >
          {project.category}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-cosmic-accent/20 border border-cosmic-accent/30 text-cosmic-accent text-xs flex items-center gap-1">
            <Star className="w-3 h-3" /> Featured
          </div>
        )}

        {/* Icon overlay */}
        <div
          className="absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${project.color}30` }}
        >
          <project.icon className="w-6 h-6" style={{ color: project.color }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-white group-hover:text-cosmic-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm mt-2 line-clamp-2">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/70 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10">
          <a
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-cosmic-accent text-sm hover:gap-2 transition-all"
          >
            View Case Study <ArrowRight className="w-4 h-4" />
          </a>
          <div className="flex-1" />
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Featured project hero
function FeaturedProjectHero({ project }: { project: typeof projects[0] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      className="glass-card overflow-hidden max-w-6xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative aspect-[16/10] lg:aspect-auto">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cosmic-void lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void to-transparent lg:hidden" />
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
            className="inline-flex items-center gap-2 text-cosmic-accent font-medium hover:gap-4 transition-all"
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
