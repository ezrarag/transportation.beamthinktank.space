'use client'

import { MessageSquare, ArrowUpRight, Smartphone, ShieldCheck } from 'lucide-react'

interface Props {
  citySlug?: string
  cityName?: string
  className?: string
  variant?: 'card' | 'button' | 'banner'
}

export default function AppleMessagesIncidentTrigger({
  citySlug = 'leesburg-fl',
  cityName = 'Leesburg, FL',
  className = '',
  variant = 'card',
}: Props) {
  // Pre-filled incident text template
  const incidentTemplate = encodeURIComponent(
    `BEAM Transit Incident Report (${cityName}):\n• Date / Time: [e.g. Today 7:30 PM]\n• Bus Route / Location: [e.g. Route 1 / Main St]\n• What happened: [e.g. Bus never arrived / Service stopped at 8 PM]\n• Impact: [e.g. Missed shift / stranded / $40 Uber]`
  )

  // SMS target URL: supports Apple Messages on iOS/macOS and Android SMS
  // In production, user can configure NEXT_PUBLIC_DISPATCH_SMS_PHONE in env
  const dispatchNumber = process.env.NEXT_PUBLIC_DISPATCH_SMS_PHONE || '13522049339'
  const smsHref = `sms:${dispatchNumber}&body=${incidentTemplate}`

  if (variant === 'button') {
    return (
      <a
        href={smsHref}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 ${className}`}
      >
        <MessageSquare className="w-4 h-4 text-black" />
        <span>Text via Apple Messages / SMS</span>
      </a>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={`p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Prefer to text your incident?</div>
            <div className="text-[11px] text-white/60">Tap to open Apple Messages with a pre-filled incident template.</div>
          </div>
        </div>
        <a
          href={smsHref}
          className="shrink-0 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition"
        >
          <span>Open Messages</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    )
  }

  return (
    <div className={`rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-transport-steel to-black p-6 sm:p-8 space-y-4 shadow-xl ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold">
          <MessageSquare className="w-4 h-4" />
          <span>Apple Messages & SMS Gateway</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Instant Mobile Log
        </span>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Text Your Transit Incident Directly
        </h3>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
          Stranded at a stop or missed a shift right now? You don’t need to fill out a website form. Tap below to launch Apple Messages on your phone with a structured report template. Inbound texts are logged straight onto the public evidentiary dossier.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <a
          href={smsHref}
          className="px-6 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 inline-flex items-center justify-center gap-2 text-center"
        >
          <MessageSquare className="w-4 h-4 text-black" />
          <span>Text via Apple Messages</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-black" />
        </a>

        <div className="text-[11px] text-white/50 flex items-center gap-1.5 px-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Synced directly to the Lake County Permit & Transit Dashboard.</span>
        </div>
      </div>
    </div>
  )
}
