import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Badge = ({ children, color = 'gray' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-${color}-100 text-${color}-700`}>{children}</span>
)

const statusColor = (s) => {
  switch (s) {
    case 'pending': return 'yellow'
    case 'review': return 'blue'
    case 'approved': return 'emerald'
    case 'paid': return 'indigo'
    case 'rejected': return 'red'
    default: return 'gray'
  }
}

export default function Dashboard() {
  const BASE = import.meta.env.VITE_BACKEND_URL
  const [email, setEmail] = useState(localStorage.getItem('user_email') || '')
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const canLoad = Boolean(BASE && email)

  async function loadTrades() {
    if (!canLoad) return
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${BASE}/api/trades?email=${encodeURIComponent(email)}&limit=200`)
      if (!res.ok) throw new Error('Failed to fetch trades')
      const data = await res.json()
      setTrades(data.items || [])
    } catch (e) {
      setError(e.message || 'Unable to load your trades')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (canLoad) loadTrades()
  }, [email, BASE])

  const onSaveEmail = (e) => {
    e.preventDefault()
    localStorage.setItem('user_email', email)
    loadTrades()
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Your Trades</h1>
          <p className="text-slate-400">Track the status of your submissions and payouts.</p>
        </div>

        {!BASE && (
          <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">Set the backend URL to enable live data.</div>
        )}

        <form onSubmit={onSaveEmail} className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-white/80">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400">Save</button>
            <button type="button" onClick={loadTrades} disabled={!canLoad || loading} className="rounded-xl bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20 disabled:opacity-50">Refresh</button>
          </div>
        </form>

        {loading && <div className="text-slate-400">Loading...</div>}
        {error && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">{error}</div>}

        {!loading && trades.length === 0 && canLoad && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-white/70">No trades found for this email yet.</div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {trades.map((t) => (
            <div key={t._id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{t.brand}{t.country ? ` • ${t.country}` : ''}</div>
                  <div className="text-sm text-white/60">{t.card_currency} {t.amount}</div>
                </div>
                <Badge color={statusColor(t.status)}>{t.status}</Badge>
              </div>
              {t.notes && <div className="mt-3 text-sm text-white/70">{t.notes}</div>}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/60">
                <div>Payout: {t.payout_currency}</div>
                <div>Method: {t.payout_method}</div>
                {t.payout_details && <div className="col-span-2 truncate">Details: {t.payout_details}</div>}
              </div>
              <div className="mt-4 text-xs text-white/50">Ref: {t._id}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
