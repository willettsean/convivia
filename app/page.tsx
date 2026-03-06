import Link from 'next/link'

export default function HomePage() {
  const features = [
    {
      icon: '🤝',
      title: 'Community First',
      description: 'Regular events, curated introductions, and a culture designed to spark real connections — not just proximity.',
    },
    {
      icon: '⚡',
      title: 'Total Flexibility',
      description: 'Hot desk, dedicated desk, or private office. Scale up or down as your work changes, with no long-term lock-in.',
    },
    {
      icon: '✨',
      title: 'Premium Amenities',
      description: 'High-speed fiber, standing desks, phone booths, great coffee, and meeting rooms that actually impress clients.',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-[#C1623F] font-semibold text-sm uppercase tracking-widest mb-4">
          A new kind of workspace
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-[#2C2C2C] leading-tight mb-6">
          Build something great<br />among great people.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Convivia is a community-first coworking space in Walnut Creek, CA — where independent professionals, 
          founders, and small teams do their best work together.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center bg-[#C1623F] text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-[#a8522f] transition-colors"
        >
          Join the Community →
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-3">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-[#2C2C2C] text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to find your space?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Plans start at $199/mo. No application fee. Join the waitlist or grab a day pass to try us out.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center bg-[#C1623F] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#a8522f] transition-colors"
        >
          View Pricing
        </Link>
      </section>
    </div>
  )
}
