'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { allVehicles, buildImaginUrl, VEHICLE_ANGLES } from '@/lib/transport/fleet'
import type { FleetVehicle, VehicleAngle } from '@/lib/transport/types'

const STATUS_FILTERS = ['All', 'RAG Fleet', 'Wishlist', 'Restore Project'] as const

const STATUS_PILL: Record<string, string> = {
  'RAG Fleet':
    'border-transport-signal/40 bg-transport-signal/10 text-transport-signal',
  'Wishlist':
    'border-transport-amber/40 bg-transport-amber/10 text-transport-amber',
  'Restore Project':
    'border-white/20 bg-white/5 text-white/60',
}

export default function FleetGallery() {
  const [activeStatus, setActiveStatus] = useState<string>('All')
  const [angles, setAngles] = useState<Record<string, VehicleAngle>>({})

  const filtered =
    activeStatus === 'All'
      ? allVehicles
      : allVehicles.filter((v) => v.statusLabel === activeStatus)

  const getAngle = (id: string): VehicleAngle => angles[id] ?? '01'
  const setAngle = (id: string, angle: VehicleAngle) =>
    setAngles((prev) => ({ ...prev, [id]: angle }))

  const totals = {
    rag:     allVehicles.filter((v) => v.status === 'rag').length,
    want:    allVehicles.filter((v) => v.status === 'want').length,
    restore: allVehicles.filter((v) => v.status === 'restore').length,
  }

  return (
    <div className="space-y-8">
      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'RAG Fleet',       value: totals.rag,     color: 'text-transport-signal' },
          { label: 'On Wishlist',     value: totals.want,    color: 'text-transport-amber' },
          { label: 'Restore Projects',value: totals.restore, color: 'text-white/60' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {s.label}
            </p>
            <p className={`mt-1 text-4xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveStatus(f)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition ${
              activeStatus === f
                ? 'border-transport-amber bg-transport-amber/15 text-transport-amber'
                : 'border-white/15 bg-white/[0.03] text-white/50 hover:border-white/30 hover:text-white/75'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Vehicle grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((vehicle, i) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              angle={getAngle(vehicle.id)}
              onAngleChange={(angle) => setAngle(vehicle.id, angle)}
              index={i}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function VehicleCard({
  vehicle,
  angle,
  onAngleChange,
  index,
}: {
  vehicle: FleetVehicle
  angle: VehicleAngle
  onAngleChange: (a: VehicleAngle) => void
  index: number
}) {
  const [imgError, setImgError] = useState(false)
  const imgUrl = buildImaginUrl(vehicle.make, vehicle.model, vehicle.year, angle)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-transport-steel to-[#0f1115]"
    >
      {/* Image area */}
      <div className="relative flex h-48 items-center justify-center bg-white/[0.02]">
        {/* Status pill */}
        <span
          className={`absolute left-3 top-3 rounded-full border px-3 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
            STATUS_PILL[vehicle.statusLabel] ?? 'border-white/10 text-white/40'
          }`}
        >
          {vehicle.statusLabel}
        </span>

        {/* IMAGIN.studio vehicle image */}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgUrl}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="h-full w-full object-contain p-3"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/20">
            <span className="text-5xl">🚗</span>
            <span className="font-mono text-[10px] uppercase tracking-widest">No image</span>
          </div>
        )}

        {/* Angle switcher */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          {VEHICLE_ANGLES.map((a) => (
            <button
              key={a.code}
              onClick={() => onAngleChange(a.code)}
              className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide transition ${
                angle === a.code
                  ? 'bg-transport-amber text-black'
                  : 'border border-white/15 bg-black/30 text-white/45 hover:border-white/30 hover:text-white/75'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="space-y-4 p-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            {vehicle.year} · {vehicle.config}
          </p>
          <h3 className="mt-1 text-3xl text-white">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="mt-0.5 font-mono text-[11px] text-transport-amber">
            {vehicle.priceRange}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {[
            { label: 'Engine',  value: vehicle.engine },
            { label: 'Payload', value: vehicle.payload },
          ].map((spec) => (
            <div key={spec.label}>
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/30">
                {spec.label}
              </p>
              <p className="mt-0.5 text-[12px] font-medium text-white/75">{spec.value}</p>
            </div>
          ))}
        </div>

        <p className="border-t border-white/[0.07] pt-3 text-[12px] leading-5 text-white/50">
          {vehicle.purpose}
        </p>
      </div>
    </motion.article>
  )
}
