import type { Metadata } from 'next'
import Link from 'next/link'
import TransportHeader from '@/components/transport/TransportHeader'
import RoleCard from '@/components/transport/RoleCard'
import CohortRoleBrowser from '@/components/transport/CohortRoleBrowser'
import { transportRoles } from '@/lib/transport/areas'
import { whatYouEarn, compensationTiers } from '@/lib/transport/cohort'

export const metadata: Metadata = {
  title: 'Cohort — BEAM Transportation',
  description:
    'Join the BEAM Transportation cohort. Browse roles from ReadyAimGo, select what fits your skills and schedule, and enroll.',
}

export default function CohortLandingPage() {
  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#191d24] to-[#0d1014] p-6 sm:p-8 lg:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">
            Join the BEAM Cohort
          </p>
          <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl lg:text-8xl">
            Real work. Real credentials. Real Milwaukee.
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-white/72">
            BEAM Transportation cohort members work on live partner deliverables — fleet maintenance,
            logistics, sourcing, R&D, and builds. The roles below come directly from ReadyAimGo&apos;s
            live staffing needs. Pick the one that fits your skills and schedule, then enroll.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/cohort/enroll" className="btn-primary">
              Enroll Now
            </Link>
            <a
              href="https://readyaimgo.biz/beam-participants"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Browse All RAG Roles ↗
            </a>
          </div>
        </section>

        {/* Live role browser — fetches from RAG API */}
        <section className="space-y-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-signal">
                Live from ReadyAimGo
              </p>
              <h2 className="mt-3 text-5xl text-white sm:text-6xl">
                Open roles you can apply for today
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/55">
              Roles are sourced from ReadyAimGo&apos;s pulse feed. Demand levels reflect live
              business activity. Clicking a role pre-fills your enrollment form.
            </p>
          </div>
          <CohortRoleBrowser />
        </section>

        {/* BEAM participant types */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-signal">
              Who participates
            </p>
            <h2 className="mt-3 text-5xl text-white sm:text-6xl">
              Choose the path that matches your situation
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {transportRoles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </section>

        {/* Compensation — honest and specific */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-signal">
              Compensation
            </p>
            <h2 className="mt-3 text-5xl text-white sm:text-6xl">
              What you actually get — and when
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
              BEAM is early stage. We&apos;re honest about that. Here&apos;s exactly what participation
              looks like right now and what becomes available as client contracts generate revenue.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {compensationTiers.map((tier) => (
              <article
                key={tier.id}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 space-y-4"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-transport-amber">
                    {tier.stage}
                  </p>
                  <h3 className="mt-2 text-3xl text-white">{tier.name}</h3>
                  <p className="mt-1 text-sm text-white/55">{tier.who}</p>
                </div>
                <p className="text-sm leading-6 text-white/70">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.specifics.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-white/65">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-transport-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* What you earn */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-signal">
              What you earn
            </p>
            <h2 className="mt-3 text-5xl text-white sm:text-6xl">
              Credentials that move your CV forward
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {whatYouEarn.map((item) => (
              <article
                key={item}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/74"
              >
                {item}
              </article>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-[32px] border border-transport-amber/20 bg-transport-amber/5 p-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-amber">
            Ready to start?
          </p>
          <h2 className="mt-3 text-5xl text-white sm:text-6xl">
            Pick a role and enroll today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
            Enrollment takes under five minutes. BEAM will contact you within 48 hours to confirm
            your role fit, cohort assignment, and any co-requisite course pathway.
          </p>
          <Link href="/cohort/enroll" className="btn-primary mt-6 inline-flex">
            Start Enrollment →
          </Link>
        </section>

      </main>
    </div>
  )
}
