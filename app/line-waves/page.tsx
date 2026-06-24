'use client'

import { LineWaves } from '@/components/line-waves'
import { SectionReveal } from '@/components/section-reveal'

export default function LineWavesPage() {
  return (
    <div className="relative z-20 overflow-hidden">
      <section className="min-h-screen pt-24">
        <div className="absolute inset-0 h-full w-full opacity-50">
          <LineWaves
            speed={0.3}
            innerLineCount={32}
            outerLineCount={36}
            warpIntensity={1}
            rotation={-45}
            edgeFadeWidth={0}
            colorCycleSpeed={1}
            brightness={0.2}
            color1="#f5eadb"
            color2="#d8c6ae"
            color3="#8d7d6b"
            enableMouseInteraction={true}
            mouseInfluence={2}
          />
        </div>
        
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 text-center">
          <div>
            <SectionReveal>
              <h1 className="text-5xl font-bold leading-[1.2] text-white drop-shadow-lg md:text-7xl">
                Line Waves<br />Animation
              </h1>
            </SectionReveal>
            
            <SectionReveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-200">
                A dynamic WebGL-based wave visualization with customizable colors, animation speed, and mouse interactivity. Perfect for creating stunning background effects on landing pages and hero sections.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-all hover:border-brand-accent/30 hover:bg-white/[0.06]"
                >
                  Back to Home
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-6 py-3 text-sm font-semibold text-brand-accent transition-all hover:bg-brand-accent/20"
                >
                  View Projects
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding relative z-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">Customization Examples</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-200">
              The LineWaves component can be customized with different colors, speeds, and line configurations.
            </p>
          </SectionReveal>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Example 1 */}
            <SectionReveal delay={0.05}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <div className="relative h-64 w-full">
                  <LineWaves
                    speed={0.5}
                    innerLineCount={24}
                    outerLineCount={28}
                    warpIntensity={1.2}
                    rotation={0}
                    edgeFadeWidth={0.1}
                    colorCycleSpeed={1.5}
                    brightness={0.3}
                    color1="#fbbf24"
                    color2="#f97316"
                    color3="#dc2626"
                    enableMouseInteraction={true}
                    mouseInfluence={1.5}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">Warm Gradient</h3>
                  <p className="mt-2 text-sm text-slate-300">Amber, orange, and red color scheme with faster animation</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-200">Faster</span>
                    <span className="rounded-full bg-red-400/20 px-3 py-1 text-xs text-red-200">Warm</span>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Example 2 */}
            <SectionReveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <div className="relative h-64 w-full">
                  <LineWaves
                    speed={0.2}
                    innerLineCount={40}
                    outerLineCount={44}
                    warpIntensity={0.8}
                    rotation={45}
                    edgeFadeWidth={0.2}
                    colorCycleSpeed={0.8}
                    brightness={0.25}
                    color1="#06b6d4"
                    color2="#0ea5e9"
                    color3="#3b82f6"
                    enableMouseInteraction={true}
                    mouseInfluence={2.5}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">Cool Blue</h3>
                  <p className="mt-2 text-sm text-slate-300">Cyan and blue tones with more lines and slower animation</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-xs text-cyan-200">More Lines</span>
                    <span className="rounded-full bg-blue-400/20 px-3 py-1 text-xs text-blue-200">Cool</span>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Example 3 */}
            <SectionReveal delay={0.15}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <div className="relative h-64 w-full">
                  <LineWaves
                    speed={0.4}
                    innerLineCount={28}
                    outerLineCount={32}
                    warpIntensity={1.5}
                    rotation={-30}
                    edgeFadeWidth={0.15}
                    colorCycleSpeed={1.2}
                    brightness={0.28}
                    color1="#a78bfa"
                    color2="#c084fc"
                    color3="#e879f9"
                    enableMouseInteraction={true}
                    mouseInfluence={1.8}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">Purple Dream</h3>
                  <p className="mt-2 text-sm text-slate-300">Purple and magenta palette with strong warp effects</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-400/20 px-3 py-1 text-xs text-purple-200">Intense</span>
                    <span className="rounded-full bg-pink-400/20 px-3 py-1 text-xs text-pink-200">Vibrant</span>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Example 4 */}
            <SectionReveal delay={0.2}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <div className="relative h-64 w-full">
                  <LineWaves
                    speed={0.25}
                    innerLineCount={36}
                    outerLineCount={40}
                    warpIntensity={0.6}
                    rotation={-60}
                    edgeFadeWidth={0}
                    colorCycleSpeed={0.6}
                    brightness={0.2}
                    color1="#f5eadb"
                    color2="#d8c6ae"
                    color3="#a89968"
                    enableMouseInteraction={false}
                    mouseInfluence={2}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">Neutral Elegance</h3>
                  <p className="mt-2 text-sm text-slate-300">Beige and brown tones with no mouse interaction</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-900/20 px-3 py-1 text-xs text-amber-100">Static</span>
                    <span className="rounded-full bg-amber-700/20 px-3 py-1 text-xs text-amber-100">Subtle</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding relative z-20">
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Component Props</h2>
          </SectionReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { prop: 'speed', default: '0.3', desc: 'Overall animation speed multiplier' },
              { prop: 'innerLineCount', default: '32', desc: 'Number of lines in center region' },
              { prop: 'outerLineCount', default: '36', desc: 'Number of lines at edges' },
              { prop: 'warpIntensity', default: '1.0', desc: 'Wave distortion effect strength' },
              { prop: 'rotation', default: '-45', desc: 'Pattern rotation in degrees' },
              { prop: 'edgeFadeWidth', default: '0.0', desc: 'Fade effect between regions' },
              { prop: 'colorCycleSpeed', default: '1.0', desc: 'Color animation speed' },
              { prop: 'brightness', default: '0.2', desc: 'Overall brightness multiplier' },
              { prop: 'color1/2/3', default: '#fff', desc: 'RGB color channels in hex' },
              { prop: 'enableMouseInteraction', default: 'true', desc: 'Enable cursor reactivity' },
              { prop: 'mouseInfluence', default: '2.0', desc: 'Strength of mouse effect' },
            ].map((item, i) => (
              <SectionReveal key={item.prop} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <code className="text-sm font-mono text-brand-accent">{item.prop}</code>
                  <p className="mt-2 text-xs text-slate-300">{item.desc}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-400">Default: {item.default}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
