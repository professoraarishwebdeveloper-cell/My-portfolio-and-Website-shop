import type { MetadataRoute } from 'next'
import { NAVIGATION, SITE_URL } from '@/lib/site-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/about', '/contact', '/projects', '/store']
  const secondaryRoutes = NAVIGATION.secondary.map((item) => item.href)

  return [...staticRoutes, ...secondaryRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/projects' || route === '/store' ? 0.9 : 0.7,
  }))
}
