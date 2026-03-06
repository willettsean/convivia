import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const campaign = await db.emailCampaign.findUnique({ where: { id: params.id } })
  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Build audience
  const audienceWhere: any = {}
  if (campaign.audienceFilter === 'active') {
    audienceWhere.membership = { status: 'active' }
  } else if (campaign.audienceFilter === 'paused') {
    audienceWhere.membership = { status: 'paused' }
  } else if (campaign.audienceFilter === 'canceled') {
    audienceWhere.membership = { status: 'canceled' }
  }
  // 'all' has no filter

  const users = await db.user.findMany({ where: audienceWhere, select: { id: true, email: true, name: true } })

  // Log emails
  const logs = await Promise.all(
    users.map(async (user) => {
      await sendEmail({ to: user.email, subject: campaign.subject, body: campaign.body })
      return db.emailLog.create({
        data: {
          type: 'campaign',
          userId: user.id,
          email: user.email,
          subject: campaign.subject,
          status: 'sent',
        },
      })
    })
  )

  // Update campaign status
  const updated = await db.emailCampaign.update({
    where: { id: params.id },
    data: { status: 'sent', sentAt: new Date() },
  })

  return NextResponse.json({ campaign: updated, sent: logs.length })
}
