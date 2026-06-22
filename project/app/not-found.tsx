'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cosmic-void flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-8xl font-display font-bold text-gradient-animated mb-6"
        >
          404
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cosmic-accent text-cosmic-void rounded-lg font-semibold hover:bg-cosmic-accent/90 transition-colors"
          >
            Go Home
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
