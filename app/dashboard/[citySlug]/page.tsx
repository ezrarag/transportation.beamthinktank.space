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
import { getCityMetadata, subscribeIncidentCount } from '@/lib/services/truthDashboard'
import type { CityTruthMetadata } from '@/lib/types/truthDashboard'

export default function CityTruthDashboardPage() {
  const params = useParams()
  const citySlug = (params?.citySlug as string) || 'leesburg-fl'

  const [metadata, setMetadata] = useState<CityTruthMetadata | null>(null)
  const [incidentCount, setIncidentCount] = useState<number>(14)

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
            <div className="rounded-2xl border-2 border-red-500/40 bg-red-950/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-xl">
              <div>
                <div className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                  Live Community Incident Log
                </div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                  <span className="text-xl sm:text-2xl font-mono text-red-400 font-black mr-1.5">
                    {incidentCount}
                  </span>
                  community members have documented transit gaps in Leesburg
                </div>
              </div>

              <Link
                href="/dashboard/report"
                className="shrink-0 px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition inline-flex items-center gap-1.5 shadow-lg shadow-red-500/20"
              >
                <span>Add Your Account</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
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

        {/* COMMUNITY INCIDENT SUBMISSION CTA CARD */}
        <section className="rounded-3xl border-2 border-red-500 bg-gradient-to-br from-red-950/40 via-transport-steel to-black p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-red-400">
              Community Evidentiary Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Have You Experienced a Transit Failure in Lake County?
            </h2>
            <p className="text-sm text-white/80 leading-relaxed font-sans">
              Missing work, hospital visits, or child drop-offs because LakeXpress has zero weekend routes or stops at 8 PM is not your fault. It is a documented systemic failure. Enter your account to be cited in official city hall hearings.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard/report"
              className="px-9 py-4 rounded-full bg-red-500 hover:bg-red-400 text-white font-extrabold text-sm uppercase tracking-wider transition shadow-2xl shadow-red-500/30 inline-flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Submit Your Incident Record</span>
            </Link>

            <Link
              href="/admin/dashboard/leesburg-fl"
              className="px-6 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider transition"
            >
              Admin Hearing Dossier →
            </Link>
          </div>
        </section>

        {/* SECTION 6: THE ALTERNATIVE (COST COMPARISON & MEETING FORM) */}
        <section id="section-alternative" className="scroll-mt-24">
          <AlternativeCostComparison />
        </section>

      </main>

      <TransportFooter />
    </div>
  )
}
