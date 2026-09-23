'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  MapPin, 
  Users, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  Building2, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react'
import TransportHeader from '@/components/transport/TransportHeader'
import TransportFooter from '@/components/transport/TransportFooter'
import SupplyCard from '@/components/dashboard/SupplyCard'
import FundingBreakdown from '@/components/dashboard/FundingBreakdown'
import ComparisonTable from '@/components/dashboard/ComparisonTable'
import GapScoreGauge from '@/components/dashboard/GapScoreGauge'
import AlternativeCostComparison from '@/components/dashboard/AlternativeCostComparison'
import IncidentForm from '@/components/dashboard/IncidentForm'
import AppleMessagesIncidentTrigger from '@/components/dashboard/AppleMessagesIncidentTrigger'
import SourceVerificationModal from '@/components/dashboard/SourceVerificationModal'
import { getCityMetadata, subscribeIncidentCount } from '@/lib/services/truthDashboard'
import type { CityTruthMetadata } from '@/lib/types/truthDashboard'

export default function CityTruthDashboardPage() {
  const params = useParams()
  const citySlug = (params?.citySlug as string) || 'leesburg-fl'

  const [metadata, setMetadata] = useState<CityTruthMetadata | null>(null)
  const [incidentCount, setIncidentCount] = useState<number>(0)

  useEffect(() => {
    // Load or seed metadata
    void getCityMetadata(citySlug).then((data) => {
      if (data) setMetadata(data)
    })

    // Real-time listener for community incidents count
    const unsubscribe = subscribeIncidentCount(citySlug, (count) => {
      setIncidentCount(count)
    })

    return () => unsubscribe()
  }, [citySlug])

  const cityName = metadata?.name || 'Leesburg, FL'
  const countyName = metadata?.county || 'Lake County'
  const population = metadata?.population?.toLocaleString() || '444,204'

  return (
    <div className="min-h-screen bg-transport-black text-white selection:bg-transport-amber selection:text-black">
      <TransportHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
        
        {/* DASHBOARD HEADER */}
        <section className="space-y-6 border-b border-white/10 pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Municipal Transit Truth Audit</span>
            </div>

            <div className="text-xs font-mono text-white/50 flex items-center gap-4">
              <span>NTD Agency ID: <strong className="text-white">40158 (LakeXpress)</strong></span>
              <span>Census FIPS: <strong className="text-white">12069</strong></span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display">
                {cityName.toUpperCase()}
              </h1>
              <p className="text-lg text-white/70 font-sans">
                {countyName} · Population {population} (2024 ACS Estimate)
              </p>
            </div>

            {/* REAL-TIME INCIDENT COUNTER BADGE */}
            {incidentCount > 0 ? (
              <div className="rounded-2xl border-2 border-red-500/40 bg-red-950/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-xl">
                <div>
                  <div className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                    Live Community Incident Log
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                    <span className="text-xl sm:text-2xl font-mono text-red-400 font-black mr-1.5">
                      {incidentCount}
                    </span>
                    {incidentCount === 1 ? 'community member has' : 'community members have'} documented transit gaps in Leesburg
                  </div>
                </div>

                <a
                  href="#section-intake"
                  className="shrink-0 px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition inline-flex items-center gap-1.5 shadow-lg shadow-red-500/20"
                >
                  <span>Add Your Account</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-xl">
                <div>
                  <div className="text-xs font-mono text-white/50 font-bold uppercase tracking-wider">
                    Community Evidence Ledger
                  </div>
                  <div className="text-sm font-semibold text-white/80 mt-0.5">
                    Document transit gaps, missed shifts, or route cutoffs in Leesburg.
                  </div>
                </div>
                <a
                  href="#section-intake"
                  className="shrink-0 px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition inline-flex items-center gap-1.5 shadow-lg shadow-red-500/20"
                >
                  <span>Log First Incident</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 1: TRANSIT SUPPLY (WHAT THEY CLAIM TO OFFER) */}
        <section id="section-supply" className="scroll-mt-24">
          <SupplyCard />
        </section>

        {/* SECTIONS 2 & 3: DEMOGRAPHICS (WHO NEEDS IT) & THE FUNDING LIE */}
        <section id="section-funding" className="scroll-mt-24">
          <FundingBreakdown />
        </section>

        {/* SECTION 4: COMPARISON (LAKEXPRESS VS LYNX) */}
        <section id="section-comparison" className="scroll-mt-24">
          <ComparisonTable />
        </section>

        {/* SECTION 5: GAP SCORE GAUGE (17% SEVERELY INADEQUATE) */}
        <section id="section-gap-score" className="scroll-mt-24">
          <GapScoreGauge />
        </section>

        {/* SECTION: PUBLIC EVIDENCE INTAKE (STEP SEQUENCED FORM + APPLE MESSAGES) */}
        <section id="section-intake" className="scroll-mt-24 space-y-8">
          <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                <FileText className="h-3.5 w-3.5" />
                <span>Public Evidence Intake</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Document a Transit Failure in Lake County
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-2xl font-sans">
                Missing work, medical visits, or childcare because LakeXpress has zero weekend routes or stops at 8 PM is a documented municipal failure. Your submission feeds directly into the public hearing dossier.
              </p>
            </div>

            <Link
              href="/admin/dashboard/leesburg-fl"
              className="shrink-0 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider transition inline-flex items-center gap-1.5"
            >
              <span>Admin Hearing Dossier</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Inbound Apple Messages / SMS Quick Trigger Option */}
          <AppleMessagesIncidentTrigger citySlug={citySlug} cityName={cityName} variant="card" />

          {/* Embedded Step-Sequenced Intake Form */}
          <div className="pt-2">
            <IncidentForm embedMode={true} citySlug={citySlug} />
          </div>
        </section>

        {/* SECTION 6: THE ALTERNATIVE (COST COMPARISON & MEETING FORM) */}
        <section id="section-alternative" className="scroll-mt-24">
          <AlternativeCostComparison />
        </section>

        {/* IN-FRAME SOURCE VERIFICATION EMBED POPUP */}
        <SourceVerificationModal />

      </main>

      <TransportFooter />
    </div>
  )
}
