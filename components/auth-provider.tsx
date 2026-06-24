'use client'

import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, hasSupabaseConfig } from '@/lib/supabase'
import { logDevelopmentError } from '@/lib/security'

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

function fallbackProfile(user: User): Profile {
  return {
    id: user.id,
    email: user.email ?? null,
    full_name: getDisplayName(user),
    avatar_url: user.user_metadata?.avatar_url ?? null,
    role: 'client',
  }
}

async function loadOrCreateProfile(user: User): Promise<Profile> {
  const { data: existingProfile, error } = await supabase
    .from('profiles')
    .select('id,email,full_name,avatar_url,role')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (existingProfile) {
    return {
      id: user.id,
      email: existingProfile.email ?? user.email ?? null,
      full_name: existingProfile.full_name ?? getDisplayName(user),
      avatar_url: existingProfile.avatar_url ?? null,
      role: existingProfile.role === 'admin' ? 'admin' : 'client',
    }
  }

  const newProfile = fallbackProfile(user)

  const { error: insertError } = await supabase.from('profiles').insert(newProfile)

  if (insertError) {
    throw insertError
  }

  return newProfile
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const mountedRef = useRef(false)
  const loadingProfileRef = useRef(false)
  const lastLoadedUserIdRef = useRef<string | null>(null)

  const syncProfile = useCallback(async (activeSession: Session | null) => {
    if (!mountedRef.current) return

    setSession(activeSession)

    const user = activeSession?.user

    if (!user || !hasSupabaseConfig) {
      lastLoadedUserIdRef.current = null
      setProfile(null)
      setIsLoading(false)
      return
    }

    if (loadingProfileRef.current && lastLoadedUserIdRef.current === user.id) {
      return
    }

    loadingProfileRef.current = true
    lastLoadedUserIdRef.current = user.id

    try {
      const loadedProfile = await loadOrCreateProfile(user)

      if (!mountedRef.current) return

      setProfile(loadedProfile)
    } catch (error) {
      logDevelopmentError('auth-profile-sync', error)

      if (!mountedRef.current) return

      setProfile(fallbackProfile(user))
    } finally {
      loadingProfileRef.current = false

      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!hasSupabaseConfig) {
      setSession(null)
      setProfile(null)
      setIsLoading(false)
      return
    }

    const { data, error } = await supabase.auth.getSession()

    if (error) {
      logDevelopmentError('auth-refresh-session', error)
      setSession(null)
      setProfile(null)
      setIsLoading(false)
      return
    }

    await syncProfile(data.session)
  }, [syncProfile])

  useEffect(() => {
    mountedRef.current = true

    refreshProfile()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)

      window.setTimeout(() => {
        syncProfile(nextSession)
      }, 0)
    })

    return () => {
      mountedRef.current = false
      subscription.unsubscribe()
    }
  }, [refreshProfile, syncProfile])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    lastLoadedUserIdRef.current = null
    setSession(null)
    setProfile(null)
    setIsLoading(false)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      isAdmin: profile?.role === 'admin',
      isLoading,
      signOut,
      refreshProfile,
    }),
    [session, profile, isLoading, signOut, refreshProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}