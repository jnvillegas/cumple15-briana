export default function Quote() {
  return (
    <section className="py-16 px-4 bg-lavender-50 text-center">
      <div className="max-w-2xl mx-auto">
        <i className="fas fa-quote-left text-gold-400 text-3xl mb-6 block" />
        <blockquote className="font-display text-2xl md:text-3xl text-lavender-700 italic leading-relaxed">
          Recuerda que la vida es un viaje, no un destino. Disfruta cada momento.
        </blockquote>
        <p className="text-lavender-500 text-lg mt-6 font-light tracking-wider uppercase">
          Prepárate para una noche ¡inolvidable!
        </p>
      </div>
    </section>
  )
}
