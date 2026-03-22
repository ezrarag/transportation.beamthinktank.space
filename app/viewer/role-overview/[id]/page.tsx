'use client'

import Link from 'next/link'
import { Suspense, useMemo } from 'react'
import { useParams } from 'next/navigation'
import TransportHeader from '@/components/transport/TransportHeader'
import { transportRoles } from '@/lib/transport/areas'

function RoleOverviewPageContent() {
  const params = useParams<{ id: string }>()
  const role = useMemo(() => transportRoles.find((item) => item.id === params.id) ?? transportRoles[0], [params.id])

  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#161a20] to-[#0b0d10] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">{role.heroLabel}</p>
          <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl">{role.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/76">{role.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={role.ctaPath} className="btn-primary">
              Continue This Path
            </Link>
            <Link href="/viewer" className="btn-secondary">
              Back to Viewer
            </Link>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-amber">What you do</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/76">
              {role.whatYouDo.map((item) => (
                <li key={item} className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-amber">Requirements</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/76">
              {role.requirements.map((item) => (
                <li key={item} className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-amber">What you gain</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/76">
              {role.whatYouGain.map((item) => (
                <li key={item} className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  )
}

export default function RoleOverviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
          <p className="text-sm uppercase tracking-[0.18em] text-white/70">Loading Role Overview...</p>
        </div>
      }
    >
      <RoleOverviewPageContent />
    </Suspense>
  )
}
