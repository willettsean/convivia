import Link from 'next/link'
import { buttonBase } from '@/lib/theme'

const BOOK_URL = 'https://conviviawork.coworksapp.com/book/716'

const rooms = [
  {
    name: 'Avid Learner',
    description:
      'Ideal for workshops, pitch practice, and onboarding sessions. Dual 4K displays for hybrid working sessions. Flexible seating with movable desks allowing many setups for collaboration.',
  },
  {
    name: 'Scrappy',
    description:
      'An executive boardroom for fast-moving teams. Features flexible seating, writable whiteboard wall, a 4K large format display that makes quick pivots and working sessions effortless.',
  },
  {
    name: 'Seeks Context',
    description:
      'Designed for deep discovery calls and client briefings. This four person executive space creates a focused environment for sharing and decision making.',
  },
  {
    name: 'Creative Problem Solver',
    description:
      'Where teams are energized by working around a high top table set up with a 4K display and glass writing board for hybrid teams to join the fun.',
  },
]

export default function ConferenceRoomsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 space-y-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">Conference Rooms</p>
          <h1 className="font-display text-6xl text-[#0c0c0c]">Spaces that honor how you collaborate.</h1>
          <p className="text-black/70">
            Our conference rooms are named for the behaviors that help companies grow together. Each room is fully equipped with 4K large-format displays, studio-grade audio,
            and plug-and-play video conferencing so hybrid meetings feel natural.
            Book time using the links below and we'll prep whiteboards or analog tools to match your agenda.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {rooms.map((room) => (
            <div key={room.name} className="rounded-3xl border border-black/5 bg-[#f5f0eb] p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">Conference Room</p>
              <h2 className="text-2xl font-bold text-[#0c0c0c]">{room.name}</h2>
              <p className="mt-3 text-black/70">{room.description}</p>
              <ul className="mt-4 space-y-2 text-black/70 text-sm">
                <li>• Fully set up for video conferencing</li>
                <li>• 4K display for screen sharing & presentations</li>
                <li>• Whiteboards available on request</li>
              </ul>
              <Link
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonBase} mt-6 px-5 py-2 text-sm`}
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
