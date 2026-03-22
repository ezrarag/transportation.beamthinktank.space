import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminAuth, adminDb } from '@/lib/firebase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const VALID_TIERS = new Set(['growth', 'anchor'])

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No authorization token provided' }, { status: 401 })
    }

    if (!adminAuth || !adminDb) {
      return NextResponse.json({ error: 'Admin services not initialized' }, { status: 500 })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await adminAuth.verifyIdToken(token)
    const body = await request.json().catch(() => ({}))
    const tier = String(body?.tier || '').trim()

    if (!VALID_TIERS.has(tier)) {
      return NextResponse.json({ error: 'Invalid transport partner tier.' }, { status: 400 })
    }

    const userId = decodedToken.uid
    const userEmail = decodedToken.email || ''
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.data()

    let customerId = userData?.transportStripeCustomerId as string | undefined
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId,
          kind: 'transport_partner',
        },
      })
      customerId = customer.id
      await adminDb.collection('users').doc(userId).set(
        {
          transportStripeCustomerId: customerId,
        },
        { merge: true },
      )
    }

    const priceId =
      tier === 'growth'
        ? process.env.STRIPE_TRANSPORT_GROWTH_PRICE_ID || process.env.STRIPE_PRICE_ID_PREMIUM || process.env.STRIPE_PRICE_ID
        : process.env.STRIPE_TRANSPORT_ANCHOR_PRICE_ID || process.env.STRIPE_PRICE_ID_PREMIUM || process.env.STRIPE_PRICE_ID

    if (!priceId) {
      return NextResponse.json({ error: `Missing Stripe price for tier "${tier}".` }, { status: 500 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transport.beamthinktank.space'
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${baseUrl}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/subscribe/canceled`,
      metadata: {
        kind: 'transport_partner',
        userId,
        userEmail,
        tier,
      },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout session.' },
      { status: 500 },
    )
  }
}
