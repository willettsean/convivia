'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface EventFormProps {
  initialData?: {
    id?: string
    title?: string
    description?: string
    startDatetime?: string
    endDatetime?: string
    location?: string
    status?: string
  }
  mode: 'create' | 'edit'
}

export default function EventForm({ initialData, mode }: EventFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    startDatetime: initialData?.startDatetime || '',
    endDatetime: initialData?.endDatetime || '',
    location: initialData?.location || 'Convivia, Walnut Creek, CA',
    status: initialData?.status || 'draft',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = mode === 'create' ? '/api/admin/events' : `/api/admin/events/${initialData?.id}`
      const method = mode === 'create' ? 'POST' : 'PATCH'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save event')
      }
      router.push('/admin/events')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text" required value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          required rows={4} value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
          <input
            type="datetime-local" required value={form.startDatetime}
            onChange={e => setForm({ ...form, startDatetime: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
          <input
            type="datetime-local" required value={form.endDatetime}
            onChange={e => setForm({ ...form, endDatetime: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text" value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <button
        type="submit" disabled={loading}
        className="bg-[#C1623F] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#a8522f] disabled:opacity-50 transition-colors"
      >
        {loading ? 'Saving...' : mode === 'create' ? 'Create Event' : 'Update Event'}
      </button>
    </form>
  )
}
