import { buttonBase } from '@/lib/theme'

export default function BookTourPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-white">
      <p className="text-xs uppercase tracking-[0.4em] text-[#ffbc59]">Tours</p>
      <h1 className="font-display text-6xl">Walk through Convivia Work.</h1>
      <p className="mt-4 text-white/70">
        Choose a time that works for you. Once CoWorks API credentials are provisioned we’ll connect this form directly so bookings flow into the workspace calendar automatically.
      </p>
      <div className="mt-10 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <label className="block text-sm uppercase tracking-[0.3em] text-white/60">
          Full name
          <input className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white" placeholder="First Last" />
        </label>
        <label className="block text-sm uppercase tracking-[0.3em] text-white/60">
          Email
          <input className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white" placeholder="you@example.com" />
        </label>
        <label className="block text-sm uppercase tracking-[0.3em] text-white/60">
          Company / role
          <input className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white" placeholder="Optional" />
        </label>
        <label className="block text-sm uppercase tracking-[0.3em] text-white/60">
          What do you need from your workspace?
          <textarea className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white" rows={4} />
        </label>
        <button className={`${buttonBase} w-full justify-center px-8 py-4 text-xs uppercase tracking-[0.3em]`}>
          Request tour (CoWorks coming soon)
        </button>
      </div>
    </div>
  )
}
