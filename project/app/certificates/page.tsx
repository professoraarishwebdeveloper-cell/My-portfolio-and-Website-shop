'use client'

import { useRef, useState, ReactNode, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, ExternalLink, X, Calendar, Building2 } from 'lucide-react'
import { use3DDepth } from '@/hooks/use3DDepth'
import { Card3DParallax } from '@/components/3d-parallax-card'

interface ParticleData {
  id: number
  xValues: [number, number, number]
  yValues: [number, number, number]
  left: string
  top: string
}

// Certificate data - using real uploaded images
const certificates = [
  {
    id: 1,
    title: 'ChatGPT & AI Tools Workshop',
    organization: 'OpenAI Community',
    date: '2025-01-15',
    description: 'Comprehensive workshop on leveraging ChatGPT and AI tools for productivity and development.',
    image: '/certificates/chatgpt-ai-workshop.png',
    credential_url: '#',
    color: '#8b5cf6',
  },
  {
    id: 2,
    title: 'Public Speaking Course',
    organization: 'Toastmasters International',
    date: '2024-08-20',
    description: 'Advanced public speaking certification focusing on presentation skills and audience engagement.',
    image: '/certificates/public-speaking-course.png',
    credential_url: '#',
    color: '#06b6d4',
  },
  {
    id: 3,
    title: 'Multitasking Course',
    organization: 'Productivity Institute',
    date: '2024-05-10',
    description: 'Certification in effective multitasking and time management strategies.',
    image: '/certificates/multitasking-course.png',
    credential_url: '#',
    color: '#ec4899',
  },
]

// Premium 3D certificate vault card
function CertificateCard({ certificate, onClick, index }: { certificate: typeof certificates[0]; onClick: () => void; index: number }) {
  const depth = use3DDepth(0.5)
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<ParticleData[]>([])

  useEffect(() => {
    const generatedParticles: ParticleData[] = []
    for (let i = 0; i < 5; i++) {
      generatedParticles.push({
        id: i,
        xValues: [0, Math.random() * 100 - 50, 0],
        yValues: [0, Math.random() * 100 - 50, 0],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      })
    }
    setParticles(generatedParticles)
  }, [])

  return (
    <Card3DParallax intensity={0.6} delay={index * 0.1}>
      <motion.div
        style={{
          transform: `perspective(1200px) rotateX(${depth.rotateX * 0.4}deg) rotateY(${depth.rotateY * 0.4}deg) translateZ(${depth.intensity * 12}px)`,
          transformStyle: 'preserve-3d',
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group cursor-pointer relative h-full"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 rounded-3xl bg-cosmic-void" />
        </div>

        {/* Main card */}
        <div className="relative glass-card overflow-hidden h-full flex flex-col">
          {/* Certificate image container with 3D depth */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-cosmic-deep to-cosmic-void">
            {/* Animated background particles */}
            <div className="absolute inset-0">
              {particles.map((particle, i) => (
                <motion.div
                  key={particle.id}
                  animate={{
                    x: particle.xValues,
                    y: particle.yValues,
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: certificate.color,
                    left: particle.left,
                    top: particle.top,
                    boxShadow: `0 0 10px ${certificate.color}`,
                  }}
                />
              ))}
            </div>

            {/* Certificate image with glow */}
            {/* Note: Using placeholder - replace with actual certificate image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${certificate.color}30, ${certificate.color}10)`,
                  border: `2px solid ${certificate.color}`,
                }}
              >
                <Award className="w-12 h-12" style={{ color: certificate.color }} />
              </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-cosmic-void/20 to-transparent" />

            {/* Organization badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md border text-xs font-medium"
              style={{
                background: `${certificate.color}20`,
                borderColor: certificate.color,
                color: certificate.color,
              }}
            >
              {certificate.organization}
            </div>

            {/* View icon on hover */}
            <motion.div
              animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{ background: `${certificate.color}30`, border: `2px solid ${certificate.color}` }}
              >
                <ExternalLink className="w-6 h-6" style={{ color: certificate.color }} />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-lg font-display font-semibold text-white group-hover:text-white transition-colors line-clamp-2">
              {certificate.title}
            </h3>

            <div className="flex flex-wrap gap-3 mt-auto pt-4 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(certificate.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </span>
            </div>
          </div>

          {/* Glow effect on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              boxShadow: `inset 0 0 40px ${certificate.color}30, 0 0 40px ${certificate.color}20`,
            }}
          />
        </div>
      </motion.div>
    </Card3DParallax>
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
            {certificates.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onClick={() => setSelectedCertificate(cert)}
                index={index}
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
