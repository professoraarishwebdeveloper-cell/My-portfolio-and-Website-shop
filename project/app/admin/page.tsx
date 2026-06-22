'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'
import {
  Users,
  ShoppingCart,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Package,
  Mail,
  Eye,
  FileText,
  RefreshCw,
} from 'lucide-react'

// Order status badge
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-400',
    in_progress: 'bg-blue-500/20 text-blue-400',
    review: 'bg-purple-500/20 text-purple-400',
    completed: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
  }

  return (
    <span className={`text-xs px-3 py-1 rounded-full ${colors[status] || 'bg-white/10 text-white/50'}`}>
      {status.replace('_', ' ')}
    </span>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Admin data
  const [orders, setOrders] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalUsers: 0,
  })

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profile?.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      setIsAdmin(true)
      await fetchAdminData()
      setIsLoading(false)
    }

    checkAdmin()
  }, [router])

  const fetchAdminData = async () => {
    // Get orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*, profiles(email, full_name)')
      .order('created_at', { ascending: false })
      .limit(20)

    setOrders(ordersData || [])

    // Get contacts
    const { data: contactsData } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    setContacts(contactsData || [])

    // Calculate stats
    const { count: usersCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    const completedOrders = ordersData?.filter(o => o.status === 'completed') || []
    const totalRevenue = completedOrders.reduce((acc, o) => acc + (o.amount || 0), 0)

    setStats({
      totalRevenue,
      pendingOrders: ordersData?.filter(o => o.status === 'pending').length || 0,
      completedOrders: completedOrders.length,
      totalUsers: usersCount || 0,
    })
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId)

    if (!error) {
      await fetchAdminData()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-cosmic-accent animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8">
          Admin <span className="text-gradient">Dashboard</span>
        </h1>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm">Total Revenue</p>
                <p className="text-2xl font-display font-bold text-white">
                  <IndianRupee className="w-5 h-5 inline mr-1" />
                  {stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-400/50" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm">Pending Orders</p>
                <p className="text-2xl font-display font-bold text-white">{stats.pendingOrders}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-400/50" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm">Completed</p>
                <p className="text-2xl font-display font-bold text-white">{stats.completedOrders}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-400/50" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm">Total Users</p>
                <p className="text-2xl font-display font-bold text-white">{stats.totalUsers}</p>
              </div>
              <Users className="w-10 h-10 text-cosmic-accent/50" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders */}
          <div className="lg:col-span-2">
            <div className="glass-card overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-cosmic-accent" />
                  Recent Orders
                </h2>
                <button
                  onClick={fetchAdminData}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-white/50 text-sm border-b border-white/10">
                      <th className="text-left p-4">Order</th>
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <div>
                            <p className="text-white text-sm">{order.order_number}</p>
                            <p className="text-white/40 text-xs">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-white text-sm">{order.profiles?.email || order.user_id || 'Guest'}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-cosmic-accent font-medium">₹{(order.amount || 0).toLocaleString()}</p>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white cursor-hover"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="in_progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="lg:col-span-1">
            <div className="glass-card overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cosmic-accent" />
                  Recent Messages
                </h2>
              </div>

              <div className="divide-y divide-white/5">
                {contacts.map((contact) => (
                  <div key={contact.id} className="p-4 hover:bg-white/5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-medium">{contact.name}</p>
                        <p className="text-white/50 text-sm">{contact.email}</p>
                      </div>
                      {contact.status === 'unread' && (
                        <span className="w-2 h-2 rounded-full bg-cosmic-accent" />
                      )}
                    </div>
                    <p className="text-white/70 text-sm line-clamp-2">{contact.message}</p>
                    <p className="text-white/30 text-xs mt-2">{new Date(contact.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="glass-card p-6 text-center">
            <Package className="w-10 h-10 text-cosmic-accent mx-auto mb-4" />
            <p className="text-3xl font-display font-bold text-white">{orders.length}</p>
            <p className="text-white/50 text-sm">Total Orders</p>
          </div>

          <div className="glass-card p-6 text-center">
            <FileText className="w-10 h-10 text-cosmic-accent mx-auto mb-4" />
            <p className="text-3xl font-display font-bold text-white">{contacts.length}</p>
            <p className="text-white/50 text-sm">Contact Messages</p>
          </div>

          <div className="glass-card p-6 text-center">
            <Mail className="w-10 h-10 text-cosmic-accent mx-auto mb-4" />
            <p className="text-3xl font-display font-bold text-white">{contacts.filter(c => c.status === 'unread').length}</p>
            <p className="text-white/50 text-sm">Unread Messages</p>
          </div>
        </div>

        {/* Admin Note */}
        <div className="mt-8 p-6 border border-yellow-500/20 bg-yellow-500/5 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-white font-medium">Admin Access</p>
              <p className="text-white/60 text-sm mt-1">
                You have full access to manage orders, customers, and messages.
                Changes are saved immediately to the database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
