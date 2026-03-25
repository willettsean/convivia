import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/#workspace',  label: 'Workspace'   },
  { href: '/#amenities',  label: 'Amenities'   },
  { href: '/#community',  label: 'Community'   },
  { href: '/membership',  label: 'Memberships' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top address bar */}
      <div className="bg-[#2a2320] text-white/70 text-xs py-2 px-6 text-center tracking-wide">
        📍 1485 Treat Blvd. Walnut Creek, CA 94597
      </div>

      {/* Main nav */}
      <div className="bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/LOGOS/PNG/logo-color.png"
              alt="Convivia Work"
              width={160}
              height={48}
              priority
            />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-black/60 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-black transition-colors">
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-a-tour"
              className="rounded-full bg-[#fe904d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d6773d]"
            >
              Book a Tour
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
