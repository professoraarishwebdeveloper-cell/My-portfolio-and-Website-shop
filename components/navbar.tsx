'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, Github, Twitter, Linkedin, Mail, Shield, Sparkles } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/journey', label: 'Journey' },
  { href: '/projects', label: 'Projects' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAdmin, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLogout = async () => {
    await signOut()
    setIsOpen(false)
    router.push('/')
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: scrollDirection === 'down' && isScrolled ? -100 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}
      >
        <div className="container mx-auto px-4">
          <motion.nav
            className={`relative flex items-center justify-between rounded-2xl border border-white/10 bg-brand-surface/95 px-6 py-4 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
              isScrolled ? 'py-3' : ''
            }`}
          >
            <Link href="/" className="group relative z-10">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xl font-display font-bold text-gradient-animated"
              >
                AK
              </motion.span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} className="group relative px-3 py-2 text-sm font-medium transition-all">
                    <span className={`relative z-10 ${isActive ? 'text-white drop-shadow-lg' : 'text-white group-hover:text-slate-200'}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg border border-brand-accent/25 bg-brand-violet/10"
                        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                      />
                    )}
                  </Link>
                )
              })}
              <Link href="/store" className="ml-2">
                <motion.span
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    pathname === '/store'
                      ? 'brand-pill-active'
                      : 'border border-brand-accent/30 bg-brand-violet/10 text-white hover:bg-brand-violet/20'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
                  Store
                </motion.span>
              </Link>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              {user ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-slate-200">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-slate-200">
                      <Shield className="h-4 w-4" />
                      Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-slate-200">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth" className="magnetic-btn !px-5 !py-2.5 text-sm">
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] p-2 text-white lg:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </motion.nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-[#0a0814]/85 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-[60] flex h-full w-[min(86vw,380px)] flex-col overflow-y-auto border-l border-white/10 bg-brand-surface p-6 pt-24 shadow-2xl lg:hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 rounded-full border border-white/10 bg-brand-surface-hover p-2 text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col gap-2">
                {[...navItems, { href: '/store', label: 'Store' }].map((item, i) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-xl font-display font-semibold transition-colors ${
                          isActive ? 'bg-brand-violet/15 text-white' : 'text-white hover:bg-white/5 hover:text-slate-200'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg text-white hover:text-slate-200">
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setIsOpen(false)} className="text-lg text-white hover:text-slate-200">
                        Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout} className="text-left text-lg text-white hover:text-slate-200">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/auth" onClick={() => setIsOpen(false)} className="magnetic-btn inline-flex !px-8 !py-4 text-lg">
                    Login
                  </Link>
                )}
              </div>

              <div className="mt-8 flex items-center gap-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-accent">
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-accent">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-accent">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="mailto:mr.shadow4704@gmail.com" className="text-white hover:text-brand-accent">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
