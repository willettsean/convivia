import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const reservation = await db.reservation.findUnique({
    where: { id },
    include: { room: true, user: true },
  })
  if (!reservation) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const updated = await db.reservation.update({
    where: { id },
    data: { status: 'canceled' },
  })

  await sendEmail({
    to: reservation.user.email,
    subject: 'Reservation Canceled — Convivia',
    body: `Hi ${reservation.user.name},\n\nYour reservation for ${reservation.room.name} on ${reservation.startDatetime.toLocaleDateString()} has been canceled by admin.`,
  })

  return NextResponse.json(updated)
}
