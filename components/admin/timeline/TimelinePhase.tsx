'use client'

import type { TimelineItem, TimelineItemType } from '@/lib/admin/timelineData'

interface Props {
  label: string
  phaseColor: 'done' | 'now' | 'next' | 'future'
  items: TimelineItem[]
}

const DOT_COLORS: Record<TimelineItemType, string> = {
  done: '#00D4AA',
  now: '#378ADD',
  next: '#F0A500',
  gate: '#9B59B6',
  future: '#555555',
}

const CARD_BORDERS: Record<TimelineItemType, string> = {
  done: 'border-transport-signal/40',
  now: 'border-blue-500/40',
  next: 'border-transport-amber/40',
  gate: 'border-purple-500/40',
  future: 'border-white/10',
}

const BADGE_COLORS: Record<TimelineItemType, string> = {
  done: 'bg-transport-signal/10 text-transport-signal border border-transport-signal/20',
  now: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  next: 'bg-transport-amber/10 text-transport-amber border border-transport-amber/20',
  gate: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  future: 'bg-white/5 text-white/40 border border-white/10',
}

const PHASE_PILL_STYLES = {
  done: 'bg-transport-signal/10 text-transport-signal border-transport-signal/20',
  now: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  next: 'bg-transport-amber/10 text-transport-amber border-transport-amber/20',
  future: 'bg-white/5 text-white/40 border-white/10',
}

export default function TimelinePhase({ label, phaseColor, items }: Props) {
  return (
    <div className="space-y-4">
      {/* Phase Label Pill */}
      <div className="flex items-center gap-3">
        <span
          className={`inline-block rounded-full border px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] ${
            PHASE_PILL_STYLES[phaseColor]
          }`}
        >
          {label}
        </span>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>

      {/* Items list */}
      <div className="space-y-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <div key={idx} className="flex flex-col sm:grid sm:grid-cols-[90px_14px_1fr] gap-3 sm:gap-4 items-start relative group">
              {/* Date Column (Desktop) */}
              <div className="hidden sm:block font-mono text-[11px] text-white/40 text-right pt-[18px] leading-snug break-words">
                {item.date}
              </div>

              {/* Dot and Line Column */}
              <div className="hidden sm:flex flex-col items-center self-stretch relative">
                <span
                  className="w-3 h-3 rounded-full shrink-0 mt-[18px] ring-4 ring-black shadow-sm"
                  style={{ backgroundColor: DOT_COLORS[item.type] }}
                />
                {!isLast && <div className="w-[1px] flex-1 bg-white/10 mt-1" />}
              </div>

              {/* Card Column */}
              <div
                className={`w-full rounded-[20px] border bg-white/[0.03] p-4 sm:p-5 my-1.5 backdrop-blur-sm transition-all hover:bg-white/[0.05] ${
                  CARD_BORDERS[item.type]
                }`}
              >
                {/* Mobile Date Header */}
                <div className="sm:hidden flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                      style={{ backgroundColor: DOT_COLORS[item.type] }}
                    />
                    <span className="font-mono text-[10px] text-white/50">{item.date}</span>
                  </div>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.14em] rounded-full px-2.5 py-0.5 ${
                      BADGE_COLORS[item.type]
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Desktop Badge */}
                <div className="hidden sm:block mb-2">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.14em] rounded-full px-2.5 py-0.5 inline-block ${
                      BADGE_COLORS[item.type]
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-[14px] sm:text-[15px] font-medium text-white mb-1.5 leading-snug">
                  {item.title}
                </h4>

                {/* Body */}
                <p className="text-[12px] text-white/60 leading-[1.6] font-sans">
                  {item.body}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
