import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const date = req.nextUrl.searchParams.get('date')
  const roomId = req.nextUrl.searchParams.get('roomId')

  const where: any = {}
  if (date) {
    const dayStart = new Date(`${date}T00:00:00`)
    const dayEnd = new Date(`${date}T23:59:59`)
    where.startDatetime = { gte: dayStart, lte: dayEnd }
  }
  if (roomId) where.roomId = roomId

  const reservations = await db.reservation.findMany({
    where,
    include: { user: true, room: true },
    orderBy: { startDatetime: 'desc' },
  })

  return NextResponse.json(reservations)
}
