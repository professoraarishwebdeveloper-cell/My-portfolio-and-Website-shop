import './globals.css'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CustomCursor } from '@/components/cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth-provider'
import { AmbientBackground } from '@/components/ambient-background'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://aarishkhatib.com'),
  title: 'Aarish Khatib — Creative Developer & Digital Architect',
  description: 'Premium web development agency by Aarish Khatib. Specializing in cinematic digital experiences, AI integrations, and enterprise web applications. Create something worthy of Awwwards.',
  keywords: ['web development', 'react', 'next.js', 'three.js', 'creative development', 'AI', 'portfolio', 'agency'],
  authors: [{ name: 'Aarish Khatib' }],
  creator: 'Aarish Khatib',
  publisher: 'Aarish Khatib',
  openGraph: {
    type: 'website',
    url: 'https://aarishkhatib.com',
    title: 'Aarish Khatib — Creative Developer & Digital Architect',
    description: 'Premium web development agency by Aarish Khatib. Create something worthy of Awwwards.',
    siteName: 'Aarish Khatib',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Aarish Khatib - Creative Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aarish Khatib — Creative Developer & Digital Architect',
    description: 'Premium web development agency. Create something worthy of Awwwards.',
    creator: '@aarishkhatib',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-cosmic-void min-h-screen">
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
        <AmbientBackground />
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  )
}
