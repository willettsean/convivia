import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: any
  try {
    if (webhookSecret && webhookSecret !== 'whsec_placeholder' && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } else {
      event = JSON.parse(body)
    }
  } catch (err: any) {
    console.error('Webhook error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata?.userId
        const tier = session.metadata?.tier
        if (!userId) break

        const stripeCustomerId = session.customer
        const stripeSubscriptionId = session.subscription || null

        // For day pass (payment mode), set 1-day membership
        if (tier === 'day_pass') {
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          await db.membership.update({
            where: { userId },
            data: {
              status: 'active',
              stripeCustomerId,
              currentPeriodEnd: tomorrow,
            },
          })
        } else {
          await db.membership.update({
            where: { userId },
            data: {
              status: 'active',
              stripeCustomerId,
              stripeSubscriptionId,
            },
          })
        }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (user) {
          await sendEmail({
            to: user.email,
            subject: 'Welcome to Convivia!',
            body: `Hi ${user.name}, your membership is now active. Welcome to the community!`,
          })
        }
        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object
        const subId = invoice.subscription
        if (!subId) break
        const membership = await db.membership.findFirst({ where: { stripeSubscriptionId: subId } })
        if (!membership) break
        await db.membership.update({
          where: { id: membership.id },
          data: {
            status: 'active',
            currentPeriodEnd: new Date(invoice.lines.data[0]?.period?.end * 1000 || Date.now()),
          },
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        const subId = invoice.subscription
        if (!subId) break
        const membership = await db.membership.findFirst({ where: { stripeSubscriptionId: subId } })
        if (!membership) break
        const user = await db.user.findUnique({ where: { id: membership.userId } })
        if (user) {
          await sendEmail({
            to: user.email,
            subject: 'Payment failed — action required',
            body: `Hi ${user.name}, your latest payment failed. Please update your payment method to keep your membership active.`,
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object
        const membership = await db.membership.findFirst({ where: { stripeSubscriptionId: sub.id } })
        if (!membership) break
        const statusMap: Record<string, string> = {
          active: 'active',
          past_due: 'active',
          paused: 'paused',
          canceled: 'canceled',
          unpaid: 'paused',
        }
        await db.membership.update({
          where: { id: membership.id },
          data: {
            status: statusMap[sub.status] || sub.status,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object
        const membership = await db.membership.findFirst({ where: { stripeSubscriptionId: sub.id } })
        if (!membership) break
        await db.membership.update({
          where: { id: membership.id },
          data: { status: 'canceled' },
        })
        const user = await db.user.findUnique({ where: { id: membership.userId } })
        if (user) {
          await sendEmail({
            to: user.email,
            subject: 'Membership canceled',
            body: `Hi ${user.name}, your Convivia membership has been canceled. We hope to see you again soon.`,
          })
        }
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
  }

  return NextResponse.json({ received: true })
}
