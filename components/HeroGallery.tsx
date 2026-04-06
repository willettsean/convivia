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

  return (
    <div className="flex-1">
      <div className="relative h-[360px] md:h-[520px] rounded-[32px] overflow-hidden shadow-2xl">
        <Image
          key={photos[index]}
          src={photos[index]}
          alt="Convivia workspace"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20" aria-hidden />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {photos.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-6 rounded-full transition-all ${i === index ? 'bg-[#fe904d]' : 'bg-black/20'}`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}
