import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, phone, company, marketingOptIn } = body

  const user = await db.user.update({
    where: { id: session.user.id },
    data: {
      ...(name && { name }),
      ...(phone !== undefined && { phone }),
      ...(company !== undefined && { company }),
    },
  })

  if (marketingOptIn !== undefined) {
    await db.memberProfile.upsert({
      where: { userId: session.user.id! },
      update: { marketingOptIn },
      create: { userId: session.user.id!, gdprConsentTimestamp: new Date(), marketingOptIn },
    })
  }

  return NextResponse.json({ id: user.id, name: user.name, phone: user.phone, company: user.company })
}
