'use client'

import Link from 'next/link'
import UserMenu from '@/components/UserMenu'
import { resolvePortalPath } from '@/lib/portal/routes'

const navItems = [
  { label: 'Home', href: resolvePortalPath('/', 'transport') },
  { label: 'Viewer', href: resolvePortalPath('/viewer', 'transport') },
  { label: 'Partner', href: resolvePortalPath('/partner', 'transport') },
  { label: 'Cohort', href: resolvePortalPath('/cohort', 'transport') },
  { label: 'Studio', href: resolvePortalPath('/studio', 'transport') },
  { label: 'Admin', href: resolvePortalPath('/admin', 'transport') },
]

export default function TransportHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={resolvePortalPath('/', 'transport')} className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-transport-signal">transport.beamthinktank.space</p>
          <h1 className="text-2xl leading-none text-white sm:text-3xl">BEAM Transportation</h1>
        </Link>

        <nav className="hidden items-center gap-4 text-sm uppercase tracking-[0.16em] text-white/72 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-transport-amber">
              {item.label}
            </Link>
          ))}
        </nav>

        <UserMenu />
      </div>
    </header>
  )
}
