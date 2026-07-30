const photos = [
  { src: '/bri2.jpeg', alt: 'Foto 1' },
  { src: '/bri3.jpeg', alt: 'Foto 2' },
  { src: '/bri4.jpeg', alt: 'Foto 3' },
]

export default function Gallery() {
  return (
    <section className="py-16 px-4 bg-white text-center">
      <i className="fas fa-camera text-gold-400 text-2xl mb-4 block" />
      <h3 className="font-display text-3xl text-lavender-700 italic mb-3">QUIERO VER TUS FOTOS</h3>
      <p className="text-stone-500 max-w-md mx-auto mb-6 text-sm">
        Pueden subir todas sus fotos del evento a mi álbum compartido.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
        {photos.map((photo, i) => (
          <div key={i} className="overflow-hidden rounded-xl">
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
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
