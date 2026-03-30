import { notFound } from 'next/navigation'
import Link from 'next/link'
import TransportHeader from '@/components/transport/TransportHeader'
import { getClientById, getClientVehicles } from '@/lib/transport/fleet'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  const client = getClientById(params.id)
  return {
    title: client ? `${client.name} Portal — BEAM Transportation` : 'Partner Portal',
  }
}

export default function PartnerDashboard({ params }: Props) {
  const client = getClientById(params.id)
  if (!client) notFound()

  const vehicles = getClientVehicles(params.id)
  const good      = vehicles.filter((v) => v.healthStatus === 'good').length
  const attention = vehicles.filter((v) => v.healthStatus === 'needs-attention').length
  const critical  = vehicles.filter((v) => v.healthStatus === 'critical').length
  const monthly   = client.monthlyRatePerVehicle * client.fleetSize

  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171a20] to-[#0b0d11] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">
            Partner Portal
          </p>
          <h1 className="mt-3 text-6xl text-white sm:text-7xl">{client.name}</h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-transport-amber">
            Fleet Client · {client.serviceSchedule.frequency} maintenance ·{' '}
            <span className="capitalize">{client.contractStatus}</span>
          </p>
        </section>

        {/* Fleet health overview */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Vehicles',   value: vehicles.length, color: 'text-white' },
            { label: 'Good',             value: good,            color: 'text-transport-signal' },
            { label: 'Needs Attention',  value: attention,       color: 'text-transport-amber' },
            { label: 'Critical',         value: critical,        color: 'text-red-400' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                {s.label}
              </p>
              <p className={`mt-1 text-4xl ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </section>

        {/* Contract snapshot */}
        <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-transport-amber">
            Contract
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/35">
                Monthly Rate
              </p>
              <p className="mt-1 text-3xl text-white">${monthly.toLocaleString()}</p>
              <p className="mt-0.5 font-mono text-[10px] text-white/35">
                ${client.monthlyRatePerVehicle}/vehicle × {client.fleetSize} vehicles
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/35">
                Service Window
              </p>
              <p className="mt-1 text-lg text-white">{client.serviceSchedule.dayOfWeek}s</p>
              <p className="mt-0.5 font-mono text-[10px] text-white/35">
                {client.serviceSchedule.timeWindow}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/35">
                Contract Status
              </p>
              <p className="mt-1 text-lg capitalize text-transport-signal">
                {client.contractStatus}
              </p>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="flex flex-wrap gap-3">
          <Link href="/fleet" className="btn-secondary">
            View Full Fleet
          </Link>
          <Link href="/cohort" className="btn-secondary">
            View Cohort Team
          </Link>
          <Link href="/partner/apply" className="btn-secondary">
            Request Additional Service
          </Link>
        </section>

        {/* Vehicle list */}
        <section className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            Fleet Vehicles ({vehicles.length})
          </p>
          {vehicles.length === 0 ? (
            <p className="text-sm text-white/40">No vehicles registered yet.</p>
          ) : (
            vehicles.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between gap-4 rounded-[18px] border border-white/[0.07] bg-white/[0.02] px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">
                    {v.year} {v.make} {v.model}
                  </p>
                  <p className="font-mono text-[10px] text-white/35">
                    {v.config} · VIN: {v.vin || 'TBD'}
                  </p>
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
            ))
          )}
        </section>

      </main>
    </div>
  )
}
