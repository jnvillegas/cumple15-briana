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
      <h3 className="font-display text-3xl text-lavender-700 italic mb-3">MIS RECUERDOS</h3>
      <p className="text-stone-500 max-w-md mx-auto mb-10 text-sm">
        Guardemos juntos cada instante de esta noche. Subí tus fotos y videos del evento.
      </p>

      {/* VERSIÓN WEB: carrusel 3 columnas visibles, avanza de a 1 */}
      <div className="hidden md:block max-w-5xl mx-auto mb-10 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${desktopIndex * 33.333}%)` }}
        >
          {photos.map((src, i) => (
            <div key={i} className="w-1/3 shrink-0 px-3">
              <img
                src={src}
                alt={`Foto ${i + 1}`}
                className="w-full rounded-2xl shadow-lg shadow-black/10 object-cover aspect-[3/2]"
              />
            </div>
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
      <div className="md:hidden mb-10 space-y-4">
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

      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-3xl shadow-lg shadow-black/10 p-6 border border-lavender-100 flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/qr.jpg"
            alt="Código QR para subir fotos al álbum"
            className="w-44 h-44 object-contain shrink-0"
          />
          <div className="text-center sm:text-left flex-1">
            <p className="font-display text-2xl text-lavender-700 italic">¿Tenés fotos del evento?</p>
            <p className="text-stone-500 text-sm mt-1 mb-4">
              Escaneá el código con la cámara de tu celular o tocá el botón para sumarlas al álbum.
            </p>
            <a
              href="https://photos.app.goo.gl/x8RwuNuuHaJczhx79"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-700 transition-colors"
            >
              <i className="fas fa-images mr-2" />
              AGREGAR TUS FOTOS
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}