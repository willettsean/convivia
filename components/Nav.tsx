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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/assets/LOGOS/PNG/logo-color.png"
            alt="Convivia Work"
            width={160}
            height={48}
            priority
          />
        </Link>

        {/* Address — center */}
        <div className="hidden lg:flex flex-col items-center">
          <span className="text-xs font-semibold text-[#fe904d] uppercase tracking-widest">Location</span>
          <span className="text-sm font-medium text-black/70">1485 Treat Blvd. Walnut Creek, CA 94597</span>
        </div>

        {/* Nav links */}
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
    </header>
  )
}
