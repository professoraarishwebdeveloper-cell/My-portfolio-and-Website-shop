'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Code,
  Globe,
  Layers,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { HeroSphere } from '@/components/hero-sphere'
import { CounterStat } from '@/components/counter-stat'
import { ScrollTree } from '@/components/scroll-tree'
import { TiltCard } from '@/components/tilt-card'
import { SectionReveal } from '@/components/section-reveal'
import { CtaBanner } from '@/components/cta-banner'
import {
  BRAND,
  CONTACT_DETAILS,
  DELIVERY_PROCESS,
  SHOWCASE_PROJECTS,
  TESTIMONIALS,
  TRUST_SIGNALS,
  normalizeProject,
  type ShowcaseProject,
} from '@/lib/site-content'

const FALLBACK_HERO = {
  title: 'AARISH',
  subtitle: 'KHATIB',
  roles: ['Creative Developer', 'Agency Website Builder', 'AI Systems Partner'],
  description: BRAND.description,
}

const FALLBACK_SERVICES = [
  {
    title: 'Premium Website Development',
    description: 'Brand-forward websites with stronger hierarchy, faster trust, and a launch-ready frontend.',
    icon: Globe,
  },
  {
    title: 'Dashboard and Product UI',
    description: 'Cleaner interfaces for data-heavy products, admin systems, and modern internal tools.',
    icon: Layers,
  },
  {
    title: 'AI Integration',
    description: 'Practical AI features, assistants, and automation layers built around real business workflows.',
    icon: Bot,
  },
]

const HOME_STATS = [
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 15, suffix: '+', label: 'Technologies' },
  { value: 8, suffix: '+', label: 'Certificates' },
  { value: 12, suffix: '+', label: 'Clients' },
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

function HomeServiceCard({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string
  description: string
  icon: React.ElementType
  index: number
}) {
  return (
    <SectionReveal delay={index * 0.08}>
      <TiltCard className="h-full">
        <div className="glass-card glass-card-hover h-full p-7">
          <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-[#8d7d6b]/35 p-3 text-[#f5eadb]">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
          <p className="text-sm font-medium leading-7 text-slate-200">{description}</p>
        </div>
      </TiltCard>
    </SectionReveal>
  )
}

function ProjectPreviewCard({ project, index }: { project: ShowcaseProject; index: number }) {
  return (
    <SectionReveal delay={index * 0.08}>
      <TiltCard className="h-full">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          className="premium-shell group relative flex h-full flex-col overflow-hidden rounded-[28px] p-6"
        >
          <div className={`relative overflow-hidden rounded-[24px] bg-gradient-to-br ${project.accent} p-5`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_42%)]" />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">{project.category}</p>
                <h3 className="mt-3 text-2xl font-bold text-white">{project.title}</h3>
              </div>
              <div className="rounded-full border border-white/20 bg-black/15 px-3 py-1 text-xs text-white/90">
                {project.status}
              </div>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-2">
              {project.metrics.map((metric) => (
                <div key={metric} className="rounded-2xl border border-white/15 bg-black/15 px-3 py-3 text-xs text-white/85">
                  {metric}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-1 flex-col">
            <p className="text-sm font-medium leading-7 text-slate-200">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-brand-surface px-3 py-1 text-xs text-slate-200">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-brand-accent">Outcome</p>
              <p className="mt-2 text-sm leading-7 text-slate-200">{project.outcome}</p>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </SectionReveal>
  )
}

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [heroData, setHeroData] = useState(FALLBACK_HERO)
  const [services, setServices] = useState(FALLBACK_SERVICES)
  const [projects, setProjects] = useState<ShowcaseProject[]>(SHOWCASE_PROJECTS.slice(0, 3))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: configData },
          { data: servicesData, error: servicesError },
          { data: projectsData, error: projectsError },
        ] = await Promise.all([
          supabase.from('site_config').select('key, value'),
          supabase.from('services').select('name, description').order('order_index', { ascending: true }).limit(3),
          supabase
            .from('projects')
            .select('id, slug, title, description, long_description, category, technologies, featured, live_url')
            .order('order_index', { ascending: true }),
        ])

        const config: Record<string, string> =
          configData?.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}) ?? {}

        const parsedRoles = config.hero_roles ? JSON.parse(config.hero_roles) : FALLBACK_HERO.roles

        setHeroData({
          title: config.hero_title || FALLBACK_HERO.title,
          subtitle: config.hero_subtitle || FALLBACK_HERO.subtitle,
          roles: Array.isArray(parsedRoles) && parsedRoles.length ? parsedRoles : FALLBACK_HERO.roles,
          description: config.hero_description || FALLBACK_HERO.description,
        })

        if (servicesData?.length) {
          setServices(
            servicesData.map((service, index) => ({
              title: service.name,
              description: service.description || FALLBACK_SERVICES[index % FALLBACK_SERVICES.length].description,
              icon: FALLBACK_SERVICES[index % FALLBACK_SERVICES.length].icon,
            }))
          )
        }

        if (!projectsError && projectsData?.length) {
          const normalized = projectsData.map((project, index) => normalizeProject(project, index))
          const featured = normalized.filter((project) => project.featured).slice(0, 3)
          setProjects((featured.length ? featured : normalized).slice(0, 3))
        } else if (projectsError) {
          console.warn('Using fallback homepage projects.', projectsError)
        }

        if (servicesError) {
          console.warn('Using fallback homepage services.', servicesError)
        }
      } catch (error) {
        console.warn('Using fallback homepage content.', error)
        setHeroData(FALLBACK_HERO)
        setServices(FALLBACK_SERVICES)
        setProjects(SHOWCASE_PROJECTS.slice(0, 3))
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
        <div className="absolute left-[6%] top-24 h-40 w-40 rounded-full bg-[#efe3d1]/24 blur-3xl" />
        <div className="absolute right-[8%] top-36 h-44 w-44 rounded-full bg-[#d8c6ae]/18 blur-3xl" />
        <div className="absolute bottom-16 left-[40%] h-52 w-52 rounded-full bg-[#f5eadb]/24 blur-3xl" />

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
              className="brand-pill mb-5 text-sm"
            >
              <Sparkles className="h-4 w-4 text-[#f5eadb]" />
              Premium creative developer for trust-first digital experiences
            </motion.div>

            <h1 className="text-5xl font-bold leading-[1.02] text-white drop-shadow-lg md:text-7xl lg:text-8xl">
              <span className="block">{heroData.title}</span>
              <span className="text-gradient-animated mt-1 block">{heroData.subtitle}</span>
            </h1>

            <div className="my-6 flex flex-wrap gap-3">
              {heroData.roles.map((role: string, i: number) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="rounded-full border border-white/10 bg-[#11233c] px-4 py-2 text-sm text-white"
                >
                  {role}
                </motion.span>
              ))}
            </div>

            <p className="my-8 max-w-2xl text-lg font-medium leading-[1.8] text-slate-200">{heroData.description}</p>

            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              <a href={CONTACT_DETAILS.emailHref} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-100 transition-all hover:border-brand-accent/30 hover:text-white">
                Email
              </a>
              <a href={CONTACT_DETAILS.phoneHref} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-100 transition-all hover:border-brand-accent/30 hover:text-white">
                Call
              </a>
              <a
                href={CONTACT_DETAILS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-100 transition-all hover:border-brand-accent/30 hover:text-white"
              >
                WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              <MagneticButton href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
              <Link href="/store">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-secondary rounded-full px-6 py-4 text-sm font-semibold"
                >
                  Configure your website
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f5eadb]">Growth in numbers</p>
            <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-lg md:text-4xl">Credibility at a glance</h2>
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f5eadb]">What we build</p>
            <h2 className="mb-4 mt-3 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">Services that feel premium before launch</h2>
            <p className="mx-auto max-w-2xl font-medium leading-[1.8] text-slate-200">
              Every engagement is designed to improve trust, clarity, and perceived value, not just add another website to the internet.
            </p>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <HomeServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative z-20">
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f5eadb]">Selected work</p>
              <h2 className="mb-4 mt-3 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">Projects that prove the standard</h2>
              <p className="font-medium leading-[1.8] text-slate-200">
                Projects should lead with clear outcomes, strong context, and polished case studies that feel complete and credible.
              </p>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-brand-accent hover:text-white">
              Explore all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectPreviewCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative z-20">
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f5eadb]">Trust layer</p>
            <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">Professional signals clients notice immediately</h2>
          </SectionReveal>

          <div className="grid gap-6 lg:grid-cols-4">
            {TRUST_SIGNALS.map((signal, index) => (
              <SectionReveal key={signal.title} delay={index * 0.08}>
                <div className="premium-shell rounded-[28px] p-6">
                  <div className="inline-flex rounded-2xl border border-white/10 bg-[#8d7d6b]/35 p-3 text-[#f5eadb]">
                    {index === 0 && <MessageCircle className="h-5 w-5" />}
                    {index === 1 && <Zap className="h-5 w-5" />}
                    {index === 2 && <Star className="h-5 w-5" />}
                    {index === 3 && <ShieldCheck className="h-5 w-5" />}
                  </div>
                  <p className="mt-6 text-2xl font-bold text-white">{signal.value}</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">{signal.title}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-200">{signal.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative z-20">
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f5eadb]">Delivery process</p>
            <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">A clear path from brief to launch</h2>
          </SectionReveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {DELIVERY_PROCESS.map((step, index) => (
              <SectionReveal key={step.title} delay={index * 0.08}>
                <div className="glass-card h-full p-6">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#8d7d6b]/35 text-lg font-bold text-[#f5eadb]">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-200">{step.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative z-20">
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f5eadb]">Testimonials</p>
            <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">Feedback that sounds like real clients</h2>
          </SectionReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {TESTIMONIALS.map((testimonial, index) => (
              <SectionReveal key={testimonial.name} delay={index * 0.08}>
                <div className="premium-shell rounded-[28px] p-7">
                  <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-[#f5eadb]">
                    Client feedback
                  </div>
                  <p className="text-lg leading-8 text-slate-100">"{testimonial.quote}"</p>
                  <div className="mt-6">
                    <p className="text-base font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-300">{testimonial.business}</p>
                  </div>
                </div>
              </SectionReveal>
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
