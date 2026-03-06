import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const member = await db.user.findUnique({
    where: { id },
    include: {
      membership: true,
      profile: true,
      reservations: { include: { room: true }, orderBy: { startDatetime: 'desc' } },
    },
  })
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(member)
}
