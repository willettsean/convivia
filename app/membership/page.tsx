import Link from 'next/link'

const tiers = [
  {
    name: 'Day Pass',
    price: '$50',
    cadence: 'per day',
    intro: 'Drop in for a focused workday and sample the Convivia energy.',
    features: ['Adjustable standing desk + ergonomic seating', 'External monitor and laptop stand + power + fast and reliable WiFi', 'Kitchen and coffee program access', 'Phone booths + quiet zones'],
    highlight: 'Perfect for visiting founders, fractional teams, and trial runs.',
  },
  {
    name: 'Coworking Membership',
    price: '$350',
    cadence: 'per month',
    intro: 'Everything in the Day Pass plus full-time momentum.',
    features: ['24/7 access with smart entry', 'Conference room credits directly in your membership app', 'Priority invites to founder salons + community events', 'Flexible seating across focus zones and lounges'],
    highlight: 'Your baseline for being part of the Convivia builder community.',
  },
  {
    name: 'Dedicated Desk Membership',
    price: '$450',
    cadence: 'per month',
    intro: 'The Coworking Membership plus a desk you can truly make your own.',
    features: ['Select and personalize your workstation', 'Lockable storage cabinet + mail service', 'Additional conference room credits', 'Keep gear, monitors, and peripherals in place'],
    highlight: 'Ideal for creators who want permanence without sacrificing community.',
  },
  {
    name: 'Custom Team Suite',
    price: 'Custom',
    cadence: 'per team',
    intro: 'Private studios for teams of 2–12 with full access to the shared ecosystem.',
    features: ['Dedicated office with natural light + private storage', 'Additional conference room allotments', 'Closed-door focus plus access to open coworking zones', 'Concierge support for IT, guests, and workshops'],
    highlight: 'Scale-ups, agencies, and distributed teams get a branded home base.',
  },
]

export default function MembershipPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">Memberships</p>
          <h1 className="font-display text-6xl text-[#0c0c0c]">Choose how you plug into Convivia Work.</h1>
          <p className="mt-4 max-w-2xl text-black/70">
            Every plan is powered by our mobile app for seamless billing, booking, and access control. Start with a day pass or jump straight into a membership—
            we’ll tailor the onboarding, credentials, and workspace tour to your needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-3xl border border-black/5 bg-[#f5f0eb] p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">{tier.cadence}</p>
                  <h2 className="text-2xl font-bold text-[#0c0c0c]">{tier.name}</h2>
                </div>
                <p className="text-3xl font-bold text-[#0c0c0c]">{tier.price}</p>
              </div>
              <p className="mt-4 text-black/70">{tier.intro}</p>
              <ul className="mt-4 space-y-2 text-black/70">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#fe904d]" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-black/60">{tier.highlight}</p>
              <Link
                href="/book-a-tour"
                className="mt-6 inline-flex rounded-full border border-black/20 px-4 py-2 text-sm font-semibold text-black hover:border-[#fe904d] hover:text-[#fe904d] transition-colors"
              >
                Book a tour
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
