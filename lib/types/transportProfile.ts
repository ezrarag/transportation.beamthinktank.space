export interface TransportTargetLocation {
  city: string
  state: string
  priority: number
  corridorFocus?: 'logistics' | 'repair' | 'restore' | 'build' | 'rnd' | 'legal'
}

export interface TransportParticipantProfile {
  uid?: string
  displayName?: string | null
  email?: string | null
  avatarUrl?: string | null
  isVerified?: boolean
  activeHub: string
  claimedRoles: string[]
  sweatEquityHours: number
  beamCoins: number
  attachedFleetNodes: string[]
  w9Signed?: boolean
  w9SignedDate?: string
  contractSigned?: boolean
  contractSignedDate?: string
  targetLocations?: TransportTargetLocation[]
  updatedAt?: any
}
