'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const TIER_LABELS: Record<string, string> = {
  hot_desk: 'Hot Desk — $199/mo',
  dedicated_desk: 'Dedicated Desk — $349/mo',
  private_office: 'Private Office — $799/mo',
  day_pass: 'Day Pass — $50 one-time',
}

function SignupForm() {
  const searchParams = useSearchParams()
  const tier = searchParams.get('tier') || 'hot_desk'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', company: '', gdprConsent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tier }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Signup failed'); return }
      window.location.href = data.checkoutUrl
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Create your account</h1>
      {tier && TIER_LABELS[tier] && (
        <div className="bg-[#C1623F]/10 border border-[#C1623F]/30 rounded-lg px-4 py-3 mb-6">
          <p className="text-sm font-medium text-[#C1623F]">Selected plan: {TIER_LABELS[tier]}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text" required value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
          <input
            type="password" required value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
            placeholder="Min. 8 characters"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
          <input
            type="tel" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
            placeholder="+1 (415) 555-0123"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company (optional)</label>
          <input
            type="text" value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
            placeholder="Acme Inc."
          />
        </div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox" required id="gdpr"
            checked={form.gdprConsent}
            onChange={e => setForm({ ...form, gdprConsent: e.target.checked })}
            className="mt-0.5 h-4 w-4 accent-[#C1623F]"
          />
          <label htmlFor="gdpr" className="text-sm text-gray-600">
            I agree to the{' '}
            <Link href="/privacy" className="text-[#C1623F] underline">Privacy Policy</Link> and{' '}
            <Link href="/terms" className="text-[#C1623F] underline">Terms of Service</Link>. *
          </label>
        </div>
        <button
          type="submit" disabled={loading}
          className="w-full bg-[#C1623F] text-white font-semibold py-3 rounded-xl hover:bg-[#a8522f] disabled:opacity-50 transition-colors"
        >
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-[#C1623F] font-medium">Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}
