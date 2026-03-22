import { Suspense } from 'react'
import TransportViewer from '@/components/transport/TransportViewer'

export default function ViewerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading viewer...
        </div>
      }
    >
      <TransportViewer />
    </Suspense>
  )
}
