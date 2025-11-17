import React from 'react'
import Navbar from '../components/Navbar'
import TradeForm from '../components/TradeForm'
import Footer from '../components/Footer'

export default function Trade() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="mb-2 text-3xl font-bold">Trade Gift Cards</h1>
          <p className="mb-8 text-slate-400">Fast, secure, and transparent. Submit your card details below.</p>
        </div>
        <TradeForm />
      </main>
      <Footer />
    </div>
  )
}
