import { useState } from 'react'
import { supabase } from '../lib/supabase'

const dietaryOptions = ['Ninguna', 'Celíaco', 'Vegetariano', 'Vegano']

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    asistira: true,
    dietary: 'Ninguna',
    message: '',
  })
  const [status, setStatus] = useState('idle')

  function buildWhatsAppMessage() {
    const lines = [
      `*Confirmación de Asistencia - 15 Briana*`,
      ``,
      `Nombre: ${form.name}`,
      `Asistirá: ${form.asistira ? 'Sí, asistiré ✅' : 'No podré asistir ❌'}`,
      `Preferencia alimenticia: ${form.dietary}`,
    ]
    if (form.message) lines.push(`Mensaje: ${form.message}`)
    return encodeURIComponent(lines.join('\n'))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')

    try {
      const { error } = await supabase.from('rsvps').insert([{
        guests: [{ name: form.name, confirmed: form.asistira, dietary: form.dietary }],
        song: form.message,
      }])
      if (error) throw error
      setStatus('success')
    } catch {
      const url = `https://wa.me/?text=${buildWhatsAppMessage()}`
      window.open(url, '_blank')
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <section className="py-20 px-4 bg-lavender-50 text-center">
        <i className="fas fa-check-circle text-gold-400 text-4xl mb-4 block" />
        <h3 className="font-display text-4xl text-lavender-700 italic mb-2">¡Gracias!</h3>
        <p className="text-stone-500">Tu confirmación fue registrada. Te esperamos.</p>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-lavender-50">
      <div className="max-w-lg mx-auto">
        <i className="fas fa-envelope text-gold-400 text-2xl block text-center mb-4" />
        <h3 className="font-display text-3xl text-lavender-700 italic text-center mb-2">CONFIRMÁ TU ASISTENCIA</h3>
        <p className="text-center text-stone-500 text-sm mb-8">Por favor, confirmar antes del 28 de agosto de 2026</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-stone-500 text-sm mb-1.5">Nombre y Apellido</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-lavender-200 bg-white focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent transition-shadow"
            />
          </div>

          <div>
            <label className="block text-stone-500 text-sm mb-1.5">¿Asistirá?</label>
            <div className="flex gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                ${form.asistira === true ? 'border-lavender-500 bg-lavender-50' : 'border-lavender-200 hover:border-lavender-300'}">
                <input
                  type="radio"
                  name="asistira"
                  checked={form.asistira === true}
                  onChange={() => setForm({ ...form, asistira: true })}
                  className="accent-lavender-600"
                />
                <span className="text-sm text-stone-700">Sí, asistiré</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                ${form.asistira === false ? 'border-lavender-500 bg-lavender-50' : 'border-lavender-200 hover:border-lavender-300'}">
                <input
                  type="radio"
                  name="asistira"
                  checked={form.asistira === false}
                  onChange={() => setForm({ ...form, asistira: false })}
                  className="accent-lavender-600"
                />
                <span className="text-sm text-stone-700">No podré asistir</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-stone-500 text-sm mb-1.5">Preferencias alimenticias</label>
            <select
              value={form.dietary}
              onChange={e => setForm({ ...form, dietary: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-lavender-200 bg-white focus:outline-none focus:ring-2 focus:ring-lavender-300 transition-shadow"
            >
              {dietaryOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-stone-500 text-sm mb-1.5">Mensaje adicional (opcional)</label>
            <textarea
              placeholder="Dejanos tu mensaje..."
              rows={3}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-lavender-200 bg-white focus:outline-none focus:ring-2 focus:ring-lavender-300 transition-shadow resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3.5 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-700 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? (
              <><i className="fas fa-spinner fa-spin mr-2" />Enviando...</>
            ) : (
              <><i className="fas fa-paper-plane mr-2" />ENVIAR CONFIRMACIÓN</>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
