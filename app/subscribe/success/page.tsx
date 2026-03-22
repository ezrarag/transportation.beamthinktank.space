'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Loader } from 'lucide-react'

function SubscribeSuccessPageContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="mx-auto mb-4 h-12 w-12 animate-spin text-transport-amber" />
          <p className="text-white">Activating partner workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center">
        <CheckCircle className="mx-auto h-14 w-14 text-transport-signal" />
        <h1 className="mt-5 text-4xl text-white">Partner tier activated</h1>
        <p className="mt-4 text-sm leading-6 text-white/74">
          Your partner record is being provisioned for BEAM Transportation. Next steps include MOU follow-up, cohort assignment, and workspace onboarding.
        </p>
        <div className="mt-6 space-y-3">
          <Link href="/viewer/partner/milwaukee-auto-parts" className="btn-primary w-full justify-center">
            Open Partner Dashboard
          </Link>
          <Link href="/" className="btn-secondary w-full justify-center">
            Return Home
          </Link>
        </div>
        {sessionId ? <p className="mt-5 text-xs text-white/45">Session: {sessionId.slice(0, 24)}...</p> : null}
      </div>
    </div>
  )
}

export default function SubscribeSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader className="h-12 w-12 animate-spin text-transport-amber" />
        </div>
      }
    >
      <SubscribeSuccessPageContent />
    </Suspense>
  )
}
