'use client'

import { LineWaves } from '@/components/line-waves'

export function GlobalWavesBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <LineWaves
        preset="warm"
        speed={0.15}
        enableMouseInteraction={true}
        brightness={0.08}
        className="h-full w-full"
      />
    </div>
  )
}
