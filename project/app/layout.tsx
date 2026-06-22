import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { CustomCursor } from '@/components/cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

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
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-cosmic-void min-h-screen`}>
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="relative">
            {children}
          </main>
          <Toaster />
        </SmoothScroll>
        {/* Noise overlay */}
        <div className="noise" aria-hidden="true" />
        {/* Aurora background */}
        <div className="aurora-bg" aria-hidden="true" />
      </body>
    </html>
  )
}
