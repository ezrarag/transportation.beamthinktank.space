export type TimelineItemType = 'done' | 'now' | 'next' | 'gate' | 'future'

export type TimelineItem = {
  date: string
  type: TimelineItemType
  badge: string
  title: string
  body: string
}

export type TimelinePhase = {
  label: string
  phaseColor: 'done' | 'now' | 'next' | 'future'
  items: TimelineItem[]
}

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    label: 'PHASE 0 — BUILT (code exists, no signatures yet)',
    phaseColor: 'done',
    items: [
      {
        date: 'Mar–Apr 2026',
        type: 'done',
        badge: 'BUILT',
        title: 'transportation.beamthinktank.space deployed on beam-home',
        body: 'Full site scaffold: 9 areas, fleet gallery with IMAGIN.studio, CohortRoleBrowser fetching RAG roles, CohortEnrollForm with ?role= deep-link, partner dashboard /viewer/partner/[id], student dashboard /viewer/student/[id], transport-scoped admin nav, TransportHeader with Fleet link.',
      },
      {
        date: 'Apr 2026',
        type: 'done',
        badge: 'BUILT',
        title: 'lib/transport/fleet.ts — 8 vehicles defined',
        body: '4 RAG fleet vehicles (2× Transit, ProMaster, F-150), 3 wishlist (E-Transit, Sprinter, Silverado), 2 restore projects (C10 1972, Bronco 1985). IMAGIN.studio URL builder. ragClient object defined.',
      },
      {
        date: 'Apr 2026',
        type: 'done',
        badge: 'BUILT',
        title: 'RAG /api/beam/roles live — transport site pulls real roles',
        body: 'readyaimgo.biz/api/beam/roles returns 6 pulse-weighted roles. CohortRoleBrowser renders them with demand badges: transport-bridge, ops-dispatcher, intake-guide, story-producer, partner-builder, systems-operator.',
      },
      {
        date: 'Apr 2026',
        type: 'done',
        badge: 'BUILT',
        title: 'clients.readyaimgo.biz — contracts schema built and seeded',
        body: 'lib/contracts.ts created. ContractCard and ContractDetailModal built. RAG fleet maintenance contract seeded as Firestore draft record. Legal review and financial review subcollections defined. Public API at /api/public/contracts/[id] for BEAM NGO access.',
      },
      {
        date: 'May 2026',
        type: 'done',
        badge: 'BUILT',
        title: 'law.beamthinktank.space — domain registry and review queue designed',
        body: 'Practice track definitions, cross-NGO signal flow, Firestore legalReviews subcollection schema. Participant queue UI designed. Connected to contracts via legalReviews subcollection.',
      },
      {
        date: 'May 2026',
        type: 'done',
        badge: 'PROMPTS READY',
        title: 'Admin launch checklist — 64 items written, Cursor prompt ready',
        body: '8 categories: Legal, RAG Fleet Contract, Cohort, Academic, Anchor Partners, Physical Infrastructure, Financial, Web & Tech. Prompt written and in outputs file. Not yet built in admin panel.',
      },
      {
        date: 'Sep 2026',
        type: 'done',
        badge: 'PROMPTS READY',
        title: 'Leesburg transit dashboard — 6 Antigravity prompts written',
        body: 'All federal data sourced: NTD ID 40158, LakeXpress schedule (Mon–Fri only, 60-min headway), funding breakdown (65.7% federal), Lake County census data. 6 prompts cover scaffold, supply, demand, comparison, incident log, city contract sections.',
      },
      {
        date: 'Sep 2026',
        type: 'done',
        badge: 'PROMPTS READY',
        title: '/dealer and /manufacturer pitch pages — prompts written',
        body: 'Dealer page uses floor plan data ($7.90/vehicle/day). Manufacturer page covers BYD/NIO academic import pathway. Both include contact forms writing to Firestore. Prompts written, pages not yet built.',
      },
    ],
  },
  {
    label: 'PHASE 1 — THIS WEEK (run the prompts, make the calls)',
    phaseColor: 'now',
    items: [
      {
        date: 'Day 1 — Sep 2026',
        type: 'now',
        badge: 'RUN TODAY',
        title: 'Run Antigravity Prompts 1–3: Transit dashboard scaffold + supply + demand',
        body: 'By end of day: live dashboard at /dashboard/leesburg-fl with NTD data, LakeXpress gap analysis, Lake County census data, and the funding breakdown showing 65.7% federal. This URL is the key that unlocks everything else.',
      },
      {
        date: 'Day 1',
        type: 'now',
        badge: 'ONE TEXT',
        title: 'Message Eric — get his mom\'s auto parts store name',
        body: '"Hey Eric — can you send me your mom\'s store name and address? I want to set up a meeting with her this week about a BEAM partnership." One text. The anchor partner MOU cannot be sent without a business name.',
      },
      {
        date: 'Day 1',
        type: 'now',
        badge: 'ONE CALL EACH',
        title: 'Call both cousins — verbal commitment on fleet MOUs',
        body: 'Car rental cousin and dispatch cousin. "I have the partnership doc ready. Can I send it today?" A verbal yes makes them existing fleet clients for every conversation that follows. MOUs are already generated.',
      },
      {
        date: 'Day 2',
        type: 'now',
        badge: 'RUN TODAY',
        title: 'Run Antigravity Prompts 4–6: Comparison, incident log, city contract section',
        body: 'Completes the dashboard. Gap score, LakeXpress vs LYNX side-by-side, community incident log, meeting request form. Dashboard becomes a complete public legal instrument.',
      },
      {
        date: 'Day 2',
        type: 'now',
        badge: 'RUN CURSOR',
        title: 'Run admin launch-checklist Cursor prompt',
        body: '64 items, Firestore-backed, real-time, drag-to-reorder. Transforms the checklist from a .md file into a live operational tracker you open every morning.',
      },
      {
        date: 'Day 3',
        type: 'now',
        badge: 'ONE EMAIL',
        title: 'Email Lake County Commissioner (Leesburg district)',
        body: 'Find at lakecountyfl.gov/bcc. Three sentences: dashboard exists, federal data shows the gap, requesting 5 minutes. Include the URL: transportation.beamthinktank.space/dashboard/leesburg-fl. Constituent requests must be responded to.',
      },
      {
        date: 'Day 3',
        type: 'now',
        badge: 'ONE EMAIL',
        title: 'File as interested party — Spirit bankruptcy Case 25-11897 SDNY',
        body: 'Email SDNY bankruptcy court clerk. Express interest as a community carrier in Spirit\'s abandoned routes, specifically MKE (Milwaukee Mitchell) and MSP (Minneapolis). Free. Gets BEAM in the public record. Auction is closing.',
      },
      {
        date: 'Day 4',
        type: 'now',
        badge: 'RUN CURSOR',
        title: 'Run seed-transport-clients Cursor prompt',
        body: 'Seeds ragClient and all 8 vehicles from fleet.ts into Firestore beam-home under transport/clients/rag and transport/clients/rag/vehicles/{id}. Fleet becomes a live database record the contract system can reference.',
      },
      {
        date: 'Day 5',
        type: 'now',
        badge: 'CALL OR VISIT',
        title: 'Contact Milwaukee Mitchell Airport (MKE) about Spirit\'s abandoned gates',
        body: 'Spirit left MKE January 8, 2026. One call to the MKE airport authority: "What happened to Spirit\'s gate and is there a community carrier opportunity?" This is how gate access starts.',
      },
    ],
  },
  {
    label: 'PHASE 2 — WEEKS 2–4 (first signatures)',
    phaseColor: 'next',
    items: [
      {
        date: 'Week 2 — Oct 2026',
        type: 'next',
        badge: 'FIRST SIGNATURE',
        title: 'Execute RAG ↔ BEAM Transportation fleet maintenance contract',
        body: 'Draft already exists in Firestore as status:draft. Both parties are you — RAG and BEAM. Sign it. $700/month from RAG to BEAM once fleet exists. First signed document in the transport ecosystem.',
      },
      {
        date: 'Week 2',
        type: 'next',
        badge: 'FIRST SIGNATURE',
        title: 'Execute cousin car rental MOU',
        body: 'Generated document + verbal yes → signed PDF. Second fleet client confirmed. Two signed clients change every dealer conversation.',
      },
      {
        date: 'Week 2',
        type: 'next',
        badge: 'FIRST SIGNATURE',
        title: 'Execute cousin dispatch MOU',
        body: 'Third fleet client. Three signed MOUs = walk into a dealership with documented operational clients, not a pitch deck.',
      },
      {
        date: 'Week 2',
        type: 'next',
        badge: 'BUILD',
        title: 'Run /dealer and /manufacturer Cursor prompts',
        body: 'Pages designed, prompts ready. Build /dealer and /manufacturer on the transport site. You now have a URL to send to a Nissan lot manager and a BYD business development contact.',
      },
      {
        date: 'Week 3',
        type: 'next',
        badge: 'MEETING',
        title: 'Eric\'s mom meeting — anchor partner MOU',
        body: 'Auto parts store becomes the parts supply anchor. BEAM cohort buys parts through her store. Closes the local sourcing loop. Named Milwaukee anchor partner for every pitch that follows.',
      },
      {
        date: 'Week 3',
        type: 'next',
        badge: 'MEETING',
        title: 'Lake County Commissioner meeting — present the dashboard',
        body: 'Show /dashboard/leesburg-fl. Walk through the 65.7% federal funding vs weekday-only service gap. Propose: $150K community transit contract, BEAM provides 7-day service on 2 routes.',
      },
      {
        date: 'Week 3',
        type: 'next',
        badge: 'EXPLICIT ASK',
        title: 'Ask Jordan for the VC414 introduction — name the week',
        body: '"Can you introduce me to your VC414 contact this week? I want to present the RAG fleet contract and the Leesburg transit dashboard as two BEAM ecosystem anchors." Not \'when you get a chance.\' This week.',
      },
      {
        date: 'Week 4',
        type: 'next',
        badge: 'OUTREACH',
        title: 'La Macchia mechanic kid and sister — bring into cohort',
        body: 'Check the March 2026 call log cluster. Mechanic kid becomes a cohort participant. Sister gets her nonprofit website as a BEAM project. Real named people expand the ecosystem.',
      },
    ],
  },
  {
    label: 'PHASE 3 — MONTHS 2–3 (first vehicle, first revenue)',
    phaseColor: 'future',
    items: [
      {
        date: 'Nov 2026',
        type: 'gate',
        badge: 'GATE: DEALER VISIT',
        title: 'First dealer visit — 3 signed MOUs in hand',
        body: 'Walk into Kunes Ford, Boucher, or Russ Darrow Milwaukee with: 3 signed fleet client MOUs, /dealer page on your phone, floor plan data ($7.90/day per unsold vehicle). Ask for a fleet program conversation.',
      },
      {
        date: 'Nov 2026',
        type: 'future',
        badge: 'GRANT APPLICATION',
        title: 'FTA Section 5310 or 5311 grant application filed',
        body: 'Leesburg dashboard is evidence of need. Commissioner meeting is government engagement. Three signed MOUs are operational proof. File with Florida DOT as state program administrator.',
      },
      {
        date: 'Nov 2026',
        type: 'future',
        badge: 'FIRST REVENUE',
        title: 'First dashboard consulting contract — another Florida county',
        body: 'Lake County dashboard is complete and publicly cited. An advocate in Polk, Volusia, or Sumter County wants the same thing. RAG bills $5K–$10K to build their version. First real money from this work before a vehicle exists.',
      },
      {
        date: 'Nov–Dec 2026',
        type: 'future',
        badge: 'OUTREACH',
        title: 'BYD / NIO manufacturer outreach via /manufacturer page',
        body: '/manufacturer page is live. Send to BYD North America business development. Frame as: Milwaukee community fleet pilot, UWM academic partnership, earn-while-you-use model, academic import pathway.',
      },
      {
        date: 'Dec 2026',
        type: 'gate',
        badge: 'GATE: FIRST VEHICLE',
        title: 'First vehicle in the BEAM/RAG fleet',
        body: 'Arrives via one of three paths: dealer fleet program agreement, family investment covering down payment ($8K–$12K), or FTA grant approval. Everything changes when a physical vehicle exists.',
      },
      {
        date: 'Dec 2026',
        type: 'future',
        badge: 'FIRST SERVICE',
        title: 'First BEAM cohort service session logged',
        body: 'Eric, the mechanic kid, or another cohort participant performs first weekly maintenance on the RAG fleet. Service record logged in BEAM dashboard. First portfolio entry. RAG receives first monthly health report.',
      },
      {
        date: 'Dec 2026',
        type: 'future',
        badge: 'FIRST CONTRACT REVENUE',
        title: 'RAG begins paying BEAM $175/vehicle/month',
        body: 'The signed contract triggers. First real money flowing from RAG to the Transportation NGO. At 1 vehicle: $175/month. At 4 vehicles: $700/month. Small but real and documented.',
      },
      {
        date: 'Jan 2027',
        type: 'gate',
        badge: 'GATE: CITY CONTRACT / LOI',
        title: 'Lake County issues letter of intent for community transit service',
        body: 'If the commissioner meeting goes well and the dashboard is publicly cited, a municipal LOI saying BEAM is being evaluated as a community transit provider is bankable. This goes to a dealer, to VC414, and to FTA.',
      },
    ],
  },
]

export type GateMilestone = {
  label: string
  badgeCls: string
  when: string
  title: string
  unlocks: string
}

export const GATE_MILESTONES: GateMilestone[] = [
  {
    label: 'GATE 1 — Dashboard live',
    badgeCls: 'bg-blue-500/10 text-blue-400',
    when: 'This week — 6 Antigravity prompts',
    title: 'transportation.beamthinktank.space/dashboard/leesburg-fl is publicly accessible with all 6 sections',
    unlocks: 'Commissioner meeting request. Dashboard consulting sales. Grant application evidence. Every other phase in this timeline requires this URL to exist first.',
  },
  {
    label: 'GATE 2 — 3 signed MOUs',
    badgeCls: 'bg-transport-amber/10 text-transport-amber',
    when: 'Week 2 — MOUs already drafted',
    title: 'RAG contract + car rental cousin + dispatch cousin all signed as PDFs',
    unlocks: 'Dealer visit becomes a real conversation, not a pitch. Grant applications can list existing clients. City contract proposal has proof of operational model.',
  },
  {
    label: 'GATE 3 — Commissioner meeting held',
    badgeCls: 'bg-transport-amber/10 text-transport-amber',
    when: 'Week 3 — after dashboard is live',
    title: 'Lake County official has seen the dashboard and BEAM has formally proposed a community transit contract',
    unlocks: 'Letter of intent from the city. FTA grant eligibility strengthened. Bankable document for dealer or lender. Media story if they refuse.',
  },
  {
    label: 'GATE 4 — First vehicle',
    badgeCls: 'bg-purple-500/10 text-purple-400',
    when: 'Dec 2026 — requires Gate 2 + financing or Gate 3',
    title: 'One vehicle physically in the BEAM/RAG fleet — purchased, leased, or partnered',
    unlocks: 'First service session. First portfolio entry for a cohort participant. First monthly report to RAG. First real proof of the model. Every investor and partner conversation changes when a vehicle physically exists.',
  },
  {
    label: 'GATE 5 — City LOI or contract',
    badgeCls: 'bg-purple-500/10 text-purple-400',
    when: 'Jan 2027 — requires Gates 1 + 3',
    title: 'Lake County (or another city) issues a letter of intent or signed contract for community transit service',
    unlocks: 'This is bankable. A municipal LOI is what goes to a dealer for a fleet program. What goes to VC414. What goes to FTA as the local match commitment. A government saying "we intend to pay BEAM" is a fundamentally different instrument than a pitch deck.',
  },
  {
    label: 'GATE 6 — First external revenue',
    badgeCls: 'bg-white/5 text-white/50',
    when: 'Nov–Dec 2026 — whichever comes first',
    title: 'Either FTA grant approved OR first dashboard consulting contract signed',
    unlocks: 'Self-sustaining operations. Cohort stipends fundable. Additional vehicles possible without family investment. BEAM Transportation becomes financially independent from RAG.',
  },
]

export type MoneyStream = {
  stream: string
  earliest: string
  requires: string
  badgeCls: string
  badgeLabel: string
  description: string
}

export const MONEY_STREAMS: MoneyStream[] = [
  {
    stream: 'Dashboard consulting',
    earliest: 'Nov 2026',
    requires: 'Gate 1',
    badgeCls: 'bg-blue-500/10 text-blue-400',
    badgeLabel: 'Ready after Gate 1',
    description: 'RAG bills $5K–$15K to build a city-specific transit truth dashboard for community orgs, legal aid, NAACP chapters, or city council members in other FL counties. Lake County dashboard is the portfolio piece.',
  },
  {
    stream: 'RAG fleet maintenance revenue',
    earliest: 'Dec 2026',
    requires: 'Gate 4',
    badgeCls: 'bg-purple-500/10 text-purple-400',
    badgeLabel: 'Requires Gate 4',
    description: 'RAG pays BEAM $175/vehicle/month per the signed contract. Starts at $175 (1 vehicle). Grows to $700 (4 vehicles). Small but real, documented, and the foundational proof of the model.',
  },
  {
    stream: 'FTA Section 5310 grant',
    earliest: 'Jan 2027',
    requires: 'Gates 1 + 3',
    badgeCls: 'bg-purple-500/10 text-purple-400',
    badgeLabel: 'Requires Gates 1 + 3',
    description: 'Enhanced Mobility of Seniors and Individuals with Disabilities. Lake County is 26.7% over 65. Apply to FL DOT. Leesburg dashboard is the evidence of need. Commissioner meeting is the government engagement.',
  },
  {
    stream: 'FTA Section 5311 grant',
    earliest: 'Jan 2027',
    requires: 'Gates 1 + 3',
    badgeCls: 'bg-purple-500/10 text-purple-400',
    badgeLabel: 'Requires Gates 1 + 3',
    description: 'Rural Area Formula program. Lake County has non-urbanized areas. BEAM applies directly as a 501(c)(3). Leesburg dashboard is the evidence of need. Commissioner engagement is required.',
  },
  {
    stream: 'City transit service contract',
    earliest: 'Feb 2027',
    requires: 'Gate 5',
    badgeCls: 'bg-white/5 text-white/50',
    badgeLabel: 'Requires Gate 5',
    description: 'Lake County contracts BEAM to provide community transit on routes LakeXpress does not cover — weekends, evenings, underserved areas. $150K–$300K annually. Unlocks FTA federal match.',
  },
  {
    stream: 'Family investment ($25K ask)',
    earliest: 'Available now',
    requires: 'Follow-up ask',
    badgeCls: 'bg-blue-500/10 text-blue-400',
    badgeLabel: 'Waiting on follow-up',
    description: 'Pitch deck is live at readyaimgo.biz/pitch. Meeting happened. No confirmed investment documented. Needs a follow-up ask with a specific close date and the updated timeline as context.',
  },
  {
    stream: 'VC414 via Jordan',
    earliest: 'Oct–Nov 2026',
    requires: 'Jordan explicit ask',
    badgeCls: 'bg-transport-amber/10 text-transport-amber',
    badgeLabel: 'Waiting on Jordan ask',
    description: 'RAG seeks early-stage financing for fleet acquisition. Dashboard + 3 signed MOUs + commissioner engagement = real operational traction. Jordan makes the introduction. The ask must be explicit and name a specific week.',
  },
  {
    stream: 'Dealer fleet program / LOI',
    earliest: 'Nov 2026',
    requires: 'Gate 2',
    badgeCls: 'bg-transport-amber/10 text-transport-amber',
    badgeLabel: 'Requires Gate 2',
    description: 'Dealer with unsold vehicles bleeding $7.90/day signs a fleet program: BEAM operates vehicles, pays monthly, maintains through the NGO. Not a purchase — a partnership that converts to purchase over time.',
  },
]
