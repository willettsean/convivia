import Link from 'next/link'

const tiers = [
  {
    name: 'Studio Day Pass',
    price: '$45',
    includes: ['Access 8a–6p', 'Hot desk + lounge zones', 'Creator studio access blocks', 'Apply credit toward membership'],
  },
  {
    name: 'Builder Membership',
    price: '$425',
    includes: ['24/7 access', '10 conference room hours', '5 podcast studio credits', 'Event + salon invitations'],
  },
  {
    name: 'Team Suite',
    price: 'Custom',
    includes: ['Dedicated studio with lockable storage', 'Private meeting pod', 'Concierge IT support', 'Custom billing + credits'],
  },
]

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 text-white">
      <p className="text-xs uppercase tracking-[0.4em] text-[#ffbc59]">Memberships</p>
      <h1 className="font-display text-6xl">Flexible options for creators, founders, and teams.</h1>
      <p className="mt-4 max-w-2xl text-white/70">
        All memberships run through CoWorks. Book a tour or start with a day pass and we’ll set up your account, access credentials,
        and billing profile inside the platform.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{tier.name}</p>
            <p className="font-display text-5xl text-white">{tier.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {tier.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <Link
              href="/book-a-tour"
              className="mt-6 inline-flex rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white"
            >
              Book a tour
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
