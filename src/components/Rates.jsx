import React, { useEffect, useState } from 'react'

export default function Rates() {
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const BASE = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true)
        const res = await fetch(`${BASE}/api/rates`)
        const data = await res.json()
        setRates(data.items || [])
      } catch (e) {
        setError('Unable to fetch rates right now')
      } finally {
        setLoading(false)
      }
    }
    if (BASE) fetchRates()
  }, [BASE])

  return (
    <section id="rates" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Live Rates</h2>
          <p className="text-slate-500">Updated buy prices for supported gift cards</p>
        </div>
      </div>

      {!BASE && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
          Set the backend URL to load live rates.
        </div>
      )}

      {loading && (
        <div className="text-slate-500">Loading...</div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">{error}</div>
      )}

      {!loading && !error && rates.length === 0 && BASE && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
          No rates available yet. Add some in the database viewer.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rates.map((r) => (
          <div key={r._id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-slate-800">{r.brand}{r.country ? ` • ${r.country}` : ''}</div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">Buy {r.currency}</span>
            </div>
            <div className="mt-3 text-3xl font-extrabold text-slate-900">{r.buy}</div>
            {r.sell && (
              <div className="mt-1 text-sm text-slate-500">Sell: {r.sell}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
