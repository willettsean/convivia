import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const date = req.nextUrl.searchParams.get('date')
  if (!date) return NextResponse.json({ error: 'date required' }, { status: 400 })

  const dayStart = new Date(`${date}T00:00:00`)
  const dayEnd = new Date(`${date}T23:59:59`)

  const reservations = await db.reservation.findMany({
    where: {
      roomId: id,
      status: 'confirmed',
      startDatetime: { gte: dayStart, lte: dayEnd },
    },
    select: { id: true, startDatetime: true, endDatetime: true },
    orderBy: { startDatetime: 'asc' },
  })

  return NextResponse.json(reservations)
}
