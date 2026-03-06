import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

const TIER_LABELS: Record<string, string> = {
  hot_desk: 'Hot Desk',
  dedicated_desk: 'Dedicated Desk',
  private_office: 'Private Office',
}

export default async function AdminMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') redirect('/login')

  const member = await db.user.findUnique({
    where: { id },
    include: {
      membership: true,
      profile: true,
      reservations: { include: { room: true }, orderBy: { startDatetime: 'desc' }, take: 10 },
    },
  })
  if (!member) notFound()

  const statusColor = (s: string) => ({
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    canceled: 'bg-red-100 text-red-800',
  }[s] || 'bg-gray-100 text-gray-800')

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/admin/members" className="text-sm text-[#C1623F] hover:underline mb-6 inline-block">← Members</Link>
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-8">{member.name}</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Profile</h2>
          <dl className="space-y-3 text-sm">
            <div><dt className="text-gray-500">Email</dt><dd className="font-medium">{member.email}</dd></div>
            <div><dt className="text-gray-500">Phone</dt><dd className="font-medium">{member.phone || '—'}</dd></div>
            <div><dt className="text-gray-500">Company</dt><dd className="font-medium">{member.company || '—'}</dd></div>
            <div><dt className="text-gray-500">Role</dt><dd className="font-medium">{member.role}</dd></div>
            <div><dt className="text-gray-500">Joined</dt><dd className="font-medium">{member.createdAt.toLocaleDateString()}</dd></div>
            {member.profile && (
              <div><dt className="text-gray-500">Marketing opt-in</dt><dd className="font-medium">{member.profile.marketingOptIn ? 'Yes' : 'No'}</dd></div>
            )}
          </dl>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Membership</h2>
          {member.membership ? (
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Tier</dt>
                <dd className="font-medium">{TIER_LABELS[member.membership.tier] || member.membership.tier}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Status</dt>
                <dd>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor(member.membership.status)}`}>
                    {member.membership.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Period End</dt>
                <dd className="font-medium">{member.membership.currentPeriodEnd ? member.membership.currentPeriodEnd.toLocaleDateString() : '—'}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-gray-500 text-sm">No membership</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Recent Reservations</h2>
        {member.reservations.length === 0 ? (
          <p className="text-gray-500 text-sm">No reservations</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-3 font-semibold text-gray-600">Room</th>
                <th className="pb-3 font-semibold text-gray-600">Date</th>
                <th className="pb-3 font-semibold text-gray-600">Time</th>
                <th className="pb-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {member.reservations.map(r => (
                <tr key={r.id} className="border-b border-gray-50">
                  <td className="py-3">{r.room.name}</td>
                  <td className="py-3 text-gray-500">{r.startDatetime.toLocaleDateString()}</td>
                  <td className="py-3 text-gray-500">
                    {r.startDatetime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} –
                    {r.endDatetime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                  </td>
                  <td className="py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
