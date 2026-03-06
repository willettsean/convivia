'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Campaign {
  id: string
  subject: string
  audienceFilter: string
  status: string
  sentAt: string | null
  createdAt: string
}

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/campaigns').then(r => r.json()).then(data => {
      setCampaigns(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C]">Email Campaigns</h1>
        <div className="flex gap-3">
          <Link href="/admin" className="text-sm text-[#C1623F] hover:underline">← Dashboard</Link>
          <Link href="/admin/campaigns/new" className="bg-[#C1623F] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#a8522f] transition-colors">
            + New Campaign
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Subject</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Audience</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Sent At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8 text-gray-400">Loading…</td></tr>
            ) : campaigns.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-8 text-gray-400">No campaigns yet</td></tr>
            ) : (
              campaigns.map(c => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{c.subject}</td>
                  <td className="px-6 py-4 text-gray-500 capitalize">{c.audienceFilter.replace('_', ' ')}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      c.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {c.sentAt ? new Date(c.sentAt).toLocaleString() : '—'}
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
