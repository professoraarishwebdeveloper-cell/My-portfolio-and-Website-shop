'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuotationStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight, ChevronLeft, Monitor, ShoppingCart, FileText, Briefcase, Bot, Globe, Newspaper, Layers, Wallet, Clock, Sparkles, Crown, Zap, Check, ArrowRight, CreditCard, Save, Loader2, AlertCircle
} from 'lucide-react'

// Data definitions (keep them as they are)
const websiteTypes = [
    { id: 'portfolio', name: 'Portfolio', icon: FileText, basePrice: 15000, description: 'Stunning portfolio to showcase your work' },
    { id: 'business', name: 'Business', icon: Briefcase, basePrice: 25000, description: 'Professional website for your business' },
    { id: 'agency', name: 'Agency', icon: Layers, basePrice: 35000, description: 'Impressive agency website' },
    { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingCart, basePrice: 50000, description: 'Full-featured online store' },
    { id: 'blog', name: 'Blog', icon: Newspaper, basePrice: 12000, description: 'Modern blog with CMS' },
    { id: 'custom-app', name: 'Custom Web App', icon: Monitor, basePrice: 75000, description: 'Tailored web application' },
    { id: 'ai-saas', name: 'AI SaaS', icon: Bot, basePrice: 150000, description: 'AI-powered software service' },
    { id: 'dashboard', name: 'Dashboard', icon: Globe, basePrice: 45000, description: 'Admin dashboard with analytics' },
    { id: 'landing', name: 'Landing Page', icon: Sparkles, basePrice: 8000, description: 'High-converting landing page' },
  ]
  
  // Pages options
  const pagesOptions = [
    { id: '1', name: '1 Page', price: 0 },
    { id: '5', name: '5 Pages', price: 5000 },
    { id: '10', name: '10 Pages', price: 10000 },
    { id: '20', name: '20 Pages', price: 20000 },
    { id: 'unlimited', name: 'Unlimited', price: 50000 },
  ]
  
  // Design levels
  const designLevels = [
    { id: 'basic', name: 'Basic', multiplier: 1, description: 'Clean and functional design', icon: Check },
    { id: 'premium', name: 'Premium', multiplier: 1.5, description: 'Elevated design with animations', icon: Sparkles },
    { id: 'luxury', name: 'Luxury', multiplier: 2, description: 'Stunning premium experience', icon: Crown },
    { id: 'god-level', name: 'God Level', multiplier: 3, description: 'Award-worthy digital masterpiece', icon: Zap },
  ]
  
  // Features
  const featuresList = [
    { id: 'payment-gateway', name: 'Payment Gateway', price: 5000, category: 'Integration' },
    { id: 'authentication', name: 'Authentication', price: 8000, category: 'Core' },
    { id: 'admin-panel', name: 'Admin Panel', price: 15000, category: 'Management' },
    { id: 'booking-system', name: 'Booking System', price: 12000, category: 'Feature' },
    { id: 'chatbot', name: 'AI Chatbot', price: 20000, category: 'AI' },
    { id: 'ai-integration', name: 'AI Integration', price: 25000, category: 'AI' },
    { id: 'blog-system', name: 'Blog System', price: 8000, category: 'Content' },
    { id: 'seo', name: 'SEO Package', price: 10000, category: 'Marketing' },
    { id: 'analytics', name: 'Analytics Dashboard', price: 5000, category: 'Marketing' },
    { id: 'i18n', name: 'Multi-language', price: 15000, category: 'Localization' },
    { id: 'cms', name: 'CMS', price: 18000, category: 'Content' },
    { id: 'email-system', name: 'Email System', price: 8000, category: 'Communication' },
    { id: 'notifications', name: 'Push Notifications', price: 10000, category: 'Communication' },
  ]
  
  // Maintenance options
  const maintenanceOptions = [
    { id: 'monthly', name: 'Monthly', price: 2000, label: '/month' },
    { id: 'yearly', name: 'Yearly', price: 15000, label: '/year' },
    { id: 'lifetime', name: 'Lifetime', price: 50000, label: ' one-time' },
  ]
  
  // Timeline options
  const timelineOptions = [
    { id: 'urgent', name: 'Urgent', multiplier: 1.5, description: '2-4 weeks' },
    { id: 'normal', name: 'Normal', multiplier: 1, description: '4-8 weeks' },
    { id: 'premium-priority', name: 'Premium Priority', multiplier: 2, description: '1-2 weeks with dedicated support' },
  ]
  
  // Steps configuration
  const steps = [
    { id: 1, title: 'Website Type', icon: Globe },
    { id: 2, title: 'Pages', icon: FileText },
    { id: 3, title: 'Design Level', icon: Sparkles },
    { id: 4, title: 'Features', icon: Layers },
    { id: 5, title: 'Maintenance', icon: Clock },
    { id: 6, title: 'Timeline', icon: Wallet },
  ]

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
}

function WebsiteTypeStep() {
  const { websiteType, setWebsiteType } = useQuotationStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {websiteTypes.map((type) => (
        <motion.div
          key={type.id}
          onClick={() => setWebsiteType(type.id)}
          className={`glass-card p-6 cursor-pointer border-2 transition-all duration-300 ${websiteType === type.id ? 'border-cosmic-accent bg-cosmic-accent/10' : 'border-transparent hover:border-white/20'}`}>
          <div className="flex items-center mb-4">
            <type.icon className="w-8 h-8 mr-4 text-cosmic-accent" />
            <h3 className="font-bold text-lg text-white">{type.name}</h3>
          </div>
          <p className="text-sm text-white/60 mb-4 h-10">{type.description}</p>
          <p className="text-lg font-bold text-white mt-2">{formatPrice(type.basePrice)}</p>
        </motion.div>
      ))}
    </div>
  );
}

function PagesStep() {
  const { pagesCount, setPagesCount } = useQuotationStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {pagesOptions.map((option) => (
        <motion.div
          key={option.id}
          onClick={() => setPagesCount(option.id as (number | 'unlimited'))}
          className={`glass-card p-6 cursor-pointer border-2 transition-all duration-300 ${pagesCount === option.id ? 'border-cosmic-accent bg-cosmic-accent/10' : 'border-transparent hover:border-white/20'}`}>
          <h3 className="font-bold text-xl text-white text-center">{option.name}</h3>
          <p className="text-sm text-white/60 text-center mt-2">{formatPrice(option.price)}</p>
        </motion.div>
      ))}
    </div>
  );
}

function DesignLevelStep() {
  const { designLevel, setDesignLevel } = useQuotationStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {designLevels.map((level) => (
        <motion.div
          key={level.id}
          onClick={() => setDesignLevel(level.id as ('basic' | 'premium' | 'luxury' | 'god-level'))}
          className={`glass-card p-6 cursor-pointer border-2 transition-all duration-300 ${designLevel === level.id ? 'border-cosmic-accent bg-cosmic-accent/10' : 'border-transparent hover:border-white/20'}`}>
          <level.icon className="w-8 h-8 mb-4 text-cosmic-accent" />
          <h3 className="font-bold text-lg text-white">{level.name}</h3>
          <p className="text-sm text-white/60">{level.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

function FeaturesStep() {
  const { selectedFeatures, toggleFeature } = useQuotationStore();
  const categories = [...new Set(featuresList.map(f => f.category))];
  return (
    <div className="space-y-8">
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-xl font-bold text-white mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuresList.filter(f => f.category === category).map(feature => (
              <motion.div
                key={feature.id}
                onClick={() => toggleFeature(feature.id, feature.price)}
                className={`glass-card p-4 cursor-pointer border-2 transition-all duration-300 flex items-center justify-between ${selectedFeatures.includes(feature.id) ? 'border-cosmic-accent bg-cosmic-accent/10' : 'border-transparent hover:border-white/20'}`}>
                <div>
                  <h4 className="font-bold text-white">{feature.name}</h4>
                  <p className="text-sm text-white/60">{formatPrice(feature.price)}</p>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedFeatures.includes(feature.id) ? 'bg-cosmic-accent' : 'bg-white/10'}`}>
                  {selectedFeatures.includes(feature.id) && <Check className="w-4 h-4 text-black" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MaintenanceStep() {
  const { maintenance, setMaintenance } = useQuotationStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {maintenanceOptions.map((option) => (
        <motion.div
          key={option.id}
          onClick={() => setMaintenance(option.id as 'monthly' | 'yearly' | 'lifetime')}
          className={`glass-card p-6 cursor-pointer border-2 transition-all duration-300 text-center ${maintenance === option.id ? 'border-cosmic-accent bg-cosmic-accent/10' : 'border-transparent hover:border-white/20'}`}>
          <h3 className="font-bold text-xl text-white">{option.name}</h3>
          <p className="text-lg font-bold text-white mt-2">{formatPrice(option.price)} <span className="text-sm text-white/60">{option.label}</span></p>
        </motion.div>
      ))}
    </div>
  );
}

function TimelineStep() {
  const { timeline, setTimeline } = useQuotationStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {timelineOptions.map((option) => (
        <motion.div
          key={option.id}
          onClick={() => setTimeline(option.id as ('urgent' | 'normal' | 'premium-priority'))}
          className={`glass-card p-6 cursor-pointer border-2 transition-all duration-300 text-center ${timeline === option.id ? 'border-cosmic-accent bg-cosmic-accent/10' : 'border-transparent hover:border-white/20'}`}>
          <h3 className="font-bold text-xl text-white">{option.name}</h3>
          <p className="text-white/60">{option.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

function PriceSummary() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: string, message: string } | null>(null)

  const {
    totalPrice, websiteType, pagesCount, designLevel, maintenance, timeline, selectedFeatures
  } = useQuotationStore()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleSaveQuote = async () => {
    if (!user) {
      setStatus({ type: 'error', message: 'Please log in to save a quote.' })
      return
    }
    setIsLoading(true)
    setStatus(null)

    try {
      const quoteData = {
        user_id: user.id,
        website_type: websiteType,
        pages: pagesCount,
        design_level: designLevel,
        features: selectedFeatures,
        maintenance: maintenance,
        timeline: timeline,
        estimated_price: totalPrice,
        status: 'draft',
      }
      const { error } = await supabase.from('quotations').insert([quoteData])
      if (error) throw error
      setStatus({ type: 'success', message: 'Quote saved successfully!' })
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push('/auth')
      return
    }
    setIsLoading(true)
    setStatus(null)
    try {
      // 1. Save quote first
      const quoteResponse = await supabase.from('quotations').insert([{
        user_id: user.id,
        website_type: websiteType,
        pages: pagesCount.toString(),
        design_level: designLevel,
        features: selectedFeatures,
        maintenance: maintenance,
        timeline: timeline,
        estimated_price: totalPrice,
        status: 'converted',
      }]).select('id').single()

      if (quoteResponse.error) throw quoteResponse.error
      const quotation_id = quoteResponse.data.id

      // 2. Create order
      const orderData = {
        user_id: user.id,
        quotation_id: quotation_id,
        project_name: `${websiteType} Project`,
        website_type: websiteType,
        total_amount: totalPrice,
        payment_status: 'pending',
        order_status: 'new',
      }
      const { error: orderError } = await supabase.from('orders').insert([orderData])
      if (orderError) throw orderError

      router.push('/dashboard')
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass-card p-6 sticky top-24">
      {/* ... Summary UI ... */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex justify-between items-end mb-6">
          <span className="text-white/60">Total</span>
          <div className="text-3xl font-display font-bold text-gradient-animated">{formatPrice(totalPrice)}</div>
        </div>

        {status && (
          <div className={`p-3 rounded-lg mb-4 text-sm flex items-center gap-2 ${status.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            <AlertCircle className="w-4 h-4" /> {status.message}
          </div>
        )}

        <div className="space-y-3">
          {user && (
            <motion.button onClick={handleSaveQuote} disabled={isLoading || !websiteType} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full btn-secondary justify-center">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 mr-2" />Save Quote</>}
            </motion.button>
          )}
          <motion.button onClick={handlePlaceOrder} disabled={isLoading || !websiteType} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full magnetic-btn justify-center">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CreditCard className="w-5 h-5 mr-2" />Place Order</>}
          </motion.button>
        </div>

        {!user && (
          <div className="mt-4 text-center text-sm text-white/60">
            <Link href="/auth" className="text-cosmic-accent hover:underline">Log in</Link> to save or place an order.
          </div>
        )}
      </div>
    </div>
  )
}

export default function StorePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { websiteType, timeline } = useQuotationStore()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const canProceed = () => {
    if (currentStep === 1) return !!websiteType
    if (currentStep === 6) return !!timeline
    return true
  }

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-6">
            <span className="text-white">Premium Website </span>
            <span className="text-gradient">Configurator</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Build your perfect website with live pricing. Customize every detail and get an instant quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* ... Step navigation UI ... */}
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-display font-bold text-white mb-6">{steps[currentStep - 1].title}</h2>
                {(() => {
                  switch (currentStep) {
                    case 1: return <WebsiteTypeStep />
                    case 2: return <PagesStep />
                    case 3: return <DesignLevelStep />
                    case 4: return <FeaturesStep />
                    case 5: return <MaintenanceStep />
                    case 6: return <TimelineStep />
                    default: return null
                  }
                })()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <motion.button onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`btn-secondary flex items-center gap-2 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <ChevronLeft className="w-4 h-4" /> Previous
              </motion.button>
              {currentStep < steps.length ? (
                <motion.button onClick={() => setCurrentStep(currentStep + 1)} disabled={!canProceed()} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`magnetic-btn flex items-center gap-2 ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Next <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : null}
            </div>

            {!user && (
              <div className="mt-8 p-6 glass-card border border-cosmic-accent/20">
                <p className="text-white/70 text-sm mb-4">Create an account to save your quotation and track your orders.</p>
                <Link href="/auth" className="text-cosmic-accent hover:underline text-sm flex items-center gap-1">
                  Sign Up / Login <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <PriceSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
