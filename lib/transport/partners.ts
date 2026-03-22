import type { PartnershipTier } from '@/lib/transport/types'

export const partnershipStyles = [
  {
    id: 'guided',
    title: 'Guided Expansion',
    description: 'BEAM recommends a direction based on market research and partner readiness.',
  },
  {
    id: 'self-directed',
    title: 'Self-Directed Growth',
    description: 'You define the need and the cohort executes to your brief.',
  },
  {
    id: 'rnd',
    title: 'R&D Partnership',
    description: 'Faculty-supervised research focused on your product or service line.',
  },
]

export const partnershipTiers: PartnershipTier[] = [
  {
    id: 'starter',
    name: 'Cohort Access',
    description: '2 to 4 cohort members, defined scope, and a quarterly review rhythm.',
    priceLabel: 'Free / Grant-funded',
    features: ['Defined initial scope', 'Shared cohort labor', 'Quarterly review', 'MOU-backed engagement'],
  },
  {
    id: 'growth',
    name: 'Expansion Partner',
    description: '5 to 10 members with logistics, market research, and R&D support.',
    priceLabel: 'Negotiated / Revenue share',
    features: ['Market research support', 'Logistics mapping', 'Applied R&D', 'Growth reporting'],
  },
  {
    id: 'anchor',
    name: 'Anchor Partner',
    description: 'Full cohort deployment with faculty liaison and sourcing network presence.',
    priceLabel: 'Strategic agreement',
    features: ['Dedicated cohort deployment', 'Faculty liaison', 'Sourcing network branding', 'Strategic operating reviews'],
  },
]

export const partnerDashboardContexts = {
  'milwaukee-auto-parts': {
    title: 'Milwaukee Auto Parts',
    seriesLabel: 'Anchor Partner',
    locationLabel: 'Milwaukee, WI',
    institutionLabel: 'BEAM Transportation',
    summary:
      'Pilot anchor partner focused on expanding sales reach, local sourcing, and repair-to-logistics conversion pathways.',
  },
}

export function getPartnerDashboardContext(id: string) {
  return partnerDashboardContexts[id as keyof typeof partnerDashboardContexts]
}
