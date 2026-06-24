import type { Metadata } from 'next'
import { BRAND, SITE_URL } from '@/lib/site-content'

const ogImagePath = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&h=630&q=80'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.shortName} | Premium Creative Developer and Agency Website`,
    template: `%s | ${BRAND.shortName}`,
  },
  description: BRAND.description,
  keywords: [
    'AKPS.space',
    'creative developer',
    'premium web design',
    'Next.js agency website',
    'AI integration',
    'website development',
    'portfolio developer',
    'dashboard development',
  ],
  authors: [{ name: BRAND.ownerName, url: SITE_URL }],
  creator: BRAND.ownerName,
  publisher: BRAND.shortName,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: `${BRAND.shortName} | Premium Creative Developer and Agency Website`,
    description: BRAND.description,
    siteName: BRAND.shortName,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: `${BRAND.shortName} preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.shortName} | Premium Creative Developer and Agency Website`,
    description: BRAND.description,
    images: [ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}
