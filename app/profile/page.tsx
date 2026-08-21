'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { TransportationParticipantWorkspace } from '@/components/profile/TransportationParticipantWorkspace'
import type { TransportParticipantProfile } from '@/lib/types/transportProfile'
import Link from 'next/link'

const DEFAULT_PROFILE: TransportParticipantProfile = {
  activeHub: 'Milwaukee, WI',
  claimedRoles: ['community-member'],
  sweatEquityHours: 48,
  beamCoins: 120,
  attachedFleetNodes: ['rag-transit-1'],
  w9Signed: false,
  contractSigned: false,
  targetLocations: [
    { city: 'Milwaukee', state: 'WI', priority: 1, corridorFocus: 'logistics' },
    { city: 'Atlanta', state: 'GA', priority: 2, corridorFocus: 'repair' },
  ],
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<TransportParticipantProfile | null>(null)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (!currentUser) {
        setLoading(false)
        return
      }

      try {
        if (db) {
          const profileRef = doc(db, 'participantProfiles', currentUser.uid)
          const snap = await getDoc(profileRef).catch(() => null)

          const googlePhoto = currentUser.photoURL || null
          const googleName = currentUser.displayName || null
          const googleEmail = currentUser.email || null

          if (snap && snap.exists()) {
            const data = snap.data() as Partial<TransportParticipantProfile> & { photoURL?: string; headshotUrl?: string }
            const resolvedAvatar = googlePhoto || data.avatarUrl || data.photoURL || data.headshotUrl || ''
            const resolvedName = googleName || data.displayName || 'Transportation Participant'
            const resolvedEmail = googleEmail || data.email || ''

            setProfile({
              uid: currentUser.uid,
              displayName: resolvedName,
              email: resolvedEmail,
              avatarUrl: resolvedAvatar,
              isVerified: true,
              activeHub: data.activeHub || DEFAULT_PROFILE.activeHub,
              claimedRoles: Array.isArray(data.claimedRoles) ? data.claimedRoles : DEFAULT_PROFILE.claimedRoles,
              sweatEquityHours: typeof data.sweatEquityHours === 'number' ? data.sweatEquityHours : DEFAULT_PROFILE.sweatEquityHours,
              beamCoins: typeof data.beamCoins === 'number' ? data.beamCoins : DEFAULT_PROFILE.beamCoins,
              attachedFleetNodes: Array.isArray(data.attachedFleetNodes) ? data.attachedFleetNodes : DEFAULT_PROFILE.attachedFleetNodes,
              w9Signed: Boolean(data.w9Signed),
              w9SignedDate: data.w9SignedDate,
              contractSigned: Boolean(data.contractSigned),
              contractSignedDate: data.contractSignedDate,
              targetLocations: data.targetLocations || DEFAULT_PROFILE.targetLocations,
            })

            // Sync updated Google photoURL/metadata to Firestore if different
            if (googlePhoto && data.avatarUrl !== googlePhoto) {
              await setDoc(profileRef, { avatarUrl: googlePhoto, photoURL: googlePhoto, displayName: resolvedName, email: resolvedEmail }, { merge: true }).catch(() => null)
            }
          } else {
            // Silently initialize default profile in Firestore with Google metadata
            const newProfile: TransportParticipantProfile = {
              ...DEFAULT_PROFILE,
              uid: currentUser.uid,
              displayName: googleName || 'Transportation Participant',
              email: googleEmail || '',
              avatarUrl: googlePhoto || '',
              isVerified: true,
              updatedAt: new Date().toISOString(),
            }

            setProfile(newProfile)
            await setDoc(profileRef, newProfile, { merge: true }).catch((err) => {
              console.warn('Unable to persist initial profile to Firestore:', err)
            })
          }
        } else {
          // Local fallback when DB is not reachable
          setProfile({
            ...DEFAULT_PROFILE,
            uid: currentUser.uid,
            displayName: currentUser.displayName || 'Local Participant',
            email: currentUser.email || '',
            avatarUrl: currentUser.photoURL || '',
          })
        }
      } catch (err) {
        console.error('Error loading participant profile:', err)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0D14] flex flex-col items-center justify-center p-6 text-slate-300 space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <p className="text-sm font-medium">Initializing Participant Workspace...</p>
      </div>
    )
  }

  // Fallback for unauthenticated access or local bypass preview
  const displayUserPayload = user
    ? {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }
    : {
        uid: 'local-transport-demo',
        displayName: 'Ezra Haugabrooks',
        email: 'ezra@readyaimgo.biz',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      }

  const activeProfile: TransportParticipantProfile = profile || {
    ...DEFAULT_PROFILE,
    uid: displayUserPayload.uid,
    displayName: displayUserPayload.displayName,
    email: displayUserPayload.email,
    avatarUrl: displayUserPayload.photoURL || '',
  }

  return (
    <TransportationParticipantWorkspace
      initialProfile={activeProfile}
      user={displayUserPayload}
    />
  )
}
