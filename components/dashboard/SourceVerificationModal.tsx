'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react'

export interface VerificationModalData {
  name: string
  url: string
}

export default function SourceVerificationModal() {
  const [data, setData] = useState<VerificationModalData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [iframeError, setIframeError] = useState(false)

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<VerificationModalData>
      if (customEvent.detail?.url) {
        setData(customEvent.detail)
        setIsLoading(true)
        setIframeError(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setData(null)
      }
    }

    window.addEventListener('beam:open-verify-modal', handleOpen as EventListener)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('beam:open-verify-modal', handleOpen as EventListener)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleClose = () => {
    setData(null)
    setIsLoading(false)
  }

  if (!data) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          onClick={handleClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl h-[88vh] max-h-[850px] bg-[#0A0D14] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#0F131D]/90 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-transport-signal/15 border border-transport-signal/30 flex items-center justify-center text-transport-signal shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-transport-signal font-bold">
                    Evidentiary Source Verification
                  </span>
                  <span className="hidden sm:inline text-white/30 text-xs">·</span>
                  <span className="hidden sm:inline font-mono text-[10px] text-white/50 truncate max-w-sm">
                    {data.url}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white truncate">
                  {data.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition"
                title="Open in new browser tab if embed is restricted"
              >
                <span>Full Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition"
                aria-label="Close verification popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Source Notice Bar */}
          <div className="px-5 py-2 bg-transport-amber/10 border-b border-transport-amber/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-transport-signal animate-pulse" />
              <span>Live Government & Agency Records Frame Embed</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/50 hidden md:inline">
                Verified against federal, county, and agency GTFS schedules.
              </span>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-transport-amber hover:underline font-mono inline-flex items-center gap-1 font-semibold"
              >
                <span>External Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="relative flex-1 w-full bg-white overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0D14] text-white z-10 space-y-3">
                <RefreshCw className="w-7 h-7 text-transport-amber animate-spin" />
                <p className="text-xs font-mono text-white/60">Loading verified source frame...</p>
              </div>
            )}

            <iframe
              src={data.url}
              title={`Source Verification: ${data.name}`}
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false)
                setIframeError(true)
              }}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />

            {iframeError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0A0D14] text-white z-20 space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="max-w-md space-y-1">
                  <h4 className="text-base font-bold text-white">Source Requires Full Window</h4>
                  <p className="text-xs text-white/60">
                    This official site restricts embedding inside third-party frames via browser security headers (X-Frame-Options).
                  </p>
                </div>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-transport-amber text-black font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Open Official Document</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
