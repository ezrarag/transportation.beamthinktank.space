'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Truck,
  Plane,
  Radio,
  CheckCircle2,
  MapPin,
  Clock,
  Send,
  LogIn,
  X,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import type {
  DriverLicenseType,
  DriverPledge,
  OperationalRoleTab,
  VehiclePreference,
} from '@/lib/types/driverPledge'

const CITIES = [
  'Milwaukee, WI',
  'Atlanta, GA',
  'Chicago, IL',
  'Green Bay, WI',
  'Madison, WI',
]

const HOUR_PILLS = [5, 10, 20, 40]

const CERTIFICATION_OPTIONS: { id: DriverLicenseType; label: string; sub: string }[] = [
  { id: 'standard_dl', label: 'Class D Driver License', sub: 'Standard state driver license' },
  { id: 'cdl', label: 'Commercial Driver License (CDL)', sub: 'Class A or B commercial license' },
  { id: 'part_107_drone', label: 'FAA Part 107 Commercial Drone', sub: 'Remote pilot certificate' },
  { id: 'private_pilot', label: 'FAA Private Pilot (PPL)', sub: 'Single engine or multi-engine land' },
  { id: 'commercial_pilot', label: 'FAA Commercial Pilot (CPL)', sub: 'Commercial aviation certification' },
]

interface Props {
  isOpen: boolean
  onClose: () => void
  initialRole?: OperationalRoleTab
}

export default function ProgressiveIntakeWizardModal({
  isOpen,
  onClose,
  initialRole = 'drive',
}: Props) {
  const [step, setStep] = useState<number>(1)
  const [user, setUser] = useState<User | null>(null)

  // Step state
  const [roleTab, setRoleTab] = useState<OperationalRoleTab>(initialRole)
  const [cityHub, setCityHub] = useState('Milwaukee, WI')
  const [pledgedWeeklyHours, setPledgedWeeklyHours] = useState<number>(10)
  const [vehiclePreference, setVehiclePreference] = useState<VehiclePreference>('rideshare_van')
  const [certifications, setCertifications] = useState<DriverLicenseType[]>(['standard_dl'])
  const [notes, setNotes] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSuccess, setSubmittedSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (initialRole) {
      setRoleTab(initialRole)
    }
  }, [initialRole])

  useEffect(() => {
    if (!auth) return
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleGoogleAuth = async () => {
    if (!auth) {
      setErrorMsg('Firebase Auth is unavailable.')
      return
    }
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err: any) {
      console.error('Google sign-in error:', err)
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg(`Google sign-in failed: ${err.message}`)
      }
    }
  }

  const handleToggleCert = (certId: DriverLicenseType) => {
    setCertifications((prev) =>
      prev.includes(certId) ? prev.filter((c) => c !== certId) : [...prev, certId]
    )
  }

  const handleSubmitPledge = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setErrorMsg(null)
    setIsSubmitting(true)

    try {
      const uid = user?.uid || `guest-pledge-${Date.now()}`
      const pledgeData: DriverPledge = {
        uid,
        displayName: user?.displayName || 'Anonymous Operator',
        email: user?.email || 'operator@beamthinktank.space',
        avatarUrl: user?.photoURL || null,
        cityHub,
        roleTab,
        vehiclePreference,
        pledgedWeeklyHours,
        certifications,
        notes,
        createdAt: new Date().toISOString(),
      }

      if (db) {
        await setDoc(doc(db, 'driverPledges', uid), pledgeData, { merge: true })

        if (user?.uid) {
          await updateDoc(doc(db, 'participantProfiles', user.uid), {
            claimedRoles: ['driver', roleTab],
            activeHub: cityHub,
            sweatEquityHours: pledgedWeeklyHours * 4,
          }).catch(() =>
            setDoc(
              doc(db, 'participantProfiles', user.uid),
              {
                claimedRoles: ['driver', roleTab],
                activeHub: cityHub,
                sweatEquityHours: pledgedWeeklyHours * 4,
              },
              { merge: true }
            )
          )
        }
      }

      setSubmittedSuccess(true)
    } catch (err: any) {
      console.error('Error submitting pledge:', err)
      setErrorMsg(`Submission failed: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetAndClose = () => {
    setStep(1)
    setSubmittedSuccess(false)
    setErrorMsg(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-[#07080b]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-[#0a0d14]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl text-slate-100"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
                Driver Intake Wizard
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-mono text-xs text-emerald-400 font-bold">
                Step {submittedSuccess ? '4' : step} of 4
              </span>
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-8">
            <motion.div
              className="bg-emerald-400 h-full"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* SUCCESS STATE */}
          {submittedSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-6"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-4 ring-emerald-500/10">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Driver Seat Claimed!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Your pledge of <strong className="text-emerald-400">{pledgedWeeklyHours} hrs/week</strong> in{' '}
                  <strong className="text-white">{cityHub}</strong> for operational track{' '}
                  <strong className="text-cyan-400 capitalize">{roleTab}</strong> has been logged to the BEAM ledger.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/profile"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm transition shadow-xl shadow-emerald-500/20"
                >
                  View Participant Profile
                </a>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-sm font-semibold transition"
                >
                  Close Wizard
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* STEP 1: OPERATIONAL ROLE TRACK */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 1</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How do you want to move?</h2>
                    <p className="text-slate-400 text-xs sm:text-sm">Select your primary operational track in the community fleet.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setRoleTab('drive')
                        setVehiclePreference('rideshare_van')
                      }}
                      className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                        roleTab === 'drive'
                          ? 'bg-emerald-500/15 border-emerald-400 text-white ring-1 ring-emerald-400/50'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${roleTab === 'drive' ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-slate-400'}`}>
                          <Truck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-base text-white">Ground Transit</div>
                          <div className="text-xs text-slate-400">Rideshare shuttles & EV cargo delivery</div>
                        </div>
                      </div>
                      {roleTab === 'drive' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRoleTab('fly')
                        setVehiclePreference('flight_aviation')
                      }}
                      className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                        roleTab === 'fly'
                          ? 'bg-cyan-500/15 border-cyan-400 text-white ring-1 ring-cyan-400/50'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${roleTab === 'fly' ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-slate-400'}`}>
                          <Plane className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-base text-white">Aviation & Flight</div>
                          <div className="text-xs text-slate-400">Regional flight corridors & cargo drone trials</div>
                        </div>
                      </div>
                      {roleTab === 'fly' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRoleTab('dispatch')
                        setVehiclePreference('cargo_utility')
                      }}
                      className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                        roleTab === 'dispatch'
                          ? 'bg-indigo-500/15 border-indigo-400 text-white ring-1 ring-indigo-400/50'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${roleTab === 'dispatch' ? 'bg-indigo-400 text-slate-950' : 'bg-white/10 text-slate-400'}`}>
                          <Radio className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-base text-white">Fleet Dispatch & Routing</div>
                          <div className="text-xs text-slate-400">Live telemetry monitoring & vehicle dispatch</div>
                        </div>
                      </div>
                      {roleTab === 'dispatch' && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: LOCATION & PLEDGED HOURS */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 2</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Where are you based & pledged hours?</h2>
                    <p className="text-slate-400 text-xs sm:text-sm">Select your active target city hub and commit weekly route hours.</p>
                  </div>

                  {/* City Hub Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Target City Hub
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CITIES.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCityHub(c)}
                          className={`p-3 rounded-xl border text-xs font-bold transition text-center ${
                            cityHub === c
                              ? 'bg-emerald-500/20 border-emerald-400 text-white'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hour Pledge Pills & Slider */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> Pledge Weekly Route Hours
                      </label>
                      <span className="text-lg font-extrabold text-amber-400 font-mono">
                        {pledgedWeeklyHours} hrs/wk
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {HOUR_PILLS.map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setPledgedWeeklyHours(hrs)}
                          className={`py-3 rounded-xl border text-xs font-bold transition ${
                            pledgedWeeklyHours === hrs
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {hrs} hrs/wk
                        </button>
                      ))}
                    </div>

                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="5"
                      value={pledgedWeeklyHours}
                      onChange={(e) => setPledgedWeeklyHours(Number(e.target.value))}
                      className="w-full accent-amber-400 bg-white/10 rounded-lg cursor-pointer h-2 mt-2"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CREDENTIALS & LICENSING */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 3</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Verify Credentials</h2>
                    <p className="text-slate-400 text-xs sm:text-sm">Select all active licenses or endorsements you hold.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {CERTIFICATION_OPTIONS.map((cert) => {
                      const isSelected = certifications.includes(cert.id)
                      return (
                        <button
                          key={cert.id}
                          type="button"
                          onClick={() => handleToggleCert(cert.id)}
                          className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-indigo-500/20 border-indigo-400 text-white ring-1 ring-indigo-400/40'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-white">{cert.label}</div>
                            <div className="text-[11px] text-slate-400">{cert.sub}</div>
                          </div>
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: GOOGLE AUTH & SUBMIT */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 4</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sign In & Confirm Pledge</h2>
                    <p className="text-slate-400 text-xs sm:text-sm">Link your BEAM profile via Google Auth to submit your commitment.</p>
                  </div>

                  {/* Summary Box */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2 text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-slate-400">Operational Track:</span>
                      <span className="font-bold text-emerald-400 uppercase">{roleTab}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-slate-400">Target Hub & Hours:</span>
                      <span className="font-bold text-white">{cityHub} ({pledgedWeeklyHours} hrs/wk)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Credentials Selected:</span>
                      <span className="font-bold text-indigo-300">{certifications.length} verified</span>
                    </div>
                  </div>

                  {/* Auth Container */}
                  <div className="p-4 rounded-2xl border border-white/10 bg-black/40 space-y-4">
                    {user ? (
                      <div className="flex items-center space-x-3 text-xs">
                        <img
                          src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                          alt={user.displayName || 'User'}
                          className="w-10 h-10 rounded-full border border-emerald-400"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{user.displayName || user.email}</div>
                          <div className="text-emerald-400 text-[11px]">Authenticated via Google Auth</div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-center sm:text-left">
                        <p className="text-xs text-slate-300">Sign in with Google to log your driver seat pledge onto the BEAM operational ledger.</p>
                        <button
                          type="button"
                          onClick={handleGoogleAuth}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition"
                        >
                          <LogIn className="w-4 h-4 text-emerald-400" /> Sign In with Google
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Optional Notes */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400">Dispatch Notes (Optional)</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Preferred shift availability, equipment endorsements..."
                      className="w-full bg-white/5 text-white text-xs rounded-xl border border-white/15 p-3 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}
                </motion.div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-xs font-semibold text-white transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(4, s + 1))}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20"
                  >
                    Next Question <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSubmitPledge()}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-extrabold transition shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Pledging Driver Seat...' : 'Submit Driver Pledge'}
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
