'use client'
import { useState, useEffect } from 'react'
import BookingCalendar from '@/components/BookingCalendar'

interface Room { id: string; name: string; description: string | null }
interface Reservation {
  id: string
  startDatetime: string
  endDatetime: string
  status: string
  room: Room
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelingId, setCancelingId] = useState<string | null>(null)

  const fetchReservations = async () => {
    const res = await fetch('/api/reservations')
    if (res.ok) setReservations(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchReservations() }, [])

  const handleCancel = async (id: string) => {
    if (!confirm('Cancel this reservation?')) return
    setCancelingId(id)
    await fetch(`/api/reservations/${id}/cancel`, { method: 'POST' })
    setCancelingId(null)
    fetchReservations()
  }

  const now = new Date()
  const upcoming = reservations.filter(r => new Date(r.startDatetime) >= now && r.status !== 'canceled')
  const past = reservations.filter(r => new Date(r.startDatetime) < now || r.status === 'canceled')

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const fmtTime = (d: string) => new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Book a Room</h1>
      <p className="text-gray-500 mb-8">Click or drag to select a time. Operating hours: 7:00 AM – 10:00 PM.</p>

      <BookingCalendar onBookingCreated={fetchReservations} />

      {/* My Reservations */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">My Reservations</h2>

        {loading ? (
          <div className="text-gray-400 py-6 text-center">Loading...</div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Upcoming</h3>
                <div className="space-y-3">
                  {upcoming.map(r => (
                    <div key={r.id} className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between shadow-sm">
                      <div>
                        <div className="font-semibold text-[#2C2C2C]">{r.room.name}</div>
                        <div className="text-sm text-gray-500">{fmt(r.startDatetime)} · {fmtTime(r.startDatetime)} – {fmtTime(r.endDatetime)}</div>
                      </div>
                      <button
                        onClick={() => handleCancel(r.id)}
                        disabled={cancelingId === r.id}
                        className="text-sm text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                      >
                        {cancelingId === r.id ? 'Canceling...' : 'Cancel'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Past</h3>
                <div className="space-y-3">
                  {past.map(r => (
                    <div key={r.id} className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between opacity-70">
                      <div>
                        <div className="font-semibold text-[#2C2C2C]">{r.room.name}</div>
                        <div className="text-sm text-gray-500">{fmt(r.startDatetime)} · {fmtTime(r.startDatetime)} – {fmtTime(r.endDatetime)}</div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${r.status === 'canceled' ? 'bg-red-50 text-red-600' : 'bg-gray-200 text-gray-600'}`}>
                        {r.status === 'canceled' ? 'Canceled' : 'Completed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {upcoming.length === 0 && past.length === 0 && (
              <div className="text-center py-12 text-gray-400">No reservations yet. Use the calendar above to book a room.</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
