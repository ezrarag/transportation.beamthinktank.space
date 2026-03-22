import TransportHeader from '@/components/transport/TransportHeader'

const adminSections = [
  { title: 'Area Manager', description: 'Edit area descriptions, hero images, and narrative arcs.' },
  { title: 'Project Manager', description: 'Create, edit, and publish transport case studies and viewer records.' },
  { title: 'Partner Manager', description: 'Review partner applications, approve businesses, and assign cohort members.' },
  { title: 'Cohort Manager', description: 'Review enrollments, approve participants, and place them on projects.' },
  { title: 'Logistics Catalog', description: 'Maintain categories, suppliers, and item listings for local sourcing.' },
  { title: 'Content Manager', description: 'Upload and manage viewer content, media, and access levels.' },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171a20] to-[#0b0d11] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">Transport admin</p>
          <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl">Manage BEAM Transportation operations</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/76">
            This namespace extends the existing BEAM admin pattern for transport-specific area management, applications, partner approvals, and logistics catalog maintenance.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {adminSections.map((section) => (
            <article key={section.title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-amber">transport namespace</p>
              <h2 className="mt-3 text-4xl text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/70">{section.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
