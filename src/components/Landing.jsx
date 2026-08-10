const WHATSAPP = '5491100000000'

const wa = message => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`

const features = [
  {
    icon: 'fa-music',
    title: 'Música para tu invitación',
    desc: 'Elegís el tema musical que acompaña a tus invitados desde el primer momento.',
  },
  {
    icon: 'fa-check-circle',
    title: 'Confirmación online',
    desc: 'Tus invitados confirman asistencia desde el celular con un solo toque.',
  },
  {
    icon: 'fa-qrcode',
    title: 'Galería de fotos con QR',
    desc: 'Los invitados escanean el código y suben sus fotos y videos del evento.',
  },
  {
    icon: 'fa-users',
    title: 'Enlaces personalizados',
    desc: 'Cada grupo recibe su propio enlace y la invitación lo saluda por su nombre.',
  },
  {
    icon: 'fa-tachometer-alt',
    title: 'Panel de gestión',
    desc: 'Estadísticas de confirmaciones, invitados y exportación a PDF y Excel.',
  },
  {
    icon: 'fa-heart',
    title: 'Diseño a tu medida',
    desc: 'Colores, fotos y estilo pensados exclusivamente para tu evento.',
  },
]

const steps = [
  {
    icon: 'fa-comments',
    title: 'Contanos tu evento',
    desc: 'Fecha, lugar, paleta de colores y el estilo que soñás.',
  },
  {
    icon: 'fa-palette',
    title: 'Personalizamos tu tarjeta',
    desc: 'Diseñamos tu invitación digital con todo lo que necesitás.',
  },
  {
    icon: 'fa-paper-plane',
    title: 'Compartí tu enlace',
    desc: 'Recibís el enlace y lo enviás por WhatsApp a tus invitados.',
  },
]

const basicFeatures = [
  'Tarjeta digital con música y fotos',
  'Confirmación de asistencia online (RSVP)',
  'Galería con código QR para fotos del evento',
  'Enlaces personalizados por invitado',
  'Panel de gestión con estadísticas',
  'Entrega en 5 días hábiles',
]

const premiumFeatures = [
  'Todo lo incluido en el plan Básico',
  'Diseño 100% personalizado para tu evento',
  'Video, animaciones y detalles extra',
  'Ajustes ilimitados hasta el día del evento',
  'Entrega prioritaria',
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="bg-white/90 backdrop-blur sticky top-0 z-50 border-b border-lavender-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2">
            <i className="fas fa-envelope-open-text text-gold-400 text-xl" />
            <span className="font-display text-xl text-lavender-700 italic">Tarjetas Digitales</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm text-stone-500">
            <a href="#demo" className="hover:text-lavender-700 transition-colors">Demo</a>
            <a href="#caracteristicas" className="hover:text-lavender-700 transition-colors">Características</a>
            <a href="#planes" className="hover:text-lavender-700 transition-colors">Planes</a>
            <a href="#contacto" className="hover:text-lavender-700 transition-colors">Contacto</a>
          </div>
          <a
            href={wa('Hola! Quiero una tarjeta digital para mi evento 🎉')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            <i className="fab fa-whatsapp mr-2" />
            WhatsApp
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header id="inicio" className="bg-gradient-to-b from-lavender-100 via-white to-lavender-50 text-center px-4 pt-16 pb-20">
        <span className="inline-block px-4 py-1.5 bg-gold-300/30 text-gold-500 rounded-full text-xs uppercase tracking-widest font-semibold mb-6">
          15 · Casamientos · Eventos
        </span>
        <h1 className="font-display text-4xl md:text-6xl text-lavender-700 italic max-w-3xl mx-auto leading-tight">
          Invitaciones digitales que tus invitados van a recordar
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto mt-6 text-lg">
          Una tarjeta hermosa con música, fotos, confirmación online y un panel para gestionar
          tus invitados. Todo desde el celular.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a
            href="#demo"
            className="px-8 py-3.5 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-700 transition-colors shadow-lg shadow-lavender-200"
          >
            Ver demo en vivo
          </a>
          <a
            href={wa('Hola! Quiero una tarjeta digital para mi evento 🎉')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border-2 border-gold-400 text-gold-500 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-gold-400 hover:text-white transition-colors"
          >
            Quiero la mía
          </a>
        </div>
      </header>

      {/* DEMO */}
      <section id="demo" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-display text-3xl md:text-4xl text-lavender-700 italic mb-3">Probala vos mismo</h3>
          <p className="text-stone-500 max-w-md mx-auto mb-10 text-sm">
            Esta es una invitación real, hecha con nuestra plataforma. Entrá y mirala cómo queda.
          </p>
          <a href="/?invitado=INV-01" target="_blank" rel="noopener noreferrer" className="block group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-lavender-200 border border-lavender-100">
              <img
                src="/imagenes%20optimizadas/invitacion%20herader.jpeg"
                alt="Demo de invitación digital"
                className="w-full aspect-[16/9] object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="px-8 py-3.5 bg-white text-lavender-700 rounded-full uppercase tracking-widest text-sm font-semibold shadow-lg">
                  <i className="fas fa-play mr-2" />
                  Abrir la demo
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section id="caracteristicas" className="py-16 px-4 bg-lavender-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-display text-3xl md:text-4xl text-lavender-700 italic text-center mb-3">
            Todo lo que tu invitación necesita
          </h3>
          <p className="text-stone-500 text-center max-w-md mx-auto mb-12 text-sm">
            Cada tarjeta incluye un sistema completo de gestión de invitados.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-lavender-100 flex items-center justify-center mb-4">
                  <i className={`fas ${f.icon} text-lavender-600 text-xl`} />
                </div>
                <p className="font-semibold text-lavender-800 mb-2">{f.title}</p>
                <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-display text-3xl md:text-4xl text-lavender-700 italic text-center mb-12">
            Así de simple
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold-400/20 flex items-center justify-center mb-4">
                  <i className={`fas ${s.icon} text-gold-500 text-2xl`} />
                </div>
                <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold">Paso {i + 1}</span>
                <p className="font-display text-2xl text-lavender-700 italic mt-1 mb-2">{s.title}</p>
                <p className="text-sm text-stone-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="py-16 px-4 bg-lavender-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-3xl md:text-4xl text-lavender-700 italic text-center mb-3">Planes</h3>
          <p className="text-stone-500 text-center max-w-md mx-auto mb-12 text-sm">
            Elegí el que mejor se adapta a tu evento. Sin costos ocultos.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* BÁSICO */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-lavender-100 flex flex-col">
              <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1">Plan Básico</p>
              <p className="font-display text-5xl text-lavender-700 mb-1">$70.000</p>
              <p className="text-xs text-stone-400 mb-6">Pesos argentinos · pago único</p>
              <p className="text-sm text-stone-500 mb-6">Ideal para 15, casamientos y eventos íntimos.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {basicFeatures.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-stone-600">
                    <i className="fas fa-check text-gold-500 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={wa('Hola! Quiero contratar el PLAN BÁSICO para mi evento 🎉')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center px-6 py-3.5 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-700 transition-colors shadow-md shadow-lavender-200"
              >
                Contratar Básico
              </a>
            </div>

            {/* PREMIUM */}
            <div className="bg-gradient-to-b from-lavender-600 to-lavender-700 rounded-3xl p-8 shadow-xl border border-lavender-500 text-white flex flex-col">
              <p className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-1">Plan Premium</p>
              <p className="font-display text-4xl text-gold-300 italic mb-1">A cotizar</p>
              <p className="text-xs text-lavender-200 mb-6">Cotización por chat según tu evento</p>
              <p className="text-sm text-lavender-100 mb-6">Diseño totalmente a medida para eventos que quieren brillar.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {premiumFeatures.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-lavender-50">
                    <i className="fas fa-crown text-gold-300 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={wa('Hola! Quiero cotizar el PLAN PREMIUM para mi evento 🎉')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center px-6 py-3.5 bg-gold-400 text-lavender-900 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-gold-300 transition-colors shadow-lg"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" className="py-20 px-4 bg-white text-center">
        <i className="fas fa-heart text-gold-400 text-3xl mb-4 block" />
        <h3 className="font-display text-4xl text-lavender-700 italic mb-3">¿Listo para tu evento?</h3>
        <p className="text-stone-500 max-w-md mx-auto mb-8 text-sm">
          Escribinos por WhatsApp y contanos qué estás organizando. Respondemos rápido.
        </p>
        <a
          href={wa('Hola! Quiero una tarjeta digital para mi evento 🎉')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-emerald-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
        >
          <i className="fab fa-whatsapp mr-2" />
          Escribinos ahora
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-lavender-900 text-lavender-300 text-center px-4 py-8">
        <p className="font-display text-xl italic mb-1">Tarjetas Digitales</p>
        <p className="text-xs text-lavender-400">
          15 · Casamientos · Eventos · © 2026
        </p>
      </footer>
    </div>
  )
}
