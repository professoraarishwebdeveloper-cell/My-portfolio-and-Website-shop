'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuotationStore, useAuthStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import {
  ChevronRight,
  ChevronLeft,
  Monitor,
  ShoppingCart,
  FileText,
  Briefcase,
  Bot,
  Globe,
  Newspaper,
  Layers,
  Wallet,
  Clock,
  Sparkles,
  Crown,
  Zap,
  Check,
  ArrowRight,
  CreditCard,
  QrCode,
  AlertCircle,
  Copy,
} from 'lucide-react'
import QRCode from 'react-qr-code'
import { use3DDepth } from '@/hooks/use3DDepth'
import { Card3DParallax } from '@/components/3d-parallax-card'

// Website types
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

// Format price
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

// Step 1: Website Type - Enhanced with 3D depth
function WebsiteTypeStep() {
  const { websiteType, setWebsiteType } = useQuotationStore()
  const depth = use3DDepth(0.3)

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {websiteTypes.map((type, index) => {
        const isActive = websiteType === type.id
        return (
          <Card3DParallax key={type.id} intensity={0.5} delay={index * 0.05}>
            <motion.button
              style={{
                transform: `perspective(1000px) rotateX(${depth.rotateX * 0.2}deg) rotateY(${depth.rotateY * 0.2}deg)`,
                transformStyle: 'preserve-3d',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setWebsiteType(type.id)}
              className={`glass-card p-6 text-left cursor-hover transition-all w-full ${
                isActive
                  ? 'ring-2 ring-cosmic-accent bg-cosmic-accent/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isActive ? 'bg-cosmic-accent text-white' : 'bg-white/10 text-white/70'
                  }`}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                >
                  <type.icon className="w-6 h-6" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{type.name}</h3>
                  <p className="text-white/50 text-sm">{formatPrice(type.basePrice)}</p>
                </div>
                {isActive && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-6 h-6 text-cosmic-accent" />
                  </motion.div>
                )}
              </div>
              <p className="text-white/60 text-sm">{type.description}</p>
            </motion.button>
          </Card3DParallax>
        )
      })}
    </div>
  )
}

// Step 2: Pages
function PagesStep() {
  const { pagesCount, setPagesCount } = useQuotationStore()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {pagesOptions.map((option) => {
        const isActive = pagesCount === option.id
        return (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPagesCount(option.id as number | 'unlimited')}
            className={`glass-card p-6 text-center cursor-hover transition-all ${
              isActive
                ? 'ring-2 ring-cosmic-accent bg-cosmic-accent/10'
                : 'hover:bg-white/5'
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-2">{option.name}</h3>
            <p className="text-white/50 text-sm">
              {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}

// Step 3: Design Level
function DesignLevelStep() {
  const { designLevel, setDesignLevel } = useQuotationStore()

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {designLevels.map((level) => {
        const isActive = designLevel === level.id
        return (
          <motion.button
            key={level.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDesignLevel(level.id as 'basic' | 'premium' | 'luxury' | 'god-level')}
            className={`glass-card p-6 text-center cursor-hover transition-all ${
              isActive
                ? 'ring-2 ring-cosmic-accent bg-cosmic-accent/10'
                : 'hover:bg-white/5'
            }`}
          >
            <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 ${
              isActive ? 'bg-cosmic-accent text-white' : 'bg-white/10 text-white/70'
            }`}>
              <level.icon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{level.name}</h3>
            <p className="text-white/50 text-sm">{level.description}</p>
            <p className="text-cosmic-accent text-sm mt-3">
              {level.multiplier}x multiplier
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}

// Step 4: Features
function FeaturesStep() {
  const { selectedFeatures, toggleFeature } = useQuotationStore()
  const categories = Array.from(new Set(featuresList.map(f => f.category)))

  return (
    <div className="space-y-8">
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cosmic-accent" />
            {category}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuresList.filter(f => f.category === category).map(feature => {
              const isActive = selectedFeatures.includes(feature.id)
              return (
                <motion.button
                  key={feature.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleFeature(feature.id, feature.price)}
                  className={`glass-card p-4 text-left cursor-hover transition-all ${
                    isActive
                      ? 'ring-2 ring-cosmic-accent bg-cosmic-accent/10'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">{feature.name}</h4>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      isActive ? 'bg-cosmic-accent' : 'bg-white/10'
                    }`}>
                      {isActive && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <p className="text-cosmic-accent text-sm mt-2">+{formatPrice(feature.price)}</p>
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// Step 5: Maintenance
function MaintenanceStep() {
  const { maintenance, setMaintenance } = useQuotationStore()

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {maintenanceOptions.map((option) => {
        const isActive = maintenance === option.id
        return (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMaintenance(option.id as 'monthly' | 'yearly' | 'lifetime')}
            className={`glass-card p-6 text-center cursor-hover transition-all ${
              isActive
                ? 'ring-2 ring-cosmic-accent bg-cosmic-accent/10'
                : 'hover:bg-white/5'
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-2">{option.name}</h3>
            <p className="text-cosmic-accent">
              {formatPrice(option.price)}
              <span className="text-white/50">{option.label}</span>
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}

// Step 6: Timeline
function TimelineStep() {
  const { timeline, setTimeline } = useQuotationStore()

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {timelineOptions.map((option) => {
        const isActive = timeline === option.id
        return (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTimeline(option.id as 'urgent' | 'normal' | 'premium-priority')}
            className={`glass-card p-6 text-center cursor-hover transition-all ${
              isActive
                ? 'ring-2 ring-cosmic-accent bg-cosmic-accent/10'
                : 'hover:bg-white/5'
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-2">{option.name}</h3>
            <p className="text-white/50 text-sm mb-2">{option.description}</p>
            <p className="text-cosmic-accent">
              {option.multiplier === 1 ? 'Standard' : `${option.multiplier}x multiplier`}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}

// Price summary sidebar
function PriceSummary() {
  const { totalPrice, basePrice, featuresPrice, websiteType, pagesCount, designLevel, maintenance, timeline, selectedFeatures } = useQuotationStore()
  const [showQR, setShowQR] = useState(false)

  const websiteData = websiteTypes.find(t => t.id === websiteType)
  const maintenanceData = maintenanceOptions.find(m => m.id === maintenance)
  const timelineData = timelineOptions.find(t => t.id === timeline)
  const designData = designLevels.find(d => d.id === designLevel)

  // UPI IDs
  const upiIDs = [
    '9284792400@fam',
    'aarishkhatib@fam',
    '7083632058@fam',
  ]

  const depth = use3DDepth(0.4)

  return (
    <motion.div
      style={{
        transform: `perspective(1200px) rotateX(${depth.rotateX * 0.2}deg) rotateY(${depth.rotateY * 0.2}deg) translateZ(${depth.intensity * 8}px)`,
        transformStyle: 'preserve-3d',
      }}
      className="glass-card p-6 sticky top-24"
    >
      {/* Selected options summary */}
      <div className="space-y-4 mb-6">
        {websiteType && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Website Type</span>
            <span className="text-white">{websiteData?.name}</span>
          </div>
        )}
        {pagesCount && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Pages</span>
            <span className="text-white">{pagesCount === 'unlimited' ? 'Unlimited' : pagesCount}</span>
          </div>
        )}
        {designLevel && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Design Level</span>
            <span className="text-white">{designData?.name}</span>
          </div>
        )}
        {selectedFeatures.length > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Features</span>
            <span className="text-white">{selectedFeatures.length} selected</span>
          </div>
        )}
        {maintenance && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Maintenance</span>
            <span className="text-white">{maintenanceData?.name}</span>
          </div>
        )}
        {timeline && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Timeline</span>
            <span className="text-white">{timelineData?.name}</span>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 pt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Base Price</span>
          <span className="text-white">{formatPrice(basePrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Features</span>
          <span className="text-white">+{formatPrice(featuresPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Maintenance</span>
          <span className="text-white">+{formatPrice(maintenanceData?.price || 0)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex justify-between items-end mb-6">
          <span className="text-white/60">Total</span>
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-gradient-animated">
              {formatPrice(totalPrice)}
            </div>
          </div>
        </div>

        {/* Payment buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full magnetic-btn justify-center"
            disabled={!websiteType || !timeline}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Pay with Razorpay
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQR(!showQR)}
            className="w-full btn-secondary justify-center"
            disabled={!websiteType || !timeline}
          >
            <QrCode className="w-5 h-5 mr-2" />
            Pay via UPI
          </motion.button>
        </div>

        {/* QR Code and UPI Payment modal */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-6 glass-card space-y-4"
            >
              <div>
                <h4 className="text-center text-white font-semibold mb-4">Scan to Pay</h4>
                <div className="flex justify-center p-6 bg-white rounded-2xl">
                  <QRCode value={`upi://pay?pa=${upiIDs[0]}&pn=Aarish%20Khatib&am=${totalPrice}&cu=INR`} size={150} />
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white/60 text-xs mb-3">Amount to Pay</p>
                <p className="text-2xl font-display font-bold text-cosmic-accent mb-4">{formatPrice(totalPrice)}</p>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <p className="text-white/70 text-xs font-semibold mb-3">Or pay directly using UPI ID:</p>
                {upiIDs.map((id, idx) => (
                  <button
                    key={id}
                    onClick={() => {
                      navigator.clipboard.writeText(id)
                    }}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cosmic-accent/50 hover:bg-cosmic-accent/5 transition-all group text-left"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-white/70 text-sm font-mono">{id}</p>
                      <Copy className="w-4 h-4 text-white/40 group-hover:text-cosmic-accent transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-cosmic-accent/10 border border-cosmic-accent/20 rounded-lg p-3 text-xs text-white/70 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-cosmic-accent" />
                <span>Please contact Aarish before making payment for final confirmation.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-white/40 text-xs mt-4 flex items-start gap-1">
          <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
          Prices are estimates. Final quote will be provided after consultation.
        </p>
      </div>
    </motion.div>
  )
}

export default function StorePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { websiteType, timeline, reset } = useQuotationStore()
  const { user } = useAuthStore()

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!websiteType
      case 6: return !!timeline
      default: return true
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <WebsiteTypeStep />
      case 2: return <PagesStep />
      case 3: return <DesignLevelStep />
      case 4: return <FeaturesStep />
      case 5: return <MaintenanceStep />
      case 6: return <TimelineStep />
      default: return null
    }
  }

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-accent/10 border border-cosmic-accent/20 text-cosmic-accent text-sm mb-6"
          >
            <ShoppingCart className="w-4 h-4" />
            Configure & Launch
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-6">
            <span className="text-white">Premium Website</span>
            <br />
            <span className="text-gradient">Configurator</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Build your perfect website with live pricing. Customize every detail and get an instant quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Steps navigation */}
            <div className="relative mb-8">
              <div className="flex items-center justify-between relative z-10">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${
                      index < steps.length - 1 ? 'flex-1' : ''
                    }`}
                  >
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-hover ${
                        currentStep >= step.id
                          ? 'bg-cosmic-accent text-white'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </button>
                    <span className={`text-xs mt-2 hidden sm:block ${
                      currentStep >= step.id ? 'text-white' : 'text-white/50'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              {/* Progress line */}
              <div className="absolute top-5 left-0 right-0 h-px bg-white/10 -z-0">
                <motion.div
                  className="h-full bg-cosmic-accent"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-display font-bold text-white mb-6">
                  {steps[currentStep - 1].title}
                </h2>
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`btn-secondary flex items-center gap-2 ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </motion.button>

              {currentStep < steps.length ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className={`magnetic-btn flex items-center gap-2 ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!canProceed()}
                  className={`magnetic-btn flex items-center gap-2 ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Complete & Pay
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            {/* Login prompt */}
            {!user && (
              <div className="mt-8 p-6 glass-card border border-cosmic-accent/20">
                <p className="text-white/70 text-sm mb-4">
                  Create an account to save your quotation and track your orders.
                </p>
                <Link href="/auth" className="text-cosmic-accent hover:underline text-sm flex items-center gap-1">
                  Sign Up / Login <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Price summary sidebar */}
          <div className="lg:col-span-1">
            <PriceSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
