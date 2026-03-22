'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronRight, Package, Store } from 'lucide-react'
import type { LogisticsCategory } from '@/lib/transport/types'

type Props = {
  categories: LogisticsCategory[]
}

export default function LogisticsSourceBrowser({ categories }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null)

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  )

  const selectedSupplier = useMemo(
    () => selectedCategory?.suppliers.find((supplier) => supplier.id === selectedSupplierId) ?? null,
    [selectedCategory, selectedSupplierId],
  )

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#161a21] to-[#0e1116] p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-transport-signal">Nested Logistics Browser</p>
        <h3 className="mt-3 text-4xl text-white">Browse Milwaukee sourcing infrastructure</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/72">
          Move from category to supplier to SKU-level items, using the same A to B to C drill-down logic as the Chamber Series browser.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.88fr,1.12fr]">
        <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">Categories</p>
              <h4 className="mt-1 text-3xl text-white">Choose a supply lane</h4>
            </div>
            {selectedCategory ? (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryId(null)
                  setSelectedSupplierId(null)
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/74 transition hover:border-white/30"
              >
                <ArrowLeft className="h-4 w-4" />
                Reset
              </button>
            ) : null}
          </div>
          <div className="mt-4 grid gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setSelectedCategoryId(category.id)
                  setSelectedSupplierId(null)
                }}
                className={`rounded-[24px] border p-4 text-left transition ${
                  selectedCategoryId === category.id ? 'border-transport-amber/60 bg-transport-amber/10' : 'border-white/10 bg-black/25 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-signal">{category.suppliers.length} suppliers</p>
                    <h5 className="mt-2 text-2xl text-white">{category.title}</h5>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/40" />
                </div>
                <p className="mt-2 text-sm leading-6 text-white/68">{category.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
          {!selectedCategory ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-[24px] border border-dashed border-white/15 bg-black/20 text-center text-white/55">
              Pick a category to see local suppliers and items.
            </div>
          ) : !selectedSupplier ? (
            <div className="space-y-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-amber">Suppliers</p>
                <h4 className="mt-1 text-3xl text-white">{selectedCategory.title}</h4>
              </div>
              {selectedCategory.suppliers.map((supplier) => (
                <button
                  key={supplier.id}
                  type="button"
                  onClick={() => setSelectedSupplierId(supplier.id)}
                  className="flex w-full items-center justify-between rounded-[24px] border border-white/10 bg-black/25 p-4 text-left transition hover:border-transport-signal"
                >
                  <div>
                    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-transport-signal">
                      <Store className="h-3.5 w-3.5" />
                      {supplier.neighborhood}
                    </p>
                    <h5 className="mt-2 text-2xl text-white">{supplier.name}</h5>
                    <p className="mt-1 text-sm text-white/62">{supplier.items.length} listed items</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/40" />
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-transport-amber">SKU Listing</p>
                  <h4 className="mt-1 text-3xl text-white">{selectedSupplier.name}</h4>
                  <p className="mt-2 text-sm text-white/68">{selectedSupplier.neighborhood}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSupplierId(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/74 transition hover:border-white/30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </div>
              {selectedSupplier.items.map((item) => (
                <article key={item.id} className="rounded-[24px] border border-white/10 bg-black/25 p-4">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-transport-signal">
                    <Package className="h-3.5 w-3.5" />
                    {item.sku}
                  </p>
                  <h5 className="mt-2 text-2xl text-white">{item.name}</h5>
                  <p className="mt-2 text-sm leading-6 text-white/68">{item.note}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
