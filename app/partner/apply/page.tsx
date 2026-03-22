import TransportHeader from '@/components/transport/TransportHeader'
import PartnerApplicationForm from '@/components/transport/PartnerApplicationForm'

export default async function PartnerApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>
}) {
  const { tier } = await searchParams

  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171a21] to-[#0b0d10] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">Partner application</p>
          <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl">Tell BEAM what you are building</h1>
          <p className="mt-4 text-lg leading-8 text-white/76">
            Use this form to describe your business, the kind of support you need, and the partnership style that fits how you want to grow.
          </p>
        </section>
        <PartnerApplicationForm defaultTier={tier} />
      </main>
    </div>
  )
}
