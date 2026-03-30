import Link from 'next/link'
import TransportHeader from '@/components/transport/TransportHeader'
import { ragClient, getClientVehicles } from '@/lib/transport/fleet'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  return { title: `Cohort Dashboard — BEAM Transportation` }
}

export default function StudentDashboard({ params }: Props) {
  const fleetVehicles = getClientVehicles('rag')
  const nextWindow = `${ragClient.serviceSchedule.dayOfWeek}s, ${ragClient.serviceSchedule.timeWindow}`
  const monthly = ragClient.monthlyRatePerVehicle * ragClient.fleetSize

  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171a20] to-[#0b0d11] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">
            Cohort Dashboard
          </p>
          <h1 className="mt-3 text-6xl text-white sm:text-7xl">Welcome back</h1>
          <p className="mt-2 text-sm text-white/50">
            Your assigned client, fleet, and service schedule are below.
          </p>
        </section>

        {/* Fleet client tile — the key new element */}
        <section className="rounded-[28px] border border-transport-signal/30 bg-transport-signal/[0.05] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-transport-signal">
                My Fleet Client
              </p>
              <h2 className="mt-2 text-4xl text-white">{ragClient.name}</h2>
              <p className="mt-1 font-mono text-[10px] text-white/40">
                Fleet: {fleetVehicles.length} vehicles · Next window: {nextWindow}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-white/30">
                Contract value: ${monthly.toLocaleString()}/mo · Status:{' '}
                <span className="capitalize text-transport-signal">
                  {ragClient.contractStatus}
                </span>
              </p>
            </div>
            <span className="self-start rounded-full border border-transport-signal/30 bg-transport-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-transport-signal">
              Active Client
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Link href="/fleet" className="btn-secondary justify-center text-center">
              View Fleet
            </Link>
            <Link
              href={`/viewer/partner/rag`}
              className="btn-secondary justify-center text-center"
            >
              Client Portal
            </Link>
            <Link href="/cohort" className="btn-secondary justify-center text-center">
              View Schedule
            </Link>
          </div>
        </section>

        {/* Quick stat tiles */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'My Projects',    value: 2, href: '/projects',              color: 'text-white' },
            { label: 'Certifications', value: 0, href: '/cohort',                color: 'text-transport-amber' },
            { label: 'Service Logs',   value: 0, href: `/viewer/partner/rag`,    color: 'text-transport-signal' },
            { label: 'Portfolio',      value: 1, href: '/viewer',                color: 'text-white' },
          ].map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-transport-amber/30 hover:bg-white/[0.05]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                {tile.label}
              </p>
              <p className={`mt-2 text-4xl ${tile.color}`}>{tile.value}</p>
            </Link>
          ))}
        </div>

        {/* My assigned vehicles */}
        <section className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            Assigned Fleet — {ragClient.name} ({fleetVehicles.length} vehicles)
          </p>
          {fleetVehicles.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between gap-4 rounded-[18px] border border-white/[0.07] bg-white/[0.02] px-5 py-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  {v.year} {v.make} {v.model}
                </p>
                <p className="font-mono text-[10px] text-white/35">{v.config} · {v.notes}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${
                  v.healthStatus === 'good'
                    ? 'bg-transport-signal/10 text-transport-signal'
                    : v.healthStatus === 'needs-attention'
                    ? 'bg-transport-amber/10 text-transport-amber'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {v.healthStatus}
              </span>
            </div>
          ))}
        </section>

      </main>
    </div>
  )
}
