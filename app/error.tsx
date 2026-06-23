'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-cosmic-void flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="flex justify-center mb-6"
        >
          <AlertCircle className="w-16 h-16 text-cosmic-accent" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          We encountered an unexpected error. Please try refreshing the page or go back home.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-3 bg-cosmic-accent text-cosmic-void rounded-lg font-semibold hover:bg-cosmic-accent/90 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/5 transition-colors"
          >
            Go Home
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
