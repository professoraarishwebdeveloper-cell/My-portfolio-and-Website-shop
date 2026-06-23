'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, hasSupabaseConfig } from '@/lib/supabase'

type Profile = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url?: string | null
  role: 'client' | 'admin'
}

type AuthContextValue = {
  session: Session | null
  user: User | null
  profile: Profile | null
  isAdmin: boolean
  isLoading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function getDisplayName(user: User) {
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Customer'
  )
}

async function loadOrCreateProfile(user: User): Promise<Profile> {
  const email = user.email ?? null

  const { data: existingProfile, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url, role')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (existingProfile) {
    return {
      id: user.id,
      email: existingProfile.email ?? email,
      full_name: existingProfile.full_name ?? getDisplayName(user),
      avatar_url: existingProfile.avatar_url,
      role: existingProfile.role === 'admin' ? 'admin' : 'client',
    }
  }

  const profile = {
    id: user.id,
    email,
    full_name: getDisplayName(user),
    avatar_url: user.user_metadata?.avatar_url ?? null,
    role: 'client' as const,
  }

  const { error: insertError } = await supabase.from('profiles').insert(profile)
  if (insertError) {
    throw insertError
  }

  return profile
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshProfile = async () => {
    const { data } = await supabase.auth.getSession()
    const activeSession = data.session
    setSession(activeSession)

    if (!activeSession?.user || !hasSupabaseConfig) {
      setProfile(null)
      return
    }

    try {
      setProfile(await loadOrCreateProfile(activeSession.user))
    } catch (error) {
      console.error('Unable to load profile', error)
      setProfile({
        id: activeSession.user.id,
        email: activeSession.user.email ?? null,
        full_name: getDisplayName(activeSession.user),
        role: 'client',
      })
    }
  }

  useEffect(() => {
    let mounted = true

    const initialize = async () => {
      try {
        await refreshProfile()
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    initialize()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      if (!nextSession?.user || !hasSupabaseConfig) {
        setProfile(null)
        setIsLoading(false)
        return
      }

      loadOrCreateProfile(nextSession.user)
        .then(setProfile)
        .catch((error) => {
          console.error('Unable to sync profile', error)
          setProfile({
            id: nextSession.user.id,
            email: nextSession.user.email ?? null,
            full_name: getDisplayName(nextSession.user),
            role: 'client',
          })
        })
        .finally(() => setIsLoading(false))
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setProfile(null)
  }

  const value = useMemo<AuthContextValue>(() => ({
    session,
    user: session?.user ?? null,
    profile,
    isAdmin: profile?.role === 'admin',
    isLoading,
    signOut,
    refreshProfile,
  }), [session, profile, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
