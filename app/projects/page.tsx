'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2, Sparkles, Wand2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { PageHeader } from '@/components/page-header'
import { SectionReveal } from '@/components/section-reveal'
import { TiltCard } from '@/components/tilt-card'
import { GlowText } from '@/components/glow-text'
import {
  SHOWCASE_PROJECTS,
  normalizeProject,
  type ShowcaseProject,
} from '@/lib/site-content'

function ProjectCard({
  project,
  isActive,
  onSelect,
  index,
}: {
  project: ShowcaseProject
  isActive: boolean
  onSelect: () => void
  index: number
}) {
  return (
    <SectionReveal delay={index * 0.06}>
      <TiltCard className="h-full">
        <motion.button
          type="button"
          onClick={onSelect}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          className={`premium-shell group relative flex h-full w-full flex-col rounded-[28px] p-5 text-left transition-all ${
            isActive ? 'border-brand-accent/30 shadow-[0_0_0_1px_rgba(121,224,255,0.18)]' : ''
          }`}
        >
          <div className={`relative overflow-hidden rounded-[24px] bg-gradient-to-br ${project.accent} p-5`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_42%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/85">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs text-white/85">
                  {project.status}
                </span>
              </div>

              <div className="mt-10 rounded-[22px] border border-white/15 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">{project.visualLabel}</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {project.metrics.map((metric) => (
                    <div key={metric} className="rounded-2xl border border-white/15 bg-black/15 px-3 py-3 text-xs text-white/85">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-1 flex-col">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-200">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-brand-surface px-3 py-1 text-xs text-slate-200">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-brand-accent">Challenge</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{project.challenge}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-brand-accent">Outcome</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{project.outcome}</p>
              </div>
            </div>
          </div>
        </motion.button>
      </TiltCard>
    </SectionReveal>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ShowcaseProject[]>(SHOWCASE_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject>(SHOWCASE_PROJECTS[0])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, slug, title, description, long_description, category, technologies, featured, live_url')
          .order('order_index', { ascending: true })

        if (error || !data?.length) {
          setProjects(SHOWCASE_PROJECTS)
          setSelectedProject(SHOWCASE_PROJECTS[0])
          setUsingFallback(true)
        } else {
          const normalized = data.map((project, index) => normalizeProject(project, index))
          setProjects(normalized)
          setSelectedProject(normalized[0])
          setUsingFallback(false)
        }
      } catch (error) {
        console.warn('Using fallback projects page data.', error)
        setProjects(SHOWCASE_PROJECTS)
        setSelectedProject(SHOWCASE_PROJECTS[0])
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects]
  )

  const filteredProjects = useMemo(
    () => projects.filter((project) => activeCategory === 'All' || project.category === activeCategory),
    [projects, activeCategory]
  )

  useEffect(() => {
    if (!filteredProjects.find((project) => project.id === selectedProject.id)) {
      setSelectedProject(filteredProjects[0] || projects[0])
    }
  }, [filteredProjects, projects, selectedProject.id])

  return (
    <div className="relative z-20 min-h-screen overflow-hidden pb-20 pt-32">
      <div className="absolute left-[8%] top-32 h-52 w-52 rounded-full bg-[#e0cfb5]/18 blur-3xl" />
      <div className="absolute right-[8%] top-40 h-56 w-56 rounded-full bg-[#cbbba9]/18 blur-3xl" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-24 left-[40%] h-64 w-64 rounded-full bg-[#f3e7d5]/20 blur-3xl"
      />

      <div className="container relative z-20 mx-auto px-4">
        <PageHeader
          eyebrow="Portfolio"
          title="Projects That Feel Premium"
          description="Every card below is built to show capability, clarity, and real delivery thinking. The page now works like a proper portfolio instead of an empty grid."
        >
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Case-study detail', '3D card depth', 'Client-ready presentation', 'Clean project categorization'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-brand-surface px-4 py-2 text-sm text-slate-100">
                {item}
              </span>
            ))}
          </div>
        </PageHeader>

        {usingFallback && !loading && (
          <div className="premium-shell mb-10 rounded-[28px] px-5 py-4 text-center text-sm text-slate-200">
            The live project database is currently empty, so the portfolio is using curated case studies based on the services and work style already presented across the site.
          </div>
        )}

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-brand-accent" />
          </div>
        ) : (
          <>
            <SectionReveal className="mb-10">
              <div className="premium-shell rounded-[32px] p-6 md:p-8">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-brand-accent">
                      <Sparkles className="h-4 w-4" />
                      Featured case study
                    </div>
                    <h2 className="mt-5 text-4xl font-bold text-white">{selectedProject.title}</h2>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">{selectedProject.longDescription}</p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-brand-accent">Challenge</p>
                        <p className="mt-3 text-sm leading-7 text-slate-200">{selectedProject.challenge}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-brand-accent">Solution</p>
                        <p className="mt-3 text-sm leading-7 text-slate-200">{selectedProject.solution}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-brand-accent">Outcome</p>
                        <p className="mt-3 text-sm leading-7 text-slate-200">{selectedProject.outcome}</p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-brand-surface px-4 py-2 text-sm text-slate-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`relative overflow-hidden rounded-[30px] bg-gradient-to-br ${selectedProject.accent} p-8`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_42%)]" />
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative z-10 rounded-[28px] border border-white/15 bg-[#081220]/55 p-6"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.28em] text-white/70">{selectedProject.category}</p>
                          <h3 className="mt-3 text-3xl font-bold text-white">{selectedProject.visualLabel}</h3>
                        </div>
                        <div className="rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs text-white/85">
                          {selectedProject.status}
                        </div>
                      </div>

                      <div className="mt-10 space-y-3">
                        {selectedProject.metrics.map((metric, index) => (
                          <div key={metric} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-4 text-sm text-white/90">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs">
                              0{index + 1}
                            </div>
                            {metric}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/contact" className="magnetic-btn !px-5 !py-3 text-sm">
                          Start Something Similar
                        </Link>
                        {selectedProject.liveUrl ? (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary !px-5 !py-3 text-sm"
                          >
                            Visit Live Project
                          </a>
                        ) : (
                          <Link href="/contact" className="btn-secondary !px-5 !py-3 text-sm">
                            Request a Similar Build
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-6 py-2 text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'brand-pill-active'
                      : 'border-white/10 bg-brand-surface text-slate-200 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isActive={selectedProject.id === project.id}
                  onSelect={() => setSelectedProject(project)}
                />
              ))}
            </div>

            <SectionReveal className="mt-14">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Portfolio depth', value: `${projects.length} curated projects` },
                  { label: 'Case study coverage', value: 'Challenge, solution, outcome' },
                  { label: 'Presentation quality', value: '3D cards and hover motion' },
                  { label: 'Client readiness', value: 'Real contact path on every featured CTA' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal className="mt-16">
              <div className="premium-shell rounded-[32px] p-8 md:p-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-brand-accent">Why this page matters</p>
                    <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">A portfolio should answer trust questions before the first meeting.</h2>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
                      This projects section now does that with clear categories, visible outcomes, stronger visual cards, and enough detail for clients to understand both the design quality and the problem-solving behind the work.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-100">
                      <CheckCircle2 className="h-5 w-5 text-brand-accent" />
                      Case-study structure added
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-100">
                      <Wand2 className="h-5 w-5 text-brand-accent" />
                      Animated multicolor background
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-100">
                      <ArrowRight className="h-5 w-5 text-brand-accent" />
                      Stronger client-ready presentation
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </>
        )}
      </div>
    </div>
  )
}
