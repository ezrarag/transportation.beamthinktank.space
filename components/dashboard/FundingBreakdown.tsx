'use client'

import { DollarSign, AlertCircle, Users, Briefcase, TrendingUp } from 'lucide-react'
import SourceCitation from './SourceCitation'

export default function FundingBreakdown() {
  return (
    <div className="space-y-12">
      
      {/* SECTION 2: WHO NEEDS IT (DEMOGRAPHICS) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-signal">
              Section 02 · Demographic Transit Need
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">Who Actually Needs It</h3>
          </div>
          <span className="text-xs text-white/50 font-mono">
            US Census ACS 2023 · Lake County FIPS: 12069
          </span>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Population */}
          <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-4 space-y-1">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">County Population</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">444,204</div>
            <p className="text-[11px] text-white/60">2024 Census Estimate</p>
          </div>

          {/* Poverty Rate */}
          <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-4 space-y-1">
            <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider block">Persons in Poverty</span>
            <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono">10.7%</div>
            <p className="text-[11px] text-red-300 font-medium">~47,530 people living below poverty line</p>
          </div>

          {/* Population Growth */}
          <div className="rounded-2xl border border-transport-amber/30 bg-transport-amber/10 p-4 space-y-1">
            <span className="text-[11px] font-mono text-transport-amber uppercase tracking-wider block">Growth Since 2010</span>
            <div className="text-2xl sm:text-3xl font-black text-transport-amber font-mono">+49.2%</div>
            <p className="text-[11px] text-white/70">+100,000 new residents with zero proportional transit added</p>
          </div>

          {/* Seniors 65+ */}
          <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-4 space-y-1">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">Seniors (65+)</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">26.7%</div>
            <p className="text-[11px] text-white/60">Over 118,000 transit-dependent seniors</p>
          </div>

          {/* Median Income */}
          <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-4 space-y-1">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">Median Household Income</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">$69,956</div>
            <p className="text-[11px] text-white/60">Below national median of $78,538</p>
          </div>

          {/* Minority Population */}
          <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-4 space-y-1">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">Minority Population</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">32.0%</div>
            <p className="text-[11px] text-white/60">~142,000 Black (12.7%) & Hispanic (19.3%) residents</p>
          </div>

          {/* Retail Jobs */}
          <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-4 space-y-1">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">Retail Trade Workers</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">22,961</div>
            <p className="text-[11px] text-transport-amber font-medium">Night & weekend shift workers (0 transit options)</p>
          </div>

          {/* Healthcare Jobs */}
          <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-4 space-y-1">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">Healthcare Workers</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">25,135</div>
            <p className="text-[11px] text-transport-amber font-medium">Hospital shifts requiring off-hour mobility</p>
          </div>
        </div>

        {/* Source link */}
        <div className="flex justify-between items-center text-xs">
          <SourceCitation
            name="US Census Bureau QuickFacts (Lake County, FL)"
            url="https://census.gov/quickfacts/fact/table/lakecountyflorida/POP815223"
          />
          <SourceCitation
            name="Data USA: Lake County, FL Economy"
            url="https://datausa.io/profile/geo/lake-county-fl"
          />
        </div>

        {/* The Gap Callout */}
        <div className="rounded-2xl border-2 border-transport-amber bg-transport-amber/10 p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-transport-amber">
            <TrendingUp className="h-4 w-4" />
            <span>The Demographic Disconnect</span>
          </div>
          <p className="text-lg sm:text-xl font-bold text-white leading-relaxed font-sans">
            &ldquo;Lake County has grown by 49% since 2010. LakeXpress still runs 9 routes, weekdays only, with 60-minute waits. The people who have arrived since 2010 are largely working-age, minority, and lower-income. The transit system serves none of them adequately.&rdquo;
          </p>
        </div>
      </div>

      {/* SECTION 3: THE FUNDING LIE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-red-400">
              Section 03 · Fiscal Audit
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">The Funding Lie</h3>
          </div>
          <span className="text-xs text-white/50 font-mono">
            Federal Transit Administration NTD 2022 Profile
          </span>
        </div>

        {/* Overall Budget Card */}
        <div className="rounded-2xl border border-white/10 bg-transport-steel/40 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">
                Total Operating Funds (2022)
              </span>
              <span className="text-3xl sm:text-5xl font-black text-white font-mono">
                $6,993,493
              </span>
            </div>
            <SourceCitation
              name="FTA NTD 2022 Agency 40158 (Page 1 Operating Funding Summary)"
              url="https://www.transit.dot.gov/sites/fta.dot.gov/files/transit_agency_profile_doc/2022/40158.pdf"
            />
          </div>

          {/* Horizontal Bar Visualization */}
          <div className="space-y-3">
            <div className="flex h-7 w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
              {/* Federal Government: 65.7% (Signal Green) */}
              <div 
                style={{ width: '65.7%' }} 
                className="bg-transport-signal flex items-center justify-center text-[11px] font-bold text-black font-mono"
                title="Federal Government: $4,592,012 (65.7%)"
              >
                Federal 65.7%
              </div>
              {/* State Government: 23.6% */}
              <div 
                style={{ width: '23.6%' }} 
                className="bg-sky-500 flex items-center justify-center text-[11px] font-bold text-black font-mono"
                title="State Government: $1,648,910 (23.6%)"
              >
                State 23.6%
              </div>
              {/* Local Government: 6.0% (Highlighted in Red) */}
              <div 
                style={{ width: '6.0%' }} 
                className="bg-red-500 flex items-center justify-center text-[10px] font-bold text-white font-mono"
                title="Local Government: $422,746 (6.0%)"
              >
                6%
              </div>
              {/* Fares: 4.7% */}
              <div 
                style={{ width: '4.7%' }} 
                className="bg-amber-400 flex items-center justify-center text-[10px] font-bold text-black font-mono"
                title="Fares: $329,934 (4.7%)"
              >
                4.7%
              </div>
            </div>

            {/* Breakdown Legend Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* Federal */}
              <div className="rounded-xl border border-transport-signal/30 bg-transport-signal/10 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-transport-signal uppercase font-mono">Federal Government</span>
                  <span className="text-xs font-black text-transport-signal font-mono">65.7%</span>
                </div>
                <div className="text-xl font-bold text-white font-mono">$4,592,012</div>
                <p className="text-[10px] text-white/60">Your federal tax dollars pay for the vast majority of operations.</p>
              </div>

              {/* State */}
              <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 uppercase font-mono">State Government</span>
                  <span className="text-xs font-black text-sky-400 font-mono">23.6%</span>
                </div>
                <div className="text-xl font-bold text-white font-mono">$1,648,910</div>
                <p className="text-[10px] text-white/60">Florida Department of Transportation block grants.</p>
              </div>

              {/* Local */}
              <div className="rounded-xl border-2 border-red-500/50 bg-red-950/30 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 uppercase font-mono">Local County Tax</span>
                  <span className="text-xs font-black text-red-400 font-mono">6.0%</span>
                </div>
                <div className="text-xl font-bold text-red-400 font-mono">$422,746</div>
                <p className="text-[10px] text-red-300 font-medium">Mere pennies: Lake County contributes only 6 cents per dollar.</p>
              </div>

              {/* Fares */}
              <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase font-mono">Farebox Revenue</span>
                  <span className="text-xs font-black text-amber-300 font-mono">4.7%</span>
                </div>
                <div className="text-xl font-bold text-white font-mono">$329,934</div>
                <p className="text-[10px] text-white/60">Direct fares paid by transit riders.</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Funding Lie Callout */}
        <div className="rounded-2xl border-2 border-red-500 bg-red-950/20 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
              <AlertCircle className="h-6 w-6" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-red-400">
              The Accountability Exposure
            </span>
          </div>

          <blockquote className="text-lg sm:text-xl font-bold text-white leading-relaxed font-sans">
            &ldquo;65.7% of LakeXpress&apos;s budget comes from the federal government — your federal taxes. Lake County contributes 6%. The federal government is already paying for most of this system. The local government then uses &apos;lack of local funding&apos; as the reason not to expand service — while collecting 6.5 cents of every dollar the federal government sends. This is the funding lie.&rdquo;
          </blockquote>

          <div className="pt-2 border-t border-red-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
            <span>Federal Source: FTA National Transit Database (NTD) Annual Report Agency ID 40158</span>
            <a
              href="https://www.transit.dot.gov/sites/fta.dot.gov/files/transit_agency_profile_doc/2022/40158.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:underline font-mono font-bold inline-flex items-center gap-1"
            >
              Verify Direct in FTA 40158 PDF →
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
