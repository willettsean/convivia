'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewCampaignPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({
    subject: '',
    body: '',
    audienceFilter: 'active',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      // Create campaign
      const createRes = await fetch('/api/admin/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: form.subject, body: form.body, audienceFilter: form.audienceFilter }),
      })
      if (!createRes.ok) {
        const data = await createRes.json()
        throw new Error(data.error || 'Failed to create campaign')
      }
      const campaign = await createRes.json()

      // Send immediately
      const sendRes = await fetch(`/api/admin/campaigns/${campaign.id}/send`, { method: 'POST' })
      if (!sendRes.ok) throw new Error('Campaign created but failed to send')
      const sendData = await sendRes.json()

      setSuccess(`Campaign sent to ${sendData.sent} recipients!`)
      setTimeout(() => router.push('/admin/campaigns'), 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const audienceOptions = [
    { value: 'active', label: 'Active members' },
    { value: 'paused', label: 'Paused members' },
    { value: 'canceled', label: 'Canceled members' },
    { value: 'all', label: 'All members' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/admin/campaigns" className="text-sm text-[#C1623F] hover:underline mb-6 inline-block">← Campaigns</Link>
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-8">New Campaign</h1>
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          {success && <p className="text-green-700 text-sm bg-green-50 px-3 py-2 rounded-lg">✅ {success}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
            <select
              value={form.audienceFilter}
              onChange={e => setForm({ ...form, audienceFilter: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
            >
              {audienceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text" required value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
              placeholder="Your email subject…"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
            <textarea
              required rows={8} value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
              placeholder="Write your email content here…"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="bg-[#C1623F] text-white font-semibold px-6 py-2 rounded-xl hover:bg-[#a8522f] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Sending…' : 'Send Now'}
          </button>
        </form>
      </div>
    </div>
  )
}
