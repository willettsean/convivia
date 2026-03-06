import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const reservation = await db.reservation.findUnique({
    where: { id },
    include: { room: true },
  })
  if (!reservation) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const isAdmin = (session.user as any).role === 'admin'
  if (!isAdmin && reservation.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const updated = await db.reservation.update({
    where: { id },
    data: { status: 'canceled' },
  })

  await sendEmail({
    to: session.user.email!,
    subject: 'Reservation Canceled — Convivia',
    body: `Your reservation for ${reservation.room.name} on ${reservation.startDatetime.toLocaleDateString()} has been canceled.`,
  })

  return NextResponse.json(updated)
}
