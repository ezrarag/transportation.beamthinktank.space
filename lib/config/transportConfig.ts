import type { NGOConfig } from '@/lib/types/portal'
import { homeSlides } from '@/lib/transport/areas'
import { transportProjects } from '@/lib/transport/projects'

export const transportConfig: NGOConfig = {
  id: 'transport',
  subdomain: 'transport',
  fullDomain: 'transport.beamthinktank.space',
  displayName: 'BEAM Transportation',
  shortName: 'Transport',
  label: 'BEAM Transportation',
  shortLabel: 'Transport',
  description: 'Community transportation infrastructure for Milwaukee businesses, students, and builders.',
  color: '#F0A500',
  accentColor: '#00D4AA',
  darkBg: '#0A0A0A',
  areas: ['repair', 'build', 'restore', 'rnd', 'legal', 'logistics'],
  defaultArea: 'repair',
  firestoreCollection: 'transport',
  homeSlides,
  recordingSlides: homeSlides,
  projects: transportProjects.map((project) => ({
    id: project.id,
    name: project.title,
    summary: project.description,
    status:
      project.status === 'active'
        ? 'Active'
        : project.status === 'completed'
          ? 'In Review'
          : 'Planning',
    href: `/viewer/project/${project.id}`,
  })),
}
