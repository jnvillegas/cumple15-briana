import { useEffect, useState } from 'react'
import {
  listGuests,
  updateGuest,
  createGuest,
  deleteGuest,
  guestLink,
  normalizePhone,
} from '../lib/guests'

const statusConfig = {
  pendiente: { label: 'Pendiente', cls: 'bg-stone-100 text-stone-600' },
  confirmado: { label: 'Confirmó', cls: 'bg-lavender-100 text-lavender-700' },
  no_asiste: { label: 'No asiste', cls: 'bg-rose-100 text-rose-600' },
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-lavender-200 bg-white focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent transition-shadow text-sm'

function nextToken(guests) {
  let max = 0
  guests.forEach(g => {
    const m = (g.token || '').match(/(\d+)$/)
    if (m) max = Math.max(max, parseInt(m[1], 10))
  })
  return `INV-${String(max + 1).padStart(2, '0')}`
}

function buildGuestWhatsApp(guest) {
  return [
    `Hola ${guest.name}! 👋`,
    `Te invitamos a los 15 de Briana 💛`,
    `Confirmá tu asistencia desde este enlace:`,
    guestLink(guest.token),
  ].join('\n')
}

export default function GuestsPanel() {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(null)
  const [adding, setAdding] = useState(false)
  const [newGuest, setNewGuest] = useState({ name: '', count: 1, phone: '' })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', count: 1, phone: '' })

  async function loadGuests() {
    setLoading(true)
    setGuests(await listGuests())
    setLoading(false)
  }

  useEffect(() => {
    loadGuests()
  }, [])

  async function handleStatusChange(id, status) {
    try {
      const updated = await updateGuest(id, { status })
      setGuests(prev => prev.map(g => (g.id === id ? { ...g, status: updated.status } : g)))
    } catch {
      alert('No se pudo actualizar el estado.')
    }
  }

  async function handleCopyLink(guest) {
    const link = guestLink(guest.token)
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      window.prompt('Copiá el enlace:', link)
    }
    setCopied(guest.id)
    setTimeout(() => setCopied(null), 1500)
  }

  function handleWhatsApp(guest) {
    const phone = normalizePhone(guest.phone)
    if (!phone) {
      alert('Primero cargá el teléfono del grupo (con código de país, ej: 54911...).')
      return
    }
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(buildGuestWhatsApp(guest))}`, '_blank')
  }

  function startEdit(guest) {
    setEditingId(guest.id)
    setEditForm({ name: guest.name, count: guest.count, phone: guest.phone || '' })
  }

  async function handleSaveEdit() {
    try {
      const updated = await updateGuest(editingId, {
        name: editForm.name.trim(),
        count: Number(editForm.count) || 1,
        phone: editForm.phone,
      })
      setGuests(prev => prev.map(g => (g.id === editingId ? { ...g, ...updated } : g)))
      setEditingId(null)
    } catch {
      alert('No se pudo guardar.')
    }
  }

  async function handleAdd() {
    if (!newGuest.name.trim()) return
    try {
      const created = await createGuest({
        name: newGuest.name.trim(),
        count: Number(newGuest.count) || 1,
        phone: newGuest.phone,
        token: nextToken(guests),
      })
      setGuests(prev => [...prev, created].sort((a, b) => a.token.localeCompare(b.token)))
      setAdding(false)
      setNewGuest({ name: '', count: 1, phone: '' })
    } catch {
      alert('No se pudo agregar. Asegurate de haber ejecutado las políticas de inserción en Supabase.')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar este invitado?')) return
    try {
      await deleteGuest(id)
      setGuests(prev => prev.filter(g => g.id !== id))
    } catch {
      alert('No se pudo eliminar.')
    }
  }

  if (loading) {
    return <p className="text-center text-lavender-400 py-10">Cargando invitados...</p>
  }

  const totalPersons = guests.reduce((sum, g) => sum + (g.count || 0), 0)
  const guestConfirmed = guests.filter(g => g.status === 'confirmado')
  const guestConfirmedPersons = guestConfirmed.reduce((sum, g) => sum + (g.confirmed_count || 0), 0)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-lavender-100">
          <p className="font-display text-3xl text-lavender-700">{guests.length}</p>
          <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">Grupos</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-lavender-100">
          <p className="font-display text-3xl text-lavender-500">{totalPersons}</p>
          <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">Personas</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-lavender-100">
          <p className="font-display text-3xl text-gold-500">{guestConfirmed.length}</p>
          <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">
            Confirmaron ({guestConfirmedPersons} pers.)
          </p>
        </div>
      </div>

      <div className="mb-6">
        {adding ? (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-lavender-100 space-y-3">
            <p className="text-sm font-semibold text-lavender-700">Agregar invitado</p>
            <input
              type="text"
              placeholder="Nombre del grupo o persona"
              value={newGuest.name}
              onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
              className={inputCls}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min="1"
                placeholder="Cantidad"
                value={newGuest.count}
                onChange={e => setNewGuest({ ...newGuest, count: e.target.value })}
                className={inputCls}
              />
              <input
                type="tel"
                placeholder="Teléfono (ej: 54911...)"
                value={newGuest.phone}
                onChange={e => setNewGuest({ ...newGuest, phone: e.target.value })}
                className={inputCls}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 py-2.5 bg-lavender-600 text-white rounded-full text-sm font-semibold hover:bg-lavender-700 transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setAdding(false)}
                className="px-5 py-2.5 border border-lavender-200 text-lavender-700 rounded-full text-sm hover:bg-lavender-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="w-full py-3 border-2 border-dashed border-lavender-300 text-lavender-500 rounded-2xl text-sm font-semibold hover:bg-white transition-colors"
          >
            <i className="fas fa-plus mr-2" />
            Agregar invitado
          </button>
        )}
      </div>

      <div className="space-y-4">
        {guests.map(g => {
          const cfg = statusConfig[g.status] || statusConfig.pendiente
          return (
            <div key={g.id} className="bg-white rounded-2xl p-5 shadow-sm border border-lavender-100">
              {editingId === g.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className={inputCls}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min="1"
                      value={editForm.count}
                      onChange={e => setEditForm({ ...editForm, count: e.target.value })}
                      className={inputCls}
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono (ej: 54911...)"
                      value={editForm.phone}
                      onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 py-2.5 bg-lavender-600 text-white rounded-full text-sm font-semibold hover:bg-lavender-700 transition-colors"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-5 py-2.5 border border-lavender-200 text-lavender-700 rounded-full text-sm hover:bg-lavender-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-stone-800 truncate">{g.name}</p>
                      <p className="text-xs text-stone-400 mt-1">
                        <span className="font-mono">{g.token}</span> · {g.count} persona(s)
                        {g.phone ? ` · ${g.phone}` : ''}
                        {g.confirmed_count > 0 ? ` · Confirmaron ${g.confirmed_count}` : ''}
                      </p>
                    </div>
                    <select
                      value={g.status}
                      onChange={e => handleStatusChange(g.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full font-medium cursor-pointer border-none focus:outline-none w-full sm:w-auto shrink-0 ${cfg.cls}`}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmó</option>
                      <option value="no_asiste">No asiste</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => handleCopyLink(g)}
                      className="w-full sm:flex-1 sm:min-w-[130px] py-2 px-3 bg-lavender-600 text-white rounded-full text-xs font-semibold hover:bg-lavender-700 transition-colors"
                    >
                      {copied === g.id ? (
                        <><i className="fas fa-check mr-1.5" />¡Copiado!</>
                      ) : (
                        <><i className="fas fa-link mr-1.5" />Copiar enlace</>
                      )}
                    </button>
                    <button
                      onClick={() => handleWhatsApp(g)}
                      className="w-full sm:flex-1 sm:min-w-[130px] py-2 px-3 bg-emerald-600 text-white rounded-full text-xs font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      <i className="fab fa-whatsapp mr-1.5" />WhatsApp
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(g)}
                        className="flex-1 sm:flex-none px-3 py-2 border border-lavender-200 text-lavender-700 rounded-full text-xs hover:bg-lavender-50 transition-colors"
                        title="Editar"
                      >
                        <i className="fas fa-edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(g.id)}
                        className="flex-1 sm:flex-none px-3 py-2 border border-rose-200 text-rose-500 rounded-full text-xs hover:bg-rose-50 transition-colors"
                        title="Eliminar"
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}

        {guests.length === 0 && (
          <p className="text-center text-stone-400 py-10">
            No hay invitados cargados. Ejecutá el SQL de la tabla guests en Supabase.
          </p>
        )}
      </div>
    </>
  )
}
