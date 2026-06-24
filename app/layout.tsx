import './globals.css'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CustomCursor } from '@/components/cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth-provider'
import { AmbientBackground } from '@/components/ambient-background'
import { GlobalWavesBg } from '@/components/global-waves-bg'
import { SiteFooter } from '@/components/site-footer'
import { defaultMetadata } from '@/lib/site-metadata'
export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cosmic-void font-sans antialiased">
        <AuthProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            <main className="relative z-20 flex min-h-screen flex-col">
              {children}
              <SiteFooter />
            </main>
            <Toaster />
          </SmoothScroll>
        </AuthProvider>
        <GlobalWavesBg />
        <AmbientBackground />
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  )
}
