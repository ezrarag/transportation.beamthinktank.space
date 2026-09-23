'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Loader2, ShieldCheck, Mail, Calendar, UserCheck } from 'lucide-react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRequireRole } from '@/lib/hooks/useUserRole'
import { useRouter } from 'next/navigation'

export default function CohortManagerPage() {
  const router = useRouter()
  const { hasAccess, loading: roleLoading, redirect } = useRequireRole('beam_admin')
  
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (roleLoading) return
    
    if (redirect || !hasAccess) {
      router.push('/admin')
    }
  }, [hasAccess, redirect, roleLoading, router])

  useEffect(() => {
    const fetchCohortMembers = async () => {
      try {
        if (!db) {
          setLoading(false)
          return
        }

        const q = query(
          collection(db, 'users'),
          orderBy('name', 'asc'),
          limit(100)
        )
        const snapshot = await getDocs(q)
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setMembers(usersData)
      } catch (error) {
        console.error('Error fetching cohort members:', error)
      } finally {
        setLoading(false)
      }
    }

    if (hasAccess && !redirect) {
      fetchCohortMembers()
    }
  }, [hasAccess, redirect])

  if (roleLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-transport-amber" />
      </div>
    )
  }

  if (redirect || !hasAccess) {
    return null
  }

  const filteredMembers = members.filter(member =>
    (member.name || member.displayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.role || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="space-y-2 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Workforce & Crew</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Cohort & Crew Manager
        </h1>
        <p className="text-sm text-white/60 max-w-2xl font-sans">
          Review and manage driver pledges, mechanic apprentice certifications, operator assignments, and fleet dispatch workforce.
        </p>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full pl-11 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-transport-amber transition"
          />
        </div>
      </div>

      {/* Cohort Table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] border-b border-white/10 text-xs font-mono uppercase tracking-wider text-white/50">
              <tr>
                <th className="px-6 py-4">Crew Member</th>
                <th className="px-6 py-4">Assigned Role</th>
                <th className="px-6 py-4">Corridor / Hub</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-white/40 text-sm">
                    No cohort members matched your query.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">
                        {member.name || member.displayName || 'Unnamed Member'}
                      </div>
                      <div className="text-xs text-white/50 font-mono mt-0.5">
                        {member.email || 'No email provided'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-transport-amber bg-transport-amber/10 border border-transport-amber/30 px-2 py-0.5 rounded">
                        {member.role || 'Driver / Operator'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/60 font-mono">
                      {member.city || 'Lake County / Leesburg'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Active</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
