'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Loader2,
  ShieldOff,
  AlertCircle,
  Users,
  FileText,
  Package,
  IndianRupee,
  MessageSquare,
} from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { getFriendlyErrorMessage, logDevelopmentError } from '@/lib/security'

type AdminData = {
  contacts: any[]
  quotations: any[]
  orders: any[]
  profiles: any[]
  invoices: any[]
  notifications: any[]
}

const emptyAdminData: AdminData = {
  contacts: [],
  quotations: [],
  orders: [],
  profiles: [],
  invoices: [],
  notifications: [],
}

function getValue(row: any, column: string) {
  const key = column.toLowerCase().replaceAll(' ', '_')
  const value = row?.[key]

  if (value === null || value === undefined) return '-'
  if (typeof value === 'object') return JSON.stringify(value)

  return String(value)
}

const DataTable = ({
  title,
  data,
  columns,
  emptyMessage,
}: {
  title: string
  data: any[]
  columns: string[]
  emptyMessage: string
}) => (
  <div className="glass-card my-6 p-6">
    <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>

    {data.length === 0 ? (
      <p className="font-medium text-slate-300">{emptyMessage}</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/20">
              {columns.map((col) => (
                <th key={col} className="p-3 text-sm font-semibold text-slate-300">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={row?.id ?? index} className="border-b border-white/10 hover:bg-[#0d1528]">
                {columns.map((col) => (
                  <td key={col} className="max-w-[260px] truncate p-3 text-sm text-slate-200">
                    {getValue(row, col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)

const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | number
  icon: any
}) => (
  <div className="glass-card p-5">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-300">{label}</p>
        <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      </div>

      <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-3 text-cosmic-accent">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
)

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function AdminClient() {
  const { user, isAdmin, isLoading: authLoading } = useAuth()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AdminData>(emptyAdminData)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchAdminData = async () => {
      if (authLoading) return

      if (!user || !isAdmin) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const [contacts, quotations, orders, profiles, invoices, notifications] = await Promise.all([
          supabase.from('contacts').select('*'),
          supabase.from('quotations').select('*'),
          supabase.from('orders').select('*'),
          supabase.from('profiles').select('id,email,full_name,role'),
          supabase.from('invoices').select('*'),
          supabase.from('notifications').select('*'),
        ])

        if (cancelled) return

        const firstError = [contacts, quotations, orders, profiles, invoices, notifications].find(
          (result) => result.error
        )?.error

        if (firstError) {
          logDevelopmentError('admin-fetch', firstError)
        }

        setData({
          contacts: contacts.data ?? [],
          quotations: quotations.data ?? [],
          orders: orders.data ?? [],
          profiles: profiles.data ?? [],
          invoices: invoices.data ?? [],
          notifications: notifications.data ?? [],
        })
      } catch (err) {
        if (!cancelled) {
          logDevelopmentError('admin-fetch', err)
          setError(getFriendlyErrorMessage('admin'))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchAdminData()

    return () => {
      cancelled = true
    }
  }, [authLoading, user?.id, isAdmin])

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-cosmic-accent" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <ShieldOff className="mb-4 h-24 w-24 text-red-500" />
        <h1 className="text-4xl font-bold text-white">Access Denied</h1>
        <p className="mt-2 font-medium text-slate-200">
          You do not have permission to view this page.
        </p>
        <Link href={user ? '/dashboard' : '/auth?next=%2Fadmin'} className="mt-6 magnetic-btn">
          {user ? 'Go to Dashboard' : 'Sign In'}
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <AlertCircle className="mb-4 h-24 w-24 text-yellow-500" />
        <h1 className="text-4xl font-bold text-white">An Error Occurred</h1>
        <p className="mt-2 font-medium text-slate-200">{error}</p>
      </div>
    )
  }

  const paidRevenue = data.invoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + Number(invoice.amount ?? 0), 0)

  const pendingOrders = data.orders.filter((order) =>
    ['pending', 'processing', 'in_progress', 'review'].includes(order.status)
  ).length

  const completedOrders = data.orders.filter((order) => order.status === 'completed').length

  return (
    <div className="min-h-screen px-4 pb-20 pt-24">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-3 text-5xl font-display font-bold text-white drop-shadow-lg">
            Admin Panel
          </h1>
          <p className="mb-8 max-w-2xl font-medium leading-[1.8] text-slate-200">
            Operational overview for leads, quotes, orders, customers, invoices, and recent activity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
          <StatCard label="Total Leads" value={data.contacts.length} icon={MessageSquare} />
          <StatCard label="Total Quotes" value={data.quotations.length} icon={FileText} />
          <StatCard label="Total Orders" value={data.orders.length} icon={Package} />
          <StatCard label="Pending Orders" value={pendingOrders} icon={Loader2} />
          <StatCard label="Completed Orders" value={completedOrders} icon={Users} />
          <StatCard label="Paid Revenue" value={formatPrice(paidRevenue)} icon={IndianRupee} />
        </div>

        <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-3">
          <DataTable title="Recent Messages" data={data.contacts.slice(0, 5)} columns={['Name', 'Email', 'Message']} emptyMessage="No recent messages." />
          <DataTable title="Recent Orders" data={data.orders.slice(0, 5)} columns={['Website Type', 'Amount', 'Status']} emptyMessage="No recent orders." />
          <DataTable title="Recent Quote Requests" data={data.quotations.slice(0, 5)} columns={['Website Type', 'Total Price', 'Status']} emptyMessage="No recent quotes." />
        </div>

        <DataTable title="Profiles" data={data.profiles} columns={['ID', 'Full Name', 'Email', 'Role']} emptyMessage="No profiles found." />
        <DataTable title="Contacts" data={data.contacts} columns={['Name', 'Email', 'Message']} emptyMessage="No contact messages." />
        <DataTable title="Quotations" data={data.quotations} columns={['Website Type', 'Total Price', 'Status']} emptyMessage="No quotations found." />
        <DataTable title="Orders" data={data.orders} columns={['Website Type', 'Amount', 'Status']} emptyMessage="No orders found." />
        <DataTable title="Invoices" data={data.invoices} columns={['Amount', 'Status']} emptyMessage="No invoices found." />
        <DataTable title="Notifications" data={data.notifications} columns={['Message', 'Created At']} emptyMessage="No notifications found." />
      </div>
    </div>
  )
}