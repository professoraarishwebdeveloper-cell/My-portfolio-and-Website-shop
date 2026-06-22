'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, ExternalLink, X, Calendar, Building2 } from 'lucide-react'

// Certificate data
const certificates = [
  {
    id: 1,
    title: 'ChatGPT & AI Tools Workshop',
    organization: 'OpenAI Community',
    date: '2025-01-15',
    description: 'Comprehensive workshop on leveraging ChatGPT and AI tools for productivity and development.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    credential_url: '#',
  },
  {
    id: 2,
    title: 'Public Speaking Mastery',
    organization: 'Toastmasters International',
    date: '2024-08-20',
    description: 'Advanced public speaking certification focusing on presentation skills and audience engagement.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
    credential_url: '#',
  },
  {
    id: 3,
    title: 'Multitasking Excellence',
    organization: 'Productivity Institute',
    date: '2024-05-10',
    description: 'Certification in effective multitasking and time management strategies.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
    credential_url: '#',
  },
]

// Certificate card component
function CertificateCard({ certificate, onClick }: { certificate: typeof certificates[0]; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="glass-card overflow-hidden cursor-hover group"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={certificate.image}
          alt={certificate.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-cosmic-void/50 to-transparent opacity-60" />

        {/* Organization badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cosmic-deep/80 backdrop-blur-sm border border-white/10 text-xs text-white/80">
          {certificate.organization}
        </div>

        {/* View icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-cosmic-accent/20 backdrop-blur-sm flex items-center justify-center">
            <ExternalLink className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-white group-hover:text-cosmic-accent transition-colors">
          {certificate.title}
        </h3>

        <div className="flex items-center gap-4 mt-3 text-white/50 text-sm">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(certificate.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </span>
          <span className="flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            {certificate.organization}
          </span>
        </div>
      </div>

      {/* Glow border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: 'inset 0 0 30px rgba(0,212,255,0.2), 0 0 30px rgba(0,212,255,0.1)' }} />
      </div>
    </motion.div>
  )
}

// Lightbox modal
function CertificateModal({ certificate, onClose }: { certificate: typeof certificates[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-void/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full glass-card overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate image */}
        <div className="aspect-[16/9] w-full">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-8">
          <span className="text-cosmic-accent text-sm font-medium">Certificate</span>
          <h2 className="text-3xl font-display font-bold text-white mt-2">{certificate.title}</h2>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-white/60">
            <span className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {certificate.organization}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(certificate.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <p className="text-white/70 mt-4">{certificate.description}</p>

          {certificate.credential_url && certificate.credential_url !== '#' && (
            <a
              href={certificate.credential_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-cosmic-accent hover:underline"
            >
              View Credential <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null)
  const heroRef = useRef(null)

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
              <Award className="w-4 h-4" />
              Professional Certifications
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-white">My</span>
              <br />
              <span className="text-gradient-animated">Certificates</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Continuous learning and professional development. Each certification
              represents a milestone in my journey of growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onClick={() => setSelectedCertificate(cert)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="section-padding bg-gradient-to-b from-cosmic-void via-cosmic-deep/30 to-cosmic-void">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="glass-card p-8">
              <div className="text-4xl font-display font-bold text-cosmic-accent mb-2">3+</div>
              <div className="text-white/60">Certifications</div>
            </div>
            <div className="glass-card p-8">
              <div className="text-4xl font-display font-bold text-cosmic-accent mb-2">100+</div>
              <div className="text-white/60">Hours of Training</div>
            </div>
            <div className="glass-card p-8">
              <div className="text-4xl font-display font-bold text-cosmic-accent mb-2">∞</div>
              <div className="text-white/60">Commitment to Growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  )
}
