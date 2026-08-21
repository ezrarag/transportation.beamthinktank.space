'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Truck,
  Plane,
  Radio,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight,
  Users,
  Award,
  Building2,
  Wrench,
} from 'lucide-react'
import TransportHeader from '@/components/transport/TransportHeader'
import { FleetReadinessCounter } from '@/components/transport/FleetReadinessCounter'
import { DriverIntakeModule } from '@/components/transport/DriverIntakeModule'
import type { OperationalRoleTab } from '@/lib/types/driverPledge'

const ROLE_TRACK_DETAILS: Record<
  OperationalRoleTab,
  {
    title: string
    subtitle: string
    description: string
    vehicleAssets: string
    credentialsNeeded: string
    impact: string
  }
> = {
  drive: {
    title: 'Ground Transit & Rideshare',
    subtitle: 'Micro-transit, neighborhood shuttles, and local cargo delivery',
    description:
      'Pledge route hours to pilot ReadyAimGo transit vans and EV utility vehicles across Milwaukee and partner city corridors.',
    vehicleAssets: 'Ford Transit 148" AWD, Ram ProMaster 159", Light Urban EVs',
    credentialsNeeded: 'Standard Driver License (Class D) or Commercial Driver License (CDL)',
    impact: 'Provides zero-emission neighborhood transit and local business delivery.',
  },
  fly: {
    title: 'Aviation & Drone Flight',
    subtitle: 'Regional aviation corridors, student pilot tracks, and drone cargo',
    description:
      'Participate in regional aviation corridors, drone delivery trials, and flight training partnerships.',
    vehicleAssets: 'Light Aircraft, Modular Cargo Drones, Regional Air Assets',
    credentialsNeeded: 'FAA Part 107 Commercial Drone License or FAA Private/Commercial Pilot License',
    impact: 'Pioneers zero-emission regional aviation and aerial logistics.',
  },
  dispatch: {
    title: 'Fleet Dispatch & Routing',
    subtitle: 'Route optimization, telemetry monitoring, and logistics coordination',
    description:
      'Coordinate vehicle dispatch, monitor live battery/motor telemetry, and manage route schedules in real time.',
    vehicleAssets: 'BEAM Command Console, Telemetry Gateways, Fleet Routing Software',
    credentialsNeeded: 'No prior license required — on-the-job training provided',
    impact: 'Ensures safe, efficient, and data-driven fleet operations.',
  },
}

export default function TransportHomePage() {
  const [activeRoleTab, setActiveRoleTab] = useState<OperationalRoleTab>('drive')

  const scrollToSignup = () => {
    const el = document.getElementById('intake-module')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentRoleInfo = ROLE_TRACK_DETAILS[activeRoleTab]

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 pb-20">
      <TransportHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
        {/* 1. HERO BANNER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/50 border border-slate-800 p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Hardware Handoff Disclaimer Badge */}
          <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
            <span className="font-bold uppercase tracking-wider">Transit Operations Portal</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">EV Hardware Builds & Mechanical Fabrications →</span>
            <a
              href="https://forge.beamthinktank.space"
              target="_blank"
              rel="noreferrer"
              className="underline font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
            >
              forge.beamthinktank.space <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Headline & Subhead */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              COMMUNITY-POWERED TRANSIT & LOGISTICS
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Drive, fly, and dispatch for Milwaukee&apos;s zero-emission community fleet. Powered by open EV hardware and local hands.
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToSignup}
              className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition shadow-xl shadow-emerald-500/20 inline-flex items-center gap-2"
            >
              <Truck className="w-5 h-5" /> Claim Your Driver Seat
            </button>

            <Link
              href="/sponsor"
              className="px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Partner / Sponsor Access
            </Link>
          </div>
        </section>

        {/* 2. OPERATIONAL ROLE SELECTOR (INTERACTIVE TABS) */}
        <section className="space-y-6 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Zap className="w-4 h-4" /> Operational Role Selection
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Choose Your Transit Track
            </h2>
            <p className="text-slate-400 text-sm">
              Toggle between ground transit, aviation flight, and fleet dispatch to explore required credentials and asset details.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
            <button
              onClick={() => setActiveRoleTab('drive')}
              className={`px-5 py-3 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                activeRoleTab === 'drive'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Truck className="w-4 h-4" /> Ground Transit & Rideshare (drive)
            </button>

            <button
              onClick={() => setActiveRoleTab('fly')}
              className={`px-5 py-3 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                activeRoleTab === 'fly'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Plane className="w-4 h-4" /> Aviation & Flight (fly)
            </button>

            <button
              onClick={() => setActiveRoleTab('dispatch')}
              className={`px-5 py-3 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                activeRoleTab === 'dispatch'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Radio className="w-4 h-4" /> Fleet Dispatch & Routing (dispatch)
            </button>
          </div>

          {/* Role Details Card */}
          <motion.div
            key={activeRoleTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">{currentRoleInfo.title}</h3>
              <p className="text-emerald-400 text-sm font-semibold">{currentRoleInfo.subtitle}</p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{currentRoleInfo.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Assets</span>
                <p className="text-xs font-bold text-white">{currentRoleInfo.vehicleAssets}</p>
              </div>

              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Credentials Needed</span>
                <p className="text-xs font-bold text-white">{currentRoleInfo.credentialsNeeded}</p>
              </div>

              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Community Impact</span>
                <p className="text-xs font-bold text-emerald-400">{currentRoleInfo.impact}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToSignup}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700"
              >
                Pledge Hours for {currentRoleInfo.title} <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* 3. LIVE FLEET READINESS COUNTER (SOCIAL PROOF) */}
        <FleetReadinessCounter />

        {/* 4. DRIVER COMMITMENT & INTAKE MODULE */}
        <DriverIntakeModule />

        {/* 5. SPONSOR & MANUFACTURER PORTAL BANNER */}
        <section className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              For Component Manufacturers & Municipal Partners
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sponsor Telemetry & Operational Demand Portal
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Inspect real-time driver demand density maps, battery/motor telemetry test protocols (CMVTE, Golden Motor), and UWM/MATC university partnership milestones.
            </p>
          </div>

          <Link
            href="/sponsor"
            className="shrink-0 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" /> Open Sponsor Portal
          </Link>
        </section>
      </main>
    </div>
  )
}
