'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { HeroSphere } from '@/components/hero-sphere'
import { StarField } from '@/components/star-field'
import { CounterStat } from '@/components/counter-stat'
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
            className="magnetic-btn">
            {children}
        </motion.div>
    </Link>
);

const ShowcaseCard = ({ title, description, technologies, icon }: { title: string, description: string, technologies: string[], icon: string }) => {
    const Icon = ICONS[icon] || Code;
    return (
        <div className="glass-card p-8 h-full flex flex-col">
            <Icon className="w-8 h-8 mb-4 text-cosmic-accent" />
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/60 text-sm mb-4 flex-grow">{description}</p>
            <div className="flex flex-wrap gap-2">
                {technologies.map(tech => <span key={tech} className="px-2 py-1 text-xs rounded bg-white/10">{tech}</span>)}
            </div>
        </div>
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
            
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <HeroSphere />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center px-4">
                    <h1 className="text-6xl md:text-8xl font-bold">
                        <span className="block text-white">{heroData?.title}</span>
                        <span className="block text-gradient-animated">{heroData?.subtitle}</span>
                    </h1>
                    <div className="flex flex-wrap justify-center gap-3 my-6">
                        {heroData?.roles.map((role: string) => <span key={role} className="px-4 py-2 text-sm rounded-full bg-white/10">{role}</span>)}
                    </div>
                    <p className="text-white/70 max-w-2xl mx-auto my-8">{heroData?.description}</p>
                    <div className="flex justify-center gap-4">
                        <MagneticButton href="/store">Explore Services <ArrowRight className="w-4 h-4 ml-2"/></MagneticButton>
                        <MagneticButton href="/contact">Start a Project</MagneticButton>
                    </div>
                </motion.div>
            </section>

            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map(stat => <CounterStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />)}
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Featured Expertise</h2>
                        <p className="text-white/60 max-w-2xl mx-auto">Specialized capabilities for modern digital challenges.</p>
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