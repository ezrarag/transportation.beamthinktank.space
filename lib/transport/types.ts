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

// ─── Fleet types ──────────────────────────────────────────────────────────────

export type VehicleAngle = '01' | '13' | '21'

export type VehicleHealthStatus = 'good' | 'needs-attention' | 'critical'

export type VehicleFleetStatus = 'rag' | 'want' | 'restore'

export type FleetVehicle = {
  id: string
  clientId: string
  make: string
  model: string
  year: number
  vin: string
  licensePlate: string
  color: string
  config: string
  engine: string
  payload: string
  currentMileage: number
  healthStatus: VehicleHealthStatus
  lastServiceDate: string | null
  nextServiceDue: string | null
  notes: string
  status: VehicleFleetStatus
  statusLabel: string
  priceRange: string
  purpose: string
}

export type FleetServiceRecord = {
  id: string
  vehicleId: string
  clientId: string
  date: string
  participantIds: string[]
  supervisorId: string
  servicesPerformed: string[]
  partsUsed: { partName: string; partNumber: string; cost: number }[]
  laborHours: number
  notes: string
  signedOffBy: string
  photoUrls: string[]
  approved: boolean
}

export type FleetClientType = 'fleet' | 'project' | 'community' | 'anchor'
export type FleetContractStatus = 'draft' | 'sent' | 'signed' | 'active' | 'expired'

export type FleetClient = {
  id: string
  name: string
  type: FleetClientType
  status: 'active' | 'pending' | 'paused'
  contactName: string
  contactEmail: string
  fleetSize: number
  assignedCohortLeadId: string
  assignedParticipants: string[]
  serviceSchedule: {
    frequency: 'weekly' | 'monthly' | 'as-needed'
    dayOfWeek?: string
    timeWindow?: string
  }
  monthlyRatePerVehicle: number
  contractStartDate: string | null
  contractEndDate: string | null
  contractStatus: FleetContractStatus
  notes: string
}
