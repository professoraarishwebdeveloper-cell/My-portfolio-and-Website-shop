'use client'

import { LineWaves } from '@/components/line-waves'

export function GlobalWavesBg() {
  return (
    <div 
      className="fixed inset-0 overflow-hidden" 
      style={{ 
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }} 
      aria-hidden="true"
    >
      <LineWaves
        preset="warm"
        speed={0.15}
        enableMouseInteraction={true}
        brightness={0.3}
      />
    </div>
  )
}
