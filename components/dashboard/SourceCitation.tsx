'use client'

import { ExternalLink } from 'lucide-react'

interface Props {
  name: string
  url: string
  className?: string
  inline?: boolean
}

export default function SourceCitation({ name, url, className = '', inline = false }: Props) {
  return (
    <div className={`flex items-center gap-2 text-xs text-white/50 ${className}`}>
      <span className="truncate">Source: {name}</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[11px] font-mono text-transport-amber transition-colors hover:bg-transport-amber hover:text-black shrink-0"
        title={`Verify with source: ${url}`}
      >
        <span>Verify</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  )
}
