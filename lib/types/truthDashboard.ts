import { Timestamp } from 'firebase/firestore'

export interface CityTruthMetadata {
  name: string
  county: string
  state: string
  population: number
  lastUpdated: string | Timestamp
  ntdAgencyId: string
  gtfsUrl: string
  censusGeoId: string
}

export type IncidentStatus = 'new' | 'verified' | 'cited'

export interface TransitIncident {
  id?: string
  submitterName: string | null
  submitterEmail: string | null
  date: string
  time: string
  location: string
  destination: string
  consequence: string
  populationGroup: string[]
  tripType: string
  dayOfWeek: string
  timeOfDay: string
  wouldHaveUsedTransit: boolean
  notes: string
  status: IncidentStatus
  createdAt: any
  citySlug: string
  ipRegion: string | null
  verifiedAt?: string | null
  verifiedBy?: string | null
  citedIn?: string | null
  deleted?: boolean
}

export interface MeetingRequest {
  id?: string
  name: string
  title: string
  organization: string
  email: string
  phone: string
  represent: string
  discussionTopic: string
  message: string
  createdAt: any
  citySlug: string
  status?: 'pending' | 'reviewed' | 'contacted'
}

export interface SupplyItem {
  id: string
  label: string
  value: string
  subtext?: string
  sourceName: string
  sourceUrl: string
  verifiedYear?: string
}

export interface DemographicsItem {
  id: string
  label: string
  value: string
  detail?: string
  sourceName: string
  sourceUrl: string
  highlight?: 'signal' | 'amber' | 'red' | 'normal'
}
