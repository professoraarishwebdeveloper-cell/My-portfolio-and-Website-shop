'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { HeroSphere } from '@/components/hero-sphere'
import { StarField } from '@/components/star-field'
import { CounterStat } from '@/components/counter-stat'
import { ScrollTree } from '@/components/scroll-tree'
import { TiltCard } from '@/components/tilt-card'
import { Loader2, AlertCircle, ArrowRight, Sparkles, Code, Palette, Cpu, Rocket, Lightbulb, Star } from 'lucide-react'
import Link from 'next/link'

// Helper to map string names to Icon components
const ICONS: { [key: string]: React.ElementType } = {
  Sparkles, Code, Palette, Cpu, Rocket, Lightbulb, Star
};

const MagneticButton = ({ children, href }: { children: ReactNode, href: string }) => (
    <Link href={href} passHref>
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="magnetic-btn rounded-full px-6 py-4">
            <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
              {children}
            </span>
        </motion.div>
    </Link>
);

const ShowcaseCard = ({ title, description, technologies, icon }: { title: string, description: string, technologies: string[], icon: string }) => {
    const Icon = ICONS[icon] || Code;
    return (
        <TiltCard className="h-full">
            <div className="glass-card group relative flex h-full flex-col overflow-hidden p-7">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/0 via-transparent to-violet-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                    <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-200">
                        <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                    <p className="text-slate-200/90 text-sm leading-6 mb-5 flex-grow">{description}</p>
                    {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {technologies.map(tech => <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{tech}</span>)}
                        </div>
                    )}
                </div>
            </div>
        </TiltCard>
    );
};


export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [heroData, setHeroData] = useState<any>(null);
    const [stats, setStats] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data in parallel
                const [
                    { data: configData, error: configError },
                    { data: servicesData, error: servicesError },
                    { data: projectsData, error: projectsError },
                ] = await Promise.all([
                    supabase.from('site_config').select('key, value'),
                    supabase.from('services').select('title, description, icon').limit(3),
                    supabase.from('projects').select('title, description, technologies, icon').eq('featured', true).limit(3)
                ]);

                if (configError || servicesError || projectsError) {
                    throw new Error(`Failed to load site data. ${configError?.message || servicesError?.message || projectsError?.message}`);
                }

                // Process config data into a structured object
                const config: {[key: string]: any} = configData?.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}) || {};
                
                setHeroData({
                    title: config.hero_title || 'AARISH',
                    subtitle: config.hero_subtitle || 'KHATIB',
                    roles: JSON.parse(config.hero_roles || '[]'),
                    description: config.hero_description || ''
                });

                setStats(JSON.parse(config.stats || '[]'));
                setServices(servicesData || []);
                setProjects(projectsData || []);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="h-screen w-full flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin" /></div>;
    }

    if (error) {
        return <div className="h-screen w-full flex items-center justify-center text-center">
            <div className="glass-card p-8">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500"/>
                <p className="text-xl text-white">Something went wrong</p>
                <p className="text-white/60">{error}</p>
            </div>
        </div>;
    }

    return (
        <div className="relative overflow-hidden">
            <StarField />
            
            <section className="relative min-h-screen overflow-hidden pt-24">
                <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 max-w-2xl"
                    >
            <div className="mb-4 inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-slate-100/88 backdrop-blur">
                            Minimal motion. Quiet depth. Clean interaction.
                        </div>
                        <h1 className="text-5xl font-bold leading-none md:text-7xl lg:text-8xl">
                            <span className="block text-white">{heroData?.title}</span>
                            <span className="block text-gradient-animated">{heroData?.subtitle}</span>
                        </h1>
                        <div className="flex flex-wrap gap-3 my-6">
                            {heroData?.roles.map((role: string) => <span key={role} className="px-4 py-2 text-sm rounded-full bg-white/10 border border-white/10 text-white/80">{role}</span>)}
                        </div>
                        <p className="text-slate-100/92 max-w-2xl my-8 text-lg leading-relaxed">{heroData?.description}</p>
                        <div className="flex flex-wrap gap-4">
                            <MagneticButton href="/store">Explore Services <ArrowRight className="w-4 h-4 ml-2"/></MagneticButton>
                            <MagneticButton href="/contact">Start a Project</MagneticButton>
                        </div>
                    </motion.div>

                    <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[680px]">
                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cosmic-accent/10 via-transparent to-cosmic-glow/10 blur-3xl" />
                        <div className="relative h-full w-full">
                            <HeroSphere />
                            <div className="absolute inset-x-0 bottom-0 flex justify-center">
                                <div className="hidden lg:block">
                                    <ScrollTree />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {stats.map(stat => <CounterStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />)}
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Featured Expertise</h2>
                        <p className="text-slate-200/88 max-w-2xl mx-auto">Specialized capabilities for modern digital challenges, presented with a quieter, more premium hand.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {services.map(service => (
                            <ShowcaseCard key={service.title} title={service.title} description={service.description} technologies={[]} icon={service.icon} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Featured Projects</h2>
                        <p className="text-slate-200/88 max-w-2xl mx-auto">A compact gallery of the work that sets the tone for the rest of the site.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {projects.map(project => (
                            <ShowcaseCard key={project.title} title={project.title} description={project.description} technologies={project.technologies} icon={project.icon} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
