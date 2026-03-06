import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const events = await db.event.findMany({ orderBy: { startDatetime: 'asc' } })
  return NextResponse.json(events)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const body = await req.json()
  const { title, description, startDatetime, endDatetime, location, status } = body

  if (!title || !description || !startDatetime || !endDatetime) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const event = await db.event.create({
    data: {
      title,
      description,
      startDatetime: new Date(startDatetime),
      endDatetime: new Date(endDatetime),
      location: location || 'Convivia, Walnut Creek, CA',
      status: status || 'draft',
    },
  })
  return NextResponse.json(event, { status: 201 })
}
