'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Bus, 
  User, 
  Mail, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Smartphone,
  MessageSquare,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { submitTransitIncident } from '@/lib/services/truthDashboard'
import AppleMessagesIncidentTrigger from './AppleMessagesIncidentTrigger'

const TIME_OF_DAY_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Night', 'Weekend']

const TRIP_TYPE_OPTIONS = [
  { id: 'work', label: 'Work / Job Interview', desc: 'Missed shifts or job jeopardy' },
  { id: 'medical', label: 'Medical Appointment', desc: 'Hospital visits or dialysis' },
  { id: 'school', label: 'School / Childcare', desc: 'Classes or child pickup' },
  { id: 'grocery', label: 'Grocery / Essential Errands', desc: 'Food desert access' },
  { id: 'other', label: 'Other Crucial Trip', desc: 'Family or community duty' },
]

const DEMOGRAPHIC_OPTIONS = [
  'Student',
  'Senior / Elderly (65+)',
  'Person with Disability',
  'Shift / Night Worker',
  'Single Parent',
  'Low-income Household',
  'Transit-dependent Commuter',
  'Prefer not to say',
]

const CITIES = [
  { id: 'leesburg-fl', label: 'Leesburg, FL (Lake County)' },
  { id: 'eustis-fl', label: 'Eustis, FL (Lake County)' },
  { id: 'clermont-fl', label: 'Clermont, FL (Lake County)' },
  { id: 'mount-dora-fl', label: 'Mount Dora, FL (Lake County)' },
]

interface Props {
  citySlug?: string
  embedMode?: boolean
  onSuccess?: (id: string) => void
}

export default function IncidentForm({ 
  citySlug: initialCity = 'leesburg-fl', 
  embedMode = false,
  onSuccess 
}: Props) {
  // Step state (1 to 4)
  const [step, setStep] = useState<number>(1)

  // Form Fields
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [timeOfDay, setTimeOfDay] = useState('Morning')
  const [citySlug, setCitySlug] = useState(initialCity)
  const [location, setLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [tripType, setTripType] = useState('work')
  const [consequence, setConsequence] = useState('')
  const [populationGroup, setPopulationGroup] = useState<string[]>([])
  const [wouldHaveUsedTransit, setWouldHaveUsedTransit] = useState<boolean>(true)
  const [submitterName, setSubmitterName] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
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
    } catch {}
    return 'Weekday'
  }

  const dayOfWeek = computeDayOfWeek(date)

  const handleToggleDemographic = (item: string) => {
    setPopulationGroup((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  // Step Validation
  const validateStep = (currentStep: number): boolean => {
    setError(null)
    if (currentStep === 1) {
      if (!location.trim()) {
        setError('Please enter where this incident occurred (street, bus stop, or landmark).')
        return false
      }
      if (!destination.trim()) {
        setError('Please enter where you were trying to travel to.')
        return false
      }
    } else if (currentStep === 3) {
      if (!consequence.trim()) {
        setError('Please provide a brief account of what happened and the impact (e.g. stranded, missed shift).')
        return false
      }
    }
    return true
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(4, prev + 1))
    }
  }

  const handlePrevStep = () => {
    setError(null)
    setStep((prev) => Math.max(1, prev - 1))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!validateStep(step)) return

    setError(null)
    setIsSubmitting(true)

    try {
      const finalName = isAnonymous ? 'Anonymous Resident' : submitterName.trim() || null
      const docId = await submitTransitIncident(citySlug, {
        submitterName: finalName,
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
      if (onSuccess) onSuccess(docId)
    } catch (err: any) {
      console.error('Error submitting incident:', err)
      setError('Unable to record your submission. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepTitles = [
    { num: 1, title: 'When & Where', desc: 'Location & time' },
    { num: 2, title: 'Transit Context', desc: 'Trip purpose' },
    { num: 3, title: 'What Happened', desc: 'Impact & delay' },
    { num: 4, title: 'Official Ledger', desc: 'Review & submit' },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 font-sans">
      {/* Header text (when not in compact embed mode) */}
      {!embedMode && (
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
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Document a Transportation Gap
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
            This is an evidentiary record of real events. Every verified submission can be cited directly in county commission hearings and federal transit grant applications.
          </p>
        </div>
      )}

      {/* SUCCESS SCREEN */}
      {submittedId ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border-2 border-transport-signal/40 bg-[#0E1715] p-6 sm:p-12 text-center space-y-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-transport-signal/20 text-transport-signal ring-8 ring-transport-signal/10">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-transport-signal font-bold uppercase tracking-wider block">
              Verified Public Record Entry
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Your Account Has Been Recorded</h2>
            <p className="text-sm text-white/70 max-w-lg mx-auto leading-relaxed pt-2">
              Submission Reference: <strong className="font-mono text-transport-amber">#{submittedId.slice(-6).toUpperCase()}</strong>
            </p>
            <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
              Thank you for documenting this gap. Your record is now permanently logged to the Lake County public evidentiary ledger.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/dashboard/${citySlug}`}
              className="px-8 py-3.5 rounded-full bg-transport-signal hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-transport-signal/20"
            >
              Return to Truth Dashboard
            </Link>
            <button
              type="button"
              onClick={() => {
                setSubmittedId(null)
                setStep(1)
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
        /* STEP-SEQUENCED FORM */
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#131722]/90 to-[#0A0D14]/95 p-5 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-8">
          
          {/* STEPPER HEADER & PROGRESS BAR */}
          <div className="space-y-4 border-b border-white/10 pb-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-red-400 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                  Step {step} of 4: {stepTitles[step - 1].title}
                </span>
              </div>
              <span className="text-white/40 text-[11px]">
                {Math.round((step / 4) * 100)}% Complete
              </span>
            </div>

            {/* Visual Step Indicator Bar */}
            <div className="grid grid-cols-4 gap-2">
              {stepTitles.map((s) => {
                const isCompleted = step > s.num
                const isCurrent = step === s.num
                return (
                  <div key={s.num} className="space-y-1">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-transport-signal'
                          : isCurrent
                          ? 'bg-transport-amber'
                          : 'bg-white/10'
                      }`}
                    />
                    <div className="hidden sm:block text-[9px] font-mono uppercase truncate text-white/40">
                      {s.num}. {s.title}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* STEP CONTENT PANELS WITH SMOOTH TRANSITION */}
          <AnimatePresence mode="wait">
            {/* STEP 1: WHEN & WHERE */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    When and where did this happen?
                  </h3>
                  <p className="text-xs text-white/60">
                    Pinpoint the route or corridor where LakeXpress or transit service failed you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City Selector */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-transport-amber" /> Operating Municipality
                    </label>
                    <select
                      value={citySlug}
                      onChange={(e) => setCitySlug(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none"
                    >
                      {CITIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

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

                  {/* Time of Day */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-transport-amber" /> Time of Day *
                    </label>
                    <select
                      value={timeOfDay}
                      onChange={(e) => setTimeOfDay(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none"
                    >
                      {TIME_OF_DAY_OPTIONS.map((tod) => (
                        <option key={tod} value={tod}>
                          {tod}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Origin */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-transport-amber" /> Where Were You Stranded / Waiting? *
                      </span>
                      <span className="text-[10px] text-white/40">Bus stop, street, or landmark</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Citizens Blvd & Main St / LakeXpress Route 1 stop"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none placeholder:text-white/30"
                    />
                  </div>

                  {/* Destination */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Bus className="h-3.5 w-3.5 text-transport-signal" /> Where Were You Trying to Go? *
                      </span>
                      <span className="text-[10px] text-white/40">Work, clinic, grocery, etc.</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UF Health Leesburg Hospital / Distribution Center shift"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: TRANSIT CONTEXT & PURPOSE */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Trip purpose & community context
                  </h3>
                  <p className="text-xs text-white/60">
                    What was at stake during this trip, and who was affected?
                  </p>
                </div>

                {/* Trip Type Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white">Purpose of This Trip *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TRIP_TYPE_OPTIONS.map((opt) => {
                      const isSelected = tripType === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setTripType(opt.id)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'bg-transport-amber/15 border-transport-amber text-white shadow-lg'
                              : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5'
                          }`}
                        >
                          <div className="text-xs font-bold text-white flex items-center justify-between">
                            <span>{opt.label}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-transport-amber" />}
                          </div>
                          <div className="text-[11px] text-white/50 mt-0.5">{opt.desc}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Would have used transit toggle */}
                <div className="p-4 rounded-2xl border border-white/10 bg-black/40 space-y-2">
                  <label className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Would you have taken public transit if an affordable, reliable option existed?</span>
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setWouldHaveUsedTransit(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        wouldHaveUsedTransit
                          ? 'bg-transport-signal text-black font-extrabold shadow-sm'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      Yes — 100%
                    </button>
                    <button
                      type="button"
                      onClick={() => setWouldHaveUsedTransit(false)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        !wouldHaveUsedTransit
                          ? 'bg-white/20 text-white font-extrabold'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      Uncertain / Dependent on price
                    </button>
                  </div>
                </div>

                {/* Demographics / Household Profile */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white">
                    Household & Rider Demographics (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DEMOGRAPHIC_OPTIONS.map((demo) => {
                      const isSelected = populationGroup.includes(demo)
                      return (
                        <button
                          key={demo}
                          type="button"
                          onClick={() => handleToggleDemographic(demo)}
                          className={`p-2.5 rounded-xl border text-xs text-left transition ${
                            isSelected
                              ? 'bg-transport-signal/20 border-transport-signal text-white font-bold'
                              : 'bg-black/40 border-white/10 text-white/60 hover:bg-white/5'
                          }`}
                        >
                          <span className="truncate block">{demo}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: WHAT HAPPENED & IMPACT */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    What happened?
                  </h3>
                  <p className="text-xs text-white/60">
                    Describe the specific incident and financial or life consequence.
                  </p>
                </div>

                {/* Primary consequence text */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400" /> Account of Incident & Consequence *
                    </span>
                    <span className="text-[10px] text-white/40">Be as specific as possible</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="e.g. LakeXpress Route 1 stopped running at 8:00 PM on Friday. I was scheduled until 9:30 PM. I had no way home and had to pay $42 for an Uber, which was half my earnings from that shift."
                    value={consequence}
                    onChange={(e) => setConsequence(e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-black/60 p-4 text-xs text-white focus:border-transport-signal focus:outline-none placeholder:text-white/30 leading-relaxed"
                  />
                </div>

                {/* Additional evidentiary notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Additional Notes (Optional)</span>
                    <span className="text-[10px] text-white/40">Bus number, stop condition, driver comments</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Other workers at the distribution center also struggle with the weekend schedule."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none placeholder:text-white/30"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUBMITTER RECORD & CONFIRMATION */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Submitter Verification & Review
                  </h3>
                  <p className="text-xs text-white/60">
                    Review your account before it is permanently sealed into the public evidence record.
                  </p>
                </div>

                {/* Submitter Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-transport-amber" /> Submitter Name
                      </span>
                      <span className="text-[10px] text-white/40">Optional</span>
                    </label>
                    <input
                      type="text"
                      disabled={isAnonymous}
                      placeholder={isAnonymous ? 'Anonymous Resident' : 'e.g. Marcus Johnson'}
                      value={submitterName}
                      onChange={(e) => setSubmitterName(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none placeholder:text-white/30 disabled:opacity-50"
                    />
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="anonymousCheck"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-white/20 bg-black/60 text-transport-signal"
                      />
                      <label htmlFor="anonymousCheck" className="text-[11px] text-white/60 cursor-pointer">
                        Record submission anonymously
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-transport-amber" /> Email Address
                      </span>
                      <span className="text-[10px] text-white/40">For record receipt</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. resident@gmail.com"
                      value={submitterEmail}
                      onChange={(e) => setSubmitterEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-transport-signal focus:outline-none placeholder:text-white/30"
                    />
                    <p className="text-[10px] text-white/40">
                      We never share or publish your email address.
                    </p>
                  </div>
                </div>

                {/* Review Summary Card */}
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2 text-xs">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-transport-amber font-bold">
                    Evidentiary Record Preview
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-white/70">
                    <div><strong>Date:</strong> {date} ({dayOfWeek})</div>
                    <div><strong>Time:</strong> {timeOfDay}</div>
                    <div className="col-span-2"><strong>Location:</strong> {location} → {destination}</div>
                    <div className="col-span-2"><strong>Trip:</strong> {tripType.toUpperCase()}</div>
                    <div className="col-span-2 bg-black/40 p-2.5 rounded-xl border border-white/5 text-white/80">
                      &quot;{consequence}&quot;
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-white/60">
                  <ShieldCheck className="w-4 h-4 text-transport-signal shrink-0 mt-0.5" />
                  <span>
                    By submitting, you certify this account is truthful to the best of your knowledge. Your record will be assigned a permanent cryptographically-signed dossier ID.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* NAVIGATION FOOTER */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-xs transition inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-7 py-3 rounded-full bg-transport-amber hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-transport-amber/20 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
                className="px-8 py-3.5 rounded-full bg-red-500 hover:bg-red-400 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-2xl shadow-red-500/40 inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Recording on Ledger...' : 'Submit to Evidentiary Ledger'}</span>
              </button>
            )}
          </div>

          {/* Alternative Apple Messages Banner */}
          <AppleMessagesIncidentTrigger variant="banner" cityName="Leesburg" />
        </div>
      )}
    </div>
  )
}
