'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboardRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/admin')
  }, [router])

  return (
    <div className="min-h-screen bg-transport-black text-white flex items-center justify-center p-8">
      <div className="flex items-center gap-3 font-mono text-sm text-white/60">
        <div className="w-4 h-4 border-2 border-transport-amber border-t-transparent rounded-full animate-spin" />
        <span>Redirecting to Executive Admin Hub...</span>
      </div>
    </div>
  )
}
