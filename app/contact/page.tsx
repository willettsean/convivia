export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-white">
      <p className="text-xs uppercase tracking-[0.4em] text-[#ffbc59]">Contact</p>
      <h1 className="font-display text-6xl">Let’s talk about your next workspace.</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Visit us</p>
          <p className="mt-3 text-white">1485 Treat Boulevard, Walnut Creek, CA</p>
          <p className="mt-2 text-white/70">Parking and BART access within 5 minutes.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Connect</p>
          <p className="mt-3 text-white">hello@conviviawork.com</p>
          <p className="text-white/70">(925) 000-0000</p>
        </div>
      </div>
      <p className="mt-10 text-white/70">
        Prefer email? Drop a note and we’ll reply within one business day. Once the CoWorks integration is online, inquiries and member onboarding will sync automatically.
      </p>
    </div>
  )
}
