import Link from 'next/link'
import { HeroGallery } from '@/components/HeroGallery'

const stats = [
  { label: 'Adjustable standing desks with monitors', value: '72' },
  { label: 'Video conference meeting rooms large and small', value: '6' },
  { label: 'Audio video production studio', value: '1' },
  { label: '10 Gbps fiber internet', value: '10 Gbps' },
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
      'Each room ships with 4K conferencing, large-format displays, and whiteboarding tools that just work.',
  },
  {
    title: 'AV production studio',
    description: 'Capture audio or video content with pro-grade mics, lighting, and acoustic control. Bookable here.',
  },
]

const plans = [
  {
    name: 'Hot Desk Membership',
    price: '$350',
    cadence: 'per month',
    description:
      'Unlimited access, adjustable standing desk, monitor, conference room credits, and priority invites to founder salons.',
  },
  {
    name: 'Dedicated Desk Membership',
    price: '$450',
    cadence: 'per month',
    description:
      'Unlimited access, adjustable standing desk, monitor, conference room credits, dedicated locked storage and space.',
  },
  {
    name: 'Team Suite',
    price: 'Custom',
    cadence: 'per team',
    description: 'Dedicated space for 2–12 people with private storage and additional conference room credits.',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pt-16 md:flex-row md:items-center">
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
            <Link
              href="/book-a-tour"
              className="rounded-full bg-[#fe904d] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#ffbc59]"
            >
              Book a Tour
            </Link>
            <Link
              href="/membership"
              className="rounded-full border border-black/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:border-[#fe904d]"
            >
              View Memberships
            </Link>
          </div>
        </div>
        <HeroGallery />
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl rounded-3xl border border-black/5 bg-[#f8f8f8] px-6 py-10">
        <div className="grid gap-6 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl text-[#0c0c0c]">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-black/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology-first */}
      <section id="workspace" className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#fe904d]">Technology-first</p>
          <h2 className="font-display text-5xl text-[#0c0c0c]">Infrastructure that keeps up with your ambition.</h2>
          <p className="text-black/70">
            Enterprise fiber, redundant mesh wifi, 24/7 access control, and AV-native spaces allow hybrid teams to connect with zero friction.
            Mobile app for conference room bookings, memberships, and billing so you always know what’s available.
          </p>
          <ul className="space-y-3 text-black/70">
            <li>• 10 Gbps fiber + LTE failover</li>
            <li>• 4K-ready conference rooms with tactile controls</li>
            <li>• AV production studio for podcast or streaming recording and events</li>
            <li>• Secure lockers and smart printing</li>
          </ul>
        </div>
        <section id="community" className="rounded-3xl border border-black/5 bg-white p-10">
          <p className="text-black/60 text-sm uppercase tracking-[0.4em]">Community Signals</p>
          <h3 className="font-display text-4xl text-[#0c0c0c] mt-4">Built for builders</h3>
          <p className="text-black/70 mt-4">
            Convivial Work attracts founders, creatives and highly productive professionals who want both momentum and community. Expect recurring events focused on
            founder networking, growth strategies and other engagement opportunities to expand your circle of professional support.
          </p>
        </section>
      </section>

      {/* Amenities */}
      <section id="amenities" className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#fe904d]">Amenities</p>
            <h2 className="font-display text-5xl text-[#0c0c0c]">Everything you need to stay in flow.</h2>
          </div>
          <Link href="/book-a-tour" className="text-xs uppercase tracking-[0.3em] text-black/60 hover:text-black">
            Book a tour →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {amenities.map((item) => (
            <div key={item.title} className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
              <h3 className="font-display text-3xl text-[#0c0c0c]">{item.title}</h3>
              <p className="mt-3 text-black/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership */}
      <section id="plans" className="mx-auto max-w-6xl space-y-8 px-6">
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#fe904d]">Memberships</p>
          <h2 className="font-display text-5xl text-[#0c0c0c]">Pick the cadence that matches your build.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-black/50">{plan.name}</p>
              <p className="font-display text-5xl text-[#0c0c0c]">{plan.price}</p>
              <p className="text-sm uppercase tracking-[0.3em] text-black/40">{plan.cadence}</p>
              <p className="mt-4 text-black/70">{plan.description}</p>
              <Link
                href="/book-a-tour"
                className="mt-6 inline-flex rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-black hover:border-[#fe904d]"
              >
                Book a tour
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="mx-auto max-w-5xl rounded-[40px] border border-black/5 bg-gradient-to-r from-[#fe904d] to-[#d6773d] px-10 py-14 text-center text-white">
        <p className="text-xs uppercase tracking-[0.5em] text-white/60">Tours open now</p>
        <h2 className="font-display text-5xl text-white">See the space IRL.</h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-white/80">
          Walk through Convivia Work, test the network, and grab a coffee with our community team.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/book-a-tour" className="rounded-full bg-white px-8 py-3 text-xs uppercase tracking-[0.3em] text-black">
            Book a Tour
          </Link>
          <Link href="/contact" className="rounded-full border border-white px-8 py-3 text-xs uppercase tracking-[0.3em] text-white">
            Contact Team
          </Link>
        </div>
      </section>
    </div>
  )
}
