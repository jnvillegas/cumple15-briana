import { useState, useEffect } from 'react'

const pricing = {
  bank: {
    bank: 'Brubank',
    cbu: '1430001713046563210010',
    alias: '15DEBRIANA',
    holder: 'Carlos Alberto Valentín Tejerina',
    cuil: '20446388143',
  },
}

function Modal({ title, children, onClose }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors">
          <i className="fas fa-times text-xl" />
        </button>
        <h3 className="font-display text-2xl text-lavender-700 italic mb-6">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function AccountModal({ onClose }) {
  return (
    <Modal title="Datos de Cuenta" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Banco</p>
          <p className="text-stone-700 font-medium">{pricing.bank.bank}</p>
        </div>
        <div>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">CBU</p>
          <p className="text-stone-700 font-mono text-sm break-all">{pricing.bank.cbu}</p>
        </div>
        <div>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Alias</p>
          <p className="text-lavender-600 font-bold text-lg">{pricing.bank.alias}</p>
        </div>
        <div>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Titular</p>
          <p className="text-stone-700">{pricing.bank.holder}</p>
        </div>
        <div>
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">CUIT/CUIL</p>
          <p className="text-stone-700 font-mono text-sm">{pricing.bank.cuil}</p>
        </div>
      </div>
    </Modal>
  )
}

export default function GiftTable() {
  const [showAccount, setShowAccount] = useState(false)

  return (
    <section className="py-16 px-4 bg-lavender-50 text-center">
      <i className="fas fa-gift text-gold-400 text-2xl mb-4 block" />
      <h3 className="font-display text-3xl text-lavender-700 italic mb-3">Regalos</h3>
      <p className="text-stone-500 max-w-md mx-auto mb-8 text-sm">
        Tu presencia será mi mejor regalo, pero si quieres añadir tu toque especial te dejo mis datos.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setShowAccount(true)}
          className="px-8 py-3 bg-lavender-600 text-white rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-lavender-700 transition-colors"
        >
          <i className="fas fa-credit-card mr-2" />
          VER DATOS DE CUENTA
        </button>
      </div>

      {showAccount && <AccountModal onClose={() => setShowAccount(false)} />}
    </section>
  )
}
