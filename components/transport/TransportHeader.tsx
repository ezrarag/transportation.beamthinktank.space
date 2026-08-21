'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ShieldCheck } from 'lucide-react'
import UserMenu from '@/components/UserMenu'
import { resolvePortalPath } from '@/lib/portal/routes'

const PORTAL_TRACKS = [
  { id: 'drive', doorNumber: '01', label: 'Ground Transit', subtitle: 'Rideshare & Shuttles', accent: '#10B981', href: '/#intake-module' },
  { id: 'fly', doorNumber: '02', label: 'Aviation & Drone Flight', subtitle: 'Flight Corridors & Drone Cargo', accent: '#06B6D4', href: '/#intake-module' },
  { id: 'dispatch', doorNumber: '03', label: 'Fleet Dispatch & Routing', subtitle: 'Telemetry & Route Optimization', accent: '#6366F1', href: '/#intake-module' },
]

const NAV_ITEMS = [
  { label: 'Profile', href: '/profile' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Viewer', href: resolvePortalPath('/viewer', 'transport') },
  { label: 'Cohort', href: resolvePortalPath('/cohort', 'transport') },
  { label: 'Sponsor Telemetry', href: '/sponsor', isHighlight: true },
  { label: 'Admin', href: resolvePortalPath('/admin', 'transport') },
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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080b]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Left Branding Bar with Orchestra-style Dropdown */}
        <div className="flex items-center space-x-3 text-xs tracking-[0.25em] uppercase text-white/60">
          <Link href={resolvePortalPath('/', 'transport')} className="font-bold text-white tracking-widest text-sm hover:text-emerald-400 transition">
            BEAM
          </Link>
          <span className="text-white/30">·</span>

          {/* Clickable 'Transportation' Dropdown Toggle */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1.5 font-semibold text-emerald-400 hover:text-emerald-300 transition-all focus:outline-none py-1 px-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40"
              aria-expanded={isDropdownOpen}
              aria-label="Transportation track selector"
            >
              <span>Transportation</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-[#090b14]/95 backdrop-blur-xl border border-white/15 p-2 shadow-2xl z-50 text-left normal-case tracking-normal"
                >
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 border-b border-white/10 mb-1">
                    Select Operational Track
                  </div>

                  {PORTAL_TRACKS.map((track) => (
                    <Link
                      key={track.id}
                      href={track.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-start space-x-3 p-3 rounded-xl transition-all hover:bg-white/10 text-white/70 hover:text-white"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: track.accent }}
                      />
                      <div>
                        <div className="text-xs font-bold flex items-center justify-between gap-2">
                          <span className="text-white">{track.label}</span>
                          <span className="text-[10px] font-mono text-white/40">({track.doorNumber})</span>
                        </div>
                        <div className="text-[11px] text-white/50 leading-tight mt-0.5">
                          {track.subtitle}
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* Sponsor Link in Dropdown */}
                  <Link
                    href="/sponsor"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-start space-x-3 p-3 rounded-xl transition-all hover:bg-white/10 text-white/70 hover:text-white border-t border-white/10 mt-1"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-emerald-400">Sponsor Telemetry Portal</div>
                      <div className="text-[11px] text-white/50 leading-tight mt-0.5">
                        Inspect demand maps & EV telemetry
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Navigation */}
        <nav className="hidden items-center gap-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                item.isHighlight
                  ? 'text-emerald-400 hover:text-emerald-300 font-bold'
                  : 'hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <UserMenu />
      </div>
    </header>
  )
}
