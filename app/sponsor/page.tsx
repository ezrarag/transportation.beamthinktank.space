'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Zap,
  Activity,
  Cpu,
  MapPin,
  Users,
  Award,
  ExternalLink,
  Send,
  Building2,
  FileCheck,
  CheckCircle2,
} from 'lucide-react'
import TransportHeader from '@/components/transport/TransportHeader'

const DEMAND_DENSITY_CITIES = [
  { city: 'Milwaukee, WI', activePledges: 68, pledgedHours: 840, primaryTrack: 'Rideshare & Neighborhood Shuttles' },
  { city: 'Atlanta, GA', activePledges: 42, pledgedHours: 520, primaryTrack: 'Fintech Cargo & Light EV Delivery' },
  { city: 'Chicago, IL', activePledges: 24, pledgedHours: 310, primaryTrack: 'Regional Freight & Urban Micro-Transit' },
  { city: 'Green Bay, WI', activePledges: 14, pledgedHours: 180, primaryTrack: 'EV Shuttles & Repair Cohorts' },
]

const TELEMETRY_PROTOCOLS = [
  {
    id: 'proto-motor-eff',
    name: 'CMVTE 48V High-Torque Hub Motor Telemetry',
    sponsor: 'CMVTE / Golden Motor',
    status: 'Active Testing',
    metrics: '94.2% Efficiency Peak @ 45Nm Torque',
    description: 'Continuous thermal and current load testing across Milwaukee neighborhood shuttle routes.',
  },
  {
    id: 'proto-bms-thermal',
    name: 'LiFePO4 Modular Battery Thermal Protocol',
    sponsor: 'BEAM Open Hardware Lab',
    status: 'In Review',
    metrics: '< 2.1°C Cell Temp Variance @ 100A Discharge',
    description: 'Cold-weather thermal management testbed integrated into ReadyAimGo Transit vans.',
  },
  {
    id: 'proto-regen-brake',
    name: 'Bi-Directional Regenerative Braking Unit',
    sponsor: 'UWM Faculty R&D Track',
    status: 'Verified Benchmark',
    metrics: '+18.4% Energy Recovery per Route Cycle',
    description: 'Applied faculty-student telemetry mapping braking energy return on stop-and-go routes.',
  },
]

export default function SponsorPortalPage() {
  const [partnerName, setPartnerName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [componentType, setComponentType] = useState('Motors & Drivetrain')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmitAccess = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 pb-20">
      <TransportHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Portal Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Component Sponsor & Manufacturer Portal
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Sponsor Telemetry & Operational Demand Network
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Demonstrating verified driver demand density and real-world hardware telemetry to component sponsors like <strong className="text-emerald-400">CMVTE</strong> and <strong className="text-emerald-400">Golden Motor</strong>. EV hardware builds and mechanical fabrications are executed at <a href="https://forge.beamthinktank.space" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-semibold hover:text-cyan-300">forge.beamthinktank.space</a>.
            </p>
          </div>
        </section>

        {/* 1. DRIVER DEMAND DENSITY MAPS */}
        <section className="space-y-6 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold text-white">Driver Demand Density by Hub</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Verified driver sign-ups and pledged weekly route hours available for vehicle deployment.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Live Network Feed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEMAND_DENSITY_CITIES.map((cityData) => (
              <div key={cityData.city} className="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{cityData.city}</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-white">{cityData.activePledges}</span>
                    <span className="text-xs text-slate-400">Pledged Drivers</span>
                  </div>
                  <div className="text-xs text-amber-400 font-mono font-bold">
                    {cityData.pledgedHours} hrs/wk pledged
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  {cityData.primaryTrack}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. BATTERY & MOTOR TELEMETRY TEST PROTOCOLS */}
        <section className="space-y-6 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Battery & Motor Telemetry Test Protocols</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Field performance benchmarks logged directly from BEAM community fleet vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TELEMETRY_PROTOCOLS.map((proto) => (
              <div key={proto.id} className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {proto.status}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{proto.sponsor}</span>
                  </div>

                  <h3 className="text-md font-bold text-white">{proto.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proto.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-emerald-400" /> {proto.metrics}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. UNIVERSITY PARTNERSHIP MILESTONES */}
        <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Institutional & Academic Benchmarks</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Embedded faculty research and student credentialing with UWM & MATC.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">UWM Conservatory Network</span>
              <h3 className="text-lg font-bold text-white">Applied Faculty R&D & EV Powertrain Telemetry</h3>
              <p className="text-xs text-slate-300">
                UWM faculty guide applied research in EV conversion efficiency, telemetry logging, and local manufacturing readiness.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">MATC Applied Tech</span>
              <h3 className="text-lg font-bold text-white">ASE Certification & Maintenance Cohorts</h3>
              <p className="text-xs text-slate-300">
                Students earn ASE credentials and real-world service logs working on active ReadyAimGo fleet vehicles.
              </p>
            </div>
          </div>
        </section>

        {/* 4. SPONSOR COMPONENT TESTING REQUEST */}
        <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Request Component Testing or Sponsor Data Access</h2>
            <p className="text-xs text-slate-400 mt-1">
              Connect with BEAM Transportation staff to submit hardware for fleet telemetry testing or sponsor municipal vehicle cohorts.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/50 p-6 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Sponsor Inquiry Submitted</h3>
              <p className="text-xs text-slate-300">
                Thank you! A BEAM network director will reach out shortly regarding testing telemetry access.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitAccess} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Organization / Manufacturer Name (e.g. Golden Motor)"
                  required
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="bg-slate-950 text-white text-xs rounded-xl border border-slate-700 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                <input
                  type="email"
                  placeholder="Contact Email Address"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="bg-slate-950 text-white text-xs rounded-xl border border-slate-700 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <textarea
                placeholder="Specify component testing requirements or telemetry partnership interest..."
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl border border-slate-700 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
              >
                <Send className="w-4 h-4" /> Submit Sponsor Inquiry
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  )
}
