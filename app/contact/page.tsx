'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Card3DParallax } from '@/components/3d-parallax-card'

interface User {
  id: string;
}

export default function ContactPage() {
  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: true, amount: 0.4 })
  const [user, setUser] = useState<User | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website_type: '',
    budget: '',
    timeline: '',
    preferred_contact: 'email',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    }
    getUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: 'idle', message: '' })

    try {
      const submissionData = { ...formData, user_id: user?.id ?? null }
      const { error } = await supabase.from('contacts').insert([submissionData])

      if (error) throw new Error(error.message)

      setSubmitStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' })
      // Reset form
      setFormData({
        name: '', email: '', phone: '', website_type: '', budget: '',
        timeline: '', preferred_contact: 'email', message: ''
      })
    } catch (err: any) {
      setSubmitStatus({ type: 'error', message: `Something went wrong. Please try again. Error: ${err.message}` })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ... (Keep budgetOptions and websiteTypes as they are)
  const budgetOptions = [
    'Under ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    'Above ₹2,50,000',
  ]

  const websiteTypes = [
    'Portfolio',
    'Business Website',
    'E-Commerce',
    'Web Application',
    'AI SaaS',
    'Landing Page',
    'Other',
  ]


  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 text-white drop-shadow-lg">Contact Me</h1>
          <p className="text-lg font-medium leading-[1.8] text-slate-200 md:text-xl">
            Have a project in mind or just want to say hi? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div ref={formRef} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="mt-16 max-w-4xl mx-auto">
          <Card3DParallax>
            <div className="glass-card p-8 md:p-12">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="cosmic-input" placeholder="Full Name *" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="cosmic-input" placeholder="Email Address *" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="cosmic-input" placeholder="Phone Number" />
                  <select name="website_type" value={formData.website_type} onChange={handleChange} required className="cosmic-input bg-cosmic-deep">
                    <option value="">Select Website Type *</option>
                    {websiteTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <select name="budget" value={formData.budget} onChange={handleChange} className="cosmic-input bg-cosmic-deep">
                    <option value="">Select Budget</option>
                    {budgetOptions.map(budget => <option key={budget} value={budget}>{budget}</option>)}
                  </select>
                  <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} className="cosmic-input" placeholder="Project Timeline" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-100">Preferred Contact Method</label>
                  <select name="preferred_contact" value={formData.preferred_contact} onChange={handleChange} className="cosmic-input bg-cosmic-deep">
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>
                <div>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="cosmic-input resize-none" placeholder="Tell me about your project... *" />
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isSubmitting} className="w-full magnetic-btn justify-center">
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Send Message</>}
                </motion.button>

                {submitStatus.type !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-4 rounded-lg mt-4 ${submitStatus.type === 'success' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {submitStatus.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-s" />}
                    {submitStatus.message}
                  </motion.div>
                )}
              </form>
            </div>
          </Card3DParallax>
        </motion.div>
      </div>
    </div>
  )
}
