import Link from 'next/link'
import EventForm from '@/components/EventForm'

export default function NewEventPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/admin/events" className="text-sm text-[#C1623F] hover:underline mb-6 inline-block">← Events</Link>
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-8">Create Event</h1>
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <EventForm mode="create" />
      </div>
    </div>
  )
}
