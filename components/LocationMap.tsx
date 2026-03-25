'use client'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
const ADDRESS = '1485 Treat Blvd, Walnut Creek, CA 94597'
const ENCODED  = encodeURIComponent(ADDRESS)

const highlights = [
  'Super convenient location',
  'Walkable to Pleasant Hill BART',
  '0.5 miles to Hwy 680',
  'Across the street from The Bay Club Walnut Creek',
]

export function LocationMap() {
  const src = GOOGLE_MAPS_API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${ENCODED}&zoom=15`
    : `https://maps.google.com/maps?q=${ENCODED}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <section className="bg-[#f5f0eb]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: address + bullets */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#fe904d] font-semibold">Find Us</p>
              <h2 className="font-display text-5xl text-[#0c0c0c] mt-1">Conveniently located in Walnut Creek.</h2>
              <p className="mt-3 text-lg font-medium text-[#2a2320]">{ADDRESS}</p>
            </div>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#2a2320]">
                  <span className="mt-0.5 text-[#fe904d] font-bold">→</span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${ENCODED}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#2a2320] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#fe904d] transition-colors"
            >
              Get Directions →
            </a>
          </div>

          {/* Right: map embed */}
          <div className="overflow-hidden rounded-3xl shadow-md">
            <iframe
              title="Convivia Work location"
              src={src}
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
