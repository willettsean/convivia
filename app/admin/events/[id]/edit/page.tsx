import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import EventForm from '@/components/EventForm'

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') redirect('/login')

  const event = await db.event.findUnique({ where: { id } })
  if (!event) notFound()

  const toLocalDatetime = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/admin/events" className="text-sm text-[#C1623F] hover:underline mb-6 inline-block">← Events</Link>
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-8">Edit Event</h1>
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <EventForm
          mode="edit"
          initialData={{
            id: event.id,
            title: event.title,
            description: event.description,
            startDatetime: toLocalDatetime(event.startDatetime),
            endDatetime: toLocalDatetime(event.endDatetime),
            location: event.location,
            status: event.status,
          }}
        />
      </div>
    </div>
  )
}
