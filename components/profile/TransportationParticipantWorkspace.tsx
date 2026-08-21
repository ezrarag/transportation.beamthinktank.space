'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Truck,
  Wrench,
  ShieldCheck,
  MapPin,
  Sparkles,
  CheckCircle2,
  Coins,
  FileText,
  Clock,
  Activity,
  AlertTriangle,
  Compass,
  Check,
  Plus,
  Navigation,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react'
import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import DocumentSigner from '@/components/DocumentSigner'
import { allVehicles, buildImaginUrl } from '@/lib/transport/fleet'
import { transportAreas } from '@/lib/transport/areas'
import { cohortRoleCards, compensationTiers } from '@/lib/transport/cohort'
import type { FleetVehicle } from '@/lib/transport/types'
import type { TransportParticipantProfile } from '@/lib/types/transportProfile'

interface TransportationParticipantWorkspaceProps {
  initialProfile: TransportParticipantProfile
  user: {
    uid: string
    displayName?: string | null
    email?: string | null
    photoURL?: string | null
  } | null
}

const AVAILABLE_HUBS = [
  'Milwaukee, WI',
  'Atlanta, GA',
  'Chicago, IL',
  'Green Bay, WI',
  'Madison, WI',
]

// Combine all fleet vehicles into a comprehensive list for node matching
const allFleetVehicles: FleetVehicle[] = allVehicles

export function TransportationParticipantWorkspace({
  initialProfile,
  user,
}: TransportationParticipantWorkspaceProps) {
  const [profile, setProfile] = useState<TransportParticipantProfile>(initialProfile)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [locationStatus, setLocationStatus] = useState<string | null>(null)
  
  // Corridor & Health Filters
  const [selectedCorridor, setSelectedCorridor] = useState<string>('all')
  const [selectedHealth, setSelectedHealth] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Document Signer Modal state
  const [documentSignerOpen, setDocumentSignerOpen] = useState(false)
  const [documentType, setDocumentType] = useState<'w9' | 'contract' | 'mediaRelease'>('w9')

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Detect location via Geolocation API
  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser')
      return
    }
    setIsDetectingLocation(true)
    setLocationStatus('Detecting geographic hub...')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          // Simple reverse geocoding approximation for demonstration / fallback logic
          let detectedHub = 'Milwaukee, WI'
          if (latitude > 42.5 && latitude < 43.5 && longitude > -88.2 && longitude < -87.8) {
            detectedHub = 'Milwaukee, WI'
          } else if (latitude > 33.5 && latitude < 34.2 && longitude > -84.6 && longitude < -84.1) {
            detectedHub = 'Atlanta, GA'
          } else if (latitude > 41.6 && latitude < 42.1 && longitude > -88.0 && longitude < -87.5) {
            detectedHub = 'Chicago, IL'
          }

          setProfile((prev) => ({ ...prev, activeHub: detectedHub }))
          setLocationStatus(`Hub set to ${detectedHub} (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`)

          if (db && user?.uid) {
            await updateDoc(doc(db, 'participantProfiles', user.uid), { activeHub: detectedHub }).catch(
              () => setDoc(doc(db, 'participantProfiles', user.uid), { activeHub: detectedHub }, { merge: true })
            )
          }
        } catch (err) {
          setLocationStatus('Unable to resolve city name. Defaulted to Milwaukee, WI')
        } finally {
          setIsDetectingLocation(false)
        }
      },
      (error) => {
        setIsDetectingLocation(false)
        setLocationStatus(`Location access denied or unavailable (${error.message})`)
      },
      { timeout: 8000 }
    )
  }, [user])

  // Update active hub manually
  const handleHubChange = async (newHub: string) => {
    setProfile((prev) => ({ ...prev, activeHub: newHub }))
    showToast(`Active geographic hub updated to ${newHub}`)

    if (db && user?.uid) {
      await updateDoc(doc(db, 'participantProfiles', user.uid), { activeHub: newHub }).catch(() =>
        setDoc(doc(db, 'participantProfiles', user.uid), { activeHub: newHub }, { merge: true })
      )
    }
  }

  // Attach / Detach fleet vehicle node
  const handleToggleFleetAttachment = async (vehicleId: string) => {
    const isAttached = profile.attachedFleetNodes.includes(vehicleId)
    const updatedNodes = isAttached
      ? profile.attachedFleetNodes.filter((id) => id !== vehicleId)
      : [...profile.attachedFleetNodes, vehicleId]

    setProfile((prev) => ({ ...prev, attachedFleetNodes: updatedNodes }))
    const vehicle = allFleetVehicles.find((v) => v.id === vehicleId)
    const name = vehicle ? `${vehicle.make} ${vehicle.model}` : vehicleId
    showToast(isAttached ? `Detached from vehicle node: ${name}` : `Attached to vehicle node: ${name}`)

    if (db && user?.uid) {
      await updateDoc(doc(db, 'participantProfiles', user.uid), { attachedFleetNodes: updatedNodes }).catch(
        () => setDoc(doc(db, 'participantProfiles', user.uid), { attachedFleetNodes: updatedNodes }, { merge: true })
      )
    }
  }

  // Claim / Unclaim cohort role
  const handleToggleClaimRole = async (roleId: string) => {
    const isClaimed = profile.claimedRoles.includes(roleId)
    const updatedRoles = isClaimed
      ? profile.claimedRoles.filter((id) => id !== roleId)
      : [...profile.claimedRoles, roleId]

    setProfile((prev) => ({ ...prev, claimedRoles: updatedRoles }))
    showToast(isClaimed ? `Unclaimed cohort track: ${roleId}` : `Claimed cohort track: ${roleId}`)

    if (db && user?.uid) {
      await updateDoc(doc(db, 'participantProfiles', user.uid), { claimedRoles: updatedRoles }).catch(() =>
        setDoc(doc(db, 'participantProfiles', user.uid), { claimedRoles: updatedRoles }, { merge: true })
      )
    }
  }

  // Open Document Signer
  const handleOpenSigner = (type: 'w9' | 'contract' | 'mediaRelease') => {
    setDocumentType(type)
    setDocumentSignerOpen(true)
  }

  // Handle Document Signer Completion
  const handleDocumentSigned = async (type: 'w9' | 'contract' | 'mediaRelease') => {
    const nowStr = new Date().toISOString().split('T')[0]
    const updateData: Partial<TransportParticipantProfile> = {}

    if (type === 'w9') {
      updateData.w9Signed = true
      updateData.w9SignedDate = nowStr
    } else if (type === 'contract') {
      updateData.contractSigned = true
      updateData.contractSignedDate = nowStr
    }

    setProfile((prev) => ({ ...prev, ...updateData }))
    showToast(`${type.toUpperCase()} document completed and verified!`)

    if (db && user?.uid) {
      await updateDoc(doc(db, 'participantProfiles', user.uid), updateData).catch(() =>
        setDoc(doc(db, 'participantProfiles', user.uid), updateData, { merge: true })
      )
    }
  }

  // Filter fleet vehicles for matcher grid
  const filteredVehicles = allFleetVehicles.filter((v) => {
    const matchesSearch =
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.notes.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesHealth = selectedHealth === 'all' || v.healthStatus === selectedHealth
    
    // Map corridor tags to vehicle attributes
    let matchesCorridor = true
    if (selectedCorridor === 'logistics') {
      matchesCorridor = v.purpose.toLowerCase().includes('service') || v.purpose.toLowerCase().includes('coverage')
    } else if (selectedCorridor === 'repair') {
      matchesCorridor = v.notes.toLowerCase().includes('maintenance') || v.healthStatus === 'needs-attention'
    } else if (selectedCorridor === 'restore') {
      matchesCorridor = v.status === 'restore'
    }

    return matchesSearch && matchesHealth && matchesCorridor
  })

  const displayName = profile.displayName || user?.displayName || 'Transportation Participant'
  const email = profile.email || user?.email || 'participant@beamthinktank.space'
  const avatarUrl = profile.avatarUrl || user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 pb-20">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 rounded-xl bg-emerald-500/90 text-slate-950 font-semibold px-4 py-3 shadow-2xl flex items-center gap-2 border border-emerald-300/40 backdrop-blur-md"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Profile Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-emerald-500/50 shadow-xl"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{displayName}</h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Logistics Fellow
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-medium">{email}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Active Base: <strong className="text-white">{profile.activeHub}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => handleOpenSigner('w9')}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition border border-slate-700"
              >
                <FileText className="w-4 h-4 text-emerald-400" /> W-9 Info
              </button>
              <Link
                href="/fleet"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-semibold transition shadow-lg shadow-emerald-500/20"
              >
                <Truck className="w-4 h-4" /> Full Fleet Directory
              </Link>
            </div>
          </div>
        </section>

        {/* 1. TELEMETRY BANNER */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Active Geographic Hub */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Geographic Hub</span>
              <Navigation className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <select
                value={profile.activeHub}
                onChange={(e) => handleHubChange(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold text-lg rounded-xl border border-slate-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {AVAILABLE_HUBS.map((hub) => (
                  <option key={hub} value={hub}>
                    {hub}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
              >
                <Compass className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                {isDetectingLocation ? 'Locating...' : 'Auto-detect Location'}
              </button>
            </div>
            {locationStatus && <p className="text-[11px] text-slate-400 truncate">{locationStatus}</p>}
          </div>

          {/* Logged Route Hours */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Logged Route Hours</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{profile.sweatEquityHours}</span>
              <span className="text-xs text-slate-400">hrs logged</span>
            </div>
            <p className="text-xs text-slate-400">Sweat equity & transit dispatch contribution</p>
          </div>

          {/* BEAM Coins Balance */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>BEAM Coins Balance</span>
              <Coins className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400">{profile.beamCoins}</span>
              <span className="text-xs text-amber-400/80 font-medium">BEAM</span>
            </div>
            <p className="text-xs text-slate-400">Redeemable for maintenance & gear perks</p>
          </div>

          {/* Active Vehicle Check-outs */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Active Fleet Attachments</span>
              <Truck className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{profile.attachedFleetNodes.length}</span>
              <span className="text-xs text-slate-400">vehicles assigned</span>
            </div>
            <p className="text-xs text-slate-400">Assigned RAG & transit fleet nodes</p>
          </div>

        </section>

        {/* 2. TARGET CORRIDORS & FLEET NODE MATCHER */}
        <section className="space-y-6 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold text-white">Target Corridors & Fleet Node Matcher</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Map your location and cohort role to active vehicle assets across logistics, repair, and restoration corridors.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Corridor selector */}
              <select
                value={selectedCorridor}
                onChange={(e) => setSelectedCorridor(e.target.value)}
                className="bg-slate-950 text-slate-200 text-xs rounded-xl border border-slate-700 px-3 py-2 focus:outline-none"
              >
                <option value="all">All Corridors</option>
                <option value="logistics">Logistics & Coverage</option>
                <option value="repair">Maintenance & Repair</option>
                <option value="restore">Restoration</option>
              </select>

              {/* Health selector */}
              <select
                value={selectedHealth}
                onChange={(e) => setSelectedHealth(e.target.value)}
                className="bg-slate-950 text-slate-200 text-xs rounded-xl border border-slate-700 px-3 py-2 focus:outline-none"
              >
                <option value="all">All Health Conditions</option>
                <option value="good">Good Health</option>
                <option value="needs-attention">Needs Attention</option>
              </select>
            </div>
          </div>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => {
              const isAttached = profile.attachedFleetNodes.includes(vehicle.id)
              const imgUrl = buildImaginUrl(vehicle.make, vehicle.model, vehicle.year, '01')

              return (
                <div
                  key={vehicle.id}
                  className={`rounded-2xl border transition overflow-hidden flex flex-col justify-between ${
                    isAttached
                      ? 'bg-slate-900/90 border-emerald-500/60 ring-1 ring-emerald-500/40 shadow-xl shadow-emerald-950/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header & Image */}
                  <div>
                    <div className="relative h-44 bg-gradient-to-b from-slate-900 to-slate-950 p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={imgUrl}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="max-h-36 object-contain drop-shadow-2xl transition transform group-hover:scale-105"
                        onError={(e) => {
                          // Fallback illustration if IMAGIN image fails
                          ;(e.target as HTMLElement).style.display = 'none'
                        }}
                      />
                      
                      {/* Health Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            vehicle.healthStatus === 'good'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {vehicle.healthStatus === 'good' ? (
                            <>
                              <Check className="w-3 h-3" /> Good
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3 h-3" /> Needs Attention
                            </>
                          )}
                        </span>
                      </div>

                      {/* Fleet Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800/90 text-slate-300 border border-slate-700">
                          {vehicle.statusLabel || vehicle.clientId.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{vehicle.config || vehicle.engine}</p>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2">{vehicle.purpose || vehicle.notes}</p>

                      <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                        <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-800 font-mono">
                          Payload: {vehicle.payload || 'N/A'}
                        </span>
                        <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-800 font-mono">
                          Color: {vehicle.color}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleToggleFleetAttachment(vehicle.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                        isAttached
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isAttached ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Attached to My Roster Node
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> Attach to Vehicle Roster
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 3. ROLE DISCOVERY & COHORT TRACKS */}
        <section className="space-y-6 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Cohort Role Tracks & Discovery</h2>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Select and claim your active pathway in the BEAM transportation cohort (community member, student, faculty, entrepreneur).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cohortRoleCards.map((roleCard) => {
              const isClaimed = profile.claimedRoles.includes(roleCard.id)

              return (
                <div
                  key={roleCard.id}
                  className={`rounded-2xl p-6 border transition flex flex-col justify-between ${
                    isClaimed
                      ? 'bg-gradient-to-br from-slate-900 to-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{roleCard.title}</h3>
                      {isClaimed && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Claimed Track
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{roleCard.description}</p>
                  </div>

                  <div className="pt-6 flex items-center gap-3">
                    <button
                      onClick={() => handleToggleClaimRole(roleCard.id)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 ${
                        isClaimed
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isClaimed ? 'Active Track (Click to Unclaim)' : 'Claim Role Track'}
                    </button>

                    <Link
                      href={roleCard.href}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                      title="View Role Overview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Compensation Tiers Breakdown */}
          <div className="mt-8 rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-4">
            <h3 className="text-md font-bold text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" /> Compensation & Sweat Equity Revenue Share
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compensationTiers.map((tier) => (
                <div key={tier.id} className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {tier.stage}
                  </span>
                  <h4 className="text-sm font-bold text-white">{tier.name}</h4>
                  <p className="text-xs text-slate-400">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. COMPLIANCE & TRANSIT SAFETY NET */}
        <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Compliance & Transit Safety Net</h2>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Verify your contractor W-9 documentation and transit safety agreements to participate in client revenue sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* W-9 Form Card */}
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-bold text-white">W-9 Tax Information</h3>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      profile.w9Signed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {profile.w9Signed ? 'Verified & On File' : 'Action Required'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Required for distributing revenue share payouts and contractor stipends.
                </p>
                {profile.w9SignedDate && (
                  <p className="text-[11px] text-slate-500 font-mono">Last updated: {profile.w9SignedDate}</p>
                )}
              </div>

              <button
                onClick={() => handleOpenSigner('w9')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                {profile.w9Signed ? 'Review W-9 Form' : 'Complete W-9 Form'}
              </button>
            </div>

            {/* Transit Safety & Performance Contract Card */}
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-bold text-white">Transit Safety & Driver Covenant</h3>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      profile.contractSigned
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {profile.contractSigned ? 'Active & Signed' : 'Action Required'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Covers driver responsibility, vehicle health standards, and safety net protections.
                </p>
                {profile.contractSignedDate && (
                  <p className="text-[11px] text-slate-500 font-mono">Signed on: {profile.contractSignedDate}</p>
                )}
              </div>

              <button
                onClick={() => handleOpenSigner('contract')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {profile.contractSigned ? 'Review Transit Covenant' : 'Sign Transit Agreement'}
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Document Signer Modal Integration */}
      <DocumentSigner
        isOpen={documentSignerOpen}
        onClose={() => setDocumentSignerOpen(false)}
        documentType={documentType}
        musicianName={displayName}
        musicianEmail={email}
        onComplete={(type) => {
          handleDocumentSigned(type)
          setDocumentSignerOpen(false)
        }}
      />
    </div>
  )
}
