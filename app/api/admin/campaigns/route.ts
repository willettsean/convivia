import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const campaigns = await db.emailCampaign.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(campaigns)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const body = await req.json()
  const { subject, body: emailBody, audienceFilter } = body

  if (!subject || !emailBody) {
    return NextResponse.json({ error: 'Subject and body required' }, { status: 400 })
  }

  const campaign = await db.emailCampaign.create({
    data: {
      createdById: session.user.id!,
      subject,
      body: emailBody,
      audienceFilter: audienceFilter || 'active',
      status: 'draft',
    },
  })
  return NextResponse.json(campaign, { status: 201 })
}
