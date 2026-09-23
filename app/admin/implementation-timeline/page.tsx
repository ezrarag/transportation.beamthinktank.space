import ImplementationTimeline from '@/components/admin/timeline/ImplementationTimeline'

export const metadata = {
  title: 'Implementation Timeline | BEAM Transportation Admin',
  description: 'From code to contract to vehicle — the honest operational path forward as of September 2026.',
}

export default function ImplementationTimelinePage() {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Page Header Section */}
      <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#171a20] to-[#0b0d11] p-6 sm:p-10 shadow-2xl space-y-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-transport-signal font-bold">
          Transportation Admin
        </p>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display leading-[1.05]">
          Implementation Timeline
        </h1>
        <p className="text-sm sm:text-base text-white/60 max-w-3xl leading-relaxed font-sans">
          From code to contract to vehicle — the honest path forward as of September 2026.
        </p>
      </section>

      {/* Tabbed Interactive Timeline Component */}
      <section className="rounded-[28px] border border-white/10 bg-[#0A0D14]/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <ImplementationTimeline />
      </section>
    </div>
  )
}
