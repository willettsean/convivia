'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface ProfileData {
  name: string
  email: string
  phone: string
  company: string
  marketingOptIn: boolean
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<ProfileData>({
    name: '', email: '', phone: '', company: '', marketingOptIn: false,
  })

  useEffect(() => {
    if (session?.user) {
      setForm(prev => ({
        ...prev,
        name: session.user?.name || '',
        email: session.user?.email || '',
      }))
    }
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError('')
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          company: form.company,
          marketingOptIn: form.marketingOptIn,
        }),
      })
      if (!res.ok) throw new Error('Failed to update profile')
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-8">Your Profile</h1>
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-800 text-sm">
              ✅ Profile updated successfully.
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-800 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text" required value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email" value={form.email} disabled
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed here.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
              placeholder="+1 (415) 555-0123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text" value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
              placeholder="Acme Inc."
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox" id="marketing"
              checked={form.marketingOptIn}
              onChange={e => setForm({ ...form, marketingOptIn: e.target.checked })}
              className="h-4 w-4 accent-[#C1623F]"
            />
            <label htmlFor="marketing" className="text-sm text-gray-600">
              Receive marketing emails about events and offers
            </label>
          </div>
          <button
            type="submit" disabled={loading}
            className="bg-[#C1623F] text-white font-semibold px-6 py-2 rounded-xl hover:bg-[#a8522f] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
