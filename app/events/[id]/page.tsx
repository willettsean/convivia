import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await db.event.findUnique({ where: { id, status: 'published' } })
  if (!event) notFound()

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const fmtTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/events" className="text-sm text-[#C1623F] hover:underline mb-6 inline-block">← Back to Events</Link>
      <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">{event.title}</h1>
      <div className="flex flex-col gap-2 text-sm text-gray-600 mb-8 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{fmt(event.startDatetime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🕘</span>
          <span>{fmtTime(event.startDatetime)} – {fmtTime(event.endDatetime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{event.location}</span>
        </div>
      </div>
      <div className="prose prose-gray max-w-none mb-10">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.description}</p>
      </div>
      <div className="bg-[#C1623F]/5 border border-[#C1623F]/20 rounded-2xl p-8 text-center">
        <h3 className="font-bold text-[#2C2C2C] mb-2">Want to attend?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Events are free for all Convivia members. Become a member to join this and future events.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-[#C1623F] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#a8522f] transition-colors"
        >
          Become a Member
        </Link>
      </div>
    </div>
  )
}
