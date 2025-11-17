import React, { useEffect, useState } from 'react'

export default function TradeForm() {
  const BASE = import.meta.env.VITE_BACKEND_URL
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const [form, setForm] = useState({
    brand: '',
    country: '',
    card_currency: 'USD',
    amount: '',
    code: '',
    email: '',
    phone: '',
    payout_currency: 'NGN',
    payout_method: 'bank',
    payout_details: '',
    notes: ''
  })

  useEffect(() => {
    async function loadBrands() {
      try {
        const res = await fetch(`${BASE}/api/brands`)
        const data = await res.json()
        setBrands(data.items || [])
      } catch (e) {
        // ignore
      }
    }
    if (BASE) loadBrands()
  }, [BASE])

  const submit = async (e) => {
    e.preventDefault()
    if (!BASE) {
      setMessage({ type: 'error', text: 'Backend URL not set' })
      return
    }
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch(`${BASE}/api/trades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount)
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to submit')
      setMessage({ type: 'success', text: 'Trade submitted successfully! Reference: ' + data.id })
      setForm({
        brand: '', country: '', card_currency: 'USD', amount: '', code: '', email: '', phone: '', payout_currency: 'NGN', payout_method: 'bank', payout_details: '', notes: ''
      })
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full rounded-xl border border-slate-200 bg-white/60 p-3 text-slate-800 placeholder-slate-400 shadow-sm focus:border-indigo-400 focus:outline-none'
  const labelClass = 'text-sm font-medium text-slate-600'

  return (
    <section id="trade" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-2 text-2xl font-bold text-slate-800">Start a Trade</h2>
      <p className="mb-6 text-slate-500">Fill the details below to request a trade. We'll review and process quickly.</p>

      {!BASE && (
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">Set the backend URL to enable submissions.</div>
      )}

      {message && (
        <div className={`mb-6 rounded-lg border p-4 ${message.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Brand</label>
            <select value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className={inputClass} required>
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Country/Region</label>
            <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass} placeholder="e.g. US" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Card Currency</label>
            <select value={form.card_currency} onChange={(e) => setForm({ ...form, card_currency: e.target.value })} className={inputClass}>
              {['USD','GBP','EUR','CAD','AUD','NGN','GHS'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Amount</label>
            <input type="number" min="1" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={inputClass} placeholder="100" required />
          </div>
          <div>
            <label className={labelClass}>Code (optional)</label>
            <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className={inputClass} placeholder="XXXX-XXXX-XXXX" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" required />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+234..." />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Payout Currency</label>
            <select value={form.payout_currency} onChange={(e) => setForm({ ...form, payout_currency: e.target.value })} className={inputClass}>
              {['USD','NGN','GHS','KES','GBP','EUR'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Payout Method</label>
            <select value={form.payout_method} onChange={(e) => setForm({ ...form, payout_method: e.target.value })} className={inputClass}>
              {['bank','wallet','mobile_money'].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Payout Details</label>
            <input value={form.payout_details} onChange={(e) => setForm({ ...form, payout_details: e.target.value })} className={inputClass} placeholder="Account number or wallet ID" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Notes</label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputClass} rows={4} placeholder="Anything else we should know?" />
        </div>

        <div className="flex justify-end">
          <button disabled={loading} className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Submitting...' : 'Submit Trade'}
          </button>
        </div>
      </form>
    </section>
  )
}
