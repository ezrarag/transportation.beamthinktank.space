import type { Metadata } from 'next'
import TransportHeader from '@/components/transport/TransportHeader'
import FleetGallery from '@/components/transport/FleetGallery'

export const metadata: Metadata = {
  title: 'Fleet & Wishlist — BEAM Transportation',
  description:
    'Every vehicle ReadyAimGo operates, plans to acquire, or is restoring through the BEAM cohort.',
}

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <span className="transport-tag">ReadyAimGo × BEAM Transportation</span>
          <h1 className="mt-4 text-6xl text-white sm:text-7xl lg:text-8xl">
            Fleet &amp; Wishlist
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Every vehicle ReadyAimGo operates, plans to acquire, or is restoring through
            the BEAM cohort. RAG is BEAM Transportation&apos;s first fleet client — cohort
            participants maintain these vehicles on a weekly schedule and every service
            session becomes a portfolio entry.
          </p>
        </section>

        <FleetGallery />
      </main>
    </div>
  )
}
