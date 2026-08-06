import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function GuestCard({ guest, index }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-lavender-100">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium text-stone-800">
          {guest.name} {guest.last_name}
        </p>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${guest.confirmed ? 'bg-lavender-100 text-lavender-700' : 'bg-rose-100 text-rose-600'}`}>
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
    if (localStorage.getItem('briana_admin') === 'authed') {
      setAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (authed) loadRsvps()
  }, [authed])

  function handleLogin(e) {
    e.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem('briana_admin', 'authed')
      setAuthed(true)
    }
  }

  function handleLogout() {
    localStorage.removeItem('briana_admin')
    setAuthed(false)
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lavender-50 via-white to-lavender-100 px-4">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-xl shadow-lavender-200/60 max-w-sm w-full text-center border border-lavender-100">
          <i className="fas fa-heart text-gold-400 text-2xl mb-4 block" />
          <h1 className="font-display text-3xl text-lavender-700 italic mb-1">Admin</h1>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-8">15 Briana</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 bg-lavender-50/50 focus:outline-none focus:ring-2 focus:ring-lavender-300 mb-4 text-center"
          />
          <button
            type="submit"
            className="w-full py-3 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-700 transition-colors shadow-md shadow-lavender-200"
          >
            Ingresar
          </button>
        </form>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lavender-50 to-lavender-100">
        <p className="text-lavender-400">Cargando...</p>
      </div>
    )
  }

  const totalGuests = rsvps.reduce((sum, r) => sum + r.guests.filter(g => g.confirmed).length, 0)
  const totalDeclined = rsvps.reduce((sum, r) => sum + r.guests.filter(g => !g.confirmed).length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-50 to-lavender-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display text-4xl text-lavender-700 italic">Invitados</h1>
          <button
            onClick={handleLogout}
            className="text-xs text-stone-400 hover:text-lavender-600 transition-colors flex items-center gap-1.5"
          >
            <i className="fas fa-sign-out-alt" />
            Salir
          </button>
        </div>
        <p className="text-stone-400 text-sm mb-8">Confirmaciones del 15 de Briana</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-lavender-100">
            <p className="font-display text-3xl text-lavender-700">{totalGuests}</p>
            <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">Confirmaron</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-lavender-100">
            <p className="font-display text-3xl text-rose-500">{totalDeclined}</p>
            <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">No asisten</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-lavender-100">
            <p className="font-display text-3xl text-gold-500">{rsvps.length}</p>
            <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">Grupos</p>
          </div>
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