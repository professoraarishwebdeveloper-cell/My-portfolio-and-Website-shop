'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, ShieldOff, AlertCircle } from 'lucide-react'

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
      <p className="text-white/50">{emptyMessage}</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map(col => <th key={col} className="p-3 text-sm text-white/70 font-semibold">{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                {columns.map(col => <td key={col} className="p-3 text-sm text-white/90">{JSON.stringify(row[col.toLowerCase().replace(' ','_')])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        router.push('/auth');
        return;
      }

      const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();

      if (profileError || profile.role !== 'admin') {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      try {
        const [contacts, quotations, orders, profiles, invoices, notifications] = await Promise.all([
          supabase.from('contacts').select('*'),
          supabase.from('quotations').select('*'),
          supabase.from('orders').select('*'),
          supabase.from('profiles').select('id, email, full_name, role'),
          supabase.from('invoices').select('*'),
          supabase.from('notifications').select('*'),
        ]);

        setData({
          contacts: contacts.data,
          quotations: quotations.data,
          orders: orders.data,
          profiles: profiles.data,
          invoices: invoices.data,
          notifications: notifications.data,
        });

      } catch (err: any) {
        setError(`Failed to fetch admin data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchData();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><Loader2 className="w-12 h-12 animate-spin text-cosmic-accent" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <ShieldOff className="w-24 h-24 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-white">Access Denied</h1>
        <p className="text-white/70 mt-2">You do not have permission to view this page.</p>
        <Link href="/dashboard" className="mt-6 magnetic-btn">Go to Dashboard</Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <AlertCircle className="w-24 h-24 text-yellow-500 mb-4" />
        <h1 className="text-4xl font-bold text-white">An Error Occurred</h1>
        <p className="text-white/70 mt-2">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 magnetic-btn">Try Again</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-display font-bold text-gradient-animated mb-8">Admin Panel</h1>
        </motion.div>
        
        <DataTable title="Profiles" data={data?.profiles ?? null} columns={['ID', 'Full Name', 'Email', 'Role']} isLoading={loading} emptyMessage="No profiles found." />
        <DataTable title="Contacts" data={data?.contacts ?? null} columns={['Name', 'Email', 'Message']} isLoading={loading} emptyMessage="No contact messages." />
        <DataTable title="Quotations" data={data?.quotations ?? null} columns={['Website Type', 'Estimated Price', 'Status']} isLoading={loading} emptyMessage="No quotations found." />
        <DataTable title="Orders" data={data?.orders ?? null} columns={['Project Name', 'Total Amount', 'Order Status']} isLoading={loading} emptyMessage="No orders found." />
        <DataTable title="Invoices" data={data?.invoices ?? null} columns={['Amount', 'Status']} isLoading={loading} emptyMessage="No invoices found." />
        <DataTable title="Notifications" data={data?.notifications ?? null} columns={['Message', 'Created At']} isLoading={loading} emptyMessage="No notifications found." />

      </div>
    </div>
  );
}
