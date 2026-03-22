'use client'

import { FormEvent, useMemo, useState } from 'react'
import { partnershipStyles } from '@/lib/transport/partners'

const needOptions = ['sales expansion', 'R&D support', 'staffing', 'logistics', 'other']

type Props = {
  defaultTier?: string
}

export default function PartnerApplicationForm({ defaultTier = '' }: Props) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])

  const initialStyle = useMemo(() => partnershipStyles.find((style) => style.id === defaultTier)?.id ?? 'guided', [defaultTier])
  const [preferredStyle, setPreferredStyle] = useState(initialStyle)

  const toggleNeed = (value: string) => {
    setSelectedNeeds((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const payload = {
      businessName: String(formData.get('businessName') || ''),
      ownerName: String(formData.get('ownerName') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      businessType: String(formData.get('businessType') || ''),
      neighborhood: String(formData.get('neighborhood') || ''),
      needs: selectedNeeds,
      preferredStyle,
      heardFrom: String(formData.get('heardFrom') || ''),
      tierInterest: String(formData.get('tierInterest') || ''),
      story: String(formData.get('story') || ''),
    }

    try {
      const response = await fetch('/api/transport/partner-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to submit partner application.')
      }

      setMessage('Application submitted. BEAM will follow up with next steps and MOU planning.')
      event.currentTarget.reset()
      setSelectedNeeds([])
      setPreferredStyle(initialStyle)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to submit partner application.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      id="partner-application-form"
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/76">
          <span>Business name</span>
          <input name="businessName" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber" />
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>Owner name</span>
          <input name="ownerName" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber" />
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>Email</span>
          <input type="email" name="email" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber" />
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>Phone</span>
          <input name="phone" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber" />
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>Business type</span>
          <select name="businessType" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber">
            <option value="">Select one</option>
            <option value="auto parts">Auto parts</option>
            <option value="repair shop">Repair shop</option>
            <option value="fabrication">Fabrication</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>Milwaukee neighborhood / address</span>
          <input name="neighborhood" required className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber" />
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>Tier interest</span>
          <select name="tierInterest" defaultValue={defaultTier} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber">
            <option value="">Select one</option>
            <option value="starter">Cohort Access</option>
            <option value="growth">Expansion Partner</option>
            <option value="anchor">Anchor Partner</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-white/76">
          <span>How did you hear about BEAM?</span>
          <input name="heardFrom" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber" />
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm text-white/76">What do you need most?</legend>
        <div className="flex flex-wrap gap-2">
          {needOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleNeed(option)}
              className={`rounded-full border px-4 py-2 text-sm capitalize transition ${
                selectedNeeds.includes(option)
                  ? 'border-transport-amber bg-transport-amber text-black'
                  : 'border-white/10 bg-black/20 text-white/76 hover:border-white/20'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="space-y-2 text-sm text-white/76">
        <span>Preferred partnership style</span>
        <select
          value={preferredStyle}
          onChange={(event) => setPreferredStyle(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber"
        >
          {partnershipStyles.map((style) => (
            <option key={style.id} value={style.id}>
              {style.title}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-white/76">
        <span>Tell us about your business and what you&apos;re building</span>
        <textarea
          name="story"
          rows={6}
          required
          className="w-full rounded-[24px] border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-transport-amber"
        />
      </label>

      <button type="submit" disabled={loading} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? 'Submitting...' : 'Submit Partnership Application'}
      </button>

      {message ? <p className="text-sm text-transport-signal">{message}</p> : null}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  )
}
