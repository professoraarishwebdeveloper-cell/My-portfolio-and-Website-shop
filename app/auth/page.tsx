'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, Chrome } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'
import { Card3DParallax } from '@/components/3d-parallax-card'
import { useAuth } from '@/components/auth-provider'
import {
  authLoginSchema,
  authSignupSchema,
  getFriendlyErrorMessage,
  logDevelopmentError,
  sanitizeInternalPath,
} from '@/lib/security'

const AUTH_COOLDOWN_MS = 4000

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAdmin, isLoading: authLoading, refreshProfile } = useAuth()
  const nextPath = useMemo(() => sanitizeInternalPath(searchParams?.get('next'), '/dashboard'), [searchParams])

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastAttemptRef = useRef(0)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    website: '',
  })

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(isAdmin ? '/admin' : nextPath)
    }
  }, [authLoading, isAdmin, nextPath, router, user])

  useEffect(() => {
    const authError = searchParams?.get('error')
    if (authError === 'callback_failed') {
      setError('We could not complete the sign-in callback. Please try again.')
    }
    if (authError === 'missing-supabase-config') {
      setError('Authentication is not configured correctly right now.')
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      window.location.origin
    url = url.includes('http') ? url : `https://${url}`
    url = url.endsWith('/') ? url : `${url}/`
    return `${url}auth/callback?next=${encodeURIComponent(nextPath)}`
  }

  const canAttempt = () => Date.now() - lastAttemptRef.current >= AUTH_COOLDOWN_MS

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!canAttempt()) {
      setError('Please wait a few seconds before trying again.')
      return
    }

    const schema = mode === 'signup' ? authSignupSchema : authLoginSchema
    const parsed = schema.safeParse(formData)

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please check the form and try again.')
      return
    }

    if (parsed.data.website) {
      setIsLoading(true)
      lastAttemptRef.current = Date.now()
      setTimeout(() => {
        router.replace(nextPath)
      }, 400)
      return
    }

    setIsLoading(true)
    lastAttemptRef.current = Date.now()

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: getURL(),
            data: {
              full_name: parsed.data.full_name,
              avatar_url: '',
            },
          },
        })

        if (signUpError) throw signUpError
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        })

        if (signInError) throw signInError
      }

      await refreshProfile()
      router.push(nextPath)
    } catch (err) {
      logDevelopmentError('auth-email', err)
      setError(getFriendlyErrorMessage('auth'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuth = async (provider: 'google' | 'discord') => {
    setError(null)

    if (!canAttempt()) {
      setError('Please wait a few seconds before trying again.')
      return
    }

    if (formData.website.trim()) {
      return
    }

    setIsLoading(true)
    lastAttemptRef.current = Date.now()
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getURL(),
        },
      })
      if (error) throw error
    } catch (err) {
      logDevelopmentError('auth-oauth', err)
      setError(getFriendlyErrorMessage('auth'))
      setIsLoading(false)
    }
  }

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link href="/" className="mb-12 block text-center">
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block text-4xl font-display font-bold text-gradient-animated"
          >
            AK
          </motion.span>
        </Link>

        <Card3DParallax intensity={0.6} delay={0}>
          <div className="glass-card p-8">
            <h1 className="mb-2 text-center text-2xl font-display font-bold text-white">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'signup' && 'Create Account'}
            </h1>
            <p className="mb-8 text-center font-medium text-slate-200">
              {mode === 'login' && 'Sign in to your account'}
              {mode === 'signup' && 'Join to start building'}
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-2 rounded-lg bg-red-400/10 p-4 text-red-300"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialAuth('google')}
                disabled={isLoading}
                className="btn-secondary w-full justify-center"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Continue with Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialAuth('discord')}
                disabled={isLoading}
                className="btn-secondary w-full justify-center"
              >
                <FaDiscord className="mr-2 h-5 w-5" />
                Continue with Discord
              </motion.button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-cosmic-deep px-4 text-sm text-slate-300">or</span>
              </div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              {mode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    maxLength={80}
                    className="cosmic-input pl-12"
                    placeholder="Full Name"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={120}
                  className="cosmic-input pl-12"
                  placeholder="you@example.com"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={mode === 'signup' ? 8 : 6}
                  maxLength={72}
                  className="cosmic-input pl-12"
                  placeholder="••••••••"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="magnetic-btn w-full justify-center"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Sign Up'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 border-t border-white/20 pt-6 text-center">
              <p className="text-sm text-slate-300">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-cosmic-accent hover:underline">
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </Card3DParallax>
      </motion.div>
    </div>
  )
}
