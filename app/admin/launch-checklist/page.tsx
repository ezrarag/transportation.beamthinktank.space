import TransportHeader from '@/components/transport/TransportHeader'
import LaunchChecklist from '@/components/admin/checklist/LaunchChecklist'

export const metadata = {
  title: 'Launch Checklist | BEAM Transportation Admin',
  description: '64-item operational launch tracker across Legal, Fleet, Cohort, Academic, Partners, Infrastructure, Financial, and Tech.',
}

export default function LaunchChecklistPage() {
  return (
    <div className="min-h-screen bg-transport-black text-white selection:bg-transport-amber selection:text-black">
      <TransportHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header Banner */}
        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#171a20] to-[#0b0d11] p-6 sm:p-10 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-transport-signal font-bold">
              Transportation Admin · Operations
            </p>
            <span className="font-mono text-[11px] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
              64 Tracked Items
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display leading-[1.05]">
            Operational Launch Checklist
          </h1>

          <p className="text-sm sm:text-base text-white/60 max-w-3xl leading-relaxed font-sans">
            Every step required to progress from code to operational fleet across 8 critical pillars: Legal, RAG Fleet Contract, Cohort, Academic, Anchor Partners, Infrastructure, Financial & Grants, and Telemetry Tech.
          </p>
        </section>

        {/* Interactive 64-item Checklist Tracker */}
        <section className="rounded-[28px] border border-white/10 bg-[#0A0D14]/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <LaunchChecklist />
        </section>
      </main>
    </div>
  )
}
