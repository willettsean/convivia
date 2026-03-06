import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') redirect('/login')

  const totalMembers = await db.user.count({ where: { role: 'member' } })
  const activeMembers = await db.membership.count({ where: { status: 'active' } })

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  const reservationsToday = await db.reservation.count({
    where: { startDatetime: { gte: todayStart, lte: todayEnd }, status: 'confirmed' },
  })

  const upcomingEvents = await db.event.count({
    where: { startDatetime: { gte: new Date() }, status: 'published' },
  })

  const stats = [
    { label: 'Total Members', value: totalMembers, href: '/admin/members', icon: '👥' },
    { label: 'Active Members', value: activeMembers, href: '/admin/members', icon: '✅' },
    { label: 'Reservations Today', value: reservationsToday, href: '/admin/reservations', icon: '🗓️' },
    { label: 'Upcoming Events', value: upcomingEvents, href: '/admin/events', icon: '🎉' },
  ]

  const navLinks = [
    { label: 'Members', href: '/admin/members', icon: '👥', desc: 'View and manage all members' },
    { label: 'Reservations', href: '/admin/reservations', icon: '🗓️', desc: 'View and manage room bookings' },
    { label: 'Events', href: '/admin/events', icon: '🎉', desc: 'Create and manage community events' },
    { label: 'Campaigns', href: '/admin/campaigns', icon: '📧', desc: 'Send email campaigns to members' },
    { label: 'Settings', href: '/admin/settings', icon: '⚙️', desc: 'Rooms and availability settings' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-1">Admin Dashboard</h1>
        <p className="text-gray-500">Convivia management portal</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-3xl font-bold text-[#C1623F]">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C1623F]/30 transition-all"
          >
            <div className="text-2xl mb-3">{link.icon}</div>
            <p className="font-bold text-[#2C2C2C] mb-1">{link.label}</p>
            <p className="text-sm text-gray-500">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
