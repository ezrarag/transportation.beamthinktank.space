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
  ShieldCheck,
  Award,
  Send,
  LogIn,
  Compass,
  Zap,
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

const VEHICLE_OPTIONS: { id: VehiclePreference; label: string; description: string }[] = [
  { id: 'rideshare_van', label: 'Rideshare & Transit Van', description: 'Passenger micro-transit & neighborhood shuttles' },
  { id: 'cargo_utility', label: 'Cargo Utility Van', description: 'Local freight, parts delivery & equipment hauling' },
  { id: 'light_ev', label: 'Light EV & Micro-Mobility', description: 'Last-mile urban delivery & light electric shuttles' },
  { id: 'flight_aviation', label: 'Flight & Drone Aviation', description: 'Aviation corridors & drone cargo delivery' },
]

const CERTIFICATION_OPTIONS: { id: DriverLicenseType; label: string }[] = [
  { id: 'standard_dl', label: 'Standard Driver License (Class D)' },
  { id: 'cdl', label: 'Commercial Driver License (CDL A/B)' },
  { id: 'part_107_drone', label: 'FAA Part 107 Commercial Drone License' },
  { id: 'private_pilot', label: 'FAA Private Pilot License (PPL)' },
  { id: 'commercial_pilot', label: 'FAA Commercial Pilot License (CPL)' },
]

export function DriverIntakeModule() {
  const [user, setUser] = useState<User | null>(null)
  const [roleTab, setRoleTab] = useState<OperationalRoleTab>('drive')
  const [cityHub, setCityHub] = useState('Milwaukee, WI')
  const [vehiclePreference, setVehiclePreference] = useState<VehiclePreference>('rideshare_van')
  const [pledgedWeeklyHours, setPledgedWeeklyHours] = useState<number>(10)
  const [certifications, setCertifications] = useState<DriverLicenseType[]>(['standard_dl'])
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSuccess, setSubmittedSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

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

  const handleSubmitPledge = async (e: React.FormEvent) => {
    e.preventDefault()
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
        // Save to driverPledges collection
        await setDoc(doc(db, 'driverPledges', uid), pledgeData, { merge: true })

        // Update participant profile
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

  return (
    <section id="intake-module" className="scroll-mt-24 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-md">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" /> Driver & Pilot Intake Portal
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Claim Your Driver Seat & Pledge Hours
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          Register your availability to drive, fly, or dispatch for Milwaukee and partner city transit fleets. Demonstrates live operational demand to component sponsors & municipal partners.
        </p>
      </div>

      {submittedSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-emerald-950/40 border border-emerald-500/50 p-8 text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 ring-4 ring-emerald-500/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Driver Pledge Confirmed!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Your pledge of <strong className="text-emerald-400">{pledgedWeeklyHours} hrs/week</strong> in{' '}
            <strong className="text-white">{cityHub}</strong> has been logged to the BEAM operational ledger.
          </p>
          <div className="pt-2">
            <a
              href="/profile"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20"
            >
              View Your Participant Profile
            </a>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmitPledge} className="space-y-6">
          {/* Step 1: Operational Role Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span>1. Select Operational Track</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRoleTab('drive')}
                className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
                  roleTab === 'drive'
                    ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Truck className={`w-6 h-6 ${roleTab === 'drive' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <div>
                  <div className="font-bold text-sm">Ground Transit</div>
                  <div className="text-[11px] text-slate-400">Rideshare & Shuttles</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRoleTab('fly')}
                className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
                  roleTab === 'fly'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Plane className={`w-6 h-6 ${roleTab === 'fly' ? 'text-cyan-400' : 'text-slate-500'}`} />
                <div>
                  <div className="font-bold text-sm">Aviation & Flight</div>
                  <div className="text-[11px] text-slate-400">Pilots & Drone Logistics</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRoleTab('dispatch')}
                className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
                  roleTab === 'dispatch'
                    ? 'bg-indigo-950/40 border-indigo-500 text-white ring-1 ring-indigo-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Radio className={`w-6 h-6 ${roleTab === 'dispatch' ? 'text-indigo-400' : 'text-slate-500'}`} />
                <div>
                  <div className="font-bold text-sm">Fleet Dispatch</div>
                  <div className="text-[11px] text-slate-400">Routing & Telemetry</div>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: City & Vehicle Preference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City Hub */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> City Hub Location
              </label>
              <select
                value={cityHub}
                onChange={(e) => setCityHub(e.target.value)}
                className="w-full bg-slate-950 text-white text-sm font-semibold rounded-xl border border-slate-700 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Weekly Hours */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Weekly Pledged Hours: <span className="text-amber-400 font-bold">{pledgedWeeklyHours} hrs/wk</span>
              </label>
              <input
                type="range"
                min="5"
                max="40"
                step="5"
                value={pledgedWeeklyHours}
                onChange={(e) => setPledgedWeeklyHours(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer h-2 mt-3"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>5 hrs</span>
                <span>15 hrs</span>
                <span>30 hrs</span>
                <span>40 hrs/wk</span>
              </div>
            </div>
          </div>

          {/* Step 3: Vehicle Preference Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3. Preferred Transit Asset Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VEHICLE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setVehiclePreference(opt.id)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    vehiclePreference === opt.id
                      ? 'bg-slate-800 border-emerald-500 text-white ring-1 ring-emerald-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">{opt.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{opt.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Existing Licensing & Certifications */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-indigo-400" /> Existing Credentials & Licensing
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CERTIFICATION_OPTIONS.map((cert) => {
                const isSelected = certifications.includes(cert.id)
                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => handleToggleCert(cert.id)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-indigo-950/30 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{cert.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Additional Dispatch or Availability Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Available weekday mornings, CDL endorsement attached..."
              rows={2}
              className="w-full bg-slate-950 text-white text-xs rounded-xl border border-slate-700 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* User Auth Banner & Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            {user ? (
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <img
                  src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full border border-emerald-500/50"
                />
                <div>
                  <span className="font-bold text-white block">{user.displayName || user.email}</span>
                  <span className="text-[11px] text-emerald-400">Signed in via Google Auth</span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
              >
                <LogIn className="w-4 h-4 text-emerald-400" /> Sign In with Google First
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Pledging Driver Seat...' : 'Submit Driver Pledge'}
            </button>
          </div>

          {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}
        </form>
      )}
    </section>
  )
}
