export type OperationalRoleTab = 'drive' | 'fly' | 'dispatch'

export type VehiclePreference = 'rideshare_van' | 'cargo_utility' | 'light_ev' | 'flight_aviation'

export type DriverLicenseType =
  | 'standard_dl'
  | 'cdl'
  | 'part_107_drone'
  | 'private_pilot'
  | 'commercial_pilot'

export interface DriverPledge {
  uid?: string
  displayName?: string | null
  email?: string | null
  avatarUrl?: string | null
  cityHub: string
  roleTab: OperationalRoleTab
  vehiclePreference: VehiclePreference
  pledgedWeeklyHours: number
  certifications: DriverLicenseType[]
  notes?: string
  createdAt?: string
}

export interface FleetReadinessStats {
  totalDrivers: number
  targetCitiesCount: number
  pledgedWeeklyHours: number
  nextCohortDate: string
}
