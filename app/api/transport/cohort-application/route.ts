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
      name?: string
      email?: string
      phone?: string
      role?: string
      institution?: string
      availability?: string
      interests?: string[]
      story?: string
    }

    if (!payload.name || !payload.email || !payload.phone || !payload.role || !payload.availability || !payload.story) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const record = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      role: payload.role.trim(),
      institution: (payload.institution || '').trim(),
      availability: payload.availability.trim(),
      interests: Array.isArray(payload.interests) ? payload.interests : [],
      story: payload.story.trim(),
      status: 'new',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    const docRef = await adminDb.collection('transport').doc('cohortApplications').collection('entries').add(record)

    const transporter = createTransporter()
    if (transporter) {
      const adminRecipient = process.env.TRANSPORT_APPLICATION_EMAIL || process.env.SMTP_TO || process.env.SMTP_FROM
      if (adminRecipient) {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@beamthinktank.space',
          to: adminRecipient,
          subject: `New BEAM Transportation cohort enrollment: ${record.name}`,
          text: [
            `Name: ${record.name}`,
            `Email: ${record.email}`,
            `Phone: ${record.phone}`,
            `Role: ${record.role}`,
            `Institution: ${record.institution}`,
            `Availability: ${record.availability}`,
            `Interests: ${record.interests.join(', ')}`,
            '',
            record.story,
          ].join('\n'),
        })
      }
    }

    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to submit enrollment.' },
      { status: 500 },
    )
  }
}
