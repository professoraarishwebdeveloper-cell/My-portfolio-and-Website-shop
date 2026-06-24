'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuotationStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { TiltCard } from '@/components/tilt-card'
import { SectionReveal } from '@/components/section-reveal'
import { TRUST_SIGNALS } from '@/lib/site-content'
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
  Save,
  Loader2,
  AlertCircle,
  Shield,
  CircleDollarSign,
} from 'lucide-react'

const websiteTypes = [
  { id: 'portfolio', name: 'Portfolio', icon: FileText, basePrice: 15000, description: 'Elegant personal brand showcase' },
  { id: 'business', name: 'Business', icon: Briefcase, basePrice: 25000, description: 'Professional conversion-focused site' },
  { id: 'agency', name: 'Agency', icon: Layers, basePrice: 35000, description: 'High-impact agency presence' },
  { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingCart, basePrice: 50000, description: 'Online store with clean checkout flow' },
  { id: 'blog', name: 'Blog', icon: Newspaper, basePrice: 12000, description: 'Editorial layout with CMS polish' },
  { id: 'custom-app', name: 'Custom Web App', icon: Monitor, basePrice: 75000, description: 'Tailored app experience for your workflow' },
  { id: 'ai-saas', name: 'AI SaaS', icon: Bot, basePrice: 150000, description: 'Premium product UI for AI software' },
  { id: 'dashboard', name: 'Dashboard', icon: Globe, basePrice: 45000, description: 'Analytics-heavy admin interface' },
  { id: 'landing', name: 'Landing Page', icon: Sparkles, basePrice: 8000, description: 'Minimal, sharp, conversion-ready landing page' },
]

const pagesOptions = [
  { id: '1', name: '1 Page', price: 0 },
  { id: '5', name: '5 Pages', price: 5000 },
  { id: '10', name: '10 Pages', price: 10000 },
  { id: '20', name: '20 Pages', price: 20000 },
  { id: 'unlimited', name: 'Unlimited', price: 50000 },
]

const designLevels = [
  { id: 'basic', name: 'Clean', multiplier: 1, description: 'Minimal, functional, disciplined', icon: Check },
  { id: 'premium', name: 'Premium', multiplier: 1.5, description: 'Layered depth with refined motion', icon: Sparkles },
  { id: 'luxury', name: 'Luxury', multiplier: 2, description: 'A richer, more cinematic finish', icon: Crown },
  { id: 'god-level', name: 'Studio', multiplier: 3, description: 'Showpiece-level presentation', icon: Zap },
]

const featuresList = [
  { id: 'payment-gateway', name: 'Payment Gateway', price: 5000, category: 'Integrations' },
  { id: 'authentication', name: 'Authentication', price: 8000, category: 'Core' },
  { id: 'admin-panel', name: 'Admin Panel', price: 15000, category: 'Management' },
  { id: 'booking-system', name: 'Booking System', price: 12000, category: 'Core' },
  { id: 'chatbot', name: 'AI Chatbot', price: 20000, category: 'AI' },
  { id: 'ai-integration', name: 'AI Integration', price: 25000, category: 'AI' },
  { id: 'blog-system', name: 'Blog System', price: 8000, category: 'Content' },
  { id: 'seo', name: 'SEO Package', price: 10000, category: 'Growth' },
  { id: 'analytics', name: 'Analytics Dashboard', price: 5000, category: 'Growth' },
  { id: 'i18n', name: 'Multi-language', price: 15000, category: 'Localization' },
  { id: 'cms', name: 'CMS', price: 18000, category: 'Content' },
  { id: 'email-system', name: 'Email System', price: 8000, category: 'Communication' },
  { id: 'notifications', name: 'Push Notifications', price: 10000, category: 'Communication' },
]

const maintenanceOptions = [
  { id: 'monthly', name: 'Monthly', price: 2000, label: '/month' },
  { id: 'yearly', name: 'Yearly', price: 15000, label: '/year' },
  { id: 'lifetime', name: 'Lifetime', price: 50000, label: 'one-time' },
]

const timelineOptions = [
  { id: 'urgent', name: 'Urgent', multiplier: 1.5, description: '2-4 weeks' },
  { id: 'normal', name: 'Normal', multiplier: 1, description: '4-8 weeks' },
  { id: 'premium-priority', name: 'Priority', multiplier: 2, description: '1-2 weeks with dedicated support' },
]

const steps = [
  { id: 1, title: 'Website Type', icon: Globe },
  { id: 2, title: 'Pages', icon: FileText },
  { id: 3, title: 'Design', icon: Sparkles },
  { id: 4, title: 'Features', icon: Layers },
  { id: 5, title: 'Maintenance', icon: Clock },
  { id: 6, title: 'Timeline', icon: Wallet },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
}

function StepPill({
  step,
  active,
  onClick,
}: {
  step: (typeof steps)[number]
  active: boolean
  onClick: () => void
}) {
  const Icon = step.icon
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
        active
          ? 'brand-pill-active'
          : 'border-white/10 bg-brand-surface text-slate-200 hover:border-white/20 hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{step.title}</span>
    </button>
  )
}

function OptionCard({
  active,
  icon: Icon,
  title,
  subtitle,
  price,
  onClick,
  compact = false,
}: {
  active: boolean
  icon: React.ElementType
  title: string
  subtitle: string
  price: string
  onClick: () => void
  compact?: boolean
}) {
  return (
    <TiltCard className="h-full">
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative h-full w-full overflow-hidden rounded-2xl border p-5 text-left shadow-2xl transition-all ${
          compact ? 'min-h-[128px]' : 'min-h-[170px]'
        } ${
          active
            ? 'border-brand-accent/30 bg-brand-surface-hover shadow-2xl'
            : 'border-white/10 bg-brand-surface hover:border-white/20 hover:bg-brand-surface-hover'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 via-transparent to-brand-violet/0 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
        <div className="relative flex h-full flex-col">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="rounded-2xl border border-white/10 bg-brand-surface p-3 text-brand-accent">
              <Icon className="h-5 w-5" />
            </div>
            <div className={`rounded-full border px-3 py-1 text-xs ${active ? 'border-brand-accent/25 bg-brand-violet/15 text-white' : 'border-white/10 bg-brand-surface text-slate-200'}`}>
              {price}
            </div>
          </div>
          <h3 className="text-lg font-bold text-white drop-shadow-lg">{title}</h3>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-200">{subtitle}</p>
        </div>
      </motion.button>
    </TiltCard>
  )
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.28em] text-brand-accent">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold text-white drop-shadow-lg md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-200">{description}</p>
    </div>
  )
}

function PriceSummary() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const {
    basePrice,
    totalPrice,
    websiteType,
    pagesCount,
    designLevel,
    maintenance,
    timeline,
    selectedFeatures,
    featuresPrice,
  } = useQuotationStore()

  const selectedWebsite = websiteTypes.find((item) => item.id === websiteType)
  const selectedDesign = designLevels.find((item) => item.id === designLevel)
  const selectedMaintenance = maintenanceOptions.find((item) => item.id === maintenance)
  const selectedTimeline = timelineOptions.find((item) => item.id === timeline)

  const handleSaveQuote = async () => {
    if (!user) {
      router.push('/auth')
      return
    }

    setIsLoading(true)
    setStatus(null)

    try {
      const { error } = await supabase.from('quotations').insert([
        {
          user_id: user.id,
          website_type: websiteType,
          pages_count: typeof pagesCount === 'number' ? pagesCount : null,
          design_level: designLevel,
          features: selectedFeatures,
          maintenance,
          timeline,
          base_price: basePrice,
          features_price: featuresPrice,
          total_price: totalPrice,
          notes: typeof pagesCount === 'string' ? 'Unlimited pages requested through the configurator.' : null,
          status: 'draft',
        },
      ])

      if (error) throw error
      setStatus({ type: 'success', message: 'Quote saved successfully.' })
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

    if (!websiteType) {
      setStatus({ type: 'error', message: 'Choose a website type first.' })
      return
    }

    setIsLoading(true)
    setStatus(null)

    try {
      const quoteResponse = await supabase.from('quotations').insert([
        {
          user_id: user.id,
          website_type: websiteType,
          pages_count: typeof pagesCount === 'number' ? pagesCount : null,
          design_level: designLevel,
          features: selectedFeatures,
          maintenance,
          timeline,
          base_price: basePrice,
          features_price: featuresPrice,
          total_price: totalPrice,
          notes: typeof pagesCount === 'string' ? 'Unlimited pages requested through the configurator.' : null,
          status: 'accepted',
        },
      ]).select('id').maybeSingle()

      if (quoteResponse.error) throw quoteResponse.error
      if (!quoteResponse.data) throw new Error('Could not create quotation for this order.')

      const { error: orderError } = await supabase.from('orders').insert([
        {
          user_id: user.id,
          quotation_id: quoteResponse.data.id,
          website_type: websiteType,
          amount: totalPrice,
          currency: 'INR',
          payment_status: 'unpaid',
          status: 'pending',
          project_details: {
            websiteName: `${selectedWebsite?.name ?? 'Website'} Project`,
            pagesCount,
            designLevel,
            maintenance,
            timeline,
            selectedFeatures,
          },
        },
      ])

      if (orderError) throw orderError
      router.push('/dashboard')
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TiltCard className="h-full">
      <div className="glass-card relative h-full overflow-hidden p-6 md:p-7">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-brand-accent/80">Live Estimate</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{formatPrice(totalPrice)}</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-brand-surface p-3 text-brand-accent">
            <CircleDollarSign className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-brand-surface px-4 py-3">
            <span className="text-slate-200">Website Type</span>
            <span className="text-white">{selectedWebsite?.name ?? 'Select one'}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-brand-surface px-4 py-3">
            <span className="text-slate-200">Pages</span>
            <span className="text-white">{String(pagesCount)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-brand-surface px-4 py-3">
            <span className="text-slate-200">Design</span>
            <span className="text-white">{selectedDesign?.name ?? 'Premium'}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-brand-surface px-4 py-3">
            <span className="text-slate-200">Maintenance</span>
            <span className="text-white">{selectedMaintenance?.name ?? '-'}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-brand-surface px-4 py-3">
            <span className="text-slate-200">Timeline</span>
            <span className="text-white">{selectedTimeline?.name ?? '-'}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-brand-surface px-4 py-3">
            <span className="text-slate-200">Features</span>
            <span className="text-white">{selectedFeatures.length}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-brand-accent/20 bg-brand-violet/15 px-4 py-3">
            <span className="text-slate-200">Features Total</span>
            <span className="text-white">{formatPrice(featuresPrice)}</span>
          </div>
        </div>

        {status && (
          <div className={`mt-5 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
            status.type === 'success'
              ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
              : 'border-rose-400/20 bg-rose-400/10 text-rose-200'
          }`}>
            <AlertCircle className="h-4 w-4 shrink-0" />
            {status.message}
          </div>
        )}

        <div className="mt-6 grid gap-3">
          {user ? (
            <motion.button
              onClick={handleSaveQuote}
              disabled={isLoading || !websiteType}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary justify-center gap-2 rounded-2xl border-white/10 bg-brand-surface px-5 py-4"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Save Quote
            </motion.button>
          ) : (
            <Link href="/auth" className="btn-secondary justify-center gap-2 rounded-2xl border-white/10 bg-brand-surface px-5 py-4 text-center">
              <Shield className="h-5 w-5" />
              Log in to save
            </Link>
          )}

          <motion.button
            onClick={handlePlaceOrder}
            disabled={isLoading || !websiteType}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="magnetic-btn justify-center gap-2 rounded-2xl px-5 py-4"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <CreditCard className="h-5 w-5" />}
            Place Order
          </motion.button>
        </div>

        {!user && (
          <p className="mt-4 text-center text-sm font-medium text-slate-200">
            You can browse the configurator freely, then sign in when you want to save or order.
          </p>
        )}
      </div>
    </TiltCard>
  )
}

function WebsiteTypeStep() {
  const { websiteType, setWebsiteType } = useQuotationStore()

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {websiteTypes.map((type) => (
        <OptionCard
          key={type.id}
          active={websiteType === type.id}
          icon={type.icon}
          title={type.name}
          subtitle={type.description}
          price={formatPrice(type.basePrice)}
          onClick={() => setWebsiteType(type.id)}
        />
      ))}
    </div>
  )
}

function PagesStep() {
  const { pagesCount, setPagesCount } = useQuotationStore()

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {pagesOptions.map((option) => (
        <OptionCard
          key={option.id}
          active={String(pagesCount) === option.id}
          icon={FileText}
          title={option.name}
          subtitle={option.id === 'unlimited' ? 'Best for larger product ecosystems' : 'Simplified page bundle'}
          price={formatPrice(option.price)}
          compact
          onClick={() => setPagesCount(option.id === 'unlimited' ? 'unlimited' : Number(option.id))}
        />
      ))}
    </div>
  )
}

function DesignLevelStep() {
  const { designLevel, setDesignLevel } = useQuotationStore()

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {designLevels.map((level) => (
        <OptionCard
          key={level.id}
          active={designLevel === level.id}
          icon={level.icon}
          title={level.name}
          subtitle={level.description}
          price={`x${level.multiplier}`}
          onClick={() => setDesignLevel(level.id as 'basic' | 'premium' | 'luxury' | 'god-level')}
        />
      ))}
    </div>
  )
}

function FeaturesStep() {
  const { selectedFeatures, toggleFeature } = useQuotationStore()
  const categories = [...new Set(featuresList.map((item) => item.category))]

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category}>
          <SectionTitle
            eyebrow={category}
            title={category}
            description="Add only the capabilities that really change the experience. The configurator stays clean when the selections are intentional."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {featuresList
              .filter((item) => item.category === category)
              .map((feature) => {
                const active = selectedFeatures.includes(feature.id)

                return (
                  <TiltCard key={feature.id} className="h-full">
                    <motion.button
                      type="button"
                      onClick={() => toggleFeature(feature.id, feature.price)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative flex h-full w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                        active
                          ? 'border-brand-accent/30 bg-brand-violet/15'
                          : 'border-white/10 bg-brand-surface hover:border-white/20 hover:bg-brand-surface-hover'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 via-transparent to-brand-violet/0 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
                      <div className="relative">
                        <h4 className="font-medium text-white">{feature.name}</h4>
                        <p className="mt-1 text-sm text-slate-200">{formatPrice(feature.price)}</p>
                      </div>
                      <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                        active ? 'border-brand-accent/30 bg-brand-accent text-[#0a0814]' : 'border-white/10 bg-brand-surface text-slate-200'
                      }`}>
                        {active && <Check className="h-4 w-4" />}
                      </div>
                    </motion.button>
                  </TiltCard>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}

function MaintenanceStep() {
  const { maintenance, setMaintenance } = useQuotationStore()

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {maintenanceOptions.map((option) => (
        <OptionCard
          key={option.id}
          active={maintenance === option.id}
          icon={Clock}
          title={option.name}
          subtitle={`Billed ${option.label}`}
          price={formatPrice(option.price)}
          onClick={() => setMaintenance(option.id as 'monthly' | 'yearly' | 'lifetime')}
        />
      ))}
    </div>
  )
}

function TimelineStep() {
  const { timeline, setTimeline } = useQuotationStore()

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {timelineOptions.map((option) => (
        <OptionCard
          key={option.id}
          active={timeline === option.id}
          icon={Wallet}
          title={option.name}
          subtitle={option.description}
          price={`x${option.multiplier}`}
          onClick={() => setTimeline(option.id as 'urgent' | 'normal' | 'premium-priority')}
        />
      ))}
    </div>
  )
}

export default function StorePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { websiteType, timeline, selectedFeatures, totalPrice } = useQuotationStore()
  const { user } = useAuth()

  const canProceed = () => {
    if (currentStep === 1) return !!websiteType
    if (currentStep === 6) return !!timeline
    return true
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="relative z-20 min-h-screen overflow-hidden pt-24 pb-20">

      <div className="container relative z-20 mx-auto px-4">
        <SectionReveal className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="brand-pill mb-4 text-xs uppercase tracking-[0.28em]">
              <CircleDollarSign className="h-4 w-4 text-brand-accent" />
              Live Website Configurator
            </div>
            <h1 className="max-w-3xl text-5xl font-bold leading-none text-white drop-shadow-lg md:text-7xl">
              Build a premium site with a visual rhythm that feels expensive.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-[1.8] text-slate-200 md:text-lg">
              Everything stays live while you design: price, structure, and order flow. The interface stays clean, but the depth and motion keep it feeling alive.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {['Live pricing', 'Fast checkout', 'Soft 3D depth', 'Mobile-safe motion'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-brand-surface px-4 py-2 text-sm text-slate-100">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <TiltCard className="h-full">
            <div className="glass-card relative overflow-hidden border border-white/10 bg-brand-surface p-6 shadow-2xl md:p-7">
              <div className="relative z-20">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.28em] text-brand-accent/80">Current Build</p>
                    <span className="rounded-full border border-white/10 bg-brand-surface px-3 py-1 text-xs text-slate-100">
                    Step {currentStep}/6
                  </span>
                </div>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-200">Estimated total</p>
                    <p className="mt-2 text-4xl font-semibold text-white">
                      {formatPrice(totalPrice)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-brand-surface p-3 text-brand-accent">
                    <Shield className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-200">
                  <div className="rounded-2xl border border-white/10 bg-brand-surface p-4">
                    <p className="text-slate-300">Selected type</p>
                    <p className="mt-1 text-white">{websiteType || 'None yet'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-brand-surface p-4">
                    <p className="text-slate-300">Features</p>
                    <p className="mt-1 text-white">{selectedFeatures.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </SectionReveal>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {TRUST_SIGNALS.slice(0, 3).map((signal) => (
            <div key={signal.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-lg font-semibold text-white">{signal.value}</p>
              <p className="mt-1 text-sm text-slate-300">{signal.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{signal.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          {steps.map((step) => (
            <StepPill
              key={step.id}
              step={step}
              active={currentStep === step.id}
              onClick={() => setCurrentStep(step.id)}
            />
          ))}
          <div className="ml-auto hidden h-1 w-64 overflow-hidden rounded-full bg-brand-surface-hover lg:block">
            <div className="brand-progress" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <div className="glass-card p-5 md:p-7">
              <SectionTitle
                eyebrow="Configuration"
                title={steps[currentStep - 1].title}
                description="The stepper stays understated so the content can breathe. Every panel is given enough room to feel intentional and premium."
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.28 }}
                >
                  {currentStep === 1 && <WebsiteTypeStep />}
                  {currentStep === 2 && <PagesStep />}
                  {currentStep === 3 && <DesignLevelStep />}
                  {currentStep === 4 && <FeaturesStep />}
                  {currentStep === 5 && <MaintenanceStep />}
                  {currentStep === 6 && <TimelineStep />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3">
              <motion.button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-secondary rounded-2xl px-5 py-4 ${
                  currentStep === 1 ? 'cursor-not-allowed brightness-75' : ''
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </motion.button>

              {currentStep < steps.length ? (
                <motion.button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`magnetic-btn rounded-2xl px-5 py-4 ${
                    !canProceed() ? 'cursor-not-allowed brightness-75' : ''
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              ) : (
                <div />
              )}
            </div>

            {!user && (
              <div className="glass-card border border-brand-accent/20 p-5">
                <p className="text-sm font-medium leading-6 text-slate-200">
                  Sign in to save a quotation or place the order. The configurator still works without signing in, so you can explore freely.
                </p>
                <Link href="/auth" className="mt-4 inline-flex items-center gap-2 text-sm text-brand-accent hover:text-white">
                  Log in to continue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <PriceSummary />
          </div>
        </div>

        <SectionReveal className="mt-14">
          <div className="premium-shell rounded-[32px] p-8 md:p-10">
            <div className="grid gap-6 lg:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-brand-accent">Premium guarantees</p>
                <h2 className="mt-4 text-3xl font-bold text-white">A configurator that feels productized, not improvised.</h2>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-white">Clear scope</p>
                <p className="mt-3 text-sm leading-7 text-slate-200">Choices are structured to reduce ambiguity before the build begins.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-white">Professional support</p>
                <p className="mt-3 text-sm leading-7 text-slate-200">Launch support and guidance stay available after the handoff.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-white">Trust-first presentation</p>
                <p className="mt-3 text-sm leading-7 text-slate-200">Pricing, options, and workflow are designed to feel dependable for real clients.</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}
