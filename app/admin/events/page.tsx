'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  startDatetime: string
  status: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchEvents = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/events')
    if (res.ok) setEvents(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchEvents() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return
    setDeletingId(id)
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    fetchEvents()
  }

  const handleTogglePublish = async (event: Event) => {
    const newStatus = event.status === 'published' ? 'draft' : 'published'
    await fetch(`/api/admin/events/${event.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    fetchEvents()
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C]">Events</h1>
        <div className="flex gap-3">
          <Link href="/admin" className="text-sm text-[#C1623F] hover:underline">← Dashboard</Link>
          <Link href="/admin/events/new" className="bg-[#C1623F] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#a8522f] transition-colors">
            + Create Event
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Title</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Date</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8 text-gray-400">Loading…</td></tr>
            ) : events.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-8 text-gray-400">No events yet</td></tr>
            ) : (
              events.map(event => (
                <tr key={event.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{event.title}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(event.startDatetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleTogglePublish(event)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {event.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <Link href={`/admin/events/${event.id}/edit`} className="text-xs text-gray-600 hover:text-gray-800">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        disabled={deletingId === event.id}
                        className="text-xs text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
