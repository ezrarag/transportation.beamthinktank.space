'use client'

import { FormEvent, useMemo, useState } from 'react'
import { transportAreas } from '@/lib/transport/areas'

type Props = {
  defaultRole?: string      // RAG role id e.g. "transport-bridge"
  ragRoleTitle?: string     // human-readable title e.g. "Transportation Bridge Lead"
  ragTrack?: string         // "transport" | "hybrid" | "business"
  fromRag?: boolean         // true when arriving from readyaimgo.biz
}

// Map RAG role IDs to participant-type labels for the dropdown
const RAG_ROLE_TO_TYPE: Record<string, string> = {
  'transport-bridge': 'community member',
  'ops-dispatcher':   'community member',
  'intake-guide':     'community member',
  'story-producer':   'community member',
  'partner-builder':  'entrepreneur',
  'systems-operator': 'UWM student',
}

export default function CohortEnrollForm({
  defaultRole = '',
  ragRoleTitle = '',
  ragTrack = '',
  fromRag = false,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  // Pre-select participant type from RAG role id, fall back to community member
  const defaultParticipantType = useMemo(() => {
    if (!defaultRole) return 'community member'
    return RAG_ROLE_TO_TYPE[defaultRole] ?? 'community member'
  }, [defaultRole])

  const toggleArea = (value: string) =>
    setSelectedAreas((cur) =>
      cur.includes(value) ? cur.filter((a) => a !== value) : [...cur, value]
    )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const payload = {
      name:             String(formData.get('name') || ''),
      email:            String(formData.get('email') || ''),
      phone:            String(formData.get('phone') || ''),
      participantType:  String(formData.get('participantType') || ''),
      institution:      String(formData.get('institution') || ''),
      availability:     String(formData.get('availability') || ''),
      interests:        selectedAreas,
      story:            String(formData.get('story') || ''),
      // RAG context — stored in Firestore for admin matching
      ragRoleId:        defaultRole,
      ragRoleTitle:     ragRoleTitle,
      ragTrack:         ragTrack,
      fromRag:          fromRag,
    }

    try {
      const response = await fetch('/api/transport/cohort-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to submit cohort enrollment.')
      }

      setSubmitted(true)
      event.currentTarget.reset()
      setSelectedAreas([])
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to submit cohort enrollment.'
      )
    } finally {
      setLoading(false)
    }
  }

  // ─── Success state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="rounded-[28px] border border-transport-signal/30 bg-transport-signal/5 p-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">
          Enrollment submitted
        </p>
        <h2 className="mt-3 text-4xl text-white">You&apos;re in the queue</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/60">
          BEAM will review your enrollment and follow up within 48 hours with your cohort
          assignment, co-requisite course pathway (if applicable), and first work session details.
        </p>
        {fromRag && ragRoleTitle && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-transport-signal/60">
            Applied role: {ragRoleTitle}
          </p>
        )}
        <a
          href="/cohort"
          className="btn-secondary mt-6 inline-flex"
        >
          ← Back to Cohort
        </a>
      </div>
    )
  }

  // ─── Form ───────────────────────────────────────────────────────────────────
  return (
    <form
      id="cohort-enroll-form"
      onSubmit={handleSubmit}
      className="space-y-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
    >
      {/* RAG role confirmation banner */}
      {fromRag && ragRoleTitle && (
        <div className="rounded-[16px] border border-transport-signal/25 bg-transport-signal/5 px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-transport-signal">
            Selected role from ReadyAimGo
          </p>
          <p className="mt-1 text-lg font-medium text-white">{ragRoleTitle}</p>
          {ragTrack && (
            <p className="mt-0.5 font-mono text-[10px] text-white/40 capitalize">
              {ragTrack} track
            </p>
          )}
          <a
            href="/cohort"
            className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-transport-signal/60 underline underline-offset-2 hover:text-transport-signal"
          >
            Choose a different role
          </a>
        </div>
      )}

      {/* Personal info */}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/70">
          <span>Name</span>
          <input
            name="name"
            required
            placeholder="Marcus Johnson"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-transport-signal"
          />
        </label>
        <label className="space-y-2 text-sm text-white/70">
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-transport-signal"
          />
        </label>
        <label className="space-y-2 text-sm text-white/70">
          <span>Phone</span>
          <input
            name="phone"
            required
            placeholder="(414) 000-0000"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-transport-signal"
          />
        </label>

        {/* Participant type — pre-selected from RAG role */}
        <label className="space-y-2 text-sm text-white/70">
          <span>I am a...</span>
          <select
            name="participantType"
            defaultValue={defaultParticipantType}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-signal"
          >
            <option value="community member">Community member</option>
            <option value="UWM student">UWM student</option>
            <option value="MATC student">MATC student</option>
            <option value="faculty">Faculty / Professor</option>
            <option value="entrepreneur">Entrepreneur</option>
          </select>
        </label>

        <label className="space-y-2 text-sm text-white/70 md:col-span-2">
          <span>Institution and program (if applicable)</span>
          <input
            name="institution"
            placeholder="UWM — Mechanical Engineering / MATC — Automotive Technology"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-transport-signal"
          />
        </label>
      </div>

      {/* Transport area interests */}
      <fieldset className="space-y-3">
        <legend className="text-sm text-white/70">
          Which BEAM Transportation areas interest you?
        </legend>
        <div className="flex flex-wrap gap-2">
          {transportAreas.map((area) => (
            <button
              key={area.slug}
              type="button"
              onClick={() => toggleArea(area.slug)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedAreas.includes(area.slug)
                  ? 'border-transport-signal bg-transport-signal text-black'
                  : 'border-white/10 bg-black/20 text-white/65 hover:border-white/20 hover:text-white/85'
              }`}
            >
              {area.icon} {area.title}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Availability */}
      <label className="space-y-2 text-sm text-white/70">
        <span>Availability (hours per week)</span>
        <input
          name="availability"
          required
          placeholder="8–10 hours/week, Tuesdays and Thursdays"
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-transport-signal"
        />
      </label>

      {/* Story */}
      <label className="space-y-2 text-sm text-white/70">
        <span>Tell us about yourself and what you want to build</span>
        <textarea
          name="story"
          rows={5}
          required
          placeholder="I want to learn vehicle maintenance, build my portfolio, and eventually start my own business in..."
          className="w-full rounded-[24px] border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-transport-signal"
        />
      </label>

      {/* Compensation framing — honest, inline */}
      <div className="rounded-[16px] border border-white/[0.07] bg-black/20 px-5 py-4 text-[12px] leading-6 text-white/45">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 mb-2">
          About compensation
        </p>
        BEAM is early stage. Right now participation earns you documented work, references,
        and credentials. As client contracts like the ReadyAimGo fleet maintenance agreement
        generate revenue, 20% goes into a cohort pool distributed to active participants.
        We will be explicit about this in your onboarding.
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Submitting...' : 'Submit Cohort Enrollment →'}
      </button>

      {error ? (
        <p className="text-sm text-red-300">{error}</p>
      ) : null}
    </form>
  )
}
