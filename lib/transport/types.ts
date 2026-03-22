import type { HeroSlide } from '@/lib/types/portal'

export type TransportAreaSlug = 'repair' | 'build' | 'restore' | 'rnd' | 'legal' | 'logistics'
export type TransportAccessLevel = 'public' | 'member' | 'partner' | 'admin'

export type TransportNarrativeArc = {
  title: string
  description: string
}

export type TransportArea = {
  slug: TransportAreaSlug
  title: string
  shortTitle: string
  icon: string
  tagline: string
  description: string
  heroImage: string
  heroVideo?: string
  narrativeArcs: TransportNarrativeArc[]
  roles: string[]
  accessLevel: TransportAccessLevel
}

export type TransportProject = {
  id: string
  areaSlug: TransportAreaSlug
  title: string
  description: string
  status: 'active' | 'completed' | 'proposed'
  participants: string[]
  partnerBusiness?: string
  institution?: string
  mediaUrl?: string
  heroImage: string
  accessLevel: 'public' | 'member' | 'partner'
  tags: string[]
  createdAt: string
}

export type TransportRole = {
  id: string
  title: string
  summary: string
  audienceLabel: string
  ctaPath: string
  heroLabel: string
  whatYouDo: string[]
  requirements: string[]
  whatYouGain: string[]
}

export type LogisticsItem = {
  id: string
  name: string
  sku: string
  note: string
}

export type LogisticsSupplier = {
  id: string
  name: string
  neighborhood: string
  items: LogisticsItem[]
}

export type LogisticsCategory = {
  id: string
  title: string
  description: string
  suppliers: LogisticsSupplier[]
}

export type PartnershipTier = {
  id: 'starter' | 'growth' | 'anchor'
  name: string
  description: string
  priceLabel: string
  features: string[]
}

export type HomeSlide = HeroSlide
