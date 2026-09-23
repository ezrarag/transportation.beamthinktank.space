import Link from 'next/link'
import { Wrench, Building2, Car, Settings, ShieldCheck, Package, ArrowRight } from 'lucide-react'

const TRANSIT_AREAS = [
  {
    id: 'repair',
    name: 'Repair Area',
    description: 'Fleet maintenance, mechanic bay management, warranty tracking, and parts replacement.',
    href: '/admin/areas/repair',
    icon: Wrench,
    badge: 'ACTIVE BAY',
    accent: 'text-transport-signal',
  },
  {
    id: 'build',
    name: 'Build Area',
    description: 'Vehicle retrofitting, EV powertrain integration, telemetry harness install, and assembly.',
    href: '/admin/areas/build',
    icon: Building2,
    badge: 'FABRICATION',
    accent: 'text-transport-amber',
  },
  {
    id: 'restore',
    name: 'Restore Area',
    description: 'Classic fleet restoration, chassis reinforcement, custom paint, and historic revival.',
    href: '/admin/areas/restore',
    icon: Car,
    badge: 'REFURBISHMENT',
    accent: 'text-purple-400',
  },
  {
    id: 'rnd',
    name: 'R&D Innovation Lab',
    description: 'Autonomous sensor rigs, micro-transit battery testing, aerodynamic optimization, and telemetry.',
    href: '/admin/areas/rnd',
    icon: Settings,
    badge: 'PROTOTYPING',
    accent: 'text-cyan-400',
  },
  {
    id: 'legal',
    name: 'Legal & Insurance',
    description: 'DOT compliance, municipal franchise agreements, liability coverage, and fleet registration.',
    href: '/admin/areas/legal',
    icon: ShieldCheck,
    badge: 'COMPLIANCE',
    accent: 'text-emerald-400',
  },
  {
    id: 'logistics',
    name: 'Logistics Catalog',
    description: 'Automotive supply chain, warehouse storage, parts inventory, and courier logistics.',
    href: '/admin/areas/logistics',
    icon: Package,
    badge: 'SUPPLY CHAIN',
    accent: 'text-amber-400',
  },
]

export default function AdminAreasIndexPage() {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-2 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-transport-signal/10 border border-transport-signal/30 text-transport-signal text-xs font-mono font-bold uppercase tracking-wider">
          <span>Maintenance & Facilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Transit Operational Areas
        </h1>
        <p className="text-sm text-white/60 max-w-2xl">
          Dedicated operational facilities across vehicle fabrication, repair bays, legal compliance, and supply chain logistics.
        </p>
      </div>

      {/* Grid of Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRANSIT_AREAS.map((area) => {
          const Icon = area.icon
          return (
            <Link
              key={area.id}
              href={area.href}
              className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-white/5 ${area.accent}`}>
                    {area.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-transport-amber transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white">
                <span>Manage facility</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
