export default function Details() {
  return (
    <section className="py-16 px-4 bg-white text-center">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-lavender-100 p-8 space-y-8">
        <div>
          <i className="fas fa-calendar-alt text-gold-400 text-2xl mb-3 block" />
          <p className="font-display text-2xl text-lavender-700 italic">5 de Septiembre de 2026</p>
          <p className="text-lavender-500 text-lg font-light mt-1">22:30 hs</p>
        </div>

        <div className="border-t border-lavender-100 pt-6">
          <i className="fas fa-map-marker-alt text-gold-400 text-2xl mb-3 block" />
          <p className="font-display text-2xl text-lavender-700 italic">Gutiérrez Eventos</p>
          <p className="text-stone-500 text-sm mt-1">Lincoln 1009</p>
          <a
            href="https://maps.google.com/?q=Lincoln+1009"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2.5 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-lavender-700 transition-colors"
          >
            <i className="fas fa-location-arrow mr-2" />
            CÓMO LLEGAR
          </a>
        </div>
      </div>
    </section>
  )
}
