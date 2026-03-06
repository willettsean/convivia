import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { createCheckoutSession } from '@/lib/stripe'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, phone, company, gdprConsent, tier } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
    }
    if (!gdprConsent) {
      return NextResponse.json({ error: 'GDPR consent is required' }, { status: 400 })
    }

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const selectedTier = tier || 'hot_desk'

    const user = await db.user.create({
      data: {
        name, email, passwordHash,
        phone: phone || null,
        company: company || null,
        role: 'member',
        profile: {
          create: {
            gdprConsentTimestamp: new Date(),
            marketingOptIn: false,
          },
        },
        membership: {
          create: {
            tier: selectedTier,
            status: 'pending',
          },
        },
      },
    })

    const checkoutUrl = await createCheckoutSession(selectedTier, email, user.id)
    return NextResponse.json({ checkoutUrl }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
