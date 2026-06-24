export const SITE_URL = 'https://akps.space'

export const CONTACT_DETAILS = {
  email: 'professor.aarish.webdeveloper@gmail.com',
  emailHref: 'mailto:professor.aarish.webdeveloper@gmail.com',
  phoneRaw: '9284792400',
  phoneDisplay: '+91 9284792400',
  phoneHref: 'tel:+919284792400',
  whatsappDisplay: '+91 9284792400',
  whatsappHref: 'https://wa.me/919284792400',
}

export const BRAND = {
  shortName: 'AKPS.space',
  ownerName: 'Aarish Khatib',
  headline: 'Premium creative development for brands that need trust, speed, and visual depth.',
  description:
    'AKPS.space designs and builds premium websites, product interfaces, dashboards, and AI-powered digital systems that help businesses look established from the first click.',
}

export const NAVIGATION = {
  primary: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/store', label: 'Store' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  secondary: [
    { href: '/skills', label: 'Skills' },
    { href: '/journey', label: 'Journey' },
    { href: '/certificates', label: 'Certificates' },
  ],
}

export const TRUST_SIGNALS = [
  {
    title: 'Fast response',
    value: 'Under 24 hours',
    description: 'Clear replies, practical next steps, and no disappearing after the inquiry.',
  },
  {
    title: 'Delivery structure',
    value: '4-step process',
    description: 'Discovery, design direction, build, and launch support with visible checkpoints.',
  },
  {
    title: 'Client confidence',
    value: '12+ clients',
    description: 'Built for founders, service businesses, and brands that need a sharper digital presence.',
  },
  {
    title: 'Launch support',
    value: '30-day cover',
    description: 'Post-launch adjustments, guidance, and bug support after handoff.',
  },
]

export const DELIVERY_PROCESS = [
  {
    title: 'Discovery',
    description: 'We clarify goals, audience, offer structure, and the exact trust signals the site needs.',
  },
  {
    title: 'Design Direction',
    description: 'Layouts, motion, and hierarchy are shaped into a premium visual system before the build hardens.',
  },
  {
    title: 'Build & Polish',
    description: 'The site is developed with responsive behavior, animation restraint, and performance-focused decisions.',
  },
  {
    title: 'Launch Support',
    description: 'Testing, deployment, handoff, and practical support so the finished site feels dependable, not fragile.',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Priya Deshmukh',
    business: 'Interior Design Studio',
    quote:
      'The site finally feels like the level of business we actually run. Clients now understand our quality before the first call.',
  },
  {
    name: 'Arman Sheikh',
    business: 'E-commerce Founder',
    quote:
      'The redesign made the brand look sharper and more expensive, and the buying flow became much easier for customers to trust.',
  },
  {
    name: 'Neha Kulkarni',
    business: 'Consulting Business',
    quote:
      'What stood out was the balance of presentation and clarity. The website feels premium without becoming confusing.',
  },
  {
    name: 'Rohit Patil',
    business: 'Analytics Product Team',
    quote:
      'The dashboard and landing experience felt far more polished than our previous version, and the process stayed organized throughout.',
  },
]

export type ShowcaseProject = {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  category: string
  technologies: string[]
  status: string
  challenge: string
  solution: string
  outcome: string
  accent: string
  visualLabel: string
  metrics: string[]
  featured?: boolean
  liveUrl?: string | null
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'ai-business-assistant',
    slug: 'ai-business-assistant',
    title: 'AI Business Assistant',
    description: 'An AI-powered assistant experience for handling lead qualification, FAQs, and customer workflows.',
    longDescription:
      'A premium lead-handling system designed for service businesses that want faster response times, better qualification, and a cleaner support experience without losing brand tone.',
    category: 'AI Systems',
    technologies: ['Next.js', 'Supabase', 'OpenAI API', 'Tailwind CSS'],
    status: 'Completed',
    challenge: 'The business needed faster customer handling without sounding robotic or generic.',
    solution: 'Built an AI-assisted interaction layer with guided flows, branded responses, and a clean admin-ready structure.',
    outcome: 'Improved response speed, clearer lead capture, and a more modern support experience for prospects.',
    accent: 'from-[#ead8bd]/65 via-[#d8c6ae]/45 to-[#bda895]/35',
    visualLabel: 'AI Workflow',
    metrics: ['Lead qualification', 'Fast reply flow', 'Admin-ready setup'],
    featured: true,
  },
  {
    id: 'custom-portfolio-platform',
    slug: 'custom-portfolio-platform',
    title: 'Custom Portfolio Platform',
    description: 'A cinematic portfolio system focused on trust, motion, and service conversion for premium positioning.',
    longDescription:
      'A personal brand platform designed to replace generic template websites with a more intentional experience that feels established from the opening screen.',
    category: 'Brand Experience',
    technologies: ['Next.js', 'Framer Motion', 'TypeScript', 'Supabase'],
    status: 'Completed',
    challenge: 'The old portfolio did not communicate expertise or premium value quickly enough.',
    solution: 'Created a multi-section narrative site with stronger hierarchy, richer backgrounds, and a more convincing project showcase.',
    outcome: 'Turned a thin presentation into a stronger client-facing experience with clearer service credibility.',
    accent: 'from-[#f4eadf]/70 via-[#d3b899]/42 to-[#c0b1a1]/34',
    visualLabel: 'Brand Platform',
    metrics: ['Premium positioning', 'Stronger storytelling', 'Service-ready'],
    featured: true,
  },
  {
    id: 'website-builder-dashboard',
    slug: 'website-builder-dashboard',
    title: 'Website Builder Dashboard',
    description: 'A structured dashboard for configuring websites, pricing, and delivery choices with instant feedback.',
    longDescription:
      'A configurator and dashboard interface that turns service selection into a clearer, more premium productized workflow.',
    category: 'Dashboard',
    technologies: ['React', 'Zustand', 'Supabase', 'Framer Motion'],
    status: 'Completed',
    challenge: 'Quoting and project setup felt manual, fragmented, and visually basic.',
    solution: 'Designed a guided stepper with live pricing, clearer options, and a more polished interaction model.',
    outcome: 'Made package selection easier to understand and strengthened the perceived professionalism of the offer.',
    accent: 'from-[#e7dccd]/68 via-[#ceb89f]/42 to-[#a89c8e]/32',
    visualLabel: 'Configurator',
    metrics: ['Live pricing', 'Guided flow', 'Premium dashboard'],
    featured: true,
  },
  {
    id: 'ecommerce-store',
    slug: 'ecommerce-store',
    title: 'E-Commerce Store',
    description: 'A conversion-focused storefront with premium product presentation and a more trustworthy purchase flow.',
    longDescription:
      'A storefront system built to feel modern and reliable, with better content rhythm, cleaner product framing, and a sharper visual hierarchy.',
    category: 'Commerce',
    technologies: ['Next.js', 'Stripe', 'Tailwind CSS', 'Supabase'],
    status: 'Completed',
    challenge: 'The original storefront looked generic and lacked the trust cues needed for paid conversion.',
    solution: 'Introduced stronger product cards, cleaner pricing presentation, and a more refined interface system.',
    outcome: 'Raised visual trust and made the shopping journey feel far more credible to first-time visitors.',
    accent: 'from-[#efe3d1]/68 via-[#d7c0a4]/40 to-[#b6a28e]/34',
    visualLabel: 'Commerce Flow',
    metrics: ['Cleaner checkout', 'Better product framing', 'Trust-first UI'],
  },
  {
    id: 'trading-analytics-dashboard',
    slug: 'trading-analytics-dashboard',
    title: 'Trading Analytics Dashboard',
    description: 'A data-rich dashboard for market monitoring, strategy review, and performance-focused insights.',
    longDescription:
      'An analytics interface built to present trading information in a more controlled and visually digestible way for fast decision-making.',
    category: 'Analytics',
    technologies: ['React', 'Recharts', 'TypeScript', 'Supabase'],
    status: 'Completed',
    challenge: 'Complex trading information was hard to scan quickly and lacked a cohesive UI layer.',
    solution: 'Built a dashboard with clearer grouping, calmer data presentation, and performance-oriented visual components.',
    outcome: 'Improved readability, decision speed, and overall usability for high-attention workflows.',
    accent: 'from-[#ddd2c5]/68 via-[#cab59d]/42 to-[#a49689]/32',
    visualLabel: 'Market Insights',
    metrics: ['Insight panels', 'Readable charts', 'Focused decisions'],
  },
  {
    id: 'business-landing-page-system',
    slug: 'business-landing-page-system',
    title: 'Business Landing Page System',
    description: 'A landing page framework for businesses that need sharper messaging, cleaner CTAs, and better first impressions.',
    longDescription:
      'A flexible landing page system shaped for campaigns, offers, and business launches where trust and clarity need to happen immediately.',
    category: 'Marketing',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'SEO'],
    status: 'Completed',
    challenge: 'The business needed a cleaner way to launch offer pages without rethinking structure every time.',
    solution: 'Created a reusable landing framework with strong sections, visual emphasis, and conversion-aware content zones.',
    outcome: 'Reduced friction for campaign launches and made the overall offer presentation feel more established.',
    accent: 'from-[#f5eee6]/70 via-[#dcc7ad]/42 to-[#beaf9f]/34',
    visualLabel: 'Launch System',
    metrics: ['Stronger CTAs', 'Reusable structure', 'Campaign-ready'],
  },
  {
    id: 'client-portal-suite',
    slug: 'client-portal-suite',
    title: 'Client Portal Suite',
    description: 'A private client workspace for project updates, approvals, file sharing, and delivery visibility.',
    longDescription:
      'A service delivery portal built to reduce back-and-forth and make premium client work feel more structured, transparent, and organized from kickoff to handoff.',
    category: 'Operations',
    technologies: ['Next.js', 'Supabase', 'Authentication', 'Dashboard UI'],
    status: 'Completed',
    challenge: 'Project communication felt fragmented across chat, email, and scattered file links.',
    solution: 'Created a central client workspace with project status views, approval checkpoints, and clearer collaboration surfaces.',
    outcome: 'Improved client confidence and made delivery feel more professional throughout the project lifecycle.',
    accent: 'from-[#ede3d5]/68 via-[#d0baa2]/40 to-[#a9998a]/32',
    visualLabel: 'Client Workspace',
    metrics: ['Status visibility', 'Approval flow', 'Cleaner delivery'],
  },
  {
    id: 'saas-onboarding-flow',
    slug: 'saas-onboarding-flow',
    title: 'SaaS Onboarding Flow',
    description: 'A polished onboarding and setup sequence for a software product that needed a calmer first-use experience.',
    longDescription:
      'A guided onboarding system designed to reduce friction, explain value earlier, and make a software product feel premium from the first interaction.',
    category: 'Product UX',
    technologies: ['React', 'Framer Motion', 'TypeScript', 'UX Writing'],
    status: 'Completed',
    challenge: 'New users were meeting too much complexity before understanding the product payoff.',
    solution: 'Built a step-by-step onboarding experience with better pacing, softer motion, and clearer progress framing.',
    outcome: 'Raised confidence during signup and made the product feel more intentional from the start.',
    accent: 'from-[#f5eee6]/70 via-[#d7c6b3]/40 to-[#b8aaa0]/34',
    visualLabel: 'Onboarding Flow',
    metrics: ['Clear setup', 'Calmer first use', 'Better retention feel'],
  },
]

export const CERTIFICATE_FALLBACKS = [
  {
    id: 'cert-chatgpt',
    title: 'ChatGPT and AI Tools Workshop',
    issuing_organization: 'Professional Skills Program',
    issue_date: '2025-03-14',
    description: 'Applied training focused on practical AI workflows, prompting, and business implementation.',
    image_url: '',
    credential_url: '',
  },
  {
    id: 'cert-public-speaking',
    title: 'Public Speaking Certification',
    issuing_organization: 'Communication Skills Institute',
    issue_date: '2025-05-06',
    description: 'Training in presentation confidence, structured communication, and audience clarity.',
    image_url: '',
    credential_url: '',
  },
  {
    id: 'cert-multitasking',
    title: 'Multitasking Excellence Course',
    issuing_organization: 'Productivity Development Academy',
    issue_date: '2025-07-19',
    description: 'Focused on workflow discipline, execution consistency, and high-ownership delivery habits.',
    image_url: '',
    credential_url: '',
  },
  {
    id: 'cert-react',
    title: 'Advanced React Development',
    issuing_organization: 'Frontend Engineering Program',
    issue_date: '2025-10-02',
    description: 'Advanced frontend development training for scalable interfaces and production-ready architecture.',
    image_url: '',
    credential_url: '',
  },
]

export function normalizeProject(project: Record<string, any>, index = 0): ShowcaseProject {
  const fallback = SHOWCASE_PROJECTS[index % SHOWCASE_PROJECTS.length]

  return {
    id: String(project.id ?? fallback.id),
    slug: String(project.slug ?? fallback.slug),
    title: String(project.title ?? fallback.title),
    description: String(project.description ?? fallback.description),
    longDescription: String(project.long_description ?? fallback.longDescription),
    category: String(project.category ?? fallback.category),
    technologies: Array.isArray(project.technologies) && project.technologies.length ? project.technologies : fallback.technologies,
    status: project.status ? String(project.status) : fallback.status,
    challenge: project.challenge ? String(project.challenge) : fallback.challenge,
    solution: project.solution ? String(project.solution) : fallback.solution,
    outcome: project.outcome ? String(project.outcome) : fallback.outcome,
    accent: fallback.accent,
    visualLabel: fallback.visualLabel,
    metrics: fallback.metrics,
    featured: Boolean(project.featured ?? fallback.featured),
    liveUrl: project.live_url ?? null,
  }
}
