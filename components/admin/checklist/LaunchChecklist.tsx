'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Clock,
  CircleDashed,
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  FileText,
  Users,
  GraduationCap,
  Handshake,
  Wrench,
  DollarSign,
  Cpu,
} from 'lucide-react'
import {
  CHECKLIST_CATEGORIES,
  DEFAULT_CHECKLIST_ITEMS,
  ChecklistItem,
  ChecklistCategory,
} from '@/lib/admin/checklistData'
import Link from 'next/link'

const ICON_MAP: Record<string, any> = {
  ShieldCheck,
  FileText,
  Users,
  GraduationCap,
  Handshake,
  Wrench,
  DollarSign,
  Cpu,
}

export default function LaunchChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST_ITEMS)
  const [selectedCategory, setSelectedCategory] = useState<ChecklistCategory | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'in_progress' | 'pending'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'category' | 'priority' | 'status'>('category')

  // Load saved progress from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('beam_transport_checklist_v1')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge saved statuses with default items
          setItems((prev) =>
            prev.map((item) => {
              const match = parsed.find((p: any) => p.id === item.id)
              return match ? { ...item, status: match.status } : item
            })
          )
        }
      }
    } catch (e) {
      console.warn('Could not read checklist from localStorage', e)
    }
  }, [])

  // Persist updates
  const updateItemStatus = (id: string, newStatus: ChecklistItem['status']) => {
    setItems((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      try {
        localStorage.setItem(
          'beam_transport_checklist_v1',
          JSON.stringify(next.map(({ id, status }) => ({ id, status })))
        )
      } catch (e) {
        console.warn('Could not persist checklist to localStorage', e)
      }
      return next
    })
  }

  const resetToDefault = () => {
    if (confirm('Reset all 64 items to their baseline status?')) {
      setItems(DEFAULT_CHECKLIST_ITEMS)
      try {
        localStorage.removeItem('beam_transport_checklist_v1')
      } catch (e) {}
    }
  }

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false
        if (statusFilter !== 'all' && item.status !== statusFilter) return false
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.targetPhase?.toLowerCase().includes(q)
          )
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const weight = { critical: 3, high: 2, medium: 1 }
          return weight[b.priority] - weight[a.priority]
        }
        if (sortBy === 'status') {
          const weight = { in_progress: 3, done: 2, pending: 1 }
          return weight[b.status] - weight[a.status]
        }
        return a.category.localeCompare(b.category)
      })
  }, [items, selectedCategory, statusFilter, searchQuery, sortBy])

  // Progress metrics
  const totalCount = items.length
  const doneCount = items.filter((i) => i.status === 'done').length
  const inProgressCount = items.filter((i) => i.status === 'in_progress').length
  const pendingCount = items.filter((i) => i.status === 'pending').length
  const percentComplete = Math.round((doneCount / totalCount) * 100)

  return (
    <div className="space-y-8 font-sans">
      {/* Top Stat Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-wider truncate">
            Total Actions
          </span>
          <div className="my-1 text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            {totalCount}
          </div>
          <span className="text-[10px] sm:text-[11px] text-white/40 truncate">8 operational tracks</span>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-mono text-transport-signal uppercase tracking-wider truncate">
            Completed
          </span>
          <div className="my-1 text-2xl sm:text-4xl font-extrabold text-transport-signal font-sans tracking-tight">
            {doneCount}
          </div>
          <span className="text-[10px] sm:text-[11px] text-white/40 truncate">{percentComplete}% overall readiness</span>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-mono text-transport-amber uppercase tracking-wider truncate">
            In Progress
          </span>
          <div className="my-1 text-2xl sm:text-4xl font-extrabold text-transport-amber font-sans tracking-tight">
            {inProgressCount}
          </div>
          <span className="text-[10px] sm:text-[11px] text-white/40 truncate">Active execution</span>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-mono text-white/40 uppercase tracking-wider truncate">
            Pending
          </span>
          <div className="my-1 text-2xl sm:text-4xl font-extrabold text-white/80 font-sans tracking-tight">
            {pendingCount}
          </div>
          <span className="text-[10px] sm:text-[11px] text-white/40 truncate">Weeks 2–4 queue</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
          <span className="text-white/80 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono text-[10px] sm:text-xs">
            <Sparkles className="w-3.5 h-3.5 text-transport-signal flex-shrink-0" />
            Launch Readiness Progress
          </span>
          <span className="text-transport-signal font-bold font-mono text-xs sm:text-sm">
            {doneCount} of {totalCount} Items Done ({percentComplete}%)
          </span>
        </div>
        <div className="h-2 sm:h-2.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-transport-amber via-emerald-400 to-transport-signal rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentComplete}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Control Bar: Categories, Filters, Search */}
      <div className="space-y-3 sm:space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 pt-0.5 no-scrollbar touch-pan-x -mx-1 px-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-transport-amber text-black font-bold shadow-lg shadow-transport-amber/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            All Tracks ({totalCount})
          </button>
          {CHECKLIST_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || ShieldCheck
            const catCount = items.filter((i) => i.category === cat.id).length
            const isSelected = selectedCategory === cat.id

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: isSelected ? '#000' : cat.color }} />
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-60 font-mono">({catCount})</span>
              </button>
            )
          })}
        </div>

        {/* Filters and Search Row */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 64 checklist items..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-transport-amber"
            />
          </div>

          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 w-full sm:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
              className="bg-[#12141A] border border-white/15 text-white text-[11px] sm:text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-transport-amber truncate"
            >
              <option value="all">Status: All</option>
              <option value="done">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Queued</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              aria-label="Sort checklist items"
              className="bg-[#12141A] border border-white/15 text-white text-[11px] sm:text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-transport-amber truncate"
            >
              <option value="category">Sort: Category</option>
              <option value="priority">Sort: Priority</option>
              <option value="status">Sort: Status</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={resetToDefault}
              title="Reset to default"
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition flex items-center justify-center flex-shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredItems.map((item) => {
            const catMeta = CHECKLIST_CATEGORIES.find((c) => c.id === item.category)
            const Icon = catMeta ? ICON_MAP[catMeta.icon] : ShieldCheck

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`p-3.5 sm:p-5 rounded-2xl border transition-all ${
                  item.status === 'done'
                    ? 'bg-emerald-950/10 border-emerald-500/20'
                    : item.status === 'in_progress'
                    ? 'bg-amber-950/10 border-amber-500/20'
                    : 'bg-white/[0.02] border-white/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  {/* Left: Icon & Content */}
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10"
                      style={{ backgroundColor: `${catMeta?.color || '#3B82F6'}15` }}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: catMeta?.color || '#3B82F6' }} />}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-[9px] sm:text-[10px] font-mono text-white/50 uppercase tracking-wider">
                          {catMeta?.name}
                        </span>
                        {item.targetPhase && (
                          <span className="text-[9px] sm:text-[10px] font-mono text-transport-amber/90 bg-transport-amber/10 border border-transport-amber/20 px-1.5 py-0.5 rounded-md">
                            {item.targetPhase}
                          </span>
                        )}
                        <span
                          className={`text-[8px] sm:text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md font-bold ${
                            item.priority === 'critical'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : item.priority === 'high'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>

                      <h3
                        className={`text-xs sm:text-sm font-bold transition-all ${
                          item.status === 'done' ? 'line-through text-white/60' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p className="text-[11px] sm:text-xs text-white/65 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right / Bottom: Status Toggles */}
                  <div className="grid grid-cols-3 sm:flex items-center gap-1 w-full sm:w-auto bg-black/40 p-1 rounded-xl border border-white/10 mt-1 sm:mt-0 flex-shrink-0">
                    <button
                      onClick={() => updateItemStatus(item.id, 'done')}
                      className={`py-1.5 sm:py-1 px-2 sm:px-2.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
                        item.status === 'done'
                          ? 'bg-emerald-500 text-black font-bold shadow-sm'
                          : 'text-white/50 hover:text-emerald-400 hover:bg-white/5'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Done</span>
                    </button>

                    <button
                      onClick={() => updateItemStatus(item.id, 'in_progress')}
                      className={`py-1.5 sm:py-1 px-2 sm:px-2.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
                        item.status === 'in_progress'
                          ? 'bg-amber-400 text-black font-bold shadow-sm'
                          : 'text-white/50 hover:text-amber-300 hover:bg-white/5'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Active</span>
                    </button>

                    <button
                      onClick={() => updateItemStatus(item.id, 'pending')}
                      className={`py-1.5 sm:py-1 px-2 sm:px-2.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
                        item.status === 'pending'
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <CircleDashed className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Queued</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 rounded-2xl border border-dashed border-white/15 space-y-2">
            <p className="text-sm font-semibold text-white/70">No checklist items match your filters</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setStatusFilter('all')
                setSearchQuery('')
              }}
              className="text-xs text-transport-amber hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Footer Navigation Links */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
        <div>
          <span>Connected to </span>
          <strong className="text-white">BEAM Transportation Operational Ledger</strong>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin/implementation-timeline"
            className="flex items-center gap-1.5 text-transport-amber hover:text-amber-300 font-semibold"
          >
            <span>View Implementation Timeline</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/dashboard/leesburg-fl"
            className="flex items-center gap-1.5 text-transport-signal hover:text-emerald-300 font-semibold"
          >
            <span>Open Leesburg Truth Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
