'use client'

interface ActionItem {
  num: number
  title: string
  body: string
  when: string
  type: 'prompt' | 'call' | 'email' | 'filing'
}

const THIS_WEEK_ACTIONS: ActionItem[] = [
  {
    num: 1,
    title: 'Run Antigravity Prompts 1–3',
    body: 'Scaffold transit truth dashboard + supply and demand layers for Leesburg, FL. By end of day: live dashboard at /dashboard/leesburg-fl.',
    when: 'Today — prompts are in the outputs file',
    type: 'prompt',
  },
  {
    num: 2,
    title: "Text Eric — get his mom's auto parts store name",
    body: '"Hey Eric — can you send me your mom\'s store name and address? I want to set up a meeting with her this week about a BEAM partnership." One text. The anchor partner MOU cannot be sent without a business name.',
    when: 'Today — takes 30 seconds',
    type: 'call',
  },
  {
    num: 3,
    title: 'Call car rental cousin — verbal commitment on fleet MOU',
    body: '"I have the partnership doc ready. Can I send it today?" A verbal yes makes them an existing fleet client for every conversation that follows. MOU already generated.',
    when: 'Today',
    type: 'call',
  },
  {
    num: 4,
    title: 'Call dispatch cousin — verbal commitment on fleet MOU',
    body: 'Second operational fleet client commitment. Three signed MOUs = walk into a dealership with documented operational clients, not a pitch deck.',
    when: 'Today',
    type: 'call',
  },
  {
    num: 5,
    title: 'Run Antigravity Prompts 4–6',
    body: 'Complete the dashboard: comparison table, 17% adequacy gap score, community incident log, and city contract section. Becomes an evidentiary public legal instrument.',
    when: 'Day 2',
    type: 'prompt',
  },
  {
    num: 6,
    title: 'Run admin launch-checklist Cursor prompt',
    body: '64 items, Firestore-backed, real-time, drag-to-reorder. Transforms the checklist from a markdown document into a live operational tracker opened every morning.',
    when: 'Day 2 — prompt is written',
    type: 'prompt',
  },
  {
    num: 7,
    title: 'Email Lake County Commissioner (Leesburg district)',
    body: 'Find at lakecountyfl.gov/bcc. Three sentences: dashboard exists, federal data shows the gap, requesting 5 minutes. Include the URL: transportation.beamthinktank.space/dashboard/leesburg-fl.',
    when: 'Day 3 — after dashboard is live',
    type: 'email',
  },
  {
    num: 8,
    title: 'File as interested party — Spirit bankruptcy Case 25-11897 SDNY',
    body: 'Email SDNY bankruptcy court clerk. Express interest as a community carrier in Spirit\'s abandoned routes, specifically MKE (Milwaukee Mitchell) and MSP (Minneapolis). Free. Gets BEAM in the public record. Auction is closing.',
    when: 'Day 3 — window closing',
    type: 'filing',
  },
  {
    num: 9,
    title: 'Run seed-transport-clients Cursor prompt',
    body: 'Seeds ragClient and all 8 vehicles from fleet.ts into Firestore beam-home under transport/clients/rag and transport/clients/rag/vehicles/{id}. Fleet becomes a live database record the contract system can reference.',
    when: 'Day 4',
    type: 'prompt',
  },
  {
    num: 10,
    title: "Contact Milwaukee Mitchell Airport (MKE) about Spirit's abandoned gates",
    body: 'Spirit left MKE January 8, 2026. One call to the MKE airport authority: "What happened to Spirit\'s gate and is there a community carrier opportunity?" This is how gate access starts.',
    when: 'Day 5',
    type: 'call',
  },
]

export default function ThisWeekPanel() {
  return (
    <div className="space-y-8">
      {/* 4-Metric Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35 block">
            Actions Needed
          </span>
          <span className="text-4xl sm:text-5xl font-mono font-bold text-white block">
            10
          </span>
        </div>

        <div className="rounded-[16px] border border-blue-500/20 bg-blue-500/[0.04] p-5 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-blue-400 block">
            Prompts to Run
          </span>
          <span className="text-4xl sm:text-5xl font-mono font-bold text-blue-400 block">
            4
          </span>
        </div>

        <div className="rounded-[16px] border border-transport-amber/20 bg-transport-amber/[0.04] p-5 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-transport-amber block">
            Calls / Texts
          </span>
          <span className="text-4xl sm:text-5xl font-mono font-bold text-transport-amber block">
            4
          </span>
        </div>

        <div className="rounded-[16px] border border-transport-signal/20 bg-transport-signal/[0.04] p-5 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-transport-signal block">
            Emails to Send
          </span>
          <span className="text-4xl sm:text-5xl font-mono font-bold text-transport-signal block">
            2
          </span>
        </div>
      </div>

      {/* Action list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/50">
            Immediate 7-Day Operational Checklist
          </span>
          <span className="font-mono text-[11px] text-transport-amber">
            Phase 1 Priority Execution
          </span>
        </div>

        <div className="space-y-2.5">
          {THIS_WEEK_ACTIONS.map((action) => (
            <div
              key={action.num}
              className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4 sm:p-5 flex items-start gap-4 transition hover:bg-white/[0.05] hover:border-white/20"
            >
              {/* Number Circle */}
              <div className="w-[22px] h-[22px] rounded-full bg-white/10 text-white/70 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {action.num}
              </div>

              {/* Action content */}
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="text-[13px] sm:text-[14px] font-medium text-white">
                    {action.title}
                  </h4>
                  <span className="font-mono text-[10px] text-transport-amber/80 shrink-0">
                    {action.when}
                  </span>
                </div>
                <p className="text-[12px] text-white/60 leading-[1.5] font-sans">
                  {action.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
