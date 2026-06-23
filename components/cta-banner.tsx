'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { SectionReveal } from '@/components/section-reveal'

export function CtaBanner() {
  return (
    <SectionReveal>
      <div className="glass-card relative overflow-hidden border border-white/10 p-10 md:p-14 shadow-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#4B45F4]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[#5EAEF9]/20 blur-3xl" />
        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1e1a38] px-4 py-2 text-xs uppercase tracking-[0.24em] text-brand-accent">
              <Sparkles className="h-4 w-4" />
              Ready to grow
            </div>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg md:text-4xl">
              Let&apos;s build something that looks premium and performs even better.
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-200 md:text-lg">
              From concept to launch — websites, apps, and digital products designed to convert and impress.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/store">
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="magnetic-btn inline-flex items-center gap-2 !px-6 !py-4 text-sm"
              >
                Configure your build
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary inline-flex !px-6 !py-4 text-sm"
              >
                Book a call
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
