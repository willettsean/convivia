import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import CookieManager from '@/components/CookieManager'
import ManageCookiesButton from '@/components/ManageCookiesButton'

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' })
const body    = DM_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400','500','600','700'] })

export const metadata: Metadata = {
  title: 'Convivia Work — Create • Connect • CoWork',
  description:
    'Tech-forward coworking for founders, creatives, and small teams. Book a tour and experience Convivia Work in Walnut Creek.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable} bg-white text-[#0c0c0c] antialiased`}>
        <Nav />
        <main>{children}</main>
        <footer className="bg-[#2a2320] text-white/70 py-10 text-center text-sm">
          <div className="flex flex-col items-center gap-3 px-6 sm:flex-row sm:justify-center sm:gap-6">
            <span className="font-semibold text-white">© {new Date().getFullYear()} Convivia Work</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
            <span>1485 Treat Blvd, Walnut Creek, CA 94597</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms"   className="hover:text-white transition-colors">Terms</a>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
            <ManageCookiesButton />
          </div>
        </footer>
        <CookieManager />
      </body>
    </html>
  )
}
