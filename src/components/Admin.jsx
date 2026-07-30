import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function GuestCard({ guest, index }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-100">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium text-stone-800">
          {guest.name} {guest.last_name}
        </p>
        <span className={`text-xs px-3 py-1 rounded-full ${guest.confirmed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
          {guest.confirmed ? 'Confirmó' : 'No asiste'}
        </span>
      </div>
      <div className="flex gap-4 text-sm text-stone-400">
        {guest.dietary && guest.dietary !== 'Ninguno' && (
          <span>Dieta: {guest.dietary}</span>
        )}
        <span>Invitado #{index + 1}</span>
      </div>
    </div>
  )
}

export default function Admin() {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)

  async function loadRsvps() {
    setLoading(true)
    const { data } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false })
    if (data) setRsvps(data)
    setLoading(false)
  }

  useEffect(() => {
    if (authed) loadRsvps()
  }, [authed])

  function handleLogin(e) {
    e.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuthed(true)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-sm max-w-sm w-full mx-4">
          <h1 className="text-2xl font-script text-rose-700 text-center mb-6">Admin</h1>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-300 mb-4"
          />
          <button
            type="submit"
            className="w-full py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <p className="text-stone-500">Cargando...</p>
      </div>
    )
  }

  const totalGuests = rsvps.reduce((sum, r) => sum + r.guests.filter(g => g.confirmed).length, 0)
  const totalDeclined = rsvps.reduce((sum, r) => sum + r.guests.filter(g => !g.confirmed).length, 0)

  return (
    <div className="min-h-screen bg-stone-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-script text-rose-700 mb-2">Confirmaciones</h1>
        <div className="flex gap-4 text-sm text-stone-500 mb-8">
          <span>{totalGuests} confirmaron</span>
          <span>{totalDeclined} no asisten</span>
          <span>{rsvps.length} grupo(s)</span>
        </div>

        <div className="space-y-6">
          {rsvps.map(r => (
            <div key={r.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-400">{new Date(r.created_at).toLocaleDateString('es-AR')}</p>
                {r.song && <p className="text-xs text-stone-400">🎵 {r.song}</p>}
              </div>
              {r.guests.map((g, i) => (
                <GuestCard key={i} guest={g} index={i} />
              ))}
            </div>
          ))}

          {rsvps.length === 0 && (
            <p className="text-center text-stone-400 py-10">Todavía no hay confirmaciones.</p>
          )}
        </div>
      </div>
    </div>
  )
}
