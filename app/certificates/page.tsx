'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Award, ExternalLink, X, Calendar, Building2, Loader2, AlertCircle } from 'lucide-react'
import { Card3DParallax } from '@/components/3d-parallax-card'

// Static data as fallback
const staticCertificates = [
  {
    id: '1', title: 'Static Fallback Certificate', organization: 'Fallback Org', date: '2024-01-01',
    description: 'This is displayed when live data fails to load.',
    image_url: '/static/fallback.png',
    credential_url: '#',
    color: '#8b5cf6'
  },
];

const CertificateCard = ({ certificate, onClick, index }: { certificate: any, onClick: () => void, index: number }) => (
  <Card3DParallax intensity={0.6} delay={index * 0.1}>
    <motion.div
      onClick={onClick}
      className="group cursor-pointer relative h-full"
    >
      <div className="relative glass-card overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${certificate.image_url})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-transparent to-transparent" />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors line-clamp-2">
            {certificate.title}
          </h3>
          <div className="mt-auto flex flex-wrap gap-3 pt-4 text-xs text-[#CBD5E1]">
            <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {certificate.organization}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(certificate.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
          </div>
        </div>
      </div>
    </motion.div>
  </Card3DParallax>
);

const CertificateModal = ({ certificate, onClose }: { certificate: any, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-void/90 backdrop-blur-xl"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      className="relative max-w-4xl w-full glass-card overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.09] text-white hover:bg-white/[0.12]">
        <X className="w-5 h-5" />
      </button>
      <div className="aspect-[16/9] w-full bg-cover bg-center" style={{ backgroundImage: `url(${certificate.image_url})` }}/>
      <div className="p-8">
        <h2 className="text-3xl font-bold text-white mt-2">{certificate.title}</h2>
        <p className="mt-4 font-medium leading-[1.8] text-[#CBD5E1]">{certificate.description}</p>
        {certificate.credential_url && (
          <a href={certificate.credential_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 text-cosmic-accent hover:underline">
            View Credential <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
);

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<any | null>(null)

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data, error } = await supabase.from('certificates').select('*').order('date', { ascending: false });
      
      if (error) {
        console.warn('Failed to fetch certificates, using fallback data.', error);
        setError('Could not load certificates. Displaying static data as fallback.');
        setCertificates(staticCertificates);
      } else {
        setCertificates(data);
      }
      setLoading(false);
    }
    fetchCertificates();
  }, [])

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gradient-animated">Certificates</h1>
            <p className="mx-auto max-w-2xl text-lg font-medium leading-[1.8] text-[#CBD5E1]">A showcase of my professional certifications and achievements.</p>
        </motion.div>

        {error && (
          <div className="mb-8 p-4 glass-card text-center text-yellow-400 flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64"><Loader2 className="w-12 h-12 animate-spin" /></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certificates.map((cert, index) => (
              <CertificateCard key={cert.id} certificate={cert} onClick={() => setSelected(cert)} index={index} />
            ))}
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center mt-20">
            <div className="glass-card p-8"><div className="mb-2 text-4xl font-bold text-cosmic-accent">{loading ? '-' : certificates.length}+</div><div className="text-[#CBD5E1]">Certifications</div></div>
            <div className="glass-card p-8"><div className="mb-2 text-4xl font-bold text-cosmic-accent">100+</div><div className="text-[#CBD5E1]">Hours of Training</div></div>
            <div className="glass-card p-8"><div className="mb-2 text-4xl font-bold text-cosmic-accent">∞</div><div className="text-[#CBD5E1]">Commitment to Growth</div></div>
        </div>
      </div>

      {selected && <CertificateModal certificate={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
