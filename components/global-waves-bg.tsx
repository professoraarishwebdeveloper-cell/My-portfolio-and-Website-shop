'use client'

import { LineWaves } from '@/components/line-waves'

export function GlobalWavesBg() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
      <LineWaves
        preset="warm"
        speed={0.15}
        enableMouseInteraction={true}
        brightness={0.25}
        className="h-full w-full"
      />
    </div>
  )
}
