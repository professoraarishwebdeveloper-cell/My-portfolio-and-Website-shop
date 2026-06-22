'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, Chrome } from 'lucide-react'
import { Card3DParallax } from '@/components/3d-parallax-card'

interface Particle {
  id: number
  xValues: [number, number, number]
  yValues: [number, number, number]
  duration: number
  delay: number
  left: string
  top: string
}

export default function AuthPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
  })

  // Generate particles only on client side
  useEffect(() => {
    const generatedParticles: Particle[] = []
    for (let i = 0; i < 20; i++) {
      generatedParticles.push({
        id: i,
        xValues: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
        yValues: [Math.random() * window.innerHeight, Math.random() * window.innerHeight, Math.random() * window.innerHeight],
        duration: 20 + Math.random() * 10,
        delay: i * 0.5,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
      })
    }
    setParticles(generatedParticles)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (mode === 'signup') {
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.full_name,
            },
          },
        })

        if (signUpError) throw signUpError

        // Create profile
        if (user) {
          await supabase.from('profiles').insert([{
            id: user.id,
            email: formData.email,
            full_name: formData.full_name,
            role: 'client',
          }])

          setUser({
            id: user.id,
            email: formData.email,
            full_name: formData.full_name,
            role: 'client',
          })
        }
      } else if (mode === 'login') {
        const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (signInError) throw signInError

        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          setUser(profile ? {
            id: user.id,
            email: user.email || '',
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
            role: profile.role,
          } : {
            id: user.id,
            email: user.email || '',
            role: 'client',
          })
        }
      }

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${origin}/auth/reset-password`,
      })

      if (error) throw error

      setError('Password reset email sent! Check your inbox.')
      setMode('login')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Animated particle background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              x: particle.xValues,
              y: particle.yValues,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            className="absolute w-2 h-2 rounded-full bg-cosmic-accent"
            style={{
              left: particle.left,
              top: particle.top,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="block text-center mb-12">
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl font-display font-bold text-gradient-animated inline-block"
          >
            AK
          </motion.span>
        </Link>

        {/* Auth card with 3D parallax */}
        <Card3DParallax intensity={0.6} delay={0}>
          <div className="glass-card p-8">
          <h1 className="text-2xl font-display font-bold text-white mb-2 text-center">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h1>

          <p className="text-white/60 text-center mb-8">
            {mode === 'login' && 'Sign in to your account'}
            {mode === 'signup' && 'Join to start building'}
            {mode === 'forgot' && 'Enter your email to reset password'}
          </p>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${
                error.includes('sent') ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
              }`}
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Google Auth */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full btn-secondary justify-center mb-6"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </motion.button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-cosmic-deep text-white/40 text-sm">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={mode === 'forgot' ? handleForgotPassword : handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-white/70 text-sm mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="cosmic-input pl-12"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="cosmic-input pl-12"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-white/70 text-sm mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="cosmic-input pl-12"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full magnetic-btn justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Email'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </motion.button>
          </form>

          {/* Mode switcher */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center space-y-2">
            {mode === 'login' && (
              <>
                <button
                  onClick={() => setMode('forgot')}
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Forgot password?
                </button>
                <p className="text-white/50 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-cosmic-accent hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <p className="text-white/50 text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-cosmic-accent hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <button
                onClick={() => setMode('login')}
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Back to login
              </button>
            )}
          </div>
          </div>
        </Card3DParallax>
      </motion.div>
    </div>
  )
}
