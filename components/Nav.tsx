'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/#workspace',       label: 'Workspace' },
  { href: '/conference-rooms', label: 'Conference Rooms' },
  { href: '/av-studio',        label: 'AV Studio' },
  { href: '/membership',       label: 'Memberships' },
  { href: '/gallery',          label: 'Gallery' },
  { href: '/faq',              label: 'FAQ' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main row */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" onClick={() => setOpen(false)}>
            <Image
              src="/assets/LOGOS/PNG/logo-color.png"
              alt="Convivia Work"
              width={160}
              height={48}
              priority
            />
          </Link>

          {/* Address — center, desktop only */}
          <div className="hidden lg:flex flex-col items-center">
            <span className="text-xs font-semibold text-[#fe904d] uppercase tracking-widest">Location</span>
            <span className="text-sm font-medium text-black/70">1485 Treat Blvd. Walnut Creek, CA</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-black/60 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-black transition-colors">
                {link.label}
              </Link>
            ))}
            <Link
              href="https://conviviawork.coworksapp.com/tour-request/716"
              target="_blank" rel="noopener noreferrer"
              className="rounded-full bg-[#fe904d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d6773d]"
            >
              Book a Tour
            </Link>
          </nav>

          {/* Mobile: hamburger + Book a Tour */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="https://conviviawork.coworksapp.com/tour-request/716"
              target="_blank" rel="noopener noreferrer"
              className="rounded-full bg-[#fe904d] px-4 py-2 text-xs font-semibold text-white"
            >
              Book a Tour
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-black/5 transition"
            >
              <span className={`block h-0.5 w-5 bg-black/70 transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 bg-black/70 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-black/70 transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Address strip — mobile */}
        <div className="lg:hidden border-t border-black/5 py-2 text-center">
          <span className="text-xs font-medium text-black/60">
            📍 1485 Treat Blvd. Walnut Creek, CA
          </span>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="lg:hidden border-t border-black/5 pb-4">
            <nav className="flex flex-col gap-1 pt-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 text-sm font-medium text-black/70 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
