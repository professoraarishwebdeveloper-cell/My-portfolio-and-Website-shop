'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, ShieldOff, AlertCircle, Users, FileText, Package, IndianRupee, MessageSquare } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'

type AdminData = {
  contacts: any[] | null;
  quotations: any[] | null;
  orders: any[] | null;
  profiles: any[] | null;
  invoices: any[] | null;
  notifications: any[] | null;
};

const DataTable = ({ title, data, columns, isLoading, emptyMessage }: { title: string; data: any[] | null; columns: string[]; isLoading: boolean; emptyMessage: string; }) => (
  <div className="glass-card p-6 my-6">
    <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
    {isLoading ? (
      <div className="flex justify-center items-center h-40"><Loader2 className="w-8 h-8 animate-spin" /></div>
    ) : !data || data.length === 0 ? (
      <p className="font-medium text-slate-300">{emptyMessage}</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/20">
              {columns.map(col => <th key={col} className="p-3 text-sm font-semibold text-slate-300">{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-white/10 hover:bg-[#0d1528]">
                {columns.map(col => <td key={col} className="p-3 text-sm text-slate-200">{JSON.stringify(row[col.toLowerCase().replace(' ','_')])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const StatCard = ({ label, value, icon: Icon }: { label: string; value: string | number; icon: any }) => (
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
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
}

export default function AdminPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      if (authLoading) return

      if (!user) {
        router.push('/auth');
        return;
      }

      if (!isAdmin) {
        setLoading(false);
        return;
      }

      try {
        const [contacts, quotations, orders, profiles, invoices, notifications] = await Promise.all([
          supabase.from('contacts').select('*'),
          supabase.from('quotations').select('*'),
          supabase.from('orders').select('*'),
          supabase.from('profiles').select('id, email, full_name, role'),
          supabase.from('invoices').select('*'),
          supabase.from('notifications').select('*'),
        ]);

        const firstError = [contacts, quotations, orders, profiles, invoices, notifications].find((result) => result.error)?.error
        if (firstError) {
          console.error(firstError.message)
        }

        setData({
          contacts: contacts.data ?? [],
          quotations: quotations.data ?? [],
          orders: orders.data ?? [],
          profiles: profiles.data ?? [],
          invoices: invoices.data ?? [],
          notifications: notifications.data ?? [],
        })

      } catch (err: any) {
        setError(`Failed to fetch admin data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchData();
  }, [authLoading, isAdmin, router, user]);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><Loader2 className="w-12 h-12 animate-spin text-cosmic-accent" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <ShieldOff className="w-24 h-24 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-white">Access Denied</h1>
        <p className="mt-2 font-medium text-slate-200">You do not have permission to view this page.</p>
        <Link href="/dashboard" className="mt-6 magnetic-btn">Go to Dashboard</Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <AlertCircle className="w-24 h-24 text-yellow-500 mb-4" />
        <h1 className="text-4xl font-bold text-white">An Error Occurred</h1>
        <p className="mt-2 font-medium text-slate-200">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 magnetic-btn">Try Again</button>
      </div>
    );
  }

  const contacts = data?.contacts ?? []
  const quotations = data?.quotations ?? []
  const orders = data?.orders ?? []
  const invoices = data?.invoices ?? []
  const paidRevenue = invoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + Number(invoice.amount ?? 0), 0)
  const pendingOrders = orders.filter((order) => ['pending', 'processing', 'in_progress', 'review'].includes(order.status)).length
  const completedOrders = orders.filter((order) => order.status === 'completed').length
  const recentMessages = contacts.slice(0, 5)
  const recentOrders = orders.slice(0, 5)
  const recentQuotes = quotations.slice(0, 5)

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-display font-bold text-white drop-shadow-lg mb-3">Admin Panel</h1>
          <p className="mb-8 max-w-2xl font-medium leading-[1.8] text-slate-200">Operational overview for leads, quotes, orders, customers, invoices, and recent activity.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
          <StatCard label="Total Leads" value={contacts.length} icon={MessageSquare} />
          <StatCard label="Total Quotes" value={quotations.length} icon={FileText} />
          <StatCard label="Total Orders" value={orders.length} icon={Package} />
          <StatCard label="Pending Orders" value={pendingOrders} icon={Loader2} />
          <StatCard label="Completed Orders" value={completedOrders} icon={Users} />
          <StatCard label="Paid Revenue" value={formatPrice(paidRevenue)} icon={IndianRupee} />
        </div>

        <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-3">
          <DataTable title="Recent Messages" data={recentMessages} columns={['Name', 'Email', 'Message']} isLoading={loading} emptyMessage="No recent messages." />
          <DataTable title="Recent Orders" data={recentOrders} columns={['Website Type', 'Amount', 'Status']} isLoading={loading} emptyMessage="No recent orders." />
          <DataTable title="Recent Quote Requests" data={recentQuotes} columns={['Website Type', 'Total Price', 'Status']} isLoading={loading} emptyMessage="No recent quotes." />
        </div>
        
        <DataTable title="Profiles" data={data?.profiles ?? null} columns={['ID', 'Full Name', 'Email', 'Role']} isLoading={loading} emptyMessage="No profiles found." />
        <DataTable title="Contacts" data={data?.contacts ?? null} columns={['Name', 'Email', 'Message']} isLoading={loading} emptyMessage="No contact messages." />
        <DataTable title="Quotations" data={data?.quotations ?? null} columns={['Website Type', 'Total Price', 'Status']} isLoading={loading} emptyMessage="No quotations found." />
        <DataTable title="Orders" data={data?.orders ?? null} columns={['Website Type', 'Amount', 'Status']} isLoading={loading} emptyMessage="No orders found." />
        <DataTable title="Invoices" data={data?.invoices ?? null} columns={['Amount', 'Status']} isLoading={loading} emptyMessage="No invoices found." />
        <DataTable title="Notifications" data={data?.notifications ?? null} columns={['Message', 'Created At']} isLoading={loading} emptyMessage="No notifications found." />

      </div>
    </div>
  );
}
