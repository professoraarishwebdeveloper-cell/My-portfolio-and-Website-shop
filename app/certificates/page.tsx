'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { AlertCircle, Award, Building2, Calendar, ExternalLink, Loader2, X } from 'lucide-react'
import { Card3DParallax } from '@/components/3d-parallax-card'
import { CERTIFICATE_FALLBACKS } from '@/lib/site-content'

const certificateAccents = [
  'from-sky-400/25 via-cyan-300/20 to-blue-500/20',
  'from-amber-300/25 via-orange-300/20 to-rose-400/20',
  'from-emerald-300/25 via-teal-300/20 to-sky-400/20',
  'from-violet-400/20 via-fuchsia-300/20 to-sky-400/20',
]

type Certificate = {
  id: string
  title: string
  issuing_organization: string
  issue_date: string
  description: string
  image_url?: string
  credential_url?: string
}

const CertificateCard = ({ certificate, onClick, index }: { certificate: Certificate; onClick: () => void; index: number }) => {
  const accent = certificateAccents[index % certificateAccents.length]
  const hasImage = Boolean(certificate.image_url)

  return (
    <Card3DParallax intensity={0.6} delay={index * 0.08}>
      <motion.button onClick={onClick} whileHover={{ y: -6 }} className="group relative h-full w-full text-left">
        <div className="premium-shell flex h-full flex-col rounded-[28px] p-5">
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-[24px] ${hasImage ? 'bg-cover bg-center' : `bg-gradient-to-br ${accent}`}`}
            style={hasImage ? { backgroundImage: `url(${certificate.image_url})` } : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent" />
            {!hasImage && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_42%)]" />
            )}
            <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/85">
              Credential
            </div>
          </div>

          <div className="flex flex-1 flex-col p-2 pt-6">
            <h3 className="text-lg font-bold text-white line-clamp-2">{certificate.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-200">{certificate.description}</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-5 text-xs text-slate-200">
              <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {certificate.issuing_organization}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(certificate.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
            </div>
          </div>
        </div>
      </motion.button>
    </Card3DParallax>
  )
}

const CertificateModal = ({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-cosmic-void/90 p-4 backdrop-blur-xl"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="premium-shell relative w-full max-w-4xl rounded-[32px] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#111a2f] text-white hover:bg-white/[0.12]">
        <X className="h-5 w-5" />
      </button>

      <div className="bg-gradient-to-br from-[#79e0ff]/20 via-[#5e8bff]/10 to-[#ff8b5b]/12 p-8 md:p-10">
        <div className="inline-flex rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/85">
          Certificate detail
        </div>
        <h2 className="mt-5 text-3xl font-bold text-white">{certificate.title}</h2>
        <p className="mt-3 text-sm text-slate-200">{certificate.issuing_organization}</p>
      </div>

      <div className="p-8 md:p-10">
        <p className="font-medium leading-8 text-slate-200">{certificate.description}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-200">
          <span className="rounded-full border border-white/10 bg-brand-surface px-4 py-2">
            Issued {new Date(certificate.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </span>
          <span className="rounded-full border border-white/10 bg-brand-surface px-4 py-2">
            Professional development
          </span>
        </div>
        {certificate.credential_url && (
          <a href={certificate.credential_url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-cosmic-accent hover:underline">
            View Credential <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
)

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Certificate | null>(null)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data, error } = await supabase.from('certificates').select('*').order('issue_date', { ascending: false })

        if (error || !data?.length) {
          if (error) {
            console.warn('Failed to fetch certificates, using fallback data.', error)
          }
          setCertificates(CERTIFICATE_FALLBACKS)
          setError(error ? 'Could not load live certificates. Showing curated credentials instead.' : null)
        } else {
          setCertificates(data)
        }
      } catch (err) {
        console.warn('Using fallback certificates.', err)
        setCertificates(CERTIFICATE_FALLBACKS)
        setError('Could not load live certificates. Showing curated credentials instead.')
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  return (
    <div className="relative min-h-screen pb-20 pt-32">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-brand-accent">
            <Award className="h-4 w-4" />
            Credentials
          </div>
          <h1 className="mb-6 mt-5 text-5xl font-display font-bold text-white drop-shadow-lg md:text-7xl">Certificates</h1>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-[1.8] text-slate-200">
            A professional credentials section with clean presentation, clearer context, and no placeholder dead ends.
          </p>
        </motion.div>

        {error && (
          <div className="premium-shell mb-8 rounded-[24px] p-4 text-center text-sm text-yellow-200">
            <AlertCircle className="mr-2 inline h-5 w-5" /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex h-64 items-center justify-center"><Loader2 className="h-12 w-12 animate-spin" /></div>
        ) : (
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => (
              <CertificateCard key={certificate.id} certificate={certificate} onClick={() => setSelected(certificate)} index={index} />
            ))}
          </div>
        )}

        <div className="mx-auto mt-20 grid max-w-4xl gap-8 text-center md:grid-cols-3">
          <div className="glass-card p-8"><div className="mb-2 text-4xl font-bold text-white">8+</div><div className="text-slate-200">Certificates</div></div>
          <div className="glass-card p-8"><div className="mb-2 text-4xl font-bold text-white">100+</div><div className="text-slate-200">Hours of Training</div></div>
          <div className="glass-card p-8"><div className="mb-2 text-4xl font-bold text-white">Ongoing</div><div className="text-slate-200">Commitment to Growth</div></div>
        </div>
      </div>

      {selected && <CertificateModal certificate={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
