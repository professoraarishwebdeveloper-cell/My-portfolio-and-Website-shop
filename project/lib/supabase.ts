import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error)
    return null
  }
  return user
}

// Helper to get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error getting profile:', error)
    return null
  }
  return data
}

// Database types
export type Tables = {
  profiles: {
    id: string
    email: string
    full_name: string | null
    avatar_url: string | null
    phone: string | null
    role: 'client' | 'admin'
    dark_mode: boolean
    created_at: string
    updated_at: string
  }
  projects: {
    id: string
    title: string
    slug: string
    description: string | null
    long_description: string | null
    category: string | null
    technologies: string[] | null
    image_url: string | null
    gallery_urls: string[] | null
    live_url: string | null
    github_url: string | null
    featured: boolean
    order_index: number
    created_at: string
    updated_at: string
  }
  certificates: {
    id: string
    title: string
    issuing_organization: string | null
    issue_date: string | null
    credential_url: string | null
    image_url: string | null
    description: string | null
    order_index: number
    created_at: string
  }
  services: {
    id: string
    name: string
    slug: string
    description: string | null
    base_price: number
    features: string[] | null
    is_active: boolean
    order_index: number
    created_at: string
  }
  features: {
    id: string
    name: string
    slug: string
    description: string | null
    price: number
    category: string | null
    is_active: boolean
    created_at: string
  }
  quotations: {
    id: string
    user_id: string | null
    website_type: string
    pages_count: number
    design_level: string
    features: string[] | null
    maintenance: string
    timeline: string
    base_price: number
    features_price: number
    total_price: number
    status: string
    notes: string | null
    created_at: string
    updated_at: string
  }
  orders: {
    id: string
    order_number: string
    user_id: string | null
    quotation_id: string | null
    amount: number
    currency: string
    status: string
    payment_status: string
    payment_id: string | null
    payment_method: string | null
    paid_amount: number
    website_type: string | null
    project_details: any
    deadline: string | null
    notes: string | null
    admin_notes: string | null
    created_at: string
    updated_at: string
  }
  contacts: {
    id: string
    name: string
    email: string
    phone: string | null
    message: string
    budget: string | null
    website_type: string | null
    status: string
    replied_at: string | null
    created_at: string
  }
  journey_entries: {
    id: string
    year: number
    title: string
    description: string | null
    icon: string | null
    details: string[] | null
    order_index: number
    created_at: string
  }
  skills: {
    id: string
    name: string
    category: string
    proficiency: number
    icon: string | null
    description: string | null
    technologies: string[] | null
    order_index: number
    created_at: string
  }
  notifications: {
    id: string
    user_id: string
    title: string
    message: string | null
    type: string
    is_read: boolean
    link: string | null
    created_at: string
  }
  invoices: {
    id: string
    invoice_number: string
    order_id: string | null
    user_id: string | null
    amount: number
    tax: number
    total: number
    status: string
    due_date: string | null
    paid_at: string | null
    created_at: string
  }
}
