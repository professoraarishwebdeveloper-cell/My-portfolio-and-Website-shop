'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { getFriendlyErrorMessage, logDevelopmentError } from '@/lib/security'

type Profile = {
  full_name: string
  email: string
  role: string
  avatar_url?: string
}

type Quotation = {
  id: string
  website_type: string
  total_price: number
  status: string
}

type Order = {
  id: string
  website_type: string
  amount: number
  status: string
  project_details?: {
    websiteName?: string
  } | null
}

type Notification = {
  id: string
  message: string
  created_at: string
}

type Invoice = {
  id: string
  amount: number
  status: string
}

type WishlistItem = {
  id: string
  project_id: string
}

type DataCardProps<T> = {
  title: string
  data: T[]
  isLoading: boolean
  emptyMessage: string
  renderItem: (item: T) => ReactNode
}

const StatCard = ({
  label,
  value,
  isLoading,
}: {
  label: string
  value: number
  isLoading: boolean
}) => (
  <div className="glass-card p-6">
    <p className="mb-1 text-sm font-medium text-slate-300">{label}</p>

    {isLoading ? (
      <Loader2 className="h-6 w-6 animate-spin text-cosmic-accent" />
    ) : (
      <p className="text-2xl font-bold text-white">{value}</p>
    )}
  </div>
)

const DataCard = <T extends { id: string }>({
  title,
  data,
  isLoading,
  emptyMessage,
  renderItem,
}: DataCardProps<T>) => (
  <div className="glass-card p-6">
    <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>

    {isLoading ? (
      <div className="flex h-24 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cosmic-accent" />
      </div>
    ) : data.length > 0 ? (
      <ul className="space-y-3">{data.map(renderItem)}</ul>
    ) : (
      <p className="font-medium text-slate-300">{emptyMessage}</p>
    )}
  </div>
)

export function DashboardClient() {
  const router = useRouter()
  const { user, isAdmin, isLoading: authLoading } = useAuth()

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [wishlists, setWishlists] = useState<WishlistItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.replace('/auth')
      return
    }

    let cancelled = false

    const fetchDashboardData = async () => {
      setLoading(true)
      setError(null)

      try {
        const userId = user.id

        const [
          profileResult,
          quotationsResult,
          ordersResult,
          notificationsResult,
          invoicesResult,
          wishlistsResult,
        ] = await Promise.all([
          supabase.from('profiles').select('full_name,email,role,avatar_url').eq('id', userId).maybeSingle(),
          supabase.from('quotations').select('id,website_type,total_price,status').eq('user_id', userId),
          supabase.from('orders').select('id,website_type,amount,status,project_details').eq('user_id', userId),
          supabase.from('notifications').select('id,message,created_at').eq('user_id', userId),
          supabase.from('invoices').select('id,amount,status').eq('user_id', userId),
          supabase.from('wishlists').select('id,project_id').eq('user_id', userId),
        ])

        if (cancelled) return

        if (profileResult.error) {
          logDevelopmentError('dashboard-profile', profileResult.error)
        }

        setProfile(
          profileResult.data ?? {
            full_name: user.email?.split('@')[0] ?? 'Customer',
            email: user.email ?? '',
            role: isAdmin ? 'admin' : 'client',
          }
        )

        setQuotations(quotationsResult.data ?? [])
        setOrders(ordersResult.data ?? [])
        setNotifications(notificationsResult.data ?? [])
        setInvoices(invoicesResult.data ?? [])
        setWishlists(wishlistsResult.data ?? [])
      } catch (err) {
        if (!cancelled) {
          logDevelopmentError('dashboard-fetch', err)
          setError(getFriendlyErrorMessage('dashboard'))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchDashboardData()

    return () => {
      cancelled = true
    }
  }, [authLoading, isAdmin, router, user?.id, user?.email])

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-cosmic-accent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="glass-card p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="mt-2 font-medium text-slate-200">{error}</p>

          <button onClick={() => window.location.reload()} className="mt-6 magnetic-btn">
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="min-h-screen pb-20 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white">
            Welcome, {profile.full_name || 'Customer'}!
          </h1>
          <p className="font-medium text-slate-200">Here is your dashboard overview.</p>
        </motion.div>

        {isAdmin && (
          <div className="mb-6">
            <Link href="/admin" className="btn-secondary">
              Admin Panel
            </Link>
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Quotations" value={quotations.length} isLoading={loading} />
          <StatCard label="Orders" value={orders.length} isLoading={loading} />
          <StatCard label="Invoices" value={invoices.length} isLoading={loading} />
          <StatCard label="Notifications" value={notifications.length} isLoading={loading} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <DataCard
            title="Recent Orders"
            data={orders}
            isLoading={loading}
            emptyMessage="No orders placed yet."
            renderItem={(item) => (
              <li key={item.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-[#0d1528]">
                <span className="text-slate-100">
                  {item.project_details?.websiteName ?? item.website_type ?? 'Website Project'}
                </span>
                <span className="text-cosmic-accent">{formatPrice(item.amount)}</span>
              </li>
            )}
          />

          <DataCard
            title="Recent Quotations"
            data={quotations}
            isLoading={loading}
            emptyMessage="No quotations saved."
            renderItem={(item) => (
              <li key={item.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-[#0d1528]">
                <span className="text-slate-100">{item.website_type ?? 'Website Quotation'}</span>
                <span className="text-slate-200">{item.status ?? 'pending'}</span>
              </li>
            )}
          />

          <DataCard
            title="Notifications"
            data={notifications}
            isLoading={loading}
            emptyMessage="No new notifications."
            renderItem={(item) => (
              <li key={item.id} className="rounded-lg p-2 text-slate-100 hover:bg-[#0d1528]">
                {item.message}
              </li>
            )}
          />

          <DataCard
            title="Wishlist"
            data={wishlists}
            isLoading={loading}
            emptyMessage="Your wishlist is empty."
            renderItem={(item) => (
              <li key={item.id} className="rounded-lg p-2 text-slate-100 hover:bg-[#0d1528]">
                Saved project: {item.project_id}
              </li>
            )}
          />
        </div>
      </div>
    </div>
  )
}

function formatPrice(price: number | null | undefined): string {
  if (typeof price !== 'number' || Number.isNaN(price)) return '₹0'

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}