import Image from 'next/image'
import Link from 'next/link'
import { buttonBase } from '@/lib/theme'

const BOOK_URL = 'https://conviviawork.coworksapp.com/book/716'

const gallery = [
  '/assets/av-studio/studio-01.jpg',
  '/assets/av-studio/studio-02.jpg',
  '/assets/av-studio/studio-03.jpg',
  '/assets/av-studio/studio-04.jpg',
]

const features = [
  'Acoustically treated pod with premium dampening so outside noise never leaks into your recording.',
  'Interchangeable backgrounds: full green screen plus a textured wood wall for warm, organic shots.',
  'Ceiling-mounted cinema lighting, track lighting, and movable soft boxes to dial in the perfect look.',
  'Built-in power, data, and monitor hookups for camera rigs, teleprompters, or live streaming gear.',
]

export default function AvStudioPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-6 py-16 space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">AV Production Studio</p>
        <h1 className="font-display text-6xl text-[#0c0c0c]">Produce content that sounds as good as it looks.</h1>
        <p className="text-black/70 max-w-3xl">
          Step into a fully equipped, production-ready studio designed for podcasters, video creators, livestream hosts, and hybrid teams who want
          a professional environment that just works. The room pairs whisper-quiet sound dampening with flexible lighting, a built-in green screen,
          and turnkey hookups so you can hit record within minutes.
        </p>
        <Link href={BOOK_URL} target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-6 py-3 text-sm`}>
          Book the Studio
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12 grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <h2 className="font-display text-4xl text-[#0c0c0c]">What you get</h2>
          <p className="text-black/70">
            Bring your own gear or tap into our onsite kit. Every reservation includes access to the control desk, lighting grid, and movable production cart.
            Need an operator or post-production? Our community partners and on-call technicians can help.
          </p>
          <ul className="space-y-3 text-black/70">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#fe904d]" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link href={BOOK_URL} target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-5 py-2 text-sm`}>
              Book the Studio
            </Link>
            <Link href="https://conviviawork.coworksapp.com/membership-request/716" target="_blank" rel="noopener noreferrer" className={`${buttonBase} px-5 py-2 text-sm`}>
              Talk to our team
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {gallery.map((src) => (
            <div key={src} className="relative h-48 md:h-56 rounded-3xl overflow-hidden border border-black/5">
              <Image src={src} alt="Convivia AV Studio" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
