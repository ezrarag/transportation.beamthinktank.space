import type { Metadata } from 'next'
import TransportHeader from '@/components/transport/TransportHeader'
import CohortEnrollForm from '@/components/transport/CohortEnrollForm'

export const metadata: Metadata = {
  title: 'Enroll — BEAM Transportation Cohort',
}

type SearchParams = {
  role?: string       // RAG role id e.g. "transport-bridge"
  title?: string      // human-readable role title from RAG
  from?: string       // "rag" if coming from readyaimgo.biz
  track?: string      // "transport" | "hybrid" | "business"
}

export default async function CohortEnrollPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const fromRag = params.from === 'rag'
  const ragRoleId = params.role ?? ''
  const ragRoleTitle = params.title ? decodeURIComponent(params.title) : ''
  const ragTrack = params.track ?? ''

  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">

        {/* Contextual header — changes based on where they came from */}
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171a21] to-[#0b0d10] p-6 sm:p-8">
          {fromRag && ragRoleTitle ? (
            <>
              {/* Step 1 confirmation — they came from a specific RAG role */}
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-full border border-transport-signal/40 bg-transport-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-transport-signal">
                  From ReadyAimGo
                </span>
                {ragTrack && (
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                    {ragTrack} track
                  </span>
                )}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">
                Cohort enrollment
              </p>
              <h1 className="mt-3 text-5xl leading-none text-white sm:text-6xl">
                {ragRoleTitle}
              </h1>
              <p className="mt-3 text-sm leading-7 text-white/60">
                You&apos;re applying for the <strong className="text-white/80">{ragRoleTitle}</strong> role
                from ReadyAimGo&apos;s staffing board. Fill in the form below — BEAM will confirm your fit,
                cohort assignment, and any co-requisite course pathway within 48 hours.
              </p>
              <a
                href="https://readyaimgo.biz/beam-participants"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-transport-signal/70 underline underline-offset-2 hover:text-transport-signal"
              >
                ← See all open roles on ReadyAimGo
              </a>
            </>
          ) : (
            <>
              {/* General enrollment */}
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">
                Cohort enrollment
              </p>
              <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl">
                Start building inside BEAM Transportation
              </h1>
              <p className="mt-4 text-sm leading-7 text-white/65">
                Tell us your role, interests, availability, and what you want to build.
                BEAM will map you into the right transportation workstream and follow up within 48 hours.
              </p>
            </>
          )}
        </section>

        {/* Enrollment form — passes RAG context through */}
        <CohortEnrollForm
          defaultRole={ragRoleId}
          ragRoleTitle={ragRoleTitle}
          ragTrack={ragTrack}
          fromRag={fromRag}
        />

      </main>
    </div>
  )
}
