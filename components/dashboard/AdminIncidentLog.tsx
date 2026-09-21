'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  ShieldCheck, 
  Filter, 
  Printer, 
  CheckCircle, 
  Quote, 
  Trash2, 
  X, 
  Eye, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertCircle,
  FileText
} from 'lucide-react'
import { getCityIncidents, updateIncidentStatus } from '@/lib/services/truthDashboard'
import type { TransitIncident, IncidentStatus } from '@/lib/types/truthDashboard'
import { useUserRole } from '@/lib/hooks/useUserRole'

interface Props {
  citySlug?: string
}

export default function AdminIncidentLog({ citySlug = 'leesburg-fl' }: Props) {
  const { user, role } = useUserRole()
  const [incidents, setIncidents] = useState<TransitIncident[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dayFilter, setDayFilter] = useState<string>('all')
  const [tripFilter, setTripFilter] = useState<string>('all')
  const [groupFilter, setGroupFilter] = useState<string>('all')

  // Modals / Panels
  const [selectedIncident, setSelectedIncident] = useState<TransitIncident | null>(null)
  const [citingIncidentId, setCitingIncidentId] = useState<string | null>(null)
  const [citedInText, setCitedInText] = useState('')
  const [isExportMode, setIsExportMode] = useState(false)

  const loadIncidents = async () => {
    setIsLoading(true)
    try {
      const data = await getCityIncidents(citySlug)
      setIncidents(data)
    } catch (err) {
      console.error('Error loading incidents:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadIncidents()
  }, [citySlug])

  // Summary counts
  const stats = useMemo(() => {
    const total = incidents.length
    const newCount = incidents.filter((i) => i.status === 'new').length
    const verified = incidents.filter((i) => i.status === 'verified').length
    const cited = incidents.filter((i) => i.status === 'cited').length
    const weekendCount = incidents.filter((i) => ['Saturday', 'Sunday'].includes(i.dayOfWeek)).length
    return { total, newCount, verified, cited, weekendCount }
  }, [incidents])

  // Filtered incidents
  const filtered = useMemo(() => {
    return incidents.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false
      if (dayFilter !== 'all' && item.dayOfWeek !== dayFilter) return false
      if (tripFilter !== 'all' && item.tripType !== tripFilter) return false
      if (groupFilter !== 'all' && !item.populationGroup.includes(groupFilter)) return false
      return true
    })
  }, [incidents, statusFilter, dayFilter, tripFilter, groupFilter])

  const handleMarkVerified = async (id: string) => {
    if (!id) return
    const verifiedBy = user?.email || 'admin@beamthinktank.space'
    const verifiedAt = new Date().toISOString()
    await updateIncidentStatus(citySlug, id, {
      status: 'verified',
      verifiedBy,
      verifiedAt,
    })
    setIncidents((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'verified', verifiedBy, verifiedAt } : i))
    )
  }

  const handleConfirmCited = async (id: string) => {
    if (!id) return
    await updateIncidentStatus(citySlug, id, {
      status: 'cited',
      citedIn: citedInText || 'Lake County BOCC Transit Hearing',
    })
    setIncidents((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'cited', citedIn: citedInText } : i))
    )
    setCitingIncidentId(null)
    setCitedInText('')
  }

  const handleSoftDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this record from the active review view?')) return
    await updateIncidentStatus(citySlug, id, { deleted: true })
    setIncidents((prev) => prev.filter((i) => i.id !== id))
    if (selectedIncident?.id === id) setSelectedIncident(null)
  }

  // City Hall Export Print View
  if (isExportMode) {
    return (
      <div className="bg-white text-black p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:p-0">
        <div className="flex justify-between items-start border-b-2 border-black pb-4">
          <div>
            <h1 className="text-2xl font-black uppercase font-mono tracking-wider">
              BEAM Transportation Community Impact Report
            </h1>
            <h2 className="text-base font-bold text-gray-700">
              Evidentiary Transit Gap Dossier · Leesburg, FL (Lake County)
            </h2>
            <p className="text-xs text-gray-500 font-mono mt-1">
              Generated: {new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}
            </p>
          </div>
          <button
            onClick={() => setIsExportMode(false)}
            className="print:hidden px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase rounded-lg"
          >
            ← Exit Print View
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 border border-gray-300 p-4 rounded-xl bg-gray-50 text-center font-mono">
          <div>
            <span className="text-[10px] text-gray-500 uppercase block">Total Documented</span>
            <span className="text-xl font-bold">{stats.total}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase block">Verified Incidents</span>
            <span className="text-xl font-bold">{stats.verified}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase block">Hearing Citations</span>
            <span className="text-xl font-bold">{stats.cited}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase block">Weekend Impacted</span>
            <span className="text-xl font-bold text-red-600">{stats.weekendCount}</span>
          </div>
        </div>

        {/* List of Verified Incidents */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono border-b border-gray-300 pb-1">
            Documented Community Statements
          </h3>

          {incidents.filter((i) => i.status === 'verified' || i.status === 'cited').length === 0 ? (
            <p className="text-xs text-gray-500 italic">No verified incidents yet.</p>
          ) : (
            incidents
              .filter((i) => i.status === 'verified' || i.status === 'cited')
              .map((item, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-4 space-y-2 text-xs">
                  <div className="flex justify-between font-mono font-bold text-gray-800">
                    <span>
                      Record #{item.id?.slice(-6).toUpperCase()} · {item.date} ({item.dayOfWeek}) · {item.timeOfDay}
                    </span>
                    <span className="uppercase text-gray-600">[{item.tripType}]</span>
                  </div>

                  <p className="text-gray-900 font-medium italic">
                    &ldquo;{item.consequence}&rdquo;
                  </p>

                  <div className="text-[11px] text-gray-600 flex justify-between font-mono">
                    <span>Route Attempted: {item.location} → {item.destination}</span>
                    <span>Submitter: {item.submitterName || 'Anonymous Resident'}</span>
                  </div>

                  {item.citedIn && (
                    <div className="text-[10px] font-mono text-blue-700">
                      Cited in official record: {item.citedIn}
                    </div>
                  )}
                </div>
              ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-black pt-4 text-[10px] text-gray-500 font-mono flex justify-between">
          <span>All accounts submitted voluntarily through BEAM Transportation Truth Dashboard.</span>
          <span>transportation.beamthinktank.space</span>
        </div>

        <div className="print:hidden text-center pt-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-black text-white text-xs font-bold uppercase rounded-full inline-flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            <span>Print or Save to PDF</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-red-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Admin Evidentiary Review Console</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Leesburg Transit Gap Incident Ledger
          </h2>
          <p className="text-xs text-white/50 font-mono mt-0.5">
            Scope: transport/dashboard/cities/leesburg-fl/incidents
          </p>
        </div>

        <button
          onClick={() => setIsExportMode(true)}
          className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition border border-white/20 inline-flex items-center gap-2 shrink-0"
        >
          <FileText className="h-4 w-4 text-transport-signal" />
          <span>Export for City Hall</span>
        </button>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-white/50 uppercase block">Total Submissions</span>
          <span className="text-3xl font-black text-white">{stats.total}</span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <span className="text-[10px] text-amber-400 uppercase block">New (Unreviewed)</span>
          <span className="text-3xl font-black text-amber-400">{stats.newCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-transport-signal/10 border border-transport-signal/30">
          <span className="text-[10px] text-transport-signal uppercase block">Verified Records</span>
          <span className="text-3xl font-black text-transport-signal">{stats.verified}</span>
        </div>

        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
          <span className="text-[10px] text-purple-300 uppercase block">Cited in Hearings</span>
          <span className="text-3xl font-black text-purple-300">{stats.cited}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-white/10 bg-transport-steel/30 flex flex-wrap gap-4 items-center text-xs font-mono">
        <div className="flex items-center gap-1.5 text-white/60">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter:</span>
        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-white/15 bg-black/80 px-3 py-1.5 text-white focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="new">New Only</option>
          <option value="verified">Verified Only</option>
          <option value="cited">Cited Only</option>
        </select>

        {/* Day of Week */}
        <select
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          className="rounded-xl border border-white/15 bg-black/80 px-3 py-1.5 text-white focus:outline-none"
        >
          <option value="all">All Days</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>

        {/* Trip Type */}
        <select
          value={tripFilter}
          onChange={(e) => setTripFilter(e.target.value)}
          className="rounded-xl border border-white/15 bg-black/80 px-3 py-1.5 text-white focus:outline-none"
        >
          <option value="all">All Trip Types</option>
          <option value="work">Work / Interview</option>
          <option value="medical">Medical</option>
          <option value="school">School / Childcare</option>
          <option value="grocery">Grocery / Errands</option>
        </select>

        <span className="ml-auto text-[11px] text-white/40">
          Showing {filtered.length} of {incidents.length} entries
        </span>
      </div>

      {/* Incidents Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-transport-steel/40 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-black/50 text-[10px] font-mono uppercase tracking-wider text-white/50">
                <th className="p-3.5">Date / Day</th>
                <th className="p-3.5">Trip Type</th>
                <th className="p-3.5">Route (From → To)</th>
                <th className="p-3.5">Consequence</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-sans">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/40 font-mono">
                    No community incidents found matching selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-mono whitespace-nowrap">
                      <div className="font-bold text-white">{item.date}</div>
                      <div className={`text-[10px] ${['Saturday', 'Sunday'].includes(item.dayOfWeek) ? 'text-red-400 font-bold' : 'text-white/50'}`}>
                        {item.dayOfWeek} · {item.timeOfDay}
                      </div>
                    </td>

                    <td className="p-3.5 uppercase font-mono text-[10px] text-white/70 whitespace-nowrap">
                      {item.tripType}
                    </td>

                    <td className="p-3.5 max-w-[180px] truncate text-white/80">
                      <span className="text-white font-medium">{item.location}</span>
                      <span className="text-white/40 mx-1">→</span>
                      <span>{item.destination}</span>
                    </td>

                    <td className="p-3.5 max-w-[260px] truncate text-white/70" title={item.consequence}>
                      &ldquo;{item.consequence}&rdquo;
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        item.status === 'cited'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : item.status === 'verified'
                          ? 'bg-transport-signal/20 text-transport-signal border border-transport-signal/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap space-x-1.5 font-mono">
                      {/* View details */}
                      <button
                        onClick={() => setSelectedIncident(item)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                        title="View Full Submission"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>

                      {/* Verify */}
                      {item.status === 'new' && (
                        <button
                          onClick={() => handleMarkVerified(item.id!)}
                          className="px-2 py-1 rounded-lg bg-transport-signal/20 hover:bg-transport-signal text-transport-signal hover:text-black transition text-[10px] font-bold"
                          title="Mark as Verified"
                        >
                          Verify
                        </button>
                      )}

                      {/* Cite in hearing */}
                      {item.status !== 'cited' && (
                        <button
                          onClick={() => setCitingIncidentId(item.id!)}
                          className="px-2 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white transition text-[10px] font-bold"
                          title="Cite in Council Hearing"
                        >
                          Cite
                        </button>
                      )}

                      {/* Soft delete */}
                      <button
                        onClick={() => handleSoftDelete(item.id!)}
                        className="p-1.5 rounded-lg text-red-400/50 hover:text-red-400 transition"
                        title="Soft Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Detail Panel */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0E121C] border-l border-white/15 h-full p-6 sm:p-8 overflow-y-auto space-y-6 text-white text-xs font-sans">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-transport-amber">
                  Submission #{selectedIncident.id?.slice(-6).toUpperCase()}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">Community Incident Details</h3>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-white/40 uppercase text-[10px]">Date & Time</span>
                <p className="text-white font-bold">{selectedIncident.date} ({selectedIncident.dayOfWeek}) · {selectedIncident.timeOfDay}</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-white/40 uppercase text-[10px]">Trip Details</span>
                <p className="text-white"><strong>From:</strong> {selectedIncident.location}</p>
                <p className="text-white"><strong>To:</strong> {selectedIncident.destination}</p>
                <p className="text-white"><strong>Trip Type:</strong> {selectedIncident.tripType}</p>
              </div>

              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1">
                <span className="text-red-400 uppercase text-[10px] font-bold">Documented Consequence</span>
                <p className="text-white font-sans text-sm leading-relaxed">&ldquo;{selectedIncident.consequence}&rdquo;</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-white/40 uppercase text-[10px]">Demographic Background</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedIncident.populationGroup?.map((p, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/10 text-white/80 text-[10px]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-white/40 uppercase text-[10px]">Submitter Information</span>
                <p className="text-white"><strong>Name:</strong> {selectedIncident.submitterName || 'Submitted Anonymously'}</p>
                <p className="text-white"><strong>Email:</strong> {selectedIncident.submitterEmail || 'None provided'}</p>
                <p className="text-white"><strong>Willing to use transit:</strong> {selectedIncident.wouldHaveUsedTransit ? 'Yes' : 'No'}</p>
              </div>

              {selectedIncident.notes && (
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-white/40 uppercase text-[10px]">Additional Notes</span>
                  <p className="text-white/70 font-sans">{selectedIncident.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex gap-2">
              {selectedIncident.status === 'new' && (
                <button
                  onClick={() => {
                    handleMarkVerified(selectedIncident.id!)
                    setSelectedIncident(null)
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-transport-signal text-black font-bold text-xs uppercase font-mono"
                >
                  Verify Incident
                </button>
              )}
              <button
                onClick={() => setSelectedIncident(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase font-mono"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cite In Hearing Modal */}
      {citingIncidentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0D1017] border border-white/20 p-6 space-y-4 text-white">
            <h4 className="text-base font-bold font-mono uppercase text-purple-300">
              Record Official Hearing Citation
            </h4>
            <p className="text-xs text-white/70 font-sans">
              Enter the name of the hearing, city council agenda item, or grant application where this incident account was cited:
            </p>
            <input
              type="text"
              value={citedInText}
              onChange={(e) => setCitedInText(e.target.value)}
              placeholder="e.g. Leesburg City Hall Hearing Agenda Item 4.2"
              className="w-full rounded-xl border border-white/20 bg-black/60 p-3 text-xs text-white focus:outline-none focus:border-purple-400"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCitingIncidentId(null)}
                className="px-4 py-2 rounded-lg bg-white/10 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmCited(citingIncidentId)}
                className="px-4 py-2 rounded-lg bg-purple-500 text-white text-xs font-mono font-bold"
              >
                Save Citation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
