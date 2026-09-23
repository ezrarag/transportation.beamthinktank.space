'use client'

import AdminIncidentLog from '@/components/dashboard/AdminIncidentLog'
import SourceVerificationModal from '@/components/dashboard/SourceVerificationModal'

export default function AdminLeesburgDashboardPage() {
  return (
    <div className="space-y-8 p-4 sm:p-8">
      <AdminIncidentLog citySlug="leesburg-fl" />
      <SourceVerificationModal />
    </div>
  )
}
