'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, Package, AlertCircle } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'

// Define types for our data
type Profile = { full_name: string; email: string; role: string; avatar_url?: string };
type Quotation = { id: string; website_type: string; total_price: number; status: string };
type Order = { id: string; website_type: string; amount: number; status: string; project_details?: { websiteName?: string } | null };
type Notification = { id: string; message: string; created_at: string };
type Invoice = { id: string; amount: number; status: string };
type WishlistItem = { id: string; project_id: string };

const StatCard = ({ label, value, isLoading }: { label: string; value: number; isLoading: boolean }) => (
  <div className="glass-card p-6">
    <p className="mb-1 text-sm font-medium text-slate-300">{label}</p>
    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <p className="text-2xl font-bold text-white">{value}</p>}
  </div>
);

const DataCard = ({ title, data, isLoading, emptyMessage, renderItem }: 
  { title: string; data: any[] | null; isLoading: boolean; emptyMessage: string; renderItem: (item: any) => React.ReactNode }) => (
  <div className="glass-card p-6">
    <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
    {isLoading ? (
      <div className="flex justify-center items-center h-24">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    ) : data && data.length > 0 ? (
      <ul className="space-y-3">
        {data.map(renderItem)}
      </ul>
    ) : (
      <p className="font-medium text-slate-300">{emptyMessage}</p>
    )}
  </div>
);

export default function DashboardPage() {
  const router = useRouter()
  const { user, profile: authProfile, isAdmin, isLoading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  
  // State for all our data
  const [profile, setProfile] = useState<Profile | null>(null)
  const [quotations, setQuotations] = useState<Quotation[] | null>(null)
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [notifications, setNotifications] = useState<Notification[] | null>(null)
  const [invoices, setInvoices] = useState<Invoice[] | null>(null)
  const [wishlists, setWishlists] = useState<WishlistItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (authLoading) return

      if (!user) {
        router.push('/auth')
        return
      }

      const userId = user.id;

      try {
        const [ 
          profileData, quotationsData, ordersData, 
          notificationsData, invoicesData, wishlistsData 
        ] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
          supabase.from('quotations').select('*').eq('user_id', userId),
          supabase.from('orders').select('*').eq('user_id', userId),
          supabase.from('notifications').select('*').eq('user_id', userId),
          supabase.from('invoices').select('*').eq('user_id', userId),
          supabase.from('wishlists').select('*').eq('user_id', userId),
        ]);

        if (profileData.error) {
          console.error(profileData.error.message)
        }

        setProfile(profileData.data ?? authProfile ?? {
          full_name: user.email?.split('@')[0] ?? 'Customer',
          email: user.email ?? '',
          role: isAdmin ? 'admin' : 'client',
        })
        
        setQuotations(quotationsData.data ?? [])
        setOrders(ordersData.data ?? [])
        setNotifications(notificationsData.data ?? [])
        setInvoices(invoicesData.data ?? [])
        setWishlists(wishlistsData.data ?? [])

      } catch (err: any) {
        setError(`Failed to fetch data: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [authLoading, authProfile, isAdmin, router, user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cosmic-accent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 glass-card">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="mt-2 font-medium text-slate-200">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-6 magnetic-btn">Try again</button>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return null; // Should be redirected, but as a fallback
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome, {profile.full_name}!</h1>
          <p className="font-medium text-slate-200">Here is your dashboard overview.</p>
        </motion.div>

        {isAdmin && (
          <div className="mb-6">
            <Link href="/admin" className="btn-secondary">Admin Panel</Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Quotations" value={quotations?.length ?? 0} isLoading={loading} />
          <StatCard label="Orders" value={orders?.length ?? 0} isLoading={loading} />
          <StatCard label="Invoices" value={invoices?.length ?? 0} isLoading={loading} />
          <StatCard label="Notifications" value={notifications?.length ?? 0} isLoading={loading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DataCard 
            title="Recent Orders" 
            data={orders} 
            isLoading={loading}
            emptyMessage="No orders placed yet."
            renderItem={item => <li key={item.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-[#0d1528]"><span className="text-slate-100">{item.project_details?.websiteName ?? item.website_type}</span><span className="text-cosmic-accent">{formatPrice(item.amount)}</span></li>}
          />
          <DataCard 
            title="Recent Quotations" 
            data={quotations} 
            isLoading={loading}
            emptyMessage="No quotations saved."
            renderItem={item => <li key={item.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-[#0d1528]"><span className="text-slate-100">{item.website_type}</span><span className="text-slate-200">{item.status}</span></li>}
          />
          <DataCard 
            title="Notifications" 
            data={notifications} 
            isLoading={loading}
            emptyMessage="No new notifications."
            renderItem={item => <li key={item.id} className="rounded-lg p-2 text-slate-100 hover:bg-[#0d1528]">{item.message}</li>}
          />
          <DataCard 
            title="Wishlist" 
            data={wishlists} 
            isLoading={loading}
            emptyMessage="Your wishlist is empty."
            renderItem={item => <li key={item.id} className="rounded-lg p-2 text-slate-100 hover:bg-[#0d1528]">Saved project: {item.project_id}</li>}
          />
        </div>
      </div>
    </div>
  )
}

function formatPrice(price: number): string {
    if (typeof price !== 'number') return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
}
