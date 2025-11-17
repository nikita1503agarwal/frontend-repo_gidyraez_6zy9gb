import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Section({ title, children, actions }) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2">{actions}</div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">{children}</div>
    </section>
  )
}

export default function Admin() {
  const BASE = import.meta.env.VITE_BACKEND_URL
  const [key, setKey] = useState(localStorage.getItem('admin_key') || '')

  const headers = useMemo(() => key ? { 'X-Admin-Key': key, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }, [key])

  const [summary, setSummary] = useState(null)
  const [trades, setTrades] = useState([])
  const [brands, setBrands] = useState([])
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const canLoad = Boolean(BASE && key)

  const saveKey = (e) => {
    e.preventDefault()
    localStorage.setItem('admin_key', key)
    refreshAll()
  }

  async function api(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, { ...options, headers: { ...headers, ...(options.headers||{}) } })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  }

  async function refreshAll() {
    if (!canLoad) return
    try {
      setLoading(true)
      setError(null)
      const [s, t, b, r] = await Promise.all([
        api('/api/admin/summary'),
        api('/api/admin/trades?limit=50'),
        api('/api/admin/brands?include_inactive=true'),
        api('/api/admin/rates?include_inactive=true'),
      ])
      setSummary(s.counts)
      setTrades(t.items || [])
      setBrands(b.items || [])
      setRates(r.items || [])
    } catch (e) {
      setError(e.message || 'Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (canLoad) refreshAll() }, [BASE, key])

  async function createBrand(form) {
    const payload = Object.fromEntries(new FormData(form))
    await api('/api/admin/brands', { method: 'POST', body: JSON.stringify({ ...payload, is_active: true }) })
    form.reset()
    refreshAll()
  }

  async function createRate(form) {
    const payload = Object.fromEntries(new FormData(form))
    payload.buy = parseFloat(payload.buy)
    payload.sell = payload.sell ? parseFloat(payload.sell) : null
    await api('/api/admin/rates', { method: 'POST', body: JSON.stringify({ ...payload, is_active: true }) })
    form.reset()
    refreshAll()
  }

  async function updateTradeStatus(id, status) {
    await api(`/api/admin/trades/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
    refreshAll()
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-400">Manage brands, rates, and approve trades.</p>
        </div>

        {!BASE && (
          <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">Set the backend URL to enable admin features.</div>
        )}

        <form onSubmit={(e)=>{e.preventDefault(); saveKey(e)}} className="mb-8 flex items-end gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-white/80">Admin Key</label>
            <input value={key} onChange={(e)=>setKey(e.target.value)} type="password" placeholder="Enter secret key" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none" />
          </div>
          <button type="submit" className="rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400">Save</button>
          <button type="button" onClick={refreshAll} disabled={!canLoad || loading} className="rounded-xl bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20 disabled:opacity-50">Refresh</button>
        </form>

        {error && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">{String(error).slice(0,200)}</div>}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Section title="Recent Trades" actions={
              <div className="text-sm text-white/60">{summary ? `${summary.trades} total • ${summary.pending_trades} pending` : '—'}</div>
            }>
              <div className="space-y-3">
                {trades.map(t => (
                  <div key={t._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{t.brand}{t.country?` • ${t.country}`:''} • {t.card_currency} {t.amount}</div>
                        <div className="text-xs text-white/60">{t.email} • {t.phone || 'no phone'}</div>
                      </div>
                      <div className="text-xs text-white/60">{t._id}</div>
                    </div>
                    {t.notes && <div className="mt-2 text-sm text-white/70">{t.notes}</div>}
                    <div className="mt-3 flex items-center gap-2">
                      {['pending','review','approved','rejected','paid'].map(s => (
                        <button key={s} onClick={()=>updateTradeStatus(t._id, s)} className={`rounded-full px-3 py-1 text-xs font-semibold ${t.status===s? 'bg-indigo-500 text-white':'bg-white/10 text-white hover:bg-white/20'}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                ))}
                {trades.length===0 && <div className="text-white/60">No trades yet.</div>}
              </div>
            </Section>

            <Section title="Create Rate">
              <form onSubmit={(e)=>{e.preventDefault(); createRate(e.currentTarget)}} className="grid grid-cols-2 gap-3">
                <input name="brand" required placeholder="Brand e.g. Amazon" className="col-span-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none" />
                <input name="country" placeholder="Country (optional)" className="col-span-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none" />
                <select name="currency" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white outline-none">
                  {['USD','NGN','GHS','KES','GBP','EUR'].map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
                <input name="buy" type="number" step="0.01" required placeholder="Buy" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none" />
                <input name="sell" type="number" step="0.01" placeholder="Sell (optional)" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none" />
                <div className="col-span-2">
                  <button disabled={!canLoad} className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-400 disabled:opacity-50">Save Rate</button>
                </div>
              </form>
            </Section>
          </div>

          <div className="lg:col-span-1">
            <Section title="Create Brand">
              <form onSubmit={(e)=>{e.preventDefault(); createBrand(e.currentTarget)}} className="space-y-3">
                <input name="brand" required placeholder="Brand name" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none" />
                <input name="country" placeholder="Country (optional)" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none" />
                <textarea name="notes" placeholder="Notes (optional)" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none" />
                <button disabled={!canLoad} className="w-full rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-400 disabled:opacity-50">Save Brand</button>
              </form>
            </Section>

            <Section title="Brands">
              <div className="space-y-2 text-sm">
                {brands.map(b => (
                  <div key={b._id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <div>{b.brand} {b.country?`• ${b.country}`:''}</div>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${b.is_active? 'bg-emerald-500/20 text-emerald-300':'bg-white/10 text-white/60'}`}>{b.is_active? 'active':'inactive'}</span>
                  </div>
                ))}
                {brands.length===0 && <div className="text-white/60">No brands yet.</div>}
              </div>
            </Section>

            <Section title="Rates">
              <div className="space-y-2 text-sm">
                {rates.map(r => (
                  <div key={r._id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{r.brand}{r.country?` • ${r.country}`:''}</div>
                      <div className="text-white/70">Buy {r.currency} {r.buy}{r.sell?` • Sell ${r.sell}`:''}</div>
                    </div>
                  </div>
                ))}
                {rates.length===0 && <div className="text-white/60">No rates yet.</div>}
              </div>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
