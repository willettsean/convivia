'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const photos = [
  '/assets/office/office-01.jpg',
  '/assets/office/office-02.jpg',
  '/assets/office/office-03.jpg',
  '/assets/office/office-04.jpg',
  '/assets/office/office-05.jpg',
  '/assets/office/office-06.jpg',
  '/assets/office/office-07.jpg',
  '/assets/office/office-08.jpg',
]

export function HeroGallery() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const currentSet = Array.from({ length: 4 }, (_, offset) => photos[(index + offset) % photos.length])

  return (
    <div className="flex flex-1 flex-col gap-4" aria-label="Workspace imagery carousel">
      <div className="grid grid-cols-2 gap-4">
        {currentSet.slice(0, 2).map((src) => (
          <Image key={src} src={src} alt="Convivia workspace" width={420} height={320} className="rounded-3xl object-cover" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {currentSet.slice(2, 4).map((src) => (
          <Image key={src} src={src} alt="Convivia workspace" width={420} height={320} className="rounded-3xl object-cover" />
        ))}
      </div>
    </div>
  )
}
