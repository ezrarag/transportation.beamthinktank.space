'use client'

import Link from 'next/link'
import { Truck, ExternalLink, ShieldCheck, Zap } from 'lucide-react'
import { useUserRole } from '@/lib/hooks/useUserRole'

export default function TransportFooter() {
  const { role } = useUserRole()
  const isAdmin = role === 'beam_admin'

  return (
    <footer className="bg-[#07080b] border-t border-white/10 text-slate-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase font-mono">
                BEAM Transportation
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Milwaukee community-powered transit & logistics fleet. Operating zero-emission micro-transit, regional flight corridors, and telemetry-driven dispatch hubs.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>EV Hardware Fabrications:</span>
              <a
                href="https://forge.beamthinktank.space"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline inline-flex items-center gap-1"
              >
                forge.beamthinktank.space <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 font-mono">
              Transit Operations
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home Landing Page
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-emerald-400 transition-colors">
                  Operator Profile & Hours
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:text-emerald-400 transition-colors">
                  Fleet Readiness & Assets
                </Link>
              </li>
              <li>
                <Link href="/viewer" className="hover:text-emerald-400 transition-colors">
                  Live Dispatch Streams
                </Link>
              </li>
              <li>
                <Link href="/cohort" className="hover:text-emerald-400 transition-colors">
                  City Cohorts & Hubs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Governance (Discrete Text Link for Sponsor Portal) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 font-mono">
              Partner & Sponsor Portals
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/sponsor"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sponsor Telemetry & Operational Demand Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-slate-200 transition-colors text-slate-400">
                  Municipal Partner Network
                </Link>
              </li>
              <li>
                <Link href="/publishing" className="hover:text-slate-200 transition-colors text-slate-400">
                  Telemetry Data Publications
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-slate-200 transition-colors text-slate-400">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BEAM Transportation Infrastructure. All rights reserved.</p>
          {isAdmin && (
            <Link href="/admin/dashboard" className="text-emerald-400/70 hover:text-emerald-400 font-mono">
              [ Admin Mode Active ]
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
