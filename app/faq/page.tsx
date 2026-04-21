const sections = [
  {
    title: 'General',
    items: [
      {
        q: 'What is Convivia Work?',
        a: 'Convivia Work is a technology first coworking space in Walnut Creek, CA, built for founders, creatives, and highly productive professionals. The space features glare free focus zones, natural light collaboration areas, fully equipped conference rooms, and a professional grade AV production studio—all running on multigigabit infrastructure with 5G failover.',
      },
      {
        q: 'Where are you located?',
        a: "1485 Treat Blvd, Walnut Creek, CA 94597. We're walkable to Pleasant Hill BART and half a mile from Highway 680, across the street from The Bay Club Walnut Creek.",
      },
      {
        q: 'What are your hours?',
        a: 'Our team is onsite Monday–Friday, 9am–5pm Pacific. Members with a Coworking Membership or above enjoy 24/7 keyless access via our mobile app.',
      },
      {
        q: 'Is parking available?',
        a: 'Yes—parking is available on a first come, first served basis.',
      },
      {
        q: 'Is the space ADA accessible?',
        a: 'Yes, Convivia Work is fully ADA accessible.',
      },
      {
        q: 'What types of people work at Convivia Work?',
        a: 'Our community includes startup founders, freelancers, content creators, small teams, and driven professionals who want a high performance workspace with a community to match.',
      },
    ],
  },
  {
    title: 'Membership',
    items: [
      {
        q: 'What membership options are available?',
        a: "We offer four plans:\n\n• Day Pass — $50/day. Adjustable standing desk, monitor, kitchen and coffee access, and phone booth access.\n• Coworking Membership — $382/month. 24/7 access, conference room credits, and priority invites to community and founder events.\n• Dedicated Desk Membership — $450/month. Everything in Coworking, plus a permanent personalized workstation with lockable storage and mail service eligibility.\n• Custom Team Suite — Custom pricing for teams of 2–12, with a private dedicated space and full access to shared amenities.",
      },
      {
        q: 'Are memberships month to month?',
        a: 'Yes. All memberships are month to month with no long term commitment required.',
      },
      {
        q: 'How do I sign up?',
        a: "You can sign up directly through our mobile app or start by booking a tour at conviviawork.com. We'll walk you through the space and get you set up.",
      },
      {
        q: 'Can I upgrade or change my membership?',
        a: "Absolutely. Membership changes are managed through our mobile app. Reach out to our team if you'd like help choosing the right plan.",
      },
      {
        q: 'How do conference room credits work?',
        a: 'Conference room credits are included with Coworking and Dedicated Desk memberships, with the number of credits based on your membership level. Additional time can be booked through our mobile app.',
      },
      {
        q: 'What is your guest policy?',
        a: 'Guests are welcome in conference rooms as part of your booking. Outside of a conference room reservation, guests will need to pay the day pass fee to access the space.',
      },
      {
        q: 'Are there additional costs for amenities like printing, mail, or WiFi?',
        a: 'WiFi, kitchen access, and coffee are included with all memberships. Printing is available onsite. Mail and package handling is available as an add on service—reach out to our team to coordinate.',
      },
    ],
  },
  {
    title: 'Spaces & Amenities',
    items: [
      {
        q: 'What spaces are available at Convivia Work?',
        a: '• Focus zones — Glare free adjustable standing desks with monitors, purpose built for deep work\n• Collaboration areas — Expansive windows and modular seating for brainstorms and casual standups\n• Phone booths and quiet zones — For private calls and heads down focus\n• 4 conference rooms — Avid Learner, Scrappy, Seeks Context, and Creative Problem Solver, each with 4K displays, video conferencing, and whiteboards\n• AV Production Studio — Green screen, acoustic dampening, cinema lighting, and full production hookups',
      },
      {
        q: 'What internet speeds can I expect?',
        a: 'Multigigabit internet with redundant mesh WiFi and 5G failover backup—designed to handle video calls, live streaming, large file transfers, and anything else you throw at it.',
      },
      {
        q: 'Is coffee and kitchen access included?',
        a: 'Yes. Coffee and full kitchen access are included with all memberships and day passes.',
      },
      {
        q: 'Is printing available?',
        a: 'Yes, printing is available onsite.',
      },
      {
        q: 'Is mail and package service available?',
        a: 'Mail and package handling is available as an add on service. Contact our team to get set up.',
      },
      {
        q: 'What is the AV Production Studio?',
        a: 'A fully equipped, production ready studio featuring premium sound dampening, a built in green screen, interchangeable backgrounds, cinema grade lighting, and plug and play hookups for cameras, teleprompters, and streaming rigs. Ideal for podcasters, video creators, educators, and teams. Book it through our mobile app.',
      },
    ],
  },
  {
    title: 'Community & Events',
    items: [
      {
        q: 'What kinds of events does Convivia Work host?',
        a: 'We host founder salons, networking events, and community programming focused on growth strategies and professional connection. Coworking Membership and above includes priority invites to all events.',
      },
      {
        q: 'How often are events held?',
        a: 'At a minimum, events are held monthly. Watch the community calendar in our mobile app for upcoming programming.',
      },
    ],
  },
  {
    title: 'Policies',
    items: [
      {
        q: 'Are pets allowed?',
        a: 'We love your pets, but unfortunately they are not permitted in the office. We hope you understand!',
      },
      {
        q: 'Can I try the space before committing to a membership?',
        a: 'Yes—start with a Day Pass for $50 and experience the full Convivia environment before committing to a monthly plan.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20 space-y-16">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">FAQ</p>
          <h1 className="font-display text-6xl text-[#0c0c0c]">Everything you need to know.</h1>
          <p className="text-black/70">
            {"Can't find what you're looking for? "}
            <a
              href="https://conviviawork.coworksapp.com/membership-request/716"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#fe904d] hover:underline"
            >
              Reach out to our team.
            </a>
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="space-y-6">
            <h2 className="font-display text-3xl text-[#0c0c0c] border-b border-black/10 pb-3">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.q} className="rounded-3xl bg-[#f5f0eb] px-8 py-6 space-y-2">
                  <h3 className="font-bold text-[#0c0c0c]">{item.q}</h3>
                  <p className="text-black/70 whitespace-pre-line">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
