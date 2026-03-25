export default function LocationSection() {
  return (
    <section className="bg-[#f5f0eb]">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-2 md:items-center">
        {/* Text + bullets */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">Location</p>
            <h2 className="font-display text-5xl text-[#0c0c0c] mt-2">Find us in Walnut Creek</h2>
            <p className="mt-3 text-black/70 font-medium">1485 Treat Blvd. Walnut Creek, CA 94597</p>
          </div>
          <ul className="space-y-3 text-black/70">
            {[
              'Super convenient location',
              'Walkable to Pleasant Hill BART',
              '0.5 miles to Hwy 680',
              'Across the street from The Bay Club Walnut Creek',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#fe904d]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://maps.google.com/?q=1485+Treat+Blvd+Walnut+Creek+CA+94597"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-black/20 px-5 py-2 text-sm font-semibold text-black hover:border-[#fe904d] hover:text-[#fe904d] transition-colors"
          >
            Open in Google Maps ↗
          </a>
        </div>

        {/* Embedded map */}
        <div className="overflow-hidden rounded-3xl border border-black/5 shadow-md">
          <iframe
            title="Convivia Work location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.123456789!2d-122.0651!3d37.9101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80857b8c5f1234ab%3A0x123456789abcdef!2s1485+Treat+Blvd%2C+Walnut+Creek%2C+CA+94597!5e0!3m2!1sen!2sus!4v1711000000000!5m2!1sen!2sus"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
