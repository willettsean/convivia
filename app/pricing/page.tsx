import Link from 'next/link'

const plans = [
  {
    id: 'hot_desk',
    name: 'Hot Desk',
    price: '$199',
    period: '/mo',
    tagline: 'Flexible drop-in access',
    features: [
      'Drop-in access, any open desk',
      'Community events included',
      'High-speed WiFi',
      'Printing (50 pages/mo)',
      'Coffee & refreshments',
    ],
    popular: false,
    badge: null,
    cta: 'Get Started',
    ctaHref: '/signup?tier=hot_desk',
  },
  {
    id: 'dedicated_desk',
    name: 'Dedicated Desk',
    price: '$349',
    period: '/mo',
    tagline: 'Your own desk, always available',
    features: [
      'Everything in Hot Desk',
      'Reserved desk — always yours',
      'Storage locker',
      '24/7 building access',
      '2 meeting room hrs/mo',
    ],
    popular: true,
    badge: 'Most Popular',
    cta: 'Get Started',
    ctaHref: '/signup?tier=dedicated_desk',
  },
  {
    id: 'private_office',
    name: 'Private Office',
    price: '$799',
    period: '/mo',
    tagline: 'Private space for your team',
    features: [
      'Everything in Dedicated Desk',
      'Private lockable office',
      'Up to 4 people',
      'Custom door signage',
      'Unlimited meeting room access',
    ],
    popular: false,
    badge: null,
    cta: 'Get Started',
    ctaHref: '/signup?tier=private_office',
  },
]

const dayPass = {
  id: 'day_pass',
  name: 'Day Pass',
  price: '$50',
  period: ' one-time',
  tagline: 'No commitment',
  features: [
    'Full-day drop-in access',
    'High-speed WiFi',
    'Printing included',
    'Community lounge access',
  ],
  cta: 'Buy a Day Pass',
  ctaHref: '/signup?tier=day_pass',
}

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-gray-600">All plans include access to the community, events, and amenities.</p>
      </div>

      {/* Subscription plans — 3 columns */}
      <div className="grid md:grid-cols-3 gap-6 items-start mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl p-7 border-2 relative ${
              plan.popular
                ? 'border-[#C1623F] bg-white shadow-lg'
                : 'border-gray-200 bg-white shadow-sm'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#C1623F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {plan.badge}
                </span>
              </div>
            )}
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-1">{plan.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{plan.tagline}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#2C2C2C]">{plan.price}</span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#C1623F] font-bold mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={plan.ctaHref}
              className={`block text-center font-semibold py-3 rounded-xl transition-colors ${
                plan.popular
                  ? 'bg-[#C1623F] text-white hover:bg-[#a8522f]'
                  : 'bg-gray-100 text-[#2C2C2C] hover:bg-gray-200'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Day Pass — full-width light card */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 shadow-sm p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-bold text-[#2C2C2C]">{dayPass.name}</h3>
              <span className="text-xs font-semibold text-gray-500 border border-gray-300 rounded-full px-3 py-0.5 uppercase tracking-wide">
                No commitment
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{dayPass.tagline}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {dayPass.features.map((feature) => (
                <li key={feature} className="flex items-center gap-1.5 text-sm text-gray-700">
                  <span className="text-gray-400 font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div>
              <span className="text-4xl font-bold text-[#2C2C2C]">{dayPass.price}</span>
              <span className="text-gray-500 text-sm">{dayPass.period}</span>
            </div>
            <Link
              href={dayPass.ctaHref}
              className="bg-[#2C2C2C] text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-700 transition-colors text-sm whitespace-nowrap"
            >
              {dayPass.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
