import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Stripe from 'stripe'
import { Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

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

async function sendWelcomeEmail(email: string, tier: string) {
  const transporter = createTransporter()
  const recipient = email.trim()
  if (!transporter || !recipient) {
    return
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@beamthinktank.space',
    to: recipient,
    subject: `BEAM Transportation ${tier} partner activation`,
    text: `Your BEAM Transportation ${tier} partner tier is active. We will follow up with MOU planning, cohort assignment, and workspace onboarding.`,
  })
}

async function updateTransportPartnerRecord(options: {
  userId: string
  userEmail: string
  tier: string
  status: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId: string
  currentPeriodStart?: number
  currentPeriodEnd?: number
}) {
  if (!adminDb) return

  const partnerRef = adminDb.collection('transport').doc('partners').collection('records').doc(options.userId)
  await partnerRef.set(
    {
      userId: options.userId,
      email: options.userEmail,
      tier: options.tier,
      status: options.status,
      cohortAssignments:
        options.tier === 'anchor'
          ? ['eric', 'ana-r', 'tyrone-c', 'uwm-mobility-lab']
          : ['eric', 'ana-r'],
      documents: ['MOU pending', 'Welcome packet pending'],
      stripeCustomerId: options.stripeCustomerId,
      stripeSubscriptionId: options.stripeSubscriptionId,
      stripePriceId: options.stripePriceId,
      currentPeriodStart: options.currentPeriodStart ? Timestamp.fromMillis(options.currentPeriodStart * 1000) : null,
      currentPeriodEnd: options.currentPeriodEnd ? Timestamp.fromMillis(options.currentPeriodEnd * 1000) : null,
      updatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    },
    { merge: true },
  )

  await adminDb.collection('users').doc(options.userId).set(
    {
      transportPartnerTier: options.tier,
      transportPartnerStatus: options.status,
      transportStripeCustomerId: options.stripeCustomerId,
      updatedAt: Timestamp.now(),
    },
    { merge: true },
  )
}

export async function POST(request: NextRequest) {
  if (!adminDb) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode === 'subscription' && session.subscription && session.metadata?.kind === 'transport_partner') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        const userId = session.metadata?.userId || ''
        const userEmail = session.customer_email || session.metadata?.userEmail || ''
        const tier = session.metadata?.tier || 'growth'

        if (userId) {
          await updateTransportPartnerRecord({
            userId,
            userEmail,
            tier,
            status: subscription.status,
            stripeCustomerId: String(subscription.customer),
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id || '',
            currentPeriodStart: subscription.current_period_start,
            currentPeriodEnd: subscription.current_period_end,
          })
          await sendWelcomeEmail(userEmail, tier)
        }
      }
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription
      const partnerDocs = await adminDb
        .collection('transport')
        .doc('partners')
        .collection('records')
        .where('stripeSubscriptionId', '==', subscription.id)
        .limit(1)
        .get()

      if (!partnerDocs.empty) {
        const partnerDoc = partnerDocs.docs[0]
        const partnerData = partnerDoc.data() as { userId?: string; email?: string; tier?: string }
        const status = event.type === 'customer.subscription.deleted' ? 'canceled' : subscription.status

        await updateTransportPartnerRecord({
          userId: partnerData.userId || partnerDoc.id,
          userEmail: partnerData.email || '',
          tier: partnerData.tier || 'growth',
          status,
          stripeCustomerId: String(subscription.customer),
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price.id || '',
          currentPeriodStart: subscription.current_period_start,
          currentPeriodEnd: subscription.current_period_end,
        })
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Webhook processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
