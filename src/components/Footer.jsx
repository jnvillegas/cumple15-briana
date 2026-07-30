export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-lavender-900 text-center">
      <h3 className="font-display text-3xl text-gold-300 italic mb-1">TE ESPERO</h3>
      <p className="text-lavender-300 text-sm mb-8">BRIANA</p>

      <div className="flex justify-center gap-6">
        <a
          href="https://www.instagram.com/latarjetadigital_"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lavender-300 hover:text-gold-300 transition-colors"
        >
          <i className="fab fa-instagram text-xl" />
        </a>
        <a
          href="https://wa.me/message/3JPD7Z523T4VF1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lavender-300 hover:text-gold-300 transition-colors"
        >
          <i className="fab fa-whatsapp text-xl" />
        </a>
      </div>

      <p className="text-lavender-500 text-xs mt-10">
        Crafted with <i className="fas fa-heart text-gold-400" /> by{' '}
        <a href="https://latarjetadigital.com.ar" target="_blank" rel="noopener noreferrer" className="underline hover:text-lavender-300 transition-colors">
          La Tarjeta Digital
        </a>
      </p>
    </footer>
  )
}
