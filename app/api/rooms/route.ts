import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET() {
  const rooms = await db.room.findMany({ where: { active: true }, orderBy: { name: 'asc' } })
  return NextResponse.json(rooms)
}
