import Link from 'next/link'
import { HeroGallery } from '@/components/HeroGallery'
import LocationSection from '@/components/LocationSection'
import { buttonBase } from '@/lib/theme'

const URLS = {
  tour:       'https://conviviawork.coworksapp.com/tour-request/716',
  dayPass:    'https://conviviawork.coworksapp.com/day-pass-signup/716?plan=11611',
  cowork:     'https://conviviawork.coworksapp.com/membership-signup/11506',
  contact:    'https://conviviawork.coworksapp.com/membership-request/716',
}

const stats = [
  { label: 'Adjustable standing desks with monitors', value: '72' },
  { label: 'Video conference meeting rooms large and small', value: '4' },
  { label: 'Audio video production studio', value: '1' },
  { label: 'Multi Gigabit with 5G failover', value: 'Multi Gigabit' },
]

const amenities = [
  {
    title: 'Glare-free focus zones',
    description:
      'Purpose-built desks, acoustic treatment, and calibrated lighting so designers, devs, and editors can live in their screens for hours.',
  },
  {
    title: 'Natural light collaboration areas',
    description:
      'Expansive windows and modular seating create energetic corners for brainstorms, jam sessions, and casual stand-ups.',
  },
  {
    title: 'Video conference rooms',
    description:
      'Each room offers 4K conferencing, large-format displays, and whiteboarding tools that just work.',
  },
  {
    title: 'AV production studio',
    description:
      'Capture audio or video content with pro-grade mics, lighting, and acoustic control. Bookable here.',
  },
]

const plans = [
  {
    name: 'Day Pass',
    price: '$50',
    cadence: 'per day',
    description:
      'Spend a productive day with an adjustable standing desk, monitor, kitchen access and phone booths.',
  },
  {
    name: 'CoWork Membership',
    price: '$350',
    cadence: 'per month',
    description:
      'Unlimited access, adjustable standing desk, monitor, conference room credits, and priority invites to founder salons.',
  },
  {
    name: 'Team Suite',
    price: 'Custom',
    cadence: 'per team',
    description:
      'Dedicated space for 2–12 people with private storage and additional conference room credits.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero — white bg */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pt-16 pb-20 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <p className="font-display text-5xl text-[#fe904d]">Create • Connect • CoWork</p>
            <h1 className="font-display text-6xl leading-[0.95] text-[#0c0c0c] sm:text-7xl">
              Tech-forward coworking for founders, creatives, and power builders.
            </h1>
            <p className="max-w-2xl text-lg text-black/70">
              Convivia Work is a technology-first workspace in Walnut Creek. Natural light collaboration areas, glare-free focus zones,
              and fully instrumented conference rooms create momentum for the people who build things.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={URLS.tour} target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-8 py-3 text-sm`}>
                Book a Tour
              </Link>
              <Link href="/membership" className={`${buttonBase} px-8 py-3 text-sm`}>
                View Memberships
              </Link>
            </div>
          </div>
          <HeroGallery />
        </div>
      </section>

      {/* Location — warm gray bg */}
      <LocationSection />

      {/* Stats — charcoal bg */}
      <section className="bg-[#2a2320] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 text-center sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-5xl text-[#fe904d]">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology-first — white bg */}
      <section id="workspace" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">Technology-first</p>
            <h2 className="font-display text-5xl text-[#0c0c0c]">Infrastructure that keeps up with your ambition.</h2>
            <p className="text-black/70">
              Multi gigabit internet with 5G failover, redundant mesh wifi, 24/7 access control. AV native spaces allow hybrid teams to connect with zero friction.
              Mobile app for conference room bookings, memberships and billing so you always know what's available.
            </p>
            <ul className="space-y-3 text-black/70">
              <li className="flex items-start gap-3"><span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#fe904d]" />Multi gigabit internet with 5G failover</li>
              <li className="flex items-start gap-3"><span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#fe904d]" />4K-ready conference rooms with tactile controls</li>
              <li className="flex items-start gap-3"><span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#fe904d]" />AV production studio for podcast or streaming recording and events</li>
              <li className="flex items-start gap-3"><span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#fe904d]" />Secure lockers and smart printing</li>
            </ul>
          </div>

          {/* Community Signals — warm gray card */}
          <div id="community" className="rounded-3xl bg-[#f5f0eb] p-10 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">Community Signals</p>
            <h3 className="text-2xl font-bold text-[#0c0c0c]">Built for builders</h3>
            <p className="text-black/70">
              Convivia Work attracts founders, creatives and highly productive professionals who want both momentum and community.
              Expect recurring events focused on founder networking, growth strategies and other engagement opportunities to expand
              your circle of professional support.
            </p>
          </div>
        </div>
      </section>

      {/* Amenities — warm gray bg */}
      <section id="amenities" className="bg-[#f5f0eb]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">Amenities</p>
              <h2 className="font-display text-5xl text-[#0c0c0c]">Everything you need to stay in flow.</h2>
            </div>
            <Link href="/book-a-tour" className="text-sm font-semibold text-black/60 hover:text-black transition-colors">
              Book a tour →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {amenities.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-8 shadow-sm border border-black/5">
                <h3 className="text-xl font-bold text-[#0c0c0c]">{item.title}</h3>
                <p className="mt-3 text-black/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships — white bg */}
      <section id="plans" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">Memberships</p>
            <h2 className="font-display text-5xl text-[#0c0c0c]">Pick the cadence that matches your build.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className="rounded-3xl border border-black/5 bg-[#f5f0eb] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">{plan.name}</p>
                <p className="font-display text-5xl text-[#0c0c0c] mt-2">{plan.price}</p>
                <p className="text-sm font-medium text-black/40">{plan.cadence}</p>
                <p className="mt-4 text-black/70">{plan.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={URLS.tour} target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-4 py-2 text-sm`}>
                    Book a tour
                  </Link>
                  {plan.name === 'Day Pass' && (
                    <Link href={URLS.dayPass} target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-4 py-2 text-sm`}>
                      Sign Up
                    </Link>
                  )}
                  {plan.name === 'CoWork Membership' && (
                    <Link href={URLS.cowork} target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-4 py-2 text-sm`}>
                      Sign Up
                    </Link>
                  )}
                  {plan.name === 'Team Suite' && (
                    <Link href={URLS.contact} target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-4 py-2 text-sm`}>
                      Contact Team
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — charcoal bg */}
      <section id="book" className="bg-[#2a2320]">
        <div className="mx-auto max-w-5xl px-10 py-20 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#fe904d]">Tours open now</p>
          <h2 className="font-display text-5xl text-white mt-3">See the space IRL.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Walk through Convivia Work, test the network, and grab a coffee with our community team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={URLS.tour} target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-8 py-3 text-sm`}>
              Book a Tour
            </Link>
            <Link href={URLS.contact} target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-8 py-3 text-sm`}>
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
