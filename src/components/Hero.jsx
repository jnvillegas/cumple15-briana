import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const [revealed, setRevealed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3')
    audioRef.current.loop = true
    return () => audioRef.current?.pause()
  }, [])

  useEffect(() => {
    if (!revealed) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => document.body.classList.remove('no-scroll')
  }, [revealed])

  function toggleMusic() {
    if (playing) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/bri1.jpeg"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ${revealed ? 'scale-100 blur-0' : 'scale-110 blur-md'}`}
      />
      <div className={`absolute inset-0 bg-gradient-to-b from-lavender-900/70 via-lavender-800/60 to-black/50 transition-opacity duration-[1.2s] ${revealed ? 'opacity-60' : 'opacity-70'}`} />

      <div className={`relative text-center px-4 z-10 reveal-content ${revealed ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-gold-300 uppercase tracking-[0.3em] text-sm mb-4 font-sans">
          Invitación a mis 15 años
        </p>
        <h1 className="font-display text-6xl md:text-8xl text-white mb-2 italic">
          Briana
        </h1>
        <p className="text-lavender-200 text-lg max-w-md mx-auto font-light">
          QUIERO QUE SEAS PARTE DE ESTE MOMENTO TAN IMPORTANTE PARA MÍ
        </p>
      </div>

      <div className={`absolute inset-0 flex flex-col items-center justify-center z-20 reveal-overlay ${revealed ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        <p className="text-gold-300 uppercase tracking-[0.3em] text-sm mb-2 font-sans">
          Invitación a mis 15 años
        </p>
        <h1 className="font-display text-6xl md:text-8xl text-white mb-6 italic">
          Briana
        </h1>
        <button
          onClick={() => setRevealed(true)}
          className="px-10 py-3 border-2 border-gold-400 text-gold-400 rounded-full uppercase tracking-widest text-sm hover:bg-gold-400 hover:text-white transition-all duration-500"
        >
          INGRESAR
        </button>
      </div>

      <button
        onClick={toggleMusic}
        className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
      >
        <i className={`fas ${playing ? 'fa-volume-up' : 'fa-volume-mute'}`} />
      </button>
    </section>
  )
}
