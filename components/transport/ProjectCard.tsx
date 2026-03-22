import type { TransportProject } from '@/lib/transport/types'

type Props = {
  project: TransportProject
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-gradient-to-br from-[#181b22] to-[#0e1014] p-5 transition hover:border-transport-amber/50">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-transport-signal">{project.areaSlug}</span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/72">
          {project.accessLevel}
        </span>
      </div>
      <h3 className="mt-4 text-3xl text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/72">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/58">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
