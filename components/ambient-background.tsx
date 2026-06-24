'use client'

import { motion } from 'framer-motion'

const orbs = [
  {
    className: 'left-[-8%] top-[-6%] h-[520px] w-[520px] bg-[#f4eadc]/32',
    animate: { x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.08, 1] },
    duration: 22,
  },
  {
    className: 'right-[-6%] top-[12%] h-[460px] w-[460px] bg-[#ddc7a5]/24',
    animate: { x: [0, -35, 0], y: [0, 45, 0], scale: [1, 1.12, 1] },
    duration: 26,
  },
  {
    className: 'bottom-[-10%] left-[28%] h-[540px] w-[540px] bg-[#ebe0d1]/22',
    animate: { x: [0, 30, 0], y: [0, -35, 0], scale: [1, 1.06, 1] },
    duration: 24,
  },
  {
    className: 'bottom-[8%] right-[18%] h-[320px] w-[320px] bg-[#bdb2a7]/18',
    animate: { x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.1, 1] },
    duration: 20,
  },
]

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-brand-mesh" />
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-[100px] ${orb.className}`}
          animate={orb.animate}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />
    </div>
  )
}
