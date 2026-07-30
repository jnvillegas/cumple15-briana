import { useState } from 'react'
import confetti from 'canvas-confetti'

const questions = [
  {
    question: '¿Cuál es mi color favorito?',
    options: ['Rosa', 'Lila', 'Negro'],
    answer: 1,
  },
  {
    question: '¿Cuál es mi comida favorita?',
    options: ['Hamburguesas', 'Pizza', 'Milanesas'],
    answer: 0,
  },
  {
    question: '¿Qué me gusta hacer en mi tiempo libre?',
    options: ['Dormir', 'Salir con amigas', 'Ver series'],
    answer: 1,
  },
  {
    question: '¿Cuál es mi bebida favorita?',
    options: ['Gaseosa', 'Jugo', 'Agua'],
    answer: 0,
  },
  {
    question: '¿Qué estación del año prefiero?',
    options: ['Verano', 'Invierno', 'Primavera'],
    answer: 0,
  },
]

function fireConfetti() {
  const duration = 2000
  const end = Date.now() + duration
  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#7B2D8E', '#D4AF37', '#C8A2C6', '#E8D5A5'],
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#7B2D8E', '#D4AF37', '#C8A2C6', '#E8D5A5'],
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

export default function Trivia() {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  function handleAnswer(index) {
    setSelected(index)
    setShowFeedback(true)
    if (index === questions[current].answer) {
      setScore(score + 1)
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1)
        setSelected(null)
        setShowFeedback(false)
      } else {
        setFinished(true)
        fireConfetti()
      }
    }, 1000)
  }

  function restart() {
    setStarted(false)
    setCurrent(0)
    setScore(0)
    setFinished(false)
    setSelected(null)
    setShowFeedback(false)
  }

  if (!started) {
    return (
      <section className="py-16 px-4 bg-white text-center">
        <i className="fas fa-gamepad text-gold-400 text-2xl mb-4 block" />
        <h3 className="font-display text-3xl text-lavender-700 italic mb-2">JUGUEMOS UN POCO</h3>
        <p className="text-stone-500 text-sm mb-8">¿Cuánto me conoces?</p>
        <button
          onClick={() => setStarted(true)}
          className="px-10 py-3 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-700 transition-colors"
        >
          <i className="fas fa-play mr-2" />
          COMENZAR TRIVIA
        </button>
      </section>
    )
  }

  if (finished) {
    const total = questions.length
    const messages = {
      perfect: '¡Perfecto! ¡Me conoces muy bien!',
      good: '¡Muy bien! Casi me conoces del todo.',
      bad: 'Sigue intentando... ¿me conocés un poco más?',
    }
    const msg = score === total ? messages.perfect : score >= total / 2 ? messages.good : messages.bad
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-white to-lavender-50 text-center">
        <i className="fas fa-star text-gold-400 text-3xl mb-4 block" />
        <h3 className="font-display text-4xl text-lavender-700 italic mb-4">{msg}</h3>
        <p className="text-stone-500 text-lg mb-2">
          {score} de {total} respuestas correctas
        </p>
        <button
          onClick={restart}
          className="mt-6 px-8 py-3 border-2 border-lavender-400 text-lavender-600 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-600 hover:text-white transition-all"
        >
          <i className="fas fa-redo mr-2" />
          VOLVER A JUGAR
        </button>
      </section>
    )
  }

  const q = questions[current]
  const isCorrect = selected !== null && selected === q.answer
  const isWrong = selected !== null && selected !== q.answer

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-lavender-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lavender-400 text-sm font-medium">
            <i className="fas fa-question-circle mr-1" />
            Pregunta {current + 1} de {questions.length}
          </span>
          <span className="text-lavender-400 text-sm">
            <i className="fas fa-check-circle mr-1" />
            {score}
          </span>
        </div>

        <h3 className="font-display text-2xl text-lavender-700 italic mb-8 text-center">
          {q.question}
        </h3>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let btnClass = 'border-lavender-200 text-stone-700 hover:border-lavender-400 hover:bg-lavender-50'
            if (selected !== null) {
              if (i === q.answer) btnClass = 'border-green-400 bg-green-50 text-green-700'
              else if (i === selected) btnClass = 'border-red-400 bg-red-50 text-red-600'
              else btnClass = 'border-lavender-100 text-stone-300'
            }
            return (
              <button
                key={i}
                disabled={selected !== null}
                onClick={() => handleAnswer(i)}
                className={`w-full py-3.5 px-6 border-2 rounded-xl transition-all duration-300 font-medium ${btnClass}`}
              >
                {opt}
                {selected !== null && i === q.answer && <i className="fas fa-check ml-2" />}
                {selected !== null && i === selected && i !== q.answer && <i className="fas fa-times ml-2" />}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
