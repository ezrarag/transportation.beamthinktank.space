export const cohortRoleCards = [
  {
    id: 'community-member',
    title: 'Community Member',
    description: 'No degree required. Optional co-requisite coursework unlocks tools, certifications, and portfolio outputs.',
    href: '/viewer/role-overview/community-member',
  },
  {
    id: 'student',
    title: 'UWM / MATC Student',
    description: 'Earn credit through real work that supports Milwaukee transportation businesses and BEAM initiatives.',
    href: '/viewer/role-overview/student',
  },
  {
    id: 'faculty',
    title: 'Faculty Collaborator',
    description: 'Mentor students, guide applied R&D, and connect instruction to community production.',
    href: '/viewer/role-overview/faculty',
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    description: 'Bring an idea and use BEAM infrastructure to test, build, and organize its delivery system.',
    href: '/viewer/role-overview/entrepreneur',
  },
]

export const whatYouEarn = [
  'ASE certifications and transportation skill credentials',
  'Portfolio and case-study project outputs',
  'Professional references',
  'CV line items with measurable outcomes',
  'Potential revenue share on Expansion and Anchor partner work',
]

export const cohortMemberDashboardContexts = {
  eric: {
    title: 'Eric H.',
    seriesLabel: 'Cohort Member',
    locationLabel: 'Milwaukee, WI',
    institutionLabel: 'BEAM Transportation',
    summary:
      'Community cohort member building logistics and entrepreneurial experience through the pilot sourcing network.',
  },
}

export const facultyDashboardContexts = {
  'uwm-mobility-lab': {
    title: 'UWM Mobility Lab',
    seriesLabel: 'Faculty Collaborator',
    locationLabel: 'Milwaukee, WI',
    institutionLabel: 'University of Wisconsin-Milwaukee',
    summary:
      'Faculty-led R&D collaboration focused on transportation efficiency, materials, and community commercialization.',
  },
}

export function getCohortMemberDashboardContext(id: string) {
  return cohortMemberDashboardContexts[id as keyof typeof cohortMemberDashboardContexts]
}

export function getFacultyDashboardContext(id: string) {
  return facultyDashboardContexts[id as keyof typeof facultyDashboardContexts]
}
