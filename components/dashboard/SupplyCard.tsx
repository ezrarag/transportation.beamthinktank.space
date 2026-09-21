'use client'

import { AlertTriangle, Clock, Calendar, Bus, AlertCircle } from 'lucide-react'
import SourceCitation from './SourceCitation'

export default function SupplyCard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-amber">
            Section 01 · Transit Supply
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">What They Claim to Offer</h3>
        </div>
        <span className="text-xs text-white/50 font-mono">
          Public Records Audit · Lake County, FL
        </span>
      </div>

      {/* Grid of supply facts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Routes Operating */}
        <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/60 text-xs font-mono uppercase tracking-wider">
              <Bus className="h-4 w-4 text-transport-signal" />
              <span>Routes Operating</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">
              9 Fixed Routes
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Total network across entire 1,157 sq mile county territory.
            </p>
          </div>
          <SourceCitation
            name="ridelakexpress.com (2025 verified)"
            url="https://ridelakexpress.com"
          />
        </div>

        {/* Card 2: Days of Service */}
        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase tracking-wider">
              <Calendar className="h-4 w-4 text-red-400" />
              <span>Days of Service</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono">
              Mon – Fri Only
            </div>
            <div className="inline-block rounded bg-red-500/20 px-2 py-1 text-xs font-bold text-red-300 font-mono">
              NO Saturday Service · NO Sunday Service
            </div>
            <p className="text-xs text-white/60">
              LakeXpress explicitly states: &ldquo;Buses do not run on Saturdays, Sundays and federal holidays.&rdquo;
            </p>
          </div>
          <SourceCitation
            name="LakeXpress Official Schedule"
            url="https://ridelakexpress.com/schedules/route2"
          />
        </div>

        {/* Card 3: Headway / Waits */}
        <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/60 text-xs font-mono uppercase tracking-wider">
              <Clock className="h-4 w-4 text-transport-amber" />
              <span>Headway (Frequency)</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-transport-amber font-mono">
              60 Minutes
            </div>
            <ul className="text-xs text-white/70 space-y-1 font-mono">
              <li>• Route 1 (Leesburg – Eustis): 60 min</li>
              <li>• Route 1A (Villages – Leesburg): 60 min</li>
              <li>• Route 2 (Leesburg Circulator): 60 min</li>
              <li>• Route 27 Xpress (Leesburg – Clermont): Peak only</li>
            </ul>
          </div>
          <SourceCitation
            name="Official Schedules / Transit Tables"
            url="https://en.wikipedia.org/wiki/LakeXpress"
          />
        </div>

        {/* Card 4: Operating Hours */}
        <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/60 text-xs font-mono uppercase tracking-wider">
              <Clock className="h-4 w-4 text-white/60" />
              <span>Operating Hours</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">
              6 AM – 8 PM
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Weekday daytime window only. Zero service for second or third shift workers, hospital staff, evening retail, or weekend schedules.
            </p>
          </div>
          <SourceCitation
            name="LakeXpress Route 1A Schedule PDF"
            url="https://ridelakexpress.com"
          />
        </div>

        {/* Card 5: The Weekend Ridership Myth */}
        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-5 flex flex-col justify-between space-y-4 md:col-span-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase tracking-wider">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span>The Weekend Ridership Claim (The Key Lie)</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-xs text-white/50 block font-mono">Avg Saturday Unlinked Trips</span>
                <span className="text-3xl sm:text-4xl font-black text-red-400 font-mono">56</span>
              </div>
              <div>
                <span className="text-xs text-white/50 block font-mono">Avg Sunday Unlinked Trips</span>
                <span className="text-3xl sm:text-4xl font-black text-red-400 font-mono">51</span>
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed pt-2">
              National Transit Database records show negligible weekend trip logs reported by agency ID 40158 because no regular weekend routes exist.
            </p>
          </div>
          <SourceCitation
            name="NTD 2022 Annual Agency Profile (ID: 40158)"
            url="https://www.transit.dot.gov/sites/fta.dot.gov/files/transit_agency_profile_doc/2022/40158.pdf"
          />
        </div>
      </div>

      {/* The "Induced Failure" Highlighted Callout in Amber */}
      <div className="rounded-2xl border-2 border-transport-amber bg-transport-amber/10 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-transport-amber/20 text-transport-amber">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-transport-amber">
            Evidentiary Audit · Induced Failure Analysis
          </span>
        </div>
        
        <blockquote className="text-lg sm:text-xl font-bold text-white leading-relaxed font-sans">
          &ldquo;The 56 average Saturday riders is not evidence of low demand. It is evidence of low supply. A service that runs once per hour, only on weekdays, cannot produce weekend ridership — because it does not operate on weekends. Measuring demand using a system designed to fail is not research. It is a lie.&rdquo;
        </blockquote>

        <div className="pt-2 border-t border-transport-amber/20 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
          <span>Official Proof: NTD 2022 Agency 40158 Profile + LakeXpress Route 2 Timetable</span>
          <a
            href="https://www.transit.dot.gov/sites/fta.dot.gov/files/transit_agency_profile_doc/2022/40158.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-transport-amber hover:underline font-mono font-bold inline-flex items-center gap-1"
          >
            Verify in Federal NTD PDF (Page 1) →
          </a>
        </div>
      </div>
    </div>
  )
}
