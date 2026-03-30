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
  'Professional references from faculty and anchor partners',
  'CV line items with measurable, documented outcomes',
  'Revenue share on Expansion and Anchor partner contracts',
]

// ─── Compensation tiers — honest and stage-specific ──────────────────────────

export type CompensationTier = {
  id: string
  stage: string
  name: string
  who: string
  description: string
  specifics: string[]
}

export const compensationTiers: CompensationTier[] = [
  {
    id: 'cv-portfolio',
    stage: 'Now — Early Stage',
    name: 'CV & Portfolio',
    who: 'Community members without institutional affiliation',
    description:
      'BEAM is early stage and honest about it. Right now the primary return is real, documented work that moves your professional life forward — not a paycheck. That changes as client contracts generate revenue.',
    specifics: [
      'Documented case study for each completed deliverable',
      'Written reference from BEAM staff and anchor partner',
      'BEAM credential — verified proof of work on a real business project',
      'First right of refusal on paid roles when the cohort generates revenue',
      'Your name on a live client account (RAG fleet, anchor partner)',
    ],
  },
  {
    id: 'credit-bearing',
    stage: 'Now — For Enrolled Students',
    name: 'Academic Credit',
    who: 'Students at UWM or MATC in a co-requisite course',
    description:
      'If you are enrolled at UWM or MATC, BEAM work can count toward a co-requisite course. Your institution provides the academic credit; BEAM provides the applied context. Both sides of your transcript get filled in.',
    specifics: [
      'Credit-bearing field experience through UWM or MATC co-requisite',
      'Faculty supervision and structured milestone review',
      'Transcript-ready documentation of applied work',
      'Access to institutional tools, labs, and certification pathways',
      'Same portfolio outputs as the CV track — plus academic standing',
    ],
  },
  {
    id: 'revenue-share',
    stage: 'As Clients Pay',
    name: 'Revenue Share',
    who: 'Cohort members whose work directly generates client revenue',
    description:
      'Once a client contract is active and generating payment — like the ReadyAimGo fleet maintenance contract at $175/vehicle/month — a defined share goes into a cohort pool distributed to active participants. This is not theoretical; it is built into the contract structure from the start.',
    specifics: [
      '20% of client contract revenue distributed to the assigned cohort pool',
      'RAG fleet contract: $175/vehicle × fleet size → cohort share calculated monthly',
      'Distribution based on documented hours and approved service logs',
      'Transparent ledger — every participant sees the math',
      'Stipend track opens when NGO reaches grant funding threshold',
    ],
  },
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
