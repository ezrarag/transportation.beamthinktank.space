'use client'

import { useParams } from 'next/navigation'
import { RoleDashboardPage } from '@/app/viewer/_components/RoleDashboardPage'
import { getFacultyDashboardContext } from '@/lib/transport/cohort'

const instructorActions = [
  { title: 'My Cohort Members', subtitle: 'See the students and participants under your supervision.' },
  { title: 'R&D Projects', subtitle: 'Review applied research work in progress.' },
  { title: 'Partner Connections', subtitle: 'Track businesses connected to your instructional work.' },
  { title: 'Publications / Outputs', subtitle: 'Collect academic and field outputs from BEAM collaborations.' },
]

export default function InstructorDashboardPage() {
  const params = useParams<{ id: string }>()
  const context = getFacultyDashboardContext(params.id) || {
    title: 'Faculty Collaborator',
    seriesLabel: 'Faculty',
    locationLabel: 'Milwaukee, WI',
    institutionLabel: 'BEAM Transportation',
    summary: 'Faculty dashboard for supervised cohort work, research projects, and partner relationships.',
  }

  return (
    <RoleDashboardPage
      mode="instructor"
      title="Faculty Dashboard"
      badgeLabel="Faculty / Mentor"
      actionTiles={instructorActions}
      context={context}
    />
  )
}
