import {
  Building2,
  Car,
  CheckSquare,
  FileText,
  FolderOpen,
  Globe,
  LayoutDashboard,
  Package,
  Settings,
  Truck,
  Users,
  Wallet,
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
  resolveHref?: (context: AdminNavContext) => string
}

export type AdminNavGroup = {
  key: string
  title?: string
  items: AdminNavItem[]
}

const adminNavGroups: AdminNavGroup[] = [
  {
    key: 'dashboard',
    items: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
        enabled: true,
        roles: ['beam_admin', 'partner_admin'],
        resolveHref: ({ role, partnerProjectId }) =>
          role === 'partner_admin' && partnerProjectId
            ? `/admin/projects/${partnerProjectId}`
            : '/admin/dashboard',
      },
    ],
  },
  {
    key: 'transport-areas',
    title: 'TRANSPORT AREAS',
    items: [
      {
        key: 'area-repair',
        label: 'Repair',
        href: '/admin/areas/repair',
        icon: Car,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-build',
        label: 'Build',
        href: '/admin/areas/build',
        icon: Building2,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-restore',
        label: 'Restore',
        href: '/admin/areas/restore',
        icon: Car,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-rnd',
        label: 'R&D',
        href: '/admin/areas/rnd',
        icon: Settings,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-legal',
        label: 'Legal & Insurance',
        href: '/admin/areas/legal',
        icon: FileText,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'area-logistics',
        label: 'Logistics',
        href: '/admin/areas/logistics',
        icon: Package,
        enabled: true,
        roles: ['beam_admin'],
      },
    ],
  },
  {
    key: 'fleet',
    title: 'FLEET',
    items: [
      {
        key: 'fleet-clients',
        label: 'Fleet Clients',
        href: '/admin/clients',
        icon: Truck,
        enabled: false,
        roles: ['beam_admin'],
      },
      {
        key: 'fleet-gallery',
        label: 'Fleet Gallery',
        href: '/fleet',
        icon: Car,
        enabled: true,
        roles: ['beam_admin', 'partner_admin'],
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
        key: 'launch-checklist',
        label: 'Launch Checklist',
        href: '/admin/launch-checklist',
        icon: CheckSquare,
        enabled: true,
        roles: ['beam_admin'],
      },
    ],
  },
  {
    key: 'people',
    title: 'PEOPLE',
    items: [
      {
        key: 'cohort',
        label: 'Cohort Members',
        href: '/admin/musicians',
        icon: Users,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'partners',
        label: 'Partners',
        href: '/admin/projects',
        icon: Users,
        enabled: true,
        roles: ['beam_admin', 'partner_admin'],
      },
      {
        key: 'applications',
        label: 'Applications',
        href: '/admin/applications',
        icon: FolderOpen,
        enabled: true,
        roles: ['beam_admin'],
      },
    ],
  },
  {
    key: 'platform',
    title: 'PLATFORM',
    items: [
      {
        key: 'public-platform',
        label: 'Viewer / Public',
        href: '/admin/viewer',
        icon: Globe,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'home-slides',
        label: 'Home Slides',
        href: '/admin/home-slides',
        icon: Globe,
        enabled: true,
        roles: ['beam_admin'],
      },
      {
        key: 'logistics-catalog',
        label: 'Logistics Catalog',
        href: '/admin/infrastructure',
        icon: Package,
        enabled: true,
        roles: ['beam_admin'],
      },
    ],
  },
  {
    key: 'finance',
    title: 'FINANCE',
    items: [
      {
        key: 'finance',
        label: 'Finance',
        href: '/admin/finance',
        icon: Wallet,
        enabled: true,
        roles: ['beam_admin'],
      },
    ],
  },
  {
    key: 'system',
    title: 'SYSTEM',
    items: [
      {
        key: 'settings',
        label: 'Settings',
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
