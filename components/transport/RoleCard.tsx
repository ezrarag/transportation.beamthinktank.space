import Link from 'next/link'
import type { TransportRole } from '@/lib/transport/types'

type Props = {
  role: TransportRole
}

export default function RoleCard({ role }: Props) {
  return (
    <Link href={role.ctaPath} className="block rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-transport-signal">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-transport-signal">{role.audienceLabel}</p>
      <h3 className="mt-3 text-3xl text-white">{role.title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/74">{role.summary}</p>
    </Link>
  )
}
