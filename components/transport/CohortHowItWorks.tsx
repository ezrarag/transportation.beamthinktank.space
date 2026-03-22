const cohortSteps = [
  'Business signs an MOU with BEAM and defines growth goals, scope, and support areas.',
  'Cohort members are assigned from community participants and or enrolled students.',
  'Participants may take a co-requisite course at UWM or MATC to access tools and certifications.',
  'The cohort works on live deliverables: sourcing, logistics, research, customer expansion, builds, and repair.',
  'Participants earn credentials and references while the business earns measurable growth.',
]

export default function CohortHowItWorks() {
  return (
    <section className="space-y-5">
      <div>
        <span className="transport-tag">How The Cohort Works</span>
        <h2 className="mt-4 text-5xl text-white sm:text-6xl">Five Steps From Agreement To Delivery</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {cohortSteps.map((step, index) => (
          <article key={step} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-amber">Step {index + 1}</p>
            <p className="mt-3 text-sm leading-6 text-white/76">{step}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
