import { z } from 'zod'

const phonePattern = /^\+?[0-9\s()\-]{7,18}$/

export const ALLOWED_AUTH_REDIRECTS = ['/', '/about', '/contact', '/dashboard', '/projects', '/store'] as const

export function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

export function normalizeMultilineText(value: string) {
  return value.replace(/\r/g, '').replace(/[ \t]+\n/g, '\n').trim()
}

export function isValidPhone(value: string) {
  return phonePattern.test(value)
}

export function sanitizeInternalPath(value: string | null | undefined, fallback = '/dashboard') {
  if (!value) return fallback
  if (!value.startsWith('/') || value.startsWith('//')) return fallback
  const allowed = ALLOWED_AUTH_REDIRECTS.some((path) => value === path || value.startsWith(`${path}/`))
  return allowed ? value : fallback
}

export function isSuspiciousSubmission(value: string) {
  const lowered = value.toLowerCase()
  return ['http://', 'https://', '<script', 'javascript:', 'data:text/html'].some((fragment) => lowered.includes(fragment))
}

export const contactSubmissionSchema = z.object({
  name: z.string().min(2).max(80).transform(normalizeText),
  email: z.string().email().max(120).transform(normalizeText),
  phone: z.string().max(20).transform(normalizeText).optional().or(z.literal('')),
  website_type: z.string().min(2).max(60).transform(normalizeText),
  budget: z.string().max(60).transform(normalizeText).optional().or(z.literal('')),
  timeline: z.string().max(80).transform(normalizeText).optional().or(z.literal('')),
  preferred_contact: z.enum(['email', 'phone', 'whatsapp']),
  message: z.string().min(20).max(1500).transform(normalizeMultilineText),
  company_website: z.string().max(0).optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  if (data.phone && !isValidPhone(data.phone)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['phone'], message: 'Enter a valid phone number.' })
  }
  if (isSuspiciousSubmission(`${data.name} ${data.message}`)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['message'], message: 'Please remove links or suspicious content from the message.' })
  }
})

export const authLoginSchema = z.object({
  email: z.string().email().max(120).transform(normalizeText),
  password: z.string().min(6).max(72),
  full_name: z.string().optional(),
  website: z.string().max(0).optional().or(z.literal('')),
})

export const authSignupSchema = z.object({
  email: z.string().email().max(120).transform(normalizeText),
  password: z.string().min(8).max(72),
  full_name: z.string().min(2).max(80).transform(normalizeText),
  website: z.string().max(0).optional().or(z.literal('')),
})

export function getFriendlyErrorMessage(context: 'auth' | 'contact' | 'quote' | 'order' | 'dashboard' | 'admin') {
  switch (context) {
    case 'auth':
      return 'We could not complete that sign-in request. Please check your details and try again.'
    case 'contact':
      return 'We could not send your message right now. Please try again in a moment.'
    case 'quote':
      return 'We could not save the quote right now. Please try again shortly.'
    case 'order':
      return 'We could not place the order right now. Please try again shortly.'
    case 'dashboard':
      return 'We could not load your dashboard right now. Please refresh and try again.'
    case 'admin':
      return 'We could not load the admin area right now. Please try again shortly.'
  }
}

export function logDevelopmentError(context: string, error: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(context, error)
  }
}
