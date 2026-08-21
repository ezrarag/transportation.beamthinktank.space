'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Truck,
  Plane,
  Radio,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Play,
  Pause,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'
import TransportHeader from '@/components/transport/TransportHeader'
import TransportFooter from '@/components/transport/TransportFooter'
import { FleetReadinessCounter } from '@/components/transport/FleetReadinessCounter'
import ProgressiveIntakeWizardModal from '@/components/transport/ProgressiveIntakeWizardModal'
import type { OperationalRoleTab } from '@/lib/types/driverPledge'

interface TrackCategory {
  id: OperationalRoleTab
  doorNumber: string
  label: string
  subtitle: string
  description: string
  colorAccent: string
  icon: React.ElementType
}

const TRACK_CATEGORIES: TrackCategory[] = [
  {
    id: 'drive',
    doorNumber: '01',
    label: 'Ground Transit & Micro-Mobility',
    subtitle: 'Neighborhood Shuttles & EV Delivery',
    description:
      'Pledge route hours to pilot ReadyAimGo transit vans and EV utility vehicles across Milwaukee and partner city corridors.',
    colorAccent: '#10B981', // Emerald
    icon: Truck,
  },
  {
    id: 'fly',
    doorNumber: '02',
    label: 'Aviation & Cargo Drone Flight',
    subtitle: 'Regional Corridors & Pilot Tracks',
    description:
      'Participate in regional aviation corridors, drone delivery trials, and student pilot training partnerships.',
    colorAccent: '#06B6D4', // Cyan
    icon: Plane,
  },
  {
    id: 'dispatch',
    doorNumber: '03',
    label: 'Fleet Dispatch & Routing',
    subtitle: 'Telemetry Monitoring & Command Console',
    description:
      'Coordinate vehicle dispatch, monitor live battery/motor telemetry, and manage route schedules in real time.',
    colorAccent: '#6366F1', // Indigo
    icon: Radio,
  },
]

const AUTO_ADVANCE_MS = 6500

export default function TransportHomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [selectedWizardRole, setSelectedWizardRole] = useState<OperationalRoleTab>('drive')
  const [isAutoplayActive, setIsAutoplayActive] = useState(false)

  const activeCategory = TRACK_CATEGORIES[activeIndex]

  // Autoplay slider effect (disabled by default, can be toggled by user)
  useEffect(() => {
    if (!isAutoplayActive || isWizardOpen) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TRACK_CATEGORIES.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [isAutoplayActive, isWizardOpen])

  const openWizardWithRole = (role: OperationalRoleTab) => {
    setSelectedWizardRole(role)
    setIsWizardOpen(true)
  }

  const showPrevious = () => {
    if (isAutoplayActive) setIsAutoplayActive(false)
    setActiveIndex((prev) => (prev - 1 + TRACK_CATEGORIES.length) % TRACK_CATEGORIES.length)
  }

  const showNext = () => {
    if (isAutoplayActive) setIsAutoplayActive(false)
    setActiveIndex((prev) => (prev + 1) % TRACK_CATEGORIES.length)
  }

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f0ead6] selection:bg-emerald-500 selection:text-black">
      {/* HEADER */}
      <TransportHeader />

      {/* 1. MINIMALIST HERO STAGE SECTION (Matching Orchestra HeroStage) */}
      <section className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden isolate">
        
        {/* Dynamic Color Radial Ambient Glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background: `radial-gradient(ellipse at 75% 35%, ${activeCategory.colorAccent}20, transparent 65%)`,
          }}
        />

        {/* Subtle Backdrop Grid / Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,8,11,0.85)_100%)]" />
        <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(180deg,rgba(7,8,11,0.7)_0%,rgba(7,8,11,0.4)_50%,rgba(7,8,11,0.95)_100%)]" />

        {/* Sub-Header Hardware Handoff Badge & Slide Index */}
        <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between text-xs tracking-[0.25em] uppercase text-white/60">
          
          {/* Hardware Handoff Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span className="text-emerald-400 font-bold uppercase">Zero-Emission Fleet</span>
            <span className="text-white/30">|</span>
            <span>EV Hardware:</span>
            <a
              href="https://forge.beamthinktank.space"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-bold underline inline-flex items-center gap-1"
            >
              forge.beamthinktank.space <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Slide Counter */}
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-white font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="text-white/30">/</span>
            <span>{String(TRACK_CATEGORIES.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* MAIN PUNCHY HERO CONTENT */}
        <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 my-auto flex flex-col justify-center">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="max-w-4xl space-y-6"
            >
              {/* Category Track Pill */}
              <div
                className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs uppercase tracking-[0.25em] font-semibold border backdrop-blur-md"
                style={{
                  color: activeCategory.colorAccent,
                  borderColor: `${activeCategory.colorAccent}40`,
                  backgroundColor: `${activeCategory.colorAccent}10`,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Track {activeCategory.doorNumber} · {activeCategory.subtitle}</span>
              </div>

              {/* Punchy Hero Title */}
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] uppercase">
                COMMUNITY-POWERED TRANSIT & LOGISTICS
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl text-base sm:text-xl text-white/80 leading-relaxed font-sans">
                Drive, fly, and dispatch for Milwaukee&apos;s zero-emission community fleet.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {/* Primary CTA Button: [ Claim Your Seat ] */}
                <button
                  onClick={() => openWizardWithRole(activeCategory.id)}
                  className="inline-flex items-center gap-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-[#07080b] px-9 py-4 text-sm sm:text-base font-extrabold shadow-2xl transition-all hover:-translate-y-0.5"
                >
                  [ Claim Your Seat ]
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Secondary CTA: Progressive Intake Quick Trigger */}
                <button
                  onClick={() => openWizardWithRole(activeCategory.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all"
                >
                  Pledge Hours ({activeCategory.label})
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM CONTROLS & SLIDER ACTION (Matching Orchestra) */}
        <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-10 flex items-end justify-between gap-6">
          
          {/* Track Progress Pills / Indicators */}
          <div className="flex items-center gap-3">
            {TRACK_CATEGORIES.map((cat, index) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (isAutoplayActive) setIsAutoplayActive(false)
                  setActiveIndex(index)
                }}
                aria-label={`Show ${cat.label}`}
                className="flex h-8 items-center"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-12' : 'w-3 bg-white/30 hover:bg-white/60'
                  }`}
                  style={index === activeIndex ? { backgroundColor: cat.colorAccent } : undefined}
                />
              </button>
            ))}
          </div>

          {/* Carousel Controls (Prev/Next Arrows + Autoplay Toggle) */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsAutoplayActive(!isAutoplayActive)}
              aria-label={isAutoplayActive ? 'Pause slider autoplay' : 'Start slider autoplay'}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/20 transition-all backdrop-blur-md"
              title={isAutoplayActive ? 'Pause Autoplay' : 'Start Autoplay'}
            >
              {isAutoplayActive ? <Pause className="h-4 w-4 text-emerald-400" /> : <Play className="h-4 w-4 text-white/70" />}
            </button>

            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous track"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/20 transition-all backdrop-blur-md"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next track"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/20 transition-all backdrop-blur-md"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

      </section>

      {/* 2. SECONDARY CONTENT: LIVE FLEET READINESS (REPOSITIONED BELOW THE FOLD) */}
      <section className="relative z-20 bg-[#0a0d14] border-t border-white/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400">
                Below The Fold Telemetry
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Fleet Readiness & Operational Demand
              </h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Real-time aggregated driver pledges and operational readiness metrics verified across Milwaukee, Atlanta, Chicago, Green Bay, and Madison.
              </p>
            </div>

            <button
              onClick={() => openWizardWithRole('drive')}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition inline-flex items-center gap-2"
            >
              Pledge Your Route Hours <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          {/* Minimal Grid Ticker */}
          <FleetReadinessCounter />
        </div>
      </section>

      {/* 3. PROGRESSIVE INTAKE WIZARD MODAL */}
      <ProgressiveIntakeWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        initialRole={selectedWizardRole}
      />

      {/* 4. FOOTER (Includes Discrete Text Link to Sponsor Telemetry Portal) */}
      <TransportFooter />
    </div>
  )
}
