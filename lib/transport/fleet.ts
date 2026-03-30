import type { FleetClient, FleetVehicle, VehicleAngle } from '@/lib/transport/types'

// ─── IMAGIN.studio URL builder ────────────────────────────────────────────────
// Free-tier key "img" works but adds a watermark.
// Register at imagin.studio and set NEXT_PUBLIC_IMAGIN_CUSTOMER_KEY to remove it.
const IMAGIN_CUSTOMER = process.env.NEXT_PUBLIC_IMAGIN_CUSTOMER_KEY ?? 'img'

export const VEHICLE_ANGLES: { label: string; code: VehicleAngle }[] = [
  { label: 'Front', code: '01' },
  { label: 'Side',  code: '13' },
  { label: 'Rear',  code: '21' },
]

export function buildImaginUrl(
  make: string,
  model: string,
  year: number,
  angle: VehicleAngle = '01',
): string {
  const params = new URLSearchParams({
    customer: IMAGIN_CUSTOMER,
    make: make.toLowerCase().replace(/[\s\-/]/g, ''),
    modelFamily: model.toLowerCase().split(' ')[0],
    modelYear: String(year),
    zoomType: 'fullscreen',
    angle,
  })
  return `https://cdn.imagin.studio/getimage?${params.toString()}`
}

// ─── RAG Fleet vehicles (current + planned) ───────────────────────────────────

export const ragFleetVehicles: FleetVehicle[] = [
  {
    id: 'rag-transit-1',
    clientId: 'rag',
    make: 'Ford',
    model: 'Transit',
    year: 2024,
    vin: 'TBD-001',
    licensePlate: 'TBD',
    color: 'Oxford White',
    config: 'High Roof 148" AWD',
    engine: '3.5L EcoBoost V6',
    payload: '4,640 lbs',
    currentMileage: 0,
    healthStatus: 'good',
    lastServiceDate: null,
    nextServiceDue: null,
    notes: 'Primary service van — upfitted with shelving and RAG branding.',
    status: 'rag',
    statusLabel: 'RAG Fleet',
    priceRange: '$54,000–$62,000',
    purpose:
      'Primary service van for RAG operations. First vehicle in the BEAM maintenance cohort.',
  },
  {
    id: 'rag-transit-2',
    clientId: 'rag',
    make: 'Ford',
    model: 'Transit',
    year: 2024,
    vin: 'TBD-002',
    licensePlate: 'TBD',
    color: 'Oxford White',
    config: 'High Roof 148" AWD',
    engine: '3.5L EcoBoost V6',
    payload: '4,640 lbs',
    currentMileage: 0,
    healthStatus: 'good',
    lastServiceDate: null,
    nextServiceDue: null,
    notes: 'Second service van — backup and overflow capacity.',
    status: 'rag',
    statusLabel: 'RAG Fleet',
    priceRange: '$54,000–$62,000',
    purpose: 'Backup and overflow capacity paired with primary Transit.',
  },
  {
    id: 'rag-promaster-1',
    clientId: 'rag',
    make: 'Ram',
    model: 'ProMaster',
    year: 2024,
    vin: 'TBD-003',
    licensePlate: 'TBD',
    color: 'Bright White',
    config: 'High Roof 159" FWD',
    engine: '3.6L Pentastar V6',
    payload: '4,400 lbs',
    currentMileage: 0,
    healthStatus: 'good',
    lastServiceDate: null,
    nextServiceDue: null,
    notes: 'Lowest load floor in class. Ideal for heavy equipment loading.',
    status: 'rag',
    statusLabel: 'RAG Fleet',
    priceRange: '$44,000–$52,000',
    purpose:
      'Lower load floor ideal for heavy equipment. Pairs with Transit for Milwaukee coverage.',
  },
  {
    id: 'rag-f150-1',
    clientId: 'rag',
    make: 'Ford',
    model: 'F-150',
    year: 2024,
    vin: 'TBD-004',
    licensePlate: 'TBD',
    color: 'Agate Black',
    config: 'SuperCrew 4x4',
    engine: '2.7L EcoBoost V6',
    payload: '2,238 lbs',
    currentMileage: 0,
    healthStatus: 'good',
    lastServiceDate: null,
    nextServiceDue: null,
    notes: 'Crew transport and towing. Pro Power Onboard for mobile jobsite power.',
    status: 'rag',
    statusLabel: 'RAG Fleet',
    priceRange: '$42,000–$55,000',
    purpose: 'All-weather Milwaukee workhorse for crew transport and towing.',
  },
]

// ─── Wishlist vehicles (planned acquisitions) ─────────────────────────────────

export const wishlistVehicles: FleetVehicle[] = [
  {
    id: 'wish-etransit-1',
    clientId: 'beam',
    make: 'Ford',
    model: 'E-Transit',
    year: 2025,
    vin: '',
    licensePlate: '',
    color: 'Frozen White',
    config: 'High Roof 148" RWD',
    engine: 'Electric — 266hp',
    payload: '3,800 lbs',
    currentMileage: 0,
    healthStatus: 'good',
    lastServiceDate: null,
    nextServiceDue: null,
    notes: 'R&D testbed for EV maintenance cohort.',
    status: 'want',
    statusLabel: 'Wishlist',
    priceRange: '$52,000–$61,000',
    purpose:
      'BEAM R&D testbed for EV fleet maintenance cohort. Zero-emissions milestone for RAG.',
  },
  {
    id: 'wish-sprinter-1',
    clientId: 'beam',
    make: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2025,
    vin: '',
    licensePlate: '',
    color: 'Arctic White',
    config: 'High Roof 170"EXT AWD',
    engine: '2.0L Turbo Diesel',
    payload: '3,550 lbs',
    currentMileage: 0,
    healthStatus: 'good',
    lastServiceDate: null,
    nextServiceDue: null,
    notes: 'Premium client transport. Mobile workshop candidate.',
    status: 'want',
    statusLabel: 'Wishlist',
    priceRange: '$58,000–$75,000',
    purpose: 'Premium client transport and potential mobile workshop for on-site fleet visits.',
  },
  {
    id: 'wish-silverado-1',
    clientId: 'beam',
    make: 'Chevrolet',
    model: 'Silverado 1500',
    year: 2024,
    vin: '',
    licensePlate: '',
    color: 'Summit White',
    config: 'Crew Cab 4x4',
    engine: '3.0L Duramax Diesel',
    payload: '2,280 lbs',
    currentMileage: 0,
    healthStatus: 'good',
    lastServiceDate: null,
    nextServiceDue: null,
    notes: "Cohort participant truck for fleet service runs and parts sourcing.",
    status: 'want',
    statusLabel: 'Wishlist',
    priceRange: '$42,000–$58,000',
    purpose:
      "Cohort participant truck — physically connects Eric's mom's auto parts store into the live supply chain.",
  },
]

// ─── Restore projects (cohort build vehicles) ─────────────────────────────────

export const restoreVehicles: FleetVehicle[] = [
  {
    id: 'restore-c10-1',
    clientId: 'beam',
    make: 'Chevrolet',
    model: 'C10',
    year: 1972,
    vin: '',
    licensePlate: '',
    color: 'TBD',
    config: 'Stepside bed',
    engine: 'LS Swap (target)',
    payload: 'Show vehicle',
    currentMileage: 0,
    healthStatus: 'needs-attention',
    lastServiceDate: null,
    nextServiceDue: null,
    notes: 'Signature cohort restore. RAG livery. Event display vehicle.',
    status: 'restore',
    statusLabel: 'Restore Project',
    priceRange: '$8,000–$18,000 (acquire + restore)',
    purpose:
      "BEAM Transportation's signature restore project — repainted in RAG livery, displayed at Milwaukee events.",
  },
  {
    id: 'restore-bronco-1',
    clientId: 'beam',
    make: 'Ford',
    model: 'Bronco',
    year: 1985,
    vin: '',
    licensePlate: '',
    color: 'TBD',
    config: 'Full-size 4x4',
    engine: 'Coyote 5.0 Swap (target)',
    payload: 'Portfolio build',
    currentMileage: 0,
    healthStatus: 'needs-attention',
    lastServiceDate: null,
    nextServiceDue: null,
    notes: 'R&D testbed — modern drivetrain into legacy body.',
    status: 'restore',
    statusLabel: 'Restore Project',
    priceRange: '$12,000–$25,000 (acquire + restore)',
    purpose:
      'Portfolio cohort build. Modern drivetrain into classic body — R&D testbed for legacy vehicle upgrades.',
  },
]

export const allVehicles: FleetVehicle[] = [
  ...ragFleetVehicles,
  ...wishlistVehicles,
  ...restoreVehicles,
]

// ─── RAG client definition ────────────────────────────────────────────────────

export const ragClient: FleetClient = {
  id: 'rag',
  name: 'ReadyAimGo',
  type: 'fleet',
  status: 'active',
  contactName: 'Ezra Hauga',
  contactEmail: 'ezra@beamthink.institute',
  fleetSize: ragFleetVehicles.length,
  assignedCohortLeadId: '',
  assignedParticipants: [],
  serviceSchedule: {
    frequency: 'weekly',
    dayOfWeek: 'Tuesday',
    timeWindow: '9:00 AM – 12:00 PM',
  },
  monthlyRatePerVehicle: 175,
  contractStartDate: null,
  contractEndDate: null,
  contractStatus: 'draft',
  notes:
    'First fleet client. Pilot for BEAM Transportation cohort model. VC414 pitch anchor.',
}

export const allClients: FleetClient[] = [ragClient]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getClientById(id: string): FleetClient | undefined {
  return allClients.find((c) => c.id === id)
}

export function getClientVehicles(clientId: string): FleetVehicle[] {
  return allVehicles.filter((v) => v.clientId === clientId)
}

export function getVehicleById(id: string): FleetVehicle | undefined {
  return allVehicles.find((v) => v.id === id)
}

export function vehiclesByStatus(status: FleetVehicle['status']): FleetVehicle[] {
  return allVehicles.filter((v) => v.status === status)
}
