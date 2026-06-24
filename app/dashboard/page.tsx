import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { hasSupabaseConfig } from '@/lib/supabase'
import { DashboardClient } from '@/app/dashboard/dashboard-client'

export default async function DashboardPage() {
  if (!hasSupabaseConfig) {
    redirect('/auth')
  }

  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth?next=%2Fdashboard')
  }

  return <DashboardClient />
}
