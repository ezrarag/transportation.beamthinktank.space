'use client'

import Link from 'next/link'
import TransportHeader from '@/components/transport/TransportHeader'
import { useUserRole } from '@/lib/hooks/useUserRole'

export default function StudioPage() {
  const { user } = useUserRole()

  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171a20] to-[#0a0c10] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">Studio</p>
          <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl">Transport workspace continuation</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/76">
            The studio is where partner operations, cohort delivery, logistics tracking, and project documentation continue after onboarding.
          </p>
          <p className="mt-4 text-sm text-white/64">{user ? `Signed in as ${user.email}` : 'Sign in to access BEAM workspace tools and protected routes.'}</p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: 'Partner Workspace', href: '/viewer/partner/milwaukee-auto-parts' },
            { title: 'Cohort Dashboard', href: '/viewer/student/eric' },
            { title: 'Faculty Dashboard', href: '/viewer/instructor/uwm-mobility-lab' },
            { title: 'Admin Console', href: '/admin' },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-transport-amber">
              <h2 className="text-3xl text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-white/68">Open this transport workspace lane.</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
