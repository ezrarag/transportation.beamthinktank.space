'use client'

import AdminIncidentLog from '@/components/dashboard/AdminIncidentLog'

export default function AdminLeesburgDashboardPage() {
  return (
    <div className="space-y-8 p-4 sm:p-8">
      <AdminIncidentLog citySlug="leesburg-fl" />
    </div>
  )
}
