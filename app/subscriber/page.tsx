'use client'

import { useRouter } from 'next/navigation'
import TransportHeader from '@/components/transport/TransportHeader'
import { partnershipTiers } from '@/lib/transport/partners'

export default function SubscriberPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171a21] to-[#0b0d10] p-6 sm:p-8 lg:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">Partner subscription flow</p>
          <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl">Choose a BEAM Transportation partnership tier</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/76">
            Starter is application-first and grant-friendly. Growth and Anchor continue into an authenticated Stripe checkout handoff.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {partnershipTiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => router.push(`/subscribe?tier=${tier.id}`)}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-left transition hover:border-transport-amber"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-transport-amber">{tier.id}</p>
              <h2 className="mt-3 text-4xl text-white">{tier.name}</h2>
              <p className="mt-2 text-sm leading-6 text-white/72">{tier.description}</p>
              <p className="mt-5 text-xl text-transport-signal">{tier.priceLabel}</p>
              <div className="mt-5 space-y-2 text-sm text-white/68">
                {tier.features.map((feature) => (
                  <p key={feature}>{feature}</p>
                ))}
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  )
}
