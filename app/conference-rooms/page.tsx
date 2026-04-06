const rooms = [
  {
    name: 'Avid Learner',
    description:
      'Ideal for workshops, pitch practice, and onboarding sessions. Bright natural light and writable walls keep ideas flowing while the AV stack keeps remote attendees in lockstep.',
  },
  {
    name: 'Scrappy',
    description:
      'A tactical war room for fast-moving teams. Features flexible seating, stand-up tables, and a 4K display that makes quick pivots and working sessions effortless.',
  },
  {
    name: 'Seeks Context',
    description:
      'Designed for deep discovery calls and client briefings. Acoustic treatment and a generous camera framing make every stakeholder feel present.',
  },
  {
    name: 'Creative Problem Solver',
    description:
      'Where cross-functional teams break roadblocks. Dual displays, analog tools on request, and lounge seating options support long-form ideation.',
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
            and plug-and-play video conferencing so hybrid meetings feel natural. Book time using the links below and we'll prep whiteboards or analog tools to match your agenda.
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
              <p className="mt-4 text-sm font-semibold text-black/60">Book via CoWorks or contact the Convivia team for curated setups.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
