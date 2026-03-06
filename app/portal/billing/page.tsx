'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const TIER_LABELS: Record<string, string> = {
  hot_desk: 'Hot Desk — $199/mo',
  dedicated_desk: 'Dedicated Desk — $349/mo',
  private_office: 'Private Office — $799/mo',
}

function BillingContent() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'
  const [membership, setMembership] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/reservations') // just to verify auth; fetch membership from profile
    // We'll show session-based info
  }, [])

  const handlePause = async () => {
    if (!confirm('Pause your membership? You can reactivate at any time.')) return
    setLoading(true)
    const res = await fetch('/api/membership/pause', { method: 'POST' })
    if (res.ok) setMessage('Membership paused successfully.')
    else setMessage('Failed to pause membership.')
    setLoading(false)
  }

  const handleBillingPortal = async () => {
    const res = await fetch('/api/billing/portal', { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else alert('Billing portal not available yet — add a payment method first during signup.')
  }

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel your membership? This cannot be undone.')) return
    setLoading(true)
    const res = await fetch('/api/membership/cancel', { method: 'POST' })
    if (res.ok) setMessage('Membership canceled. We\'re sorry to see you go.')
    else setMessage('Failed to cancel membership.')
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-8">Billing</h1>

      {isDemo && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 text-blue-800 text-sm">
          ℹ️ Stripe billing portal would open here in production.
        </div>
      )}

      {message && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 text-green-800 text-sm">
          ✅ {message}
        </div>
      )}

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Current Plan</h2>
        <p className="text-xl font-bold text-[#2C2C2C] mb-1">
          {session?.user ? 'Your active membership' : 'Loading…'}
        </p>
        <p className="text-sm text-gray-500 mb-6">Next billing date: Jan 1, 2027 (placeholder)</p>
        <button
          onClick={handleBillingPortal}
          className="bg-[#2C2C2C] text-white font-semibold px-5 py-2 rounded-xl hover:bg-gray-700 transition-colors text-sm"
        >
          Update Payment Method
        </button>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Manage Membership</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between p-4 rounded-xl border border-yellow-200 bg-yellow-50">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Pause Membership</p>
              <p className="text-xs text-gray-500 mt-0.5">Temporarily suspend your membership. Reactivate anytime.</p>
            </div>
            <button
              onClick={handlePause}
              disabled={loading}
              className="text-yellow-700 border border-yellow-400 font-semibold px-4 py-1.5 rounded-lg hover:bg-yellow-100 text-sm disabled:opacity-50 transition-colors"
            >
              Pause
            </button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-red-200 bg-red-50">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Cancel Membership</p>
              <p className="text-xs text-gray-500 mt-0.5">End your membership at the next billing date.</p>
            </div>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="text-red-700 border border-red-400 font-semibold px-4 py-1.5 rounded-lg hover:bg-red-100 text-sm disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BillingPage() {
  return (
    <Suspense>
      <BillingContent />
    </Suspense>
  )
}
