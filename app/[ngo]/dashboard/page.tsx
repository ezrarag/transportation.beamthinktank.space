import PortalNav from '@/components/portal/PortalNav'
import ParticipantDashboardClient from '@/components/portal/ParticipantDashboardClient'
import { getPortalContext, getPortalNav } from '@/lib/portal/page-data'

export default async function NgoDashboardPage({ params }: { params: Promise<{ ngo: string }> }) {
  const { ngo } = await params
  const { config, locale } = getPortalContext(ngo)

  return (
    <div className="min-h-screen bg-white">
      <PortalNav links={getPortalNav(config.id, true)} />
      <ParticipantDashboardClient ngo={config.id} copy={locale.dashboard} scopedRoutes />
    </div>
  )
}
