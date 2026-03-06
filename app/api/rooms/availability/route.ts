import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  const roomIds = req.nextUrl.searchParams.getAll('room_ids')

  if (!date) return NextResponse.json({ error: 'date required' }, { status: 400 })

  const dayStart = new Date(`${date}T00:00:00`)
  const dayEnd = new Date(`${date}T23:59:59`)

  const where: any = {
    status: 'confirmed',
    startDatetime: { gte: dayStart, lte: dayEnd },
  }
  if (roomIds.length > 0) where.roomId = { in: roomIds }

  const reservations = await db.reservation.findMany({
    where,
    select: {
      id: true,
      roomId: true,
      startDatetime: true,
      endDatetime: true,
      user: { select: { name: true, id: true } },
    },
    orderBy: { startDatetime: 'asc' },
  })

  // Group by room
  const rooms = await db.room.findMany({
    where: roomIds.length > 0 ? { id: { in: roomIds }, active: true } : { active: true },
    orderBy: { name: 'asc' },
  })

  return NextResponse.json({
    date,
    rooms: rooms.map(room => ({
      id: room.id,
      name: room.name,
      reservations: reservations
        .filter(r => r.roomId === room.id)
        .map(r => ({
          id: r.id,
          start: r.startDatetime.toISOString(),
          end: r.endDatetime.toISOString(),
          memberName: r.user.name,
          memberId: r.user.id,
        })),
    })),
  })
}
