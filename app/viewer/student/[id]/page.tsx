'use client'

import { useParams } from 'next/navigation'
import { RoleDashboardPage } from '@/app/viewer/_components/RoleDashboardPage'
import { getCohortMemberDashboardContext } from '@/lib/transport/cohort'

const studentActions = [
  { title: 'My Projects', subtitle: 'Review assigned projects, milestones, and public outputs.' },
  { title: 'My Certifications', subtitle: 'Track earned credentials and upcoming requirements.' },
  { title: 'My Partner', subtitle: 'See which anchor business you are supporting right now.' },
  { title: 'Schedule', subtitle: 'Review work sessions and UWM or MATC co-requisite dates.' },
]

export default function StudentDashboardPage() {
  const params = useParams<{ id: string }>()
  const context = getCohortMemberDashboardContext(params.id) || {
    title: 'Cohort Member',
    seriesLabel: 'Cohort',
    locationLabel: 'Milwaukee, WI',
    institutionLabel: 'BEAM Transportation',
    summary: 'Cohort dashboard for projects, certifications, partner context, and scheduling.',
  }

  return (
    <RoleDashboardPage
      mode="student"
      title="Cohort Member Dashboard"
      badgeLabel="Cohort Member"
      actionTiles={studentActions}
      context={context}
    />
  )
}
