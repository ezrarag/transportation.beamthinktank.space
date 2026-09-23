'use client'

import { ExternalLink } from 'lucide-react'

interface Props {
  name: string
  url: string
  className?: string
  inline?: boolean
}

export default function SourceCitation({ name, url, className = '', inline = false }: Props) {
  const handleVerify = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('beam:open-verify-modal', {
          detail: { name, url },
        })
      )
    }
  }

  return (
    <div className={`flex items-center gap-2 text-xs text-white/50 ${className}`}>
      <span className="truncate">Source: {name}</span>
      <button
        type="button"
        onClick={handleVerify}
        className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[11px] font-mono text-transport-amber transition-colors hover:bg-transport-amber hover:text-black shrink-0 cursor-pointer"
        title={`Verify with source: ${url} (opens in embedded frame)`}
      >
        <span>Verify</span>
        <ExternalLink className="h-3 w-3" />
      </button>
    </div>
  )
}
