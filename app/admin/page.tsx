import Link from 'next/link'
import TransportHeader from '@/components/transport/TransportHeader'
import {
  Calendar,
  CheckSquare,
  BarChart3,
  MapPin,
  FolderKanban,
  Building2,
  Users,
  Package,
  FileText,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'

interface AdminTile {
  title: string
  href: string
  description: string
  badge: string
  icon: any
  featured?: boolean
  status?: 'live' | 'ready' | 'soon'
}

const PRIMARY_HUBS: AdminTile[] = [
  {
    title: 'Implementation Timeline',
    href: '/admin/implementation-timeline',
    description:
      'From code to contract to vehicle — 4 chronological phases, this week action checklist, 6 gate milestones, and 8 money streams.',
    badge: 'OPERATIONAL ROADMAP',
    icon: Calendar,
    featured: true,
    status: 'live',
  },
  {
    title: 'Launch Checklist',
    href: '/admin/launch-checklist',
    description:
      '64-item interactive operational launch tracker across Legal, RAG Fleet, Cohort, Academic, Partners, Infrastructure, Financial, and Tech.',
    badge: '64 TRACKED ITEMS',
    icon: CheckSquare,
    featured: true,
    status: 'live',
  },
  {
    title: 'Leesburg Truth Dashboard',
    href: '/dashboard/leesburg-fl',
    description:
      'Live evidentiary federal NTD transit gap model, LakeXpress 60-min headway deficit score, and community incident log.',
    badge: 'PILOT TELEMETRY',
    icon: BarChart3,
    featured: true,
    status: 'live',
  },
]

const SYSTEM_SECTIONS: AdminTile[] = [
  {
    title: 'Area Manager',
    href: '/admin/areas',
    description: 'Edit transit operational areas, dispatch corridors, hero imagery, and narrative arcs.',
    badge: 'CORRIDORS',
    icon: MapPin,
  },
  {
    title: 'Project Manager',
    href: '/admin/projects',
    description: 'Create, edit, and publish transit case studies, municipal pilots, and viewer records.',
    badge: 'PILOTS',
    icon: FolderKanban,
  },
  {
    title: 'Partner Manager',
    href: '/admin/partners',
    description: 'Review anchor business applications, approve parts & rental partners, and manage MOUs.',
    badge: 'PARTNERS',
    icon: Building2,
  },
  {
    title: 'Cohort Manager',
    href: '/admin/cohorts',
    description: 'Review driver pledges, mechanic apprentice enrollments, and operational vehicle placement.',
    badge: 'WORKFORCE',
    icon: Users,
  },
  {
    title: 'Logistics Catalog',
    href: '/admin/areas/logistics',
    description: 'Maintain categories, automotive parts suppliers, and item listings for local fleet sourcing.',
    badge: 'SUPPLY CHAIN',
    icon: Package,
  },
  {
    title: 'Content & Media Vault',
    href: '/admin/content',
    description: 'Upload and manage operational guidelines, route training videos, and documentation.',
    badge: 'KNOWLEDGE',
    icon: FileText,
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-transport-black text-white selection:bg-transport-amber selection:text-black font-sans">
      <TransportHeader />

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header Hero Section */}
        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#171a20] to-[#0b0d11] p-6 sm:p-10 shadow-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-transport-signal font-bold">
              BEAM Transport Admin
            </span>
            <span className="text-white/30">·</span>
            <span className="font-mono text-[10px] uppercase text-white/50">Executive Control Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.05]">
            Operational Transit Management
          </h1>

          <p className="max-w-3xl text-xs sm:text-sm sm:leading-relaxed text-white/70">
            Central dashboard for the BEAM Transportation namespace: live operational roadmaps, 64-item launch execution, federal transit gap telemetry, and municipal cohort administration.
          </p>
        </section>

        {/* Highlighted Core Operational Hubs (Timeline, Checklist, Dashboard) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-transport-amber" />
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-transport-amber font-bold">
                Operational Command Hubs
              </h2>
            </div>
            <span className="text-[11px] font-mono text-white/40 hidden sm:inline">Active Tools</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {PRIMARY_HUBS.map((hub) => {
              const Icon = hub.icon
              return (
                <Link
                  key={hub.title}
                  href={hub.href}
                  className="group relative flex flex-col justify-between rounded-[24px] border border-transport-amber/30 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 sm:p-6 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-transport-amber hover:shadow-transport-amber/10 hover:shadow-2xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-transport-amber/15 border border-transport-amber/30 flex items-center justify-center text-transport-amber">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-transport-signal/15 text-transport-signal border border-transport-signal/30 font-bold">
                          {hub.status}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-transport-amber" />
                      </div>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-transport-amber font-semibold">
                        {hub.badge}
                      </p>
                      <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white group-hover:text-transport-amber transition-colors">
                        {hub.title}
                      </h3>
                    </div>

                    <p className="text-xs text-white/65 leading-relaxed">
                      {hub.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50 group-hover:text-white">
                    <span>Open workspace</span>
                    <span>→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* System Administration Sections */}
        <section className="space-y-4">
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-white/60 font-bold">
            Platform Infrastructure
          </h2>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {SYSTEM_SECTIONS.map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group rounded-[20px] border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40 group-hover:text-transport-amber">
                      {section.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base sm:text-lg font-bold text-white group-hover:text-transport-amber transition-colors">
                    {section.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                    {section.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
