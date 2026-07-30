import { useState, useEffect } from 'react'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

function calculateTimeLeft(target) {
  const diff = new Date(target) - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const target = '2026-09-28T21:00:00'

const units = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Minutos' },
  { key: 'seconds', label: 'Segundos' },
]

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(target)

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-lavender-50 text-center">
      <h2 className="font-display text-5xl text-lavender-600 mb-10 italic">MIS 15 BRIANA</h2>
      <div className="flex justify-center items-center gap-3 md:gap-6 font-sans">
        {units.map(({ key, label }, i) => (
          <div key={key} className="flex items-center gap-3 md:gap-6">
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-light text-lavender-800 leading-none">
                {String({ days, hours, minutes, seconds }[key]).padStart(2, '0')}
              </span>
              <span className="text-lavender-400 text-xs uppercase tracking-widest mt-2">
                {label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-4xl md:text-6xl font-light text-lavender-200">:</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
