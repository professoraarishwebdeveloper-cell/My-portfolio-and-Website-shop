'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, Chrome } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'
import { Card3DParallax } from '@/components/3d-parallax-card'
import { useAuth } from '@/components/auth-provider'

export default function AuthPage() {
  const router = useRouter()
  const { user, isAdmin, isLoading: authLoading, refreshProfile } = useAuth()

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
  })

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(isAdmin ? '/admin' : '/dashboard')
    }
  }, [authLoading, isAdmin, router, user]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const getURL = () => {
    let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/'
    url = url.includes('http') ? url : `https://${url}`
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return `${url}auth/callback`
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      let error: any;
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: getURL(),
            data: {
              full_name: formData.full_name,
              avatar_url: '', // Default avatar
            },
          },
        })
        error = signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        error = signInError
      }

      if (error) {
        throw error
      }
      await refreshProfile()
      router.push('/dashboard')

    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuth = async (provider: 'google' | 'discord') => {
    setIsLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: getURL() } })
      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setIsLoading(false)
    }
  }

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }


  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Link href="/" className="block text-center mb-12">
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl font-display font-bold text-gradient-animated inline-block"
          >
            AK
          </motion.span>
        </Link>

        <Card3DParallax intensity={0.6} delay={0}>
          <div className="glass-card p-8">
            <h1 className="text-2xl font-display font-bold text-white mb-2 text-center">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'signup' && 'Create Account'}
            </h1>
            <p className="mb-8 text-center font-medium text-[#DCE7F7]">
              {mode === 'login' && 'Sign in to your account'}
              {mode === 'signup' && 'Join to start building'}
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 rounded-lg mb-6 text-red-400 bg-red-400/10"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialAuth('google')}
                disabled={isLoading}
                className="w-full btn-secondary justify-center"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Continue with Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialAuth('discord')}
                disabled={isLoading}
                className="w-full btn-secondary justify-center"
              >
                <FaDiscord className="w-5 h-5 mr-2" />
                Continue with Discord
              </motion.button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-cosmic-deep px-4 text-sm text-[#B8C6DC]">or</span>
              </div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              {mode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8C6DC]" />
                  <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required className="cosmic-input pl-12" placeholder="Full Name" />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8C6DC]" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="cosmic-input pl-12" placeholder="you@example.com" />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8C6DC]" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={6} className="cosmic-input pl-12" placeholder="••••••••" />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isLoading} className="w-full magnetic-btn justify-center">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{mode === 'login' ? 'Sign In' : 'Sign Up'}<ArrowRight className="w-5 h-5 ml-2" /></>}
              </motion.button>
            </form>

            <div className="mt-6 border-t border-white/20 pt-6 text-center">
              <p className="text-sm text-[#B8C6DC]">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
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
