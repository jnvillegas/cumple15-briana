import { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { supabase } from '../lib/supabase'

function GuestCard({ guest, index, phone, adults, minors }) {
  const isConfirmed = guest.confirmed !== false
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-lavender-100">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium text-stone-800">
          {guest.name} {guest.last_name}
        </p>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${isConfirmed ? 'bg-lavender-100 text-lavender-700' : 'bg-rose-100 text-rose-600'}`}>
          {isConfirmed ? 'Confirmó' : 'No asiste'}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-400">
        {phone && (
          <span className="flex items-center gap-1.5">
            <i className="fas fa-phone text-xs" />
            {phone}
          </span>
        )}
        {(adults > 0 || minors > 0) && (
          <span className="flex items-center gap-1.5">
            <i className="fas fa-users text-xs" />
            {adults} adulto(s), {minors} menor(es)
          </span>
        )}
        {guest.dietary && guest.dietary !== 'Ninguno' && (
          <span className="flex items-center gap-1.5">
            <i className="fas fa-utensils text-xs" />
            {guest.dietary}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <i className="fas fa-hashtag text-xs" />
          Invitado #{index + 1}
        </span>
      </div>
    </div>
  )
}

function buildRows(rsvps) {
  const rows = []
  rsvps.forEach(r => {
    r.guests.forEach(g => {
      rows.push({
        name: `${g.name || ''} ${g.last_name || ''}`.trim(),
        phone: r.phone || '',
        adults: r.adults || 0,
        minors: r.minors || 0,
        dietary: g.dietary || '',
        confirmed: g.confirmed !== false ? 'Sí' : 'No',
        message: r.song || '',
        date: new Date(r.created_at).toLocaleDateString('es-AR'),
      })
    })
  })
  return rows
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

  function downloadPDF() {
    const doc = new jsPDF()
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Invitados - 15 Briana', 14, 18)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(130)
    doc.text('Listado de confirmaciones', 14, 25)

    const rows = buildRows(rsvps).map(r => [
      r.name, r.phone, `${r.adults}`, `${r.minors}`, r.dietary, r.confirmed, r.message, r.date
    ])

    autoTable(doc, {
      startY: 30,
      head: [['Nombre', 'Teléfono', 'Adultos', 'Menores', 'Dieta', 'Confirma', 'Mensaje', 'Fecha']],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [178, 137, 128] },
    })

    doc.save('invitados-15-briana.pdf')
  }

  function printPDF() {
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (!printWindow) return

    const rows = buildRows(rsvps)
      .map(r => `<tr>
        <td>${r.name}</td>
        <td>${r.phone}</td>
        <td>${r.adults}</td>
        <td>${r.minors}</td>
        <td>${r.dietary}</td>
        <td>${r.confirmed}</td>
        <td>${r.message}</td>
        <td>${r.date}</td>
      </tr>`)
      .join('')

    printWindow.document.write(`
      <html>
        <head>
          <title>Invitados - 15 Briana</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h1 { font-size: 22px; margin-bottom: 4px; }
            h2 { font-size: 14px; font-weight: normal; color: #777; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; }
            th { background: #d8c3bf; color: #fff; padding: 8px; text-align: left; }
            td { border-bottom: 1px solid #eee; padding: 6px 8px; }
          </style>
        </head>
        <body>
          <h1>Invitados - 15 Briana</h1>
          <h2>Listado de confirmaciones</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th><th>Teléfono</th><th>Adultos</th><th>Menores</th>
                <th>Dieta</th><th>Confirma</th><th>Mensaje</th><th>Fecha</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 300)
  }

  function downloadExcel() {
    const rows = buildRows(rsvps)
    const headers = ['Nombre', 'Teléfono', 'Adultos', 'Menores', 'Dieta', 'Confirma', 'Mensaje', 'Fecha']

    const tableHtml = `
      <table>
        <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>
          ${rows.map(r => `<tr>
            <td>${r.name}</td><td>${r.phone}</td><td>${r.adults}</td><td>${r.minors}</td>
            <td>${r.dietary}</td><td>${r.confirmed}</td><td>${r.message}</td><td>${r.date}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    `

    const blob = new Blob(['\ufeff' + tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'invitados-15-briana.xls'
    a.click()
    URL.revokeObjectURL(url)
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

  const confirmedGroups = rsvps.filter(r => r.guests?.some(g => g.confirmed !== false))
  const totalGuests = rsvps.reduce((sum, r) => sum + r.guests.filter(g => g.confirmed !== false).length, 0)
  const totalDeclined = rsvps.reduce((sum, r) => sum + r.guests.filter(g => g.confirmed === false).length, 0)
  const totalAdults = rsvps.reduce((sum, r) => sum + (r.adults || 0), 0)
  const totalMinors = rsvps.reduce((sum, r) => sum + (r.minors || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-50 to-lavender-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b border-lavender-100">
        <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl text-lavender-700 italic">Invitados</h1>
            <p className="text-stone-400 text-sm mt-1">Confirmaciones del 15 de Briana</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-stone-400 hover:text-lavender-600 transition-colors flex items-center gap-1.5"
          >
            <i className="fas fa-sign-out-alt" />
            Salir
          </button>
        </div>
      </header>

      {/* BODY */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-lavender-100">
            <p className="font-display text-3xl text-lavender-700">{totalAdults}</p>
            <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">Adultos</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-lavender-100">
            <p className="font-display text-3xl text-lavender-500">{totalMinors}</p>
            <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">Menores</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-lavender-100">
            <p className="font-display text-3xl text-gold-500">{confirmedGroups.length}</p>
            <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">Grupos que confirmaron</p>
          </div>
        </div>

        <div className="space-y-6">
          {rsvps.map(r => (
            <div key={r.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-400">{new Date(r.created_at).toLocaleDateString('es-AR')}</p>
                {r.song && <p className="text-xs text-stone-400">💬 {r.song}</p>}
              </div>
              {r.guests.map((g, i) => (
                <GuestCard key={i} guest={g} index={i} phone={r.phone} adults={r.adults} minors={r.minors} />
              ))}
            </div>
          ))}

          {rsvps.length === 0 && (
            <p className="text-center text-stone-400 py-10">Todavía no hay confirmaciones.</p>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-lavender-100">
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={downloadPDF}
            className="flex-1 px-6 py-3 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-700 transition-colors shadow-md shadow-lavender-200"
          >
            <i className="fas fa-file-pdf mr-2" />
            Descargar PDF
          </button>
          <button
            onClick={printPDF}
            className="flex-1 px-6 py-3 border-2 border-gold-400 text-gold-500 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-gold-400 hover:text-white transition-colors"
          >
            <i className="fas fa-print mr-2" />
            Imprimir PDF
          </button>
          <button
            onClick={downloadExcel}
            className="flex-1 px-6 py-3 bg-white text-lavender-700 rounded-full uppercase tracking-widest text-sm font-semibold border border-lavender-300 hover:bg-lavender-50 transition-colors"
          >
            <i className="fas fa-file-excel mr-2" />
            Descargar Excel
          </button>
        </div>
      </footer>
    </div>
  )
}