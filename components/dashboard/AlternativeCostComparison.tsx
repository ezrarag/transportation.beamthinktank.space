'use client'

import { useState } from 'react'
import { DollarSign, ShieldAlert, Sparkles, Check, ArrowRight, ExternalLink, Calendar, Wrench, ShieldCheck } from 'lucide-react'
import SourceCitation from './SourceCitation'
import MeetingRequestModal from './MeetingRequestModal'

export default function AlternativeCostComparison() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-signal">
            Section 06 · The Economic Solution
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">What This Costs vs What BEAM Offers</h3>
        </div>
        <span className="text-xs text-white/50 font-mono">
          Municipal Contract Feasibility Model
        </span>
      </div>

      {/* Two-Column Cost Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column 1: Current Government System */}
        <div className="rounded-3xl border border-red-500/30 bg-red-950/20 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldAlert className="h-4 w-4" />
              <span>Current Status Quo (LakeXpress)</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">Taxpayer Cost Per Ride</span>
              <div className="text-4xl sm:text-5xl font-black text-red-400 font-mono">
                $26.66 <span className="text-lg font-normal text-white/60">/ trip</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-white/80 font-sans divide-y divide-white/10 pt-2">
              <li className="pt-2 flex justify-between">
                <span className="text-white/60">Annual Operating Expense (2022):</span>
                <span className="font-mono font-bold text-white">$6,993,493</span>
              </li>
              <li className="pt-2 flex justify-between">
                <span className="text-white/60">Annual Unlinked Trips Delivered:</span>
                <span className="font-mono font-bold text-white">262,313 rides</span>
              </li>
              <li className="pt-2 flex justify-between">
                <span className="text-white/60">Local Lake County Tax Contribution:</span>
                <span className="font-mono font-bold text-red-300">$422,746 / yr</span>
              </li>
              <li className="pt-2 flex justify-between">
                <span className="text-white/60">Weekend Service Level:</span>
                <span className="font-mono font-bold text-red-400">0 Days ($0/service)</span>
              </li>
              <li className="pt-2 flex justify-between">
                <span className="text-white/60">Night Service:</span>
                <span className="font-mono font-bold text-red-400">Zero service after ~8 PM</span>
              </li>
            </ul>

            <div className="rounded-xl border border-red-500/20 bg-black/40 p-4 text-xs text-white/80 leading-relaxed font-mono">
              <strong>Translation:</strong> The government spends $26.66 to move one person one time on a weekday in Lake County. That same rider on a weekend? $0 of service. $0 of cost. Because the government has decided weekends do not count.
            </div>
          </div>

          <SourceCitation
            name="FTA NTD 2022 Profile (Agency 40158, Operating Metrics)"
            url="https://www.transit.dot.gov/sites/fta.dot.gov/files/transit_agency_profile_doc/2022/40158.pdf"
          />
        </div>

        {/* Column 2: BEAM Community Fleet Alternative */}
        <div className="rounded-3xl border-2 border-transport-signal/50 bg-transport-steel/60 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-transport-signal/20 text-transport-signal text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>BEAM Community Fleet Model</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">Proposed Local Contract Cost</span>
              <div className="text-4xl sm:text-5xl font-black text-transport-signal font-mono">
                $200,000 <span className="text-lg font-normal text-white/60">/ year</span>
              </div>
              <p className="text-xs text-transport-signal font-medium">Less than half the $422k county local subsidy</p>
            </div>

            <ul className="space-y-3 text-xs text-white/80 font-sans divide-y divide-white/10 pt-2">
              <li className="pt-2 flex justify-between items-center">
                <span className="text-white/60">Service Schedule:</span>
                <span className="font-mono font-bold text-transport-signal">7 Days / Week (Including Weekends)</span>
              </li>
              <li className="pt-2 flex justify-between items-center">
                <span className="text-white/60">Operating Window:</span>
                <span className="font-mono font-bold text-white">Daily until 10:00 PM</span>
              </li>
              <li className="pt-2 flex justify-between items-center">
                <span className="text-white/60">Fleet Maintenance Cost:</span>
                <span className="font-mono font-bold text-transport-signal">$175 / mo / vehicle</span>
              </li>
              <li className="pt-2 flex justify-between items-center">
                <span className="text-white/60">Local Workforce Model:</span>
                <span className="font-mono font-bold text-white">Youth & Resident Cohort Stipends</span>
              </li>
              <li className="pt-2 flex justify-between items-center">
                <span className="text-white/60">Public Reporting:</span>
                <span className="font-mono font-bold text-white">Monthly Public Telemetry Audits</span>
              </li>
            </ul>

            <div className="rounded-xl border border-transport-signal/20 bg-black/40 p-4 text-xs text-white/80 leading-relaxed font-mono">
              <strong>10-Vehicle Community Fleet Math:</strong> Fleet maintenance at $175/mo ($21,000/yr) + insurance estimate ($6,000/yr) + driver stipends funded via municipal contract & federal grants.
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <a
                href="https://www.transit.dot.gov/funding/grants/urbanized-area-formula-grants-5307"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded bg-white/10 px-2.5 py-1 text-transport-signal hover:underline"
              >
                <span>FTA Section 5307 Eligibility</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://www.transit.dot.gov/rural-formula-grants-5311"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded bg-white/10 px-2.5 py-1 text-transport-signal hover:underline"
              >
                <span>FTA Section 5311 Rural Grants</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Contract Call to Action */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-transport-steel via-[#0F141F] to-black p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-signal">
            <ShieldCheck className="h-4 w-4" />
            <span>For Local Government, Automotive Dealerships & Community Leaders</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
            Schedule a City Council or Fleet Contract Presentation
          </h4>
          <p className="text-sm text-white/70 leading-relaxed">
            BEAM Transportation partners with municipal councils, regional dealerships, and community organizations to deploy responsive community transit fleets at a fraction of bureaucratic overhead.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="shrink-0 px-8 py-4 rounded-full bg-transport-signal hover:bg-emerald-400 text-black font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-transport-signal/20 inline-flex items-center gap-2 hover:-translate-y-0.5"
        >
          <span>Request a Meeting</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Meeting Request Modal */}
      <MeetingRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        citySlug="leesburg-fl"
      />
    </div>
  )
}
