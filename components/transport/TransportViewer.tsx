'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Grid2x2, X } from 'lucide-react'
import LogisticsSourceBrowser from '@/components/transport/LogisticsSourceBrowser'
import ProjectCard from '@/components/transport/ProjectCard'
import RoleCard from '@/components/transport/RoleCard'
import TransportHeader from '@/components/transport/TransportHeader'
import { getTransportArea, isTransportAreaSlug, transportAreas, transportRoles } from '@/lib/transport/areas'
import { logisticsCatalog } from '@/lib/transport/logistics'
import { getProjectsForArea, getTransportProject, transportProjects } from '@/lib/transport/projects'
import type { TransportAreaSlug } from '@/lib/transport/types'

const AUTO_HIDE_DELAY_MS = 2400

export default function TransportViewer() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialArea = searchParams.get('area')
  const initialProjectId = searchParams.get('projectId')
  const [selectedArea, setSelectedArea] = useState<TransportAreaSlug>(isTransportAreaSlug(initialArea || '') ? (initialArea as TransportAreaSlug) : 'repair')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialProjectId)
  const [showLibrary, setShowLibrary] = useState(false)
  const [showChrome, setShowChrome] = useState(true)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const area = getTransportArea(selectedArea) ?? transportAreas[0]
  const areaProjects = getProjectsForArea(selectedArea)
  const selectedProject = getTransportProject(selectedProjectId || '') ?? areaProjects[0] ?? transportProjects[0]

  useEffect(() => {
    const areaParam = searchParams.get('area')
    const projectParam = searchParams.get('projectId')
    if (isTransportAreaSlug(areaParam || '')) {
      setSelectedArea(areaParam as TransportAreaSlug)
    }
    setSelectedProjectId(projectParam)
  }, [searchParams])

  useEffect(() => {
    if (showLibrary) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [showLibrary])

  useEffect(() => {
    const resetChromeTimer = () => {
      setShowChrome(true)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      hideTimerRef.current = setTimeout(() => setShowChrome(false), AUTO_HIDE_DELAY_MS)
    }

    resetChromeTimer()
    window.addEventListener('mousemove', resetChromeTimer)
    window.addEventListener('keydown', resetChromeTimer)
    return () => {
      window.removeEventListener('mousemove', resetChromeTimer)
      window.removeEventListener('keydown', resetChromeTimer)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const roleCards = useMemo(() => transportRoles.slice(0, 4), [])

  const syncRoute = (nextArea: TransportAreaSlug, nextProjectId?: string | null) => {
    const params = new URLSearchParams()
    params.set('area', nextArea)
    if (nextProjectId) params.set('projectId', nextProjectId)
    router.replace(`/viewer?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <TransportHeader />

      <main className="relative h-[calc(100vh-73px)] overflow-hidden" onClick={() => setShowChrome(true)}>
        <Image
          src={selectedProject?.heroImage || area.heroImage}
          alt={selectedProject?.title || area.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,8,0.36),rgba(5,6,8,0.72)_55%,rgba(5,6,8,0.92))]" />
        <div className="absolute inset-0 home-eye-vignette" />

        <AnimatePresence>
          {showChrome ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 lg:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-transport-signal">{area.title}</p>
                  <h1 className="mt-4 text-6xl leading-none text-white sm:text-7xl lg:text-8xl">{selectedProject?.title || area.title}</h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/76 sm:text-lg">{selectedProject?.description || area.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLibrary(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-3 text-sm uppercase tracking-[0.16em] text-white transition hover:border-transport-amber hover:text-transport-amber"
                >
                  <Grid2x2 className="h-4 w-4" />
                  Library
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
                <div className="rounded-[28px] border border-white/10 bg-black/32 p-5 backdrop-blur-xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="transport-tag">{selectedProject?.status || 'active'}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                      {selectedProject?.accessLevel || area.accessLevel}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(selectedProject?.tags || area.roles).map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/58">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-black/32 p-5 backdrop-blur-xl">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-amber">Narrative arc</p>
                  <h2 className="mt-3 text-4xl text-white">{area.narrativeArcs[0]?.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/72">{area.narrativeArcs[0]?.description}</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {showLibrary ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-black/78 backdrop-blur-2xl"
            >
              <div className="mx-auto flex h-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-transport-signal">Viewer Library</p>
                    <h2 className="mt-2 text-5xl text-white">Repair. Build. Restore. Research. Legal. Logistics.</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLibrary(false)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm uppercase tracking-[0.16em] text-white transition hover:border-transport-amber hover:text-transport-amber"
                  >
                    <X className="h-4 w-4" />
                    Close
                  </button>
                </div>

                <div className="mt-5 flex min-w-full gap-3 overflow-x-auto pb-2">
                  {transportAreas.map((railArea) => (
                    <button
                      key={railArea.slug}
                      type="button"
                      onClick={() => {
                        setSelectedArea(railArea.slug)
                        setSelectedProjectId(null)
                        syncRoute(railArea.slug, null)
                      }}
                      className={`rounded-full border px-4 py-2 text-sm uppercase tracking-[0.16em] transition ${
                        selectedArea === railArea.slug
                          ? 'border-transport-amber bg-transport-amber text-black'
                          : 'border-white/10 bg-white/[0.04] text-white/76 hover:border-white/25'
                      }`}
                    >
                      {railArea.title}
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid flex-1 gap-6 overflow-y-auto lg:grid-cols-[1.15fr,0.85fr]">
                  <section className="space-y-5">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-transport-amber">{area.shortTitle} projects</p>
                      <p className="mt-2 text-sm leading-6 text-white/68">{area.description}</p>
                    </div>

                    {selectedArea === 'logistics' ? (
                      <LogisticsSourceBrowser categories={logisticsCatalog} />
                    ) : (
                      <div className="grid gap-4 xl:grid-cols-2">
                        {areaProjects.map((project) => (
                          <button
                            key={project.id}
                            type="button"
                            onClick={() => {
                              setSelectedProjectId(project.id)
                              syncRoute(selectedArea, project.id)
                              setShowLibrary(false)
                            }}
                            className="text-left"
                          >
                            <ProjectCard project={project} />
                          </button>
                        ))}
                      </div>
                    )}
                  </section>

                  <aside className="space-y-5">
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-signal">Role cards</p>
                      <div className="mt-4 grid gap-3">
                        {roleCards.map((role) => (
                          <RoleCard key={role.id} role={role} />
                        ))}
                      </div>
                    </div>

                    {selectedProject ? (
                      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-signal">Deep link</p>
                        <h3 className="mt-3 text-3xl text-white">{selectedProject.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/68">{selectedProject.description}</p>
                        <Link href={`/viewer/project/${selectedProject.id}`} className="btn-secondary mt-5">
                          Open Project Viewer
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    ) : null}
                  </aside>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  )
}
