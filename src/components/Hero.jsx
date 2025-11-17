import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900 text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(circle_at_50%_90%,rgba(124,58,237,0.2),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 pb-16 pt-40 md:flex-row md:pt-28">
        <div className="max-w-xl text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          >
            Trade Gift Cards with Confidence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 text-lg text-slate-300"
          >
            Best rates. Fast payouts. Secure process. Built for modern traders inspired by the likes of Nosh and Cardtonic.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a href="#trade" className="rounded-full bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
              Start a Trade
            </a>
            <a href="#rates" className="rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400">
              View Rates
            </a>
          </motion.div>
          {backendUrl && (
            <p className="mt-4 text-xs text-slate-400">Connected to: {backendUrl}</p>
          )}
        </div>

        <div className="relative h-[420px] w-full max-w-xl md:h-[520px] md:flex-1">
          <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-white/5" />
          </div>
        </div>
      </div>
    </section>
  )
}
