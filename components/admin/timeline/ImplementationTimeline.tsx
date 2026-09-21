'use client'

import { useState } from 'react'
import { TIMELINE_PHASES } from '@/lib/admin/timelineData'
import TimelinePhase from './TimelinePhase'
import ThisWeekPanel from './ThisWeekPanel'
import GateMilestonesPanel from './GateMilestonesPanel'
import MoneyStreamsPanel from './MoneyStreamsPanel'

type TimelineTab = 'full' | 'week' | 'gates' | 'money'

const TABS: { id: TimelineTab; label: string }[] = [
  { id: 'full', label: 'Full Timeline' },
  { id: 'week', label: 'This Week' },
  { id: 'gates', label: 'Gate Milestones' },
  { id: 'money', label: 'Where Money Comes From' },
]

export default function ImplementationTimeline() {
  const [activeTab, setActiveTab] = useState<TimelineTab>('full')

  return (
    <div className="space-y-8">
      {/* Tab Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition ${
                isActive
                  ? 'border-transport-amber bg-transport-amber/15 text-transport-amber font-bold shadow-sm shadow-transport-amber/10'
                  : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/75'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="transition-all duration-200">
        {activeTab === 'full' && (
          <div className="space-y-12">
            {TIMELINE_PHASES.map((phase, idx) => (
              <TimelinePhase
                key={idx}
                label={phase.label}
                phaseColor={phase.phaseColor}
                items={phase.items}
              />
            ))}
          </div>
        )}

        {activeTab === 'week' && <ThisWeekPanel />}

        {activeTab === 'gates' && <GateMilestonesPanel />}

        {activeTab === 'money' && <MoneyStreamsPanel />}
      </div>
    </div>
  )
}
