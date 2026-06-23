'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, User, LogOut, Github, Twitter, Linkedin, Mail, Shield } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/journey', label: 'Journey' },
  { href: '/projects', label: 'Projects' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/store', label: 'Store' },
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

  const { scrollY } = useScroll()

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3'
            : 'py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.nav
            className={`relative flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 border border-white/10 bg-[#0d1528] shadow-2xl ${
              isScrolled ? 'py-3' : ''
            }`}
            style={{
              boxShadow: isScrolled ? '0 24px 80px rgba(7, 17, 31, 0.45)' : 'none',
            }}
          >
            {/* Logo */}
            <Link href="/" className="relative z-10 group">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xl font-display font-bold text-white drop-shadow-lg"
              >
                AK
              </motion.span>
              <motion.span
                className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity rounded"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.4) 0%, transparent 70%)',
                }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium transition-all group"
                  >
                    <span
                      className={`relative z-10 transition-all ${
                        isActive ? 'text-white drop-shadow-lg' : 'text-white group-hover:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-[#0d1528] border border-white/15"
                        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
                      }}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors hover:text-slate-200"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors hover:text-slate-200"
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors hover:text-slate-200"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors hover:text-slate-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="magnetic-btn !px-5 !py-2.5 text-sm"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-[60] p-2 text-white"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-[#050816]/80 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Content */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="fixed right-0 top-0 z-[60] flex h-full w-[min(86vw,380px)] flex-col overflow-y-auto border-l border-white/10 bg-[#0d1528] p-6 pt-24 shadow-2xl lg:hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 rounded-full border border-white/15 bg-[#0d1528] p-2 text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <div
                    key={item.href}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-xl font-display font-semibold transition-colors ${
                        isActive ? 'text-white drop-shadow-lg' : 'text-white hover:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                )
              })}
              </div>

              <div className="mt-8 border-t border-white/15 pt-6">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg text-white hover:text-slate-200">
                      Profile
                    </Link>
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

              {/* Social Links */}
              <div className="flex items-center gap-6 mt-8">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-200 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-200 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-200 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:mr.shadow4704@gmail.com" className="text-white hover:text-slate-200 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
