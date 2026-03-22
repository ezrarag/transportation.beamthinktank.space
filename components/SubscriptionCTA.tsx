'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CreditCard, Lock } from 'lucide-react'
import { useUserRole } from '@/lib/hooks/useUserRole'
import { useRouter } from 'next/navigation'

interface SubscriptionCTAProps {
  className?: string
}

export default function SubscriptionCTA({ className = '' }: SubscriptionCTAProps) {
  const { user, role } = useUserRole()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!user) {
      router.push(`/?signin=true&redirect=${encodeURIComponent('/subscriber')}`)
      return
    }

    setLoading(true)
    router.push('/subscriber')
  }

  if (role === 'beam_admin' || role === 'partner_admin' || role === 'board') {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[28px] border border-transport-amber/30 bg-gradient-to-r from-transport-amber/18 to-transport-signal/12 p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-transport-amber/18">
          <Lock className="h-6 w-6 text-transport-amber" />
        </div>
        <div className="flex-1">
          <h3 className="text-3xl text-white">Activate a partner tier</h3>
          <p className="mt-2 text-sm leading-6 text-white/72">
            Use a partner tier to move from interest into active cohort deployment, sourcing support, and BEAM operating infrastructure.
          </p>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="btn-primary mt-5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CreditCard className="h-4 w-4" />
            {loading ? 'Loading...' : 'Review Partner Tiers'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
