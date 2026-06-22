'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Loader2,
} from 'lucide-react'

// Dashboard stats
function StatCard({ icon: Icon, label, value, color, trend }: { icon: React.ElementType; label: string; value: string | number; color: string; trend?: string }) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/50 text-sm mb-1">{label}</p>
          <p className="text-2xl font-display font-bold text-white">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trend.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ background: `${color}20` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  )
}

// Recent order card
function OrderCard({ order }: { order: any }) {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-400',
    completed: 'bg-green-500/20 text-green-400',
    in_progress: 'bg-blue-500/20 text-blue-400',
  }

  return (
    <div className="glass-card p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-cosmic-accent/20 flex items-center justify-center">
          <Package className="w-5 h-5 text-cosmic-accent" />
        </div>
        <div>
          <p className="text-white font-medium">{order.order_number}</p>
          <p className="text-white/50 text-sm">{order.website_type || 'Website Project'}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">₹{order.amount.toLocaleString()}</p>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status] || 'bg-white/10 text-white/50'}`}>
          {order.status}
        </span>
      </div>
    </div>
  )
}

// Nav item
function NavItem({ icon: Icon, label, href, active }: { icon: React.ElementType; label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-hover ${
        active
          ? 'bg-cosmic-accent/20 text-cosmic-accent'
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, setUser, setLoading } = useAuthStore()
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth')
        return
      }

      // Get profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profile) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          role: profile.role,
        })
      }

      // Get orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      setOrders(ordersData || [])
      setIsLoading(false)
    }

    checkSession()
  }, [router, setUser])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cosmic-accent animate-spin" />
      </div>
    )
  }

  if (!user) {
    router.push('/auth')
    return null
  }

  const stats = [
    { icon: ShoppingCart, label: 'Active Projects', value: orders.filter(o => o.status !== 'completed').length, color: '#00d4ff' },
    { icon: CheckCircle2, label: 'Completed', value: orders.filter(o => o.status === 'completed').length, color: '#10b981' },
    { icon: Clock, label: 'In Progress', value: orders.filter(o => o.status === 'in_progress').length, color: '#f59e0b' },
    { icon: TrendingUp, label: 'Total Invested', value: `₹${orders.reduce((acc, o) => acc + (o.amount || 0), 0).toLocaleString()}`, color: '#ec4899' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <div className="glass-card p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cosmic-accent/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-cosmic-accent">
                    {user.full_name?.[0] || user.email[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{user.full_name || 'User'}</p>
                  <p className="text-white/50 text-sm">{user.email}</p>
                </div>
              </div>
            </div>

            <NavItem icon={LayoutDashboard} label="Overview" href="/dashboard" active={activeTab === 'overview'} />
            <NavItem icon={ShoppingCart} label="My Orders" href="/dashboard/orders" />
            <NavItem icon={FileText} label="Quotations" href="/dashboard/quotations" />
            <NavItem icon={MessageSquare} label="Messages" href="/dashboard/messages" />
            <NavItem icon={Heart} label="Wishlist" href="/dashboard/wishlist" />
            <NavItem icon={Settings} label="Settings" href="/dashboard/settings" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white w-full transition-all cursor-hover mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-4 space-y-8">
            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>

            {/* Welcome card */}
            <div className="glass-card p-8 bg-gradient-to-r from-cosmic-accent/10 via-transparent to-cosmic-glow/10">
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Welcome back, {user.full_name?.split(' ')[0] || 'User'}!
              </h1>
              <p className="text-white/60 mb-6">
                Track your projects, manage orders, and stay updated on progress.
              </p>
              <Link href="/store" className="magnetic-btn inline-flex">
                <span className="relative z-10">Start New Project</span>
              </Link>
            </div>

            {/* Recent Orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-semibold text-white">Recent Orders</h2>
                <Link href="/dashboard/orders" className="text-cosmic-accent text-sm hover:underline">
                  View All
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 text-center">
                  <Package className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/50">No orders yet</p>
                  <Link href="/store" className="text-cosmic-accent text-sm hover:underline mt-2 inline-block">
                    Start your first project
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/store" className="glass-card p-6 hover:bg-white/5 transition-all cursor-hover group">
                <ShoppingCart className="w-8 h-8 text-cosmic-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-1">New Project</h3>
                <p className="text-white/50 text-sm">Configure and start a new website project</p>
              </Link>

              <Link href="/contact" className="glass-card p-6 hover:bg-white/5 transition-all cursor-hover group">
                <MessageSquare className="w-8 h-8 text-cosmic-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-1">Get Support</h3>
                <p className="text-white/50 text-sm">Contact for help with your projects</p>
              </Link>

              <Link href="/projects" className="glass-card p-6 hover:bg-white/5 transition-all cursor-hover group">
                <FileText className="w-8 h-8 text-cosmic-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-1">Portfolio</h3>
                <p className="text-white/50 text-sm">Explore past projects and templates</p>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
