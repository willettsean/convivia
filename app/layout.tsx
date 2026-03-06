import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import SessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Convivia — Community Coworking in Walnut Creek',
  description: 'A new kind of coworking space built around community, flexibility, and meaningful work.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAF8F5] text-[#2C2C2C]`}>
        <SessionProvider>
          <Nav />
          <main>{children}</main>
          <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-500">
            <div className="flex items-center justify-center gap-6">
              <span>© {new Date().getFullYear()} Convivia. All rights reserved.</span>
              <a href="/privacy" className="hover:text-[#C1623F] transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-[#C1623F] transition-colors">Terms</a>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  )
}
