import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase-admin'

function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return null
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export async function POST(request: NextRequest) {
  if (!adminDb) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
  }

  try {
    const payload = (await request.json()) as {
      businessName?: string
      ownerName?: string
      email?: string
      phone?: string
      businessType?: string
      neighborhood?: string
      needs?: string[]
      preferredStyle?: string
      heardFrom?: string
      tierInterest?: string
      story?: string
    }

    if (!payload.businessName || !payload.ownerName || !payload.email || !payload.phone || !payload.story) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const record = {
      businessName: payload.businessName.trim(),
      ownerName: payload.ownerName.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      businessType: (payload.businessType || '').trim(),
      neighborhood: (payload.neighborhood || '').trim(),
      needs: Array.isArray(payload.needs) ? payload.needs : [],
      preferredStyle: (payload.preferredStyle || '').trim(),
      heardFrom: (payload.heardFrom || '').trim(),
      tierInterest: (payload.tierInterest || '').trim(),
      story: payload.story.trim(),
      status: 'new',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    const docRef = await adminDb.collection('transport').doc('partnerApplications').collection('entries').add(record)

    const transporter = createTransporter()
    if (transporter) {
      const adminRecipient = process.env.TRANSPORT_APPLICATION_EMAIL || process.env.SMTP_TO || process.env.SMTP_FROM
      if (adminRecipient) {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@beamthinktank.space',
          to: adminRecipient,
          subject: `New BEAM Transportation partner application: ${record.businessName}`,
          text: [
            `Business: ${record.businessName}`,
            `Owner: ${record.ownerName}`,
            `Email: ${record.email}`,
            `Phone: ${record.phone}`,
            `Type: ${record.businessType}`,
            `Neighborhood: ${record.neighborhood}`,
            `Needs: ${record.needs.join(', ')}`,
            `Preferred style: ${record.preferredStyle}`,
            `Tier interest: ${record.tierInterest}`,
            '',
            record.story,
          ].join('\n'),
        })
      }
    }

    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to submit application.' },
      { status: 500 },
    )
  }
}
