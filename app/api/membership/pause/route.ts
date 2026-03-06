import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const membership = await db.membership.update({
    where: { userId: session.user.id },
    data: { status: 'paused' },
  })

  await sendEmail({
    to: session.user.email!,
    subject: 'Membership Paused — Convivia',
    body: `Hi ${session.user.name},\n\nYour Convivia membership has been paused. You can reactivate at any time from your portal.\n\nThe Convivia Team`,
  })

  return NextResponse.json(membership)
}
