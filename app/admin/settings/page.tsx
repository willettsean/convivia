import { auth } from '@/auth'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminSettingsPage() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') redirect('/login')

  const rooms = await db.room.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C]">Settings</h1>
        <Link href="/admin" className="text-sm text-[#C1623F] hover:underline">← Dashboard</Link>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Rooms</h2>
        <div className="space-y-3">
          {rooms.map(room => (
            <div key={room.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-[#2C2C2C]">{room.name}</p>
                <p className="text-sm text-gray-500">{room.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  room.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                }`}>
                  {room.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Room management (add/remove/toggle) available in a future release.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Availability Hours</h2>
        <div className="flex items-center gap-4">
          <div className="bg-gray-50 rounded-lg px-4 py-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Open</p>
            <p className="font-bold text-[#2C2C2C]">07:00</p>
          </div>
          <span className="text-gray-400">—</span>
          <div className="bg-gray-50 rounded-lg px-4 py-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Close</p>
            <p className="font-bold text-[#2C2C2C]">22:00</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">Configurable in a future release.</p>
      </div>
    </div>
  )
}
