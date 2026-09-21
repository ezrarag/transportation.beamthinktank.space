'use client'

import { HelpCircle, Check, X } from 'lucide-react'
import SourceCitation from './SourceCitation'

export default function ComparisonTable() {
  const rows = [
    {
      metric: 'Days of Service',
      lake: 'Mon – Fri Only (5 days)',
      orange: '7 Days / Week',
      lakeFailed: true,
    },
    {
      metric: 'Saturday Service',
      lake: 'None (0 routes)',
      orange: 'Full Countywide Service',
      lakeFailed: true,
    },
    {
      metric: 'Sunday Service',
      lake: 'None (0 routes)',
      orange: 'Full Countywide Service',
      lakeFailed: true,
    },
    {
      metric: 'Bus Headway (Wait Time)',
      lake: '60 Minutes',
      orange: '15 – 30 Minutes on major corridors',
      lakeFailed: true,
    },
    {
      metric: 'Evening Service',
      lake: 'Stops at ~8 PM',
      orange: 'Until Midnight+ (Select 24hr)',
      lakeFailed: true,
    },
    {
      metric: 'Annual Transit Trips',
      lake: '262,313 unlinked trips',
      orange: '~26,000,000 unlinked trips',
      lakeFailed: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
            Section 04 · Regional Benchmark
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">How Other Places Do It</h3>
        </div>
        <span className="text-xs text-white/50 font-mono">
          Central Florida Peer Analysis · FTA Formula 5307 Beneficiaries
        </span>
      </div>

      <p className="text-sm text-white/70 max-w-3xl leading-relaxed">
        Lake County and Orange County share the same Central Florida regional corridor and receive federal transit grants under the same federal formulas. Population alone does not explain a 99x difference in mobility.
      </p>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-transport-steel/40 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-xs font-mono uppercase tracking-wider text-white/60">
                <th className="p-4 sm:p-5">Performance Metric</th>
                <th className="p-4 sm:p-5 text-red-400 bg-red-950/20 border-l border-white/10">
                  Lake County (LakeXpress)
                </th>
                <th className="p-4 sm:p-5 text-transport-signal bg-transport-signal/10 border-l border-white/10">
                  Orange County (LYNX)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-sans">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">
                    {row.metric}
                  </td>
                  <td className="p-4 sm:p-5 text-red-300 bg-red-950/10 border-l border-white/10 font-mono">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-400 shrink-0" />
                      <span>{row.lake}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-300 bg-emerald-950/10 border-l border-white/10 font-mono">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-transport-signal shrink-0" />
                      <span>{row.orange}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-black/40 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <SourceCitation
            name="NTD 2022 / 2023 Profiles (LakeXpress 40158 & LYNX 40035)"
            url="https://www.transit.dot.gov/ntd"
          />
          <SourceCitation
            name="Central Florida Regional Transportation Authority (golynx.com)"
            url="https://www.golynx.com"
          />
        </div>
      </div>

      {/* Prominent Question Callout */}
      <div className="rounded-2xl border-2 border-cyan-400/60 bg-cyan-950/20 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
          <HelpCircle className="h-4 w-4" />
          <span>The Critical Policy Question</span>
        </div>
        <blockquote className="text-lg sm:text-xl font-bold text-white leading-relaxed font-sans">
          &ldquo;Same state. Same federal funding formula. Same Central Florida region. Why does Orange County have 99 times more annual transit trips? The answer is not geography. The answer is not population alone. The answer is that Orange County decided its residents deserve to get to work, school, and home — on weekends and at night.&rdquo;
        </blockquote>
      </div>
    </div>
  )
}
