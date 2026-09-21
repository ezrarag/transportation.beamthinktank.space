'use client'

import { GATE_MILESTONES } from '@/lib/admin/timelineData'
import { KeyRound, LockOpen } from 'lucide-react'

export default function GateMilestonesPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="space-y-0.5">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-purple-400">
            Critical Dependency Milestones
          </span>
          <p className="text-xs text-white/50 font-sans">
            Every gate fundamentally unlocks the next tier of partner credibility and revenue eligibility.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {GATE_MILESTONES.map((gate, idx) => (
          <div
            key={idx}
            className="border border-purple-500/25 bg-purple-500/[0.04] rounded-[24px] p-5 sm:p-6 transition hover:bg-purple-500/[0.07] hover:border-purple-500/40"
          >
            {/* Header Badge & Date */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.14em] rounded-full px-2.5 py-0.5 font-bold ${gate.badgeCls}`}
              >
                {gate.label}
              </span>
              <span className="font-mono text-[10px] text-white/40">
                · {gate.when}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-[14px] sm:text-[15px] font-medium text-white mt-3 mb-1 leading-snug">
              {gate.title}
            </h4>

            {/* Unlocks section */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-transport-signal font-bold mb-1">
                <LockOpen className="h-3 w-3" />
                <span>Unlocks:</span>
              </div>
              <p className="text-[12px] text-white/65 leading-[1.6] font-sans">
                {gate.unlocks}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
