import { useState, useEffect } from 'react'

const pricing = {
  adults: 25000,
  children: 15000,
  bank: {
    bank: 'Brubank',
    cbu: '1430001713046563210010',
    alias: '15DEBRIANA',
    holder: 'Carlos Alberto Valentín Tejerina',
    cuil: '20446388143',
  },
}

function formatPrice(n) {
  return '$' + n.toLocaleString('es-AR')
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

function PricingModal({ onClose }) {
  return (
    <Modal title="Valor de Tarjeta" onClose={onClose}>
      <div className="space-y-6">
        <div className="bg-lavender-50 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-stone-600">Adultos</span>
            <span className="text-xl font-bold text-lavender-700">{formatPrice(pricing.adults)}</span>
          </div>
          <div className="border-t border-lavender-200 pt-3 flex justify-between items-center">
            <span className="text-stone-600">Menores (hasta 12 años)</span>
            <span className="text-xl font-bold text-lavender-700">{formatPrice(pricing.children)}</span>
          </div>
        </div>
        <div className="border-t border-lavender-100 pt-4 space-y-3">
          <p className="text-sm text-stone-500 font-medium">Datos para el pago</p>
          <div className="text-sm text-stone-600 space-y-1">
            <p><span className="text-stone-400">Banco:</span> {pricing.bank.bank}</p>
            <p><span className="text-stone-400">Alias:</span> <span className="text-lavender-600 font-semibold">{pricing.bank.alias}</span></p>
            <p><span className="text-stone-400">CBU:</span> <span className="font-mono text-xs">{pricing.bank.cbu}</span></p>
            <p><span className="text-stone-400">Titular:</span> {pricing.bank.holder}</p>
            <p><span className="text-stone-400">CUIT/CUIL:</span> <span className="font-mono text-xs">{pricing.bank.cuil}</span></p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default function GiftTable() {
  const [showAccount, setShowAccount] = useState(false)
  const [showPricing, setShowPricing] = useState(false)

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
        <button
          onClick={() => setShowPricing(true)}
          className="px-8 py-3 border-2 border-gold-400 text-gold-500 rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-gold-400 hover:text-white transition-colors"
        >
          <i className="fas fa-tag mr-2" />
          VER VALOR DE TARJETA
        </button>
      </div>

      {showAccount && <AccountModal onClose={() => setShowAccount(false)} />}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    </section>
  )
}
