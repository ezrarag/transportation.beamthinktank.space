'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types mirrored from RAG lib/beam-participants.ts ────────────────────────

type ParticipantRoleTrack = 'business' | 'hybrid' | 'transport'
type ParticipantRoleDemand = 'high' | 'medium' | 'baseline'

type RagRole = {
  id: string
  title: string
  lane: string
  track: ParticipantRoleTrack
  focus: string
  responsibilities: string[]
  transportAreas: string[]
  pathways: string[]
  defaultSignals: string[]
  demand?: ParticipantRoleDemand
  demandLabel?: string
  whyNow?: string[]
  pulseMentions?: number
}

type ApiResponse = {
  roles: RagRole[]
  count: number
  source: string
}

// ─── Demand badge styles ──────────────────────────────────────────────────────

const DEMAND_STYLES: Record<string, string> = {
  high:     'border-transport-signal/50 bg-transport-signal/10 text-transport-signal',
  medium:   'border-transport-amber/50 bg-transport-amber/10 text-transport-amber',
  baseline: 'border-white/15 bg-white/5 text-white/55',
}

const TRACK_STYLES: Record<string, string> = {
  transport: 'border-orange-400/40 bg-orange-400/10 text-orange-300',
  hybrid:    'border-purple-400/40 bg-purple-400/10 text-purple-300',
  business:  'border-blue-400/40 bg-blue-400/10 text-blue-300',
}

const TRACK_FILTERS = ['All', 'Transport', 'Business', 'Hybrid'] as const
type TrackFilter = typeof TRACK_FILTERS[number]

// ─── Component ────────────────────────────────────────────────────────────────

export default function CohortRoleBrowser() {
  const [roles, setRoles] = useState<RagRole[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<TrackFilter>('All')

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://readyaimgo.biz/api/beam/roles', { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`RAG API returned ${res.status}`)
        const data: ApiResponse = await res.json()
        setRoles(data.roles ?? [])
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Could not load live roles from ReadyAimGo. Showing role categories instead.')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const filtered = roles.filter((r) => {
    if (activeFilter === 'All') return true
    return r.track.toLowerCase() === activeFilter.toLowerCase()
  })

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-[28px] border border-white/10 bg-white/[0.03]"
          />
        ))}
      </div>
    )
  }

  if (error || roles.length === 0) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-8 py-12 text-center">
        <p className="text-sm text-white/45">
          {error ?? 'No roles available right now.'}
        </p>
        <p className="mt-2 text-sm text-white/30">
          Browse all roles directly on{' '}
          <a
            href="https://readyaimgo.biz/beam-participants"
            target="_blank"
            rel="noreferrer"
            className="text-transport-signal underline underline-offset-2"
          >
            readyaimgo.biz/beam-participants ↗
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {TRACK_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition ${
                activeFilter === f
                  ? 'border-transport-amber bg-transport-amber/15 text-transport-amber'
                  : 'border-white/15 bg-white/[0.03] text-white/50 hover:border-white/30 hover:text-white/75'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <a
          href="https://readyaimgo.biz/beam-participants"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-transport-signal hover:underline"
        >
          Full role browser on RAG ↗
        </a>
      </div>

      {/* Role cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((role, i) => (
            <RoleCard key={role.id} role={role} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function RoleCard({ role, index }: { role: RagRole; index: number }) {
  const demand = role.demand ?? 'baseline'
  const demandLabel = role.demandLabel ?? 'Standing need'
  const signals = role.whyNow ?? role.defaultSignals ?? []

  const enrollUrl = `/cohort/enroll?role=${encodeURIComponent(role.id)}&from=rag&track=${role.track}&title=${encodeURIComponent(role.title)}`

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      className="flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-transport-steel to-[#0f1115]"
    >
      {/* Card header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              {role.lane}
            </p>
            <h3 className="mt-1 text-2xl leading-tight text-white">{role.title}</h3>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${DEMAND_STYLES[demand]}`}
            >
              {demandLabel}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${TRACK_STYLES[role.track]}`}
            >
              {role.track}
            </span>
          </div>
        </div>
      </div>

      {/* Focus */}
      <div className="px-5 pt-3">
        <p className="text-[13px] leading-6 text-white/65">{role.focus}</p>
      </div>

      {/* Responsibilities */}
      <div className="mt-3 space-y-1.5 px-5">
        {role.responsibilities.slice(0, 2).map((r) => (
          <div
            key={r}
            className="rounded-[12px] border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[12px] text-white/65"
          >
            {r}
          </div>
        ))}
      </div>

      {/* Pulse signals */}
      {signals.length > 0 && (
        <div className="mx-5 mt-3 rounded-[14px] border border-white/[0.07] bg-black/20 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            Why now
          </p>
          <ul className="mt-2 space-y-1.5">
            {signals.slice(0, 2).map((s) => (
              <li key={s} className="flex gap-2 text-[12px] text-white/60">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-transport-signal" />
                <span className="line-clamp-2">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Transport areas */}
      <div className="mt-3 flex flex-wrap gap-1.5 px-5">
        {role.transportAreas.map((area) => (
          <span
            key={area}
            className="rounded-[8px] border border-transport-amber/25 bg-transport-amber/8 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-transport-amber/70"
          >
            {area}
          </span>
        ))}
      </div>

      {/* Pathways */}
      <div className="mt-2 flex flex-wrap gap-1.5 px-5">
        {role.pathways.map((p) => (
          <span
            key={p}
            className="rounded-[8px] border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/40"
          >
            {p}
          </span>
        ))}
      </div>

      {/* Apply CTA */}
      <div className="mt-auto p-5 pt-4">
        <Link
          href={enrollUrl}
          className="flex w-full items-center justify-between rounded-[16px] border border-transport-signal/30 bg-transport-signal/8 px-4 py-3 transition hover:bg-transport-signal/15"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-signal">
            Apply for this role
          </span>
          <span className="text-transport-signal">→</span>
        </Link>
      </div>
    </motion.article>
  )
}
