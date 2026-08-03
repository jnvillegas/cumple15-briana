import { useState, useEffect } from 'react'

const photos = [
  '/imagenes%20optimizadas/imagenes%20hotizontales/bri2.jpeg',
  '/imagenes%20optimizadas/imagenes%20hotizontales/bri3.jpeg',
  '/imagenes%20optimizadas/imagenes%20hotizontales/bri4.jpeg',
  '/imagenes%20optimizadas/imagenes%20hotizontales/bri5.jpeg',
  '/imagenes%20optimizadas/imagenes%20hotizontales/bri10.jpeg',
]

const webSlides = photos.length - 2

export default function Gallery() {
  const [desktopIndex, setDesktopIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDesktopIndex(i => (i + 1) % webSlides)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 px-4 bg-white text-center">
      <i className="fas fa-camera text-gold-400 text-2xl mb-4 block" />
      <h3 className="font-display text-3xl text-lavender-700 italic mb-3">QUIERO VER TUS FOTOS</h3>
      <p className="text-stone-500 max-w-md mx-auto mb-8 text-sm">
        Pueden subir todas sus fotos del evento a mi álbum compartido.
      </p>

      {/* VERSIÓN WEB: carrusel 3 columnas visibles, avanza de a 1 */}
      <div className="hidden md:block max-w-5xl mx-auto mb-8 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out gap-6"
          style={{ transform: `translateX(calc(-${desktopIndex * 33.333}% - ${desktopIndex * 24}px))` }}
        >
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Foto ${i + 1}`}
              className="shrink-0 rounded-2xl shadow-lg shadow-black/10 object-cover aspect-[3/2]"
              style={{ width: 'calc(33.333% - 16px)' }}
            />
          ))}
        </div>
        <div className="flex justify-center gap-2 py-4 bg-white">
          {Array.from({ length: webSlides }, (_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === desktopIndex ? 'w-5 bg-lavender-500' : 'w-2 bg-lavender-200'}`}
            />
          ))}
        </div>
      </div>

      {/* VERSIÓN MÓVIL: galería horizontal con scroll */}
      <div className="md:hidden mb-8 space-y-4">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
          {photos.map((src, i) => (
            <div
              key={i}
              className="shrink-0 snap-start rounded-2xl shadow-lg shadow-black/10 overflow-hidden"
              style={{ width: 'calc(70% - 12px)' }}
            >
              <img
                src={src}
                alt={`Foto ${i + 1}`}
                className="w-full h-auto object-cover aspect-[3/2]"
              />
            </div>
          ))}
        </div>
        </div>

      <a
        href="https://latarjetadigital.com.ar/album/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-700 transition-colors"
      >
        <i className="fas fa-images mr-2" />
        IR AL ÁLBUM
      </a>
    </section>
  )
}