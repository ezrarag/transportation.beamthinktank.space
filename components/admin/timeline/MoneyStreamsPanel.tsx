'use client'

import { MONEY_STREAMS } from '@/lib/admin/timelineData'
import { DollarSign } from 'lucide-react'

export default function MoneyStreamsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="space-y-0.5">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-transport-signal">
            Capital Architecture & Inflow Pathways
          </span>
          <p className="text-xs text-white/50 font-sans">
            Mapping every revenue stream from near-term consulting to multi-hundred-thousand dollar municipal contracts and federal formula grants.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {MONEY_STREAMS.map((stream, idx) => (
          <div
            key={idx}
            className="border border-white/10 bg-white/[0.03] rounded-[20px] p-4 sm:p-5 transition hover:bg-white/[0.05] hover:border-white/20"
          >
            {/* First row: Stream Name + Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-transport-signal/10 text-transport-signal flex items-center justify-center shrink-0">
                  <DollarSign className="h-3.5 w-3.5" />
                </div>
                <h4 className="font-medium text-[14px] sm:text-[15px] text-white">
                  {stream.stream}
                </h4>
              </div>

              <span
                className={`font-mono text-[10px] uppercase tracking-[0.14em] rounded-full px-2.5 py-0.5 self-start sm:self-auto font-bold ${stream.badgeCls}`}
              >
                {stream.badgeLabel}
              </span>
            </div>

            {/* Second row: Earliest & Requires */}
            <div className="flex items-center gap-4 font-mono text-[10px] text-white/40 mt-2 pt-2 border-t border-white/5">
              <span>
                Earliest: <strong className="text-white/70">{stream.earliest}</strong>
              </span>
              <span>·</span>
              <span>
                Requires: <strong className="text-transport-amber">{stream.requires}</strong>
              </span>
            </div>

            {/* Description */}
            <p className="text-[12px] text-white/60 leading-[1.6] mt-2.5 font-sans">
              {stream.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
