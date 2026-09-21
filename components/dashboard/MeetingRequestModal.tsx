'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Building, Mail, Phone, User, Briefcase } from 'lucide-react'
import { submitMeetingRequest } from '@/lib/services/truthDashboard'

interface Props {
  isOpen: boolean
  onClose: () => void
  citySlug?: string
}

export default function MeetingRequestModal({ isOpen, onClose, citySlug = 'leesburg-fl' }: Props) {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [represent, setRepresent] = useState('City government')
  const [discussionTopic, setDiscussionTopic] = useState('BEAM service contract')
  const [message, setMessage] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await submitMeetingRequest(citySlug, {
        name,
        title,
        organization,
        email,
        phone,
        represent,
        discussionTopic,
        message,
      })
      setIsSuccess(true)
    } catch (err: any) {
      console.error('Error submitting meeting request:', err)
      setError('Unable to submit request. Please try again or email transport@beamthinktank.space directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#0D1017] p-6 sm:p-8 shadow-2xl text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-transport-signal">
                BEAM Transportation · Direct Contract Proposal
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">Request a Policy or Contract Meeting</h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-transport-signal/20 text-transport-signal ring-4 ring-transport-signal/10">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-2xl font-bold text-white">Meeting Request Logged</h4>
              <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{name}</strong>. Your inquiry regarding <strong className="text-transport-signal">{discussionTopic}</strong> has been transmitted to our policy & fleet operations desk at <span className="font-mono text-xs text-transport-amber">transport@beamthinktank.space</span>.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider transition"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="font-mono font-bold uppercase text-white/60 text-[10px]">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mayor / Commissioner / Director..."
                    className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 focus:border-transport-signal focus:outline-none"
                  />
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="font-mono font-bold uppercase text-white/60 text-[10px]">Title / Role</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. City Commissioner, Fleet Mgr"
                    className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 focus:border-transport-signal focus:outline-none"
                  />
                </div>
              </div>

              {/* Organization */}
              <div className="space-y-1">
                <label className="font-mono font-bold uppercase text-white/60 text-[10px]">Organization / Agency *</label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. City of Leesburg, Lake County BOCC, Auto Dealership..."
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 focus:border-transport-signal focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1">
                  <label className="font-mono font-bold uppercase text-white/60 text-[10px]">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="official@lakecountyfl.gov"
                    className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 focus:border-transport-signal focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="font-mono font-bold uppercase text-white/60 text-[10px]">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(352) 555-0199"
                    className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 focus:border-transport-signal focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* I Represent */}
                <div className="space-y-1">
                  <label className="font-mono font-bold uppercase text-white/60 text-[10px]">I Represent:</label>
                  <select
                    value={represent}
                    onChange={(e) => setRepresent(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/80 p-3 text-sm text-white focus:border-transport-signal focus:outline-none"
                  >
                    <option value="City government">City government</option>
                    <option value="County government">County government</option>
                    <option value="Community org">Community organization</option>
                    <option value="Dealership">Automotive Dealership</option>
                    <option value="Other business">Local Business / Employer</option>
                    <option value="Individual">Individual Resident</option>
                  </select>
                </div>

                {/* I Want to Discuss */}
                <div className="space-y-1">
                  <label className="font-mono font-bold uppercase text-white/60 text-[10px]">Discussion Goal:</label>
                  <select
                    value={discussionTopic}
                    onChange={(e) => setDiscussionTopic(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/80 p-3 text-sm text-white focus:border-transport-signal focus:outline-none"
                  >
                    <option value="BEAM service contract">BEAM Service Contract ($200k model)</option>
                    <option value="Vehicle partnership">Dealership / Vehicle Partnership</option>
                    <option value="Community organizing">Community Organizing & Hearings</option>
                    <option value="Media inquiry">Press / Media Inquiry</option>
                    <option value="Other">Other Operational Inquiries</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="font-mono font-bold uppercase text-white/60 text-[10px]">Proposed Agenda / Context</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share any upcoming budget hearings, fleet transition targets, or community route requests..."
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 focus:border-transport-signal focus:outline-none"
                />
              </div>

              {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-transport-signal hover:bg-emerald-400 text-black font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-transport-signal/20 disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Meeting Request'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
