import { db } from '@/lib/prisma'
import Link from 'next/link'

export default async function EventsPage() {
  const events = await db.event.findMany({
    where: { status: 'published' },
    orderBy: { startDatetime: 'asc' },
  })

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const fmtTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#2C2C2C] mb-3">Community Events</h1>
      <p className="text-lg text-gray-600 mb-10">
        Workshops, socials, and member-led events — all included in your membership.
      </p>
      {events.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl mb-2">No upcoming events</p>
          <p className="text-sm">Check back soon — we&apos;re always planning something.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className="block">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C1623F]/30 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#2C2C2C] mb-2">{event.title}</h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>📅 {fmt(event.startDatetime)}</span>
                      <span>🕘 {fmtTime(event.startDatetime)} – {fmtTime(event.endDatetime)}</span>
                      <span>📍 {event.location}</span>
                    </div>
                  </div>
                  <span className="text-[#C1623F] font-medium text-sm whitespace-nowrap mt-1">View →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
