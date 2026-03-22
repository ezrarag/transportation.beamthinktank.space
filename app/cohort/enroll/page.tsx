import TransportHeader from '@/components/transport/TransportHeader'
import CohortEnrollForm from '@/components/transport/CohortEnrollForm'

export default async function CohortEnrollPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>
}) {
  const { role } = await searchParams

  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171a21] to-[#0b0d10] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">Cohort enrollment</p>
          <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl">Start building inside BEAM Transportation</h1>
          <p className="mt-4 text-lg leading-8 text-white/76">
            Tell us your role, interests, availability, and what you want to build. BEAM will help map you into the right transportation workstream.
          </p>
        </section>
        <CohortEnrollForm defaultRole={role} />
      </main>
    </div>
  )
}
