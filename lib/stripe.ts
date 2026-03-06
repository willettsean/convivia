import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

const PRICE_MAP: Record<string, string> = {
  hot_desk: process.env.STRIPE_PRICE_HOT_DESK!,
  dedicated_desk: process.env.STRIPE_PRICE_DEDICATED_DESK!,
  private_office: process.env.STRIPE_PRICE_PRIVATE_OFFICE!,
  day_pass: process.env.STRIPE_PRICE_DAY_PASS!,
}

export function getPriceId(tier: string): string {
  return PRICE_MAP[tier] || ''
}

export async function createCheckoutSession(tier: string, email: string, userId: string): Promise<string> {
  const isSubscription = tier !== 'day_pass'
  const priceId = getPriceId(tier)

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: isSubscription ? 'subscription' : 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/portal?subscribed=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    metadata: { userId, tier },
  })
  return session.url!
}

export async function createBillingPortalSession(customerId: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/portal/billing`,
  })
  return session.url
}
