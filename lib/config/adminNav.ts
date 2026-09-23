import {
  LayoutDashboard,
  BarChart3,
  FileText,
  CheckSquare,
  Calendar,
  Car,
  Truck,
  Wrench,
  Building2,
  Settings,
  ShieldCheck,
  Package,
  Users,
  FolderOpen,
  Globe,
  MapPin,
  type LucideIcon,
} from 'lucide-react'

export type AdminNavRole = 'beam_admin' | 'partner_admin' | 'board'

export type AdminNavContext = {
  role: string | null
  partnerProjectId?: string | null
}

export type AdminNavItem = {
  key: string
  label: string
  href: string
  icon: LucideIcon
  enabled: boolean
  roles: AdminNavRole[]
  badge?: string
  resolveHref?: (context: AdminNavContext) => string
}

export type AdminNavGroup = {
  key: string
  title: string
  items: AdminNavItem[]
}

const adminNavGroups: AdminNavGroup[] = [
  {
    key: 'operations',
    title: 'OPERATIONS HUB',
    items: [
      {
        key: 'admin-overview',
        label: 'Admin Overview',
        href: '/admin',
        icon: LayoutDashboard,
        enabled: true,
        roles: ['beam_admin', 'partner_admin'],
        resolveHref: ({ role, partnerProjectId }) =>
          role === 'partner_admin' && partnerProjectId
            ? `/admin/projects/${partnerProjectId}`
            : '/admin',
      },
      {
        key: 'truth-dashboard',
        label: 'Truth Dashboard',
        href: '/dashboard/leesburg-fl',
        icon: BarChart3,
        enabled: true,
        roles: ['beam_admin', 'partner_admin'],
        badge: 'Live',
      },
      {
        key: 'hearing-dossier',
        label: 'Hearing Dossier',
        href: '/admin/dashboard/leesburg-fl',
        icon: FileText,
        enabled: true,
        roles: ['beam_admin'],
        badge: 'Leesburg',
      },
      {
        key: 'launch-checklist',
        label: 'Launch Checklist',
        href: '/admin/launch-checklist',
        icon: CheckSquare,
        enabled: true,
        roles: ['beam_admin'],
        badge: '64',
      },
      {
        key: 'implementation-timeline',
        label: 'Implementation Timeline',
        href: '/admin/implementation-timeline',
        icon: Calendar,
        enabled: true,
        roles: ['beam_admin'],
        badge: 'Phases',
      },
    ],
  },
  {
    key: 'fleet-services',
    title: 'FLEET & SERVICES',
    items: [
      {
        key: 'fleet-gallery',
        label: 'Fleet Gallery',
        href: '/fleet',
        icon: Car,
        enabled: true,
        roles: ['beam_admin', 'partner_admin'],
      },
      {
        key: 'area-repair',
        label: 'Repair Area',
        href: '/admin/areas/repair',
        icon: Wrench,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-build',
        label: 'Build Area',
        href: '/admin/areas/build',
        icon: Building2,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-restore',
        label: 'Restore Area',
        href: '/admin/areas/restore',
        icon: Car,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-rnd',
        label: 'R&D Area',
        href: '/admin/areas/rnd',
        icon: Settings,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'service-logs',
        label: 'Service Logs',
        href: '/admin/service-logs',
        icon: FileText,
        enabled: false,
        roles: ['beam_admin'],
      },
      {
        key: 'fleet-clients',
        label: 'Fleet Clients',
        href: '/admin/clients',
        icon: Truck,
        enabled: false,
        roles: ['beam_admin'],
      },
    ],
  },
  {
    key: 'governance-logistics',
    title: 'GOVERNANCE & LOGISTICS',
    items: [
      {
        key: 'area-legal',
        label: 'Legal & Insurance',
        href: '/admin/areas/legal',
        icon: ShieldCheck,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-logistics',
        label: 'Logistics Catalog',
        href: '/admin/areas/logistics',
        icon: Package,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'supply-partners',
        label: 'Supply Chain Partners',
        href: '/admin/partners',
        icon: Building2,
        enabled: true,
        roles: ['beam_admin'],
      },
    ],
  },
  {
    key: 'people-program',
    title: 'PEOPLE & PROGRAM',
    items: [
      {
        key: 'cohort-members',
        label: 'Cohort Members',
        href: '/admin/cohorts',
        icon: Users,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'applications',
        label: 'Applications',
        href: '/admin/applications',
        icon: FolderOpen,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'municipal-partners',
        label: 'Municipal Pilots',
        href: '/admin/projects',
        icon: Building2,
        enabled: true,
        roles: ['beam_admin', 'partner_admin'],
      },
    ],
  },
  {
    key: 'platform-content',
    title: 'PLATFORM & CONTENT',
    items: [
      {
        key: 'public-viewer',
        label: 'Public Viewer Preview',
        href: '/viewer',
        icon: Globe,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-manager',
        label: 'Area Manager',
        href: '/admin/areas',
        icon: MapPin,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'media-vault',
        label: 'Media Vault',
        href: '/admin/content',
        icon: FileText,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'settings',
        label: 'Platform Settings',
        href: '/admin/settings',
        icon: Settings,
        enabled: true,
        roles: ['beam_admin'],
      },
    ],
  },
]

export function getAdminNavGroups(context: AdminNavContext): AdminNavGroup[] {
  const activeRole = context.role as AdminNavRole | null
  if (!activeRole) return []

  return adminNavGroups
    .map((group) => ({
      ...group,
      items: group.items
        .filter((item) => item.roles.includes(activeRole))
        .map((item) => ({
          ...item,
          href: item.resolveHref ? item.resolveHref(context) : item.href,
        })),
    }))
    .filter((group) => group.items.length > 0)
}
