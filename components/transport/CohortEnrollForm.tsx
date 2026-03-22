'use client'

import { FormEvent, useMemo, useState } from 'react'
import { transportAreas } from '@/lib/transport/areas'

type Props = {
  defaultRole?: string
}

export default function CohortEnrollForm({ defaultRole = '' }: Props) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  const normalizedRole = useMemo(() => defaultRole || 'community member', [defaultRole])

  const toggleArea = (value: string) => {
    setSelectedAreas((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      role: String(formData.get('role') || ''),
      institution: String(formData.get('institution') || ''),
      availability: String(formData.get('availability') || ''),
      interests: selectedAreas,
      story: String(formData.get('story') || ''),
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

      setMessage('Enrollment submitted. BEAM will contact you about next steps, cohort fit, and any co-requisite pathway.')
      event.currentTarget.reset()
      setSelectedAreas([])
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to submit cohort enrollment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      id="cohort-enroll-form"
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/76">
          <span>Name</span>
          <input name="name" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-signal" />
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>Email</span>
          <input type="email" name="email" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-signal" />
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>Phone</span>
          <input name="phone" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-signal" />
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>Role</span>
          <select name="role" defaultValue={normalizedRole} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-signal">
            <option value="community member">Community member</option>
            <option value="UWM student">UWM student</option>
            <option value="MATC student">MATC student</option>
            <option value="faculty">Faculty</option>
            <option value="entrepreneur">Entrepreneur</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-white/76 md:col-span-2">
          <span>Institution and program</span>
          <input name="institution" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-signal" />
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm text-white/76">Which areas interest you?</legend>
        <div className="flex flex-wrap gap-2">
          {transportAreas.map((area) => (
            <button
              key={area.slug}
              type="button"
              onClick={() => toggleArea(area.slug)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedAreas.includes(area.slug)
                  ? 'border-transport-signal bg-transport-signal text-black'
                  : 'border-white/10 bg-black/20 text-white/76 hover:border-white/20'
              }`}
            >
              {area.title}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="space-y-2 text-sm text-white/76">
        <span>Availability (hours/week)</span>
        <input name="availability" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-signal" />
      </label>

      <label className="space-y-2 text-sm text-white/76">
        <span>Tell us about yourself and what you want to build</span>
        <textarea
          name="story"
          rows={6}
          required
          className="w-full rounded-[24px] border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-signal"
        />
      </label>

      <button type="submit" disabled={loading} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? 'Submitting...' : 'Submit Cohort Enrollment'}
      </button>

      {message ? <p className="text-sm text-transport-signal">{message}</p> : null}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  )
}
