'use client'

import { motion } from 'framer-motion'

// Animated blobs with enhanced opacity for better visibility
const blobs = [
  {
    className: 'left-[-12%] top-[-10%] h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle_at_top_left,rgba(244,234,220,0.42),transparent_56%)]',
    animate: { x: [0, 20, 0], y: [0, 16, 0], scale: [1, 1.03, 1] },
    duration: 24,
  },
  {
    className: 'right-[-10%] top-[10%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_top_right,rgba(204,181,139,0.32),transparent_56%)]',
    animate: { x: [0, -18, 0], y: [0, 18, 0], scale: [1, 1.05, 1] },
    duration: 28,
  },
  {
    className: 'bottom-[-8%] left-[20%] h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle_at_bottom_left,rgba(229,214,191,0.28),transparent_58%)]',
    animate: { x: [0, 22, 0], y: [0, -22, 0], scale: [1, 1.02, 1] },
    duration: 26,
  },
  {
    className: 'bottom-[8%] right-[14%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle_at_center,rgba(197,182,160,0.24),transparent_55%)]',
    animate: { x: [0, -14, 0], y: [0, 14, 0], scale: [1, 1.06, 1] },
    duration: 22,
  },
]

export function AmbientBackground() {
  return (
    <>
      {/* Fixed ambient background layer - positioned behind everything */}
      <div className="pointer-events-none fixed inset-0 z-0 w-screen h-screen overflow-hidden" aria-hidden="true">
        {/* Base mesh gradient */}
        <div className="absolute inset-0 bg-brand-mesh" />
        
        {/* Soft radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(255,241,212,0.08),transparent_22%)]" />
        
        {/* Subtle top-to-bottom gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_20%,transparent_80%,rgba(255,255,255,0.03))]" />
        
        {/* Animated floating blobs */}
        {blobs.map((blob, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full blur-[108px] ${blob.className}`}
            animate={blob.animate}
            transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        ))}
        
        {/* Subtle vertical light streaks */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),transparent_48%,rgba(255,255,255,0.05))]" />
      </div>
    </>
  )
}
