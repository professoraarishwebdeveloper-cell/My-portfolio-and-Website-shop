'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Code, Layers, Star, Zap, Loader2, AlertCircle } from 'lucide-react'
import { Card3DParallax } from '@/components/3d-parallax-card'
import Link from 'next/link'

// Static data as fallback
const staticProjects = [
  {
    id: '1', title: 'Portfolio Website', category: 'Web', description: 'A personal portfolio to showcase my work.', 
    technologies: ['Next.js', 'Framer Motion', 'TailwindCSS'], image_url: '/static/project1.jpg',
    icon: 'Zap'
  },
  // Add a few more static projects for robust fallback
];

const ICONS: { [key: string]: React.ElementType } = {
  Zap, Star, Layers, Code, // Add other icons as needed
};

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const Icon = ICONS[project.icon] || Code;
  return (
    <Card3DParallax intensity={0.6} delay={index * 0.1}>
      <motion.div className="group h-full">
        <div className="relative glass-card overflow-hidden h-full flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${project.image_url})`}}>
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-transparent to-transparent" />
            <div className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs bg-black/50 text-white">{project.category}</div>
          </div>
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <p className="mb-4 flex-grow text-sm font-medium leading-[1.8] text-[#CBD5E1]">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.map((tech: string) => (
                <span key={tech} className="rounded-md border border-white/15 bg-white/[0.07] px-2 py-1 text-xs text-[#CBD5E1]">{tech}</span>
              ))}
            </div>
            <Link href={`/projects/${project.id}`} className="flex items-center gap-1 text-sm text-cosmic-accent hover:gap-2 transition-all">
              View Case <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </Card3DParallax>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      
      if (error) {
        console.warn('Failed to fetch projects, using fallback data.', error);
        setError('Could not load projects. Displaying static data.');
        setProjects(staticProjects);
      } else {
        setProjects(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, [])

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = projects.filter(
    p => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gradient-animated">Projects</h1>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-[1.8] text-[#CBD5E1]">A showcase of projects that demonstrate my skills in development.</p>
        </motion.div>

        {error && (
          <div className="mb-8 p-4 glass-card text-center text-yellow-400 flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64"><Loader2 className="w-12 h-12 animate-spin" /></div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded-full border px-6 py-2 text-sm font-medium transition-all ${activeCategory === cat ? 'border-cyan-300/30 bg-cyan-300 text-[#07111F]' : 'border-white/15 bg-white/[0.07] text-[#CBD5E1] hover:text-white'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
