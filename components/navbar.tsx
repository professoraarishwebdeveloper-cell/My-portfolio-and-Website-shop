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
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          isScrolled
            ? 'py-3'
            : 'py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.nav
            className={`relative flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? 'bg-[#0B1730]/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/30'
                : 'bg-transparent border border-transparent'
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
                className="text-xl font-display font-bold text-gradient-animated"
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
                        isActive ? 'text-white' : 'text-[#CBD5E1] group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/15"
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
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#CBD5E1] hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#CBD5E1] hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#CBD5E1] hover:text-white transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#CBD5E1] hover:text-white transition-colors"
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
              className="lg:hidden relative z-[10001] p-2 text-white"
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
              className="fixed inset-0 z-[9999] bg-[#07111F]/85 backdrop-blur-md lg:hidden"
            />

            {/* Menu Content */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="fixed top-0 right-0 z-[10000] flex h-full w-[min(86vw,380px)] flex-col overflow-y-auto border-l border-white/15 bg-[#0B1730]/95 p-6 pt-24 shadow-2xl shadow-black/50 backdrop-blur-2xl lg:hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/[0.07] p-2 text-white"
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
                        isActive ? 'text-white' : 'text-[#CBD5E1] hover:text-white'
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
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg text-[#CBD5E1] hover:text-white">
                      Profile
                    </Link>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg text-[#CBD5E1] hover:text-white">
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setIsOpen(false)} className="text-lg text-[#CBD5E1] hover:text-white">
                        Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout} className="text-left text-lg text-[#CBD5E1] hover:text-white">
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
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#CBD5E1] hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#CBD5E1] hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#CBD5E1] hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:mr.shadow4704@gmail.com" className="text-[#CBD5E1] hover:text-white transition-colors">
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
