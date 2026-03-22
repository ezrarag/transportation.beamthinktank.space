import Link from 'next/link'
import { partnershipStyles } from '@/lib/transport/partners'
import { resolvePortalPath } from '@/lib/portal/routes'

export default function PartnerProposition() {
  return (
    <section className="transport-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
      <div className="absolute inset-0 transport-grid opacity-30" />
      <div className="absolute right-0 top-0 h-52 w-52 bg-[radial-gradient(circle_at_top_right,rgba(240,165,0,0.26),transparent_70%)]" />
      <div className="relative z-10">
        <span className="transport-tag">Anchor Partner Model</span>
        <h2 className="mt-4 text-5xl text-white sm:text-6xl">Your Business Deserves a Dedicated Team</h2>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-white/78">
          BEAM connects Milwaukee auto businesses with a cohort of trained community members and UWM/MATC students who work
          specifically on your behalf. Expand your sales reach, build a local sourcing network, get R&amp;D support, and grow in the
          directions you choose with clear agreements, flexible options, and no equity required.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {partnershipStyles.map((style) => (
            <article key={style.id} className="rounded-[24px] border border-white/10 bg-black/28 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-transport-signal">{style.id.replace('-', ' ')}</p>
              <h3 className="mt-3 text-3xl text-white">{style.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{style.description}</p>
            </article>
          ))}
        </div>

        <Link href={resolvePortalPath('/partner', 'transport')} className="btn-primary mt-8">
          Explore Partnership Options
        </Link>
      </div>
    </section>
  )
}
