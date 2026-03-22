import Link from 'next/link'
import HomeSlidesHero from '@/components/portal/HomeSlidesHero'
import AreaRail from '@/components/transport/AreaRail'
import CohortHowItWorks from '@/components/transport/CohortHowItWorks'
import PartnerProposition from '@/components/transport/PartnerProposition'
import RoleCard from '@/components/transport/RoleCard'
import TransportHeader from '@/components/transport/TransportHeader'
import { homeSlides, institutionalPartners, transportAreas, transportRoles } from '@/lib/transport/areas'
import { resolvePortalPath } from '@/lib/portal/routes'

export default function TransportHomePage() {
  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />

      <main>
        <HomeSlidesHero fallbackSlides={homeSlides} ngo="transport" scopedRoutes={false} />

        <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <section className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="transport-tag">Six Areas</span>
                <h2 className="mt-4 text-5xl text-white sm:text-6xl">Where the cohort grows business and infrastructure</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-white/68">
                Each area is a delivery lane for partner businesses and a portfolio lane for community members, students, faculty, and entrepreneurs.
              </p>
            </div>
            <AreaRail areas={transportAreas} />
          </section>

          <PartnerProposition />
          <CohortHowItWorks />

          <section className="space-y-5">
            <div>
              <span className="transport-tag">Institutional Partners</span>
              <h2 className="mt-4 text-5xl text-white sm:text-6xl">UWM and MATC are embedded in the delivery model</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {institutionalPartners.map((partner) => (
                <article key={partner.id} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-amber">{partner.id}</p>
                  <h3 className="mt-3 text-4xl text-white">{partner.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/72">{partner.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="transport-tag">Get Involved</span>
                <h2 className="mt-4 text-5xl text-white sm:text-6xl">Choose the role that matches your next move</h2>
              </div>
              <Link href={resolvePortalPath('/viewer', 'transport')} className="btn-secondary">
                Open Cinematic Viewer
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {transportRoles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
