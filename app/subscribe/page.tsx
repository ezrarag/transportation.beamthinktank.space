'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader, AlertCircle } from 'lucide-react'
import { useUserRole } from '@/lib/hooks/useUserRole'

function SubscribePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading: authLoading } = useUserRole()
  const tier = searchParams?.get('tier')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!tier) {
      router.push('/subscriber')
      return
    }

    if (tier === 'starter') {
      router.push('/partner/apply?tier=starter')
      return
    }

    if (!authLoading && !user) {
      router.push(`/?signin=true&redirect=${encodeURIComponent(`/subscribe?tier=${tier}`)}`)
      return
    }

    if (!authLoading && user && (tier === 'growth' || tier === 'anchor') && !loading && !error) {
      void handleCheckout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier, user, authLoading])

  const handleCheckout = async () => {
    if (!user || !tier) {
      setError('Missing user or tier information')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tier }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to create checkout session')
      }

      if (data?.url) {
        window.location.href = data.url as string
        return
      }

      throw new Error('No checkout URL received')
    } catch (checkoutError) {
      setLoading(false)
      setError(checkoutError instanceof Error ? checkoutError.message : 'Failed to start checkout.')
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="mx-auto mb-4 h-12 w-12 animate-spin text-transport-amber" />
          <p className="text-white">{loading ? 'Redirecting to checkout...' : 'Preparing partner flow...'}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md rounded-[28px] border border-red-500/40 bg-red-500/10 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-300" />
          <h1 className="text-3xl text-white">Partner checkout error</h1>
          <p className="mt-3 text-sm leading-6 text-white/78">{error}</p>
          <div className="mt-6 space-y-3">
            <button onClick={() => void handleCheckout()} className="btn-primary w-full justify-center">
              Try Again
            </button>
            <Link href="/subscriber" className="btn-secondary w-full justify-center">
              Back to Tiers
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function SubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader className="h-12 w-12 animate-spin text-transport-amber" />
        </div>
      }
    >
      <SubscribePageContent />
    </Suspense>
  )
}
