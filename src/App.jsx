import React from 'react'
import Hero from './components/Hero'
import Rates from './components/Rates'
import TradeForm from './components/TradeForm'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
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

export default App
