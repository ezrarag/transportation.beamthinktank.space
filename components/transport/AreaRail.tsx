'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { TransportArea } from '@/lib/transport/types'

type Props = {
  areas: TransportArea[]
  basePath?: string
}

export default function AreaRail({ areas, basePath = '/viewer' }: Props) {
  return (
    <div className="overflow-x-auto pb-3">
      <div className="flex min-w-max gap-4">
        {areas.map((area, index) => (
          <motion.div
            key={area.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.32, delay: index * 0.04 }}
            whileHover={{ y: -8 }}
            className="w-[290px] shrink-0"
          >
            <Link
              href={`${basePath}?area=${area.slug}`}
              className="block rounded-[28px] border border-white/10 bg-gradient-to-br from-transport-steel to-[#111419] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.28)] transition hover:border-transport-amber/55"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-3xl">{area.icon}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-signal">{area.shortTitle}</span>
              </div>
              <h3 className="mt-6 text-3xl text-white">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">{area.tagline}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
