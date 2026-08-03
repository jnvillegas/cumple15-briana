import { useState, useEffect } from 'react'

const photos = [
  '/imagenes%20optimizadas/imagnees%20verticales/bri1.jpeg',
  '/imagenes%20optimizadas/imagnees%20verticales/bri6.jpeg',
  '/imagenes%20optimizadas/imagnees%20verticales/bri7.jpeg',
]

export default function VerticalGallery() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % photos.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 px-4 bg-white">
      {/* VERSIÓN WEB: tres imágenes en fila */}
      <div className="hidden md:grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Foto ${i + 1}`}
            className="w-full aspect-[2/3] object-cover rounded-2xl shadow-lg shadow-black/10"
          />
        ))}
      </div>

      {/* VERSIÓN MÓVIL: carrusel autoplay */}
      <div className="md:hidden max-w-xs mx-auto overflow-hidden rounded-2xl shadow-lg shadow-black/10">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Foto ${i + 1}`}
              className="w-full shrink-0 object-cover"
              style={{ height: '70vh' }}
            />
          ))}
        </div>
        <div className="flex justify-center gap-2 py-3 bg-white">
          {photos.map((p, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-lavender-500' : 'w-2 bg-lavender-200'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}