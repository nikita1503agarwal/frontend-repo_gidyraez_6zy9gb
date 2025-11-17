import React from 'react'
import Hero from '../components/Hero'
import Rates from '../components/Rates'
import TradeForm from '../components/TradeForm'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <Rates />
        <TradeForm />
      </main>
      <Footer />
    </div>
  )
}
