import Link from 'next/link'
import CohortHowItWorks from '@/components/transport/CohortHowItWorks'
import PartnerApplicationForm from '@/components/transport/PartnerApplicationForm'
import TransportHeader from '@/components/transport/TransportHeader'
import { partnershipTiers } from '@/lib/transport/partners'

export default function PartnerLandingPage() {
  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#1d2027] to-[#0e1014] p-6 sm:p-8 lg:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">Partner your business with BEAM</p>
          <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl lg:text-8xl">Grow your business without giving away control</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-white/76">
            BEAM gives local transportation businesses a dedicated cohort, student labor and research access, and a clear MOU structure with IP and liability protections.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/partner/apply" className="btn-primary">
              Apply for Partnership
            </Link>
            <Link href="/subscriber" className="btn-secondary">
              Review Tiers
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            'A dedicated cohort working on your business',
            'UWM and MATC student labor plus research access',
            'Clear MOU with IP and liability protections',
          ].map((item) => (
            <article key={item} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-lg leading-8 text-white/76">
              {item}
            </article>
          ))}
        </section>

        <section className="space-y-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-signal">Partnership tiers</p>
            <h2 className="mt-3 text-5xl text-white sm:text-6xl">Choose the level of cohort deployment that fits your business</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {partnershipTiers.map((tier) => (
              <article key={tier.id} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-transport-amber">{tier.id}</p>
                <h3 className="mt-3 text-4xl text-white">{tier.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/72">{tier.description}</p>
                <p className="mt-4 text-xl text-transport-signal">{tier.priceLabel}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <CohortHowItWorks />

        <section className="space-y-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-signal">Quick application</p>
            <h2 className="mt-3 text-5xl text-white sm:text-6xl">Start the conversation in under five minutes</h2>
          </div>
          <PartnerApplicationForm />
        </section>
      </main>
    </div>
  )
}
