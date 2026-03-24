import type { Metadata } from 'next'
import { Bebas_Neue, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' })
const body = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Convivia Work — Create • Connect • CoWork',
  description:
    'Tech-forward coworking for founders, creatives, and small teams. Book a tour and experience Convivia Work in Walnut Creek.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable} bg-white text-[#0c0c0c] antialiased`}>
        <div className="relative min-h-screen bg-white text-[#0c0c0c]">
          <Nav />
          <main>{children}</main>
          <footer className="mt-32 border-t border-black/5 py-10 text-center text-sm text-black/60">
            <div className="flex flex-col items-center gap-4 px-6 text-xs uppercase tracking-[0.2em] sm:flex-row sm:justify-center">
              <span>© {new Date().getFullYear()} Convivia Work</span>
              <span className="hidden h-px w-12 bg-black/10 sm:block" aria-hidden />
              <a href="/privacy" className="hover:text-black transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-black transition-colors">
                Terms
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
