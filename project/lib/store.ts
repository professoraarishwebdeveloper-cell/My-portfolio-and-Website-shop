import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Auth store
interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  role: 'client' | 'admin'
}

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)

// Quotation store for the store/configurator
interface QuotationState {
  websiteType: string
  pagesCount: number | 'unlimited'
  designLevel: 'basic' | 'premium' | 'luxury' | 'god-level'
  selectedFeatures: string[]
  maintenance: 'monthly' | 'yearly' | 'lifetime'
  timeline: 'urgent' | 'normal' | 'premium-priority'
  basePrice: number
  featuresPrice: number
  totalPrice: number

  setWebsiteType: (type: string) => void
  setPagesCount: (count: number | 'unlimited') => void
  setDesignLevel: (level: QuotationState['designLevel']) => void
  toggleFeature: (feature: string, price: number) => void
  setMaintenance: (maintenance: QuotationState['maintenance']) => void
  setTimeline: (timeline: QuotationState['timeline']) => void
  calculateTotal: () => void
  reset: () => void
}

const WEBSITE_PRICES: Record<string, number> = {
  portfolio: 15000,
  business: 25000,
  agency: 35000,
  ecommerce: 50000,
  blog: 12000,
  'custom-app': 75000,
  'ai-saas': 150000,
  dashboard: 45000,
  landing: 8000,
}

const DESIGN_MULTIPLIERS = {
  basic: 1,
  premium: 1.5,
  luxury: 2,
  'god-level': 3,
}

const PAGES_PRICES: Record<string, number> = {
  '1': 0,
  '5': 5000,
  '10': 10000,
  '20': 20000,
  'unlimited': 50000,
}

const TIMELINE_MULTIPLIERS = {
  urgent: 1.5,
  normal: 1,
  'premium-priority': 2,
}

const MAINTENANCE_PRICES = {
  monthly: 2000,
  yearly: 15000,
  lifetime: 50000,
}

export const useQuotationStore = create<QuotationState>((set, get) => ({
  websiteType: '',
  pagesCount: 1,
  designLevel: 'premium',
  selectedFeatures: [],
  maintenance: 'yearly',
  timeline: 'normal',
  basePrice: 0,
  featuresPrice: 0,
  totalPrice: 0,

  setWebsiteType: (type) => {
    set({ websiteType: type })
    get().calculateTotal()
  },
  setPagesCount: (count) => {
    set({ pagesCount: count })
    get().calculateTotal()
  },
  setDesignLevel: (level) => {
    set({ designLevel: level })
    get().calculateTotal()
  },
  toggleFeature: (feature, price) => {
    const { selectedFeatures, featuresPrice } = get()
    const exists = selectedFeatures.includes(feature)
    if (exists) {
      set({
        selectedFeatures: selectedFeatures.filter(f => f !== feature),
        featuresPrice: featuresPrice - price,
      })
    } else {
      set({
        selectedFeatures: [...selectedFeatures, feature],
        featuresPrice: featuresPrice + price,
      })
    }
    get().calculateTotal()
  },
  setMaintenance: (maintenance) => {
    set({ maintenance })
    get().calculateTotal()
  },
  setTimeline: (timeline) => {
    set({ timeline })
    get().calculateTotal()
  },
  calculateTotal: () => {
    const { websiteType, pagesCount, designLevel, timeline, maintenance, featuresPrice } = get()

    let base = WEBSITE_PRICES[websiteType] || 0
    const pagesPrice = PAGES_PRICES[String(pagesCount)] || 0
    const designMultiplier = DESIGN_MULTIPLIERS[designLevel]
    const timelineMultiplier = TIMELINE_MULTIPLIERS[timeline]
    const maintenancePrice = MAINTENANCE_PRICES[maintenance]

    let total = (base + pagesPrice) * designMultiplier * timelineMultiplier + featuresPrice + maintenancePrice

    set({
      basePrice: base * designMultiplier,
      totalPrice: Math.round(total),
    })
  },
  reset: () => set({
    websiteType: '',
    pagesCount: 1,
    designLevel: 'premium',
    selectedFeatures: [],
    maintenance: 'yearly',
    timeline: 'normal',
    basePrice: 0,
    featuresPrice: 0,
    totalPrice: 0,
  }),
}))

// UI store for global UI state
interface UIState {
  isMobileMenuOpen: boolean
  currentStep: number
  isLoading: boolean
  setMobileMenuOpen: (open: boolean) => void
  setCurrentStep: (step: number) => void
  setLoading: (loading: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  currentStep: 1,
  isLoading: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setLoading: (isLoading) => set({ isLoading }),
}))
