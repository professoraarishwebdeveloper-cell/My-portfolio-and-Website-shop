'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, User, LogOut, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

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
  const { user, logout } = useAuthStore()

  const { scrollY } = useScroll()
  const navY = useTransform(scrollY, [0, 100], [0, -100])

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
            className={`relative flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? 'bg-cosmic-deep/80 backdrop-blur-xl border border-white/10 shadow-lg'
                : 'bg-transparent border border-transparent'
            }`}
          >
            {/* Logo */}
            <Link href="/" className="relative z-10 group">
              <span className="text-xl font-display font-bold text-gradient-animated">
                AK
              </span>
              <span className="absolute inset-0 blur-lg bg-cosmic-aurora-start/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors group"
                  >
                    <span
                      className={`relative z-10 ${
                        isActive ? 'text-cosmic-accent' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-white/10"
                        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                      />
                    )}
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
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
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
              className="lg:hidden relative z-10 p-2 text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-cosmic-void/95 backdrop-blur-xl"
            />

            {/* Menu Content */}
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-3xl font-display font-semibold transition-colors ${
                        isActive ? 'text-cosmic-accent' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="mt-8"
              >
                {user ? (
                  <div className="flex flex-col items-center gap-4">
                    <Link href="/dashboard" className="text-lg text-white/70 hover:text-white">
                      Dashboard
                    </Link>
                    <button onClick={logout} className="text-lg text-white/70 hover:text-white">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/auth" className="magnetic-btn inline-flex !px-8 !py-4 text-lg">
                    Login
                  </Link>
                )}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (navItems.length + 1) * 0.05 }}
                className="flex items-center gap-6 mt-8"
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:mr.shadow4704@gmail.com" className="text-white/50 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
