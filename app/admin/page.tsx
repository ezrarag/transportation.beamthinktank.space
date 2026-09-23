import Link from 'next/link'
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
  ArrowRight,
  ShieldCheck,
  TrendingUp,
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
  {
    title: 'Hearing Evidence Dossier',
    href: '/admin/dashboard/leesburg-fl',
    description:
      'Review inbound community incident reports, verify submissions, and generate citation dossiers for Lake County BOCC transit hearings.',
    badge: 'EVIDENTIARY DOSSIER',
    icon: FileText,
    featured: true,
    status: 'live',
  },
]

const SYSTEM_SECTIONS: AdminTile[] = [
  {
    title: 'Area Manager',
    href: '/admin/areas',
    description: 'Edit transit operational areas, dispatch corridors, maintenance bays, and facility narratives.',
    badge: 'CORRIDORS',
    icon: MapPin,
  },
  {
    title: 'Municipal Pilots',
    href: '/admin/projects',
    description: 'Create, edit, and publish transit case studies, municipal pilots, and stakeholder records.',
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
    title: 'Cohort & Crew',
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
    description: 'Upload and manage operational guidelines, route training videos, and telemetry documentation.',
    badge: 'KNOWLEDGE',
    icon: FileText,
  },
]

export default function AdminPage() {
  return (
    <div className="space-y-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header Hero Section */}
      <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#12151D] via-[#0E1017] to-[#08090C] p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-transport-signal font-bold">
              BEAM Transportation
            </span>
            <span className="text-white/30">·</span>
            <span className="font-mono text-[10px] uppercase text-white/50">Executive Control Hub</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Operational</span>
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-[1.05]">
          Executive Control Hub
        </h1>

        <p className="max-w-3xl text-xs sm:text-sm sm:leading-relaxed text-white/70 font-sans">
          Consolidated operations shell for BEAM Transportation: live operational roadmaps, 64-item launch execution, federal transit gap telemetry, hearing evidence dossiers, and municipal cohort administration.
        </p>

        {/* Unified Macro Telemetry Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/50">
              <span>Active Corridors</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-1">Lake County</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Leesburg Priority 01</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/50">
              <span>Launch Readiness</span>
              <span className="px-1.5 py-0.5 rounded bg-transport-amber/15 text-transport-amber text-[9px] font-bold">Phase 1</span>
            </div>
            <div className="text-2xl font-bold font-mono text-transport-amber mt-1">64 Items</div>
            <div className="text-[11px] text-white/60 font-mono mt-0.5">8 Operational Tracks</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/50">
              <span>Transit Deficit</span>
              <span className="px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 text-[9px] font-bold">NTD 40158</span>
            </div>
            <div className="text-2xl font-bold font-mono text-red-400 mt-1">17% Grade</div>
            <div className="text-[11px] text-red-400/80 font-mono mt-0.5">Severe Headway Gap</div>
          </div>

          <Link 
            href="/admin/dashboard/leesburg-fl"
            className="p-4 rounded-2xl bg-red-950/25 hover:bg-red-950/45 border border-red-500/30 transition group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-red-400">
              <span>Hearing Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-1">Evidence Log</div>
            <div className="text-[11px] text-white/60 font-mono mt-0.5">Inspect Submissions →</div>
          </Link>
        </div>
      </section>

      {/* Operational Command Hubs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-transport-amber" />
            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-transport-amber font-bold">
              Operational Command Hubs
            </h2>
          </div>
          <span className="text-[11px] font-mono text-white/40 hidden sm:inline">Active Workspaces</span>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {PRIMARY_HUBS.map((hub) => {
            const Icon = hub.icon
            return (
              <Link
                key={hub.title}
                href={hub.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-transport-amber/50 p-5 sm:p-6 shadow-xl transition-all duration-200 hover:-translate-y-1"
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
                    <h3 className="mt-1 text-lg sm:text-xl font-bold text-white group-hover:text-transport-amber transition-colors">
                      {hub.title}
                    </h3>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    {hub.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white">
                  <span>Open workspace</span>
                  <span>→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Platform Infrastructure Sections */}
      <section className="space-y-4">
        <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-white/60 font-bold">
          Platform Infrastructure
        </h2>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {SYSTEM_SECTIONS.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.title}
                href={section.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40 group-hover:text-transport-amber px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      {section.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-transport-amber transition-colors">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/60 font-sans">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white">
                  <span>Configure module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
