'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from 'lucide-react'

const links = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/store', label: 'Store' },
  { href: '/contact', label: 'Contact' },
]

export function SiteFooter() {
  return (
    <footer className="relative z-20 mt-8 border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-2xl font-bold text-gradient-animated">Aarish Khatib</p>
            <p className="mt-4 max-w-md text-sm font-medium leading-7 text-slate-200">
              Premium digital agency experiences — design, development, and growth-focused products built with clarity and motion.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/store" className="magnetic-btn !px-5 !py-3 text-sm">
                Start a project
              </Link>
              <Link href="/contact" className="btn-secondary !px-5 !py-3 text-sm">
                Contact
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Navigate</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-slate-200 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Services</p>
              <ul className="space-y-3 text-sm text-slate-200">
                <li>Web Development</li>
                <li>UI/UX Design</li>
                <li>AI Integration</li>
                <li>Brand Systems</li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Connect</p>
              <div className="flex flex-col gap-3">
                <a href="mailto:mr.shadow4704@gmail.com" className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white">
                  <Mail className="h-4 w-4 text-brand-accent" /> Email
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white">
                  <Github className="h-4 w-4 text-brand-accent" /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white">
                  <Linkedin className="h-4 w-4 text-brand-accent" /> LinkedIn
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white">
                  <Twitter className="h-4 w-4 text-brand-accent" /> Twitter
                </a>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-300 md:flex-row"
        >
          <p>© {new Date().getFullYear()} Aarish Khatib. All rights reserved.</p>
          <p className="text-slate-400">Crafted with motion, clarity, and purpose.</p>
        </motion.div>
      </div>
    </footer>
  )
}
