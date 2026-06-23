'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { HeroSphere } from '@/components/hero-sphere'
import { CounterStat } from '@/components/counter-stat'
import { ScrollTree } from '@/components/scroll-tree'
import { TiltCard } from '@/components/tilt-card'
import { SectionReveal } from '@/components/section-reveal'
import { CtaBanner } from '@/components/cta-banner'

import { Loader2, ArrowRight, Sparkles, Code, Palette, Cpu, Rocket, Lightbulb, Star } from 'lucide-react'
import Link from 'next/link'

const ICONS: { [key: string]: React.ElementType } = {
  Sparkles, Code, Palette, Cpu, Rocket, Lightbulb, Star,
}

const FALLBACK_HERO = {
  title: 'AARISH',
  subtitle: 'KHATIB',
  roles: ['Creative Developer', 'Digital Architect', 'AI Builder'],
  description:
    'Premium digital agency craftsmanship — websites, product design, and growth-focused experiences built to perform.',
}

const FALLBACK_SERVICES = [
  { title: 'Web Development', description: 'Full-stack products with React, Next.js, and modern architecture.', icon: 'Code' },
  { title: 'UI/UX Design', description: 'Clean interfaces with depth, motion, and conversion-focused layouts.', icon: 'Palette' },
  { title: 'AI Integration', description: 'Intelligent features powered by modern AI APIs and automation.', icon: 'Sparkles' },
]

const FALLBACK_PROJECTS = [
  {
    title: 'Agency Platform',
    description: 'A premium agency site with animated hero, configurator, and dashboard.',
    technologies: ['Next.js', 'Supabase', 'Framer Motion'],
    icon: 'Rocket',
  },
  {
    title: 'E-Commerce Suite',
    description: 'Conversion-ready storefront with polished checkout and admin tooling.',
    technologies: ['React', 'Tailwind', 'Stripe'],
    icon: 'Cpu',
  },
  {
    title: 'Portfolio System',
    description: 'Cinematic personal brand experience with 3D visuals and smooth scroll.',
    technologies: ['Three.js', 'GSAP', 'TypeScript'],
    icon: 'Star',
  },
]

const HOME_STATS = [
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 12, suffix: '', label: 'Technologies' },
  { value: 8, suffix: '', label: 'Certificates' },
  { value: 6, suffix: '', label: 'Clients' },
]

const MagneticButton = ({ children, href }: { children: ReactNode; href: string }) => (
  <Link href={href} passHref>
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="magnetic-btn rounded-full px-6 py-4"
    >
      <span className="relative z-10 flex items-center gap-2 text-sm font-semibold">{children}</span>
    </motion.div>
  </Link>
)

const ShowcaseCard = ({
  title,
  description,
  technologies,
  icon,
  index,
}: {
  title: string
  description: string
  technologies: string[]
  icon: string
  index: number
}) => {
  const Icon = ICONS[icon] || Code
  return (
    <SectionReveal delay={index * 0.1}>
      <TiltCard className="h-full">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="glass-card glass-card-hover group relative flex h-full flex-col overflow-hidden border border-white/10 p-7 shadow-2xl"
        >
          <div className="relative z-20">
            <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-[#1e1a38] p-3 text-[#5EAEF9]">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white drop-shadow-lg">{title}</h3>
            <p className="mb-5 flex-grow text-sm font-medium leading-6 text-slate-200">{description}</p>
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-[#1e1a38] px-3 py-1 text-xs text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </TiltCard>
    </SectionReveal>
  )
}

export default function HomePage() {
    const [loading, setLoading] = useState(true)
    const [heroData, setHeroData] = useState<any>(FALLBACK_HERO)
    const [services, setServices] = useState<any[]>(FALLBACK_SERVICES)
    const [projects, setProjects] = useState<any[]>(FALLBACK_PROJECTS)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: configData, error: configError },
          { data: servicesData, error: servicesError },
          { data: projectsData, error: projectsError },
        ] = await Promise.all([
          supabase.from('site_config').select('key, value'),
          supabase.from('services').select('title, description, icon').limit(3),
          supabase.from('projects').select('title, description, technologies, icon').eq('featured', true).limit(3),
        ])

        const config: { [key: string]: any } =
          configData?.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}) || {}

        setHeroData({
          title: config.hero_title || FALLBACK_HERO.title,
          subtitle: config.hero_subtitle || FALLBACK_HERO.subtitle,
          roles: config.hero_roles ? JSON.parse(config.hero_roles) : FALLBACK_HERO.roles,
          description: config.hero_description || FALLBACK_HERO.description,
        })

        setServices(servicesData?.length ? servicesData : FALLBACK_SERVICES)
        setProjects(projectsData?.length ? projectsData : FALLBACK_PROJECTS)

        if (configError || servicesError || projectsError) {
          console.warn('Using fallback homepage content.', configError || servicesError || projectsError)
        }
      } catch {
        setHeroData(FALLBACK_HERO)
        setServices(FALLBACK_SERVICES)
        setProjects(FALLBACK_PROJECTS)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-brand-accent" />
      </div>
    )
  }

  return (
    <div className="relative z-20 overflow-hidden">
      <section className="relative z-20 min-h-screen overflow-hidden pt-24">
        <div className="relative z-20 mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#16132b]/90 px-4 py-2 text-sm text-slate-100 shadow-2xl backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-[#5EAEF9]" />
              Creative digital agency
            </motion.div>

            <h1 className="text-5xl font-bold leading-[1.02] text-white drop-shadow-lg md:text-7xl lg:text-8xl">
              <span className="block">{heroData?.title}</span>
              <span className="text-gradient-animated mt-1 block">{heroData?.subtitle}</span>
            </h1>

            <div className="my-6 flex flex-wrap gap-3">
              {heroData?.roles.map((role: string, i: number) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="rounded-full border border-white/10 bg-[#1e1a38] px-4 py-2 text-sm text-white"
                >
                  {role}
                </motion.span>
              ))}
            </div>

            <p className="my-8 max-w-2xl text-lg font-medium leading-[1.8] text-slate-200">{heroData?.description}</p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton href="/store">
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-secondary rounded-full px-6 py-4 text-sm font-semibold"
                >
                  Start a Project
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex min-h-[420px] items-center justify-center lg:min-h-[680px]"
          >
            <div className="relative z-10 h-full w-full">
              <HeroSphere />
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <div className="hidden lg:block">
                  <ScrollTree />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding relative z-20">
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5EAEF9]">Growth in numbers</p>
            <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-lg md:text-4xl">Trusted results</h2>
          </SectionReveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {HOME_STATS.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.08}>
                <CounterStat value={stat.value} suffix={stat.suffix} label={stat.label} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative z-20">
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5EAEF9]">What we do</p>
            <h2 className="mb-4 mt-3 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">Featured Expertise</h2>
            <p className="mx-auto max-w-2xl font-medium leading-[1.8] text-slate-200">
              Specialized capabilities for modern digital challenges — polished, animated, and built for real growth.
            </p>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <ShowcaseCard
                key={service.title}
                title={service.title}
                description={service.description}
                technologies={[]}
                icon={service.icon}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative z-20">
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5EAEF9]">Selected work</p>
            <h2 className="mb-4 mt-3 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">Featured Projects</h2>
            <p className="mx-auto max-w-2xl font-medium leading-[1.8] text-slate-200">
              A compact gallery of work that sets the tone for the rest of the site.
            </p>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, i) => (
              <ShowcaseCard
                key={project.title}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                icon={project.icon}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative z-20 pb-8">
        <div className="container mx-auto px-4">
          <CtaBanner />
        </div>
      </section>
    </div>
  )
}
