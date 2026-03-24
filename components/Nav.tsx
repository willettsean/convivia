import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/#workspace', label: 'Workspace' },
  { href: '/#amenities', label: 'Amenities' },
  { href: '/#community', label: 'Community' },
  { href: '/membership', label: 'Memberships' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/LOGOS/PNG/logo-color.png" alt="Convivia Work" width={160} height={48} priority />
        </Link>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-black/60 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-black transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
