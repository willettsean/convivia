'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const images = [
  // Workspace
  { src: '/assets/gallery/workspace-01.jpg', label: 'Lounge' },
  { src: '/assets/gallery/workspace-02.jpg', label: 'Lounge' },
  { src: '/assets/gallery/workspace-03.jpg', label: 'Collaborative Space' },
  { src: '/assets/gallery/workspace-04.jpg', label: 'Focus Room' },
  { src: '/assets/gallery/workspace-05.jpg', label: 'Kitchen' },
  { src: '/assets/gallery/workspace-06.jpg', label: 'Kitchen' },
  { src: '/assets/gallery/workspace-07.jpg', label: 'Workspace' },
  { src: '/assets/gallery/workspace-08.jpg', label: 'Workspace' },
  // AV Studio
  { src: '/assets/gallery/studio-01.jpg', label: 'AV Studio' },
  { src: '/assets/gallery/studio-02.jpg', label: 'AV Studio' },
  { src: '/assets/gallery/studio-03.jpg', label: 'AV Studio' },
  { src: '/assets/gallery/studio-04.jpg', label: 'AV Studio' },
  // Space photos
  { src: '/assets/gallery/space-01.jpg', label: 'Space' },
  { src: '/assets/gallery/space-02.jpg', label: 'Space' },
  { src: '/assets/gallery/space-03.jpg', label: 'Space' },
  { src: '/assets/gallery/space-04.jpg', label: 'Space' },
  { src: '/assets/gallery/space-05.jpg', label: 'Space' },
  { src: '/assets/gallery/space-06.jpg', label: 'Space' },
  { src: '/assets/gallery/space-07.jpg', label: 'Space' },
  { src: '/assets/gallery/space-08.jpg', label: 'Space' },
  { src: '/assets/gallery/space-09.jpg', label: 'Space' },
  { src: '/assets/gallery/space-10.jpg', label: 'Space' },
  { src: '/assets/gallery/space-11.jpg', label: 'Space' },
  { src: '/assets/gallery/space-12.jpg', label: 'Space' },
  { src: '/assets/gallery/space-13.jpg', label: 'Space' },
  { src: '/assets/gallery/space-14.jpg', label: 'Space' },
  { src: '/assets/gallery/space-15.jpg', label: 'Space' },
  { src: '/assets/gallery/space-16.jpg', label: 'Space' },
  { src: '/assets/gallery/space-17.jpg', label: 'Space' },
  { src: '/assets/gallery/space-18.jpg', label: 'Space' },
  { src: '/assets/gallery/space-19.jpg', label: 'Space' },
  { src: '/assets/gallery/space-20.jpg', label: 'Space' },
  { src: '/assets/gallery/space-21.jpg', label: 'Space' },
]

export default function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null)

  const close = useCallback(() => setSelected(null), [])
  const prev = useCallback(() => setSelected(s => (s !== null && s > 0 ? s - 1 : s)), [])
  const next = useCallback(() => setSelected(s => (s !== null && s < images.length - 1 ? s + 1 : s)), [])

  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, next, prev, close])

  // Prevent background scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">Gallery</p>
        <h1 className="font-display text-6xl text-[#0c0c0c]">See the space for yourself.</h1>
        <p className="text-black/60 max-w-xl">
          A look inside Convivia Work — from the focus zones and conference rooms to the AV production studio and community areas. Click any photo to expand.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setSelected(i)}
              className="relative block overflow-hidden rounded-2xl bg-[#f5f0eb] aspect-[4/3] group focus:outline-none focus:ring-2 focus:ring-[#fe904d]"
              aria-label={`View photo ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-2xl">⊕</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            disabled={selected === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/25 disabled:opacity-20 transition"
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative" style={{ width: '80vw', height: '80vh' }}>
              <Image
                src={images[selected].src}
                alt={images[selected].label}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); next() }}
            disabled={selected === images.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/25 disabled:opacity-20 transition"
            aria-label="Next"
          >
            ›
          </button>

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition text-lg"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {selected + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
