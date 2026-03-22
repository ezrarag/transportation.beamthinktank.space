import type { HomeSlide, TransportArea, TransportRole, TransportAreaSlug } from '@/lib/transport/types'

export const transportAreas: TransportArea[] = [
  {
    slug: 'repair',
    title: 'Repair',
    shortTitle: 'Repair',
    icon: '🔧',
    tagline: 'Certified maintenance at community prices',
    description:
      'Affordable diagnostics, routine maintenance, and repair workflows staffed by cohort members earning real-world certifications.',
    heroImage: '/transport/seed/repair.svg',
    narrativeArcs: [
      {
        title: 'Neighborhood Reliability',
        description: 'Keep Milwaukee drivers moving with diagnostics, preventative maintenance, and transparent repair plans.',
      },
      {
        title: 'Work-Based Certification',
        description: 'Repair assignments double as supervised certification pathways for community members and students.',
      },
    ],
    roles: ['community-member', 'student', 'faculty'],
    accessLevel: 'public',
  },
  {
    slug: 'build',
    title: 'Build',
    shortTitle: 'Build',
    icon: '🏗️',
    tagline: 'New vehicles, custom fabrications, portfolio builds',
    description:
      'Custom fabrication, modular systems, and community-designed builds that become portfolio-grade outputs for the cohort and partner businesses.',
    heroImage: '/transport/seed/build.svg',
    narrativeArcs: [
      {
        title: 'Custom Fabrication',
        description: 'Design and fabricate new systems with clear production milestones and cost discipline.',
      },
      {
        title: 'Entrepreneurial Prototypes',
        description: 'Use BEAM infrastructure to move ideas from rough concept to testable local product.',
      },
    ],
    roles: ['community-member', 'student', 'entrepreneur'],
    accessLevel: 'public',
  },
  {
    slug: 'restore',
    title: 'Restore',
    shortTitle: 'Restore',
    icon: '🔄',
    tagline: 'Bringing legacy machines back to life',
    description:
      'Legacy and classic restoration projects that combine archival research, skilled labor, and documentation-quality outputs.',
    heroImage: '/transport/seed/restore.svg',
    narrativeArcs: [
      {
        title: 'Legacy Preservation',
        description: 'Restore vehicles with portfolio-quality documentation, finish standards, and parts research.',
      },
      {
        title: 'Story-Driven Output',
        description: 'Each restoration becomes a case study that demonstrates craft, sourcing, and business impact.',
      },
    ],
    roles: ['community-member', 'student', 'faculty'],
    accessLevel: 'public',
  },
  {
    slug: 'rnd',
    title: 'R&D',
    shortTitle: 'R&D',
    icon: '🔬',
    tagline: 'Applied research with UWM & MATC faculty',
    description:
      'Faculty-guided applied research focused on EV conversions, materials, process efficiency, and local manufacturing capability.',
    heroImage: '/transport/seed/rnd.svg',
    narrativeArcs: [
      {
        title: 'Applied Faculty Research',
        description: 'Translate classroom and lab knowledge into partner-ready prototypes, testing, and technical recommendations.',
      },
      {
        title: 'Community Commercialization',
        description: 'Move research outputs toward competitive, locally sourced products and services.',
      },
    ],
    roles: ['student', 'faculty', 'entrepreneur'],
    accessLevel: 'public',
  },
  {
    slug: 'legal',
    title: 'Legal & Insurance',
    shortTitle: 'Legal',
    icon: '🛡️',
    tagline: 'Street-legal consulting + coverage pathways',
    description:
      'Guide partners through titling, compliance, emissions, custom build legality, and insurance readiness.',
    heroImage: '/transport/seed/legal.svg',
    narrativeArcs: [
      {
        title: 'Street-Legal Readiness',
        description: 'Clarify Wisconsin DOT requirements, title pathways, and documentation for modified or custom vehicles.',
      },
      {
        title: 'Liability Clarity',
        description: 'Pair legal guidance with insurance pathway research so partners can scale with less uncertainty.',
      },
    ],
    roles: ['faculty', 'partner', 'entrepreneur'],
    accessLevel: 'public',
  },
  {
    slug: 'logistics',
    title: 'Logistics & Sourcing',
    shortTitle: 'Logistics',
    icon: '📦',
    tagline: 'Local supply chain replacing international dependency',
    description:
      'Build a Milwaukee sourcing network for parts, materials, tooling, and transport services that grows partner resilience.',
    heroImage: '/transport/seed/logistics.svg',
    narrativeArcs: [
      {
        title: 'Anchor Partner Network',
        description: 'Organize local suppliers around real demand from repair, build, and restoration projects.',
      },
      {
        title: 'Community Supply Chain',
        description: 'Replace dependency on distant distributors with trusted neighborhood sourcing relationships.',
      },
    ],
    roles: ['partner', 'student', 'entrepreneur'],
    accessLevel: 'public',
  },
]

export const transportRoles: TransportRole[] = [
  {
    id: 'community-member',
    title: 'Community Member',
    summary: 'Join the cohort, earn credentials, and build a transportation career without needing a degree first.',
    audienceLabel: 'Cohort Pathway',
    ctaPath: '/cohort/enroll?role=community-member',
    heroLabel: 'Hands-on cohort work',
    whatYouDo: [
      'Work on live repair, build, restoration, and sourcing deliverables.',
      'Learn under faculty, mentors, and anchor partner workflows.',
      'Document measurable outputs for your CV and portfolio.',
    ],
    requirements: [
      'Reliable communication and a willingness to learn.',
      'Availability for scheduled cohort sessions.',
      'Commitment to safety, documentation, and team delivery.',
    ],
    whatYouGain: [
      'Portfolio-ready transportation projects.',
      'Certification pathways and references.',
      'A direct route into BEAM partner opportunities.',
    ],
  },
  {
    id: 'student',
    title: 'UWM / MATC Student',
    summary: 'Earn credit and practical experience through work that directly supports Milwaukee businesses.',
    audienceLabel: 'Credit-Earning Role',
    ctaPath: '/cohort/enroll?role=student',
    heroLabel: 'Earn credit through real work',
    whatYouDo: [
      'Contribute to partner projects for repair, R&D, logistics, and build initiatives.',
      'Translate coursework into deliverables with community impact.',
      'Work with faculty and BEAM staff on measurable milestones.',
    ],
    requirements: [
      'Enrollment at UWM or MATC, or a plan to enter a co-requisite course.',
      'Weekly availability for supervised work sessions.',
      'Documentation discipline and readiness for applied learning.',
    ],
    whatYouGain: [
      'Credit-bearing field experience.',
      'Professional case studies and references.',
      'Access to faculty-guided R&D and logistics initiatives.',
    ],
  },
  {
    id: 'faculty',
    title: 'Faculty / Professor',
    summary: 'Bring applied research, teaching, and mentorship into live community transportation projects.',
    audienceLabel: 'Institutional Collaborator',
    ctaPath: '/cohort/enroll?role=faculty',
    heroLabel: 'Applied research partnership',
    whatYouDo: [
      'Mentor cohort members and supervise quality or research standards.',
      'Shape applied R&D initiatives with partner businesses.',
      'Connect classroom outcomes to community production systems.',
    ],
    requirements: [
      'Faculty or instructional leadership role.',
      'Interest in community-engaged scholarship.',
      'Capacity to guide students through real deliverables.',
    ],
    whatYouGain: [
      'A credible applied research pathway.',
      'Documented community outputs and academic artifacts.',
      'Direct access to local business collaborators.',
    ],
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    summary: 'Bring an idea and use BEAM infrastructure, labor, and research support to move it toward market.',
    audienceLabel: 'Business Builder',
    ctaPath: '/cohort/enroll?role=entrepreneur',
    heroLabel: 'Build around your idea',
    whatYouDo: [
      'Define a transportation product, service, or sourcing concept.',
      'Work with a cohort on research, prototyping, and execution.',
      'Use BEAM to test operational, legal, and market pathways.',
    ],
    requirements: [
      'A clear idea or infrastructure gap to pursue.',
      'Willingness to collaborate openly with the cohort.',
      'Commitment to milestone-based execution.',
    ],
    whatYouGain: [
      'A team behind your concept.',
      'Operational and legal support infrastructure.',
      'A path toward locally competitive transport business growth.',
    ],
  },
]

export const homeSlides: HomeSlide[] = [
  {
    id: 'move-community-forward',
    title: 'MOVE COMMUNITY FORWARD',
    subtitle:
      'Milwaukee’s community transportation NGO building, restoring, and maintaining vehicles through local hands.',
    ctaLabel: 'Join the Cohort',
    ctaPath: '/cohort',
    imageSrc: '/transport/seed/home-hero-1.svg',
    imageAlt: 'Transportation cohort and Milwaukee workshop concept art',
  },
  {
    id: 'your-business-amplified',
    title: 'YOUR BUSINESS, AMPLIFIED',
    subtitle:
      'Anchor partners get a dedicated cohort of trained technicians, researchers, and entrepreneurs working on their behalf.',
    ctaLabel: 'Partner With BEAM',
    ctaPath: '/partner',
    imageSrc: '/transport/seed/home-hero-2.svg',
    imageAlt: 'Local business owner reviewing growth plans with BEAM cohort members',
  },
  {
    id: 'built-in-milwaukee',
    title: 'BUILT IN MILWAUKEE',
    subtitle:
      'From custom fabrications to EV conversions, BEAM builds competitive transportation services from local supply chains.',
    ctaLabel: 'Explore Projects',
    ctaPath: '/viewer',
    imageSrc: '/transport/seed/home-hero-3.svg',
    imageAlt: 'Milwaukee transportation innovation concept art with fabrication and sourcing elements',
  },
]

export const institutionalPartners = [
  {
    id: 'uwm',
    name: 'University of Wisconsin-Milwaukee',
    description: 'Faculty research, co-requisite coursework, and student practitioners connected to live partner work.',
  },
  {
    id: 'matc',
    name: 'Milwaukee Area Technical College',
    description: 'Certification pathways, tool access, and applied transportation training aligned with cohort delivery.',
  },
]

export function getTransportArea(slug: string): TransportArea | undefined {
  return transportAreas.find((area) => area.slug === slug)
}

export function isTransportAreaSlug(value: string): value is TransportAreaSlug {
  return transportAreas.some((area) => area.slug === value)
}
