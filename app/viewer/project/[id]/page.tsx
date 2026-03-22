import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TransportHeader from '@/components/transport/TransportHeader'
import { getTransportArea } from '@/lib/transport/areas'
import { getTransportProject } from '@/lib/transport/projects'

export default async function ProjectViewerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getTransportProject(id)
  if (!project) notFound()

  const area = getTransportArea(project.areaSlug)

  return (
    <div className="min-h-screen bg-black text-white">
      <TransportHeader />
      <main className="relative min-h-[calc(100vh-73px)] overflow-hidden">
        <Image src={project.heroImage} alt={project.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,6,0.28),rgba(3,4,6,0.82)_58%,rgba(3,4,6,0.96))]" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col justify-end px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-4xl rounded-[32px] border border-white/10 bg-black/35 p-6 backdrop-blur-xl sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">{area?.title || project.areaSlug}</p>
            <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl">{project.title}</h1>
            <p className="mt-4 text-lg leading-8 text-white/76">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/60">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Status</p>
                <p className="mt-2 text-xl text-white">{project.status}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Partner</p>
                <p className="mt-2 text-xl text-white">{project.partnerBusiness || 'Community initiative'}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Access</p>
                <p className="mt-2 text-xl text-white">{project.accessLevel}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/viewer?area=${project.areaSlug}&projectId=${project.id}`} className="btn-primary">
                Return to Viewer
              </Link>
              <Link href="/partner" className="btn-secondary">
                Partner With BEAM
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
