import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const TIER_LABELS: Record<string, string> = {
  hot_desk: 'Hot Desk',
  dedicated_desk: 'Dedicated Desk',
  private_office: 'Private Office',
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  canceled: 'bg-red-100 text-red-800',
}

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>
}) {
  const { welcome } = await searchParams
  const session = await auth()
  if (!session?.user) redirect('/login')

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { membership: true },
  })
  if (!user) redirect('/login')

  const membership = user.membership
  const showWelcome = welcome === 'true'

  const quickLinks = [
    { label: 'Book a Room', href: '/portal/reservations', icon: '🗓️' },
    { label: 'Billing', href: '/portal/billing', icon: '💳' },
    { label: 'Profile', href: '/portal/profile', icon: '👤' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {showWelcome && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-8 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-semibold text-green-800">Welcome to Convivia!</p>
            <p className="text-sm text-green-700">Your account is set up and ready to go.</p>
          </div>
        </div>
      )}

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-1">
          Welcome back, {user.name.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your membership.</p>
      </div>

      {membership && (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Membership</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <p className="text-xs text-gray-500 mb-1">Plan</p>
              <span className="bg-[#C1623F]/10 text-[#C1623F] font-semibold px-3 py-1 rounded-full text-sm">
                {TIER_LABELS[membership.tier] || membership.tier}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <span className={`font-semibold px-3 py-1 rounded-full text-sm ${STATUS_STYLES[membership.status] || 'bg-gray-100 text-gray-800'}`}>
                {membership.status.charAt(0).toUpperCase() + membership.status.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Next billing</p>
              <p className="text-sm font-medium text-gray-700">
                {membership.currentPeriodEnd
                  ? membership.currentPeriodEnd.toLocaleDateString()
                  : 'Jan 1, 2027'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C1623F]/30 transition-all flex items-center gap-4"
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="font-semibold text-[#2C2C2C]">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
