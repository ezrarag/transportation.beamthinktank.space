import RoleCard from '@/components/transport/RoleCard'
import TransportHeader from '@/components/transport/TransportHeader'
import { transportRoles } from '@/lib/transport/areas'
import { whatYouEarn } from '@/lib/transport/cohort'

export default function CohortLandingPage() {
  return (
    <div className="min-h-screen bg-transport-black text-white">
      <TransportHeader />
      <main className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#191d24] to-[#0d1014] p-6 sm:p-8 lg:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">Join the BEAM Cohort</p>
          <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl lg:text-8xl">Build skills, credentials, and real transportation outcomes</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-white/76">
            BEAM Transportation is for community members, UWM and MATC students, faculty collaborators, and entrepreneurs who want live work instead of abstract training.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {transportRoles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </section>

        <section className="space-y-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-signal">What you earn</p>
            <h2 className="mt-3 text-5xl text-white sm:text-6xl">Credentials that actually move your CV forward</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {whatYouEarn.map((item) => (
              <article key={item} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/74">
                {item}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
