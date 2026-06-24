'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, Mail, Shield, Sparkles, ChevronDown, Phone, MessageCircle } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { CONTACT_DETAILS, NAVIGATION } from '@/lib/site-content'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const lastScrollY = useRef(0)
  const moreMenuRef = useRef<HTMLDivElement>(null)
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
    setIsMoreOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!moreMenuRef.current?.contains(event.target as Node)) {
        setIsMoreOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
            className={`premium-shell relative flex items-center justify-between overflow-visible rounded-[28px] px-5 py-4 shadow-2xl transition-all duration-500 ${
              isScrolled ? 'py-3' : ''
            }`}
          >
            <Link href="/" className="group relative z-10 flex items-center gap-3">
              <motion.span
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xl font-display font-bold text-gradient-animated"
              >
                AKPS
              </motion.span>
              <span className="hidden text-xs uppercase tracking-[0.28em] text-slate-300 md:block">Creative systems</span>
            </Link>

            <div className="hidden items-center gap-1 xl:flex">
              {NAVIGATION.primary.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} className="group relative px-3 py-2 text-sm font-medium transition-all">
                    <span className={`relative z-10 ${isActive ? 'text-white' : 'text-slate-100 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-xl border border-brand-accent/25 bg-brand-violet/10"
                        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                      />
                    )}
                  </Link>
                )
              })}

              <div ref={moreMenuRef} className="relative ml-1">
                <button
                  type="button"
                  onClick={() => setIsMoreOpen((current) => !current)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                    NAVIGATION.secondary.some((item) => pathname === item.href) || isMoreOpen
                      ? 'brand-pill-active'
                      : 'border-white/10 bg-brand-surface text-slate-100 hover:border-white/20 hover:text-white'
                  }`}
                >
                  More
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="premium-shell absolute right-0 top-[calc(100%+0.75rem)] w-56 rounded-3xl p-3"
                    >
                      {NAVIGATION.secondary.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-2xl px-4 py-3 text-sm transition-all ${
                              isActive ? 'bg-brand-violet/15 text-white' : 'text-slate-100 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={CONTACT_DETAILS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-brand-surface px-4 py-2 text-sm text-slate-100 transition-all hover:border-brand-accent/30 hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-brand-accent" />
                WhatsApp
              </a>

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
                <>
                  <Link href="/auth" className="px-3 py-2 text-sm text-slate-100 hover:text-white">
                    Client Login
                  </Link>
                  <Link href="/contact" className="magnetic-btn !px-5 !py-2.5 text-sm">
                    Start a Project
                  </Link>
                </>
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
              className="fixed inset-0 z-50 bg-[#07111f]/88 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="premium-shell fixed right-0 top-0 z-[60] flex h-full w-[min(88vw,390px)] flex-col overflow-y-auto rounded-l-[32px] p-6 pt-24 shadow-2xl lg:hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 rounded-full border border-white/10 bg-brand-surface-hover p-2 text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col gap-2">
                {[...NAVIGATION.primary, ...NAVIGATION.secondary].map((item, i) => {
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
                        className={`block rounded-2xl px-4 py-3 text-xl font-display font-semibold transition-colors ${
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
                  <div className="grid gap-3">
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="magnetic-btn inline-flex !px-8 !py-4 text-lg">
                      Start a Project
                    </Link>
                    <Link href="/auth" onClick={() => setIsOpen(false)} className="btn-secondary inline-flex !px-8 !py-4 text-lg">
                      Client Login
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-8 grid gap-3">
                <a
                  href={CONTACT_DETAILS.emailHref}
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-surface px-4 py-4 text-sm text-white"
                >
                  <Mail className="h-5 w-5 text-brand-accent" />
                  {CONTACT_DETAILS.email}
                </a>
                <a
                  href={CONTACT_DETAILS.phoneHref}
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-surface px-4 py-4 text-sm text-white"
                >
                  <Phone className="h-5 w-5 text-brand-accent" />
                  {CONTACT_DETAILS.phoneDisplay}
                </a>
                <a
                  href={CONTACT_DETAILS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-surface px-4 py-4 text-sm text-white"
                >
                  <MessageCircle className="h-5 w-5 text-brand-accent" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-[#0f1e32]/70 p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-brand-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  Trusted delivery
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  Premium websites, dashboards, and AI-backed systems designed to feel established from the first screen.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
