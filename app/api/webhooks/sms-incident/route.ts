import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    let bodyText = ''
    let fromNumber = ''
    let citySlug = 'leesburg-fl'

    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData()
      bodyText = (formData.get('Body') as string) || ''
      fromNumber = (formData.get('From') as string) || ''
    } else if (contentType.includes('application/json')) {
      const json = await req.json()
      bodyText = json.Body || json.body || json.text || json.message || ''
      fromNumber = json.From || json.from || json.sender || ''
      if (json.citySlug) citySlug = json.citySlug
    } else {
      bodyText = await req.text()
    }

    if (!bodyText.trim()) {
      return NextResponse.json({ error: 'Empty message body' }, { status: 400 })
    }

    // Parse keywords or format if present
    const now = new Date()
    const incidentData = {
      citySlug,
      source: 'sms_apple_messages',
      submitterName: 'SMS Reporter',
      submitterEmail: null,
      submitterPhone: fromNumber ? `${fromNumber.slice(0, 4)}...${fromNumber.slice(-4)}` : null,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      timeOfDay: now.getHours() < 12 ? 'Morning' : now.getHours() < 17 ? 'Afternoon' : now.getHours() < 21 ? 'Evening' : 'Night',
      dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
      location: 'Leesburg / Lake County (via SMS)',
      destination: 'Community Transit Corridor',
      consequence: bodyText.trim(),
      tripType: 'other',
      populationGroup: ['Community Resident'],
      wouldHaveUsedTransit: true,
      notes: `Inbound text report received from ${fromNumber || 'mobile'}: "${bodyText.trim()}"`,
      status: 'new',
      deleted: false,
      createdAt: serverTimestamp(),
    }

    let recordId = `sms-${Date.now().toString(36)}`

    if (db) {
      const colRef = collection(db, 'transport', 'dashboard', 'cities', citySlug, 'incidents')
      const docRef = await addDoc(colRef, incidentData)
      recordId = docRef.id
    }

    // Return TwiML or JSON confirmation
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>BEAM Transit Record #${recordId.slice(-6).toUpperCase()} logged. Your incident is recorded on the Leesburg Public Evidentiary Ledger.</Message>
</Response>`
      return new NextResponse(twiml, {
        headers: { 'Content-Type': 'text/xml' },
        status: 200,
      })
    }

    return NextResponse.json({
      success: true,
      recordId,
      message: 'Transit incident successfully logged via SMS gateway.',
    })
  } catch (error: any) {
    console.error('Error handling SMS webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process incident webhook', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/webhooks/sms-incident',
    description: 'Inbound SMS / Apple Messages transit incident webhook receiver.',
  })
}
