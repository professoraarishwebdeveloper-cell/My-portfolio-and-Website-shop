import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { hasSupabaseConfig } from '@/lib/supabase'
import { sanitizeInternalPath } from '@/lib/security'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = sanitizeInternalPath(requestUrl.searchParams.get('next'), '/dashboard')
  const origin = requestUrl.origin

  if (!code) {
    return NextResponse.redirect(`${origin}/auth?error=callback_failed`)
  }

  if (!hasSupabaseConfig) {
    return NextResponse.redirect(`${origin}/auth?error=missing-supabase-config`)
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options) {
          cookieStore.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options) {
          cookieStore.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
          })
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(`${origin}/auth?error=callback_failed`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}