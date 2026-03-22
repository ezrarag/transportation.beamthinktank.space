import Link from 'next/link'

export default function SubscribeCanceledPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
      <div className="max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center">
        <h1 className="text-4xl text-white">Checkout canceled</h1>
        <p className="mt-4 text-sm leading-6 text-white/72">
          No changes were made to your BEAM Transportation partner status. You can review the tiers again or jump straight to the application.
        </p>
        <div className="mt-6 space-y-3">
          <Link href="/subscriber" className="btn-primary w-full justify-center">
            Back to Tiers
          </Link>
          <Link href="/partner/apply" className="btn-secondary w-full justify-center">
            Apply Manually
          </Link>
        </div>
      </div>
    </div>
  )
}
