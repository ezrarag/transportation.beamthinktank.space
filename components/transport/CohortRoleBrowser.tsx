'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types matching RAG lib/roles.ts BeamRole ────────────────────────────────

type RoleTrack = 'apprentice' | 'technician' | 'cohort_lead'
type RoleStatus = 'open' | 'forming' | 'filled' | 'closed' | 'draft'

type BeamRole = {
  id: string
  title: string
  description: string
  responsibilities: string[]
  skillsRequired: string[]
  skillsPreferred: string[]
  track: RoleTrack
  city: string
  hoursPerWeek: number
  durationWeeks: number
  status: RoleStatus
  beamVisible: boolean
  vehicleTypes?: string[]
  openSlots: number
  filledSlots: number
  compensation: {
    model: 'stipend' | 'hourly' | 'revenue_share'
    amountCents: number
    currency: string
    notes?: string
  }
  publishedAt?: string
}

// ─── Fallback roles shown when API is unreachable ─────────────────────────────

const FALLBACK_ROLES: BeamRole[] = [
  {
    id: 'fallback-1',
    title: 'Fleet Technician Apprentice',
    description: 'Hands-on vehicle maintenance on ReadyAimGo fleet. Weekly inspections, fluid checks, tire monitoring, and diagnostic scans under BEAM supervision.',
    responsibilities: ['Weekly vehicle inspections', 'Log service records in BEAM system', 'Shadow lead technician on repair tasks'],
    skillsRequired: ['Basic automotive interest', 'Reliable transportation', 'Smartphone'],
    skillsPreferred: ['UWM or MATC enrollment', 'Prior shop experience'],
    track: 'apprentice',
    city: 'Milwaukee',
    hoursPerWeek: 10,
    durationWeeks: 16,
    status: 'open',
    beamVisible: true,
    vehicleTypes: ['suv', 'box_truck'],
    openSlots: 4,
    filledSlots: 0,
    compensation: { model: 'hourly', amountCents: 1400, currency: 'USD', notes: 'Funded by RAG fleet service contract' },
  },
  {
    id: 'fallback-2',
    title: 'Lead Fleet Technician',
    description: 'Lead weekly maintenance sessions on the RAG vehicle fleet. Supervise apprentice cohort members and deliver monthly fleet health reports.',
    responsibilities: ['Run weekly service sessions', 'Supervise 2–4 apprentices', 'Compile monthly fleet health report'],
    skillsRequired: ['ASE certification or equivalent', 'Valid driver license', '2+ years shop experience'],
    skillsPreferred: ['Fleet maintenance background'],
    track: 'technician',
    city: 'Milwaukee',
    hoursPerWeek: 20,
    durationWeeks: 26,
    status: 'open',
    beamVisible: true,
    vehicleTypes: ['suv', 'box_truck'],
    openSlots: 2,
    filledSlots: 0,
    compensation: { model: 'hourly', amountCents: 2200, currency: 'USD', notes: '$22/hr + performance bonus' },
  },
  {
    id: 'fallback-3',
    title: 'Cohort Lead — Milwaukee Fleet',
    description: 'Manage day-to-day operations of the BEAM Transportation Milwaukee cohort. Own scheduling, coordinate with RAG, and represent BEAM at client meetings.',
    responsibilities: ['Own weekly service schedule', 'Manage cohort assignments', 'Represent BEAM in RAG meetings'],
    skillsRequired: ['Strong organizational skills', 'Prior team leadership', 'Automotive background'],
    skillsPreferred: ['NGO or workforce development experience'],
    track: 'cohort_lead',
    city: 'Milwaukee',
    hoursPerWeek: 30,
    durationWeeks: 52,
    status: 'forming',
    beamVisible: true,
    vehicleTypes: ['suv', 'box_truck', 'van'],
    openSlots: 1,
    filledSlots: 0,
    compensation: { model: 'stipend', amountCents: 160000, currency: 'USD', notes: 'Path to full-time at 12 months' },
  },
]

// ─── Style maps ───────────────────────────────────────────────────────────────

const TRACK_STYLES: Record<RoleTrack, string> = {
  apprentice:  'border-transport-signal/50 bg-transport-signal/10 text-transport-signal',
  technician:  'border-transport-amber/50 bg-transport-amber/10 text-transport-amber',
  cohort_lead: 'border-purple-400/40 bg-purple-400/10 text-purple-300',
}

const TRACK_LABELS: Record<RoleTrack, string> = {
  apprentice:  'Apprentice',
  technician:  'Technician',
  cohort_lead: 'Cohort Lead',
}

const STATUS_STYLES: Record<string, string> = {
  open:    'border-transport-signal/50 bg-transport-signal/10 text-transport-signal',
  forming: 'border-transport-amber/50 bg-transport-amber/10 text-transport-amber',
  filled:  'border-white/15 bg-white/5 text-white/40',
}

const TRACK_FILTERS = ['All', 'Apprentice', 'Technician', 'Cohort Lead'] as const
type TrackFilter = typeof TRACK_FILTERS[number]

function formatComp(comp: BeamRole['compensation']): string {
  const amount = (comp.amountCents / 100).toLocaleString('en-US', {
    style: 'currency', currency: comp.currency, minimumFractionDigits: 0,
  })
  return comp.model === 'stipend' ? `${amount}/mo` : `${amount}/hr`
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CohortRoleBrowser() {
  const [roles, setRoles] = useState<BeamRole[]>([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [activeFilter, setActiveFilter] = useState<TrackFilter>('All')

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://www.readyaimgo.biz/api/roles?beamVisible=true', {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`RAG API ${res.status}`)
        const data = await res.json()
        const live: BeamRole[] = Array.isArray(data.roles) ? data.roles : []
        if (live.length === 0) {
          setRoles(FALLBACK_ROLES)
          setUsingFallback(true)
        } else {
          setRoles(live)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setRoles(FALLBACK_ROLES)
          setUsingFallback(true)
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const filtered = roles.filter((r) => {
    if (activeFilter === 'All') return true
    return TRACK_LABELS[r.track] === activeFilter
  })

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-[28px] border border-white/10 bg-white/[0.03]"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Fallback notice */}
      {usingFallback && (
        <div className="rounded-[16px] border border-transport-amber/20 bg-transport-amber/5 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-transport-amber/70">
            Showing preview roles · Live roles load once RAG roles are seeded
          </p>
        </div>
      )}

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
          href="https://www.readyaimgo.biz/beam-participants"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-transport-signal hover:underline"
        >
          All RAG roles ↗
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

      {filtered.length === 0 && (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-8 py-12 text-center">
          <p className="text-sm text-white/45">No roles match this filter right now.</p>
        </div>
      )}
    </div>
  )
}

function RoleCard({ role, index }: { role: BeamRole; index: number }) {
  const isFilled = role.status === 'filled'
  const slotsLeft = role.openSlots - role.filledSlots
  const enrollUrl = `/cohort/enroll?roleId=${encodeURIComponent(role.id)}&roleTitle=${encodeURIComponent(role.title)}&track=${role.track}&city=${encodeURIComponent(role.city)}`

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      className={`flex flex-col overflow-hidden rounded-[28px] border bg-gradient-to-br from-transport-steel to-[#0f1115] transition ${
        isFilled ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              {role.city} · {role.hoursPerWeek}hrs/wk · {role.durationWeeks} wks
            </p>
            <h3 className="mt-1 text-2xl leading-tight text-white">{role.title}</h3>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${STATUS_STYLES[role.status] ?? STATUS_STYLES.open}`}>
              {role.status === 'forming' ? 'Forming now' : role.status}
            </span>
            <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${TRACK_STYLES[role.track]}`}>
              {TRACK_LABELS[role.track]}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pt-3">
        <p className="text-[13px] leading-6 text-white/65 line-clamp-2">{role.description}</p>
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

      {/* Compensation + slots */}
      <div className="mx-5 mt-3 rounded-[14px] border border-white/[0.07] bg-black/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">Compensation</p>
            <p className="mt-1 text-[15px] font-medium text-white">{formatComp(role.compensation)}</p>
            {role.compensation.notes && (
              <p className="mt-0.5 text-[11px] text-white/40">{role.compensation.notes}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">Slots</p>
            <p className={`mt-1 text-[15px] font-medium ${slotsLeft > 0 ? 'text-transport-signal' : 'text-white/30'}`}>
              {slotsLeft} open
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle types */}
      {role.vehicleTypes && role.vehicleTypes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 px-5">
          {role.vehicleTypes.map((v) => (
            <span
              key={v}
              className="rounded-[8px] border border-transport-amber/25 bg-transport-amber/8 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-transport-amber/70"
            >
              {v.replace('_', ' ')}
            </span>
          ))}
        </div>
      )}

      {/* Apply CTA */}
      <div className="mt-auto p-5 pt-4">
        {isFilled ? (
          <div className="flex w-full items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
              Position Filled
            </span>
          </div>
        ) : (
          <Link
            href={enrollUrl}
            className="flex w-full items-center justify-between rounded-[16px] border border-transport-signal/30 bg-transport-signal/8 px-4 py-3 transition hover:bg-transport-signal/15"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-signal">
              Apply for this role
            </span>
            <span className="text-transport-signal">→</span>
          </Link>
        )}
      </div>
    </motion.article>
  )
}
