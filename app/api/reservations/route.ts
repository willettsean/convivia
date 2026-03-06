import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const reservations = await db.reservation.findMany({
    where: { userId: session.user.id },
    include: { room: true },
    orderBy: { startDatetime: 'asc' },
  })
  return NextResponse.json(reservations)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { roomId, startDatetime, endDatetime } = body

  if (!roomId || !startDatetime || !endDatetime) {
    return NextResponse.json({ error: 'roomId, startDatetime, endDatetime required' }, { status: 400 })
  }

  const start = new Date(startDatetime)
  const end = new Date(endDatetime)

  // Validate hours 07:00–22:00
  if (start.getHours() < 7 || end.getHours() > 22 || (end.getHours() === 22 && end.getMinutes() > 0)) {
    return NextResponse.json({ error: 'Reservations must be between 07:00 and 22:00' }, { status: 400 })
  }
  if (start >= end) {
    return NextResponse.json({ error: 'End time must be after start time' }, { status: 400 })
  }

  // Reject past bookings
  if (start < new Date()) {
    return NextResponse.json({ error: 'Cannot book in the past' }, { status: 400 })
  }
  // Minimum 30 minutes
  if ((end.getTime() - start.getTime()) < 30 * 60 * 1000) {
    return NextResponse.json({ error: 'Minimum booking duration is 30 minutes' }, { status: 400 })
  }
  // Max 60 days in future
  const maxFuture = new Date()
  maxFuture.setDate(maxFuture.getDate() + 60)
  if (start > maxFuture) {
    return NextResponse.json({ error: 'Cannot book more than 60 days in advance' }, { status: 400 })
  }

  // Check membership
  const membership = await db.membership.findUnique({ where: { userId: session.user.id } })
  if (!membership || membership.status !== 'active') {
    return NextResponse.json({ error: 'Active membership required' }, { status: 403 })
  }

  // Check conflicts
  const conflict = await db.reservation.findFirst({
    where: {
      roomId,
      status: 'confirmed',
      AND: [{ startDatetime: { lt: end } }, { endDatetime: { gt: start } }],
    },
  })
  if (conflict) {
    return NextResponse.json({ error: 'Room is already booked for that time' }, { status: 409 })
  }

  const reservation = await db.reservation.create({
    data: { roomId, userId: session.user.id!, startDatetime: start, endDatetime: end, status: 'confirmed' },
    include: { room: true },
  })

  await sendEmail({
    to: session.user.email!,
    subject: 'Reservation Confirmed — Convivia',
    body: `Hi ${session.user.name},\n\nYour reservation for ${reservation.room.name} is confirmed.\nDate: ${start.toLocaleDateString()}\nTime: ${start.toLocaleTimeString()} – ${end.toLocaleTimeString()}\n\nSee you there!`,
  })

  return NextResponse.json(reservation, { status: 201 })
}
