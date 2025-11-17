import React from 'react'
import Navbar from '../components/Navbar'
import Rates from '../components/Rates'
import Footer from '../components/Footer'

export default function RatesPage() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="mb-2 text-3xl font-bold">Rates</h1>
          <p className="mb-8 text-slate-400">Live buy prices for supported gift cards.</p>
        </div>
        <Rates />
      </main>
      <Footer />
    </div>
  )
}
