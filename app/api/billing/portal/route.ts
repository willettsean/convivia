import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { createBillingPortalSession } from '@/lib/stripe'

export async function POST() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const membership = await db.membership.findUnique({ where: { userId: session.user.id } })
  if (!membership?.stripeCustomerId) {
    return NextResponse.json({ error: 'No billing account found' }, { status: 400 })
  }

  const url = await createBillingPortalSession(membership.stripeCustomerId)
  return NextResponse.json({ url })
}
