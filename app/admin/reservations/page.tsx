'use client'
import { useState, useEffect } from 'react'
import BookingCalendar from '@/components/BookingCalendar'

interface Reservation {
  id: string
  startDatetime: string
  endDatetime: string
  status: string
  room: { id: string; name: string }
  user: { name: string; email: string }
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [dateFilter, setDateFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchReservations = async () => {
    const params = new URLSearchParams()
    if (dateFilter) params.set('date', dateFilter)
    const res = await fetch(`/api/admin/reservations?${params}`)
    if (res.ok) setReservations(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchReservations() }, [dateFilter])

  const handleAdminCancel = async (id: string) => {
    if (!confirm('Cancel this reservation?')) return
    await fetch(`/api/admin/reservations/${id}/cancel`, { method: 'POST' })
    fetchReservations()
  }

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const fmtTime = (d: string) => new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Reservations</h1>
      <p className="text-gray-500 mb-8">Visual calendar with member names. Click and drag to create reservations on behalf of members (creates under admin account).</p>

      <BookingCalendar isAdmin={true} allowPastDates={true} onCancel={handleAdminCancel} onBookingCreated={fetchReservations} />

      {/* Table view */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#2C2C2C]">All Reservations</h2>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Filter by date"
          />
        </div>
        {loading ? (
          <div className="text-gray-400 py-6 text-center">Loading...</div>
        ) : (
          <div className="overflow-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Member</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Room</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(r => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#2C2C2C]">{r.user.name}</div>
                      <div className="text-gray-400 text-xs">{r.user.email}</div>
                    </td>
                    <td className="px-4 py-3 text-[#2C2C2C]">{r.room.name}</td>
                    <td className="px-4 py-3 text-gray-600">{fmt(r.startDatetime)}</td>
                    <td className="px-4 py-3 text-gray-600">{fmtTime(r.startDatetime)} – {fmtTime(r.endDatetime)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${r.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.status === 'confirmed' && (
                        <button onClick={() => handleAdminCancel(r.id)} className="text-red-500 hover:text-red-700 font-medium text-xs">
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No reservations found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
