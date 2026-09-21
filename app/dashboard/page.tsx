'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, ShieldAlert, FileText, CheckCircle2, Building, Bus } from 'lucide-react'
import TransportHeader from '@/components/transport/TransportHeader'
import TransportFooter from '@/components/transport/TransportFooter'

export default function DashboardLandingPage() {
  return (
    <div className="min-h-screen bg-transport-black text-white selection:bg-transport-amber selection:text-black flex flex-col justify-between">
      <TransportHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 w-full flex-1">
        
        {/* Hero Section */}
        <section className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider text-red-400">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Public Evidentiary Instrument</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05] font-display">
            BEAM TRANSPORTATION TRUTH DASHBOARD
          </h1>

          <p className="text-base sm:text-xl text-white/80 leading-relaxed font-sans">
            A public evidentiary dashboard that exposes the structural gap between what local governments claim about public transit demand and what federal and state data actually proves. Every number displayed links directly to its federal or state source document. Designed for civic organizers, legal filings, city council testimony, and grant applications.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard/report"
              className="px-8 py-4 rounded-full bg-red-500 hover:bg-red-400 text-white font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-red-500/20 inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              <FileText className="h-4 w-4" />
              <span>Submit a Transportation Incident</span>
            </Link>

            <Link
              href="/dashboard/leesburg-fl"
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider transition inline-flex items-center gap-2"
            >
              <span>Explore Leesburg, FL Pilot</span>
              <ArrowRight className="h-4 w-4 text-transport-amber" />
            </Link>
          </div>
        </section>

        {/* Cities Section */}
        <section className="space-y-6 border-t border-white/10 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-signal">
                Operational Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Active Municipal Audit Hubs
              </h2>
            </div>
            <span className="text-xs text-white/50 font-mono">
              BEAM Civic Research Network
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* City Card 1: Leesburg, FL (Active Pilot) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl border border-white/15 bg-gradient-to-br from-transport-steel/80 via-[#0D1017] to-black p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="px-3 py-1 rounded-full bg-transport-signal/20 text-transport-signal border border-transport-signal/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Pilot Live
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/60 text-xs font-mono">
                  <MapPin className="h-4 w-4 text-red-400" />
                  <span>Lake County, FL · FIPS: 12069</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Leesburg, FL</h3>
                  <p className="text-xs text-white/60 font-mono mt-0.5">County Population: 444,204</p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-white/70 font-sans border-t border-white/10">
                  <div className="flex justify-between py-1 border-b border-white/5 font-mono">
                    <span className="text-white/50">Transit System:</span>
                    <span className="text-white font-bold">LakeXpress (NTD: 40158)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5 font-mono">
                    <span className="text-white/50">Weekend Service:</span>
                    <span className="text-red-400 font-bold">0 Days (None)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5 font-mono">
                    <span className="text-white/50">Adequacy Score:</span>
                    <span className="text-red-400 font-bold">17% (Severe Gap)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard/leesburg-fl"
                  className="w-full py-3.5 rounded-2xl bg-transport-signal hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-transport-signal/20 flex items-center justify-center gap-2"
                >
                  <span>View Full Truth Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* City Card 2: Milwaukee, WI (Next Expansion) */}
            <div className="rounded-3xl border border-white/10 bg-transport-steel/20 p-6 sm:p-8 flex flex-col justify-between space-y-6 opacity-60">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
                  <MapPin className="h-4 w-4 text-white/40" />
                  <span>Milwaukee County, WI</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white/70">Milwaukee, WI</h3>
                  <p className="text-xs text-white/40 font-mono mt-0.5">Fleet Cohort Operations Active</p>
                </div>
                <p className="text-xs text-white/50 leading-relaxed font-sans pt-2 border-t border-white/10">
                  Zero-emission rideshare shuttles and student dispatch corridors currently undergoing baseline telemetry auditing.
                </p>
              </div>
              <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider text-center py-3 bg-white/5 rounded-2xl">
                [ Telemetry Gathering ]
              </div>
            </div>

            {/* City Card 3: Atlanta, GA (Next Expansion) */}
            <div className="rounded-3xl border border-white/10 bg-transport-steel/20 p-6 sm:p-8 flex flex-col justify-between space-y-6 opacity-60">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
                  <MapPin className="h-4 w-4 text-white/40" />
                  <span>Fulton County, GA</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white/70">Atlanta, GA</h3>
                  <p className="text-xs text-white/40 font-mono mt-0.5">Regional Corridor Audit</p>
                </div>
                <p className="text-xs text-white/50 leading-relaxed font-sans pt-2 border-t border-white/10">
                  Micromobility and EV cargo dispatch feasibility models preparing for municipal comparative filings.
                </p>
              </div>
              <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider text-center py-3 bg-white/5 rounded-2xl">
                [ In Development ]
              </div>
            </div>

          </div>
        </section>

      </main>

      <TransportFooter />
    </div>
  )
}
