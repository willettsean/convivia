'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Nav() {
  const { data: session } = useSession()
  const role = (session?.user as any)?.role

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image src="/logo.jpg" alt="Convivia" height={40} width={140} className="h-10 w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#C1623F] transition-colors">Home</Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-[#C1623F] transition-colors">Pricing</Link>
          <Link href="/events" className="text-sm font-medium text-gray-700 hover:text-[#C1623F] transition-colors">Events</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link href="/portal" className="text-sm font-medium text-gray-700 hover:text-[#C1623F] transition-colors">Portal</Link>
            {role === 'admin' && (
              <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-[#C1623F] transition-colors">Admin</Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-[#C1623F] transition-colors">Login</Link>
            <Link
              href="/pricing"
              className="bg-[#C1623F] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#a8522f] transition-colors"
            >
              Get Early Access
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
