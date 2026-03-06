'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Member {
  id: string
  name: string
  email: string
  createdAt: string
  membership: { tier: string; status: string } | null
}

const TIER_LABELS: Record<string, string> = {
  hot_desk: 'Hot Desk',
  dedicated_desk: 'Dedicated Desk',
  private_office: 'Private Office',
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true)
      const res = await fetch(`/api/admin/members${search ? `?search=${encodeURIComponent(search)}` : ''}`)
      if (res.ok) setMembers(await res.json())
      setLoading(false)
    }
    const debounce = setTimeout(fetchMembers, 300)
    return () => clearTimeout(debounce)
  }, [search])

  const statusColor = (s: string) => ({
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    canceled: 'bg-red-100 text-red-800',
  }[s] || 'bg-gray-100 text-gray-800')

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C]">Members</h1>
        <Link href="/admin" className="text-sm text-[#C1623F] hover:underline">← Dashboard</Link>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
        />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Name</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Email</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Tier</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Joined</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading…</td></tr>
            ) : members.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">No members found</td></tr>
            ) : (
              members.map(m => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/members/${m.id}`} className="font-medium text-[#C1623F] hover:underline">
                      {m.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{m.email}</td>
                  <td className="px-6 py-4 text-gray-600">{m.membership ? TIER_LABELS[m.membership.tier] || m.membership.tier : '—'}</td>
                  <td className="px-6 py-4">
                    {m.membership ? (
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor(m.membership.status)}`}>
                        {m.membership.status}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(m.createdAt).toLocaleDateString()}
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
