import type { TransportProject, TransportAreaSlug } from '@/lib/transport/types'

export const transportProjects: TransportProject[] = [
  {
    id: 'repair-diagnostic-pilot',
    areaSlug: 'repair',
    title: 'Neighborhood Diagnostic Pilot',
    description:
      'Affordable maintenance diagnostics delivered by supervised cohort members with a clear intake-to-fix workflow for Milwaukee families.',
    status: 'active',
    participants: ['Eric H.', 'Ana R.', 'Tyrone C.'],
    partnerBusiness: 'Milwaukee Auto Parts (Pilot Partner)',
    mediaUrl: '/transport/seed/repair.svg',
    heroImage: '/transport/seed/repair.svg',
    accessLevel: 'public',
    tags: ['diagnostics', 'maintenance', 'community-pricing'],
    createdAt: '2026-03-01T10:00:00.000Z',
  },
  {
    id: 'ev-conversion-study',
    areaSlug: 'rnd',
    title: 'Applied EV Conversion Study',
    description:
      'A faculty-guided R&D sprint exploring materials, energy efficiency, and regulatory readiness for low-cost EV conversion pathways.',
    status: 'proposed',
    participants: ['UWM Mobility Lab', 'MATC Advanced Manufacturing'],
    institution: 'UWM / MATC',
    mediaUrl: '/transport/seed/rnd.svg',
    heroImage: '/transport/seed/rnd.svg',
    accessLevel: 'member',
    tags: ['ev', 'materials', 'applied-research'],
    createdAt: '2026-03-08T10:00:00.000Z',
  },
  {
    id: 'pilot-sourcing-network',
    areaSlug: 'logistics',
    title: 'Pilot Sourcing Network Buildout',
    description:
      'The initial Milwaukee logistics map for auto parts, tooling, and services centered on local supplier relationships instead of distant distributors.',
    status: 'active',
    participants: ['Milwaukee Auto Parts (Pilot Partner)', 'MATC Tool Library'],
    partnerBusiness: 'Milwaukee Auto Parts (Pilot Partner)',
    mediaUrl: '/transport/seed/logistics.svg',
    heroImage: '/transport/seed/logistics.svg',
    accessLevel: 'partner',
    tags: ['sourcing', 'supply-chain', 'anchor-partner'],
    createdAt: '2026-03-15T10:00:00.000Z',
  },
]

export function getTransportProject(id: string): TransportProject | undefined {
  return transportProjects.find((project) => project.id === id)
}

export function getProjectsForArea(areaSlug: TransportAreaSlug): TransportProject[] {
  return transportProjects.filter((project) => project.areaSlug === areaSlug)
}
