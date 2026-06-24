'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'
import { BRAND, CONTACT_DETAILS, NAVIGATION, TRUST_SIGNALS } from '@/lib/site-content'

const quickLinks = [...NAVIGATION.primary.slice(1), ...NAVIGATION.secondary]

export function SiteFooter() {
  return (
    <footer className="relative z-20 mt-10 border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="premium-shell rounded-[32px] p-8 md:p-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-2xl font-bold text-gradient-animated">{BRAND.shortName}</p>
              <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-slate-200">
                {BRAND.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/store" className="magnetic-btn !px-5 !py-3 text-sm">
                  Build Your Website
                </Link>
                <Link href="/contact" className="btn-secondary !px-5 !py-3 text-sm">
                  Talk About Your Project
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <a href={CONTACT_DETAILS.emailHref} className="rounded-2xl border border-white/10 bg-brand-surface px-4 py-4 text-sm text-slate-100 transition-all hover:border-brand-accent/30 hover:text-white">
                  <Mail className="mb-3 h-5 w-5 text-brand-accent" />
                  Email
                </a>
                <a href={CONTACT_DETAILS.phoneHref} className="rounded-2xl border border-white/10 bg-brand-surface px-4 py-4 text-sm text-slate-100 transition-all hover:border-brand-accent/30 hover:text-white">
                  <Phone className="mb-3 h-5 w-5 text-brand-accent" />
                  Call
                </a>
                <a
                  href={CONTACT_DETAILS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 bg-brand-surface px-4 py-4 text-sm text-slate-100 transition-all hover:border-brand-accent/30 hover:text-white"
                >
                  <MessageCircle className="mb-3 h-5 w-5 text-brand-accent" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Navigate</p>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
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
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Trust Signals</p>
                <div className="space-y-3">
                  {TRUST_SIGNALS.slice(0, 3).map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-brand-surface px-4 py-3">
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                      <p className="mt-1 text-xs leading-6 text-slate-300">{item.title}</p>
                    </div>
                  ))}
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
            <p>© {new Date().getFullYear()} {BRAND.shortName}. All rights reserved.</p>
            <p className="text-slate-400">Response time: usually within 24 hours.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
