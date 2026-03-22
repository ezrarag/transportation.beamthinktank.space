'use client'

import Link from 'next/link'
import { Suspense } from 'react'

type DashboardAction = {
  title: string
  subtitle: string
}

type DashboardContext = {
  title: string
  seriesLabel: string
  locationLabel: string
  institutionLabel: string
  summary: string
}

type RoleDashboardPageProps = {
  mode: 'student' | 'instructor' | 'partner'
  title: string
  badgeLabel: string
  actionTiles: DashboardAction[]
  context: DashboardContext
}

function RoleDashboardPageContent({ title, badgeLabel, actionTiles, context }: RoleDashboardPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080B] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(212,175,55,0.16),transparent_42%),radial-gradient(circle_at_82%_26%,rgba(68,110,150,0.24),transparent_36%),linear-gradient(135deg,rgba(9,10,15,0.92),rgba(8,10,18,0.9))]" />

      <div className="relative z-10 px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">BEAM Viewer</p>
                <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/14 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F2D48D]">
                  {badgeLabel}
                </span>
                <Link
                  href="/viewer"
                  className="inline-flex items-center rounded-full border border-white/30 bg-black/35 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#D4AF37] hover:text-[#F5D37A]"
                >
                  Back to Viewer
                </Link>
              </div>
            </div>
          </header>

          <section className="rounded-2xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.14em] text-[#F5D37A]">Mission Header</p>
            <h2 className="mt-2 text-3xl font-semibold">{context.title}</h2>
            <p className="mt-2 text-sm text-white/80">{context.summary}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm">Series: {context.seriesLabel}</div>
              <div className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm">Location: {context.locationLabel}</div>
              <div className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm">Institution: {context.institutionLabel}</div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.12em] text-white/60">Delivery Snapshot</p>
              <p className="mt-2 text-2xl font-semibold">Live Workstream</p>
              <p className="mt-1 text-sm text-white/70">Status: in motion</p>
              <p className="mt-1 text-sm text-white/70">Context: transport cohort delivery</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl md:col-span-2">
              <p className="text-xs uppercase tracking-[0.12em] text-white/60">Action Tiles</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {actionTiles.map((tile) => (
                  <button
                    key={tile.title}
                    type="button"
                    className="rounded-xl border border-white/20 bg-black/35 px-4 py-3 text-left transition hover:border-[#D4AF37]"
                  >
                    <span className="block text-sm font-semibold text-white">{tile.title}</span>
                    <span className="mt-1 block text-xs text-white/65">{tile.subtitle}</span>
                  </button>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  )
}

export function RoleDashboardPage(props: RoleDashboardPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
          <p className="text-sm uppercase tracking-[0.18em] text-white/70">Loading Dashboard...</p>
        </div>
      }
    >
      <RoleDashboardPageContent {...props} />
    </Suspense>
  )
}
