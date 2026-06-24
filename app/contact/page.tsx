'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { AlertCircle, CheckCircle, Loader2, Mail, MessageCircle, Phone, Send, ShieldCheck, TimerReset } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Card3DParallax } from '@/components/3d-parallax-card'
import { CONTACT_DETAILS, DELIVERY_PROCESS, TRUST_SIGNALS } from '@/lib/site-content'
import {
  contactSubmissionSchema,
  getFriendlyErrorMessage,
  logDevelopmentError,
} from '@/lib/security'
import { AnimatedBorder } from '@/components/animated-border'

const CONTACT_COOLDOWN_MS = 15000

export default function ContactPage() {
  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: true, amount: 0.25 })
  const lastSubmitRef = useRef(0)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website_type: '',
    budget: '',
    timeline: '',
    preferred_contact: 'email',
    message: '',
    company_website: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus({ type: 'idle', message: '' })

    if (Date.now() - lastSubmitRef.current < CONTACT_COOLDOWN_MS) {
      setSubmitStatus({ type: 'error', message: 'Please wait a few seconds before sending another message.' })
      return
    }

    const parsed = contactSubmissionSchema.safeParse(formData)

    if (!parsed.success) {
      setSubmitStatus({
        type: 'error',
        message: parsed.error.issues[0]?.message ?? 'Please review the form and try again.',
      })
      return
    }

    if (parsed.data.company_website) {
      setSubmitStatus({ type: 'success', message: 'Message sent successfully. You can expect a reply within 24 hours.' })
      return
    }

    setIsSubmitting(true)
    lastSubmitRef.current = Date.now()

    const compiledMessage = [
      `Preferred contact: ${parsed.data.preferred_contact}`,
      parsed.data.timeline ? `Timeline: ${parsed.data.timeline}` : '',
      '',
      parsed.data.message,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || null,
          website_type: parsed.data.website_type,
          budget: parsed.data.budget || null,
          message: compiledMessage,
        },
      ])

      if (error) throw error

      setSubmitStatus({ type: 'success', message: 'Brief received successfully. You can expect a reply within 24 hours.' })
      setFormData({
        name: '',
        email: '',
        phone: '',
        website_type: '',
        budget: '',
        timeline: '',
        preferred_contact: 'email',
        message: '',
        company_website: '',
      })
    } catch (err) {
      logDevelopmentError('contact-submit', err)
      setSubmitStatus({ type: 'error', message: getFriendlyErrorMessage('contact') })
    } finally {
      setIsSubmitting(false)
    }
  }

  const budgetOptions = [
    'Under Rs 25,000',
    'Rs 25,000 - Rs 50,000',
    'Rs 50,000 - Rs 1,00,000',
    'Rs 1,00,000 - Rs 2,50,000',
    'Above Rs 2,50,000',
  ]

  const websiteTypes = ['Portfolio', 'Business Website', 'E-Commerce', 'Web Application', 'AI SaaS', 'Landing Page', 'Other']

  return (
    <div className="relative z-20 min-h-screen overflow-hidden px-4 pb-20 pt-32">
      <div className="absolute left-[10%] top-40 h-44 w-44 rounded-full bg-[#f5eadb]/24 blur-3xl" />
      <div className="absolute right-[10%] top-32 h-52 w-52 rounded-full bg-[#d8c6ae]/18 blur-3xl" />

      <div className="container relative z-20 mx-auto">
        <PageHeader
          eyebrow="Get in touch"
          title="Start the conversation with intent"
          description="Choose the contact channel that suits your briefing style, or send a focused project brief with scope, timeline, and goals."
        />

        <div className="mx-auto mb-12 grid max-w-6xl gap-4 md:grid-cols-3">
          <a href={CONTACT_DETAILS.emailHref} className="premium-shell rounded-[28px] p-6 transition-all hover:-translate-y-1">
            <Mail className="h-6 w-6 text-brand-accent" />
            <h3 className="mt-5 text-xl font-bold text-white">Email</h3>
            <p className="mt-3 text-sm leading-7 text-slate-200">{CONTACT_DETAILS.email}</p>
          </a>
          <a href={CONTACT_DETAILS.phoneHref} className="premium-shell rounded-[28px] p-6 transition-all hover:-translate-y-1">
            <Phone className="h-6 w-6 text-brand-accent" />
            <h3 className="mt-5 text-xl font-bold text-white">Call</h3>
            <p className="mt-3 text-sm leading-7 text-slate-200">{CONTACT_DETAILS.phoneDisplay}</p>
          </a>
          <a
            href={CONTACT_DETAILS.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-shell rounded-[28px] p-6 transition-all hover:-translate-y-1"
          >
            <MessageCircle className="h-6 w-6 text-brand-accent" />
            <h3 className="mt-5 text-xl font-bold text-white">WhatsApp</h3>
            <p className="mt-3 text-sm leading-7 text-slate-200">{CONTACT_DETAILS.whatsappDisplay}</p>
          </a>
        </div>

        <div className="mx-auto mb-12 grid max-w-6xl gap-4 lg:grid-cols-4">
          {TRUST_SIGNALS.map((item, index) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              {index === 0 && <TimerReset className="h-5 w-5 text-brand-accent" />}
              {index === 1 && <ShieldCheck className="h-5 w-5 text-brand-accent" />}
              {index > 1 && <CheckCircle className="h-5 w-5 text-brand-accent" />}
              <p className="mt-4 text-lg font-semibold text-white">{item.value}</p>
              <p className="mt-1 text-sm text-slate-300">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card3DParallax>
              <div className="premium-shell rounded-[32px] p-8 md:p-10">
                <h3 className="text-2xl font-display font-bold text-white">Send a project brief</h3>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Share the essentials, and your request will be delivered clearly and confidentially.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <input
                    type="text"
                    name="company_website"
                    value={formData.company_website}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required maxLength={80} className="cosmic-input" placeholder="Full Name *" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required maxLength={120} className="cosmic-input" placeholder="Email Address *" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} maxLength={20} className="cosmic-input" placeholder="Phone Number" />
                    <select name="website_type" value={formData.website_type} onChange={handleChange} required className="cosmic-input bg-cosmic-deep">
                      <option value="">Select Project Type *</option>
                      {websiteTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <select name="budget" value={formData.budget} onChange={handleChange} className="cosmic-input bg-cosmic-deep">
                      <option value="">Select Budget</option>
                      {budgetOptions.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
                    </select>
                    <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} maxLength={80} className="cosmic-input" placeholder="Timeline or target launch date" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-100">Preferred contact method</label>
                    <select name="preferred_contact" value={formData.preferred_contact} onChange={handleChange} className="cosmic-input bg-cosmic-deep">
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                  <div>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} maxLength={1500} className="cosmic-input resize-none" placeholder="Tell me about the project, what success looks like, and anything the new site must communicate. *" />
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isSubmitting} className="w-full magnetic-btn justify-center">
                    {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</> : <><Send className="h-5 w-5" /> Send Brief</>}
                  </motion.button>

                  {submitStatus.type !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 flex items-center gap-2 rounded-lg p-4 ${
                        submitStatus.type === 'success' ? 'bg-green-400/10 text-green-300' : 'bg-red-400/10 text-red-300'
                      }`}
                    >
                      {submitStatus.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                      {submitStatus.message}
                    </motion.div>
                  )}
                </form>
              </div>
            </Card3DParallax>
          </motion.div>

          <div className="space-y-6">
            <div className="premium-shell rounded-[32px] p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-accent">How the process works</p>
              <div className="mt-6 space-y-4">
                {DELIVERY_PROCESS.map((step, index) => (
                  <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-brand-accent">
                      0{index + 1}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-200">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-shell rounded-[32px] p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-accent">Support information</p>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
                <p>Response time is usually under 24 hours for new inquiries.</p>
                <p>Project delivery includes structured checkpoints instead of disappearing into a long silent build phase.</p>
                <p>Launch support is available after delivery so the final handoff feels dependable, not abrupt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
