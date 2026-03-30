import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase-admin'

function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return null

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
      participantType?: string
      role?: string               // legacy field — keep for backwards compat
      institution?: string
      availability?: string
      interests?: string[]
      story?: string
      // RAG context fields
      ragRoleId?: string
      ragRoleTitle?: string
      ragTrack?: string
      fromRag?: boolean
    }

    // Support both old "role" field and new "participantType" field
    const participantType = payload.participantType || payload.role || ''

    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !participantType ||
      !payload.availability ||
      !payload.story
    ) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const record = {
      name:            payload.name.trim(),
      email:           payload.email.trim(),
      phone:           payload.phone.trim(),
      participantType: participantType.trim(),
      institution:     (payload.institution || '').trim(),
      availability:    payload.availability.trim(),
      interests:       Array.isArray(payload.interests) ? payload.interests : [],
      story:           payload.story.trim(),
      // RAG source tracking
      ragRoleId:       payload.ragRoleId || '',
      ragRoleTitle:    payload.ragRoleTitle || '',
      ragTrack:        payload.ragTrack || '',
      fromRag:         payload.fromRag ?? false,
      sourceSite:      'transport.beamthinktank.space',
      status:          'new',
      createdAt:       Timestamp.now(),
      updatedAt:       Timestamp.now(),
    }

    const docRef = await adminDb
      .collection('transport')
      .doc('cohortApplications')
      .collection('entries')
      .add(record)

    // Email notification
    const transporter = createTransporter()
    if (transporter) {
      const adminRecipient =
        process.env.TRANSPORT_APPLICATION_EMAIL ||
        process.env.SMTP_TO ||
        process.env.SMTP_FROM

      if (adminRecipient) {
        const ragContext = record.fromRag && record.ragRoleTitle
          ? `\nRAG Role: ${record.ragRoleTitle} (${record.ragRoleId}) — ${record.ragTrack} track`
          : ''

        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@beamthinktank.space',
          to: adminRecipient,
          subject: `New BEAM Transportation cohort enrollment: ${record.name}${record.fromRag ? ` [from RAG — ${record.ragRoleTitle}]` : ''}`,
          text: [
            `Name: ${record.name}`,
            `Email: ${record.email}`,
            `Phone: ${record.phone}`,
            `Participant Type: ${record.participantType}`,
            `Institution: ${record.institution}`,
            `Availability: ${record.availability}`,
            `Areas of Interest: ${record.interests.join(', ')}`,
            ragContext,
            '',
            record.story,
          ]
            .filter(Boolean)
            .join('\n'),
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
