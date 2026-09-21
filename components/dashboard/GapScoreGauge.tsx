'use client'

import { useState } from 'react'
import { AlertOctagon, ChevronDown, ChevronUp, Calculator } from 'lucide-react'
import SourceCitation from './SourceCitation'

export default function GapScoreGauge() {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false)
  const score = 17 // 17%

  // Circle coordinates for SVG gauge
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-red-400">
            Section 05 · Adequacy Audit
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">Transit Adequacy Gap Score</h3>
        </div>
        <span className="text-xs text-white/50 font-mono">
          BEAM Transit Adequacy Methodology v1.0
        </span>
      </div>

      {/* Main Gauge Card */}
      <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        {/* SVG Circular Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-48 h-48 sm:w-56 sm:h-56 transform -rotate-90">
            {/* Background track */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="14"
              fill="transparent"
            />
            {/* Value stroke in Red */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F87171" // red-400
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Centered label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl sm:text-5xl font-black text-red-400 font-mono">
              {score}%
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-300 font-bold mt-1">
              Adequacy
            </span>
          </div>
        </div>

        {/* Text & Evaluation */}
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
            <AlertOctagon className="h-4 w-4" />
            <span>Rating: Severely Inadequate</span>
          </div>

          <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
            LakeXpress Score: 17% Adequacy
          </h4>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            A score of 17% means this transit system meets approximately <strong className="text-red-400">1 in 6</strong> of the minimum operational markers required for a growing, low-income, and transit-dependent community.
          </p>

          <p className="text-xs text-white/60 font-mono">
            Evaluated on: Days/wk (5/7), Headway (60m = 0), Weekend service (0), Night service (0), adjusted for 10.7% poverty and 49.2% rapid population growth.
          </p>

          {/* Collapsible Toggle */}
          <button
            onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
            className="inline-flex items-center gap-2 text-xs font-mono text-transport-amber hover:text-white transition-colors underline pt-2"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>{isMethodologyOpen ? 'Hide Math & Methodology' : 'How is this calculated? Fact-check the math →'}</span>
            {isMethodologyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Methodology Section */}
      {isMethodologyOpen && (
        <div className="rounded-2xl border border-white/10 bg-transport-steel/60 p-6 space-y-4 font-mono text-xs text-white/80">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-white uppercase tracking-wider">
              BEAM Transit Adequacy Gap Formula
            </span>
            <span className="text-white/50 text-[11px]">All Inputs from Public Federal & County Data</span>
          </div>

          <div className="space-y-3 font-mono">
            <p className="text-white/70">
              The Transit Adequacy Score measures the structural baseline service against community need markers:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-transport-signal font-bold">Input A: Days of Service / Week</span>
                <p className="text-white/70">LakeXpress runs 5 out of 7 days = <strong>71.4%</strong></p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-red-400 font-bold">Input B: Headway Frequency Score</span>
                <p className="text-white/70">60 min headway = <strong>0%</strong> (30 min = 50%, 15 min = 100%)</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-red-400 font-bold">Input C: Evening Service Past 9 PM</span>
                <p className="text-white/70">LakeXpress stops at 8 PM = <strong>0%</strong></p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-red-400 font-bold">Input D: Weekend Operational Service</span>
                <p className="text-white/70">Zero Saturday and zero Sunday service = <strong>0%</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2 mt-4">
              <span className="text-red-300 font-bold uppercase tracking-wider block">
                Calculated Gap & Need Penalties
              </span>
              <p className="text-white/70">
                Baseline Service Score = (A + B + C + D) / 4 = (71.4 + 0 + 0 + 0) / 4 = <strong>17.85%</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-white/60">
                <li>Poverty Rate Served (10.7% vs 8.0% state benchmark) → <strong>-15% need penalty</strong></li>
                <li>Rapid Unfunded Growth (+49.2% since 2010 with no route additions) → <strong>-10% strain penalty</strong></li>
              </ul>
              <p className="text-red-400 font-bold pt-1">
                FINAL WEIGHTED ADEQUACY: ~17% (Severely Inadequate)
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] text-white/50">
            <span>Methodology is open-source and free to cite in city council hearings.</span>
            <SourceCitation
              name="US Census ACS & LakeXpress Timetable Audit"
              url="https://census.gov/quickfacts/fact/table/lakecountyflorida/POP815223"
            />
          </div>
        </div>
      )}
    </div>
  )
}
