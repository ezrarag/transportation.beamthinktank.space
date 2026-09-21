'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Calendar, Clock, MapPin, Bus, User, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { submitTransitIncident } from '@/lib/services/truthDashboard'

const TIME_OF_DAY_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Night', 'Weekend']

const TRIP_TYPE_OPTIONS = [
  { id: 'work', label: 'Work / Job Interview' },
  { id: 'medical', label: 'Medical Appointment' },
  { id: 'school', label: 'School / Childcare' },
  { id: 'grocery', label: 'Grocery / Essential Errands' },
  { id: 'other', label: 'Other Crucial Trip' },
]

const DEMOGRAPHIC_OPTIONS = [
  'Student',
  'Elderly',
  'Disabled',
  'Unemployed',
  'Single parent',
  'Low-income household',
  'None of the above',
  'Prefer not to say',
]

const CITIES = [
  { id: 'leesburg-fl', label: 'Leesburg, FL (Lake County)' },
  { id: 'eustis-fl', label: 'Eustis, FL (Lake County)' },
  { id: 'clermont-fl', label: 'Clermont, FL (Lake County)' },
  { id: 'mount-dora-fl', label: 'Mount Dora, FL (Lake County)' },
]

export default function IncidentForm() {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [timeOfDay, setTimeOfDay] = useState('Morning')
  const [citySlug, setCitySlug] = useState('leesburg-fl')
  const [location, setLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [tripType, setTripType] = useState('work')
  const [consequence, setConsequence] = useState('')
  const [populationGroup, setPopulationGroup] = useState<string[]>([])
  const [wouldHaveUsedTransit, setWouldHaveUsedTransit] = useState<boolean>(true)
  const [submitterName, setSubmitterName] = useState('')
  const [submitterEmail, setSubmitterEmail] = useState('')
  const [notes, setNotes] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Compute day of week from date
  const computeDayOfWeek = (dateString: string) => {
    try {
      const parts = dateString.split('-')
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
        return d.toLocaleDateString('en-US', { weekday: 'long' })
      }
    } catch {
      // Fallback
    }
    return 'Weekday'
  }

  const dayOfWeek = computeDayOfWeek(date)

  const handleToggleDemographic = (item: string) => {
    setPopulationGroup((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const docId = await submitTransitIncident(citySlug, {
        submitterName: submitterName.trim() || null,
        submitterEmail: submitterEmail.trim() || null,
        date,
        time: timeOfDay,
        location,
        destination,
        consequence,
        populationGroup,
        tripType,
        dayOfWeek,
        timeOfDay,
        wouldHaveUsedTransit,
        notes,
        ipRegion: null,
      })
      setSubmittedId(docId)
    } catch (err: any) {
      console.error('Error submitting incident:', err)
      setError('Unable to record your submission. Please check your network and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header text */}
      <div className="space-y-3">
        <Link
          href={`/dashboard/${citySlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to {citySlug === 'leesburg-fl' ? 'Leesburg' : 'City'} Truth Dashboard</span>
        </Link>

        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-red-400">
            Public Evidence Intake
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Document a Transportation Gap
          </h1>
        </div>

        <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
          This is not an opinion survey. This is a record of real events. Your account becomes part of the public evidentiary ledger. Every verified submission can be cited directly in city hall hearings, county commission meetings, and federal transit grant applications.
        </p>
      </div>

      {submittedId ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border-2 border-transport-signal/40 bg-[#0E1715] p-8 sm:p-12 text-center space-y-6 shadow-2xl"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-transport-signal/20 text-transport-signal ring-8 ring-transport-signal/10">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-transport-signal font-bold uppercase tracking-wider block">
              Verified Public Record Entry
            </span>
            <h2 className="text-3xl font-extrabold text-white">Your Account Has Been Recorded</h2>
            <p className="text-sm text-white/70 max-w-lg mx-auto leading-relaxed pt-2">
              Submission Reference: <strong className="font-mono text-transport-amber">#{submittedId.slice(-6).toUpperCase()}</strong>.
            </p>
            <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
              Thank you for documenting this gap. If this account is selected for citation in a Lake County Board of Commissioners hearing or FTA grant filing, we will refer to your submission by this record ID.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/dashboard/${citySlug}`}
              className="px-8 py-3.5 rounded-full bg-transport-signal hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition"
            >
              Return to Truth Dashboard
            </Link>
            <button
              onClick={() => {
                setSubmittedId(null)
                setConsequence('')
                setLocation('')
                setDestination('')
              }}
              className="px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              Submit Another Incident
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-transport-steel/40 p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-xl">
          
          {/* SECTION 1: Time & Location */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-amber border-b border-white/10 pb-2">
              1. When and Where Did This Happen?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-transport-amber" /> Date of Incident *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none"
                />
              </div>

              {/* Day of Week Confirmation */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-white/50" /> Day of Week
                </label>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-xs font-mono text-transport-amber font-bold">
                  {dayOfWeek}
                </div>
              </div>

              {/* City Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-transport-signal" /> City / Territory
                </label>
                <select
                  value={citySlug}
                  onChange={(e) => setCitySlug(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/80 p-3 text-xs text-white focus:border-transport-signal focus:outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time of Day Radio */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-white block">Time of Day:</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {TIME_OF_DAY_OPTIONS.map((tod) => (
                  <button
                    key={tod}
                    type="button"
                    onClick={() => setTimeOfDay(tod)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-bold transition text-center ${
                      timeOfDay === tod
                        ? 'bg-transport-amber/20 border-transport-amber text-transport-amber'
                        : 'bg-black/40 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {tod}
                  </button>
                ))}
              </div>
            </div>

            {/* From / To Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white">Where were you trying to get FROM? *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. West Main St, South Leesburg, Pinebrooke Apt..."
                  className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none placeholder:text-white/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white">Where were you trying to get TO? *</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. UF Health Leesburg Hospital, Walmart, Job interview..."
                  className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none placeholder:text-white/30"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Trip Type & Consequence */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-amber border-b border-white/10 pb-2">
              2. Trip Purpose & Community Consequence
            </h3>

            {/* Trip Type Radio */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white block">What type of trip was this?</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {TRIP_TYPE_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTripType(t.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition ${
                      tripType === t.id
                        ? 'bg-transport-signal/15 border-transport-signal text-white font-bold'
                        : 'bg-black/40 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Consequence Textarea */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-red-400 block">
                What happened because you couldn&apos;t get there? *
              </label>
              <textarea
                required
                rows={4}
                value={consequence}
                onChange={(e) => setConsequence(e.target.value)}
                placeholder="I missed my job interview / I was late to my hospital shift / I couldn't get my child to school on time / I missed my specialist medical appointment because the bus does not run on weekends..."
                className="w-full rounded-2xl border border-white/15 bg-black/60 p-4 text-xs text-white placeholder:text-white/30 focus:border-red-400 focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* SECTION 3: Demographics & Transit Willingness */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-amber border-b border-white/10 pb-2">
              3. Community Background (Check all that apply)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DEMOGRAPHIC_OPTIONS.map((item) => {
                const isChecked = populationGroup.includes(item)
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleToggleDemographic(item)}
                    className={`p-3 rounded-xl border text-xs text-left transition ${
                      isChecked
                        ? 'bg-white/15 border-white text-white font-bold'
                        : 'bg-black/40 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                )
              })}
            </div>

            {/* Would have used transit */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-xs font-bold text-white">
                Would you have used public transit if reliable service were available?
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setWouldHaveUsedTransit(true)}
                  className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition ${
                    wouldHaveUsedTransit
                      ? 'bg-transport-signal text-black font-black'
                      : 'bg-white/5 border border-white/10 text-white/60'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setWouldHaveUsedTransit(false)}
                  className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition ${
                    !wouldHaveUsedTransit
                      ? 'bg-red-500 text-white font-black'
                      : 'bg-white/5 border border-white/10 text-white/60'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 4: Submitter Identity (Optional) */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-amber border-b border-white/10 pb-2">
              4. Contact Details (Optional — Can Submit Anonymously)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white">Your Name (Leave blank to remain anonymous)</label>
                <input
                  type="text"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  placeholder="Anonymous Resident"
                  className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white placeholder:text-white/30 focus:border-transport-signal focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white">Your Email (Only if willing to be cited in a hearing)</label>
                <input
                  type="email"
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  placeholder="resident@example.com"
                  className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white placeholder:text-white/30 focus:border-transport-signal focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-white">Additional Notes or Details (Optional)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific bus stop, time delay, or driver interaction details..."
                className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white placeholder:text-white/30 focus:border-transport-signal focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-xs font-mono text-red-400">{error}</p>}

          {/* Submit CTA */}
          <div className="pt-2 border-t border-white/10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-red-500 hover:bg-red-400 text-white font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-red-500/20 disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? 'Recording Public Record Entry...' : 'Submit Incident to Public Record'}</span>
            </button>
            <p className="text-[11px] text-white/40 text-center mt-2 font-mono">
              Submission will be assigned a permanent reference ID under Lake County transit public records.
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
