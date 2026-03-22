import type { LogisticsCategory } from '@/lib/transport/types'

export const logisticsCatalog: LogisticsCategory[] = [
  {
    id: 'parts',
    title: 'Parts',
    description: 'Components ready for neighborhood repair, restoration, and build programs.',
    suppliers: [
      {
        id: 'milwaukee-auto-parts',
        name: 'Milwaukee Auto Parts - Pilot Partner',
        neighborhood: 'Milwaukee, WI',
        items: [
          { id: 'engine-filters', name: 'Engine Filters', sku: 'MAP-FLTR-101', note: 'High-turn maintenance stock.' },
          { id: 'brake-pads', name: 'Brake Pads', sku: 'MAP-BRKP-202', note: 'Community repair staple.' },
          { id: 'belts', name: 'Belts', sku: 'MAP-BELT-303', note: 'Multi-fit replacement inventory.' },
        ],
      },
    ],
  },
  {
    id: 'raw-materials',
    title: 'Raw Materials',
    description: 'Materials for fabrication, restoration finishing, and prototyping.',
    suppliers: [
      {
        id: 'harbor-fabrication-coop',
        name: 'Harbor Fabrication Cooperative',
        neighborhood: 'Harbor District',
        items: [
          { id: 'sheet-aluminum', name: 'Sheet Aluminum', sku: 'HFC-AL-410', note: 'Prototype fabrication stock.' },
          { id: 'tube-steel', name: 'Tube Steel', sku: 'HFC-ST-422', note: 'Chassis and fixture builds.' },
        ],
      },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Shared equipment access for diagnostics, repair, and training.',
    suppliers: [
      {
        id: 'matc-tool-library',
        name: 'MATC Tool Library',
        neighborhood: 'Downtown Milwaukee',
        items: [
          { id: 'diagnostic-scanner', name: 'Diagnostic Scanner', sku: 'MATC-SCAN-01', note: 'Loanable for supervised repair sessions.' },
          { id: 'torque-wrench-set', name: 'Torque Wrench Set', sku: 'MATC-TQ-02', note: 'Calibration-ready shared tooling.' },
        ],
      },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    description: 'Local service providers that strengthen delivery beyond parts alone.',
    suppliers: [
      {
        id: 'north-side-tow',
        name: 'North Side Tow & Recovery',
        neighborhood: 'North Side',
        items: [
          { id: 'local-flatbed', name: 'Local Flatbed Service', sku: 'NST-FLAT-14', note: 'Short-haul vehicle movement for partner jobs.' },
        ],
      },
    ],
  },
]

export function getLogisticsCategory(id: string) {
  return logisticsCatalog.find((category) => category.id === id)
}
