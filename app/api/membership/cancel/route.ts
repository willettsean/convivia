import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const membership = await db.membership.update({
    where: { userId: session.user.id },
    data: { status: 'canceled' },
  })

  await sendEmail({
    to: session.user.email!,
    subject: 'Membership Canceled — Convivia',
    body: `Hi ${session.user.name},\n\nYour Convivia membership has been canceled. We're sorry to see you go.\n\nIf you change your mind, you can always re-sign up at convivia.co.\n\nThe Convivia Team`,
  })

  return NextResponse.json(membership)
}
