import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminHash = await bcrypt.hash('admin123', 10)
  const memberHash = await bcrypt.hash('member123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@convivia.co' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@convivia.co',
      passwordHash: adminHash,
      role: 'admin',
      profile: { create: { gdprConsentTimestamp: new Date(), marketingOptIn: false } },
      membership: { create: { tier: 'private_office', status: 'active' } },
    },
  })

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      name: 'Alice Chen',
      email: 'alice@example.com',
      passwordHash: memberHash,
      role: 'member',
      company: 'Freelance Design',
      profile: { create: { gdprConsentTimestamp: new Date(), marketingOptIn: true } },
      membership: { create: { tier: 'hot_desk', status: 'active' } },
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Martinez',
      email: 'bob@example.com',
      passwordHash: memberHash,
      role: 'member',
      company: 'Martinez Consulting',
      profile: { create: { gdprConsentTimestamp: new Date(), marketingOptIn: false } },
      membership: { create: { tier: 'dedicated_desk', status: 'active' } },
    },
  })

  const roomA = await prisma.room.upsert({ where: { id: 'room-a' }, update: {}, create: { id: 'room-a', name: 'Room A', description: 'Cozy 4-person meeting room' } })
  const roomB = await prisma.room.upsert({ where: { id: 'room-b' }, update: {}, create: { id: 'room-b', name: 'Room B', description: 'Open collaboration space for up to 8' } })
  await prisma.room.upsert({ where: { id: 'room-c' }, update: {}, create: { id: 'room-c', name: 'Room C', description: 'Private phone booth / focus room' } })

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const start = new Date(tomorrow)
  start.setHours(10, 0, 0, 0)
  const end = new Date(tomorrow)
  end.setHours(12, 0, 0, 0)

  await prisma.reservation.create({
    data: { roomId: roomA.id, userId: alice.id, startDatetime: start, endDatetime: end, status: 'confirmed' },
  })

  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  const twoWeeks = new Date()
  twoWeeks.setDate(twoWeeks.getDate() + 14)

  await prisma.event.createMany({
    data: [
      {
        title: 'Founder Networking Breakfast',
        description: 'Join us for a casual breakfast and networking session with local founders and entrepreneurs. Coffee and pastries provided.',
        startDatetime: new Date(new Date(nextWeek).setHours(9, 0, 0, 0)),
        endDatetime: new Date(new Date(nextWeek).setHours(11, 0, 0, 0)),
        status: 'published',
        location: 'Convivia, Walnut Creek, CA',
      },
      {
        title: 'Deep Work Workshop',
        description: 'A hands-on workshop on building sustainable focus habits for remote workers and freelancers. Led by productivity coach Jamie Rivera.',
        startDatetime: new Date(new Date(twoWeeks).setHours(14, 0, 0, 0)),
        endDatetime: new Date(new Date(twoWeeks).setHours(16, 0, 0, 0)),
        status: 'published',
        location: 'Convivia, Walnut Creek, CA',
      },
    ],
  })

  console.log('✅ Seed complete')
}

main().catch(console.error).finally(() => prisma.$disconnect())
