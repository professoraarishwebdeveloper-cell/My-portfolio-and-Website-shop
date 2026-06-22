'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: true })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    budget: '',
    website_type: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const { error } = await supabase.from('contacts').insert([formData])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        budget: '',
        website_type: '',
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <MessageSquare className="w-4 h-4" />
              Let's Connect
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-white">Get in</span>
              <br />
              <span className="text-gradient-animated">Touch</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Ready to bring your vision to life? I'm here to help you create
              something extraordinary. Let's start the conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding pt-0">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">
                  Contact <span className="text-gradient">Information</span>
                </h2>
                <p className="text-white/60">
                  Fill out the form and I'll get back to you within 24 hours.
                  Or reach out directly through any of the channels below.
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-4">
                <div className="glass-card p-6 flex items-center gap-4 cursor-hover">
                  <div className="w-12 h-12 rounded-xl bg-cosmic-accent/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-cosmic-accent" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Email</p>
                    <a href="mailto:mr.shadow4704@gmail.com" className="text-white hover:text-cosmic-accent transition-colors">
                      mr.shadow4704@gmail.com
                    </a>
                  </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4 cursor-hover">
                  <div className="w-12 h-12 rounded-xl bg-cosmic-accent/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-cosmic-accent" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Phone</p>
                    <a href="tel:+919284792400" className="text-white hover:text-cosmic-accent transition-colors">
                      +91 9284792400
                    </a>
                  </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4 cursor-hover">
                  <div className="w-12 h-12 rounded-xl bg-cosmic-accent/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-cosmic-accent" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Location</p>
                    <p className="text-white">India (Remote Worldwide)</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="glass-card overflow-hidden aspect-video relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501881.9437087373!2d7!3d22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b797%3A0xd78c4751851c4846!2sIndia!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full opacity-50 grayscale"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-transparent to-transparent" />
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Connect on Social</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-hover"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-hover"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-hover"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Availability */}
              <div className="glass-card p-6 border border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-white">
                    Currently available for new projects
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="cosmic-input"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="cosmic-input"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="cosmic-input"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  {/* Website Type */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Website Type *</label>
                    <select
                      name="website_type"
                      value={formData.website_type}
                      onChange={handleChange}
                      required
                      className="cosmic-input bg-cosmic-deep"
                    >
                      <option value="">Select a type</option>
                      {websiteTypes.map((type) => (
                        <option key={type} value={type.toLocaleLowerCase()}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="cosmic-input bg-cosmic-deep"
                    >
                      <option value="">Select budget</option>
                      {budgetOptions.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="cosmic-input resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full magnetic-btn justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5" />
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
