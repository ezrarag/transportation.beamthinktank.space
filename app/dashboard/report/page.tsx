'use client'

import TransportHeader from '@/components/transport/TransportHeader'
import TransportFooter from '@/components/transport/TransportFooter'
import IncidentForm from '@/components/dashboard/IncidentForm'

export default function IncidentReportPage() {
  return (
    <div className="min-h-screen bg-transport-black text-white selection:bg-red-500 selection:text-white flex flex-col justify-between">
      <TransportHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1">
        <IncidentForm />
      </main>

      <TransportFooter />
    </div>
  )
}
