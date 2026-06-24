import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { hasSupabaseConfig } from '@/lib/supabase'
import { AdminClient } from '@/app/admin/admin-client'

export default async function AdminPage() {
  if (!hasSupabaseConfig) {
    redirect('/auth')
  }

  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth?next=%2Fadmin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  return <AdminClient />
}
