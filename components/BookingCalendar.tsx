'use client'
import { useState, useEffect, useCallback } from 'react'

// --- Types ---
interface RoomAvailability {
  id: string
  name: string
  reservations: {
    id: string
    start: string
    end: string
    memberName: string
    memberId: string
  }[]
}

interface AvailabilityData {
  date: string
  rooms: RoomAvailability[]
}

interface BookingCalendarProps {
  isAdmin?: boolean
  allowPastDates?: boolean
  onCancel?: (id: string) => Promise<void>
  onBookingCreated?: () => void
}

// --- Constants ---
const HOUR_START = 7   // 07:00
const HOUR_END = 22    // 22:00
const SLOT_MINUTES = 15
const SLOT_HEIGHT = 40  // px
const TOTAL_SLOTS = ((HOUR_END - HOUR_START) * 60) / SLOT_MINUTES  // 60

function slotToMinutes(slot: number) { return HOUR_START * 60 + slot * SLOT_MINUTES }
function minutesToSlot(minutes: number) { return (minutes - HOUR_START * 60) / SLOT_MINUTES }
function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
function toMinutes(isoString: string) {
  const d = new Date(isoString)
  return d.getHours() * 60 + d.getMinutes()
}

export default function BookingCalendar({ isAdmin = false, allowPastDates = false, onCancel, onBookingCreated }: BookingCalendarProps) {
  // Date state (default today)
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(todayStr)

  // All rooms (fetched once)
  const [allRooms, setAllRooms] = useState<{ id: string; name: string }[]>([])
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([])

  // Availability data
  const [availability, setAvailability] = useState<AvailabilityData | null>(null)
  const [loading, setLoading] = useState(false)

  // Drag/click selection state
  const [dragStart, setDragStart] = useState<{ roomId: string; slot: number } | null>(null)
  const [dragEnd, setDragEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Booking modal
  const [modal, setModal] = useState<{
    roomId: string
    roomName: string
    startMinutes: number
    endMinutes: number
  } | null>(null)
  const [modalStart, setModalStart] = useState('')
  const [modalEnd, setModalEnd] = useState('')
  const [modalError, setModalError] = useState('')
  const [modalLoading, setModalLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Now indicator
  const [nowSlot, setNowSlot] = useState<number | null>(null)

  // Fetch rooms on mount
  useEffect(() => {
    fetch('/api/rooms')
      .then(r => r.json())
      .then((rooms: { id: string; name: string }[]) => {
        setAllRooms(rooms)
        setSelectedRoomIds(rooms.map(r => r.id))
      })
  }, [])

  // Update "now" every minute
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const mins = now.getHours() * 60 + now.getMinutes()
      if (mins >= HOUR_START * 60 && mins <= HOUR_END * 60) {
        setNowSlot(minutesToSlot(mins))
      } else {
        setNowSlot(null)
      }
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  // Fetch availability when date or rooms change
  const fetchAvailability = useCallback(async () => {
    if (selectedRoomIds.length === 0) { setAvailability(null); return }
    setLoading(true)
    const params = new URLSearchParams({ date: selectedDate })
    selectedRoomIds.forEach(id => params.append('room_ids', id))
    try {
      const res = await fetch(`/api/rooms/availability?${params}`)
      const data = await res.json()
      setAvailability(data)
    } finally {
      setLoading(false)
    }
  }, [selectedDate, selectedRoomIds])

  useEffect(() => { fetchAvailability() }, [fetchAvailability])

  // Date constraints
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 60)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  // Is this date today?
  const isToday = selectedDate === todayStr
  // Is this a past date (admin past-date view)?
  const isPastDate = selectedDate < todayStr

  // Room toggle
  const toggleRoom = (id: string) => {
    setSelectedRoomIds(prev =>
      prev.includes(id)
        ? prev.filter(r => r !== id)
        : [...prev, id].slice(0, 3)
    )
  }

  // Slot helpers
  const isSlotPast = (slot: number) => {
    if (isPastDate) return true
    if (!isToday) return false
    const slotMins = slotToMinutes(slot)
    const nowMins = new Date().getHours() * 60 + new Date().getMinutes()
    return slotMins < nowMins
  }

  const isSlotReserved = (roomData: RoomAvailability, slot: number) => {
    const slotStart = slotToMinutes(slot)
    const slotEnd = slotStart + SLOT_MINUTES
    return roomData.reservations.some(r => {
      const rStart = toMinutes(r.start)
      const rEnd = toMinutes(r.end)
      return slotStart < rEnd && slotEnd > rStart
    })
  }

  const getReservationForSlot = (roomData: RoomAvailability, slot: number) => {
    const slotStart = slotToMinutes(slot)
    const slotEnd = slotStart + SLOT_MINUTES
    return roomData.reservations.find(r => {
      const rStart = toMinutes(r.start)
      const rEnd = toMinutes(r.end)
      return slotStart < rEnd && slotEnd > rStart
    })
  }

  // Drag selection range
  const getSelectionSlots = () => {
    if (!dragStart || dragEnd === null) return null
    const minSlot = Math.min(dragStart.slot, dragEnd)
    const maxSlot = Math.max(dragStart.slot, dragEnd)
    return { roomId: dragStart.roomId, minSlot, maxSlot }
  }

  const openModal = (roomId: string, roomName: string, startSlot: number, endSlot: number) => {
    const startMins = slotToMinutes(startSlot)
    const endMins = slotToMinutes(endSlot + 1) // endSlot is inclusive
    setModal({ roomId, roomName, startMinutes: startMins, endMinutes: endMins })
    setModalStart(formatTime(startMins))
    setModalEnd(formatTime(Math.min(endMins, HOUR_END * 60)))
    setModalError('')
  }

  const handleSlotMouseDown = (roomId: string, roomName: string, slot: number, reserved: boolean, past: boolean) => {
    if (reserved || past) return
    setDragStart({ roomId, slot })
    setDragEnd(slot)
    setIsDragging(true)
  }

  const handleSlotMouseEnter = (slot: number) => {
    if (isDragging && dragStart) {
      setDragEnd(slot)
    }
  }

  const handleSlotMouseUp = (roomId: string, roomName: string, slot: number) => {
    if (!isDragging || !dragStart) return
    setIsDragging(false)
    if (dragStart.roomId !== roomId) { setDragStart(null); setDragEnd(null); return }
    const minSlot = Math.min(dragStart.slot, slot)
    const maxSlot = Math.max(dragStart.slot, slot)
    openModal(roomId, roomName, minSlot, maxSlot)
    setDragStart(null)
    setDragEnd(null)
  }

  const handleConfirmBooking = async () => {
    if (!modal) return
    setModalError('')
    const [startH, startM] = modalStart.split(':').map(Number)
    const [endH, endM] = modalEnd.split(':').map(Number)
    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) { setModalError('Invalid time'); return }
    const startMins = startH * 60 + startM
    const endMins = endH * 60 + endM
    if (endMins - startMins < 30) { setModalError('Minimum booking duration is 30 minutes'); return }
    if (startMins < HOUR_START * 60) { setModalError('Start time must be 07:00 or later'); return }
    if (endMins > HOUR_END * 60) { setModalError('End time must be 22:00 or earlier'); return }
    if (startMins >= endMins) { setModalError('End time must be after start time'); return }

    const startDt = new Date(`${selectedDate}T${modalStart}:00`)
    const endDt = new Date(`${selectedDate}T${modalEnd}:00`)

    if (startDt < new Date()) { setModalError('Cannot book in the past'); return }

    setModalLoading(true)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: modal.roomId,
          startDatetime: startDt.toISOString(),
          endDatetime: endDt.toISOString(),
        }),
      })
      const data = await res.json()
      if (!res.ok) { setModalError(data.error || 'Booking failed'); return }
      setModal(null)
      setSuccessMsg(`✅ ${modal.roomName} booked for ${modalStart}–${modalEnd}`)
      setTimeout(() => setSuccessMsg(''), 5000)
      fetchAvailability()
      onBookingCreated?.()
    } finally {
      setModalLoading(false)
    }
  }

  const rooms = availability?.rooms ?? []

  return (
    <div
      className="select-none"
      onMouseLeave={() => { if (isDragging) { setIsDragging(false); setDragStart(null); setDragEnd(null) }}}
    >
      {/* Past date banner */}
      {isPastDate && (
        <div className="mb-4 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 text-sm font-medium">
          📅 Viewing past date — read only
        </div>
      )}

      {/* Success banner */}
      {successMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-800 text-sm font-medium">
          {successMsg}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            min={isAdmin && allowPastDates ? undefined : todayStr}
            max={maxDateStr}
            onChange={e => setSelectedDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Rooms</label>
          <div className="flex gap-2">
            {allRooms.map(room => (
              <button
                key={room.id}
                onClick={() => toggleRoom(room.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  selectedRoomIds.includes(room.id)
                    ? 'bg-[#C1623F] text-white border-[#C1623F]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#C1623F]'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-[#C1623F]"></span> Reserved</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-[#FAF8F5] border border-gray-200"></span> Available</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-gray-100"></span> Past</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-[#FDE8DF]"></span> Selecting</span>
      </div>

      {/* Calendar grid */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading availability...</div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-16 text-gray-400">Select at least one room</div>
      ) : (
        <div className="overflow-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
          <div
            style={{ display: 'grid', gridTemplateColumns: `64px repeat(${rooms.length}, 1fr)` }}
            className="min-w-[400px]"
          >
            {/* Header row */}
            <div className="bg-gray-50 border-b border-gray-100 px-2 py-3"></div>
            {rooms.map(room => (
              <div key={room.id} className="bg-gray-50 border-b border-l border-gray-100 px-3 py-3 text-center">
                <span className="font-bold text-sm text-[#2C2C2C]">{room.name}</span>
              </div>
            ))}

            {/* Time rows */}
            {Array.from({ length: TOTAL_SLOTS }).map((_, slot) => {
              const mins = slotToMinutes(slot)
              const showLabel = mins % 60 === 0
              const selection = getSelectionSlots()

              return (
                <>
                  {/* Time label */}
                  <div
                    key={`label-${slot}`}
                    style={{ height: SLOT_HEIGHT }}
                    className={`relative border-b border-gray-50 px-2 flex items-start pt-1 ${showLabel ? 'border-t border-gray-100' : ''}`}
                  >
                    {showLabel && (
                      <span className="text-xs text-gray-400 font-medium tabular-nums">{formatTime(mins)}</span>
                    )}
                    {/* Now indicator line */}
                    {isToday && nowSlot !== null && slot === Math.floor(nowSlot) && (
                      <div
                        className="absolute left-0 right-0 z-10 pointer-events-none"
                        style={{ top: `${(nowSlot - Math.floor(nowSlot)) * SLOT_HEIGHT}px` }}
                      >
                        <div className="border-t-2 border-red-500 w-full relative">
                          <div className="absolute -top-1.5 -left-1 w-3 h-3 rounded-full bg-red-500"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Room columns */}
                  {rooms.map(room => {
                    const past = isSlotPast(slot)
                    const reserved = isSlotReserved(room, slot)
                    const reservation = getReservationForSlot(room, slot)
                    const inSelection = selection?.roomId === room.id && slot >= selection.minSlot && slot <= selection.maxSlot

                    // Calculate block height for reservation (from this slot to end)
                    let blockHeight = SLOT_HEIGHT
                    let showBlock = false
                    if (reserved && reservation) {
                      const rStartMins = toMinutes(reservation.start)
                      const rEndMins = toMinutes(reservation.end)
                      if (rStartMins === mins || (rStartMins > mins - SLOT_MINUTES && rStartMins <= mins)) {
                        showBlock = true
                        blockHeight = ((rEndMins - Math.max(rStartMins, mins)) / SLOT_MINUTES) * SLOT_HEIGHT
                      }
                    }

                    return (
                      <div
                        key={`${room.id}-${slot}`}
                        style={{ height: SLOT_HEIGHT, position: 'relative' }}
                        className={`border-b border-l border-gray-50 transition-colors ${showLabel ? 'border-t border-gray-100' : ''} ${
                          reserved || past ? 'cursor-default' : 'cursor-pointer'
                        } ${
                          past && !reserved ? 'bg-gray-50' : ''
                        } ${
                          inSelection && !reserved && !past ? 'bg-[#FDE8DF]' : ''
                        } ${
                          !reserved && !past && !inSelection ? 'hover:bg-[#FDF3EE]' : ''
                        }`}
                        onMouseDown={() => handleSlotMouseDown(room.id, room.name, slot, reserved, past)}
                        onMouseEnter={() => handleSlotMouseEnter(slot)}
                        onMouseUp={() => handleSlotMouseUp(room.id, room.name, slot)}
                      >
                        {/* Reservation block */}
                        {showBlock && reservation && (
                          <div
                            className="absolute left-0 right-0 z-10 bg-[#C1623F] rounded mx-0.5 px-2 py-1 overflow-hidden"
                            style={{ height: blockHeight - 2, top: 1 }}
                            onMouseDown={e => e.stopPropagation()}
                          >
                            <div className="text-white text-xs font-semibold truncate">
                              {isAdmin ? reservation.memberName : 'Reserved'}
                            </div>
                            <div className="text-white/80 text-xs truncate">
                              {formatTime(toMinutes(reservation.start))}–{formatTime(toMinutes(reservation.end))}
                            </div>
                            {isAdmin && onCancel && !isPastDate && (
                              <button
                                className="mt-1 text-white/80 hover:text-white text-xs underline"
                                onClick={async (e) => { e.stopPropagation(); await onCancel(reservation.id); fetchAvailability() }}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </>
              )
            })}
          </div>
        </div>
      )}

      {/* Footer hint */}
      {!isToday && (
        <p className="text-xs text-gray-400 mt-2 text-center">Click or drag to select a time slot and book</p>
      )}
      {isToday && (
        <p className="text-xs text-gray-400 mt-2 text-center">Red line = now · Click or drag to book</p>
      )}

      {/* Booking Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#2C2C2C] mb-1">Book {modal.roomName}</h2>
            <p className="text-sm text-gray-500 mb-6">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
              })}
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Start Time</label>
                  <input
                    type="time"
                    value={modalStart}
                    min="07:00"
                    max="21:30"
                    step={SLOT_MINUTES * 60}
                    onChange={e => setModalStart(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">End Time</label>
                  <input
                    type="time"
                    value={modalEnd}
                    min="07:30"
                    max="22:00"
                    step={SLOT_MINUTES * 60}
                    onChange={e => setModalEnd(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C1623F]"
                  />
                </div>
              </div>

              {modalError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-700 text-sm">
                  {modalError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleConfirmBooking}
                  disabled={modalLoading}
                  className="flex-1 bg-[#C1623F] text-white font-semibold py-3 rounded-xl hover:bg-[#a8522f] transition-colors disabled:opacity-60"
                >
                  {modalLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
