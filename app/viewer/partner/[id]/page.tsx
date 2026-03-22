'use client'

import { useParams } from 'next/navigation'
import { RoleDashboardPage } from '@/app/viewer/_components/RoleDashboardPage'
import { getPartnerDashboardContext } from '@/lib/transport/partners'

const partnerActions = [
  { title: 'My Cohort', subtitle: 'View assigned members, status, and deliverables.' },
  { title: 'Active Projects', subtitle: 'Track area projects tied to your business.' },
  { title: 'Sourcing Network', subtitle: 'Open logistics infrastructure filtered to supply needs.' },
  { title: 'Request Support', subtitle: 'Ask for specific cohort work, research, or sourcing help.' },
]

export default function PartnerDashboardPage() {
  const params = useParams<{ id: string }>()
  const context = getPartnerDashboardContext(params.id) || {
    title: 'Partner Workspace',
    seriesLabel: 'Partner',
    locationLabel: 'Milwaukee, WI',
    institutionLabel: 'BEAM Transportation',
    summary: 'Partner dashboard for cohort coordination, documents, sourcing, and active project tracking.',
  }

  return (
    <RoleDashboardPage
      mode="partner"
      title="Partner Dashboard"
      badgeLabel="Partner"
      actionTiles={partnerActions}
      context={context}
    />
  )
}
