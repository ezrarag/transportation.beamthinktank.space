'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  ShieldCheck, 
  BarChart3, 
  Car, 
  Globe, 
  Users, 
  LayoutDashboard,
  Radio,
  ArrowRight
} from 'lucide-react'
import UserMenu from '@/components/UserMenu'
import { resolvePortalPath } from '@/lib/portal/routes'

const PORTAL_TRACKS = [
  { id: 'drive', doorNumber: '01', label: 'Ground Transit', subtitle: 'Rideshare & Shuttles', accent: '#10B981', href: '/#intake-module' },
  { id: 'fly', doorNumber: '02', label: 'Aviation & Drone Flight', subtitle: 'Flight Corridors & Drone Cargo', accent: '#06B6D4', href: '/#intake-module' },
  { id: 'dispatch', doorNumber: '03', label: 'Fleet Dispatch & Routing', subtitle: 'Telemetry & Route Optimization', accent: '#6366F1', href: '/#intake-module' },
]

const ECOSYSTEM_PAGES = [
  { label: 'Truth Dashboard', href: '/dashboard/leesburg-fl', icon: BarChart3, badge: 'Live Audit' },
  { label: 'Fleet Gallery', href: '/fleet', icon: Car },
  { label: 'Public Viewer', href: resolvePortalPath('/viewer', 'transport'), icon: Globe },
  { label: 'Cohort & Crew', href: resolvePortalPath('/cohort', 'transport'), icon: Users },
  { label: 'Sponsor Telemetry', href: '/sponsor', icon: Radio },
  { label: 'Admin Hub', href: resolvePortalPath('/admin', 'transport'), icon: LayoutDashboard },
]

export default function TransportHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-[#07080B]/60 backdrop-blur-xl border-b border-white/5 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Branding Bar with Unified Dropdown (matching grounds.beamthinktank.space) */}
        <div className="flex items-center space-x-2.5 font-mono text-xs uppercase tracking-[0.25em] text-white/70">
          <Link 
            href={resolvePortalPath('/', 'transport')} 
            className="font-bold text-white tracking-widest text-sm hover:text-emerald-400 transition"
          >
            BEAM
          </Link>
          <span className="text-white/30">·</span>

          {/* Clickable 'Transportation' Unified Dropdown Toggle */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1.5 font-semibold text-emerald-400 hover:text-emerald-300 transition-all focus:outline-none py-1.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer"
              aria-expanded={isDropdownOpen}
              aria-label="Transportation directory and track selector"
            >
              <span>Transportation</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Unified Floating Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-80 rounded-2xl bg-[#0B0E16]/95 backdrop-blur-2xl border border-white/15 p-3 shadow-2xl z-50 text-left normal-case tracking-normal text-white divide-y divide-white/10"
                >
                  {/* Ecosystem Portals */}
                  <div className="pb-3 space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">
                      Portals & Telemetry
                    </div>
                    {ECOSYSTEM_PAGES.map((page) => {
                      const Icon = page.icon
                      return (
                        <Link
                          key={page.href}
                          href={page.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition group"
                        >
                          <div className="flex items-center space-x-2.5">
                            <Icon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                            <span>{page.label}</span>
                          </div>
                          {page.badge && (
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                              {page.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Operational Tracks */}
                  <div className="pt-3 space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">
                      Operational Tracks
                    </div>
                    {PORTAL_TRACKS.map((track) => (
                      <Link
                        key={track.id}
                        href={track.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full flex items-start space-x-3 p-2.5 rounded-xl transition hover:bg-white/10 text-white/70 hover:text-white group"
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: track.accent }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold flex items-center justify-between gap-1 text-white">
                            <span>{track.label}</span>
                            <span className="text-[10px] font-mono text-white/40">({track.doorNumber})</span>
                          </div>
                          <div className="text-[11px] text-white/50 leading-tight mt-0.5">
                            {track.subtitle}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Sponsor Portal Link */}
                  <div className="pt-2">
                    <Link
                      href="/sponsor"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl transition hover:bg-white/10 text-emerald-400 hover:text-emerald-300"
                    >
                      <div className="flex items-center space-x-2 text-xs font-bold">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Sponsor Demand & Telemetry</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Navigation: Only the clean User Profile & Sign-In Dropdown */}
        <div className="flex items-center space-x-3">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
